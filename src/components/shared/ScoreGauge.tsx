'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { getScoreColor } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
  animate?: boolean
}

const sizeMap = {
  sm: { r: 22, stroke: 4, dim: 56, fontSize: 13 },
  md: { r: 32, stroke: 5, dim: 80, fontSize: 18 },
  lg: { r: 44, stroke: 6, dim: 104, fontSize: 24 },
}

const colorMap = {
  teal: '#00C9A7',
  orange: '#FF5C2E',
  gray: 'rgba(255,255,255,0.25)',
}

export function ScoreGauge({
  score,
  size = 'md',
  label,
  className,
  animate = true,
}: ScoreGaugeProps) {
  const { r, stroke, dim, fontSize } = sizeMap[size]
  const circumference = 2 * Math.PI * r
  const color = colorMap[getScoreColor(score)]
  const fillRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!fillRef.current) return
    const offset = circumference - (score / 10) * circumference

    if (animate) {
      fillRef.current.style.strokeDashoffset = String(circumference)
      requestAnimationFrame(() => {
        if (fillRef.current) {
          fillRef.current.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)'
          fillRef.current.style.strokeDashoffset = String(offset)
        }
      })
    } else {
      fillRef.current.style.strokeDashoffset = String(offset)
    }
  }, [score, circumference, animate])

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-label={`Score: ${score}`}>
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          ref={fillRef}
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="700"
          fill={color}
          fontFamily="var(--font-bricolage)"
        >
          {score.toFixed(1)}
        </text>
      </svg>
      {label && (
        <span className="text-xs text-cream/50 uppercase tracking-widest font-sans">
          {label}
        </span>
      )}
    </div>
  )
}

export default ScoreGauge
