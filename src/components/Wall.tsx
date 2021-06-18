import React from 'react';
import { Vector3 } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Prism } from '../utils/Prism';
import { geometryMapping } from '../utils/geometryMapping';
import { WallCode } from '../utils/getWallMap';


interface WallProps {
  position: Vector3;
  type: WallCode;
}

export const Wall: React.FC<WallProps> = ({ position, type }) =>
  type === '0000' ? null : (
    <group position={position}>
      <Prism
        rotation={[Math.PI / 2, 0, 0]}
        visible
        vertices={geometryMapping[type]}
        position={[-0.5, 0.5, -0.5]}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.5}
          metalness={0.7}
          opacity={1}
        />
      </Prism>
    </group>
  );
