import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot, addDoc, getDocs as getAllDocs, orderBy, serverTimestamp, deleteDoc } from "firebase/firestore";

const ADMIN_EMAIL = "shiva.cloudray0303@gmail.com";
const ADMIN_PASSWORD = "Shiva@9817";

export interface UserProfile {
  uid: string;
  name: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  isAdmin?: boolean;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  createdAt?: any;
}

export const AuthStore = {
  isAdmin(email: string): boolean {
    return email === ADMIN_EMAIL;
  },

  async adminLogin(email: string, password: string): Promise<FirebaseUser> {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error("Invalid admin credentials");
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  subscribe(callback: (user: FirebaseUser | null, profile: UserProfile | null) => void) {
    let profileUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (profileUnsub) {
        profileUnsub();
        profileUnsub = null;
      }

      if (user) {
        // Listen to the user's Firestore document in real-time
        const docRef = doc(db, "users", user.uid);
        profileUnsub = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            // Check if user is admin
            profile.isAdmin = this.isAdmin(profile.email);
            callback(user, profile);
          } else {
            // Document not created yet, just pass user with null profile temporarily
            callback(user, null);
          }
        }, (error) => {
          console.error("Error fetching user profile", error);
          callback(user, null);
        });
      } else {
        callback(null, null);
      }
    });

    return () => {
      authUnsub();
      if (profileUnsub) profileUnsub();
    };
  },

  async signUp(profileData: Omit<UserProfile, "uid"> & { password: string }) {
    const { email, password, ...rest } = profileData;
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save additional profile details to Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email,
        isAdmin: this.isAdmin(email),
        ...rest
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      return { user, profile: userProfile };
    } catch (error) {
      throw error;
    }
  },

  async login(identifier: string, password: string) {
    try {
      let emailToUse = identifier;

      // Check if identifier is a phone number (e.g. contains digits only, length >= 10)
      const isPhone = /^\+?[0-9]{10,}$/.test(identifier);

      if (isPhone) {
        // Phone to Email lookup workaround
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phone", "==", identifier));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the email of the first matching user
          const userDoc = querySnapshot.docs[0].data() as UserProfile;
          emailToUse = userDoc.email;
        } else {
          throw new Error("No user found with this phone number.");
        }
      }

      // Log in using the resolved email
      const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
      return userCredential.user;
    } catch (error: any) {
      // Check if user doesn't exist
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        throw new Error("You don't have an account yet. Please register yourself first.");
      }
      throw error;
    }
  },

  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create user profile if it doesn't exist
        const userProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || "User",
          gender: "Other",
          age: "",
          email: user.email || "",
          phone: user.phoneNumber || "",
          college: "",
          branch: "",
          year: "1st Year",
          isAdmin: this.isAdmin(user.email || "")
        };
        await setDoc(userDocRef, userProfile);
      }

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    await signOut(auth);
  }
};

export const UpdatesStore = {
  async createUpdate(update: Omit<Update, "id" | "date">) {
    try {
      const updatesRef = collection(db, "updates");
      const docRef = await addDoc(updatesRef, {
        ...update,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating update:", error);
      throw error;
    }
  },

  async deleteUpdate(updateId: string) {
    try {
      const updateRef = doc(db, "updates", updateId);
      await deleteDoc(updateRef);
    } catch (error) {
      console.error("Error deleting update:", error);
      throw error;
    }
  },

  async getUpdates(): Promise<Update[]> {
    const updatesRef = collection(db, "updates");
    const q = query(updatesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getAllDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Update));
  },

  subscribeToUpdates(callback: (updates: Update[]) => void) {
    const updatesRef = collection(db, "updates");
    const q = query(updatesRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const updates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Update));
      callback(updates);
    });
    return unsub;
  }
};
