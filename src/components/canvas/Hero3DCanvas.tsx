'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Soft subtle atmospheric fog matching deep natural black
    scene.fog = new THREE.FogExp2(0x090b09, 0.05);

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 7.5;
    camera.position.y = 0.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    currentMount.appendChild(renderer.domElement);

    // --- Sculptural Monolith Geometry ---
    // A faceted, architectural polyhedron (Dodecahedron with crisp planar facets)
    const monolithGeometry = new THREE.DodecahedronGeometry(1.85, 0);

    // Matte dark stone & smoked-glass physical material
    const monolithMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x131714, // Deep charcoal with warm slate undertone
      roughness: 0.38, // Soft matte sheen, not glossy plastic
      metalness: 0.15,
      clearcoat: 0.25, // Subtle architectural glaze
      clearcoatRoughness: 0.2,
      reflectivity: 0.45,
      flatShading: true, // Crisp editorial facets reflecting ambient light
    });

    const monolithMesh = new THREE.Mesh(monolithGeometry, monolithMaterial);
    scene.add(monolithMesh);

    // --- Subtle Lighting Scheme ---
    // 1. Ambient dark natural fill
    const ambientLight = new THREE.AmbientLight(0x0e1310, 1.4);
    scene.add(ambientLight);

    // 2. Soft warm white key light (mimicking studio softbox)
    const keyLight = new THREE.DirectionalLight(0xf2f2ec, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // 3. Restrained moss/jade green bounce reflection
    const bounceLight = new THREE.DirectionalLight(0x72977a, 1.2);
    bounceLight.position.set(-5, -3, -3);
    scene.add(bounceLight);

    // --- Mouse & Scroll Tracking (Lerped and passive) ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0.2;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 1.5;
      mouseY = (event.clientY / innerHeight - 0.5) * 1.5;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || window.innerWidth;
      const h = currentMount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow, restrained sculptural rotation (secondary to typography)
      monolithMesh.rotation.y = elapsedTime * 0.06 + scrollY * 0.0004;
      monolithMesh.rotation.x = Math.sin(elapsedTime * 0.04) * 0.12 + 0.2;

      // Restrained mouse parallax lerping
      targetCameraX = mouseX * 0.45;
      targetCameraY = 0.2 - mouseY * 0.35;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', motionListener);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      monolithGeometry.dispose();
      monolithMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL || reducedMotion) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-40">
        <img
          src="/assets/hero-3d-monolith.jpg"
          alt="ALTROX Spatial Monolith"
          className="w-full h-full object-cover mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B09] via-transparent to-[#090B09]" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
