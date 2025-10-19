import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirm) return
    navigate('/dashboard')
  }

  return (
    <div className="page-center">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join to monitor your vehicle</p>
        <form onSubmit={onSubmit} className="form-row" style={{gap:12}}>
          <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Confirm password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
          <button className="button-primary" type="submit">Create account</button>
        </form>
        <div style={{marginTop:12}}>
          <Link to="/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}
