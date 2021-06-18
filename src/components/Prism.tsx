import React, { useRef } from 'react';
import { MeshProps } from '@react-three/fiber';
import { Mesh, Shape, Vector2 } from 'three';
import { Extrude } from '@react-three/drei';

interface PrismProps extends MeshProps{
  vertices: [number, number][];
}

export const Prism: React.FC<PrismProps> = ({ vertices, children, rotation }: PrismProps) => {
  const terrain = useRef<Mesh>(null!);

  const shape = new Shape(vertices.map(([x, y]) => new Vector2(x, y)));

  return (
    <Extrude
      rotation={rotation}
      ref={terrain}
      visible
      args={[shape, { steps: 1, depth: 1, bevelEnabled: false }]}
    >
      {children}
    </Extrude>
  );
};
