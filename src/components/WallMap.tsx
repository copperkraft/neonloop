import React, { useMemo } from 'react';
import { LevelData } from '../data/levels';
import { Wall } from './Wall';
import { getLevelWallMap } from '../utils/getWallMap';

interface WallMapProps {
  level: LevelData;
}

export const WallMap: React.FC<WallMapProps> = ({ level }: WallMapProps) => {
  const walls = useMemo(() => getLevelWallMap(level, 'W')
    .flatMap((row, x) => row
      .map((type, y) => (<Wall position={[y, 0, x]} type={type} />))), [level]);

  const height = level.length;
  const width = level[0].length;

  return (
    <group position={[-width / 2, 0, -height / 2]}>
      {walls}
    </group>
  );
};
