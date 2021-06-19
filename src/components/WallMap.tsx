import React, { useMemo } from 'react';
import { levels } from '../data/levels';
import { Wall } from './Wall';
import { getLevelWallMap } from '../utils/getWallMap';
import { addLevelBorders } from '../utils/addLevelBorders';

interface WallMapProps {
  level: number;
}

export const WallMap: React.FC<WallMapProps> = ({ level: levelIndex }: WallMapProps) => {
  const [height, width, walls] = useMemo(() => {
    const level = addLevelBorders(levels[levelIndex]);

    const levelWalls = getLevelWallMap(level, 'W')
      .flatMap((row, x) => row
        .map((type, y) => (<Wall position={[y, 0, x]} type={type} />)));

    return [level.length, level[0].length, levelWalls];
  }, [levelIndex]);

  return (
    <group position={[-width / 2, 0, -height / 2]}>
      {walls}
    </group>
  );
};
