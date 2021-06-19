import React from 'react';
import { Sphere } from '@react-three/drei';
import { Color } from 'three';

interface BallProps {
  position?: [number, number, number]
}

export const Ball: React.FC<BallProps> = ({ position = [0, 0, 0] }: BallProps) => (
  <Sphere
    args={[1, 20, 10]}
    position={position}
    visible
  >
    <meshStandardMaterial
      attach="material"
      color="blue"
      roughness={1}
      emissive={new Color('#1010ff')}
      emissiveIntensity={1}
      metalness={0.2}
      opacity={1}
      transparent
    />
  </Sphere>
);
