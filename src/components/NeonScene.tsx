import React from 'react';
import { Terrain } from './Terrain';

export const NeonScene: React.FC = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Terrain />
    <directionalLight color="purple" intensity={1} position={[5, 3, -5]} />
    <directionalLight color="blue" intensity={2} position={[100, 0, 30]} />
    <directionalLight color="red" intensity={3} position={[-100, 0, -30]} />
    {children}
  </>
);
