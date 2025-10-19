import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    alert('Password reset link sent if the email exists.')
  }
  return (
    <div className="page-center">
      <div className="auth-card">
        <h1 className="auth-title">Reset password</h1>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
        <form onSubmit={onSubmit} className="form-row" style={{gap:12}}>
          <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <button className="button-primary" type="submit">Send reset link</button>
        </form>
        <div style={{marginTop:12}}>
          <Link to="/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}
