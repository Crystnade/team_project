import { create } from 'zustand'
import { get, post } from '../utils/api.js'

const isBrowser = typeof window !== 'undefined'
const getInitialTheme = () => {
  if (!isBrowser) return 'light'
  return localStorage.getItem('theme') || 'light'
}
const getInitialModel = () => {
  if (!isBrowser) return 'f1'
  return localStorage.getItem('model') || 'f1'
}

export const useHealthStore = create((set, get) => ({
  // UI state
  theme: getInitialTheme(),
  model: getInitialModel(),
  // Domain state
  vehicle: { make: 'Loading', model: '...', year: 0, lastService: '—', nextService: '—' },
  components: [],
  alerts: [],
  selectedComponentId: null,

  // UI actions
  setSelected: (id) => set({ selectedComponentId: id }),
  setTheme: (theme) => {
    set({ theme })
    if (isBrowser) {
      localStorage.setItem('theme', theme)
      document.documentElement.dataset.theme = theme
    }
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },
  setModel: async (model) => {
    set({ model })
    try { await post('/models/select', { model }) } catch {}
    if (isBrowser) localStorage.setItem('model', model)
  },

  // Server actions
  loadInitial: async () => {
    try {
      const data = await get('/state')
      set({
        vehicle: data.vehicle,
        components: data.components,
        alerts: data.alerts,
        model: data.model || get().model,
      })
      if (isBrowser) {
        document.documentElement.dataset.theme = get().theme
      }
    } catch (e) {
      // keep defaults if backend not running
    }
  },
  acknowledgeAlert: async (id) => {
    try { await post(`/alerts/${id}/acknowledge`) } catch {}
    set({ alerts: get().alerts.map(a => a.id===id ? { ...a, acknowledged: true } : a) })
  },
  scheduleService: async (id) => {
    try {
      const res = await post(`/alerts/${id}/schedule`)
      if (res?.vehicle) set({ vehicle: res.vehicle })
    } catch {}
    set({ alerts: get().alerts.map(a => a.id===id ? { ...a, scheduled: true } : a) })
  },
  setStatus: (id, status) => set({ components: get().components.map(c => c.id===id?{...c,status}:c) }),
}))
