import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="page-center">
      <div className="auth-card">
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Access your vehicle dashboard</p>
        <form onSubmit={onSubmit} className="form-row" style={{gap:12}}>
          <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember me
          </label>
          <button className="button-primary" type="submit">Sign in</button>
        </form>
        <div className="auth-actions" style={{marginTop:12}}>
          <button className="button-secondary" onClick={()=>navigate('/dashboard')}>Sign in with Google</button>
          <button className="button-secondary" onClick={()=>navigate('/dashboard')}>Sign in with Apple</button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
          <Link to="/register">Create account</Link>
          <Link to="/forgot">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
