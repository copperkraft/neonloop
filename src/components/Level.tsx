import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { Mesh, Vector3 } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { levels } from '../data/levels';
import { addLevelBorders } from '../utils/addLevelBorders';
import { Ball } from './Ball';
import { WallMap } from './WallMap';
import { EventPlane } from './EventPlane';
import { Pin } from './Pin';
import { MagnetLink } from './MagnetLink';

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
  const level = useMemo(() => addLevelBorders(levels[levelIndex]), [levelIndex]);
  const height = level.length;
  const width = level[0].length;

  const [linkActive, setLinkActive] = useState(false);
  const velocity = useRef<Vector3>(new Vector3(ballSpeed, 0, 0));

  const ball = useRef<Mesh>(null!);
  const pin = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    ball.current.position.addScaledVector(velocity.current, delta);
    if (linkActive) {
      const direction = new Vector3().subVectors(pin.current.position, ball.current.position);
      velocity.current.add(direction.setLength(tractionForce)).setLength(ballSpeed);
    }
  });

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
      <WallMap position={[-width / 2, 0, -height / 2]} level={level} />
      <Ball ball={ball} />
      <Pin pin={pin} state={linkActive ? 'active' : 'valid'} />
      <MagnetLink ball={ball} pin={pin} active={linkActive} />
    </group>
  );
};
