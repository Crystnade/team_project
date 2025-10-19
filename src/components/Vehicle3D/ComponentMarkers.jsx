import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHealthStore } from '../../stores/healthStore.js'
import { STATUS } from '../../utils/health.js'

function Marker({ position, color, pulse, onClick }){
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const s = pulse === 'fast' ? 1 + Math.sin(t*4)*0.2 : pulse === 'slow' ? 1 + Math.sin(t*2)*0.1 : 1
    ref.current.scale.set(s,s,s)
  })
  return (
    <mesh ref={ref} position={position} onClick={onClick}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} depthTest={false} toneMapped={false} />
    </mesh>
  )
}

export default function ComponentMarkers(){
  const { components, setSelected } = useHealthStore()

  const positions = useMemo(()=>({
    engine: [[0,0.3,1.2]],
    battery: [[-0.4,0.35,1.1]],
    brakes: [[-0.8,-0.1,1.0],[0.8,-0.1,1.0],[-0.8,-0.1,-1.0],[0.8,-0.1,-1.0]],
    transmission: [[0,0,-0.1]],
    suspension: [[-0.8,0.2,1.0],[0.8,0.2,1.0],[-0.8,0.2,-1.0],[0.8,0.2,-1.0]],
    exhaust: [[0,-0.2,-1.3]],
    cooling: [[0,0.35,1.3]],
    tires: [[-0.8,-0.1,1.0],[0.8,-0.1,1.0],[-0.8,-0.1,-1.0],[0.8,-0.1,-1.0]],
  }),[])

  const pulseFor = (status) => status==='critical'?'fast':status==='warning'?'slow':status==='maintenance'?null:null

  return (
    <group>
      {components.map(c => (positions[c.id]||[]).map((p,i)=> (
        <Marker key={c.id+i} position={p} color={STATUS[c.status].color} pulse={pulseFor(c.status)} onClick={()=>setSelected(c.id)} />
      )))}
    </group>
  )
}
