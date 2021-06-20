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

interface LevelProps {
  levelIndex: number;
  ballSpeed: number;
  tractionForce: number;
}

export const Level: React.FC<LevelProps> = (
  {
    levelIndex,
    ballSpeed,
    tractionForce,
  }: LevelProps,
) => {
  const {
    collectibles,
    start,
    goal,
    wallMap,
    width,
    height,
    offset,
  } = useMemo(() => parseLevel(levels[levelIndex]), [levelIndex]);

  const [linkActive, setLinkActive] = useState(false);
  const velocity = useRef<Vector3>(new Vector3(ballSpeed, 0, 0));

  const ball = useRef<Mesh>(null!);
  const pin = useRef<Mesh>(null!);

  const init = useCallback(() => {
    ball.current.position.set(...start.clone().add(offset).toArray());
    velocity.current.set(ballSpeed, 0, 0);
  }, [start]);

  useFrame((state, delta) => {
    ball.current.position.addScaledVector(velocity.current, delta);

    if (linkActive) {
      const direction = new Vector3().subVectors(pin.current.position, ball.current.position);
      velocity.current.add(direction.setLength(tractionForce)).setLength(ballSpeed);
    }

    const { x, z } = ball.current.position.clone().sub(offset);

    if (x < 0 || x > width - 1 || z < 0 || z > height - 1) { // redundant as levels have walls
      init();
    }

    if (wallMap[Math.round(z)][Math.round(x)]) { // wall collision
      init();
    }
  });

  useEffect(() => init(), []);

  const movePin = useCallback((event: ThreeEvent<PointerEvent>) => {
    pin.current.position.set(...event.point.toArray());
  }, []);

  const activatePin = useCallback(() => {
    setLinkActive(true);
  }, []);

  const deactivatePin = useCallback(() => {
    setLinkActive(false);
  }, []);

  return (
    <group>
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
