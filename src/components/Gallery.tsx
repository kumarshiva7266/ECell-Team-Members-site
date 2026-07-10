"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Maximize2, X, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail: string;
  title: string;
  category: string;
}

// Fallback items in case public/gallery is empty
const FALLBACK_ITEMS: GalleryItem[] = [
  { id: "f1", type: "image", url: "/images/president.png", thumbnail: "/images/president.png", title: "President's Welcome Note", category: "Bootcamp" },
  { id: "f2", type: "image", url: "/images/vp.png", thumbnail: "/images/vp.png", title: "Speaker Panel Discussion", category: "Conclave" },
  { id: "f3", type: "image", url: "/images/tech.png", thumbnail: "/images/tech.png", title: "Technical Team Hackathon Support", category: "Hackathon" },
  { id: "f4", type: "image", url: "/images/design.png", thumbnail: "/images/design.png", title: "UI/UX Bootcamp Orientation", category: "Workshops" },
  { id: "f5", type: "image", url: "/images/secretary.png", thumbnail: "/images/secretary.png", title: "Pitch Desk Evaluation Board", category: "E-Summit" },
  { id: "f6", type: "image", url: "/images/marketing.png", thumbnail: "/images/marketing.png", title: "On-Campus Marketing Stalls", category: "Orientation" }
];

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Prevent body scroll when modal is open and scroll to top
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
          } else {
            setItems(FALLBACK_ITEMS);
          }
        } else {
          setItems(FALLBACK_ITEMS);
        }
      } catch (e) {
        console.error("Gallery fetch failed", e);
        setItems(FALLBACK_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin mb-4" />
        <p className="text-zinc-500 text-sm">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      
      {/* User Instruction block if only fallback items are shown */}
      {items === FALLBACK_ITEMS && (
        <div className="mb-8 p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-start gap-4">
          <ImageIcon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm text-zinc-300">
            <span className="font-semibold text-white block mb-1">Gallery Directory Active</span>
            To add your own images and videos, simply copy them into the <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">public/gallery</code> folder in your project files. They will automatically appear here!
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            whileHover={{ scale: 1.03, y: -4 }}
            className="group relative h-60 rounded-[22px] overflow-hidden border border-white/5 glass-card cursor-pointer shadow-lg transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Visual overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5" >
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase self-start">
                {item.category}
              </span>
              <div className="flex items-center justify-between mt-auto">
                <h4 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h4>
                <div className="p-2 rounded-full bg-white/10 text-white border border-white/20">
                  {item.type === "video" ? <Play className="w-4 h-4 fill-white" /> : <Maximize2 className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Video Support Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center bg-black/95 backdrop-blur-xl overflow-hidden"
          onClick={() => setSelectedItem(null)}
        >
          {/* Close button - Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(null);
            }}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-red-500/90 hover:bg-red-600 border border-white/20 text-white cursor-pointer transition-all hover:scale-110 shadow-lg shadow-red-500/30"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Content Container */}
          <div 
            className="relative flex items-start justify-center w-full h-full p-8 pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                className="max-w-full max-h-[70vh] rounded-2xl border border-white/10 shadow-2xl"
              />
            )}
            
            {/* Title overlay at bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <p className="text-white font-semibold text-sm">
                {selectedItem.title} <span className="text-zinc-400 mx-2">•</span> {selectedItem.category}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
