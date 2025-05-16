import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionLoading() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <Skeleton className="h-12 w-full mb-6" />
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
