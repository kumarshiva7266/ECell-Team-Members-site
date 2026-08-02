"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Award,
  UserCheck,
  Flag,
  Laptop,
  Users,
  Sparkles,
  TrendingUp,
  Handshake,
  Target,
  Rocket,
  Lightbulb,
  Building2,
  ShieldCheck,
  HelpCircle,
  Layers,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Globe,
  FileText,
  BarChart3,
  Clock,
  Flame,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  Zap,
  Star
} from "lucide-react";

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "foundation" | "timeline" | "activities" | "impact" | "challenges" | "metrics"
  >("overview");

  // ── Departments List (Section 2.3) ──
  const departments = [
    { name: "Technical", icon: <Laptop className="w-4 h-4 text-blue-400" />, desc: "Website, app, and digital infrastructure management.", badge: "Engineering & Dev" },
    { name: "Marketing", icon: <Flame className="w-4 h-4 text-amber-400" />, desc: "Brand building, outreach campaigns, and audience growth.", badge: "Growth & Reach" },
    { name: "Human Resources (HR)", icon: <Users className="w-4 h-4 text-purple-400" />, desc: "Recruitment, onboarding, and member engagement.", badge: "People & Culture" },
    { name: "Design", icon: <Sparkles className="w-4 h-4 text-pink-400" />, desc: "Creative assets, posters, branding, and visual identity.", badge: "Branding & UI/UX" },
    { name: "Sponsorship", icon: <Handshake className="w-4 h-4 text-emerald-400" />, desc: "Corporate outreach, fundraising, and partnership deals.", badge: "Fundraising" },
    { name: "Content", icon: <FileText className="w-4 h-4 text-cyan-400" />, desc: "Copywriting, newsletters, blogs, and social media content.", badge: "Editorial & PR" },
    { name: "Operations", icon: <Layers className="w-4 h-4 text-orange-400" />, desc: "Logistics, scheduling, and on-ground event execution.", badge: "Execution" },
    { name: "Finance", icon: <BarChart3 className="w-4 h-4 text-teal-400" />, desc: "Budgeting, expense tracking, and financial reporting.", badge: "Fiscal Control" },
    { name: "Events", icon: <Award className="w-4 h-4 text-violet-400" />, desc: "Planning and hosting flagship and recurring events.", badge: "Flagships" },
  ];

  // ── Annual Timeline Data (Section 3.8 Table 2) ──
  const timelinePhases = [
    {
      phase: "Phase 1",
      timeline: "June – July 2025",
      title: "Formation & Strategic Planning",
      desc: "Establishing organizational charter, leadership selection, recruitment drives, onboarding, and annual roadmap formulation.",
      icon: <Target className="w-5 h-5" />,
      tag: "Planning",
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
      activities: ["Core charter drafting & admin approval", "Multi-round recruitment drive", "Departmental goal setting"]
    },
    {
      phase: "Phase 2",
      timeline: "August – September 2025",
      title: "Foundation Building & Orientation",
      desc: "Intensive skill-building workshops, internal team syncs, domain training in public speaking, design, digital marketing, and financial modeling.",
      icon: <BookOpen className="w-5 h-5" />,
      tag: "Orientation",
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
      activities: ["Orientation bootcamp for new recruits", "Masterclasses on pitch structures", "Internal hackathons for icebreaking"]
    },
    {
      phase: "Phase 3",
      timeline: "October – December 2025",
      title: "Flagship Season I: Ideation & Validation",
      desc: "Hosting guest lectures by industry leaders, ideathons, technical hackathons, and industrial visits to corporate R&D setups.",
      icon: <Zap className="w-5 h-5" />,
      tag: "Ideation",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      activities: ["HackStart 48-Hour Hackathon", "Alumni Founder Speak Series", "Industrial study visits"]
    },
    {
      phase: "Phase 4",
      timeline: "January – March 2026",
      title: "Flagship Season II: Pitching & Acceleration",
      desc: "Conducting high-stakes business plan competitions, pitching events before angel investors, and regional startup conclaves.",
      icon: <Rocket className="w-5 h-5" />,
      tag: "Execution",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      activities: ["Annual E-Summit 2026", "Investor Pitch Desk Rounds", "Business Plan Competitions"]
    },
    {
      phase: "Phase 5",
      timeline: "April – May 2026",
      title: "Evaluation, Incubation & Handover",
      desc: "Assessing annual impact metrics, transitioning promising campus startups into incubation pipelines, annual documentation, and leadership transition.",
      icon: <Award className="w-5 h-5" />,
      tag: "Handover",
      color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30",
      activities: ["Annual Impact Report release", "Summer Cohort Incubation induction", "Leadership handover ceremony"]
    }
  ];

  // ── Major Activities (Section 4 Table 3) ──
  const majorActivities = [
    { name: "Workshops", purpose: "Build foundational skills in business, design, and technology.", icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
    { name: "Guest Lectures", purpose: "Provide direct insight from founders, investors, and industry leaders.", icon: <Users className="w-4 h-4 text-purple-400" /> },
    { name: "Startup Bootcamps", purpose: "Intensive, multi-day programmes on venture building fundamentals.", icon: <Rocket className="w-4 h-4 text-amber-400" /> },
    { name: "Ideathons", purpose: "Encourage rapid ideation and structured problem-framing in teams.", icon: <Lightbulb className="w-4 h-4 text-yellow-400" /> },
    { name: "Hackathons", purpose: "Promote technical innovation and rapid prototyping under timed pressure.", icon: <Laptop className="w-4 h-4 text-cyan-400" /> },
    { name: "Business Plan Competitions", purpose: "Test students' ability to build structured, viable business models.", icon: <BarChart3 className="w-4 h-4 text-emerald-400" /> },
    { name: "Pitching Events", purpose: "Develop concise, persuasive communication of venture ideas to angels.", icon: <Zap className="w-4 h-4 text-pink-400" /> },
    { name: "Innovation Challenges", purpose: "Solve real-world problems posed by industry or social partners.", icon: <Target className="w-4 h-4 text-rose-400" /> },
    { name: "Industrial Visits", purpose: "Expose students to real operational and business environments.", icon: <Building2 className="w-4 h-4 text-orange-400" /> },
    { name: "Incubation Support", purpose: "Offer mentorship, seed links, and resources to promising student startups.", icon: <Sparkles className="w-4 h-4 text-teal-400" /> }
  ];

  // ── Impact on Students (Section 5) ──
  const studentImpacts = [
    { title: "Leadership Development", desc: "Managing teams, departments, and large-scale events builds decision-making capability under real deadlines.", icon: <UserCheck className="w-5 h-5 text-blue-400" /> },
    { title: "Communication Skills", desc: "Public speaking, pitching, and corporate sponsor interactions sharpen verbal and written communication.", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { title: "Teamwork & Synergy", desc: "Cross-departmental collaboration fosters cooperative working habits and empathy across domains.", icon: <Users className="w-5 h-5 text-purple-400" /> },
    { title: "Structured Problem-Solving", desc: "Ideathons and innovation challenges train analytical thinking and structured problem framing.", icon: <Target className="w-5 h-5 text-rose-400" /> },
    { title: "Innovation Mindset", desc: "Repeated exposure to pioneering startup ideas nurtures creativity and comfort with market ambiguity.", icon: <Lightbulb className="w-5 h-5 text-yellow-400" /> },
    { title: "Direct Startup Exposure", desc: "Direct interaction with founders, angel investors, and VCs demystifies the entire venture lifecycle.", icon: <Rocket className="w-5 h-5 text-emerald-400" /> },
    { title: "Career Opportunities", desc: "Strengthens résumés, unlocks high-value internships, incubation access, and startup placements.", icon: <Briefcase className="w-5 h-5 text-cyan-400" /> }
  ];

  // ── Challenges & Solutions (Section 6 Table 4) ──
  const challenges = [
    { challenge: "Team Management", solution: "Enforced clear role definitions, appointed department heads, and scheduled weekly review syncs.", icon: <Users className="w-4 h-4 text-blue-400" /> },
    { challenge: "Sponsorship & Funding", solution: "Diversified sponsor outreach, engaged active alumni networks, and offered tiered corporate packages.", icon: <Handshake className="w-4 h-4 text-emerald-400" /> },
    { challenge: "Member Engagement", solution: "Implemented peer recognition systems, skill workshops, and rotational event responsibilities.", icon: <Star className="w-4 h-4 text-amber-400" /> },
    { challenge: "Time Management", solution: "Adopted shared digital calendars, milestone-based sprint planning, and strict early deadline buffers.", icon: <Clock className="w-4 h-4 text-purple-400" /> },
    { challenge: "Event Coordination", solution: "Formed a dedicated Operations team paired with exhaustive, step-by-step execution checklists.", icon: <ShieldCheck className="w-4 h-4 text-pink-400" /> }
  ];

  // ── Success Metrics (Section 7 Table 5) ──
  const metrics = [
    { label: "Active Members", current: "150+", previous: "50", growth: "+200%", icon: <Users className="w-5 h-5 text-blue-400" /> },
    { label: "Events Conducted", current: "20+", previous: "5", growth: "+300%", icon: <Award className="w-5 h-5 text-purple-400" /> },
    { label: "Workshops Organised", current: "15+", previous: "3", growth: "+400%", icon: <BookOpen className="w-5 h-5 text-amber-400" /> },
    { label: "Startups Supported / Incubated", current: "10+", previous: "2", growth: "+400%", icon: <Rocket className="w-5 h-5 text-emerald-400" /> },
    { label: "Industry Collaborations", current: "8+", previous: "1", growth: "+700%", icon: <Handshake className="w-5 h-5 text-cyan-400" /> },
    { label: "Social Media Following", current: "10,000+", previous: "500", growth: "+1900%", icon: <Flame className="w-5 h-5 text-pink-400" /> },
    { label: "Community Reach", current: "5,000+", previous: "200", growth: "+2400%", icon: <Globe className="w-5 h-5 text-teal-400" /> }
  ];

  // ── Future Roadmap (Section 8) ──
  const roadmapPillars = [
    { title: "Expansion & Satellite Chapters", desc: "Scaling active membership and launching satellite E-Cell chapters across regional engineering campuses.", icon: <Globe className="w-5 h-5 text-blue-400" /> },
    { title: "National Flagship Summits", desc: "Hosting national-scale innovation summits drawing participation from 100+ premier technical institutes.", icon: <Award className="w-5 h-5 text-purple-400" /> },
    { title: "Formal In-House Incubation", desc: "Formalizing a state-of-the-art incubation cell complete with seed funding tie-ups and legal sandbox credits.", icon: <Building2 className="w-5 h-5 text-emerald-400" /> },
    { title: "Deep VC Partnerships", desc: "Establishing direct syndicates with corporate accelerators, angel networks, and early-stage venture capital firms.", icon: <Handshake className="w-5 h-5 text-amber-400" /> },
    { title: "International Exchange", desc: "Partnering with global university E-Cells and international startup ecosystems for student founder exchanges.", icon: <Sparkles className="w-5 h-5 text-pink-400" /> },
    { title: "Regional Hub Blueprint", desc: "Positioning E-Cell PEC as a recognized regional beacon for student entrepreneurship, comparable to E-Cell IIT Bombay.", icon: <Flame className="w-5 h-5 text-orange-400" /> }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 space-y-10">
      
      {/* ══════════════════════════════════════════════════════
          HERO REPORT HEADER (Pallavi Engineering College AY 2025-2026)
      ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-[28px] glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl bg-gradient-to-br from-zinc-950/90 via-black/80 to-blue-950/30 text-center">
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-blue-500/10 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-purple-500/10 blur-[60px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-blue-500/10">
          <Building2 className="w-3.5 h-3.5" />
          Pallavi Engineering College • Academic Year (2025-2026)
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Journey of an <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Entrepreneurship Cell</span>
        </h1>

        <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
          Building a Culture of Innovation, Leadership, and Entrepreneurship on Campus. A comprehensive institutional report documenting our ecosystem, functional structure, event execution, and metrics.
        </p>

        {/* Quick Highlights Badge Row */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-blue-400" /> 150+ Active Members
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5 font-medium">
            <Award className="w-3.5 h-3.5 text-purple-400" /> 20+ Annual Events
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1.5 font-medium">
            <Rocket className="w-3.5 h-3.5 text-emerald-400" /> 10+ Incubated Startups
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB SELECTION BAR
      ══════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {[
          { id: "overview", label: "Vision & Overview", icon: <Target className="w-4 h-4" /> },
          { id: "foundation", label: "Structure & Hierarchy", icon: <Layers className="w-4 h-4" /> },
          { id: "timeline", label: "Annual Timeline", icon: <Calendar className="w-4 h-4" /> },
          { id: "activities", label: "Major Activities", icon: <Zap className="w-4 h-4" /> },
          { id: "impact", label: "Student Impact", icon: <GraduationCap className="w-4 h-4" /> },
          { id: "challenges", label: "Challenges & Solutions", icon: <ShieldCheck className="w-4 h-4" /> },
          { id: "metrics", label: "Metrics & Roadmap", icon: <BarChart3 className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB CONTENT VIEWS
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        
        {/* ── TAB 1: VISION & OVERVIEW (Section 1) ── */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Vision & Mission Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-[22px] p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cell Vision</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  To cultivate a vibrant, self-sustaining culture of entrepreneurship and innovation within Pallavi Engineering College, empowering students to become creators of opportunity rather than merely seekers of employment.
                </p>
              </div>

              <div className="glass-card rounded-[22px] p-6 md:p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cell Mission</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  To provide students with the knowledge, skills, network, and platforms required to identify real-world problems, design scalable solutions, and build sustainable ventures while instilling values of leadership, resilience, and collaboration.
                </p>
              </div>
            </div>

            {/* Core Objectives */}
            <div className="glass-card rounded-[24px] p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Key Strategic Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Fundamental Exposure", desc: "Introduce students to core startup concepts, market validation, and venture fundamentals." },
                  { title: "Hands-on Sprints", desc: "Provide experiential learning through hackathons, bootcamps, and business plan contests." },
                  { title: "Network & Mentorship", desc: "Facilitate direct mentorship with founders, angel networks, and VC representatives." },
                  { title: "Incubation Support", desc: "Guide early-stage student startups with co-working, legal aid, and seed opportunities." },
                  { title: "Transferable Skills", desc: "Equip members with high-value leadership, negotiation, communication, and management skills." },
                  { title: "Ecosystem Integration", desc: "Bridge campus innovations with national incubators, accelerators, and corporate partners." }
                ].map((obj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                    <div className="text-blue-400 text-xs font-mono mb-1 font-bold">0{idx + 1}.</div>
                    <h4 className="text-sm font-semibold text-white mb-1">{obj.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Importance in Education (Section 1.3) */}
            <div className="glass-panel rounded-[24px] p-6 md:p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-pink-400" />
                Role in Institutional Excellence
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-4">
                Modelled on pioneering bodies such as E-Cell IIT Bombay, an E-Cell acts as a vital bridge between academic theory and practical venture creation. It offers experiential learning outside traditional classrooms, encouraging students to take calculated risks and solve real societal problems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono">Job Creators over Job Seekers</span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono">Feeder to Incubators</span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">Industry Ecosystem Linkage</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: STRUCTURE & HIERARCHY (Section 2) ── */}
        {activeTab === "foundation" && (
          <motion.div
            key="foundation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Functional Departmental Matrix (Section 2.3 Table 1) */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-blue-400 font-semibold tracking-wider">Operational Architecture</span>
                <h3 className="text-2xl font-bold text-white">9 Functional Departments</h3>
                <p className="text-xs text-zinc-400 mt-1">Self-governed specialized teams driving daily operations and event execution.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map((dept, idx) => (
                  <div key={idx} className="glass-card rounded-[20px] p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center">
                          {dept.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 font-semibold">
                          {dept.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1.5">{dept.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{dept.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organisational Hierarchy Tree (Section 2.4 Figure 1) */}
            <div className="glass-panel rounded-[24px] p-6 sm:p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Organisational Leadership Hierarchy
              </h3>

              <div className="space-y-4 max-w-3xl mx-auto text-center font-mono">
                {/* Faculty Advisor */}
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold text-xs sm:text-sm mx-auto max-w-md shadow-lg shadow-purple-500/10">
                  Faculty Advisor
                </div>
                <div className="text-zinc-600 text-xs">▼</div>
                {/* President */}
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold text-xs sm:text-sm mx-auto max-w-md shadow-lg shadow-blue-500/10">
                  President / Convenor
                </div>
                <div className="text-zinc-600 text-xs">▼</div>
                {/* VP & Secretary */}
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-xs">
                    Vice-President
                  </div>
                  <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 font-semibold text-xs">
                    Secretary
                  </div>
                </div>
                <div className="text-zinc-600 text-xs">▼</div>
                {/* 9 Department Heads */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-200 text-xs leading-relaxed max-w-2xl mx-auto">
                  <span className="text-amber-400 font-bold block mb-1">9 Department Heads</span>
                  Technical • Marketing • HR • Design • Sponsorship • Content • Operations • Finance • Events
                </div>
                <div className="text-zinc-600 text-xs">▼</div>
                {/* Members */}
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs max-w-md mx-auto">
                  150+ Executive Members & Campus Volunteers
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: ANNUAL TIMELINE (Section 3 & Table 2) ── */}
        {activeTab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Annual Roadmap</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">5-Phase Activity Timeline (2025–2026)</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl mx-auto">From student recruitment and orientation to flagship summits and incubator handovers.</p>
            </div>

            <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 space-y-8 ml-2 sm:ml-4">
              {timelinePhases.map((phase, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-zinc-950 border-2 border-white/20 flex items-center justify-center text-blue-400 shadow-lg group-hover:border-blue-500 transition-colors">
                    {phase.icon}
                  </div>

                  <div className="glass-card rounded-[22px] p-6 hover:border-blue-500/30 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {phase.timeline}
                      </span>
                      <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full border ${phase.color}`}>
                        {phase.phase} • {phase.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">{phase.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">{phase.desc}</p>

                    <div className="border-t border-white/[0.06] pt-3">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">Key Operational Deliverables</div>
                      <div className="flex flex-wrap gap-2">
                        {phase.activities.map((act, aIdx) => (
                          <span key={aIdx} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-300 flex items-center gap-1.5">
                            <ChevronRight className="w-3 h-3 text-blue-400 shrink-0" />
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: MAJOR ACTIVITIES (Section 4 Table 3) ── */}
        {activeTab === "activities" && (
          <motion.div
            key="activities"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">Event Calendar & Offerings</span>
              <h3 className="text-2xl font-bold text-white">10 Major E-Cell Initiatives</h3>
              <p className="text-xs text-zinc-400 mt-1">Structured programmes catering to every stage of entrepreneurial learning.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {majorActivities.map((act, idx) => (
                <div key={idx} className="glass-card rounded-[20px] p-5 hover:border-amber-500/30 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {act.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                      {act.name}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{act.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 5: STUDENT IMPACT (Section 5) ── */}
        {activeTab === "impact" && (
          <motion.div
            key="impact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-pink-400 font-semibold tracking-wider">Student Development</span>
              <h3 className="text-2xl font-bold text-white">7 Core Growth Outcomes</h3>
              <p className="text-xs text-zinc-400 mt-1">Measurable personal and professional development achieved by participating members.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {studentImpacts.map((imp, idx) => (
                <div key={idx} className="glass-card rounded-[22px] p-6 hover:border-pink-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
                    {imp.icon}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{imp.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{imp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 6: CHALLENGES & SOLUTIONS (Section 6 Table 4) ── */}
        {activeTab === "challenges" && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">Operational Problem Solving</span>
              <h3 className="text-2xl font-bold text-white">Key Challenges & Practical Solutions</h3>
              <p className="text-xs text-zinc-400 mt-1">How our student leadership mitigates operational bottlenecks.</p>
            </div>

            <div className="space-y-4">
              {challenges.map((item, idx) => (
                <div key={idx} className="glass-card rounded-[22px] p-6 hover:border-cyan-500/30 transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Challenge 0{idx + 1}</span>
                      <h4 className="text-base font-bold text-white">{item.challenge}</h4>
                    </div>
                  </div>

                  <div className="md:col-span-8 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-300 block mb-0.5">Implemented Practical Solution:</span>
                      {item.solution}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 7: METRICS & ROADMAP (Sections 7 & 8) ── */}
        {activeTab === "metrics" && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Section 7 Table 5 YoY Metrics */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">Achievements & Growth</span>
                <h3 className="text-2xl font-bold text-white">Year-on-Year Success Metrics</h3>
                <p className="text-xs text-zinc-400 mt-1">Quantitative trajectory of E-Cell PEC over successive academic cycles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, idx) => (
                  <div key={idx} className="glass-card rounded-[22px] p-5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                          {m.icon}
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                          {m.growth}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-mono">{m.current}</div>
                      <div className="text-xs font-semibold text-zinc-300 mb-1">{m.label}</div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 border-t border-white/[0.04] pt-2 mt-2">
                      Previous baseline: <span className="text-zinc-400">{m.previous}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 8 Future Roadmap Pillars */}
            <div className="glass-panel rounded-[26px] p-6 sm:p-8 border border-white/10">
              <div className="mb-6">
                <span className="text-xs font-mono uppercase text-purple-400 font-semibold tracking-wider">Vision Ahead</span>
                <h3 className="text-2xl font-bold text-white">6 Pillars of Future Growth</h3>
                <p className="text-xs text-zinc-400 mt-1">Long-term vision positioning E-Cell PEC as a premier regional entrepreneurship hub.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {roadmapPillars.map((p, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                      {p.icon}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                      {p.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 9 Conclusion Banner */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-white/10 text-center">
              <h4 className="text-lg font-bold text-white mb-2">Transforming Curiosity into Capability</h4>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
                Beyond the ventures directly supported, E-Cell PEC's enduring contribution lies in the mindset it instils in every student — the confidence to identify problems, the discipline to plan solutions, and the resilience to execute them.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
