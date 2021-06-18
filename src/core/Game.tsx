import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Terrain } from '../components/Terrain';
import { WallMap } from '../components/WallMap';

const Scene = () => (
  <>
    <Terrain />
    <WallMap />
    <directionalLight color="purple" intensity={1} position={[5, 3, -5]} />
    <directionalLight color="blue" intensity={2} position={[100, 0, 30]} />
    <directionalLight color="red" intensity={3} position={[-100, 0, -30]} />
  </>
);

export const Game: React.FC = () => {
  const {
    x,
    y,
    z,
  } = useControls({
    x: 0,
    y: 50,
    z: 10,
    level: 'level1',
  });

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor('#040404');
      }}
    >
      <PerspectiveCamera makeDefault position={[x, y, z]} />
      <MapControls />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};
