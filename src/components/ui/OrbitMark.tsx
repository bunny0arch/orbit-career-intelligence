export function OrbitMark({ compact = false }: { compact?: boolean }) {
  return <span className={`orbit-mark ${compact ? 'orbit-mark--compact' : ''}`} aria-hidden="true"><span /></span>
}
