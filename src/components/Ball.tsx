import React, { MutableRefObject } from 'react';
import { Sphere } from '@react-three/drei';
import { Color, Mesh } from 'three';

interface BallProps {
  ball: MutableRefObject<Mesh>
}

export const Ball: React.FC<BallProps> = ({ ball }: BallProps) => (
  <Sphere
    ref={ball}
    args={[0.5, 20, 10]}
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
