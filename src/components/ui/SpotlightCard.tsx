import { useRef } from 'react'
import type { HTMLAttributes, PointerEvent } from 'react'
import { cn } from '../../lib/utils'

export function SpotlightCard({ className, onPointerMove, onPointerLeave, ...props }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const node = ref.current
    if (node) {
      const bounds = node.getBoundingClientRect()
      node.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`)
      node.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`)
    }
    onPointerMove?.(event)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    ref.current?.style.setProperty('--spotlight-x', '-200px')
    ref.current?.style.setProperty('--spotlight-y', '-200px')
    onPointerLeave?.(event)
  }

  return <section ref={ref} className={cn('spotlight-card', className)} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} {...props} />
}
