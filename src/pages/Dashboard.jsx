import { useEffect } from 'react'
import VehicleScene from '../components/Vehicle3D/VehicleScene.jsx'
import { useHealthStore } from '../stores/healthStore.js'
import { STATUS } from '../utils/health.js'

export default function Dashboard(){
  const { vehicle, components, alerts, theme, toggleTheme, model, setModel, loadInitial, scheduleService, acknowledgeAlert } = useHealthStore()
  useEffect(()=>{ loadInitial() },[])
  const score = Math.max(0, 100 - alerts.filter(a=>a.severity!=='info').length*15)

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="topbar">
          <div>
            <div style={{fontSize:12,color:'#666'}}>Overall health</div>
            <div className="health-score">{score}</div>
          </div>
          <span className="badge badge-blue">{alerts.length} alerts</span>
        </div>
        <div style={{display:'grid',gap:8}}>
          <div><strong>Vehicle</strong><div style={{color:'#555'}}>{vehicle.make} {vehicle.model} • {vehicle.year}</div></div>
          <div><strong>Last service</strong><div style={{color:'#555'}}>{vehicle.lastService}</div></div>
          <div><strong>Next service</strong><div style={{color:'#555'}}>{vehicle.nextService}</div></div>
        </div>
        <div style={{marginTop:12}}>
          <strong>Components</strong>
          <div style={{display:'grid',gap:6,marginTop:6}}>
            {components.map(c=> (
              <div key={c.id} className="alert-card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>{c.name}</div>
                <span className={`badge ${STATUS[c.status].badge}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="canvas-panel">
        <div className="topbar" style={{gap:8}}>
          <strong>Interactive 3D Vehicle</strong>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <label style={{fontSize:12,color:'var(--muted-text)'}}>Model</label>
            <select className="input-field" style={{width:160}} value={model} onChange={(e)=>setModel(e.target.value)}>
              <option value="f1">F1 (wireframe)</option>
              <option value="car">Car (wireframe)</option>
              <option value="buggy">GLTF Buggy</option>
            </select>
            <button className="button-secondary" onClick={toggleTheme}>{theme==='dark'?'Light mode':'Dark mode'}</button>
          </div>
        </div>
        <div style={{position:'absolute', inset: '44px 8px 8px 8px'}}>
          <VehicleScene />
        </div>
      </main>

      <aside className="sidebar">
        <div className="topbar"><strong>Alerts</strong></div>
        <div className="alert-list">
          {alerts.filter(a=>!a.acknowledged).map(a=> (
            <div key={a.id} className="alert-card">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <strong>{a.title}</strong>
                <span className={`badge ${a.severity==='critical'?'badge-red':a.severity==='warning'?'badge-yellow':'badge-blue'}`}>{a.severity}</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="button-primary" disabled={a.scheduled} onClick={()=>scheduleService(a.id)}>{a.scheduled?'Scheduled':'Schedule service'}</button>
                <button className="button-secondary" onClick={()=>acknowledgeAlert(a.id)}>Acknowledge</button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
