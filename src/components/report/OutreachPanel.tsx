'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyButton } from '@/components/shared/CopyButton'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { fadeIn } from '@/lib/animations'
import type { OutreachPackage } from '@/lib/schemas/outreach'

interface OutreachPanelProps {
  outreach: OutreachPackage
}

type Tab = 'email' | 'linkedin' | 'followup' | 'call'

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'email', label: 'Cold Email', icon: <EmailIcon /> },
  { key: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon /> },
  { key: 'followup', label: 'Follow-Up', icon: <SequenceIcon /> },
  { key: 'call', label: 'Call Script', icon: <PhoneIcon /> },
]

export function OutreachPanel({ outreach }: OutreachPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('email')

  return (
    <div className="space-y-6">
      <SectionLabel accent="orange" className="mb-6">
        Personalised Outreach
      </SectionLabel>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-medium transition-all duration-200 whitespace-nowrap flex-1 justify-center ${
              activeTab === tab.key
                ? 'bg-orange text-white shadow-sm'
                : 'text-cream/50 hover:text-cream hover:bg-white/6'
            }`}
          >
            <span className="flex-shrink-0">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={fadeIn}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {activeTab === 'email' && <EmailTab email={outreach.email} />}
          {activeTab === 'linkedin' && <LinkedInTab linkedin={outreach.linkedin} />}
          {activeTab === 'followup' && <FollowUpTab sequence={outreach.followUpSequence} />}
          {activeTab === 'call' && <CallScriptTab script={outreach.callScript} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function EmailTab({ email }: { email: OutreachPackage['email'] }) {
  return (
    <div className="space-y-3">
      <MessageBlock
        label="Subject line"
        content={email.subject}
        copyLabel="Copy subject"
        mono
      />
      <MessageBlock
        label="Email body"
        content={email.body}
        copyLabel="Copy email"
      />
    </div>
  )
}

function LinkedInTab({ linkedin }: { linkedin: OutreachPackage['linkedin'] }) {
  return (
    <div className="space-y-3">
      <MessageBlock
        label="Connection request note"
        content={linkedin.connectionRequest}
        copyLabel="Copy note"
        hint={`${linkedin.connectionRequest.length}/280 characters`}
        mono
      />
      <MessageBlock
        label="Follow-up after connecting"
        content={linkedin.followUpMessage}
        copyLabel="Copy message"
      />
    </div>
  )
}

function FollowUpTab({
  sequence,
}: {
  sequence: OutreachPackage['followUpSequence']
}) {
  return (
    <div className="space-y-3">
      {sequence.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/8 bg-mid/40 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/8">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-cream/60">
                {i + 1}
              </span>
              <span className="text-xs font-sans text-cream/50">
                Day {item.dayOffset} · {item.channel === 'email' ? '📧 Email' : '💼 LinkedIn'}
              </span>
            </div>
            <CopyButton text={[item.subject, item.body].filter(Boolean).join('\n\n')} label="Copy" />
          </div>
          <div className="px-4 py-3 space-y-2">
            {item.subject && (
              <p className="text-xs font-sans text-cream/40 font-mono">
                Subject: {item.subject}
              </p>
            )}
            <p className="text-sm font-sans text-cream/70 leading-relaxed whitespace-pre-line">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CallScriptTab({ script }: { script: OutreachPackage['callScript'] }) {
  return (
    <div className="space-y-3">
      <ScriptSection label="Opener" content={script.opener} />
      <ScriptSection label="30-second value pitch" content={script.valueStatement} />

      <div className="rounded-xl border border-white/8 bg-mid/40 p-4 space-y-3">
        <p className="text-xs font-sans text-cream/40 uppercase tracking-widest">
          Discovery Questions
        </p>
        <ul className="space-y-2">
          {script.discoveryQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-sans text-cream/70">
              <span className="text-teal font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
              {q}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-white/8 bg-mid/40 p-4 space-y-3">
        <p className="text-xs font-sans text-cream/40 uppercase tracking-widest">
          Objection Handles
        </p>
        <div className="space-y-3">
          {script.objectionHandles.map((o, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs text-orange/70 font-sans italic">"{o.objection}"</p>
              <p className="text-sm text-cream/70 font-sans leading-relaxed pl-3 border-l border-orange/20">
                {o.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ScriptSection label="Close statement" content={script.closeStatement} />
    </div>
  )
}

function ScriptSection({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-mid/40 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-sans text-cream/40 uppercase tracking-widest">{label}</p>
        <CopyButton text={content} label="Copy" />
      </div>
      <p className="text-sm font-sans text-cream/70 leading-relaxed">{content}</p>
    </div>
  )
}

function MessageBlock({
  label,
  content,
  copyLabel,
  hint,
  mono,
}: {
  label: string
  content: string
  copyLabel: string
  hint?: string
  mono?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-mid/40 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/8">
        <div>
          <span className="text-xs font-sans text-cream/40 uppercase tracking-widest">
            {label}
          </span>
          {hint && (
            <span className="ml-3 text-[10px] text-cream/25 font-sans">{hint}</span>
          )}
        </div>
        <CopyButton text={content} label={copyLabel} />
      </div>
      <div className="px-4 py-4">
        <p
          className={`text-sm leading-relaxed whitespace-pre-line ${mono ? 'font-mono text-cream/80' : 'font-sans text-cream/70'}`}
        >
          {content}
        </p>
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function SequenceIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.0 .18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  )
}

export default OutreachPanel
