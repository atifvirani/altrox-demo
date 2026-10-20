'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type WebGLSceneType = 'wireframe_scene' | 'pointcloud_scene' | 'aurora_scene' | 'world_scene';

interface AltroxWebGLStageProps {
  initialScene?: WebGLSceneType;
  allowSceneSwitching?: boolean;
  className?: string;
  autoScrollTransition?: boolean;
}

export default function AltroxWebGLStage({
  initialScene = 'wireframe_scene',
  allowSceneSwitching = true,
  className = '',
  autoScrollTransition = true,
}: AltroxWebGLStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState<WebGLSceneType>(initialScene);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const activeSceneRef = useRef<WebGLSceneType>(activeScene);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  useEffect(() => {
    // Reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // WebGL check
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Master Three.js Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b09, 0.045);

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

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
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);

    // --- Lighting Scheme ---
    const ambientLight = new THREE.AmbientLight(0x0e1310, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf2f2ec, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const mossBounce = new THREE.DirectionalLight(0x72977a, 1.4);
    mossBounce.position.set(-5, -3, -3);
    scene.add(mossBounce);

    // ============================================================
    // SCENE 1: WIREFRAME & MONOLITH SCENE (wireframe_scene)
    // ============================================================
    const wireframeGroup = new THREE.Group();
    scene.add(wireframeGroup);

    // 1A. Faceted Architectural Monolith
    const monolithGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const monolithMat = new THREE.MeshPhysicalMaterial({
      color: 0x131714,
      roughness: 0.36,
      metalness: 0.18,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      reflectivity: 0.45,
      flatShading: true,
    });
    const monolithMesh = new THREE.Mesh(monolithGeo, monolithMat);
    wireframeGroup.add(monolithMesh);

    // 1B. Perspective Wireframe Ground Grid (data-webgl-lines="2/1")
    const gridHelper = new THREE.GridHelper(16, 24, 0x72977a, 0x1c221d);
    gridHelper.position.y = -2.2;
    wireframeGroup.add(gridHelper);

    // ============================================================
    // SCENE 2: POINT CLOUD CONSTELLATION SCENE (pointcloud_scene)
    // ============================================================
    const pointCloudGroup = new THREE.Group();
    pointCloudGroup.visible = false;
    scene.add(pointCloudGroup);

    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOrigins = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOrigins[i * 3] = x;
      particleOrigins[i * 3 + 1] = y;
      particleOrigins[i * 3 + 2] = z;

      particleVelocities[i * 3] = 0;
      particleVelocities[i * 3 + 1] = 0;
      particleVelocities[i * 3 + 2] = 0;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x94b59b,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    pointCloudGroup.add(particleSystem);

    // ============================================================
    // SCENE 3: AURORA FLUID CHROMATIC WAVE RIBBON (aurora_scene)
    // ============================================================
    const auroraGroup = new THREE.Group();
    auroraGroup.visible = false;
    scene.add(auroraGroup);

    const ribbonGeo = new THREE.PlaneGeometry(12, 6, 48, 24);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x72977a,
      roughness: 0.25,
      metalness: 0.65,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.rotation.x = -Math.PI / 3;
    auroraGroup.add(ribbonMesh);

    // Base positions copy for wave calculations
    const ribbonPosAttr = ribbonGeo.attributes.position;
    const ribbonOriginalZ = new Float32Array(ribbonPosAttr.count);
    for (let i = 0; i < ribbonPosAttr.count; i++) {
      ribbonOriginalZ[i] = ribbonPosAttr.getZ(i);
    }

    // ============================================================
    // SCENE 4: 3D WIREFRAME WORLD COORDINATES GLOBE (world_scene)
    // ============================================================
    const worldGroup = new THREE.Group();
    worldGroup.visible = false;
    scene.add(worldGroup);

    // 4A. Sphere wireframe
    const sphereGeo = new THREE.SphereGeometry(2.1, 24, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x2f3930,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    worldGroup.add(sphereMesh);

    // 4B. Latitude & Longitude Axis Rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0x72977a, transparent: true, opacity: 0.75 });
    const ringGeo1 = new THREE.RingGeometry(2.11, 2.13, 64);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMat);
    worldGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.11, 2.13, 64);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMat);
    ring2.rotation.x = Math.PI / 2;
    worldGroup.add(ring2);

    // 4C. Client Location Node Beacons
    const hubs = [
      { lat: 40.7128, lon: -74.006, name: 'NYC' },
      { lat: 51.5074, lon: -0.1278, name: 'LDN' },
      { lat: 35.6762, lon: 139.6503, name: 'TYO' },
      { lat: -34.6037, lon: -58.3816, name: 'BUE' },
      { lat: 19.076, lon: 72.8777, name: 'BOM' },
    ];

    const beaconGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf2f2ec });

    hubs.forEach((hub) => {
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lon + 180) * (Math.PI / 180);
      const x = -(2.12 * Math.sin(phi) * Math.cos(theta));
      const z = 2.12 * Math.sin(phi) * Math.sin(theta);
      const y = 2.12 * Math.cos(phi);

      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(x, y, z);
      worldGroup.add(beacon);
    });

    // ============================================================
    // MOUSE, RESIZE & SCROLL LERP ENGINE
    // ============================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0.4;
    let scrollY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;

      // Optional auto-switching scenes based on scroll depth
      if (autoScrollTransition) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);
        if (progress < 0.25 && activeSceneRef.current !== 'wireframe_scene') {
          setActiveScene('wireframe_scene');
        } else if (progress >= 0.25 && progress < 0.55 && activeSceneRef.current !== 'pointcloud_scene') {
          setActiveScene('pointcloud_scene');
        } else if (progress >= 0.55 && progress < 0.8 && activeSceneRef.current !== 'aurora_scene') {
          setActiveScene('aurora_scene');
        } else if (progress >= 0.8 && activeSceneRef.current !== 'world_scene') {
          setActiveScene('world_scene');
        }
      }
    };

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || window.innerWidth;
      const h = currentMount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // ============================================================
    // ANIMATION & DISPERSION LOOP
    // ============================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentActive = activeSceneRef.current;

      // Smooth Crossfade Visibility
      wireframeGroup.visible = currentActive === 'wireframe_scene';
      pointCloudGroup.visible = currentActive === 'pointcloud_scene';
      auroraGroup.visible = currentActive === 'aurora_scene';
      worldGroup.visible = currentActive === 'world_scene';

      // 1. Scene 1 Animation
      if (wireframeGroup.visible) {
        monolithMesh.rotation.y = elapsedTime * 0.08 + scrollY * 0.0003;
        monolithMesh.rotation.x = Math.sin(elapsedTime * 0.05) * 0.12 + 0.15;
        gridHelper.rotation.y = -elapsedTime * 0.02;
      }

      // 2. Scene 2 (Point Cloud Dispersion) Animation
      if (pointCloudGroup.visible) {
        pointCloudGroup.rotation.y = elapsedTime * 0.05;
        const pos = particleGeo.attributes.position.array as Float32Array;

        // Interactive mouse dispersion force
        const raycasterZ = 0;
        const pointer3D = new THREE.Vector3(mouseX * 2.5, -mouseY * 2.5, raycasterZ);

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const px = pos[idx];
          const py = pos[idx + 1];
          const pz = pos[idx + 2];

          const ox = particleOrigins[idx];
          const oy = particleOrigins[idx + 1];
          const oz = particleOrigins[idx + 2];

          // Distance to mouse pointer
          const dx = px - pointer3D.x;
          const dy = py - pointer3D.y;
          const dz = pz - pointer3D.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 1.4) {
            // Repel from cursor
            const force = (1.4 - dist) * 0.04;
            pos[idx] += (dx / dist) * force;
            pos[idx + 1] += (dy / dist) * force;
            pos[idx + 2] += (dz / dist) * force;
          } else {
            // Spring return to origin
            pos[idx] += (ox - px) * 0.035;
            pos[idx + 1] += (oy - py) * 0.035;
            pos[idx + 2] += (oz - pz) * 0.035;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // 3. Scene 3 (Aurora Wave Ribbon) Animation
      if (auroraGroup.visible) {
        const positions = ribbonGeo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const u = positions.getX(i);
          const v = positions.getY(i);
          const wave =
            Math.sin(u * 0.6 + elapsedTime * 1.6) * 0.65 +
            Math.cos(v * 0.8 + elapsedTime * 1.2) * 0.45;
          positions.setZ(i, wave);
        }
        positions.needsUpdate = true;
        auroraGroup.rotation.z = Math.sin(elapsedTime * 0.05) * 0.08;
      }

      // 4. Scene 4 (World Globe) Animation
      if (worldGroup.visible) {
        worldGroup.rotation.y = elapsedTime * 0.12;
        worldGroup.rotation.x = 0.35 + Math.sin(elapsedTime * 0.04) * 0.05;
      }

      // Camera Lerp
      targetCameraX = mouseX * 0.45;
      targetCameraY = 0.4 - mouseY * 0.35;
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

      monolithGeo.dispose();
      monolithMat.dispose();
      gridHelper.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      renderer.dispose();
    };
  }, [autoScrollTransition]);

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
    <div className={`relative w-full h-full ${className}`}>
      {/* Three.js Canvas Host with nk.studio edge fade mask */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60 mask-vertical-fade"
        aria-hidden="true"
      />

      {/* nk.studio Minimal Scene Switcher Selector */}
      {allowSceneSwitching && (
        <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#121613]/80 border border-[#1C221D] backdrop-blur-md text-[10px] font-mono tracking-wider">
          <span className="px-2 text-[#5C615A] uppercase">Scene:</span>
          {(
            [
              { id: 'wireframe_scene', label: '01 Wireframe' },
              { id: 'pointcloud_scene', label: '02 Pointcloud' },
              { id: 'aurora_scene', label: '03 Aurora' },
              { id: 'world_scene', label: '04 World' },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScene(s.id)}
              className={`px-2.5 py-1 rounded-full uppercase transition-colors duration-300 ${
                activeScene === s.id
                  ? 'bg-[#72977A] text-[#090B09] font-bold shadow-sm'
                  : 'text-[#92968F] hover:text-[#F2F2EC] hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
