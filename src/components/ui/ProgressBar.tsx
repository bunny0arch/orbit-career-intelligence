import * as Progress from '@radix-ui/react-progress'

export function ProgressBar({ value, label, tone = 'lime' }: { value: number; label?: string; tone?: 'lime' | 'gold' | 'amber' }) {
  return (
    <div className="progress-wrap">
      {label && <div className="progress-label"><span>{label}</span><strong>{Math.round(value)}%</strong></div>}
      <Progress.Root className={`progress-root progress-${tone}`} value={value} aria-label={label || 'Progress'}>
        <Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
      </Progress.Root>
    </div>
  )
}
