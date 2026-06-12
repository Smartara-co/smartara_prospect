'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface GradientButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'ghost' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses = {
  primary:
    'bg-orange text-white hover:bg-orange/90 focus-visible:ring-orange/50 shadow-glow-orange/30',
  ghost:
    'bg-transparent border border-white/15 text-cream/80 hover:text-cream hover:border-white/30 focus-visible:ring-white/20',
  teal:
    'bg-teal text-ink hover:bg-teal/90 focus-visible:ring-teal/50 shadow-glow-teal/30',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2',
}

export function GradientButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...(props as ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="31.4"
            strokeDashoffset="10"
          />
        </svg>
      )}
      {children}
    </motion.button>
  )
}

export default GradientButton
