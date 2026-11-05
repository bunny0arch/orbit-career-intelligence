import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import './animated-list.css'

// Adapted from React Bits Animated List: https://reactbits.dev/components/animated-list
// The source is MIT + Commons Clause; Orbit uses the component for real activity records.
export interface AnimatedListItem {
  id: string
  icon: ReactNode
  title: string
  description: string
  meta?: string
}

export function AnimatedList({ items, onSelect }: { items: AnimatedListItem[]; onSelect?: (item: AnimatedListItem) => void }) {
  return (
    <div className="animated-list" role="list">
      {items.map((item, index) => (
        <motion.button
          className="animated-list__item"
          key={item.id}
          type="button"
          role="listitem"
          onClick={() => onSelect?.(item)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.28, ease: 'easeOut' }}
          whileHover={{ x: 3 }}
        >
          <span className="animated-list__lead">{item.icon}</span>
          <span className="animated-list__text">
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </span>
          {item.meta && <span className="animated-list__meta">{item.meta}</span>}
        </motion.button>
      ))}
    </div>
  )
}
