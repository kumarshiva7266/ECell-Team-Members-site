"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Search, ChevronUp, Menu, X, Zap, Users, Calendar, Rocket,
  Trophy, ArrowDown, Star, Globe2, Building, Sparkles, TrendingUp,
  Target, Award, Lightbulb, ArrowRight, Play, Pause, RefreshCw
} from "lucide-react";

import { Member, TeamService } from "@/lib/teamStore";
import { GlassCard }     from "@/components/GlassCard";
import { GlassModal }    from "@/components/GlassModal";
import { MemberCard }    from "@/components/MemberCard";
import { OrgChart }      from "@/components/OrgChart";
import { Timeline }      from "@/components/Timeline";
import { Gallery }       from "@/components/Gallery";
import { Testimonials }  from "@/components/Testimonials";
import { ThreeBg }       from "@/components/ThreeBg";
import Contact         from "@/components/Contact";
import { AuthStore, UserProfile, UpdatesStore, Update } from "@/lib/authStore";
import { AuthModal }     from "@/components/AuthModal";
import { Profile }       from "@/components/Profile";

/* ────────────────────────────────────────
   CONFIG / CONSTANTS
──────────────────────────────────────── */
const DOMAINS = ["All", "Leadership", "Web & Technology", "Marketing & PR", "Creative & Design", "Event Management", "Social Media & Influencer", "Advisory Committee"];

const DOMAIN_ICONS: Record<string, string> = {
  "All":                       "🌐",
  "Leadership":                "🎯",
  "Web & Technology":          "💻",
  "Marketing & PR":            "📢",
  "Creative & Design":         "🎨",
  "Event Management":          "📅",
  "Social Media & Influencer": "📱",
  "Advisory Committee":        "👥",
};

const STATS = [
  { label: "Active Members",    value: 50,  suffix: "+", icon: <Users    className="w-6 h-6" /> },
  { label: "Events Organized",  value: 50,  suffix: "+", icon: <Calendar className="w-6 h-6" /> },
  { label: "Startups Mentored", value: 15,  suffix: "+", icon: <Rocket   className="w-6 h-6" /> },
  { label: "Projects Built",    value: 20,  suffix: "+", icon: <Trophy   className="w-6 h-6" /> },
  { label: "Industry Partners", value: 30,  suffix: "+", icon: <Globe2   className="w-6 h-6" /> },
  { label: "Departments",       value: 9,   suffix: "",  icon: <Building className="w-6 h-6" /> },
];

/* ────────────────────────────────────────
   COUNT-UP HOOK
──────────────────────────────────────── */
function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

/* ────────────────────────────────────────
   STAT CARD
──────────────────────────────────────── */
const StatCard: React.FC<typeof STATS[number]> = ({ label, value, suffix, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="liquid-crystal-card rounded-[22px] p-6 flex flex-col items-center text-center transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </div>
  );
};

/* ────────────────────────────────────────
   NAV LINKS (Representing active views)
──────────────────────────────────────── */
const NAV_LINKS = [
  { tab: "Home",        label: "Home"       },
  { tab: "Leadership",  label: "Core"       },
  { tab: "Structure",   label: "Structure"  },
  { tab: "Directory",   label: "Directory"  },
  { tab: "Impact",      label: "Impact"     },
  { tab: "Journey",     label: "Journey"    },
  { tab: "Gallery",     label: "Gallery"    },
  { tab: "Updates",     label: "Updates"    },
  { tab: "Contact",     label: "Contact"    },
];

/* ════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════ */
export default function HomePage() {
  /* ── State ── */
  const [members, setMembers]             = useState<Member[]>([]);
  const [filteredMembers, setFiltered]    = useState<Member[]>([]);
  const [selectedDomain, setDomain]       = useState("All");
  const [searchQuery, setSearch]          = useState("");
  const [selectedYear, setYear]           = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [modalOpen, setModalOpen]         = useState(false);
  const [mobileNavOpen, setMobileNav]     = useState(false);
  const [showBackTop, setShowBackTop]     = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeTab, setActiveTab]         = useState("Home");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userProfile, setUserProfile]     = useState<UserProfile | null>(null);
  const [updates, setUpdates]             = useState<Update[]>([]);
  const [newUpdateTitle, setNewUpdateTitle] = useState("");
  const [newUpdateContent, setNewUpdateContent] = useState("");
  const [isPosting, setIsPosting]         = useState(false);
  const [postError, setPostError]         = useState("");

  useEffect(() => {
    const unsub = AuthStore.subscribe((user, profile) => {
      setUserProfile(profile);
      if (activeTab === "Profile" && !profile) {
        setActiveTab("Home");
      }
    });
    return () => unsub();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Home" && !userProfile) {
      setActiveTab("Home");
      setAuthModalOpen(true);
    }
  }, [activeTab, userProfile]);

  useEffect(() => {
    const unsub = UpdatesStore.subscribeToUpdates((updatesData) => {
      setUpdates(updatesData);
    });
    return () => unsub();
  }, []);

  /* ── Cursor glow ── */
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* ── Scroll Progress & Position ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── Load members ── */
  useEffect(() => {
    const unsub = TeamService.subscribeMembers(setMembers);
    return () => { if (typeof unsub === "function") unsub(); };
  }, []);

  /* ── Filter ── */
  useEffect(() => {
    let list = members;
    if (selectedDomain !== "All") list = list.filter(m => m.domain === selectedDomain);
    if (selectedYear   !== "All") list = list.filter(m => m.year   === selectedYear);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.dept.toLowerCase().includes(q) ||
        m.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    setFiltered(list);
  }, [members, selectedDomain, selectedYear, searchQuery]);

  const openModal = (m: Member) => { setSelectedMember(m); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const reloadMembers = useCallback(() => {
    const fresh = TeamService.getLocalMembers();
    setMembers([...fresh]);
  }, []);

  const YEARS_FILTER = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

  const leadershipMembers = members.filter(m => m.isCore);

  /* ════════════════════════════════════════ RENDER ════════════════════════════════════════ */
  return (
    <div className="relative min-h-screen flex flex-col bg-[#030303] text-zinc-100">

      {/* ── Cursor Glow ── */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ── Scroll Progress Bar ── */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
      />

      {/* ── Background Video (Optimized) ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 will-change-transform"
        preload="metadata"
        style={{ willChange: 'transform' }}
      >
        <source src="/images/home video.mp4" type="video/mp4" />
      </video>

      {/* ── Background Overlay ── */}
      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-panel border-b border-white/5 shadow-2xl" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={() => setActiveTab("Home")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/crew.png"
                alt="E-Cell Logo"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <span className="font-bold text-xl text-white">E-Cell<br />Crew United</span>
          </button>

          {/* Desktop Links (Liquid Crystal Pill Buttons) */}
          <ul className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map(l => (
              <li key={l.tab}>
                <button
                  onClick={() => {
                    if (l.tab === "Home" || userProfile) {
                      setActiveTab(l.tab);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      setAuthModalOpen(true);
                    }
                  }}
                  className={`liquid-crystal-btn cursor-pointer ${activeTab === l.tab ? "active" : ""}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            {userProfile?.isAdmin && (
              <button onClick={() => { setActiveTab("Admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="liquid-crystal-btn cursor-pointer">
                Admin
              </button>
            )}
            {userProfile ? (
              <button onClick={() => { setActiveTab("Profile"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="liquid-crystal-btn cursor-pointer bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-400">
                Profile
              </button>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="liquid-crystal-btn cursor-pointer">
                Login / Sign Up
              </button>
            )}
          </div>

          <button onClick={() => setMobileNav(p => !p)} className="lg:hidden liquid-crystal-btn cursor-pointer text-zinc-400">
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/5 overflow-hidden bg-[#030303]"
            >
              <div className="px-4 py-4 flex flex-col gap-1.5">
                {NAV_LINKS.map(l => (
                  <button
                    key={l.tab}
                    onClick={() => {
                      if (l.tab === "Home" || userProfile) {
                        setActiveTab(l.tab);
                        setMobileNav(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        setMobileNav(false);
                        setAuthModalOpen(true);
                      }
                    }}
                    className={`text-left px-4 py-3 text-sm rounded-xl transition-all ${
                      activeTab === l.tab 
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/20" 
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
                
                {userProfile?.isAdmin && (
                  <button onClick={() => { setActiveTab("Admin"); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left px-4 py-3 text-sm rounded-xl transition-all text-red-400 font-bold hover:bg-white/5 border border-red-500/20 bg-red-500/10 mt-2">
                    Admin
                  </button>
                )}
                {userProfile ? (
                  <button onClick={() => { setActiveTab("Profile"); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left px-4 py-3 text-sm rounded-xl transition-all text-emerald-400 font-bold hover:bg-white/5 border border-emerald-500/20 bg-emerald-500/10 mt-2">
                    Profile
                  </button>
                ) : (
                  <button onClick={() => { setAuthModalOpen(true); setMobileNav(false); }} className="text-left px-4 py-3 text-sm rounded-xl transition-all text-white font-bold hover:bg-white/5 border border-white/10 mt-2">
                    Login / Sign Up
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════
          PAGE CONTENT (SPA Dynamic Views)
      ══════════════════════════════ */}
      <main className="flex-1 flex flex-col relative z-10 w-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1.3, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col"
          >
            {/* ────────── HOME VIEW (Redesigned Professional Layout) ────────── */}
            {activeTab === "Home" && (
              <div className="flex-1 flex flex-col">
                {/* Hero Section - Enhanced with Dynamic Effects */}
                <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden min-h-[85vh]">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Modern Gradient Blobs */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        opacity: [0.15, 0.25, 0.15]
                      }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20 blur-[120px]"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-600/25 to-indigo-500/20 blur-[100px]"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        opacity: [0.08, 0.15, 0.08]
                      }}
                      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/20 to-blue-500/15 blur-[150px]"
                    />
                    {/* Floating Particles with Multiple Colors */}
                    {[...Array(15)].map((_, i) => {
                      // Use deterministic values based on index to avoid hydration mismatch
                      const seed1 = (i * 12345) % 100;
                      const seed2 = (i * 67890) % 100;
                      const seed3 = (i * 11111) % 5;
                      const seed4 = (i * 22222) % 5;
                      const seed5 = (i * 33333) % 4;
                      const seed6 = (i * 44444) % 4;
                      return (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -100 - (seed1 / 100) * 100, 0],
                            x: [0, ((seed2 / 100) - 0.5) * 50, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 6 + (seed5 / 4) * 4,
                            repeat: Infinity,
                            delay: (seed6 / 4) * 5,
                            ease: "easeInOut"
                          }}
                          className="absolute w-1.5 h-1.5 rounded-full hidden sm:block"
                          style={{
                            left: `${seed1}%`,
                            top: `${seed2}%`,
                            background: `linear-gradient(135deg, 
                              ${['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][seed3]}, 
                              ${['#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'][seed4]})`
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Personalized Greeting */}
                    {userProfile && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute -top-24 left-0 flex flex-col items-start gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">👋</span>
                          <motion.span 
                            className="text-4xl font-bold bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 bg-clip-text text-transparent cursor-pointer"
                            style={{ textShadow: "0 0 30px rgba(148, 163, 184, 0.5)" }}
                            whileHover={{ 
                              scale: 1.1,
                              textShadow: "0 0 40px rgba(148, 163, 184, 0.8)",
                              transition: { duration: 0.3 }
                            }}
                          >
                            Hi, {userProfile.name}!
                          </motion.span>
                        </div>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="text-sm text-zinc-400 font-medium"
                        >
                          Welcome to E-Cell Crew United
                        </motion.p>
                      </motion.div>
                    )}

                    {/* Animated Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center gap-2 glass-panel border-white/5 px-5 py-2.5 rounded-full text-xs text-zinc-400 mb-10"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                      <span className="font-medium">E-Cell Ecosystem Live</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </motion.div>

                    {/* Animated Main Title with Stagger Effect */}
                    <motion.div
                      initial={{ opacity: 0, scale: 1.3, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                    >
                      <motion.h1
                        initial={{ opacity: 0, scale: 1.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.95] mb-4 glossy-gradient-text"
                      >
                        E-CELL
                      </motion.h1>
                      <motion.h2
                        initial={{ opacity: 0, scale: 1.4, x: -30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] glossy-gradient-text-2 mb-6"
                      >
                        Crew United
                      </motion.h2>
                    </motion.div>

                    {/* Animated Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-xl md:text-2xl text-zinc-400 mb-6 font-light tracking-wide"
                    >
                      Meet Our Team
                    </motion.p>

                    {/* Tagline with Icons */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 mb-12"
                    >
                      <span className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-400" /> Collaborate
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      <span className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-400" /> Innovate
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-pink-400" /> Inspire
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" /> Grow
                      </span>
                    </motion.div>

                    {/* Enhanced CTA Buttons with Blue-Black Glassy Effect */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.08, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (userProfile) {
                            setActiveTab("Directory");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            setAuthModalOpen(true);
                          }
                        }}
                        className="relative overflow-hidden rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 backdrop-blur-md border border-white/20"
                        style={{
                          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(30, 58, 138, 0.8) 100%)",
                          backgroundSize: "200% 200%",
                          animation: "gradientShift 3s ease infinite"
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Users className="w-5 h-5" /> Explore Directory <ArrowRight className="w-4 h-4" />
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.08, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (userProfile) {
                            setActiveTab("Leadership");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else {
                            setAuthModalOpen(true);
                          }
                        }}
                        className="relative overflow-hidden rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 backdrop-blur-md border border-white/20"
                        style={{
                          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(15, 23, 42, 0.9) 100%)",
                          backgroundSize: "200% 200%",
                          animation: "gradientShift 4s ease infinite"
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Zap className="w-5 h-5" /> Meet Leadership
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-zinc-500"
                      >
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ArrowDown className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* About & Mission Section - Enhanced with 3D */}
                <section className="py-24 relative z-10 border-t border-white/[0.04] bg-gradient-to-b from-transparent to-[#05050a]/60">
                  <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-16"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4 block font-mono">Mission Statement</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-6">
                        About <span className="text-gradient">E-Cell</span>
                      </h2>
                      <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        The Entrepreneurship Cell is the premier innovation hub of our college, fostering startup culture, connecting aspiring founders with mentors, and building the next generation of disruptors.
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { icon: "🚀", title: "Incubation Sprints", desc: "We provide mentoring support and resources to guide 15+ student startups from early-stage concept to VC pitches.", color: "from-blue-500/30 to-cyan-500/20 border-blue-500/40 hover:shadow-blue-500/30" },
                        { icon: "🤝", title: "Corporate Connect", desc: "Forging partnerships with 30+ regional accelerators, incubation hubs, and active angel network pools.", color: "from-purple-500/30 to-pink-500/20 border-purple-500/40 hover:shadow-purple-500/30" },
                        { icon: "💡", title: "Innovation Culture", desc: "Curating workshops, events, design hackathons and bootcamps to build actionable prototypes.", color: "from-amber-500/30 to-orange-500/20 border-amber-500/40 hover:shadow-amber-500/30" }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30, rotateX: 10 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          whileHover={{ y: -15, scale: 1.08, rotateY: 8, rotateX: -8 }}
                          className={`card-3d glass-card rounded-[22px] p-8 text-center transition-all duration-300 bg-gradient-to-br ${item.color} hover:shadow-2xl`}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.4 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl mb-5"
                          >
                            {item.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Counter Summary - Enhanced with 3D */}
                <section className="py-24 relative z-10 border-t border-white/[0.04]">
                  <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-4 block font-mono">Our Impact</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.03em]">
                        Numbers That <span className="text-gradient">Matter</span>
                      </h2>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {STATS.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.08 }}
                          whileHover={{ scale: 1.1, y: -8, rotateX: 10, rotateY: 10 }}
                          className="card-3d"
                        >
                          <StatCard {...s} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* New Feature Section - Quick Actions with 3D */}
                <section className="py-24 relative z-10 border-t border-white/[0.04] bg-gradient-to-b from-[#05050a]/60 to-transparent">
                  <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-16"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block font-mono">Quick Actions</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-6">
                        Get Started <span className="text-gradient">Quickly</span>
                      </h2>
                      <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Access our most popular features and resources with one click.
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { icon: <Users className="w-6 h-6" />, title: "Browse Members", desc: "Explore our complete team directory", action: "Directory", gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/30" },
                        { icon: <Zap className="w-6 h-6" />, title: "Leadership", desc: "Meet our core executive team", action: "Leadership", gradient: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/30" },
                        { icon: <Calendar className="w-6 h-6" />, title: "Our Journey", desc: "View our milestones and timeline", action: "Journey", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30" },
                        { icon: <Trophy className="w-6 h-6" />, title: "Gallery", desc: "See our event highlights", action: "Gallery", gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/30" }
                      ].map((item, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 30, rotateX: 10 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -12, rotateY: 10, rotateX: -10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setActiveTab(item.action); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="card-3d glass-card rounded-[22px] p-6 text-left transition-all duration-300 group cursor-pointer hover:shadow-2xl border-white/10 hover:border-white/20 relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${item.gradient})` }}
                          />
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: `linear-gradient(135deg, ${item.gradient})` }}>
                            {item.icon}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-zinc-400 mb-4">{item.desc}</p>
                          <div className="text-white text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ background: `linear-gradient(135deg, ${item.gradient})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Explore <ArrowRight className="w-4 h-4" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* New Section - Testimonials Preview */}
                <section className="py-16 relative z-10 border-t border-white/[0.04]">
                  <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-10"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3 block font-mono">Testimonials</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] mb-4">
                        What People <span className="text-gradient">Say</span>
                      </h2>
                      <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto">
                        Hear from our team members and partners about their experience with E-Cell.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="glass-card rounded-[22px] p-6 md:p-8"
                    >
                      <Testimonials />
                    </motion.div>
                  </div>
                </section>
              </div>
            )}

            {/* ────────── LEADERSHIP VIEW ────────── */}
            {activeTab === "Leadership" && (
              <section className="py-16 max-w-7xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4 block font-mono">Core Leadership</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    The <span className="text-gradient">Architects</span>
                  </h2>
                  <p className="text-zinc-400 max-w-xl mx-auto">
                    Meet the core executive team driving vision, strategy, and culture across the entire cell.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {leadershipMembers
                    .filter(m => ['Rohith', 'Shiv', 'Anshu', 'Maheswar'].some(name => m.name.includes(name)))
                    .map((m) => (
                    <GlassCard key={m.id} onClick={() => openModal(m)} className="border-amber-500/20 hover:border-amber-500/40 shadow-2xl shadow-amber-500/10">
                      <div className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                        {/* Premium gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-purple-500/5 to-blue-500/5 opacity-50" />
                        
                        <div className="relative w-32 h-32 mb-5">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-purple-500 to-blue-500 opacity-40 blur-[12px] animate-pulse" />
                          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-gradient-to-r from-amber-500/30 to-purple-500/30 bg-zinc-900 shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={m.img} 
                              alt={m.name} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => { e.currentTarget.src = '/images/crew.png'; }}
                            />
                          </div>
                          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border-2 border-zinc-900 shadow-lg" />
                        </div>

                        <span className="relative text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 px-3 py-1 rounded-full mb-3 shadow-lg shadow-amber-500/20">
                          {m.role}
                        </span>
                        <h3 className="relative text-xl font-bold text-white mb-1 tracking-tight">{m.name}</h3>
                        <p className="relative text-xs text-zinc-400 font-mono mb-1">{m.dept}</p>
                        <p className="relative text-xs text-zinc-500 mb-4">{m.year}</p>
                        <p className="relative text-xs text-zinc-400 leading-relaxed mb-5 line-clamp-3">{m.about}</p>

                        <div className="relative flex flex-wrap gap-1.5 justify-center mb-5">
                          {m.skills.slice(0, 2).map((s, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 text-amber-300">{s}</span>
                          ))}
                        </div>

                        <button className="relative glass-button bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-amber-500/30 hover:border-amber-500/50 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all cursor-pointer w-full shadow-lg shadow-amber-500/20">
                          View Profile →
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            )}

            {/* ────────── ORG CHART VIEW ────────── */}
            {activeTab === "Structure" && (
              <section className="py-16 max-w-7xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block font-mono">Org Chart</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Cell <span className="text-gradient">Structure</span>
                  </h2>
                  <p className="text-zinc-400 max-w-xl mx-auto">
                    Click any node to expand and reveal the members in that role or domain.
                  </p>
                </div>
                <OrgChart members={members} onSelectMember={openModal} />
              </section>
            )}

            {/* ────────── DIRECTORY VIEW ────────── */}
            {activeTab === "Directory" && (
              <section className="py-16 max-w-7xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400 mb-4 block font-mono">All Members</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    The Full <span className="text-gradient">Roster</span>
                  </h2>
                  <p className="text-zinc-400 max-w-xl mx-auto">
                    Search and filter our 50+ member strong team by domain, year, or specific skill.
                  </p>
                </div>

                {/* Search + Filter Bar */}
                <div className="glass-panel rounded-[20px] p-4 md:p-5 mb-8 flex flex-wrap gap-4 items-center">
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search name, role, skill…"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <select
                    value={selectedYear}
                    onChange={e => setYear(e.target.value)}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    {YEARS_FILTER.map(y => <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>)}
                  </select>

                  {(searchQuery || selectedYear !== "All" || selectedDomain !== "All") && (
                    <button
                      onClick={() => { setSearch(""); setYear("All"); setDomain("All"); }}
                      className="glass-button border-white/5 hover:border-red-500/20 text-xs text-zinc-400 hover:text-red-400 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Domain Tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {DOMAINS.map(d => (
                    <button
                      key={d}
                      onClick={() => setDomain(d)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedDomain === d
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 text-white shadow-md"
                          : "glass-button border-white/5 hover:border-white/20 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>{DOMAIN_ICONS[d]}</span>
                      <span>{d}</span>
                    </button>
                  ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredMembers.map((m, i) => (
                    <MemberCard key={m.id} member={m} onViewProfile={openModal} index={i} />
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-20 text-zinc-600">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-semibold text-zinc-500">No members matched your search.</p>
                  </div>
                )}
              </section>
            )}

            {/* ────────── IMPACT VIEW ────────── */}
            {activeTab === "Impact" && (
              <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-4 block font-mono">Our Impact</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Numbers That <span className="text-gradient">Matter</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                  {STATS.map((s, i) => <StatCard key={i} {...s} />)}
                </div>

                {/* Core Pillars of Success */}
                <div>
                  <div className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400 mb-4 block font-mono">Accelerator Pillars</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Driving Student <span className="text-gradient">Venture Growth</span>
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
                      Through structured incubation frameworks, investor networking syndicates, and technical engineering nodes, E-Cell bridges the gap between campus ideas and seed investment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: "🚀",
                        title: "Incubation Pipeline",
                        metric: "15+ Startups",
                        desc: "Providing seed mentoring, workspace allocations, and business plan evaluations for our annual startup cohorts.",
                        badge: "Active Cohorts",
                        color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300"
                      },
                      {
                        icon: "💼",
                        title: "Angel Investor Networks",
                        metric: "₹25L+ Secured",
                        desc: "Connecting student products with regional angel syndicates, venture resource programs, and pitching conclaves.",
                        badge: "Seed Funding",
                        color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300"
                      },
                      {
                        icon: "💻",
                        title: "Technical Engineering",
                        metric: "20+ Platforms",
                        desc: "Designing and developing custom web systems, Firebase backend integrations, and automated registration systems.",
                        badge: "Digital Core",
                        color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300"
                      }
                    ].map((pillar, idx) => (
                      <div
                        key={idx}
                        className="liquid-crystal-card rounded-[22px] p-8 border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <span className="text-4xl">{pillar.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pillar.color}`}>
                              {pillar.badge}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
                          <p className="text-zinc-400 text-xs leading-relaxed mb-6">{pillar.desc}</p>
                        </div>
                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border-t border-white/[0.04] pt-4 mt-2">
                          {pillar.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ────────── TIMELINE VIEW ────────── */}
            {activeTab === "Journey" && (
              <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block font-mono">Our Journey</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Cell <span className="text-gradient">Milestones</span>
                  </h2>
                </div>
                <Timeline />
              </section>
            )}

            {/* ────────── GALLERY VIEW ────────── */}
            {activeTab === "Gallery" && (
              <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-4 block font-mono">Memories</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Gallery <span className="text-gradient">Highlights</span>
                  </h2>
                </div>
                <Gallery />
              </section>
            )}

            {/* ────────── PROFILE VIEW ────────── */}
            {activeTab === "Profile" && userProfile && (
              <section className="flex-1 max-w-7xl mx-auto w-full px-4">
                <Profile profile={userProfile} />
              </section>
            )}

            {/* ────────── UPDATES VIEW ────────── */}
            {activeTab === "Updates" && (
              <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block font-mono">Latest Updates</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Stay <span className="text-gradient">Updated</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {updates.map((update) => (
                    <div key={update.id} className="glass-card rounded-[22px] p-6 hover:scale-105 transition-transform duration-300">
                      <div className="text-xs text-cyan-400 font-mono mb-2">{update.date}</div>
                      <h3 className="text-lg font-bold text-white mb-3">{update.title}</h3>
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-3">{update.content}</p>
                      <div className="text-xs text-zinc-500">By {update.author}</div>
                    </div>
                  ))}
                  {updates.length === 0 && (
                    <div className="col-span-full glass-card rounded-[22px] p-12 text-center">
                      <div className="text-zinc-500">No updates yet. Check back later!</div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ────────── ADMIN VIEW ────────── */}
            {activeTab === "Admin" && userProfile?.isAdmin && (
              <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 w-full flex-1">
                <div className="text-center mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-4 block font-mono">Admin Panel</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] mb-4">
                    Manage <span className="text-gradient">Updates</span>
                  </h2>
                </div>
                
                {/* Post Update Form */}
                <div className="glass-card rounded-[22px] p-8 mb-8">
                  <h3 className="text-xl font-bold text-white mb-6">Post New Update</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={newUpdateTitle}
                        onChange={(e) => setNewUpdateTitle(e.target.value)}
                        placeholder="Enter update title..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-2">Content</label>
                      <textarea
                        value={newUpdateContent}
                        onChange={(e) => setNewUpdateContent(e.target.value)}
                        placeholder="Enter update content..."
                        rows={4}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>
                    {postError && (
                      <div className="text-red-400 text-sm">{postError}</div>
                    )}
                    <button
                      onClick={async () => {
                        if (!newUpdateTitle || !newUpdateContent) {
                          setPostError("Please fill in both title and content");
                          return;
                        }
                        setIsPosting(true);
                        setPostError("");
                        try {
                          await UpdatesStore.createUpdate({
                            title: newUpdateTitle,
                            content: newUpdateContent,
                            author: userProfile.name || "Admin"
                          });
                          setNewUpdateTitle("");
                          setNewUpdateContent("");
                        } catch (error) {
                          setPostError("Failed to post update. Please try again.");
                          console.error(error);
                        } finally {
                          setIsPosting(false);
                        }
                      }}
                      disabled={isPosting}
                      className="liquid-crystal-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPosting ? "Posting..." : "Post Update"}
                    </button>
                  </div>
                </div>

                {/* Existing Updates with Delete */}
                <div className="glass-card rounded-[22px] overflow-hidden">
                  <h3 className="text-xl font-bold text-white p-6 pb-4">Existing Updates</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Date</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Title</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Content</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Author</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {updates.map((update) => (
                        <tr key={update.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm text-zinc-300">{update.date}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-white">{update.title}</td>
                          <td className="px-6 py-4 text-sm text-zinc-400 max-w-md">{update.content}</td>
                          <td className="px-6 py-4 text-sm text-zinc-400">{update.author}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={async () => {
                                if (confirm("Are you sure you want to delete this update?")) {
                                  try {
                                    await UpdatesStore.deleteUpdate(update.id);
                                  } catch (error) {
                                    console.error("Error deleting update:", error);
                                    alert("Failed to delete update");
                                  }
                                }
                              }}
                              className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {updates.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                            No updates yet. Post your first update above!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}


            {/* ────────── CONTACT VIEW ────────── */}
            {activeTab === "Contact" && (
              <Contact />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="border-t border-white/[0.05] py-12 relative z-10 backdrop-blur-xl bg-black/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {activeTab === "Home" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-lg shadow-purple-500/30">
                    <Zap className="w-4 h-4 text-white absolute inset-0 m-auto" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/crew.png"
                      alt=""
                      onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 bg-[#020205]"
                    />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}>
                    E-Cell<br />Crew United
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mb-6">
                  Empowering students to think, build, and lead. We foster the entrepreneurial spirit across every department.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4" style={{ textShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}>Directory Views</h4>
                <div className="flex flex-col gap-2.5">
                  {NAV_LINKS.slice(0, 4).map(l => (
                    <button key={l.tab} onClick={() => { setActiveTab(l.tab); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="text-left text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded-lg hover:bg-white/5">
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4" style={{ textShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}>Contact Info</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="mailto:ecell@college.ac.in" className="text-sm text-zinc-400 hover:text-white transition-colors hover:shadow-lg hover:shadow-blue-500/20 px-2 py-1 rounded-lg hover:bg-white/5">ecell@college.ac.in</a>
                  <a href="tel:+911234567890" className="text-sm text-zinc-400 hover:text-white transition-colors hover:shadow-lg hover:shadow-blue-500/20 px-2 py-1 rounded-lg hover:bg-white/5">+91 12345 67890</a>
                  <p className="text-sm text-zinc-500 px-2 py-1">Campus Block-C, Room 204</p>
                </div>
              </div>
            </div>
          )}

          <div className={`flex items-center justify-between flex-wrap gap-4 ${activeTab === "Home" ? "pt-8 border-t border-white/[0.04]" : ""}`}>
            <p className="text-xs text-zinc-500">&copy; 2026 E-Cell Crew United. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>

      {/* ── Back to Top ── */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-6 p-3.5 rounded-2xl glass-panel border-white/10 hover:border-white/20 text-zinc-300 hover:text-white shadow-lg z-40 cursor-pointer transition-all hover:scale-110"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Member Profile Modal ── */}
      <GlassModal isOpen={modalOpen} onClose={closeModal} member={selectedMember} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
