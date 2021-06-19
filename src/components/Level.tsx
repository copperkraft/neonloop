import React, { useMemo, useState } from 'react';
import { Vector3 } from 'three';
import { levels } from '../data/levels';
import { addLevelBorders } from '../utils/addLevelBorders';
import { Ball } from './Ball';
import { WallMap } from './WallMap';
import { EventPlane } from './EventPlane';

interface LevelProps {
  levelIndex: number;
}

export const Level: React.FC<LevelProps> = ({ levelIndex }: LevelProps) => {
  const level = useMemo(() => addLevelBorders(levels[levelIndex]), [levelIndex]);
  const height = level.length;
  const width = level[0].length;

  const [ballPosition, setBallPosition] = useState(new Vector3(0, 0, 0));

  return (
    <group>
      <EventPlane size={[width, height]} onClick={({ point }) => setBallPosition(point)} />
      <WallMap position={[-width / 2, 0, -height / 2]} level={level} />
      <Ball velocity={[0.05, 0]} position={ballPosition.toArray()} />
    </group>
  );
};
