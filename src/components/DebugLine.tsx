import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface DebugLineProps {
  origin: [number, number, number],
  vector: Vector3,
}

export const DebugLine: React.FC<DebugLineProps> = ({ origin, vector }: DebugLineProps) => {
  const points: [number, number, number][] = [
    origin,
    vector.toArray(),
  ];

  return (
    <Line
      points={points}
      color="red"
      lineWidth={1}
    />
  );
};
