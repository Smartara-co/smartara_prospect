import { cn } from '@/lib/utils'
import { URGENCY_STYLES } from '@/lib/constants'

interface ImpactBadgeProps {
  urgency: 'High' | 'Medium' | 'Low'
  className?: string
}

export function ImpactBadge({ urgency, className }: ImpactBadgeProps) {
  const styles = URGENCY_STYLES[urgency]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-sans',
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
      {urgency}
    </span>
  )
}

export default ImpactBadge
