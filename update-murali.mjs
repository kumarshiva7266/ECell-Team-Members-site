import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYXJyusDj8rX3mWAeRX2m7Yqx8a2ZKOmU",
  authDomain: "ecell-team-members.firebaseapp.com",
  projectId: "ecell-team-members",
  storageBucket: "ecell-team-members.firebasestorage.app",
  messagingSenderId: "854897800490",
  appId: "1:854897800490:web:c071d7637e81abd5aa5a53",
  measurementId: "G-CQE9591DNQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("Fetching members from Firestore...");
  const querySnapshot = await getDocs(collection(db, "members"));
  console.log("Total members in Firestore:", querySnapshot.size);
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`- ID: ${doc.id}, Name: "${data.name}", Domain: "${data.domain}"`);
  });
  
  process.exit(0);
}

run().catch(err => {
  console.error("Error executing script:", err);
  process.exit(1);
});
