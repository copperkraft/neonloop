import React, { useMemo } from 'react';
import { Wall } from './Wall';
import { getSquareMap } from '../utils/getSquareMap';

interface WallMapProps {
  wallMap: (1 | 0)[][];
}

export const WallMap: React.FC<WallMapProps> = ({ wallMap }: WallMapProps) => {
  const walls = useMemo(() => getSquareMap(wallMap)
    .flatMap((row, x) => row
      .map((type, y) => (<Wall position={[y, 0, x]} type={type} />))), [wallMap]);

  return (
    <group>
      {walls}
    </group>
  );
};
