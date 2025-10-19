export const STATUS = {
  healthy: { color: '#00c853', badge: 'badge-green', weight: 0 },
  warning: { color: '#f9a825', badge: 'badge-yellow', weight: 1 },
  critical: { color: '#d50000', badge: 'badge-red', weight: 2 },
  maintenance: { color: '#1a73e8', badge: 'badge-blue', weight: 1 },
}

export function highestSeverity(components){
  return components.reduce((max,c)=> Math.max(max, STATUS[c.status]?.weight ?? 0), 0)
}
