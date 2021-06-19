import React from 'react';
import { Line } from '@react-three/drei';

interface BallProps {
  origin: [number, number, number],
  vector: [number, number],
}

export const DebugLine: React.FC<BallProps> = ({ origin, vector }: BallProps) => {
  const [x, y, z] = origin;
  const [xv, zv] = vector;
  const points: [number, number, number][] = [
    origin,
    [x + xv * 100, y, z + zv * 100],
  ];

  return (
    <Line
      points={points}
      color="red"
      lineWidth={1}
    />
  );
};
