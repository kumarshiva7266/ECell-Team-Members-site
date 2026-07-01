"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, UserCheck, Flag, Laptop, Users, Sparkles, TrendingUp, Handshake } from "lucide-react";

interface TimelineItem {
  date: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  metrics?: string;
  highlights?: string[];
}

export const Timeline: React.FC = () => {
  const items: TimelineItem[] = [
    {
      date: "August 2025",
      title: "Recruitment Drive",
      desc: "Scouted and onboarded 50+ new node members across technical, design, marketing, and operations domains from a pool of 350+ applicants.",
      icon: <Users className="w-5 h-5" />,
      tag: "Recruitment",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/25",
      metrics: "50+ Members | 350+ Applications",
      highlights: ["Domain-specific testing rounds", "Onboarded design & web leads"]
    },
    {
      date: "September 2025",
      title: "Orientation & Ideation Bootcamp",
      desc: "Held a 3-day startup orientation seminar with industry experts to kickstart the entrepreneurial mindset and student pitch structures.",
      icon: <UserCheck className="w-5 h-5" />,
      tag: "Bootcamp",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/25",
      metrics: "3 Days | 10+ Speakers",
      highlights: ["Design thinking workshops", "Startup pitch basics"]
    },
    {
      date: "October 2025",
      title: "HackStart 48hr Hackathon",
      desc: "A rapid prototyping event where 200+ students built functional business applications solving local university problems.",
      icon: <Laptop className="w-5 h-5" />,
      tag: "Hackathon",
      tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/25",
      metrics: "48 Hours | 40+ Prototypes",
      highlights: ["Automated student check-in portal", "AI study scheduler winner"]
    },
    {
      date: "November 2025",
      title: "Startup Conclave",
      desc: "Hosted 20+ young entrepreneurs and angel networks for a regional pitch conclave, securing interest in student-led startups.",
      icon: <Flag className="w-5 h-5" />,
      tag: "Conclave",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      metrics: "20+ Startups | 5 Angel Pools",
      highlights: ["Pitch feedback panels", "Venture viability evaluations"]
    },
    {
      date: "December 2025",
      title: "Angel Pitch & Seed Funding Round",
      desc: "Conducted closed-door pitch rounds with angel investors, matching student prototypes with early-stage backing and sandbox credits.",
      icon: <Handshake className="w-5 h-5" />,
      tag: "Funding Match",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
      metrics: "₹15L+ Backing Promised",
      highlights: ["3 Startups advanced to term sheet", "AWS credits distributed"]
    },
    {
      date: "February 2026",
      title: "E-Summit 2026",
      desc: "Our flagship national summit, including product design sprints, investor panels, and networking events for students.",
      icon: <Award className="w-5 h-5" />,
      tag: "Summit",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      metrics: "1,500+ Attendees | 20+ Mentors",
      highlights: ["Venture track panel talks", "National pitch contest final"]
    },
    {
      date: "April 2026",
      title: "Startup Expo & Innovation Showcase",
      desc: "Exhibited 15+ campus ventures to regional incubation hubs, business partners, and media teams, generating direct user feedback.",
      icon: <TrendingUp className="w-5 h-5" />,
      tag: "Showcase",
      tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/25",
      metrics: "15 Ventures | 1,000+ Footfalls",
      highlights: ["Product feedback channels", "Incubator connections signed"]
    },
    {
      date: "June 2026",
      title: "Incubation Cohort Launch",
      desc: "Launched the annual summer cohort pipeline, providing student founders with active co-working credits and risk modeling tools.",
      icon: <Sparkles className="w-5 h-5" />,
      tag: "Launch",
      tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/25",
      metrics: "8 Startups Selected",
      highlights: ["Fiscal valuation workshop series", "Legal registration assistance"]
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 shadow-[0_0_15px_rgba(79,140,255,0.4)] animate-pulse" />

      <div className="space-y-12">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex flex-col md:flex-row items-start relative ${
              idx % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Dot Node */}
            <div className="absolute left-4 md:left-1/2 -translate-x-[15px] md:-translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-white/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(79,140,255,0.25)] z-10 hover:border-blue-500 transition-colors">
              {item.icon}
            </div>

            {/* Content Card */}
            <div className="w-full md:w-[45%] pl-12 md:pl-0">
              <div className="liquid-crystal-card rounded-[20px] p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {item.date}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{item.desc}</p>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="border-t border-white/[0.04] pt-3 mt-1">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Highlights</div>
                    <ul className="space-y-1">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                          <span className="text-blue-500 shrink-0">▸</span>
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.metrics && (
                  <div className="text-[10px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border-t border-white/[0.04] pt-3 mt-3">
                    {item.metrics}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
