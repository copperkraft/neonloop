import React from 'react';
import { Sphere } from '@react-three/drei';
import { Color } from 'three';

interface BallProps {
  position?: [number, number, number]
}

export const Ball: React.FC<BallProps> = ({ position = [0, 0, 0] }: BallProps) => (
  <Sphere
    args={[0.5, 20, 10]}
    position={position}
    visible
  >
    <meshStandardMaterial
      attach="material"
      color="green"
      roughness={0}
      emissive={new Color('#ff0000')}
      emissiveIntensity={1}
      metalness={1}
      opacity={1}
      transparent
    />
  </Sphere>
);
