import { WallCode } from './wallCode.type';

export const getSquareMap = (map: (1 | 0)[][]) => {
  const newMap: WallCode[][] = [];

  for (let y = 0; y < map.length - 1; y += 1) {
    const newRow: WallCode[] = [];
    for (let x = 0; x < map[0].length - 1; x += 1) {
      newRow.push(`${map[y][x]}${map[y][x + 1]}${map[y + 1][x]}${map[y + 1][x + 1]}`);
    }
    newMap.push(newRow);
  }

  return newMap;
};
