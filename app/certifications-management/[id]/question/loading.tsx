import { Skeleton } from "@/components/ui/skeleton"

export default function ManageQuestionsLoading() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[300px] mt-6" />
        <Skeleton className="h-5 w-[200px] mt-2" />
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Skeleton className="h-10 w-full md:w-[300px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <div className="flex items-center border-b pb-4">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[15%] ml-4" />
            <Skeleton className="h-5 w-[15%] ml-4" />
            <Skeleton className="h-5 w-[15%] ml-4" />
            <div className="ml-auto">
              <Skeleton className="h-5 w-[80px]" />
            </div>
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center py-4 border-b last:border-0">
              <Skeleton className="h-5 w-[40%]" />
              <Skeleton className="h-5 w-[15%] ml-4" />
              <Skeleton className="h-5 w-[15%] ml-4" />
              <Skeleton className="h-5 w-[15%] ml-4" />
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-[200px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-[70px] rounded-md" />
          <Skeleton className="h-5 w-[60px]" />
        </div>
      </div>
    </div>
  )
}
