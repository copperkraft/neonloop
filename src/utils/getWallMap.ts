import { LevelData } from '../data/levels';
import { getSquareMap } from './getSquareMap';

// represents wall presence on left-top, right-top, left-bottom, right-bottom corners by 0 and 1
export const getLevelWallMap = (level: LevelData, wallLetter: string) => {
  const wallMap = level
    .map((row) => row
      .split('')
      .map((letter) => (letter === wallLetter ? 1 : 0)));

  return getSquareMap(wallMap);
};
