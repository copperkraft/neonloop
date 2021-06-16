import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Default: THREE.Mesh
  }
}

export function Arwing(props: JSX.IntrinsicElements['group']) {
  const ship = useRef<THREE.Group>(null!);
  const { nodes } = useGLTF('/models/arwing.glb') as GLTFResult;
  const [shipPosition, setShipPosition] = useState({
    position: { x: 0, y: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  });

  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(({ mouse }) => {
    console.log(mouse);
    setShipPosition({
      position: { x: mouse.x * 10, y: mouse.y * 5 },
      rotation: { z: -mouse.x, x: -mouse.x, y: -mouse.y * 0.5 },
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x;
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
  });

  return (
    <group ref={ship} {...props} dispose={null}>
      <mesh geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="orange"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/arwing.glb')
