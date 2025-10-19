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
      <meshBasicMaterial color={color} transparent opacity={0.8} depthTest={false} toneMapped={false} />
    </mesh>
  )
}

export default function ComponentMarkers(){
  const { components, alerts, setSelected } = useHealthStore()

  // Approximate F1 layout positions
  const positions = useMemo(()=>({
    engine: [[-0.8,0.25,0]],
    battery: [[1.6,0.25,0.3]],
    brakes: [[1.4,-0.15,0.95],[1.4,-0.15,-0.95],[-1.2,-0.15,0.95],[-1.2,-0.15,-0.95]],
    transmission: [[-0.9,0.0,0]],
    suspension: [[1.4,0.1,0.95],[1.4,0.1,-0.95],[-1.2,0.1,0.95],[-1.2,0.1,-0.95]],
    exhaust: [[-1.6,0.15,0]],
    cooling: [[1.2,0.25,0]],
    tires: [[1.4,-0.15,0.95],[1.4,-0.15,-0.95],[-1.2,-0.15,0.95],[-1.2,-0.15,-0.95]],
  }),[])

  const alertSet = useMemo(()=> new Set(alerts.map(a=>a.componentId)), [alerts])
  const pulseFor = (status) => status==='critical'?'fast':status==='warning'?'slow':status==='maintenance'?null:null

  return (
    <group>
      {components.filter(c=>alertSet.has(c.id)).map(c => (positions[c.id]||[]).map((p,i)=> (
        <Marker key={c.id+i} position={p} color={STATUS[c.status].color} pulse={pulseFor(c.status)} onClick={()=>setSelected(c.id)} />
      )))}
    </group>
  )
}
