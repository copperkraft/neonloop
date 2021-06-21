import React from 'react';
import { Text } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

export interface LevelResult {
  time: number;
  collectibles: number;
}

interface StatsProps extends MeshProps {
  levelResults: LevelResult[];
}

const formatResult = ({ time, collectibles }: LevelResult, index: number) => `L:${index + 1}   T:${(time / 1000).toFixed(2)}   C:${collectibles}`;

export const Stats: React.FC<StatsProps> = ({ levelResults, position }: StatsProps) => (
  <Text
    position={position}
    rotation={[-Math.PI / 2, 0, 0]}
    color="white"
    fontSize={1.5}
    maxWidth={20}
    lineHeight={1.5}
    letterSpacing={0.02}
    textAlign="left"
    anchorX={20}
    anchorY="top"
  >
    { levelResults.map((levelResult, index) => formatResult(levelResult, index)).join('\n')}
  </Text>
);
