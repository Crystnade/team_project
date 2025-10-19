import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useHealthStore } from '../../stores/healthStore.js'
import { STATUS } from '../../utils/health.js'

const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb'

export default function VehicleModel(props){
  const { scene } = useGLTF(MODEL_URL)
  const components = useHealthStore(s=>s.components)

  useEffect(()=>{
    const bySeverity = new Map(components.map(c=>[c.id, STATUS[c.status].color]))
    scene.traverse(obj=>{
      if (obj.isMesh && obj.material) {
        obj.material.emissive = obj.material.emissive || { r:0,g:0,b:0, set(){}}
        obj.material.emissive.set?.('#000000')
        obj.material.emissiveIntensity = 0.2
        obj.material.needsUpdate = true
      }
    })
  },[scene, components])

  return <primitive object={scene} {...props} />
}

useGLTF.preload(MODEL_URL)
