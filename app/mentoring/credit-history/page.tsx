"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-provider"
import { ArrowLeft, Calendar, Clock, Coins } from "lucide-react"

export default function MentoringHistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("credits")

  // Mock data for credit history
  const creditHistory = [
    {
      id: "ch001",
      type: "purchase",
      amount: 3,
      date: "2023-05-10T14:30:00Z",
      paymentId: "PAY-123456",
      status: "completed",
    },
    {
      id: "ch003",
      type: "usage",
      amount: -1,
      date: "2023-05-12T10:00:00Z",
      sessionId: "MS-789012",
      mentorName: "John Smith",
      status: "completed",
    },
    {
      id: "ch004",
      type: "usage",
      amount: -1,
      date: "2023-04-20T15:30:00Z",
      sessionId: "MS-345678",
      mentorName: "Sarah Davis",
      status: "completed",
    },
  ]

  // Mock data for session history
  const sessionHistory = [
    {
      id: "MS-789012",
      date: "2023-05-12T10:00:00Z",
      duration: 30,
      mentorName: "John Smith",
      topic: "PSM I Certification Preparation",
      status: "completed",
      notes: "Focused on Scrum events and artifacts",
    },
    {
      id: "MS-345678",
      date: "2023-04-20T15:30:00Z",
      duration: 30,
      mentorName: "Sarah Davis",
      topic: "PMP Exam Strategy",
      status: "completed",
      notes: "Reviewed practice questions and time management techniques",
    },
    {
      id: "MS-901234",
      date: "2023-05-25T13:00:00Z",
      duration: 30,
      mentorName: "Michael Johnson",
      topic: "AWS Solutions Architect Certification",
      status: "scheduled",
    },
  ]

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/mentoring")} className="gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Mentoring History</h1>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Mentoring Credits</p>
                  <p className="text-2xl font-bold">3 Credits</p>
                </div>
              </div>
              <div>
                <Link href="/mentoring/buy-credits">
                  <Button className="gap-2">
                    <Coins className="h-4 w-4" />
                    Buy More Credits
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="credits" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credits">Credit History</TabsTrigger>
          <TabsTrigger value="sessions">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Transactions</CardTitle>
              <CardDescription>History of all your mentoring credit transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditHistory.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            transaction.type === "purchase" || transaction.type === "bonus"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {transaction.type === "purchase" || transaction.type === "bonus" ? (
                            <Coins className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "purchase"
                              ? "Credit Purchase"
                              : transaction.type === "bonus"
                                ? "Bonus Credits"
                                : "Session Credit Used"}
                          </p>
                          <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      {transaction.type === "purchase" && (
                        <p className="text-sm text-muted-foreground pl-10">Payment ID: {transaction.paymentId}</p>
                      )}
                      {transaction.type === "bonus" && (
                        <p className="text-sm text-muted-foreground pl-10">Source: {transaction.source}</p>
                      )}
                      {transaction.type === "usage" && (
                        <p className="text-sm text-muted-foreground pl-10">
                          Session with {transaction.mentorName} (ID: {transaction.sessionId})
                        </p>
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "purchase" || transaction.type === "bonus"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {transaction.type === "purchase" || transaction.type === "bonus" ? "+" : ""}
                        {transaction.amount} {Math.abs(transaction.amount) === 1 ? "Credit" : "Credits"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>History of all your mentoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionHistory.map((session) => (
                  <div key={session.id} className="p-4 border rounded-md space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            session.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)} ({session.duration} minutes)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            session.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {session.status === "completed" ? "Completed" : "Scheduled"}
                        </span>
                        {/* Join button removed */}
                      </div>
                    </div>
                    <div className="pl-10">
                      <p className="text-sm">
                        <span className="font-medium">Mentor:</span> {session.mentorName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Session ID:</span> {session.id}
                      </p>
                      {session.notes && (
                        <p className="text-sm">
                          <span className="font-medium">Notes:</span> {session.notes}
                        </p>
                      )}
                    </div>
                    {/* Session notes button removed */}
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
