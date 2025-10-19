import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import VehicleModel from './VehicleModel.jsx'
import { useHealthStore } from '../../stores/healthStore.js'
import { highestSeverity } from '../../utils/health.js'

function PulseEffect() {
  const group = useRef()
  const components = useHealthStore(s=>s.components)
  const severity = highestSeverity(components)
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const amp = severity === 2 ? 0.9 + Math.sin(t*4)*0.1 : severity === 1 ? 0.95 + Math.sin(t*2)*0.05 : 1
    group.current.scale.setScalar(amp)
  })
  return (
    <group ref={group}>
      <VehicleModel />
    </group>
  )
}

export default function VehicleScene(){
  const bg = '#f5f7fb'
  return (
    <Canvas camera={{ position: [2.8, 1.8, 3.2], fov: 50 }} style={{width:'100%',height:'100%',borderRadius:12}}>
      <color attach="background" args={[bg]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Center>
          <PulseEffect />
        </Center>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI*0.9} />
    </Canvas>
  )
}
