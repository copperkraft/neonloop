import React, { useMemo, useRef } from 'react';
import { MeshProps } from '@react-three/fiber';
import { Mesh, Shape, Vector2 } from 'three';
import { Extrude } from '@react-three/drei';

interface PrismProps extends MeshProps{
  vertices: [number, number][];
}

export const Prism: React.FC<PrismProps> = ({ vertices, children, rotation }: PrismProps) => {
  const terrain = useRef<Mesh>(null!);

  const shape = useMemo(() => new Shape(vertices.map(([x, y]) => new Vector2(x, y))), [vertices]);

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
