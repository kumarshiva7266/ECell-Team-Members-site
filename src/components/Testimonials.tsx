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
    img: "/images/rohith.jpeg",
    quote: "Leading E-Cell's vision and strategic direction across all sub-domains. Connecting student founders with industry mentors, investors, and national accelerators to transform the college into a launchpad for the next generation of Indian founders."
  },
  {
    id: "2",
    name: "G. Shiv Prasad",
    role: "Web & Tech Lead, CSE(AI&ML)",
    img: "/images/tech.jpeg",
    quote: "Technical architect developing full-stack applications, automations, and custom glassmorphism visual nodes. Leading the Web & Technology team in building E-Cell's digital infrastructure and managing Firebase backends."
  },
  {
    id: "3",
    name: "Anshu Kumar",
    role: "Advisory Committee Member, CSE",
    img: "/images/anshu.png",
    quote: "Directing E-Cell frameworks, advising core leaders on growth, and managing long-term venture alignments. Providing strategic advisory support to all E-Cell verticals and leadership team."
  },
  {
    id: "4",
    name: "Maheswar Rao",
    role: "Advisory Committee Member, CSE",
    img: "/images/maheswar.jpeg",
    quote: "Providing fiscal guidance, scaling frameworks, and evaluating pitch deck viability for student cohorts. Overseeing E-Cell's annual budget management and strategic financial planning to ensure long-term sustainability."
  },
  {
    id: "5",
    name: "Trisha Mewade",
    role: "Secretary & Treasurer, Data Science",
    img: "/images/trisha.jpeg",
    quote: "Managing documentation, maintaining official records, and supporting financial record-keeping to ensure smooth team operations. As a Data Science student, I bring technology and innovation to every aspect of my role."
  },
  {
    id: "6",
    name: "B. Lavanya",
    role: "Vice-President (Operations), CSE",
    img: "/images/lavanya.jpeg",
    quote: "Optimizing internal workflow loops, scheduling resources, and managing cross-domain deliveries. Streamlining project reporting timelines across all six E-Cell sub-domains and coordinating between different teams to ensure seamless operational efficiency."
  },
  {
    id: "7",
    name: "Paisa Goutham Krishna Reddy",
    role: "Vice President, Cyber Security",
    img: "/images/gautam.jpeg",
    quote: "As the Vice President of the E-Cell, I work closely with the leadership team to promote entrepreneurship, innovation, and student-led initiatives across the campus. I contribute to planning and executing impactful events, building strategic collaborations, and creating opportunities that inspire students to transform their ideas into successful ventures."
  },
  {
    id: "8",
    name: "Ruchika Marshetty",
    role: "Marketing & PR Head, CSE-CS",
    img: "/images/ruchika.jpeg",
    quote: "Hello, myself Ruchika Marshetty the Marketing & PR Head. As the Marketing & PR Head, I manage promotions, create awareness about events and initiatives, and handle public relations. I work on communicating with audiences, building a positive image, and increasing engagement through effective marketing and outreach."
  },
  {
    id: "9",
    name: "Kushi Kumari",
    role: "Creative & Design Coordinator, Design Dept",
    img: "/images/logo.jpeg",
    quote: "Crafting beautiful interactive designs, layouts, and typography grids for all E-Cell assets. Creating visual identities for events, campaigns, and digital platforms while maintaining brand consistency."
  },
  {
    id: "10",
    name: "Khwaish Modi",
    role: "Event Management Head, CSE(DS)",
    img: "/images/khwaish.jpeg",
    quote: "Managing planning loops, vendor alignments, and overall logistics for campus startup conclaves. Leading event planning and coordination for hackathons, conclaves, and workshops to ensure flawless execution."
  },
  {
    id: "11",
    name: "Mohammed Omer",
    role: "Marketing & PR Member, CSE(AI & ML)",
    img: "/images/omer.jpeg",
    quote: "Passionate B.Tech CSE AI & ML student dedicated to building innovative technology solutions. As a member of the E-Cell Marketing and PR team, I bring discipline, creativity, and a strong work ethic to drive impactful campaigns."
  },
  {
    id: "12",
    name: "Saksham",
    role: "Creative & Design Team Member, CSE(Cyber Security)",
    img: "/images/saksham.jpeg",
    quote: "Passionate about building innovative technology solutions using Python, Artificial Intelligence, and Web Development. Contributing creativity, problem-solving, and a growth mindset to every project as part of the E-Cell Creative & Design Team."
  },
  {
    id: "13",
    name: "Boddupelli Bala Murali",
    role: "Web & Technology Team Member, CSE(AI & ML)",
    img: "/images/balu.jpeg",
    quote: "Passionate about building innovative technology solutions using Python, Artificial Intelligence, and Web Development. Contributing creativity, problem-solving, and a growth mindset to every project as part of the E-Cell Web & Technology Team."
  },
  {
    id: "14",
    name: "Gayathri Ravula",
    role: "Event Management Coordinator, CSE(AI&ML)",
    img: "/images/gayatri.jpeg",
    quote: "Coordinating event logistics, vendor management, and on-ground execution for E-Cell events. Ensuring seamless event operations and creating memorable experiences for attendees through meticulous planning and execution."
  },
  {
    id: "15",
    name: "Bhavani",
    role: "Creative & Design Team Member, CSM(AI & ML)",
    img: "/images/bhavani.jpeg",
    quote: "Contributing creative designs and visual content for E-Cell campaigns and events. Bringing artistic vision and design expertise to enhance the visual identity of E-Cell initiatives."
  },
  {
    id: "16",
    name: "Hansini Gaddam",
    role: "Social Media & Influencer, Computer Science & Engineering",
    img: "/images/hansini.jpeg",
    quote: "A Computer Science student, content creator, and aspiring entrepreneur with a passion for creativity, branding, and innovation. I enjoy building engaging digital experiences, collaborating on impactful projects, and contributing to E-Cell initiatives that encourage entrepreneurship."
  },
  {
    id: "17",
    name: "P. Varshitha Reddy",
    role: "Social Media & Influencer Team Member, CSE",
    img: "/images/varshitha.jpeg",
    quote: "Motivated Computer Science Engineering student with an 8.76 CGPA and a strong interest in software development, Artificial Intelligence, Prompt Engineering, and entrepreneurship. Passionate about digital branding, content creation, and innovation."
  },
  {
    id: "18",
    name: "Mahalakshmi Gundlapally",
    role: "Marketing & PR Coordinator, CSE",
    img: "/images/maha.jpeg",
    quote: "I am Mahalakshmi Gundlapally, a Marketing PR member at E-Cell, responsible for supporting promotional campaigns, public relations, and event outreach. I contribute to enhancing the organization's visibility through effective communication and collaborative teamwork."
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
    <div className="max-w-2xl mx-auto text-center px-4">
      <div className="relative glass-card rounded-[20px] p-5 md:p-8 overflow-hidden">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-blue-500/20 absolute top-4 left-4" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Quote Text */}
            <p className="text-sm md:text-base text-zinc-200 leading-relaxed italic max-w-lg">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div>
              <p className="text-xs md:text-sm font-bold text-white">{t.name}</p>
              <p className="text-[10px] md:text-xs text-zinc-400 mt-0.5">{t.role}</p>
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
