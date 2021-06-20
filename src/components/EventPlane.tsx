import { Plane } from '@react-three/drei';
import React from 'react';
import { ThreeEvent } from '@react-three/fiber';

interface LevelProps {
  size: [number, number],
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
  onPointerLeave: (event: ThreeEvent<PointerEvent>) => void
}

export const EventPlane: React.FC<LevelProps> = ({
  size: [width, height],
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
}: LevelProps) => (
  <Plane
    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    args={[height - 1, width - 1, height, width]}
    position={[-0.5, 0.01, -0.5]}
    visible={false}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerLeave}
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
