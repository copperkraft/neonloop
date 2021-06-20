import React from 'react';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Terrain } from './Terrain';

export const NeonScene: React.FC = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Terrain />
    <directionalLight color="purple" intensity={1} position={[5, 3, -5]} />
    <directionalLight color="blue" intensity={4} position={[100, 0, 30]} />
    <directionalLight color="red" intensity={3} position={[-100, 0, -30]} />
    {children}
    {/* <EffectComposer> */}
    {/*  <Bloom intensity={1} luminanceThreshold={0.1} luminanceSmoothing={0.3} height={300} /> */}
    {/* </EffectComposer> */}
  </>
);
