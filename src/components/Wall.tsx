import React from 'react';
import { Vector3 } from '@react-three/fiber';
import { Prism } from './Prism';
import { geometryMapping } from '../utils/geometryMapping';
import { WallCode } from '../utils/wallCode.type';

interface WallProps {
  position: Vector3;
  type: WallCode;
}

export const Wall: React.FC<WallProps> = ({ position, type }: WallProps) => (type === '0000'
  ? null
  : (
    <group position={position}>
      <Prism
        rotation={[Math.PI / 2, 0, 0]}
        visible
        vertices={geometryMapping[type]}
        position={[-0.5, 0.5, -0.5]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.5}
          metalness={0.7}
          opacity={1}
        />
      </Prism>
    </group>
  ));
