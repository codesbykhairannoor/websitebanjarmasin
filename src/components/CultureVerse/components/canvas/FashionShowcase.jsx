import React, { useRef } from 'react';
import { Text, RoundedBox, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function FashionShowcase({ position = [0, 0, -10] }) {
  // Load textures
  const [sarigadingTex, nagaTex, bayamTex] = useTexture([
    '/wisata/960px-Pasar_Terapung_Siring_Banj.webp',
    '/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp',
    '/wisata/960px-Menara_Pandang_Banjarmasin.webp'
  ]);

  const floatRef = useRef();

  useFrame((state) => {
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* ── Base Stage / Platform ── */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[4, 0.15, 1.5]} position={[0, 0.15, 0]} />
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 0.3, 3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Glow Trim */}
        <mesh position={[0, 0.05, 1.52]}>
          <boxGeometry args={[8.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
        </mesh>
      </RigidBody>

      <group position={[0, 3.5, 0]}>
        <Text fontSize={0.35} color="#f59e0b" anchorX="center" anchorY="middle" fontWeight="bold">
          KOLEKSI EKSKLUSIF SASIRANGAN
        </Text>
        <Text position={[0, -0.4, 0]} fontSize={0.15} color="#cbd5e1" anchorX="center" anchorY="middle" fontWeight="normal">
          Baju, Celana & Tas Khas Banjar
        </Text>
      </group>

      <group ref={floatRef}>
        {/* ── 1. BAJU SASIRANGAN (Left) ── */}
        <group position={[-2.5, 1.2, 0]}>
          {/* Pedestal */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Mannequin Torso */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.25, 0.8, 16]} />
            <meshStandardMaterial map={sarigadingTex} color="#ffffff" roughness={0.6} />
          </mesh>
          {/* Shoulders */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[0.9, 0.2, 0.3]} />
            <meshStandardMaterial map={sarigadingTex} color="#ffffff" roughness={0.6} />
          </mesh>
          <Text position={[0, -1.5, 0.7]} fontSize={0.15} color="#f59e0b" anchorX="center">
            Baju Pria
          </Text>
        </group>

        {/* ── 2. GAUN / DRESS SASIRANGAN (Center) ── */}
        <group position={[0, 1.4, 0]}>
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.6, 0.7, 1.4, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Dress Body */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <coneGeometry args={[0.6, 1.5, 32]} />
            <meshStandardMaterial map={nagaTex} color="#ffffff" roughness={0.7} />
          </mesh>
          {/* Belt */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
          </mesh>
          <Text position={[0, -1.7, 0.8]} fontSize={0.15} color="#f59e0b" anchorX="center">
            Gaun Sasirangan
          </Text>
        </group>

        {/* ── 3. TAS & CELANA SASIRANGAN (Right) ── */}
        <group position={[2.5, 1.2, 0]}>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
          </mesh>
          
          {/* Pants */}
          <mesh position={[-0.2, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
            <meshStandardMaterial map={bayamTex} color="#ffffff" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
            <meshStandardMaterial map={bayamTex} color="#ffffff" roughness={0.6} />
          </mesh>
          {/* Pants Waist */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.3]} />
            <meshStandardMaterial map={bayamTex} color="#ffffff" roughness={0.6} />
          </mesh>

          {/* Bag */}
          <RoundedBox args={[0.4, 0.3, 0.2]} radius={0.05} smoothness={4} position={[0, 0.2, 0.3]} castShadow>
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </RoundedBox>
          {/* Bag Strap */}
          <mesh position={[0, 0.45, 0.3]}>
            <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
          </mesh>

          <Text position={[0, -1.5, 0.7]} fontSize={0.15} color="#f59e0b" anchorX="center">
            Celana & Tas
          </Text>
        </group>
      </group>
      
      <pointLight position={[0, 3, 2]} intensity={10} distance={10} color="#fffbeb" />
    </group>
  );
}
