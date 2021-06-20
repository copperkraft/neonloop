import React, { useRef } from 'react';
import { Icosahedron } from '@react-three/drei';
import { Color, Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface GoalProps {
  position: Vector3,
}

export const Goal: React.FC<GoalProps> = ({ position }: GoalProps) => {
  const ref = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    ref.current.rotateX(0.01);
    ref.current.position.setY(Math.sin(clock.elapsedTime * 2));
  });

  return (
    <Icosahedron
      ref={ref}
      args={[0.5]}
      position={position}
      visible
    >
      <meshStandardMaterial
        attach="material"
        color="green"
        roughness={0}
        emissive={new Color('#00ffff')}
        emissiveIntensity={0.3}
        metalness={1}
        opacity={1}
        transparent
      />
    </Icosahedron>
  );
};
