import VehicleScene from '../components/Vehicle3D/VehicleScene.jsx'
import { useHealthStore } from '../stores/healthStore.js'
import { STATUS } from '../utils/health.js'

export default function Dashboard(){
  const { vehicle, components, alerts } = useHealthStore()
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
        <div className="topbar"><strong>Interactive 3D Vehicle</strong></div>
        <div style={{position:'absolute', inset: '44px 8px 8px 8px'}}>
          <VehicleScene />
        </div>
      </main>

      <aside className="sidebar">
        <div className="topbar"><strong>Alerts</strong></div>
        <div className="alert-list">
          {alerts.map(a=> (
            <div key={a.id} className="alert-card">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <strong>{a.title}</strong>
                <span className={`badge ${a.severity==='critical'?'badge-red':a.severity==='warning'?'badge-yellow':'badge-blue'}`}>{a.severity}</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="button-primary">Schedule service</button>
                <button className="button-secondary">Acknowledge</button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
