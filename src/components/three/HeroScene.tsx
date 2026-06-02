"use client";

import { useLayoutEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Bottle() {
  const { scene } = useGLTF("/models/bottle.glb");
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#C8A870"),
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.9,
          thickness: 1.5,
          envMapIntensity: 2,
          transparent: true,
          opacity: 0.85,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1A1614" />
      <directionalLight
        position={[3, 5, 2]}
        intensity={3}
        color="#E8C9A0"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.8}
        color="#2A1840"
      />
      <pointLight
        position={[0, 4, 2]}
        intensity={2}
        color="#E8C9A0"
        distance={10}
      />
      <pointLight
        position={[2, 0, 3]}
        intensity={1}
        color="#B89968"
        distance={8}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <Suspense fallback={null}>
        <Lighting />
        <Bottle />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          color="#E8C9A0"
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/bottle.glb");
