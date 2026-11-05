import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: ReactNode }) {
  return <TabsPrimitive.Root value={value} onValueChange={onValueChange} className="tabs-root">{children}</TabsPrimitive.Root>
}
export const TabsList = ({ children }: { children: ReactNode }) => <TabsPrimitive.List className="tabs-list">{children}</TabsPrimitive.List>
export const TabsTrigger = ({ value, children }: { value: string; children: ReactNode }) => <TabsPrimitive.Trigger className="tabs-trigger" value={value}>{children}</TabsPrimitive.Trigger>
export const TabsContent = ({ value, children }: { value: string; children: ReactNode }) => <TabsPrimitive.Content className="tabs-content" value={value}>{children}</TabsPrimitive.Content>
