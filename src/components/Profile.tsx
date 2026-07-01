"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogOut, User, Mail, Phone, BookOpen, GraduationCap, Building } from "lucide-react";
import { AuthStore, UserProfile } from "@/lib/authStore";

interface ProfileProps {
  profile: UserProfile;
}

const InfoCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-sm font-semibold text-white truncate">{value}</div>
    </div>
  </div>
);

export const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const handleLogout = async () => {
    try {
      await AuthStore.logout();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Avatar Area */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/3 flex flex-col gap-4"
        >
          <div className="glass-panel p-8 rounded-[24px] border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px] mb-4">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{profile.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
            <p className="text-xs text-blue-400 font-semibold mb-6">E-Cell Member</p>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all font-semibold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full md:w-2/3"
        >
          <div className="glass-panel p-6 rounded-[24px] border border-white/10 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={Mail} label="Email Address" value={profile.email} />
              <InfoCard icon={Phone} label="Phone Number" value={profile.phone} />
              <InfoCard icon={User} label="Gender" value={profile.gender} />
              <InfoCard icon={User} label="Age" value={profile.age.toString()} />
            </div>

            <h3 className="text-lg font-bold text-white mt-10 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Academic Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={Building} label="College" value={profile.college} />
              <InfoCard icon={BookOpen} label="Branch" value={profile.branch} />
              <InfoCard icon={GraduationCap} label="Year" value={profile.year} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
