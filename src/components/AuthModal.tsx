"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { AuthStore } from "@/lib/authStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  
  const [signupData, setSignupData] = useState({
    name: "",
    gender: "Male",
    age: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    year: "1st Year",
  });

  if (!isOpen) return null;

  const getFriendlyError = (err: any) => {
    const msg = err.message || "";
    if (msg.includes("auth/invalid-credential")) return "Invalid email, phone number, or password. Please try again.";
    if (msg.includes("auth/email-already-in-use")) return "This email is already registered. Please log in.";
    if (msg.includes("auth/weak-password")) return "Password is too weak. It must be at least 6 characters.";
    if (msg.includes("auth/invalid-email")) return "Invalid email address format.";
    return msg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await AuthStore.login(identifier, password);
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await AuthStore.signUp({ ...signupData, password });
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const InputClass = "w-full bg-white/[0.04] border border-white/[0.1] rounded-[12px] px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all";
  const LabelClass = "block text-[10px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[24px] shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="relative h-20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 flex items-center px-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white">
                {mode === "login" ? "Welcome Back" : "Join the E-Cell"}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              {mode === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className={LabelClass}>Email or Phone Number</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="text" 
                        required 
                        placeholder="john@example.com or +919876543210"
                        className={`${InputClass} pl-9`}
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={LabelClass}>Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="password" 
                        required 
                        placeholder="••••••••"
                        className={`${InputClass} pl-9`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <button disabled={loading} type="submit" className="w-full relative group overflow-hidden rounded-[12px] p-[1px] mt-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[12px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-[11px] px-6 py-3 flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : (
                        <>
                          <span className="font-semibold text-white">Log In</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </>
                      )}
                    </div>
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-xs text-zinc-500">Don't have an account? </span>
                    <button type="button" onClick={() => { setMode("signup"); setError(null); }} className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                      Sign Up
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LabelClass}>Full Name</label>
                      <input type="text" required placeholder="John Doe" className={InputClass} value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className={LabelClass}>Age</label>
                      <input type="number" required placeholder="19" className={InputClass} value={signupData.age} onChange={e => setSignupData({...signupData, age: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LabelClass}>Email Address</label>
                      <input type="email" required placeholder="john@college.ac.in" className={InputClass} value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className={LabelClass}>Phone Number</label>
                      <input type="tel" required placeholder="+919876543210" className={InputClass} value={signupData.phone} onChange={e => setSignupData({...signupData, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LabelClass}>College</label>
                      <input type="text" required placeholder="Your College Name" className={InputClass} value={signupData.college} onChange={e => setSignupData({...signupData, college: e.target.value})} />
                    </div>
                    <div>
                      <label className={LabelClass}>Branch</label>
                      <input type="text" required placeholder="CSE / ECE / etc." className={InputClass} value={signupData.branch} onChange={e => setSignupData({...signupData, branch: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LabelClass}>Year</label>
                      <select className={InputClass} value={signupData.year} onChange={e => setSignupData({...signupData, year: e.target.value})}>
                        {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={LabelClass}>Gender</label>
                      <select className={InputClass} value={signupData.gender} onChange={e => setSignupData({...signupData, gender: e.target.value})}>
                        <option value="Male" className="bg-zinc-900">Male</option>
                        <option value="Female" className="bg-zinc-900">Female</option>
                        <option value="Other" className="bg-zinc-900">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={LabelClass}>Password</label>
                    <input type="password" required placeholder="••••••••" className={InputClass} value={password} onChange={e => setPassword(e.target.value)} />
                  </div>

                  <button disabled={loading} type="submit" className="w-full relative group overflow-hidden rounded-[12px] p-[1px] mt-4">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[12px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-zinc-950/80 backdrop-blur-xl rounded-[11px] px-6 py-3 flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : (
                        <span className="font-semibold text-white">Create Account</span>
                      )}
                    </div>
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-xs text-zinc-500">Already have an account? </span>
                    <button type="button" onClick={() => { setMode("login"); setError(null); }} className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
