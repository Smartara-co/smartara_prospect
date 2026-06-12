import { Logo } from '@/components/shared/Logo'
import { Skeleton } from '@/components/shared/Skeleton'

export default function ProspectLoading() {
  return (
    <div className="min-h-screen bg-navy grid-theme">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <Logo size="sm" />
          <Skeleton className="h-5 w-28" />
        </div>
        <Skeleton className="h-48 w-full rounded-2xl mb-8" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
