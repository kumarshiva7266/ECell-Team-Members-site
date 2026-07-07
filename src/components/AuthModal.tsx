"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { X, Mail, Phone, Lock, User, Loader2, ArrowRight, Sparkles, Zap, Shield, Eye, EyeOff, Globe } from "lucide-react";
import { AuthStore } from "@/lib/authStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [logoImage, setLogoImage] = useState("/images/crew.png");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    if (msg.includes("auth/invalid-credential") || msg.includes("auth/user-not-found")) return "You don't have an account yet. Please register yourself first.";
    if (msg.includes("auth/email-already-in-use")) return "This email is already registered. Please log in.";
    if (msg.includes("auth/weak-password")) return "Password is too weak. It must be at least 6 characters.";
    if (msg.includes("auth/invalid-email")) return "Invalid email address format.";
    if (msg.includes("You don't have an account")) return msg;
    return msg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLogoImage("/images/singin.jpeg");
    setError(null);
    try {
      await AuthStore.login(identifier, password);
      onClose();
    } catch (err: any) {
      setLogoImage("/images/logo.jpeg");
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLogoImage("/images/singin.jpeg");
    try {
      await AuthStore.signUp({ ...signupData, password });
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err));
      setLogoImage("/images/logo.jpeg");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await AuthStore.googleLogin();
      onClose();
    } catch (err: any) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  const InputClass = "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm";
  const LabelClass = "block text-xs font-semibold text-white/70 mb-2 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Futuristic Background Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://www.magnific.com/free-vector/futuristic-background-design_7636213.htm')",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden z-10 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Side - Hero Section (Desktop) */}
              <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center relative overflow-hidden">
                {/* Simple Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center relative z-10"
                >
                  <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-blue-400/60 via-cyan-400/60 to-purple-400/60 backdrop-blur-xl mb-6 shadow-2xl border border-white/20 overflow-hidden">
                    <img
                      src={logoImage}
                      alt="Logo"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                    SIGN IN TO YOUR<br />ADVENTURE!
                  </h1>
                  <p className="text-white/80 text-lg backdrop-blur-sm">
                    Join E-Cell and explore the universe of entrepreneurship
                  </p>
                </motion.div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 p-8 lg:p-12 relative">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Mobile Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="lg:hidden text-center mb-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-4 overflow-hidden">
                    <img
                      src={logoImage}
                      alt="Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    SIGN IN TO YOUR<br />ADVENTURE!
                  </h1>
                </motion.div>

                {/* Mode Toggle */}
                <div className="flex p-1 gap-1 mb-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => { setMode("login"); setError(null); }}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      mode === "login"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 backdrop-blur-md"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => { setMode("signup"); setError(null); }}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      mode === "signup"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 backdrop-blur-md"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Sign Up
                  </motion.button>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-semibold flex items-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    {error}
                  </motion.div>
                )}

                {/* Form Content */}
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {mode === "login" ? (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onSubmit={handleLogin} 
                      className="space-y-5"
                    >
                      <div>
                        <label className={LabelClass}>Email or Phone</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input 
                            type="text" 
                            required 
                            placeholder="john@example.com"
                            className={`${InputClass} pl-12`}
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={LabelClass}>Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input 
                            type={showPassword ? "text" : "password"}
                            required 
                            placeholder="••••••••"
                            className={`${InputClass} pl-12 pr-12`}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <motion.button
                        disabled={loading}
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md border border-white/20"
                        style={{ backgroundSize: "200% 200%" }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span>Sign In</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-black/40 text-white/50">Or continue with</span>
                        </div>
                      </div>

                      {/* Social Login Buttons */}
                      <div className="space-y-3">
                        <motion.button
                          disabled={loading}
                          type="button"
                          onClick={handleGoogleLogin}
                          className="w-full bg-white/15 border border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/25 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7.1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span>Google</span>
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onSubmit={handleSignup} 
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={LabelClass}>Full Name</label>
                          <input type="text" required placeholder="John Doe" className={InputClass} value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} />
                        </div>
                        <div>
                          <label className={LabelClass}>Age</label>
                          <input type="number" required placeholder="19" className={InputClass} value={signupData.age} onChange={e => setSignupData({...signupData, age: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={LabelClass}>Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input type="email" required placeholder="john@college.ac.in" className={`${InputClass} pl-12`} value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className={LabelClass}>Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input type="tel" required placeholder="+919876543210" className={`${InputClass} pl-12`} value={signupData.phone} onChange={e => setSignupData({...signupData, phone: e.target.value})} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={LabelClass}>College</label>
                          <input type="text" required placeholder="Your College" className={InputClass} value={signupData.college} onChange={e => setSignupData({...signupData, college: e.target.value})} />
                        </div>
                        <div>
                          <label className={LabelClass}>Branch</label>
                          <input type="text" required placeholder="CSE / ECE" className={InputClass} value={signupData.branch} onChange={e => setSignupData({...signupData, branch: e.target.value})} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={LabelClass}>Year</label>
                          <select className={InputClass} value={signupData.year} onChange={e => setSignupData({...signupData, year: e.target.value})}>
                            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => <option key={y} value={y} className="bg-black">{y}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={LabelClass}>Gender</label>
                          <select className={InputClass} value={signupData.gender} onChange={e => setSignupData({...signupData, gender: e.target.value})}>
                            <option value="Male" className="bg-black">Male</option>
                            <option value="Female" className="bg-black">Female</option>
                            <option value="Other" className="bg-black">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={LabelClass}>Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input 
                            type={showPassword ? "text" : "password"}
                            required 
                            placeholder="••••••••" 
                            className={`${InputClass} pl-12 pr-12`}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        disabled={loading}
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md border border-white/20"
                        style={{ backgroundSize: "200% 200%" }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Create Account</span>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
