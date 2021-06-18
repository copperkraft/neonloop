import React from 'react';
import { level3 } from '../data/levels';
import { Wall } from './Wall';
import { getLevelWallMap } from '../utils/getWallMap';
import { addLevelBorders } from '../utils/addLevelBorders';

export const WallMap: React.FC = () => {
  const level = addLevelBorders(level3);

  const walls = getLevelWallMap(level, 'W')
    .flatMap((row, x) =>row
      .map((type, y) => {
        return (<Wall position={[y, 0, x]} type={type}/>);
      }));

  return (
    <group position={[- level[0].length / 2, 0, -level.length / 2]}>
      { walls }
    </group>
  );
}
