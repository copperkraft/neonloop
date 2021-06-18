import { LevelData } from '../data/levels';
import { getSquareMap } from './getSquareMap';

// represents wall presence on left-top, right-top, left-bottom, right-bottom corners by 0 and 1
export type WallCode =
  '0000' |
  '1000' |
  '0100' |
  '0001' |
  '0010' |
  '1100' |
  '0101' |
  '0011' |
  '1010' |
  '0110' |
  '1001' |
  '0111' |
  '1011' |
  '1110' |
  '1101' |
  '1111'


export const getLevelWallMap = (level: LevelData, wallLetter: string) => {
  const wallMap = level
    .map((row) => row
      .split('')
      .map((letter) => (letter === wallLetter ? 1 : 0)));

  return getSquareMap(wallMap);
};
