import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { NeonScene } from '../components/NeonScene';
import { Level } from '../components/Level';

export const Game: React.FC = () => {
  const {
    x,
    y,
    z,
    level,
  } = useControls({
    x: 0,
    y: 50,
    z: 10,
    level: {
      value: 0, min: 0, max: 6, step: 1,
    },
  });

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor('#000000');
      }}
    >
      <Stats />
      <PerspectiveCamera makeDefault position={[x, y, z]} />
      <MapControls />
      <Suspense fallback={null}>
        <NeonScene>
          <Level levelIndex={level} />
        </NeonScene>
      </Suspense>
    </Canvas>
  );
};
