"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightLeft, Mail, ExternalLink, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { Member } from "@/lib/teamStore";
import { soundFx } from "@/lib/soundFx";

interface MemberCompareProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMembers: Member[];
  onRemoveMember: (id: string) => void;
  onClearAll: () => void;
  onOpenProfile: (member: Member) => void;
}

export const MemberCompare: React.FC<MemberCompareProps> = ({
  isOpen,
  onClose,
  selectedMembers,
  onRemoveMember,
  onClearAll,
  onOpenProfile,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative w-full max-w-5xl bg-zinc-950/90 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Team Member Comparison Matrix
                </h3>
                <p className="text-xs text-zinc-400">Side-by-side analysis of roles, skills, and contributions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClearAll();
                  onClose();
                }}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                Clear Matrix
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Matrix Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedMembers.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 space-y-3">
                <ArrowRightLeft className="w-12 h-12 mx-auto text-zinc-700 animate-pulse" />
                <p className="text-base font-medium">No members selected for comparison</p>
                <p className="text-xs text-zinc-600 max-w-md mx-auto">
                  Click the comparison icon on team cards to add members side-by-side.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-5 hover:border-blue-500/30 transition-all group"
                  >
                    {/* Remove Member Pin */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onRemoveMember(member.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-zinc-400 hover:text-red-400 hover:bg-red-500/20 transition-all"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Member Header */}
                    <div className="flex flex-col items-center text-center pt-2">
                      <img
                        src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"}
                        alt={member.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/30 shadow-lg mb-3"
                      />
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h4>
                      <div className="text-xs text-blue-400 font-medium">{member.role}</div>
                      <span className="mt-2 inline-block px-2.5 py-0.5 text-[11px] rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        {member.domain}
                      </span>
                    </div>

                    {/* Attribute Breakdown */}
                    <div className="space-y-4 text-xs text-zinc-300 flex-1 border-t border-white/10 pt-4">
                      {/* Department / Domain */}
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                          Domain
                        </div>
                        <div className="font-semibold text-white">{member.domain}</div>
                      </div>

                      {/* Key Skills */}
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1.5">
                          Top Skills
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills && member.skills.length > 0 ? (
                            member.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-600 italic">No skills listed</span>
                          )}
                        </div>
                      </div>

                      {/* Bio / Summary */}
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                          Overview
                        </div>
                        <p className="text-zinc-400 line-clamp-3 leading-relaxed">
                          {member.bio || "Active E-Cell team member contributing to entrepreneurial events and leadership."}
                        </p>
                      </div>

                      {/* Experience / Projects */}
                      {member.projects && member.projects.length > 0 && (
                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">
                            Key Projects ({member.projects.length})
                          </div>
                          <div className="space-y-1">
                            {member.projects.slice(0, 2).map((proj, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-blue-300">
                                <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                                <span className="truncate">{proj}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Action */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onOpenProfile(member);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 hover:border-blue-400 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:from-blue-600/50 group-hover:to-purple-600/50"
                    >
                      <span>Full Member Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>Comparing {selectedMembers.length} of max 3 members</span>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
            >
              Done Comparing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
