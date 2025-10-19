import create from 'zustand'

const initialComponents = [
  { id: 'engine', name: 'Engine system', status: 'healthy' },
  { id: 'battery', name: 'Battery/Electrical', status: 'warning' },
  { id: 'brakes', name: 'Brakes', status: 'critical' },
  { id: 'transmission', name: 'Transmission', status: 'healthy' },
  { id: 'suspension', name: 'Suspension', status: 'maintenance' },
  { id: 'exhaust', name: 'Exhaust', status: 'healthy' },
  { id: 'cooling', name: 'Cooling', status: 'healthy' },
  { id: 'tires', name: 'Tires', status: 'healthy' },
]

export const useHealthStore = create((set, get) => ({
  vehicle: { make: 'Demo Motors', model: 'Milk Truck', year: 2021, lastService: '2025-09-10', nextService: '2025-12-10' },
  components: initialComponents,
  alerts: [
    { id: 'a1', severity: 'critical', title: 'Brake pads critically worn', componentId: 'brakes' },
    { id: 'a2', severity: 'warning', title: 'Battery health decreasing', componentId: 'battery' },
    { id: 'a3', severity: 'info', title: 'Suspension service due soon', componentId: 'suspension' },
  ],
  setStatus: (id, status) => set({ components: get().components.map(c => c.id===id?{...c,status}:c) })
}))
