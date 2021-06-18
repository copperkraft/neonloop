import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
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

export const Game: React.FC = () => (
  <Canvas
    camera={{ position: [0, 5, 10] }}
    onCreated={({ gl }) => {
      gl.setClearColor('#040404');
    }}
  >
    <MapControls />
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  </Canvas>
);
