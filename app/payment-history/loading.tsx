import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentHistoryLoading() {
  return (
    <div className="container py-10">
      {/* Header skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Summary Card skeleton */}
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-40" />
                </div>
              </div>
              <Skeleton className="h-9 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs skeleton */}
      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscriptions" disabled>
            Subscription Payments
          </TabsTrigger>
          <TabsTrigger value="credits" disabled>
            Mentoring Credit Purchases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-72" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-5 w-48 mb-1" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-64 ml-10 mt-1" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
