import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { NeonScene } from '../components/NeonScene';
import { Level } from '../components/Level';
import { levelColors } from '../data/levels/levelColors';
import { LevelResult } from '../components/Stats';

const BALL_SPEED = 10;
const TRACTION_FORCE = 30;

export const Game: React.FC = () => {
  const [levelResults, setLevelResults] = useState<LevelResult[]>([]);
  const [level, setLevel] = useState(0);

  const {
    isBloom,
    showStats,
  } = useControls({
    isBloom: false,
    showStats: false,
  });

  const advanceLevel = useCallback((levelResult) => {
    setLevel(level + 1);
    setLevelResults([
      ...levelResults,
      levelResult,
    ]);
  }, [level, levelResults]);

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor('#000000');
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 60, 10]} />
      <MapControls enabled={false} />
      <Suspense fallback={null}>
        <NeonScene isBloom={isBloom} colorScheme={levelColors[level % levelColors.length]}>
          <Level
            levelResults={showStats ? levelResults : []}
            advanceLevel={advanceLevel}
            ballSpeed={BALL_SPEED}
            tractionForce={TRACTION_FORCE}
            levelIndex={level}
          />
        </NeonScene>
      </Suspense>
    </Canvas>
  );
};
