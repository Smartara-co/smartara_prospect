import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return uuidv4().replace(/-/g, '').slice(0, 12)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

export function getScoreColor(score: number): 'teal' | 'orange' | 'gray' {
  if (score >= 7.5) return 'teal'
  if (score >= 5) return 'orange'
  return 'gray'
}

export function getScoreLabel(score: number): string {
  if (score >= 8) return 'Excellent'
  if (score >= 7) return 'Strong'
  if (score >= 5) return 'Good'
  if (score >= 3) return 'Moderate'
  return 'Low'
}
