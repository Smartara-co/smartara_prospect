'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
  className?: string
  variant?: 'default' | 'ghost'
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className,
  variant = 'default',
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        'relative inline-flex items-center gap-1.5 text-xs font-sans font-medium rounded-lg px-3 py-1.5',
        'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50',
        variant === 'default'
          ? 'bg-white/8 hover:bg-white/15 text-cream/70 hover:text-cream'
          : 'text-cream/50 hover:text-cream',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="text-teal flex items-center gap-1"
          >
            <CheckIcon />
            {copiedLabel}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex items-center gap-1"
          >
            <CopyIcon />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default CopyButton
