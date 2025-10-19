import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useHealthStore } from '../../stores/healthStore.js'
import { STATUS } from '../../utils/health.js'

const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb'

export default function VehicleModel(props){
  const { scene } = useGLTF(MODEL_URL)
  const components = useHealthStore(s=>s.components)

  useEffect(()=>{
    scene.traverse(obj=>{
      if (obj.isMesh && obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
        materials.forEach(m => {
          if ('wireframe' in m) m.wireframe = true
          if ('color' in m) m.color?.set?.('#9aa1a8')
          if ('emissiveIntensity' in m) m.emissiveIntensity = 0.0
          m.needsUpdate = true
        })
      }
    })
  },[scene])

  return <primitive object={scene} {...props} />
}

useGLTF.preload(MODEL_URL)
