import React, { MutableRefObject, useRef } from 'react';
import { ArrowHelper, Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface MagnetLinkProps {
  ball: MutableRefObject<Mesh>,
  pin: MutableRefObject<Mesh>,
  active: boolean,
}

export const MagnetLink: React.FC<MagnetLinkProps> = (
  {
    ball,
    pin,
    active = false,
  }: MagnetLinkProps,
) => {
  const line = useRef<Mesh>(null!);

  useFrame(() => {
    const from = ball.current.position;
    const to = pin.current.position;

    const direction = new Vector3().subVectors(from, to);
    const arrow = new ArrowHelper(direction.clone().normalize(), from);
    const length = direction.length();

    line.current.position.set(...to.clone().add(from).divideScalar(2).toArray());
    line.current.scale.set(1, length, 1);
    line.current.rotation.setFromQuaternion(arrow.quaternion);
  });

  return (
    <mesh visible={active} ref={line} position={[0, 0, 0]}>
      <cylinderGeometry attach="geometry" args={[0.1, 0.1, 1, 10]} />
      <meshStandardMaterial color="red" attach="material" />
    </mesh>
  );
};
