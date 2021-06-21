import React, { MutableRefObject } from 'react';
import { Cone } from '@react-three/drei';
import { Color, Mesh } from 'three';

interface PinProps {
  state: 'active' | 'valid' | 'invalid',
  pin: MutableRefObject<Mesh>
}

export const Pin: React.FC<PinProps> = ({ state, pin }: PinProps) => (
  <group ref={pin}>
    <Cone
      args={[0.5, 1, 7]}
      visible
    >
      <meshStandardMaterial
        attach="material"
        color="green"
        roughness={0}
        emissive={new Color(state === 'invalid' ? '#ff0000' : '#0000ff')}
        emissiveIntensity={state === 'active' ? 5 : 0.2}
        metalness={1}
        opacity={1}
        transparent
      />
    </Cone>
  </group>
);
