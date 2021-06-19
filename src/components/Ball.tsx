import React, { useEffect, useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { Color, Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { DebugLine } from './DebugLine';

interface BallProps {
  position: [number, number, number],
  velocity: [number, number],
}

export const Ball: React.FC<BallProps> = ({ position, velocity }: BallProps) => {
  const ball = useRef<Group>(null!);

  useEffect(() => {
    [ball.current.position.x, , ball.current.position.z] = position;
  }, [position]);

  useFrame(() => {
    const [x, y] = velocity;
    ball.current.position.x += x;
    ball.current.position.z -= y;
  });

  return (
    <group ref={ball} position={position}>
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
