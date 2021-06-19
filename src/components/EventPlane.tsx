import { Plane } from '@react-three/drei';
import React from 'react';
import { ThreeEvent } from '@react-three/fiber';

interface LevelProps {
  size: [number, number],
  onClick: (event: ThreeEvent<MouseEvent>) => void
}

export const EventPlane: React.FC<LevelProps> = ({
  size: [width, height],
  onClick,
}: LevelProps) => (
  <Plane
    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    args={[height - 1, width - 1, height, width]}
    position={[-0.5, 0.01, -0.5]}
    onClick={onClick}
  >
    <meshStandardMaterial
      attach="material"
      roughness={1}
      metalness={0}
      opacity={0}
      transparent
      wireframe
    />
  </Plane>
);
