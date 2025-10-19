import React from 'react'

function Wheel({ position }){
  return (
    <mesh position={position} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[0.28, 0.28, 0.14, 16]} />
      <meshBasicMaterial color="#8a94a1" wireframe />
    </mesh>
  )
}

export default function SimpleWireCar(){
  return (
    <group>
      {/* Chassis */}
      <mesh position={[0,0,0]}>
        <boxGeometry args={[2.6, 0.4, 1.2]} />
        <meshBasicMaterial color="#9aa1a8" wireframe />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.1,0.45,0]}>
        <boxGeometry args={[1.6, 0.6, 1]} />
        <meshBasicMaterial color="#9aa1a8" wireframe />
      </mesh>
      {/* Wheels */}
      <Wheel position={[-0.95,-0.25,0.58]} />
      <Wheel position={[0.95,-0.25,0.58]} />
      <Wheel position={[-0.95,-0.25,-0.58]} />
      <Wheel position={[0.95,-0.25,-0.58]} />
      {/* Hood line */}
      <mesh position={[0.95,0.25,0]}>
        <boxGeometry args={[0.6, 0.2, 1]} />
        <meshBasicMaterial color="#9aa1a8" wireframe />
      </mesh>
    </group>
  )
}
