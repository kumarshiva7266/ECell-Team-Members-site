"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltActive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  onClick,
  tiltActive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Motion Values for Tilt Effect
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Scale between 0 and 1
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: tiltActive ? rotateXSpring : 0,
        rotateY: tiltActive ? rotateYSpring : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card hover:glass-card-hover glass-shine rounded-[25px] transition-all duration-300 relative cursor-pointer group ${className}`}
    >
      {/* Dynamic Lighting Spotlight */}
      {hovering && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[25px] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 140, 255, 0.15), transparent 70%)`
          }}
          ref={(el) => {
            if (el && cardRef.current) {
              cardRef.current.addEventListener("mousemove", (event) => {
                const rect = cardRef.current!.getBoundingClientRect();
                const mx = event.clientX - rect.left;
                const my = event.clientY - rect.top;
                el.style.setProperty("--mouse-x", `${mx}px`);
                el.style.setProperty("--mouse-y", `${my}px`);
              });
            }
          }}
        />
      )}
      
      {/* 3D Content Container */}
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="w-full h-full relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};
