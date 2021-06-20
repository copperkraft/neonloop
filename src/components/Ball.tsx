import React, { MutableRefObject } from 'react';
import { Sphere } from '@react-three/drei';
import { Color, Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { DebugLine } from './DebugLine';

interface BallProps {
  velocity: Vector3,
  ball: MutableRefObject<Mesh>
}

export const Ball: React.FC<BallProps> = ({ velocity, ball }: BallProps) => {
  useFrame((state, delta) => {
    ball.current.position.addScaledVector(velocity, delta);
  });

  return (
    <group ref={ball}>
      <DebugLine origin={[0, 0, 0]} vector={velocity} />
      <Sphere
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
    </group>
  );
};
