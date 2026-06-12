'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PROSPECT_STEPS } from '@/lib/constants'
import type { SearchStep } from '@/hooks/useSearch'

interface SearchProgressProps {
  visible: boolean
  step: SearchStep
  label: string
  progress: number
}

const stepNumbers = [1, 2, 3, 4] as const

export function SearchProgress({ visible, step, label, progress }: SearchProgressProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'rgba(13, 21, 38, 0.97)' }}
        >
          {/* Scan lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent animate-scanLine"
              style={{ top: '30%' }}
            />
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/15 to-transparent animate-scanLine"
              style={{ top: '60%', animationDelay: '1.5s' }}
            />
          </div>

          {/* Grid texture */}
          <div className="absolute inset-0 grid-theme opacity-50 pointer-events-none" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-10 px-8 max-w-sm w-full">
            {/* Animated S-mark */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
                  <rect width="80" height="80" rx="20" fill="#182036" />
                  <path
                    d="M22 30C22 25.6 25.6 22 30 22H50C54.4 22 58 25.6 58 30C58 34.4 54.4 38 50 38H30C25.6 38 22 41.6 22 46C22 50.4 25.6 54 30 54H50C54.4 54 58 50.4 58 46"
                    stroke="white"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  <circle cx="22" cy="30" r="5" fill="#FF5C2E">
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="58" cy="46" r="5" fill="#00C9A7">
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.3"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </motion.div>
              {/* Pulse ring */}
              <div className="absolute inset-0 -m-4 rounded-3xl border border-orange/20 animate-pulseRing" />
            </div>

            {/* Step label */}
            <div className="text-center space-y-2">
              <motion.p
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cream font-display font-bold text-xl"
              >
                {label}
              </motion.p>
              <p className="text-cream/40 text-sm font-sans">
                This takes 60–90 seconds. We're being thorough.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-3">
              <div className="relative h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange to-teal rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>

              {/* Step indicators */}
              <div className="flex items-center justify-between">
                {stepNumbers.map((n) => {
                  const done = n < step
                  const active = n === step
                  return (
                    <div key={n} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
                          done
                            ? 'bg-teal'
                            : active
                            ? 'bg-orange border-2 border-orange/30'
                            : 'bg-white/10'
                        }`}
                      >
                        {done ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span className={`text-[9px] font-bold ${active ? 'text-white' : 'text-white/30'}`}>
                            {n}
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-sans text-center max-w-[60px] leading-tight ${active ? 'text-cream/70' : done ? 'text-teal/70' : 'text-cream/25'}`}>
                        {PROSPECT_STEPS[n].label.replace('…', '')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchProgress
