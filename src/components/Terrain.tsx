import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const GROUND_HEIGHT = -50;


export function Terrain() {
  const terrain = useRef<Mesh>(null!);

  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}
