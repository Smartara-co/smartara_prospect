import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  accent?: 'orange' | 'teal'
}

export function SectionLabel({
  children,
  className,
  accent = 'orange',
}: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'block h-px w-6',
          accent === 'orange' ? 'bg-orange' : 'bg-teal'
        )}
      />
      <span
        className={cn(
          'text-xs font-sans font-medium tracking-[0.18em] uppercase',
          accent === 'orange' ? 'text-orange' : 'text-teal'
        )}
      >
        {children}
      </span>
    </div>
  )
}

export default SectionLabel
