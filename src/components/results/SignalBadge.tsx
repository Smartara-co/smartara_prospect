import { cn } from '@/lib/utils'
import { SIGNAL_TYPES } from '@/lib/constants'
import type { Signal } from '@/lib/schemas/signals'

interface SignalBadgeProps {
  signal: Signal
  className?: string
}

const colorMap = {
  teal: 'bg-teal/12 text-teal border-teal/20',
  orange: 'bg-orange/12 text-orange border-orange/20',
  'signal-blue': 'bg-signal-blue/12 text-signal-blue border-signal-blue/20',
}

export function SignalBadge({ signal, className }: SignalBadgeProps) {
  const type = SIGNAL_TYPES[signal.type]
  const color = colorMap[type.color] ?? colorMap.teal

  return (
    <span
      title={signal.detail}
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium font-sans border',
        'whitespace-nowrap',
        color,
        className
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full flex-shrink-0',
          type.color === 'teal'
            ? 'bg-teal'
            : type.color === 'orange'
            ? 'bg-orange'
            : 'bg-signal-blue'
        )}
      />
      {signal.label}
    </span>
  )
}

export default SignalBadge
