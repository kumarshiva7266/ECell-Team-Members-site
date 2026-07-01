"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Member } from "@/lib/teamStore";

interface OrgChartProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
}

/* ─── Static Faculty Node ─── */
const FacultyNode: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center"
  >
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-lg" />
      <div className="relative glass-panel border border-emerald-500/30 rounded-2xl px-6 py-4 flex flex-col items-center text-center min-w-[220px]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xl mb-2 shadow-lg">
          🎓
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Faculty Coordinator</span>
        <span className="text-sm font-bold text-white">Ms. D. Navya</span>
      </div>
    </div>
  </motion.div>
);

/* ─── Named Org Node (shows name directly, clickable for profile) ─── */
interface NamedNodeProps {
  emoji: string;
  label: string;
  name: string;
  sublabel?: string;
  color: string;      // border/glow color class e.g. "blue"
  member?: Member;
  onSelect?: (m: Member) => void;
  delay?: number;
}

const COLORS: Record<string, { border: string; bg: string; text: string; dot: string; glow: string }> = {
  blue:   { border: "border-blue-500/40",   bg: "from-blue-500/20 to-blue-600/10",   text: "text-blue-400",   dot: "bg-blue-500",   glow: "bg-blue-500/15"   },
  purple: { border: "border-purple-500/40", bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-400", dot: "bg-purple-500", glow: "bg-purple-500/15" },
  pink:   { border: "border-pink-500/40",   bg: "from-pink-500/20 to-pink-600/10",   text: "text-pink-400",   dot: "bg-pink-500",   glow: "bg-pink-500/15"   },
  cyan:   { border: "border-cyan-500/40",   bg: "from-cyan-500/20 to-cyan-600/10",   text: "text-cyan-400",   dot: "bg-cyan-500",   glow: "bg-cyan-500/15"   },
  amber:  { border: "border-amber-500/40",  bg: "from-amber-500/20 to-amber-600/10", text: "text-amber-400",  dot: "bg-amber-500",  glow: "bg-amber-500/15"  },
  emerald:{ border: "border-emerald-500/40",bg: "from-emerald-500/20 to-emerald-600/10",text: "text-emerald-400",dot: "bg-emerald-500",glow: "bg-emerald-500/15"},
  violet: { border: "border-violet-500/40", bg: "from-violet-500/20 to-violet-600/10", text: "text-violet-400", dot: "bg-violet-500", glow: "bg-violet-500/15" },
  orange: { border: "border-orange-500/40", bg: "from-orange-500/20 to-orange-600/10", text: "text-orange-400", dot: "bg-orange-500", glow: "bg-orange-500/15" },
  rose:   { border: "border-rose-500/40",   bg: "from-rose-500/20 to-rose-600/10",   text: "text-rose-400",   dot: "bg-rose-500",   glow: "bg-rose-500/15"   },
};

const NamedNode: React.FC<NamedNodeProps> = ({ emoji, label, name, sublabel, color, member, onSelect, delay = 0 }) => {
  const c = COLORS[color] ?? COLORS.blue;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => member && onSelect && onSelect(member)}
      className={`relative glass-panel border ${c.border} rounded-2xl px-4 py-3.5 flex flex-col items-center text-center min-w-[160px] max-w-[200px] transition-all duration-300 hover:scale-105 hover:shadow-lg ${member ? "cursor-pointer" : ""}`}
    >
      <div className={`absolute inset-0 rounded-2xl ${c.glow} blur-xl pointer-events-none`} />
      <div className="relative flex flex-col items-center">
        <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse mb-2`} />
        <span className={`text-[9px] font-bold uppercase tracking-widest ${c.text} mb-1`}>{label}</span>
        <span className="text-sm font-bold text-white leading-tight">{name}</span>
        {sublabel && <span className="text-[10px] text-zinc-500 mt-0.5">{sublabel}</span>}
      </div>
    </motion.div>
  );
};

/* ─── Domain Group Node (collapsible, shows all member names inside) ─── */
interface DomainGroupProps {
  emoji: string;
  domainName: string;
  color: string;
  members: Member[];
  onSelect: (m: Member) => void;
  delay?: number;
}

const DomainGroup: React.FC<DomainGroupProps> = ({ emoji, domainName, color, members, onSelect, delay = 0 }) => {
  const [open, setOpen] = useState(true);
  const c = COLORS[color] ?? COLORS.blue;
  const domainMembers = members.filter(m => m.domain === domainName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      {/* Domain Header Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`relative glass-panel border ${c.border} rounded-2xl px-4 py-3 flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-105 min-w-[190px] justify-between`}
      >
        <div className={`absolute inset-0 rounded-2xl ${c.glow} blur-lg pointer-events-none`} />
        <span className="text-lg">{emoji}</span>
        <div className="flex flex-col items-start flex-1">
          <span className={`text-[9px] font-bold uppercase tracking-widest ${c.text}`}>Domain</span>
          <span className="text-xs font-bold text-white leading-tight">{domainName}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-[10px] font-mono ${c.text} bg-white/5 px-1.5 py-0.5 rounded-md`}>{domainMembers.length}</span>
          {open ? <ChevronUp className={`w-3.5 h-3.5 ${c.text}`} /> : <ChevronDown className={`w-3.5 h-3.5 ${c.text}`} />}
        </div>
      </button>

      {/* Members list — always expanded by default, collapsible */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden flex flex-col items-center w-full"
          >
            {/* Connector line */}
            <div className={`w-0.5 h-3 ${c.dot} opacity-30`} />
            <div className={`flex flex-col gap-1.5 p-3 rounded-xl border ${c.border} bg-white/[0.02] w-full`}>
              {domainMembers.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onSelect(m)}
                  className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-white/[0.15] rounded-xl px-2.5 py-2 cursor-pointer transition-all group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} className="w-6 h-6 rounded-full object-cover border border-white/10 shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[11px] font-semibold text-zinc-100 truncate group-hover:text-white">{m.name}</div>
                    <div className={`text-[9px] ${c.text} truncate`}>{m.role}</div>
                  </div>
                </motion.div>
              ))}
              {domainMembers.length === 0 && (
                <span className="text-[10px] text-zinc-600 py-1 text-center">No members yet</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Connector Line ─── */
const Line: React.FC<{ height?: string }> = ({ height = "h-8" }) => (
  <div className={`w-0.5 ${height} bg-gradient-to-b from-white/15 to-white/5`} />
);

const HConnector: React.FC<{ width?: string }> = ({ width = "w-1/2" }) => (
  <div className={`relative ${width} max-w-xs flex justify-between`}>
    <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
    <div className="w-px h-4 bg-white/10" />
    <div className="w-px h-4 bg-white/10" />
  </div>
);

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export const OrgChart: React.FC<OrgChartProps> = ({ members, onSelectMember }) => {
  const findMember = (nameFragment: string) =>
    members.find(m => m.name.toLowerCase().includes(nameFragment.toLowerCase()));

  return (
    <div className="flex flex-col items-center gap-0 py-8 relative select-none w-full overflow-x-auto">

      {/* ── Level 1: Faculty Coordinator ── */}
      <FacultyNode />
      <Line />


      {/* ── Level 3: Advisory Committee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center"
      >
        <NamedNode
          emoji="🏛️"
          label="Advisory Committee"
          name="Anshu Kumar"
          color="emerald"
          member={findMember("Anshu")}
          onSelect={onSelectMember}
          delay={0.2}
        />
        <NamedNode
          emoji="🏛️"
          label="Advisory Committee"
          name="Maheswar Rao"
          color="emerald"
          member={findMember("Maheswar")}
          onSelect={onSelectMember}
          delay={0.25}
        />
      </motion.div>
      <Line />

      {/* ── Level 4: President ── */}
      <NamedNode
        emoji="🎯"
        label="President"
        name="M. Rohith Kumar"
        color="blue"
        member={findMember("Rohith")}
        onSelect={onSelectMember}
        delay={0.3}
      />
      <Line />

      {/* ── Level 5: Vice Presidents (Two branches from President) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center"
      >
        <NamedNode
          emoji="⚙️"
          label="Vice-President (Operations)"
          name="B. Lavanya"
          color="purple"
          member={findMember("Lavanya")}
          onSelect={onSelectMember}
          delay={0.35}
        />
        <NamedNode
          emoji="📡"
          label="Vice-President (Outreach)"
          name="P. Goutham Reddy"
          color="pink"
          member={findMember("Goutham")}
          onSelect={onSelectMember}
          delay={0.4}
        />
      </motion.div>
      <Line />

      {/* ── Level 6: Web & Tech ── */}
      <div className="flex flex-col items-center">
        <NamedNode
          emoji="�"
          label="Web & Technology"
          name="G. Shiv Prasad"
          color="violet"
          member={findMember("Shiv")}
          onSelect={onSelectMember}
          delay={0.4}
        />
        <Line />
      </div>

      {/* ── Level 7: Secretary & Treasurer ── */}
      <div className="flex flex-col items-center">
        <NamedNode
          emoji="�"
          label="Secretary & Treasurer"
          name="Trisha Mewade"
          color="cyan"
          member={findMember("Trisha")}
          onSelect={onSelectMember}
          delay={0.45}
        />
        <Line />
      </div>

      {/* ── Level 8: All Domain Sub-Teams (Collapsible groups showing all names) ── */}
      <div className="w-full max-w-6xl px-4">
        {/* Wide horizontal connector */}
        <div className="relative w-full flex justify-around mb-0">
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-white/10" />
          {["Marketing & PR","Creative & Design","Event Management","Social Media & Influencer"].map((_, i) => (
            <div key={i} className="w-px h-4 bg-white/10" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-1 w-full">
          <DomainGroup
            emoji="📢"
            domainName="Marketing & PR"
            color="rose"
            members={members}
            onSelect={onSelectMember}
            delay={0.5}
          />
          <DomainGroup
            emoji="🎨"
            domainName="Creative & Design"
            color="violet"
            members={members}
            onSelect={onSelectMember}
            delay={0.55}
          />
          <DomainGroup
            emoji="📅"
            domainName="Event Management"
            color="amber"
            members={members}
            onSelect={onSelectMember}
            delay={0.6}
          />
          <DomainGroup
            emoji="📱"
            domainName="Social Media & Influencer"
            color="cyan"
            members={members}
            onSelect={onSelectMember}
            delay={0.65}
          />
        </div>
      </div>

    </div>
  );
};
