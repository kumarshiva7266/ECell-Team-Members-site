"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, User, ExternalLink, Sparkles, Filter, ChevronRight, Hash, Command } from "lucide-react";
import { Member } from "@/lib/teamStore";
import { soundFx } from "@/lib/soundFx";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onSelectMember: (member: Member) => void;
  onSelectDomain: (domain: string) => void;
  domains: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  members,
  onSelectMember,
  onSelectDomain,
  domains,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      soundFx.playPop();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard Navigation inside Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered members & domains
  const filteredMembers = query.trim() === ""
    ? members.slice(0, 5)
    : members.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.role.toLowerCase().includes(query.toLowerCase()) ||
          m.domain.toLowerCase().includes(query.toLowerCase()) ||
          (m.skills && m.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())))
      );

  const filteredDomains = domains.filter(
    (d) => d !== "All" && d.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-zinc-900/90 border border-white/15 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Search Header */}
            <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search team members, roles, skills, or domains..."
                className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[10px]">ESC</span> to close
              </kbd>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
              {/* Member Results */}
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center justify-between">
                  <span>Team Members</span>
                  <span>{filteredMembers.length} found</span>
                </div>
                {filteredMembers.length === 0 ? (
                  <div className="p-6 text-center text-zinc-500 text-sm">
                    No team members found matching "{query}"
                  </div>
                ) : (
                  <div className="space-y-1 mt-1">
                    {filteredMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => {
                          soundFx.playClick();
                          onSelectMember(member);
                          onClose();
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 border border-transparent hover:border-blue-500/20 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={member.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-white/15 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                              {member.name}
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300">
                                {member.domain}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-400">{member.role}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Domains Results */}
              {filteredDomains.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="px-3 py-1 text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                    Domains & Teams
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                    {filteredDomains.map((domain) => (
                      <button
                        key={domain}
                        onClick={() => {
                          soundFx.playClick();
                          onSelectDomain(domain);
                          onClose();
                        }}
                        onMouseEnter={() => soundFx.playHover()}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left text-xs font-medium text-zinc-300 hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-purple-400" />
                          {domain}
                        </span>
                        <span className="text-[10px] text-zinc-500">Filter</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> E-Cell Dynamic Command Center
              </span>
              <span>Select any item to jump directly</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
