'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { ProspectReport } from '@/lib/schemas/prospect'

interface ResearchReportProps {
  report: ProspectReport
}

export function ResearchReport({ report }: ResearchReportProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel accent="teal" className="mb-6">
          Intelligence Brief
        </SectionLabel>
      </motion.div>

      {/* Executive Summary */}
      <ReportSection title="Executive Summary" accent="orange">
        <p className="text-cream/70 font-sans text-sm leading-relaxed">
          {report.executiveSummary}
        </p>
      </ReportSection>

      {/* Company Background */}
      <ReportSection title="Company Background">
        <p className="text-cream/70 font-sans text-sm leading-relaxed">
          {report.companyBackground}
        </p>
      </ReportSection>

      {/* Current Challenges */}
      <ReportSection title="Current Challenges">
        <ul className="space-y-2">
          {report.currentChallenges.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-sans text-cream/70">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange flex-shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </ReportSection>

      {/* Why Now */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl bg-teal/8 border border-teal/15 p-5 flex items-start gap-4"
      >
        <span className="text-teal mt-0.5 flex-shrink-0">
          <ClockIcon />
        </span>
        <div>
          <p className="text-xs text-teal font-sans uppercase tracking-widest mb-1.5">
            Why Now
          </p>
          <p className="text-sm text-cream/80 font-sans leading-relaxed">
            {report.whyNow}
          </p>
        </div>
      </motion.div>

      {/* Competitive Context */}
      <ReportSection title="Competitive Context">
        <p className="text-cream/70 font-sans text-sm leading-relaxed">
          {report.competitiveContext}
        </p>
      </ReportSection>

      {/* How You Can Help */}
      <ReportSection title="How You Can Help" accent="teal">
        <p className="text-cream/70 font-sans text-sm leading-relaxed">
          {report.howServiceHelps}
        </p>
      </ReportSection>

      {/* Key Stakeholders */}
      {report.keyStakeholders.length > 0 && (
        <ReportSection title="Key Stakeholders">
          <div className="grid gap-3 sm:grid-cols-2">
            {report.keyStakeholders.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/4 border border-white/8 p-4 space-y-2"
              >
                <p className="text-sm font-display font-bold text-cream">{s.title}</p>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-[10px] text-cream/30 font-sans uppercase tracking-widest">
                      Their concern
                    </span>
                    <p className="text-xs text-cream/60 font-sans mt-0.5">{s.concern}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-orange/60 font-sans uppercase tracking-widest">
                      Messaging angle
                    </span>
                    <p className="text-xs text-cream/70 font-sans mt-0.5">{s.messagingAngle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>
      )}

      {/* Risk Flags */}
      {report.riskFlags.length > 0 && (
        <ReportSection title="Risk Flags">
          <ul className="space-y-2">
            {report.riskFlags.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-sans text-cream/60">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cream/30 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </ReportSection>
      )}
    </motion.div>
  )
}

function ReportSection({
  title,
  children,
  accent,
}: {
  title: string
  children: React.ReactNode
  accent?: 'orange' | 'teal'
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl border border-white/8 bg-mid/40 p-5 space-y-3"
    >
      <h3
        className={`text-sm font-display font-bold ${accent === 'orange' ? 'text-orange' : accent === 'teal' ? 'text-teal' : 'text-cream'}`}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default ResearchReport
