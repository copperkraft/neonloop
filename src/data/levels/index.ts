import { intro } from './intro';
import { ocean } from './ocean';
import { asteroids } from './asteroids';
import { explosion } from './explosion';
import { eldritch } from './eldritch';
import { hive } from './hive';
import { station } from './station';
import { vault } from './vault';

export type { LevelData } from './levelData.type';

export const levels = [
  intro,
  ocean,
  asteroids,
  explosion,
  eldritch,
  hive,
  station,
  vault,
];
