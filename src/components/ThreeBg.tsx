"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeBg: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile for performance
    if (window.innerWidth < 768 || !containerRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 200;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // ── PREMIUM CINEMATIC 3D HERO ──
    
    // Color palette
    const colors = {
      deepSpace: 0x030308,
      midnight: 0x0a0e1f,
      navy: 0x121830,
      softBlue: 0x4f8cff,
      electricCyan: 0x00d4ff,
      royalViolet: 0x8b5cf6,
      titanium: 0xc4c4c4,
      holographic: 0x00ffff,
      warmGold: 0xffd700
    };
    
    // 1. Central Crystal Structure
    const crystalGroup = new THREE.Group();
    crystalGroup.position.x = 100; // Position to right, leave space for content
    scene.add(crystalGroup);
    
    // Main crystal (octahedron)
    const crystalGeometry = new THREE.OctahedronGeometry(35, 0);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.15,
      roughness: 0,
      transparent: true,
      opacity: 0.3,
      transmission: 0.92,
      thickness: 4,
      envMapIntensity: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: colors.softBlue,
      emissiveIntensity: 0.2
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystalGroup.add(crystal);
    
    // Inner glowing core
    const coreGeometry = new THREE.IcosahedronGeometry(20, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: colors.electricCyan,
      metalness: 0.3,
      roughness: 0,
      transparent: true,
      opacity: 0.5,
      transmission: 0.8,
      thickness: 2,
      envMapIntensity: 2,
      clearcoat: 1,
      clearcoatRoughness: 0,
      emissive: colors.electricCyan,
      emissiveIntensity: 0.4
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    crystalGroup.add(core);
    
    // Outer wireframe shell
    const shellGeometry = new THREE.DodecahedronGeometry(50, 0);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: colors.titanium,
      metalness: 1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.25,
      envMapIntensity: 1.2,
      wireframe: true
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    crystalGroup.add(shell);
    
    // 2. Orbiting Metallic Rings
    const orbitingRings: { mesh: THREE.Mesh; rotationSpeed: THREE.Vector3; orbitSpeed: number; orbitRadius: number; orbitPhase: number; tilt: number }[] = [];
    
    for (let i = 0; i < 6; i++) {
      const radius = 65 + i * 18;
      const tube = 0.5 + Math.random() * 0.4;
      const geometry = new THREE.TorusGeometry(radius, tube, 16, 100);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: colors.titanium,
        metalness: 1,
        roughness: 0.12,
        transparent: true,
        opacity: 0.3,
        envMapIntensity: 1.3
      });
      
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.random() * Math.PI * 0.5;
      ring.rotation.y = Math.random() * Math.PI;
      crystalGroup.add(ring);
      
      orbitingRings.push({
        mesh: ring,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.006
        ),
        orbitSpeed: 0.2 + Math.random() * 0.35,
        orbitRadius: 0,
        orbitPhase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.3
      });
    }
    
    // 3. Floating Crystal Fragments
    const crystalFragments: { mesh: THREE.Mesh; rotationSpeed: THREE.Vector3; floatSpeed: number; floatAmplitude: number; phase: number }[] = [];
    
    for (let i = 0; i < 25; i++) {
      const size = 3 + Math.random() * 6;
      const geometry = new THREE.TetrahedronGeometry(size, 0);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0,
        transparent: true,
        opacity: 0.25,
        transmission: 0.88,
        thickness: 1.5,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        emissive: [colors.softBlue, colors.royalViolet, colors.electricCyan][i % 3],
        emissiveIntensity: 0.15
      });
      
      const fragment = new THREE.Mesh(geometry, material);
      const angle = Math.random() * Math.PI * 2;
      const distance = 55 + Math.random() * 90;
      fragment.position.x = Math.cos(angle) * distance;
      fragment.position.y = (Math.random() - 0.5) * 110;
      fragment.position.z = Math.sin(angle) * distance;
      fragment.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      crystalGroup.add(fragment);
      
      crystalFragments.push({
        mesh: fragment,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.018
        ),
        floatSpeed: 0.35 + Math.random() * 0.45,
        floatAmplitude: 4 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // 4. Volumetric Light Beams
    const volumetricBeams: { mesh: THREE.Mesh; material: THREE.ShaderMaterial; speed: number; phase: number }[] = [];
    
    for (let b = 0; b < 5; b++) {
      const geometry = new THREE.CylinderGeometry(0.8, 2.5, 180, 32, 1, true);
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color([colors.electricCyan, colors.royalViolet, colors.softBlue, colors.holographic, colors.warmGold][b]) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          uniform vec3 color;
          
          void main() {
            float alpha = (1.0 - vUv.y) * 0.08;
            alpha *= 0.5 + 0.5 * sin(time * 2.0 + vUv.y * 8.0);
            float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
            alpha *= edge;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      
      const beam = new THREE.Mesh(geometry, material);
      beam.position.x = 80 + (b - 2) * 85;
      beam.position.y = 70;
      beam.position.z = -120;
      beam.rotation.z = (b - 2) * 0.1;
      scene.add(beam);
      
      volumetricBeams.push({
        mesh: beam,
        material: material,
        speed: 0.3 + b * 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // 5. Atmospheric Glow Sphere
    const glowGeometry = new THREE.SphereGeometry(200, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(colors.midnight) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color;
        
        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          float pulse = 0.82 + 0.18 * sin(time * 0.35);
          gl_FragColor = vec4(color, intensity * 0.1 * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false
    });
    
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    glowSphere.position.z = -60;
    scene.add(glowSphere);
    
    // 6. Floating Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 550;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const particleCtx = particleCanvas.getContext("2d");
    if (particleCtx) {
      const gradient = particleCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      particleCtx.fillStyle = gradient;
      particleCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffffff
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // 7. Background Gradient Planes
    const gradientPlanes: { mesh: THREE.Mesh; material: THREE.ShaderMaterial; speed: number }[] = [];
    
    for (let g = 0; g < 2; g++) {
      const geometry = new THREE.PlaneGeometry(850, 650, 32, 32);
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(colors.deepSpace) },
          color2: { value: new THREE.Color([colors.navy, colors.midnight][g]) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          
          void main() {
            vec2 pos = vUv * 2.0 - 1.0;
            
            float wave1 = sin(pos.x * 1.3 + time * 0.35) * 0.22;
            float wave2 = sin(pos.y * 1.1 + time * 0.45) * 0.22;
            float wave3 = sin((pos.x + pos.y) * 1.2 + time * 0.28) * 0.22;
            
            float pattern = wave1 + wave2 + wave3;
            float mixFactor = smoothstep(-0.35, 0.35, pattern);
            
            vec3 color = mix(color1, color2, mixFactor * 0.35);
            float alpha = 0.05 + mixFactor * 0.035;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const plane = new THREE.Mesh(geometry, material);
      plane.position.z = -320 - g * 55;
      scene.add(plane);
      
      gradientPlanes.push({
        mesh: plane,
        material: material,
        speed: 0.12 + g * 0.07
      });
    }

    // Interactive mouse movement tracker - throttled
    let targetX = 0;
    let targetY = 0;
    let lastMoveTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 50) return; // Throttle to 20fps
      lastMoveTime = now;
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

      // Smooth 360° rotation of crystal structure
      crystal.rotation.y += 0.003;
      crystal.rotation.x += 0.0015;
      core.rotation.y -= 0.004;
      core.rotation.x += 0.002;
      shell.rotation.z += 0.001;
      
      // Floating up-and-down motion (gentle bobbing)
      crystalGroup.position.y = Math.sin(elapsedTime * 0.8) * 8;
      
      // Animated glow intensity (pulsing effect)
      crystalMaterial.emissiveIntensity = 0.15 + Math.sin(elapsedTime * 2) * 0.08;
      coreMaterial.emissiveIntensity = 0.35 + Math.sin(elapsedTime * 2.5) * 0.12;
      
      // Orbiting metallic rings at different speeds
      orbitingRings.forEach((ring) => {
        ring.mesh.rotation.x += ring.rotationSpeed.x;
        ring.mesh.rotation.y += ring.rotationSpeed.y;
        ring.mesh.rotation.z += ring.rotationSpeed.z;
        
        // Orbit around crystal
        const orbitAngle = elapsedTime * ring.orbitSpeed + ring.orbitPhase;
        ring.mesh.position.x = Math.cos(orbitAngle) * 15;
        ring.mesh.position.z = Math.sin(orbitAngle) * 15;
        ring.mesh.position.y += Math.sin(elapsedTime * 0.6 + ring.orbitPhase) * 0.3;
      });
      
      // Floating crystal fragments with natural motion
      crystalFragments.forEach((fragment) => {
        fragment.mesh.rotation.x += fragment.rotationSpeed.x;
        fragment.mesh.rotation.y += fragment.rotationSpeed.y;
        fragment.mesh.rotation.z += fragment.rotationSpeed.z;
        fragment.mesh.position.y += Math.sin(elapsedTime * fragment.floatSpeed + fragment.phase) * 0.25;
        
        // Animated glow on fragments
        const mat = fragment.mesh.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = 0.12 + Math.sin(elapsedTime * 3 + fragment.phase) * 0.06;
      });
      
      // Volumetric light beams with pulsing
      volumetricBeams.forEach((beam) => {
        beam.material.uniforms.time.value = elapsedTime * beam.speed;
      });
      
      // Atmospheric glow pulse
      glowMaterial.uniforms.time.value = elapsedTime;
      
      // Moving particles with rotation
      particles.rotation.y = elapsedTime * 0.004;
      particles.rotation.x = elapsedTime * 0.002;
      
      // Background gradient animation
      gradientPlanes.forEach((plane) => {
        plane.material.uniforms.time.value = elapsedTime * plane.speed;
      });
      
      // Cinematic camera movement (subtle sway)
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (-targetY - camera.position.y) * 0.04;
      camera.position.z = 200 + Math.sin(elapsedTime * 0.3) * 5; // Subtle depth breathing
      
      // Smooth look-at with slight delay for cinematic feel
      camera.lookAt(crystalGroup.position.x * 0.3, crystalGroup.position.y * 0.2, 0);

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
      
      // Dispose crystal structure elements
      crystalGeometry.dispose();
      crystalMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      
      // Dispose orbiting rings
      orbitingRings.forEach(ring => {
        ring.mesh.geometry.dispose();
        const mat = ring.mesh.material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      });
      
      // Dispose crystal fragments
      crystalFragments.forEach(fragment => {
        fragment.mesh.geometry.dispose();
        const mat = fragment.mesh.material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      });
      
      // Dispose volumetric beams
      volumetricBeams.forEach(beam => {
        beam.mesh.geometry.dispose();
        beam.material.dispose();
      });
      
      // Dispose atmospheric glow
      glowGeometry.dispose();
      glowMaterial.dispose();
      
      // Dispose particles
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      
      // Dispose gradient planes
      gradientPlanes.forEach(plane => {
        plane.mesh.geometry.dispose();
        plane.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-60 hidden md:block" 
    />
  );
};
