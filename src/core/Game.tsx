import React, { Suspense } from 'react'
import { Camera, Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { Arwing } from '../Models/Arwing';
import { Terrain } from '../components/Terrain';
import { Target } from '../components/Target';

interface GameProps {
  configs?: {
    cameraConfigs: Camera;
  };
}

const Scene = () => {
  return (
    <>
      <Target />
      <Terrain />
      <Arwing />
      <directionalLight intensity={0.5} position={[5, 3, -5]}/>
      <ambientLight intensity={0.2} />
    </>
  );
};

export const Game: React.FC<GameProps> = ({configs}) => {
  return (
    <Canvas
      camera={{ position: [0, 5, 10] }}
      onCreated={({ gl, size }) => {
        gl.setClearColor('#252934');
      }}
    >
      <OrbitControls
        enableZoom={false}
        maxAzimuthAngle={Math.PI / 4}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI / 4}
        minPolarAngle={0}
      />
      <Suspense fallback={null}>
        <Scene/>
      </Suspense>
    </Canvas>
  )
};
