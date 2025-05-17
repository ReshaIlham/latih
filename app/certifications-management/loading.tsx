import { Skeleton } from "@/components/ui/skeleton"

export default function CertificationsManagementLoading() {
  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-[400px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="certification-card group relative bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full"
          >
            <Skeleton className="w-full h-48" />
            <div className="p-6 flex-grow flex flex-col">
              <Skeleton className="h-6 w-[80%] mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-[90%] mb-2" />

              <div className="grid grid-cols-3 gap-2 mt-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 border-t">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
