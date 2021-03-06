import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Mesh, Vector3 } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { levels } from '../data/levels';
import { Ball } from './Ball';
import { WallMap } from './WallMap';
import { EventPlane } from './EventPlane';
import { Pin } from './Pin';
import { MagnetLink } from './MagnetLink';
import { parseLevel } from '../utils/parseLevel';
import { Goal } from './Goal';
import { Collectible } from './Collectible';
import { LevelResult, Stats } from './Stats';

interface LevelProps {
  levelIndex: number;
  ballSpeed: number;
  tractionForce: number;
  levelResults: LevelResult[];
  advanceLevel: (walkthroughResult: LevelResult) => any;
}

export const Level: React.FC<LevelProps> = (
  {
    levelIndex,
    ballSpeed,
    tractionForce,
    advanceLevel,
    levelResults,
  }: LevelProps,
) => {
  const {
    levelCollectibles,
    start,
    goal,
    wallMap,
    width,
    height,
    offset,
  } = useMemo(() => parseLevel(levels[levelIndex]), [levelIndex]);

  const [linkActive, setLinkActive] = useState(false);
  const [collectibles, setCollectibles] = useState(levelCollectibles);
  const [startTime, setStartTime] = useState(0);
  const velocity = useRef<Vector3>(new Vector3(ballSpeed, 0, 0));

  const ball = useRef<Mesh>(null!);
  const pin = useRef<Mesh>(null!);

  const init = useCallback(() => {
    ball.current.position.set(...start.clone().add(offset).toArray());
    velocity.current.set(ballSpeed, 0, 0);
    setCollectibles(levelCollectibles);
    setStartTime(Date.now());
  }, [start, levelCollectibles, offset, ballSpeed]);

  useEffect(() => init(), [levelIndex]);

  useFrame((state, delta) => {
    const ballPosition = ball.current.position;
    const pinPosition = pin.current.position;

    ballPosition.addScaledVector(velocity.current, delta);
    const direction = pinPosition.clone().sub(ballPosition);

    if (linkActive && direction.angleTo(velocity.current) > Math.PI / 2) {
      velocity.current.add(direction.setLength(tractionForce * delta)).setLength(ballSpeed);
    }

    const [x,, z] = ball.current.position.clone().sub(offset).toArray().map(Math.round);

    if (x < 0 || x > width - 1 || z < 0 || z > height - 1) {
      init();
    }

    if (wallMap[z][x]) {
      init();
    }

    if (goal.x === x && goal.z === z) {
      advanceLevel({
        time: Date.now() - startTime,
        collectibles: levelCollectibles.length - collectibles.length,
      });
    }

    if (collectibles.some(({ x: cx, z: cz }) => x === cx && z === cz)) {
      setCollectibles(collectibles.filter(({ x: cx, z: cz }) => !(x === cx && z === cz)));
    }
  });

  useEffect(() => init(), []);

  const movePin = useCallback((event: ThreeEvent<PointerEvent>) => {
    pin.current.position.set(...event.point.setY(0).toArray());
  }, []);

  const activatePin = useCallback(() => {
    setLinkActive(true);
  }, []);

  const deactivatePin = useCallback(() => {
    setLinkActive(false);
  }, []);

  return (
    <group>
      <Stats position={offset} levelResults={levelResults} />
      <EventPlane
        size={[width, height]}
        onPointerMove={movePin}
        onPointerDown={activatePin}
        onPointerUp={deactivatePin}
        onPointerLeave={deactivatePin}
      />
      <Ball ball={ball} />
      <Pin pin={pin} state={linkActive ? 'active' : 'valid'} />
      <MagnetLink ball={ball} pin={pin} active={linkActive} />
      <group position={offset}>
        <WallMap wallMap={wallMap} />
        <Goal position={goal} />
        { collectibles.map((collectible) => <Collectible position={collectible} />)}
      </group>
    </group>
  );
};
