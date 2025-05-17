import { Skeleton } from "@/components/ui/skeleton"

export default function EditCertificationLoading() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[300px] mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-10 w-full" />

          <div className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-5 w-[300px]" />
            <Skeleton className="h-48 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="border rounded-lg p-6 space-y-6">
            <Skeleton className="h-8 w-[100px]" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-[180px]" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>

            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
