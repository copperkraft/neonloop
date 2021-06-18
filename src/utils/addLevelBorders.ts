import { LevelData } from '../data/levels';

export const addLevelBorders: (level: LevelData) => string[] = (level: LevelData) => [
  `W${[...level[0].split('')].map(() => 'W').join('')}W`,
  ...level.map((row) => `W${row}W`),
  `W${[...level[0].split('')].map(() => 'W').join('')}W`,
];
