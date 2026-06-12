'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchInput } from '@/lib/schemas'
import { PROSPECT_STEPS } from '@/lib/constants'

export type SearchStep = 1 | 2 | 3 | 4

export type SearchState =
  | { status: 'idle' }
  | { status: 'loading'; step: SearchStep; label: string; progress: number }
  | { status: 'done'; searchId: string }
  | { status: 'error'; message: string; code?: string }

export function useSearch() {
  const router = useRouter()
  const [state, setState] = useState<SearchState>({ status: 'idle' })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  function advanceStep(step: SearchStep, overallProgress: number) {
    const stepInfo = PROSPECT_STEPS[step]
    setState({
      status: 'loading',
      step,
      label: stepInfo.label,
      progress: overallProgress,
    })
  }

  async function submit(input: SearchInput) {
    // Cancel any previous request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setState({ status: 'loading', step: 1, label: PROSPECT_STEPS[1].label, progress: 5 })

    // Simulated step progression
    let elapsed = 0
    const totalDuration = Object.values(PROSPECT_STEPS).reduce(
      (acc, s) => acc + s.duration,
      0
    )
    const thresholds = [
      { step: 2 as SearchStep, at: PROSPECT_STEPS[1].duration },
      { step: 3 as SearchStep, at: PROSPECT_STEPS[1].duration + PROSPECT_STEPS[2].duration },
      { step: 4 as SearchStep, at: PROSPECT_STEPS[1].duration + PROSPECT_STEPS[2].duration + PROSPECT_STEPS[3].duration },
    ]

    const interval = setInterval(() => {
      elapsed += 500
      const progress = Math.min(90, (elapsed / totalDuration) * 100)

      const nextThreshold = thresholds.find((t) => elapsed >= t.at)
      if (nextThreshold) {
        const idx = thresholds.indexOf(nextThreshold)
        thresholds.splice(0, idx + 1) // remove passed thresholds
        advanceStep(nextThreshold.step, progress)
      } else {
        const currentState = state
        if (currentState.status === 'loading') {
          setState((prev) =>
            prev.status === 'loading' ? { ...prev, progress } : prev
          )
        }
      }
    }, 500)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: abortRef.current.signal,
      })

      clearInterval(interval)

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setState({
          status: 'error',
          message: data.error ?? 'Something went wrong. Please try again.',
          code: data.code,
        })
        return
      }

      const data = await res.json()
      setState({ status: 'loading', step: 4, label: 'Opening your results…', progress: 100 })
      router.push(`/search/${data.searchId}`)
    } catch (err) {
      clearInterval(interval)
      if (err instanceof DOMException && err.name === 'AbortError') return
      setState({
        status: 'error',
        message: 'Network error. Please check your connection.',
      })
    }
  }

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (abortRef.current) abortRef.current.abort()
    setState({ status: 'idle' })
  }

  return { state, submit, reset }
}
