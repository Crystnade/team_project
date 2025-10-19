import React from 'react'

function Wire({ children, color = '#9aa1a8' }){
  return <meshBasicMaterial color={color} wireframe />
}

function Wheel({ position }){
  return (
    <mesh position={position} rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[0.32, 0.32, 0.2, 18]} />
      <Wire />
    </mesh>
  )
}

export default function SimpleWireF1(){
  // Roughly scaled: length ~ 4.5, width ~ 2.0
  return (
    <group>
      {/* Main chassis */}
      <mesh position={[0,0,0]}>
        <boxGeometry args={[3.6, 0.35, 1.0]} />
        <Wire />
      </mesh>
      {/* Nose cone */}
      <mesh position={[1.4,0.1,0]} rotation={[0,0,0]}>
        <boxGeometry args={[1.0, 0.18, 0.4]} />
        <Wire />
      </mesh>
      {/* Front wing */}
      <mesh position={[2.1,0,0]}>
        <boxGeometry args={[0.6, 0.08, 1.8]} />
        <Wire />
      </mesh>
      {/* Rear wing */}
      <mesh position={[-1.6,0.4,0]}>
        <boxGeometry args={[0.2, 0.6, 1.6]} />
        <Wire />
      </mesh>
      {/* Airbox */}
      <mesh position={[-0.6,0.6,0]}>
        <boxGeometry args={[0.3, 0.5, 0.5]} />
        <Wire />
      </mesh>
      {/* Cockpit */}
      <mesh position={[0.2,0.35,0]}>
        <boxGeometry args={[0.8, 0.4, 0.6]} />
        <Wire />
      </mesh>
      {/* Wheels */}
      <Wheel position={[1.4,-0.25,0.95]} />
      <Wheel position={[1.4,-0.25,-0.95]} />
      <Wheel position={[-1.2,-0.25,0.95]} />
      <Wheel position={[-1.2,-0.25,-0.95]} />
    </group>
  )
}
