import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { Mesh, Vector3 } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { levels } from '../data/levels';
import { addLevelBorders } from '../utils/addLevelBorders';
import { Ball } from './Ball';
import { WallMap } from './WallMap';
import { EventPlane } from './EventPlane';
import { Pin } from './Pin';
import { MagnetLink } from './MagnetLink';

const BALL_SPEED = 2;

interface LevelProps {
  levelIndex: number;
}

export const Level: React.FC<LevelProps> = ({ levelIndex }: LevelProps) => {
  const level = useMemo(() => addLevelBorders(levels[levelIndex]), [levelIndex]);
  const height = level.length;
  const width = level[0].length;

  const [linkActive, setLinkActive] = useState(false);
  const [ballVelocity] = useState(new Vector3(BALL_SPEED, 0, 0));

  const ball = useRef<Mesh>(null!);
  const pin = useRef<Mesh>(null!);

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
      <Ball ball={ball} velocity={ballVelocity} />
      <Pin pin={pin} state={linkActive ? 'active' : 'valid'} />
      <MagnetLink ball={ball} pin={pin} active={linkActive} />
    </group>
  );
};
