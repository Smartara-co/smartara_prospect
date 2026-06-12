import fs from 'fs/promises'
import path from 'path'
import type { SearchResult, SearchMeta } from '@/lib/schemas'
import type { ProspectReport } from '@/lib/schemas/prospect'
import type { OutreachPackage } from '@/lib/schemas/outreach'

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'searches')
  : path.join(process.cwd(), 'data', 'searches')

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

function searchPath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`)
}

export async function saveSearch(search: SearchResult): Promise<void> {
  await ensureDir()
  await fs.writeFile(searchPath(search.id), JSON.stringify(search, null, 2), 'utf-8')
}

export async function getSearch(id: string): Promise<SearchResult | null> {
  try {
    const raw = await fs.readFile(searchPath(id), 'utf-8')
    return JSON.parse(raw) as SearchResult
  } catch {
    return null
  }
}

export async function patchProspectReport(
  searchId: string,
  prospectId: string,
  report: ProspectReport,
  outreach: OutreachPackage
): Promise<SearchResult | null> {
  const search = await getSearch(searchId)
  if (!search) return null

  const idx = search.prospects.findIndex((p) => p.id === prospectId)
  if (idx === -1) return null

  search.prospects[idx] = {
    ...search.prospects[idx],
    report,
    outreach,
  }

  await saveSearch(search)
  return search
}

export async function listSearches(): Promise<SearchMeta[]> {
  await ensureDir()
  try {
    const files = await fs.readdir(DATA_DIR)
    const metas: SearchMeta[] = []

    for (const file of files.filter((f) => f.endsWith('.json'))) {
      try {
        const raw = await fs.readFile(path.join(DATA_DIR, file), 'utf-8')
        const search = JSON.parse(raw) as SearchResult
        metas.push({
          id: search.id,
          createdAt: search.createdAt,
          industry: search.input.industry,
          location: search.input.location,
          prospectCount: search.prospects.length,
        })
      } catch {
        // skip corrupt files
      }
    }

    return metas.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch {
    return []
  }
}
