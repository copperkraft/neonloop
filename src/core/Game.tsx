import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { NeonScene } from '../components/NeonScene';
import { Level } from '../components/Level';

export const Game: React.FC = () => {
  const [{
    x,
    y,
    z,
    level,
    ballSpeed,
    tractionForce,
  }, set] = useControls(() => ({
    x: 0,
    y: 70,
    z: 10,
    level: {
      value: 0, min: 0, max: 6, step: 1,
    },
    ballSpeed: {
      value: 10, min: 1, max: 100, step: 0.5,
    },
    tractionForce: {
      value: 0.15, min: 0.01, max: 1, step: 0.01,
    },
  }));

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor('#000000');
      }}
    >
      <Stats />
      <PerspectiveCamera makeDefault position={[x, y, z]} />
      <MapControls enabled={false} />
      <Suspense fallback={null}>
        <NeonScene>
          <Level
            advanceLevel={() => set({ level: level + 1 })}
            ballSpeed={ballSpeed}
            tractionForce={tractionForce}
            levelIndex={level}
          />
        </NeonScene>
      </Suspense>
    </Canvas>
  );
};
