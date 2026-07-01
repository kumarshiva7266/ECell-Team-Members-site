"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeBg: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 200;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Geometry
    const count = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 500;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push({ x, y, z });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create a circular particle texture using canvas
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 3.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x4f8cff,
    });

    // Particle system
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Interactive mouse movement tracker
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.08;
      targetY = (e.clientY - window.innerHeight / 2) * 0.08;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      // Animate points individually to create a wavy mesh effect
      for (let i = 0; i < count; i++) {
        const x = originalPositions[i].x;
        const y = originalPositions[i].y;

        // Apply a trigonometric wave offset to the y position
        const offset = Math.sin(elapsedTime * 1.5 + x * 0.01) * 15;
        posAttr.setY(i, y + offset);
      }
      posAttr.needsUpdate = true;

      // Rotate particle network slowly
      points.rotation.y = elapsedTime * 0.05;
      points.rotation.x = elapsedTime * 0.02;

      // Smooth parallax reaction to mouse
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      const container = containerRef.current;
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-60" 
    />
  );
};
