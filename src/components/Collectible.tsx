import React, { useRef } from 'react';
import { Cylinder } from '@react-three/drei';
import { Color, Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface CollectibleProps {
  position: Vector3,
}

export const Collectible: React.FC<CollectibleProps> = ({ position }: CollectibleProps) => {
  const ref = useRef<Mesh>(null!);

  useFrame(() => {
    ref.current.rotateX(0.03);
  });

  return (
    <Cylinder
      ref={ref}
      rotation={[0, 0, Math.PI / 2]}
      args={[0.6, 0.6, 0.3, 20]}
      position={position}
      visible
    >
      <meshStandardMaterial
        attach="material"
        color="yellow"
        roughness={0.4}
        emissive={new Color('#ffff00')}
        emissiveIntensity={0.2}
        metalness={1}
        opacity={1}
        transparent
      />
    </Cylinder>
  );
};
