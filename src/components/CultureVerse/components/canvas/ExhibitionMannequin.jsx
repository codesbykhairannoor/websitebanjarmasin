import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';

export const ExhibitionMannequin = ({ position, rotation, texture, type = 'tshirt', title }) => {
  // Create a realistic 2D Profile Shape based on apparel type
  const apparelShape = useMemo(() => {
    const s = new THREE.Shape();
    if (type === 'tshirt') {
      s.moveTo(-0.55, -0.9);
      s.lineTo(-0.55, 0.35);
      s.lineTo(-0.95, 0.05);
      s.lineTo(-1.1, 0.35);
      s.lineTo(-0.65, 0.8);
      s.lineTo(-0.25, 0.95);
      s.bezierCurveTo(-0.1, 0.75, 0.1, 0.75, 0.25, 0.95);
      s.lineTo(0.65, 0.8);
      s.lineTo(1.1, 0.35);
      s.lineTo(0.95, 0.05);
      s.lineTo(0.55, 0.35);
      s.lineTo(0.55, -0.9);
      s.lineTo(-0.55, -0.9);
    } else if (type === 'kimono') {
      s.moveTo(-0.65, -1.2);
      s.lineTo(-0.65, 0.1); 
      s.lineTo(-1.4, -0.4); 
      s.lineTo(-1.5, 0.4);
      s.lineTo(-0.7, 0.8);
      s.lineTo(-0.25, 0.95);
      s.lineTo(0.0, 0.6); 
      s.lineTo(0.25, 0.95);
      s.lineTo(0.7, 0.8);
      s.lineTo(1.5, 0.4);
      s.lineTo(1.4, -0.4);
      s.lineTo(0.65, 0.1);
      s.lineTo(0.65, -1.2);
      s.lineTo(-0.65, -1.2);
    } else if (type === 'selendang') {
      s.moveTo(-0.2, 0.8);
      s.lineTo(-0.25, -1.8);
      s.lineTo(-0.05, -1.8);
      s.lineTo(0, 0.5); 
      s.bezierCurveTo(0, 0.9, 0.2, 0.9, 0.2, 0.5);
      s.lineTo(0.05, -1.6);
      s.lineTo(0.25, -1.6);
      s.lineTo(0.3, 0.8);
      s.bezierCurveTo(0.3, 1.2, -0.2, 1.2, -0.2, 0.8);
    } else if (type === 'totebag' || type === 'tas') {
      s.moveTo(-0.5, -0.5);
      s.lineTo(-0.55, 0.3); 
      s.lineTo(-0.3, 0.3);
      s.lineTo(-0.25, 0.8); 
      s.lineTo(-0.15, 0.8);
      s.lineTo(-0.2, 0.3);
      s.lineTo(0.2, 0.3);
      s.lineTo(0.15, 0.8); 
      s.lineTo(0.25, 0.8);
      s.lineTo(0.3, 0.3);
      s.lineTo(0.55, 0.3); 
      s.lineTo(0.5, -0.5);
      s.lineTo(-0.5, -0.5);
    } else if (type === 'celana') {
      s.moveTo(-0.4, 0.9); 
      s.lineTo(0.4, 0.9); 
      s.lineTo(0.45, 0.7); 
      s.lineTo(0.5, -1.2); 
      s.lineTo(0.1, -1.2); 
      s.lineTo(0, 0); 
      s.lineTo(-0.1, -1.2); 
      s.lineTo(-0.5, -1.2); 
      s.lineTo(-0.45, 0.7); 
      s.lineTo(-0.4, 0.9);
    } else if (type === 'dress') {
      s.moveTo(-0.8, -1.6); 
      s.lineTo(-0.4, 0.2); 
      s.lineTo(-0.5, 0.8); 
      s.lineTo(-0.2, 0.95); 
      s.lineTo(0.2, 0.95);
      s.lineTo(0.5, 0.8);
      s.lineTo(0.4, 0.2);
      s.lineTo(0.8, -1.6); 
      s.lineTo(-0.8, -1.6);
    }
    return s;
  }, [type]);

  const extrudeSettings = {
    depth: type === 'selendang' ? 0.02 : 0.05,
    bevelEnabled: true,
    bevelSegments: 16,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08
  };

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.55, 0.12, 0.55]} position={[0, 0.06, 0]} />
        <CuboidCollider args={[0.3, 1.4, 0.3]} position={[0, 1.4, 0]} />

        <mesh position={[0, 0.06, 0]} receiveShadow>
          <cylinderGeometry args={[0.5, 0.55, 0.12, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.51, 0.51, 0.04, 32]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.95} />
        </mesh>

        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.6, 14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[0, 1.65, 0.08]} castShadow>
          <boxGeometry args={[0.9, 0.03, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>

        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[apparelShape, extrudeSettings]} />
          <meshStandardMaterial 
            map={texture} 
            color="#ffffff" 
            roughness={0.5} 
            metalness={0.1}
          />
        </mesh>
      </RigidBody>

      {title && (
        <group position={[0, -0.4, 0]}>
          <Text position={[0, 0.4, 0.6]} fontSize={0.2} color="#f59e0b" anchorX="center" fontWeight="bold">
            {title}
          </Text>
        </group>
      )}
    </group>
  );
};

export default ExhibitionMannequin;
