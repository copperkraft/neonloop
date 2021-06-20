import { Vector3 } from 'three';
import { LevelData } from '../data/levels';
import { addLevelBorders } from './addLevelBorders';

export const parseLevel = (level: LevelData) => {
  const borderedLevel = addLevelBorders(level);
  const start = new Vector3(0, 0, 0);
  const collectibles: Vector3[] = [];
  const goal = new Vector3(0, 0, 0);
  const height = borderedLevel.length;
  const width = borderedLevel[0].length;
  const offset = new Vector3(-width / 2, 0, -height / 2);

  const tileMap = borderedLevel
    .map((row, y) => row
      .split('')
      .map((type, x) => ({
        type,
        x,
        y,
      })));

  tileMap.forEach((row) => row.forEach(({ type, x, y }) => {
    switch (type) {
      case 'S':
        start.set(x, 0, y);
        break;
      case 'G':
        goal.set(x, 0, y);
        break;
      case 'C':
        collectibles.push(new Vector3(x, 0, y));
        break;
      default:
        break;
    }
  }));

  const wallMap: (1 | 0)[][] = tileMap
    .map((row) => row
      .map(({ type }) => (type === 'W' ? 1 : 0)));

  return {
    collectibles,
    start,
    goal,
    wallMap,
    height,
    width,
    offset,
  };
};
