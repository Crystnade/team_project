import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Suspense } from 'react'
import SimpleWireF1 from './SimpleWireF1.jsx'
import ComponentMarkers from './ComponentMarkers.jsx'

export default function VehicleScene(){
  const bg = '#f5f7fb'
  return (
    <Canvas camera={{ position: [2.8, 1.8, 3.2], fov: 50 }} style={{width:'100%',height:'100%',borderRadius:12}}>
      <color attach="background" args={[bg]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Center>
          <SimpleWireF1 />
          <ComponentMarkers />
        </Center>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI*0.9} />
    </Canvas>
  )
}
