'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearch } from '@/hooks/useSearch'
import { useLanguage } from '@/contexts/LanguageContext'
import { SearchProgress } from './SearchProgress'
import { cn } from '@/lib/utils'
import { INDUSTRIES } from '@/lib/constants'

export function SearchForm() {
  const { t } = useLanguage()
  const { state, submit, reset } = useSearch()
  const [form, setForm] = useState({
    industry: '',
    location: '',
    serviceSold: '',
    icpDescription: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.industry.trim()) e.industry = 'Please specify an industry'
    if (!form.location.trim()) e.location = 'Please specify a location'
    if (form.serviceSold.trim().length < 10) e.serviceSold = 'Please describe your service in more detail'
    if (form.icpDescription.trim().length < 20) e.icpDescription = 'Please describe your ideal customer in more detail'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    submit({
      industry: form.industry.trim(),
      location: form.location.trim(),
      serviceSold: form.serviceSold.trim(),
      icpDescription: form.icpDescription.trim(),
    })
  }

  const isLoading = state.status === 'loading'
  const isError = state.status === 'error'

  return (
    <>
      {isLoading && (
        <SearchProgress
          visible
          step={state.step}
          label={state.label}
          progress={state.progress}
        />
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-white/10 bg-mid/80 backdrop-blur-sm p-6 space-y-4 shadow-card"
      >
        <p className="text-cream/60 text-xs font-sans uppercase tracking-widest">
          {t.form.title}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Industry */}
          <Field
            label={t.form.industryLabel}
            error={errors.industry}
          >
            <input
              list="industries"
              value={form.industry}
              onChange={(e) => {
                setForm((f) => ({ ...f, industry: e.target.value }))
                if (errors.industry) setErrors((er) => ({ ...er, industry: '' }))
              }}
              placeholder={t.form.industryPlaceholder}
              className={inputClass(!!errors.industry)}
            />
            <datalist id="industries">
              {INDUSTRIES.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </Field>

          {/* Location */}
          <Field label={t.form.locationLabel} error={errors.location}>
            <input
              value={form.location}
              onChange={(e) => {
                setForm((f) => ({ ...f, location: e.target.value }))
                if (errors.location) setErrors((er) => ({ ...er, location: '' }))
              }}
              placeholder={t.form.locationPlaceholder}
              className={inputClass(!!errors.location)}
            />
          </Field>
        </div>

        {/* Service sold */}
        <Field
          label={t.form.serviceLabel}
          hint={t.form.serviceHint}
          error={errors.serviceSold}
        >
          <textarea
            rows={2}
            value={form.serviceSold}
            onChange={(e) => {
              setForm((f) => ({ ...f, serviceSold: e.target.value }))
              if (errors.serviceSold) setErrors((er) => ({ ...er, serviceSold: '' }))
            }}
            placeholder={t.form.servicePlaceholder}
            className={cn(inputClass(!!errors.serviceSold), 'resize-none')}
          />
        </Field>

        {/* ICP */}
        <Field
          label={t.form.icpLabel}
          hint={t.form.icpHint}
          error={errors.icpDescription}
        >
          <textarea
            rows={3}
            value={form.icpDescription}
            onChange={(e) => {
              setForm((f) => ({ ...f, icpDescription: e.target.value }))
              if (errors.icpDescription) setErrors((er) => ({ ...er, icpDescription: '' }))
            }}
            placeholder={t.form.icpPlaceholder}
            className={cn(inputClass(!!errors.icpDescription), 'resize-none')}
          />
        </Field>

        {isError && (
          <div className="rounded-xl bg-orange/10 border border-orange/20 px-4 py-3 text-sm text-orange font-sans flex items-start gap-2">
            <span>⚠</span>
            <div>
              <p>{state.message}</p>
              {state.code === 'AI_FAILED' && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-1 text-xs underline opacity-70 hover:opacity-100"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full py-3.5 rounded-xl font-display font-bold text-base tracking-tight',
            'bg-orange text-white transition-all duration-200',
            'hover:bg-orange/90 hover:shadow-glow-orange',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'flex items-center justify-center gap-2'
          )}
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              {t.form.submitting}
            </>
          ) : (
            <>
              {t.form.submit}
              <ArrowIcon />
            </>
          )}
        </button>
      </motion.form>
    </>
  )
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-sans font-medium text-cream/60 uppercase tracking-widest">
          {label}
        </label>
        {hint && !error && (
          <span className="text-[10px] text-cream/30 font-sans italic">{hint}</span>
        )}
        {error && (
          <span className="text-[10px] text-orange font-sans">{error}</span>
        )}
      </div>
      {children}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full rounded-xl bg-navy/80 border px-4 py-2.5 text-sm font-sans text-cream',
    'placeholder:text-cream/25',
    'focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange/40',
    'transition-colors duration-200',
    hasError ? 'border-orange/50' : 'border-white/10 hover:border-white/20'
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
    </svg>
  )
}

export default SearchForm
