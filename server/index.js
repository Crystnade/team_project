import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// In-memory demo data
let state = {
  model: 'f1',
  vehicle: { make: 'Demo Motors', model: 'Formula 1', year: 2021, lastService: '2025-09-10', nextService: '2025-12-10' },
  components: [
    { id: 'engine', name: 'Engine system', status: 'healthy' },
    { id: 'battery', name: 'Battery/Electrical', status: 'warning' },
    { id: 'brakes', name: 'Brakes', status: 'critical' },
    { id: 'transmission', name: 'Transmission', status: 'healthy' },
    { id: 'suspension', name: 'Suspension', status: 'maintenance' },
    { id: 'exhaust', name: 'Exhaust', status: 'healthy' },
    { id: 'cooling', name: 'Cooling', status: 'healthy' },
    { id: 'tires', name: 'Tires', status: 'healthy' },
  ],
  alerts: [
    { id: 'a1', severity: 'critical', title: 'Brake pads critically worn', componentId: 'brakes', acknowledged: false, scheduled: false },
    { id: 'a2', severity: 'warning', title: 'Battery health decreasing', componentId: 'battery', acknowledged: false, scheduled: false },
    { id: 'a3', severity: 'info', title: 'Suspension service due soon', componentId: 'suspension', acknowledged: false, scheduled: false },
  ],
}

const users = new Map() // email -> { email, password }

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/state', (_req, res) => {
  res.json(state)
})

app.get('/api/models', (_req, res) => {
  res.json({
    models: [
      { id: 'f1', name: 'F1 (wireframe)' },
      { id: 'car', name: 'Car (wireframe)' },
      { id: 'buggy', name: 'GLTF Buggy' },
    ],
    selected: state.model,
  })
})

app.post('/api/models/select', (req, res) => {
  const { model } = req.body || {}
  const valid = new Set(['f1', 'car', 'buggy'])
  if (!valid.has(model)) return res.status(400).json({ error: 'Invalid model' })
  state.model = model
  res.json({ model })
})

app.post('/api/alerts/:id/acknowledge', (req, res) => {
  const { id } = req.params
  const alert = state.alerts.find(a => a.id === id)
  if (!alert) return res.status(404).json({ error: 'Not found' })
  alert.acknowledged = true
  res.json({ ok: true, alerts: state.alerts })
})

app.post('/api/alerts/:id/schedule', (req, res) => {
  const { id } = req.params
  const alert = state.alerts.find(a => a.id === id)
  if (!alert) return res.status(404).json({ error: 'Not found' })
  alert.scheduled = true
  // naive: push next service date a bit forward
  try {
    const next = new Date(state.vehicle.nextService)
    next.setDate(next.getDate() + 14)
    state.vehicle.nextService = next.toISOString().slice(0,10)
  } catch {
    state.vehicle.nextService = '2025-12-20'
  }
  res.json({ ok: true, vehicle: state.vehicle })
})

app.post('/api/components/:id/status', (req, res) => {
  const { id } = req.params
  const { status } = req.body || {}
  const c = state.components.find(c => c.id === id)
  if (!c) return res.status(404).json({ error: 'Not found' })
  if (!['healthy','warning','critical','maintenance'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  c.status = status
  res.json({ ok: true, components: state.components })
})

// Auth (demo only)
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  if (users.has(email)) return res.status(400).json({ error: 'User exists' })
  users.set(email, { email, password })
  res.json({ ok: true })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const user = users.get(email)
  if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' })
  res.json({ ok: true, user: { email } })
})

app.post('/api/auth/forgot', (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Missing email' })
  // Pretend to send an email
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`)
})
