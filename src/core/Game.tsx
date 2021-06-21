import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { NeonScene } from '../components/NeonScene';
import { Level } from '../components/Level';
import { levelColors } from '../data/levels/levelColors';

export const Game: React.FC = () => {
  const [{
    level,
    ballSpeed,
    tractionForce,
    isBloom,
  }, set] = useControls(() => ({
    level: {
      value: 0, min: 0, max: 7, step: 1,
    },
    ballSpeed: {
      value: 10, min: 1, max: 100, step: 0.5,
    },
    tractionForce: {
      value: 30, min: 10, max: 200, step: 10,
    },
    isBloom: false,
  }), { visible: false });

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor('#000000');
      }}
    >
      <Stats />
      <PerspectiveCamera makeDefault position={[0, 70, 10]} />
      <MapControls enabled={false} />
      <Suspense fallback={null}>
        <NeonScene isBloom={isBloom} colorScheme={levelColors[level % levelColors.length]}>
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
