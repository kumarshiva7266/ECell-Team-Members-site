"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  img: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "M.Rohith Kumar",
    role: "President, CSE(AI & ML)",
    img: "/images/rohith.JPEG",
    quote: "Leading E-Cell's vision and strategic direction across all sub-domains. Connecting student founders with industry mentors, investors, and national accelerators to transform the college into a launchpad for the next generation of Indian founders."
  },
  {
    id: "2",
    name: "G. Shiv Prasad",
    role: "Web & Tech Lead, CSE(AI&ML)",
    img: "/images/tech.JPEG",
    quote: "Technical architect developing full-stack applications, automations, and custom glassmorphism visual nodes. Leading the Web & Technology team in building E-Cell's digital infrastructure and managing Firebase backends."
  },
  {
    id: "3",
    name: "Trisha Mewade",
    role: "Secretary & Treasurer, Data Science",
    img: "/images/trisha.JPEG",
    quote: "Managing documentation, maintaining official records, and supporting financial record-keeping to ensure smooth team operations. As a Data Science student, I bring technology and innovation to every aspect of my role."
  },
  {
    id: "4",
    name: "Ruchika Marshetty",
    role: "Marketing & PR Head, CSE",
    img: "/images/tech.jpeg",
    quote: "Spearheading marketing operations, public relation releases, and visual brand identity campaigns. Leading the Marketing & PR team in crafting compelling brand narratives and strategies to amplify E-Cell's voice across campuses."
  },
  {
    id: "5",
    name: "Kushi Kumari",
    role: "Creative & Design Coordinator, Design Dept",
    img: "/images/tech.jpeg",
    quote: "Crafting beautiful interactive designs, layouts, and typography grids for all E-Cell assets. Creating visual identities for events, campaigns, and digital platforms while maintaining brand consistency."
  },
  {
    id: "6",
    name: "Khwaish Modi",
    role: "Event Management Head, CSE(DS)",
    img: "/images/tech.jpeg",
    quote: "Managing planning loops, vendor alignments, and overall logistics for campus startup conclaves. Leading event planning and coordination for hackathons, conclaves, and workshops to ensure flawless execution."
  },
  {
    id: "7",
    name: "Mohammed Omer",
    role: "Marketing & PR Member, CSE(AI & ML)",
    img: "/images/omer.JPEG",
    quote: "Passionate B.Tech CSE AI & ML student dedicated to building innovative technology solutions. As a member of the E-Cell Marketing and PR team, I bring discipline, creativity, and a strong work ethic to drive impactful campaigns."
  },
  {
    id: "8",
    name: "Saksham",
    role: "Creative & Design Team Member, CSE(Cyber Security)",
    img: "/images/saksham.JPEG",
    quote: "Passionate about building innovative technology solutions using Python, Artificial Intelligence, and Web Development. Contributing creativity, problem-solving, and a growth mindset to every project as part of the E-Cell Creative & Design Team."
  }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const next = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => next(), 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="max-w-3xl mx-auto text-center px-4">
      <div className="relative glass-card rounded-[28px] p-8 md:p-12 overflow-hidden">
        {/* Quote Icon */}
        <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 left-6" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Quote Text */}
            <p className="text-base md:text-lg text-zinc-200 leading-relaxed italic max-w-xl">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div>
              <p className="text-sm font-bold text-white">{t.name}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="p-2.5 rounded-full glass-button border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "bg-blue-500 w-6" : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2.5 rounded-full glass-button border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
