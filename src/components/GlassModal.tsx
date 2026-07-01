"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe, X, Download, ExternalLink, Award } from "lucide-react";
import { Member } from "@/lib/teamStore";

/* ─────────────────────────────────────────────
   Inline SVG Brand Icons
───────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Role Badge Emoji Map
───────────────────────────────────────────── */
const DOMAIN_EMOJI: Record<string, string> = {
  "Leadership": "👑",
  "Web & Technology": "💻",
  "Marketing & PR": "📢",
  "Creative & Design": "🎨",
  "Event Management": "📅",
  "Social Media & Influencer": "📱",
  "Advisory Committee": "🏛️",
};

/* ─────────────────────────────────────────────
   Role-Based Auto Defaults (all 7 domains)
───────────────────────────────────────────── */
interface DomainProfile {
  skills: string[];
  responsibilities: string[];
  roleImpact: string;
  projectProgresses: { name: string; sublabel: string; progress: number | null; icon: string }[];
  stats: { label: string; value: string; icon: string }[];
  certificates: string[];
  interests: string[];
  memberSince: string;
  status: string;
  availability: string;
  education: { degree: string; college: string; dept: string; cgpa: string };
}

const DOMAIN_PROFILES: Record<string, DomainProfile> = {
  "Leadership": {
    skills: ["Leadership", "Strategic Planning", "Public Speaking", "Team Management", "Vision Setting", "Stakeholder Management", "Community Building", "Pitch Strategy", "Negotiation", "Decision Making"],
    responsibilities: [
      "Lead E-Cell operations and sub-domain teams",
      "Drive vision, mission, and strategic roadmap",
      "Represent E-Cell at startup events nationally",
      "Coordinate with faculty, investors, and partners",
      "Mentor student founders through incubation",
      "Chair key events including E-Summit and conclaves",
      "Build and sustain a high-performing leadership team",
      "Ensure alignment across all six sub-domain heads",
    ],
    roleImpact: "Responsible for driving the overall vision of E-Cell, aligning all sub-domains, connecting students with mentors and investors, and building a thriving campus startup ecosystem.",
    projectProgresses: [
      { name: "E-Summit 2026 Planning", sublabel: "Lead Organizer", progress: 80, icon: "🎯" },
      { name: "National Incubation Partnership", sublabel: "Strategic Planning", progress: 65, icon: "🤝" },
      { name: "Alumni Network Development", sublabel: "Architecture & Design", progress: 45, icon: "🌐" },
    ],
    stats: [
      { label: "Events Organized", value: "20+", icon: "📅" },
      { label: "Projects Led", value: "10+", icon: "💼" },
      { label: "Workshops Conducted", value: "8", icon: "🛠️" },
      { label: "Team Members Managed", value: "50+", icon: "👥" },
      { label: "Years in E-Cell", value: "2", icon: "⭐" },
      { label: "Pitches Hosted", value: "8", icon: "🎤" },
    ],
    certificates: ["NSRCEL Startup Leadership", "AICTE Entrepreneurship", "YourStory Startup Foundations", "CII Young Leadership"],
    interests: ["Startup Ecosystems", "Venture Capital", "Social Entrepreneurship", "Innovation Policy", "Leadership", "Public Policy"],
    memberSince: "August 2023",
    status: "Core Executive",
    availability: "Available for Collaboration",
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "Computer Science & Engineering", cgpa: "8.6 / 10" },
  },
  "Web & Technology": {
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Firebase", "Python", "Git", "GitHub", "Tailwind CSS", "UI/UX", "REST API", "SQL", "Figma", "C++"],
    responsibilities: [
      "Lead website development and maintenance",
      "Manage Firebase backend and databases",
      "Coordinate technical workshops and hackathons",
      "Build and maintain registration portals",
      "Manage GitHub repositories and deployments",
      "Mentor junior developers and team members",
      "Collaborate with other domains for tech solutions",
      "Ensure website security and performance",
    ],
    roleImpact: "Responsible for designing, developing, and maintaining the E-Cell's digital platforms, ensuring smooth technical operations for registrations, event management, and online engagement.",
    projectProgresses: [
      { name: "E-Cell Official Website", sublabel: "Lead Developer", progress: 90, icon: "🌐" },
      { name: "Startup Registration Portal", sublabel: "Full Stack Development", progress: 75, icon: "💻" },
      { name: "Event Management System", sublabel: "Planning & Architecture", progress: 40, icon: "⚙️" },
    ],
    stats: [
      { label: "Events Organized", value: "12", icon: "📅" },
      { label: "Projects Completed", value: "8", icon: "💻" },
      { label: "Workshops Conducted", value: "5", icon: "🛠️" },
      { label: "Team Members Managed", value: "16", icon: "👥" },
      { label: "Years in E-Cell", value: "2", icon: "⭐" },
      { label: "GitHub Contributions", value: "1,250+", icon: "🐙" },
    ],
    certificates: ["IBM AI Engineering", "Google Cloud Foundations", "AWS Cloud Practitioner", "Cisco CCNA Fundamentals", "Meta Frontend Developer"],
    interests: ["Artificial Intelligence", "Startups", "Cloud Computing", "Web Development", "Automation", "Cyber Security", "Data Structures", "UI/UX Design"],
    memberSince: "July 2024",
    status: "Core Executive",
    availability: "Available for Collaboration",
    education: { degree: "B.Tech", college: "Pallavi Engineering College", dept: "CSE (AI & ML)", cgpa: "8.7 / 10" },
  },
  "Marketing & PR": {
    skills: ["Brand Strategy", "PR Campaigns", "Content Planning", "Copywriting", "Market Research", "Analytics", "Social Media", "Email Marketing", "SEO", "Growth Strategy", "CRM", "Adobe Suite"],
    responsibilities: [
      "Lead marketing operations and brand strategy",
      "Plan and execute PR campaigns",
      "Manage content calendar and publications",
      "Build and maintain media relations",
      "Track and analyze marketing KPIs",
      "Collaborate with design team for visuals",
      "Drive outreach campaigns across colleges",
      "Manage sponsorship communication channels",
    ],
    roleImpact: "Responsible for amplifying E-Cell's voice, crafting compelling brand narratives, managing media relations, and driving campus awareness to attract students, sponsors, and industry partners.",
    projectProgresses: [
      { name: "Semester Brand Campaign", sublabel: "Campaign Lead", progress: 80, icon: "📢" },
      { name: "E-Summit PR Strategy", sublabel: "PR Planning", progress: 60, icon: "🎯" },
      { name: "Outreach Drive 2026", sublabel: "College Coordination", progress: 35, icon: "🌐" },
    ],
    stats: [
      { label: "Campaigns Run", value: "15+", icon: "📢" },
      { label: "Reach Achieved", value: "50K+", icon: "🌐" },
      { label: "Collaborations", value: "10+", icon: "🤝" },
      { label: "Events Marketed", value: "12", icon: "📅" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Articles Written", value: "25+", icon: "✍️" },
    ],
    certificates: ["HubSpot Inbound Marketing", "Google Analytics", "Meta Blueprint", "Content Marketing Certification"],
    interests: ["Digital Marketing", "Branding", "Startups", "Public Relations", "Content Creation", "Market Research"],
    memberSince: "August 2024",
    status: "Team Member",
    availability: "Available for Collaboration",
    education: { degree: "MBA", college: "Pallavi Engineering College", dept: "Marketing & Business", cgpa: "8.4 / 10" },
  },
  "Creative & Design": {
    skills: ["UI/UX Design", "Figma", "Adobe Illustrator", "Photoshop", "Canva", "Branding", "Typography", "Wireframing", "Prototyping", "Color Theory", "Motion Design", "Adobe XD"],
    responsibilities: [
      "Lead the Creative & Design team",
      "Design brand identity and visual systems",
      "Create event posters, banners, and social content",
      "Develop UI/UX mockups for digital platforms",
      "Collaborate with Web & Tech on implementation",
      "Maintain brand consistency across all materials",
      "Produce visual content for social media",
      "Present and iterate designs based on feedback",
    ],
    roleImpact: "Responsible for crafting stunning brand experiences, visual identities, and UI/UX systems that communicate E-Cell's values and attract the entrepreneurial community.",
    projectProgresses: [
      { name: "Brand Style Guide", sublabel: "Art Director", progress: 85, icon: "🎨" },
      { name: "E-Summit 2026 Visuals", sublabel: "Lead Designer", progress: 70, icon: "✨" },
      { name: "Social Media Templates", sublabel: "Design System", progress: 90, icon: "📱" },
    ],
    stats: [
      { label: "Designs Created", value: "80+", icon: "🎨" },
      { label: "Events Designed", value: "15+", icon: "📅" },
      { label: "Brand Systems", value: "3", icon: "✨" },
      { label: "Social Posts", value: "200+", icon: "📱" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Design Tools", value: "8+", icon: "🛠️" },
    ],
    certificates: ["Google UX Design Certificate", "Adobe Certified Expert", "Interaction Design Foundation", "Canva Design School"],
    interests: ["UI/UX Design", "Typography", "Visual Storytelling", "Branding", "Illustration", "Motion Graphics"],
    memberSince: "August 2024",
    status: "Team Member",
    availability: "Available for Collaboration",
    education: { degree: "B.Tech / B.Des", college: "Pallavi Engineering College", dept: "Design & Visual Communication", cgpa: "8.5 / 10" },
  },
  "Event Management": {
    skills: ["Project Management", "Logistics Planning", "Vendor Management", "Budgeting", "Scheduling", "Team Coordination", "Risk Management", "Communication", "Operations", "Documentation"],
    responsibilities: [
      "Lead event planning and coordination",
      "Manage vendor relationships and negotiations",
      "Coordinate logistics, venues, and equipment",
      "Develop event budgets and track expenditures",
      "Manage volunteer teams during live events",
      "Ensure smooth execution of all E-Cell events",
      "Handle registrations and attendee management",
      "Conduct post-event analysis and reporting",
    ],
    roleImpact: "Responsible for ensuring E-Cell's events run flawlessly — from hackathons and conclaves to workshops — creating memorable experiences that inspire and connect the entrepreneurial community.",
    projectProgresses: [
      { name: "E-Summit 2026 Logistics", sublabel: "Event Lead", progress: 70, icon: "🎯" },
      { name: "HackStart Hackathon Setup", sublabel: "Logistics Head", progress: 95, icon: "⚡" },
      { name: "Startup Conclave Planning", sublabel: "Coordination", progress: 50, icon: "📋" },
    ],
    stats: [
      { label: "Events Managed", value: "15+", icon: "📅" },
      { label: "Attendees Served", value: "2K+", icon: "👥" },
      { label: "Vendors Managed", value: "20+", icon: "🤝" },
      { label: "Budget Managed", value: "₹5L+", icon: "💰" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Workshops Run", value: "10+", icon: "🛠️" },
    ],
    certificates: ["PMP Foundations", "Event Management Professional", "Six Sigma White Belt", "Coursera Project Management"],
    interests: ["Event Planning", "Hospitality", "Project Management", "Operations", "Logistics", "Entrepreneurship"],
    memberSince: "August 2024",
    status: "Team Member",
    availability: "Available for Collaboration",
    education: { degree: "MBA / B.Tech", college: "Pallavi Engineering College", dept: "Operations & Management", cgpa: "8.3 / 10" },
  },
  "Social Media & Influencer": {
    skills: ["Content Creation", "Video Editing", "Instagram Analytics", "Reels Production", "Copywriting", "Canva", "Scheduling Tools", "Trend Analysis", "LinkedIn Marketing", "YouTube", "Twitter/X", "Hashtag Strategy"],
    responsibilities: [
      "Create and publish social media content",
      "Manage E-Cell's social media content calendar",
      "Produce Reels, Stories, and video content",
      "Analyze social media performance metrics",
      "Grow E-Cell's follower base and engagement",
      "Collaborate with marketing team on campaigns",
      "Identify viral trends for content creation",
      "Coordinate with influencers and ambassadors",
    ],
    roleImpact: "Responsible for amplifying E-Cell's presence online, building vibrant communities, and driving real-time engagement that attracts students, sponsors, and partners to E-Cell's initiatives.",
    projectProgresses: [
      { name: "Semester Content Calendar", sublabel: "Content Lead", progress: 80, icon: "📸" },
      { name: "Reel Series Production", sublabel: "Video Creator", progress: 60, icon: "🎬" },
      { name: "LinkedIn Growth Strategy", sublabel: "Strategy & Analytics", progress: 40, icon: "📊" },
    ],
    stats: [
      { label: "Posts Created", value: "150+", icon: "📸" },
      { label: "Reels Produced", value: "30+", icon: "🎬" },
      { label: "Reach Growth", value: "35%", icon: "📈" },
      { label: "Platforms", value: "5", icon: "📱" },
      { label: "Years in E-Cell", value: "1", icon: "⭐" },
      { label: "Followers Gained", value: "2K+", icon: "👥" },
    ],
    certificates: ["Meta Blueprint", "HubSpot Social Media", "Content Marketing Institute", "Hootsuite Social Marketing"],
    interests: ["Digital Media", "Content Creation", "Social Media Trends", "Influencer Marketing", "Photography", "Videography"],
    memberSince: "August 2024",
    status: "Team Member",
    availability: "Available for Collaboration",
    education: { degree: "B.Tech / MBA", college: "Pallavi Engineering College", dept: "Communications & Media", cgpa: "8.2 / 10" },
  },
  "Advisory Committee": {
    skills: ["Mentorship", "Angel Networks", "Strategic Relations", "Business Development", "Investor Relations", "Startup Evaluation", "Financial Analysis", "Negotiation", "Strategic Planning", "Networking"],
    responsibilities: [
      "Provide strategic advisory to all E-Cell verticals",
      "Connect student startups with angel investors",
      "Evaluate startup pitches and provide feedback",
      "Guide leadership on organizational growth",
      "Build partnerships with incubators and accelerators",
      "Facilitate alumni-student mentorship connections",
      "Oversee annual incubation cohort pipeline",
      "Represent E-Cell at national advisory forums",
    ],
    roleImpact: "Responsible for providing the strategic backbone of E-Cell, guiding leadership decisions, connecting student ventures with real-world investors, and ensuring growth aligns with the broader ecosystem.",
    projectProgresses: [
      { name: "Investor Network Portal", sublabel: "Strategic Lead", progress: 70, icon: "💼" },
      { name: "Startup Cohort 2026", sublabel: "Advisory", progress: 60, icon: "🚀" },
      { name: "Alumni Mentorship Program", sublabel: "Program Design", progress: 40, icon: "🤝" },
    ],
    stats: [
      { label: "Startups Advised", value: "25+", icon: "🚀" },
      { label: "Investors Connected", value: "12+", icon: "💼" },
      { label: "Mentorship Sessions", value: "50+", icon: "🤝" },
      { label: "Events Supported", value: "15+", icon: "📅" },
      { label: "Years in E-Cell", value: "3", icon: "⭐" },
      { label: "Alumni Network", value: "100+", icon: "🌐" },
    ],
    certificates: ["IIM Bangalore Entrepreneurship", "NASSCOM Startup Leadership", "CII Young Leadership", "Angel Network Certification"],
    interests: ["Venture Capital", "Angel Investing", "Social Impact", "Startup Ecosystems", "Leadership", "Global Innovation"],
    memberSince: "August 2022",
    status: "Advisory Core Member",
    availability: "Open to Mentorship",
    education: { degree: "BBA + MBA", college: "Pallavi Engineering College", dept: "Management & Entrepreneurship", cgpa: "8.8 / 10" },
  },
};

/* ─────────────────────────────────────────────
   Data resolver – merges member data + role defaults
───────────────────────────────────────────── */
function resolveData(member: Member): DomainProfile & {
  skills: string[];
  professionalSummary: string;
  location: string;
  portfolio: string;
  resumeUrl: string;
} {
  const profile = DOMAIN_PROFILES[member.domain] ?? DOMAIN_PROFILES["Leadership"];

  return {
    ...profile,
    // Member's own data takes priority if more detailed
    skills: (member.skills?.length ?? 0) > 3 ? member.skills : profile.skills,
    certificates: (member.certificates?.length ?? 0) > 0 ? member.certificates! : profile.certificates,
    interests: (member.interests?.length ?? 0) > 0 ? member.interests! : profile.interests,
    projectProgresses: (member.projectProgresses?.length ?? 0) > 0
      ? member.projectProgresses!.map(p => ({ ...p, sublabel: p.name, icon: "💼" }))
      : profile.projectProgresses,
    stats: (member.stats?.length ?? 0) > 0 ? member.stats! : profile.stats,
    responsibilities: (member.responsibilities?.length ?? 0) > 0 ? member.responsibilities! : profile.responsibilities,
    roleImpact: member.roleImpact ?? profile.roleImpact,
    memberSince: member.memberSince ?? profile.memberSince,
    status: member.status ?? profile.status,
    availability: member.availability ?? profile.availability,
    education: member.education
      ? { degree: member.education.degree, college: member.education.college, dept: member.education.dept, cgpa: member.education.cgpa }
      : profile.education,
    professionalSummary: member.about,
    location: member.location ?? "Hyderabad, India",
    portfolio: member.portfolio ?? "",
    resumeUrl: member.resumeUrl ?? "",
  };
}

/* ─────────────────────────────────────────────
   Skill chip colors (cycling)
───────────────────────────────────────────── */
const CHIP_STYLES = [
  "bg-blue-900/40 border-blue-600/30 text-blue-200",
  "bg-purple-900/40 border-purple-600/30 text-purple-200",
  "bg-cyan-900/40 border-cyan-600/30 text-cyan-200",
  "bg-green-900/40 border-green-600/30 text-green-200",
  "bg-amber-900/40 border-amber-600/30 text-amber-200",
  "bg-rose-900/40 border-rose-600/30 text-rose-200",
  "bg-violet-900/40 border-violet-600/30 text-violet-200",
  "bg-teal-900/40 border-teal-600/30 text-teal-200",
  "bg-orange-900/40 border-orange-600/30 text-orange-200",
  "bg-pink-900/40 border-pink-600/30 text-pink-200",
];

/* ─────────────────────────────────────────────
   Cert brand colors
───────────────────────────────────────────── */
const CERT_COLORS: Record<string, string> = {
  "IBM": "bg-blue-600",
  "Google": "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500",
  "AWS": "bg-orange-500",
  "Cisco": "bg-cyan-600",
  "Meta": "bg-blue-500",
  "HubSpot": "bg-orange-600",
  "Microsoft": "bg-blue-600",
  "PMP": "bg-indigo-600",
  "Adobe": "bg-red-600",
  "NSRCEL": "bg-emerald-600",
  "NASSCOM": "bg-purple-600",
  "IIM": "bg-amber-600",
  "CFA": "bg-teal-600",
  "NSE": "bg-blue-700",
  "CII": "bg-violet-600",
  "AICTE": "bg-green-600",
  "Six": "bg-gray-600",
  "Content": "bg-pink-600",
  "Hootsuite": "bg-slate-600",
  "Interaction": "bg-rose-600",
  "Canva": "bg-purple-500",
  "Coursera": "bg-blue-700",
};

function getCertColor(cert: string): string {
  for (const key of Object.keys(CERT_COLORS)) {
    if (cert.includes(key)) return CERT_COLORS[key];
  }
  return "bg-zinc-600";
}

function getCertInitial(cert: string): string {
  const words = cert.split(" ");
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return cert[0].toUpperCase();
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
interface GlassModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GlassModal: React.FC<GlassModalProps> = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!member) return null;
  const d = resolveData(member);
  const domainEmoji = DOMAIN_EMOJI[member.domain] ?? "⚡";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-5">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[16px]"
          />

          {/* ── Modal Shell ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 26, stiffness: 200 }}
            className="relative z-10 w-full max-w-[1060px] max-h-[92vh] flex flex-col md:flex-row rounded-[22px] overflow-hidden border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
            style={{ background: "linear-gradient(135deg, #0d0e1f 0%, #0a0b18 50%, #0f0d20 100%)" }}
          >

            {/* ══════════════════════════════
                LEFT PANEL — Identity
            ══════════════════════════════ */}
            <div
              className="relative flex flex-col items-center text-center w-full md:w-[260px] shrink-0 p-6 border-b md:border-b-0 md:border-r border-white/[0.06] overflow-y-auto"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              {/* Glow blob behind avatar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-blue-600/20 to-purple-600/10 blur-[50px] pointer-events-none" />

              {/* Close button (mobile) */}
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer z-20"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              {/* ── Avatar ── */}
              <div className="relative mt-2 mb-5">
                {/* Spinning gradient ring */}
                <div
                  className="absolute inset-[-3px] rounded-full opacity-80"
                  style={{
                    background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                    animation: "spin 6s linear infinite",
                    borderRadius: "50%",
                  }}
                />
                <div className="absolute inset-[-3px] rounded-full blur-[6px] opacity-40"
                  style={{ background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)" }} />
                <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[#0d0e1f] bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                {/* Status dot */}
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d0e1f] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>

              {/* ── Name ── */}
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">{member.name}</h2>

              {/* ── Role Badge ── */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-5 text-white text-xs font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea)" }}>
                <span>{domainEmoji}</span>
                <span>{member.role}</span>
              </div>

              {/* ── Meta Info ── */}
              <div className="w-full text-left space-y-2.5 mb-5">
                {[
                  { icon: "📚", label: "Department", value: member.dept },
                  { icon: "🎓", label: "Academic Year", value: member.year },
                  { icon: "📅", label: "Member Since", value: d.memberSince },
                  { icon: "👤", label: "Team Status", value: d.status },
                  { icon: "📍", label: "Location", value: d.location },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5 shrink-0">{row.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-0.5">{row.label}</div>
                      <div className="text-[11px] text-zinc-200 font-medium leading-tight truncate">{row.value}</div>
                    </div>
                  </div>
                ))}

                {/* Availability */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[10px] text-emerald-400 font-semibold">{d.availability}</span>
                </div>
              </div>

              {/* ── Connect ── */}
              <div className="w-full mb-4">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 text-left">Connect</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 text-white hover:scale-110 transition-all shadow-lg shadow-red-500/20">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:scale-110 transition-all shadow-lg shadow-blue-500/20">
                      <LinkedInIcon />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:scale-110 transition-all shadow-lg shadow-gray-500/20">
                      <GitHubIcon />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 text-white hover:scale-110 transition-all shadow-lg shadow-pink-500/20">
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* ── Download Resume ── */}
              {member.resumeUrl ? (
                <a 
                  href={member.resumeUrl} 
                  download
                  className="w-full flex items-center justify-center gap-2 py-2 md:py-2.5 px-3 md:px-4 rounded-2xl text-xs md:text-sm font-bold text-white cursor-pointer relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4 relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </a>
              ) : (
                <button 
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-2 md:py-2.5 px-3 md:px-4 rounded-2xl text-xs md:text-sm font-bold text-zinc-500 cursor-not-allowed relative overflow-hidden bg-zinc-800"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>No Resume Available</span>
                </button>
              )}
            </div>

            {/* ══════════════════════════════
                RIGHT PANEL — Grid Content
            ══════════════════════════════ */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}>

              {/* Close (desktop) */}
              <button
                onClick={onClose}
                className="hidden md:flex absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer z-20 items-center justify-center"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>

              {/* ── ROW 1: Professional Summary + Role Impact ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Professional Summary */}
                <div className="col-span-1 md:col-span-2 rounded-[14px] p-4 md:p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-purple-400 text-sm md:text-sm">👤</span>
                    <span className="text-xs md:text-xs font-bold text-white uppercase tracking-wider">Professional Summary</span>
                  </div>
                  <p className="text-[13px] md:text-[12px] text-zinc-300 leading-relaxed">{d.professionalSummary}</p>
                </div>
                {/* Role Impact */}
                <div className="col-span-1 rounded-[14px] p-4 border border-amber-500/20"
                  style={{ background: "rgba(245,158,11,0.05)" }}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-amber-400 text-sm">⭐</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Role Impact</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">{d.roleImpact}</p>
                </div>
              </div>

              {/* ── ROW 2: Key Responsibilities + Technical Skills ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Key Responsibilities */}
                <div className="rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-cyan-400 text-sm">✅</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Key Responsibilities</span>
                  </div>
                  <ul className="space-y-1.5">
                    {d.responsibilities.slice(0, 7).map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[6px] text-white font-bold">✓</span>
                        </div>
                        <span className="text-[11px] text-zinc-300 leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Technical Skills */}
                <div className="rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 text-sm">{"</>"}</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Technical Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${CHIP_STYLES[i % CHIP_STYLES.length]}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── ROW 3: Current Projects + Achievements + Interests ── */}
              <div className="grid grid-cols-3 gap-3">
                {/* Current Projects */}
                <div className="rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-400 text-sm">📁</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Current Projects</span>
                  </div>
                  <div className="space-y-3">
                    {d.projectProgresses.slice(0, 3).map((p, i) => (
                      <div key={i}>
                        <div className="flex items-start gap-2 mb-1.5">
                          <span className="text-base shrink-0 mt-0.5">{p.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-semibold text-zinc-200 leading-tight truncate">{p.name}</div>
                            <div className="text-[9px] text-zinc-500">{p.sublabel}</div>
                          </div>
                          {p.progress !== null && (
                            <span className="text-[10px] font-bold text-blue-400 shrink-0">{p.progress}%</span>
                          )}
                        </div>
                        {p.progress !== null ? (
                          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${p.progress}%` }}
                              transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        ) : (
                          <div className="h-1 rounded-full bg-white/[0.06]">
                            <div className="h-full w-[15%] rounded-full bg-amber-500/60" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 text-sm">🏆</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Achievements</span>
                  </div>
                  <ul className="space-y-2">
                    {(member.achievements ?? []).slice(0, 6).map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 text-xs shrink-0 mt-0.5">⭐</span>
                        <span className="text-[11px] text-zinc-300 leading-snug">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interests */}
                <div className="rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-pink-400 text-sm">❤️</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Interests</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.interests.map((item, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${CHIP_STYLES[(i + 3) % CHIP_STYLES.length]}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── ROW 4: Stats Bar ── */}
              <div className="grid grid-cols-6 gap-2">
                {d.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-3 px-1 rounded-[14px] border border-white/[0.07] text-center hover:border-white/[0.14] hover:bg-white/[0.03] transition-all"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <span className="text-lg mb-1">{stat.icon}</span>
                    <span className="text-base font-bold text-white leading-none">{stat.value}</span>
                    <span className="text-[8px] text-zinc-500 mt-1 uppercase tracking-wider leading-tight text-center">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* ── ROW 5: Certifications + Education + Professional Links ── */}
              <div className="grid grid-cols-4 gap-3">
                {/* Certifications */}
                <div className="col-span-2 rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🏅</span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Certifications</span>
                    </div>
                    <button className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {d.certificates.slice(0, 5).map((cert, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 w-[64px]">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-bold ${getCertColor(cert)} shadow-lg`}>
                          {getCertInitial(cert)}
                        </div>
                        <span className="text-[8px] text-zinc-400 text-center leading-tight line-clamp-2">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="col-span-1 rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">🎓</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Education</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[12px] font-bold text-zinc-200">{d.education.degree} in {d.education.dept.split("–")[0].trim()}</div>
                    <div className="text-[11px] text-zinc-400">{d.education.college}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">CGPA: {d.education.cgpa}</div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="col-span-1 rounded-[14px] p-4 border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">🔗</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Portfolio</span>
                  </div>
                  {d.portfolio ? (
                    <a href={d.portfolio} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                      <Globe className="w-3 h-3" />View Portfolio
                    </a>
                  ) : (
                    <span className="text-[10px] text-zinc-500 italic">No portfolio available</span>
                  )}
                </div>
              </div>

            </div>{/* end right panel */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
