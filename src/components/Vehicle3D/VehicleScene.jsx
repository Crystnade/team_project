import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Suspense } from 'react'
import SimpleWireF1 from './SimpleWireF1.jsx'
import SimpleWireCar from './SimpleWireCar.jsx'
import VehicleModel from './VehicleModel.jsx'
import ComponentMarkers from './ComponentMarkers.jsx'
import { useHealthStore } from '../../stores/healthStore.js'

export default function VehicleScene(){
  const theme = useHealthStore(s=>s.theme)
  const model = useHealthStore(s=>s.model)
  const bg = theme === 'dark' ? '#0b0f14' : '#f5f7fb'
  return (
    <Canvas camera={{ position: [2.8, 1.8, 3.2], fov: 50 }} style={{width:'100%',height:'100%',borderRadius:12}}>
      <color attach="background" args={[bg]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Center>
          {model === 'f1' && <SimpleWireF1 />}
          {model === 'car' && <SimpleWireCar />}
          {model === 'buggy' && <VehicleModel />}
          {model === 'f1' && <ComponentMarkers />}
        </Center>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI*0.9} />
    </Canvas>
  )
}
