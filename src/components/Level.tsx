import React, { useMemo } from 'react';
import { levels } from '../data/levels';
import { addLevelBorders } from '../utils/addLevelBorders';
import { Ball } from './Ball';
import { WallMap } from './WallMap';

interface LevelProps {
  levelIndex: number;
}

export const Level: React.FC<LevelProps> = ({ levelIndex }: LevelProps) => {
  const level = useMemo(() => addLevelBorders(levels[levelIndex]), [levelIndex]);

  return (
    <group>
      <WallMap level={level} />
      <Ball velocity={[0.05, 0]} position={[0, 0, 0]} />
    </group>
  );
};
