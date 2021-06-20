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

interface LevelProps {
  levelIndex: number;
}

export const Level: React.FC<LevelProps> = ({ levelIndex }: LevelProps) => {
  const level = useMemo(() => addLevelBorders(levels[levelIndex]), [levelIndex]);
  const height = level.length;
  const width = level[0].length;

  const [linkActive, setLinkActive] = useState(false);
  const [ballVelocity] = useState(new Vector3(5, 0, 0));

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
      <Pin pin={pin} state={linkActive ? 'active' : 'valid'} />
      <EventPlane
        size={[width, height]}
        onPointerMove={movePin}
        onPointerDown={activatePin}
        onPointerUp={deactivatePin}
        onPointerLeave={deactivatePin}
      />
      <WallMap position={[-width / 2, 0, -height / 2]} level={level} />
      <Ball ball={ball} velocity={ballVelocity} />
    </group>
  );
};
