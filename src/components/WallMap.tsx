import React, { useMemo } from 'react';
import { LevelData } from '../data/levels';
import { Wall } from './Wall';
import { getLevelWallMap } from '../utils/getWallMap';

interface WallMapProps {
  level: LevelData;
  position: [number, number, number];
}

export const WallMap: React.FC<WallMapProps> = ({ level, position }: WallMapProps) => {
  const walls = useMemo(() => getLevelWallMap(level, 'W')
    .flatMap((row, x) => row
      .map((type, y) => (<Wall position={[y, 0, x]} type={type} />))), [level]);

  return (
    <group position={position}>
      {walls}
    </group>
  );
};
