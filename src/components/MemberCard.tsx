"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe, Eye, X } from "lucide-react";
import { Member } from "@/lib/teamStore";

// Inline SVG brand icons (lucide-react v3 dropped brand icons)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const DOMAIN_COLORS: Record<string, string> = {
  "Leadership":                "from-blue-500 to-purple-600",
  "Web & Technology":          "from-cyan-500 to-blue-600",
  "Marketing & PR":            "from-pink-500 to-rose-600",
  "Creative & Design":         "from-purple-500 to-violet-600",
  "Event Management":          "from-amber-500 to-orange-600",
  "Social Media & Influencer": "from-emerald-500 to-teal-600",
};

interface MemberCardProps {
  member: Member;
  onViewProfile: (member: Member) => void;
  index?: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onViewProfile, index = 0 }) => {
  const gradient = DOMAIN_COLORS[member.domain] ?? "from-blue-500 to-purple-600";
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onViewProfile(member)}
      className="glass-card hover:glass-card-hover rounded-[25px] p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden group"
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Shine sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-[25px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      {/* Avatar */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300 bg-zinc-900">
        {member.img && !member.img.includes('tech.png') && !member.img.includes('president.png') && !member.img.includes('vp.png') ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-600">{member.name.charAt(0)}</span>
          </div>
        )}
        <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${gradient} opacity-30`} />
      </div>

      {/* Name / Role */}
      <h3 className="text-sm sm:text-base font-bold text-white mb-1">{member.name}</h3>
      <p className={`text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
        {member.role}
      </p>
      <p className="text-[10px] sm:text-[11px] text-zinc-500 font-mono mb-1">{member.dept}</p>
      <p className="text-[9px] sm:text-[10px] text-zinc-600 mb-2 sm:mb-3">{member.year}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center mb-3 sm:mb-4">
        {member.skills.slice(0, 3).map((skill, i) => (
          <span key={i} className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-zinc-400">
            {skill}
          </span>
        ))}
      </div>

      {/* Connect Area */}
      <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4" onClick={e => e.stopPropagation()}>
        {member.email && (
          <button 
            onClick={() => setShowEmailPopup(true)}
            className="p-1 sm:p-1.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white hover:scale-110 transition-all shadow-lg shadow-red-500/20 cursor-pointer"
          >
            <Mail className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1 sm:p-1.5 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:scale-110 transition-all shadow-lg shadow-blue-500/20">
            <LinkedInIcon />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noreferrer" className="p-1 sm:p-1.5 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:scale-110 transition-all shadow-lg shadow-gray-500/20">
            <GitHubIcon />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noreferrer" className="p-1 sm:p-1.5 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 text-white hover:scale-110 transition-all shadow-lg shadow-pink-500/20">
            <InstagramIcon />
          </a>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={e => { e.stopPropagation(); onViewProfile(member); }}
        className="glass-button border-white/5 hover:border-white/20 flex items-center gap-2 text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white transition-all cursor-pointer"
      >
        <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> View Full Profile
      </button>

      {/* Email Popup Modal */}
      <AnimatePresence>
        {showEmailPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmailPopup(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <button
                onClick={() => setShowEmailPopup(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Contact via Email</h3>
                  <p className="text-sm text-zinc-400">{member.name}</p>
                </div>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-zinc-300 mb-2">Email Address:</p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-white break-all flex-1">{member.email}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(member.email)}
                    className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    title="Copy email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowEmailPopup(false)}
                className="w-full bg-zinc-800 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
