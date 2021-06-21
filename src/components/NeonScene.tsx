import React, { PropsWithChildren } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Terrain } from './Terrain';

interface NeonSceneProps {
  colorScheme: [string, string, string];
  isBloom: boolean;
}

export const NeonScene: React.FC<NeonSceneProps> = ({
  children,
  colorScheme: [left, right, top],
  isBloom,
}: PropsWithChildren<NeonSceneProps>) => (
  <>
    <Terrain />
    <directionalLight color={top} intensity={1} position={[5, 3, -5]} />
    <directionalLight color={left} intensity={4} position={[100, 0, 30]} />
    <directionalLight color={right} intensity={3} position={[-100, 0, -30]} />
    {children}
    { isBloom && (
      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={0.1} luminanceSmoothing={0.3} height={500} />
      </EffectComposer>
    )}
  </>
);
