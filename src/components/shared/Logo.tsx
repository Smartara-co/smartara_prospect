import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  wordmark?: boolean
  className?: string
}

const sizes = {
  sm: { mark: 28, text: 'text-sm' },
  md: { mark: 36, text: 'text-base' },
  lg: { mark: 44, text: 'text-xl' },
}

export function Logo({ size = 'md', wordmark = true, className }: LogoProps) {
  const { mark, text } = sizes[size]

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden
      >
        <rect width="80" height="80" rx="20" fill="#182036" />
        <path
          d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
          stroke="white"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle cx="22" cy="30" r="5" fill="#FF5C2E" />
        <circle cx="58" cy="46" r="5" fill="#00C9A7" />
      </svg>
      {wordmark && (
        <span
          className={cn(
            'font-display font-extrabold tracking-tight text-cream',
            text
          )}
        >
          Smartara
          <span className="text-orange ml-1 text-xs font-sans font-medium tracking-widest uppercase opacity-70 align-middle">
            Prospect
          </span>
        </span>
      )}
    </div>
  )
}

export default Logo
