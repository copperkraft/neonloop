import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface BallProps {
  origin: [number, number, number],
  vector: Vector3,
}

export const DebugLine: React.FC<BallProps> = ({ origin, vector }: BallProps) => {
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
