import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestResultsLoading() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="mx-auto max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-40" />
            </CardTitle>
            <Skeleton className="h-4 w-full mt-2" />
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-12" />
                        </div>
                        <Skeleton className="h-1.5 w-full" />
                        <Skeleton className="h-3 w-20 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Skeleton className="h-6 w-40 mb-4" />
            <div className="border rounded-md">
              <div className="p-4 border-b">
                <div className="grid grid-cols-6 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full col-span-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 border-b">
                  <div className="grid grid-cols-6 gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-full col-span-2" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
