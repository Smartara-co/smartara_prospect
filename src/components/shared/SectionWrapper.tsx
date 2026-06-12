import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('w-full px-6 py-20 md:py-28', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export default SectionWrapper
