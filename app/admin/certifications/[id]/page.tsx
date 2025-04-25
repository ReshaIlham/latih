"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { BarChart3, FileQuestion, Users, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { BackButton } from "@/components/back-button"

// Mock certification data
const mockCertifications = {
  psm: {
    id: "psm",
    name: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "/placeholder.svg?height=200&width=360&text=Professional+Scrum+Master",
    questionCount: 120,
    userCount: 450,
    passRate: 68,
    lastUpdated: "2023-10-15T14:30:45",
    domains: [
      { name: "Roles", questionCount: 40, passRate: 72 },
      { name: "Artifacts", questionCount: 35, passRate: 65 },
      { name: "Events", questionCount: 45, passRate: 70 },
    ],
    testTypes: [
      { name: "Short", attempts: 320, avgScore: 75 },
      { name: "Medium", attempts: 180, avgScore: 68 },
      { name: "Full", attempts: 120, avgScore: 62 },
    ],
    recentActivity: [
      { date: "2023-10-15", testsCompleted: 12, avgScore: 72 },
      { date: "2023-10-14", testsCompleted: 15, avgScore: 68 },
      { date: "2023-10-13", testsCompleted: 10, avgScore: 75 },
      { date: "2023-10-12", testsCompleted: 8, avgScore: 70 },
      { date: "2023-10-11", testsCompleted: 14, avgScore: 65 },
      { date: "2023-10-10", testsCompleted: 11, avgScore: 73 },
      { date: "2023-10-09", testsCompleted: 9, avgScore: 69 },
    ],
    topQuestions: [
      {
        id: "q1",
        text: "What is the primary responsibility of a Scrum Master?",
        difficulty: "Medium",
        correctRate: 82,
      },
      { id: "q2", text: "Which of the following is NOT a Scrum artifact?", difficulty: "Easy", correctRate: 75 },
      {
        id: "q3",
        text: "How long should a Sprint Planning meeting last for a one-month Sprint?",
        difficulty: "Medium",
        correctRate: 68,
      },
      { id: "q4", text: "Who is responsible for ordering the Product Backlog?", difficulty: "Easy", correctRate: 90 },
      { id: "q5", text: "What happens during the Daily Scrum?", difficulty: "Medium", correctRate: 85 },
    ],
  },
  pspo: {
    id: "pspo",
    name: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "/placeholder.svg?height=200&width=360&text=Professional+Scrum+Product+Owner",
    questionCount: 95,
    userCount: 320,
    passRate: 72,
    lastUpdated: "2023-09-22T09:15:22",
    domains: [
      { name: "Roles", questionCount: 30, passRate: 75 },
      { name: "Artifacts", questionCount: 40, passRate: 70 },
      { name: "Events", questionCount: 25, passRate: 68 },
    ],
    testTypes: [
      { name: "Short", attempts: 250, avgScore: 78 },
      { name: "Medium", attempts: 150, avgScore: 72 },
      { name: "Full", attempts: 90, avgScore: 65 },
    ],
    recentActivity: [
      { date: "2023-10-15", testsCompleted: 8, avgScore: 75 },
      { date: "2023-10-14", testsCompleted: 12, avgScore: 70 },
      { date: "2023-10-13", testsCompleted: 9, avgScore: 78 },
      { date: "2023-10-12", testsCompleted: 7, avgScore: 72 },
      { date: "2023-10-11", testsCompleted: 10, avgScore: 68 },
      { date: "2023-10-10", testsCompleted: 8, avgScore: 76 },
      { date: "2023-10-09", testsCompleted: 6, avgScore: 71 },
    ],
    topQuestions: [
      {
        id: "q1",
        text: "What is the primary responsibility of a Product Owner?",
        difficulty: "Medium",
        correctRate: 85,
      },
      {
        id: "q2",
        text: "Who is responsible for maximizing the value of the product?",
        difficulty: "Easy",
        correctRate: 92,
      },
      {
        id: "q3",
        text: "How should a Product Owner manage the Product Backlog?",
        difficulty: "Medium",
        correctRate: 70,
      },
      {
        id: "q4",
        text: "What is the relationship between the Product Owner and stakeholders?",
        difficulty: "Hard",
        correctRate: 65,
      },
      {
        id: "q5",
        text: "How does the Product Owner collaborate with the Development Team?",
        difficulty: "Medium",
        correctRate: 78,
      },
    ],
  },
  psd: {
    id: "psd",
    name: "Professional Scrum Developer (PSD)",
    description: "Develop software using Scrum with modern engineering practices",
    image: "/placeholder.svg?height=200&width=360&text=Professional+Scrum+Developer",
    questionCount: 85,
    userCount: 210,
    passRate: 65,
    lastUpdated: "2023-08-10T11:45:30",
    domains: [
      { name: "Roles", questionCount: 25, passRate: 70 },
      { name: "Artifacts", questionCount: 30, passRate: 65 },
      { name: "Events", questionCount: 30, passRate: 62 },
    ],
    testTypes: [
      { name: "Short", attempts: 180, avgScore: 72 },
      { name: "Medium", attempts: 120, avgScore: 65 },
      { name: "Full", attempts: 70, avgScore: 60 },
    ],
    recentActivity: [
      { date: "2023-10-15", testsCompleted: 6, avgScore: 70 },
      { date: "2023-10-14", testsCompleted: 8, avgScore: 65 },
      { date: "2023-10-13", testsCompleted: 7, avgScore: 72 },
      { date: "2023-10-12", testsCompleted: 5, avgScore: 68 },
      { date: "2023-10-11", testsCompleted: 9, avgScore: 63 },
      { date: "2023-10-10", testsCompleted: 6, avgScore: 71 },
      { date: "2023-10-09", testsCompleted: 4, avgScore: 67 },
    ],
    topQuestions: [
      { id: "q1", text: "What is Continuous Integration?", difficulty: "Medium", correctRate: 75 },
      { id: "q2", text: "How does Test-Driven Development work?", difficulty: "Hard", correctRate: 60 },
      { id: "q3", text: "What is the Definition of Done?", difficulty: "Medium", correctRate: 82 },
      { id: "q4", text: "How should developers collaborate during a Sprint?", difficulty: "Medium", correctRate: 78 },
      { id: "q5", text: "What is technical debt and how should it be managed?", difficulty: "Hard", correctRate: 55 },
    ],
  },
}

export default function CertificationDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Verify admin access
  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
      toast({
        title: "Unauthorized",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
    }
  }, [isAdmin, router, toast])

  // Get certification data based on ID
  const certification = mockCertifications[params.id as keyof typeof mockCertifications]

  if (!certification) {
    return (
      <div className="container py-10">
        <div className="mb-8">
          <BackButton href="/admin/certifications" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Certification not found</h1>
          <p className="mt-4">The certification you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <BackButton href="/admin/certifications" />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{certification.name}</h1>
          <p className="text-muted-foreground mt-2">{certification.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-1 text-sm">
              <FileQuestion className="h-4 w-4 text-primary" />
              <span>{certification.questionCount} Questions</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>{certification.userCount} Users</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{certification.passRate}% Pass Rate</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last Updated: {formatDateTime(certification.lastUpdated)}</span>
            </div>
          </div>
        </div>
        <div className="relative h-48 md:h-auto overflow-hidden rounded-lg">
          <Image
            src={certification.image || "/placeholder.svg"}
            alt={certification.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="mr-2 h-4 w-4 text-primary" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{certification.userCount}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{Math.floor(certification.userCount * 0.05)}{" "}
                    this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileQuestion className="mr-2 h-4 w-4 text-primary" />
                    Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{certification.questionCount}</div>
                  <p className="text-xs text-muted-foreground">Across {certification.domains.length} domains</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                    Pass Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{certification.passRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    {certification.passRate >= 70 ? "Good performance" : "Needs improvement"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Test completions and scores over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certification.recentActivity.map((activity) => (
                    <div key={activity.date} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{new Date(activity.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{activity.testsCompleted} tests completed</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          <span
                            className={
                              activity.avgScore >= 80
                                ? "text-green-500"
                                : activity.avgScore >= 60
                                  ? "text-amber-500"
                                  : "text-red-500"
                            }
                          >
                            {activity.avgScore}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Type Performance</CardTitle>
                <CardDescription>User performance across different test types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certification.testTypes.map((type) => (
                    <div key={type.name} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{type.name} Tests</p>
                        <p className="text-sm text-muted-foreground">{type.attempts} attempts</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          <span
                            className={
                              type.avgScore >= 80
                                ? "text-green-500"
                                : type.avgScore >= 60
                                  ? "text-amber-500"
                                  : "text-red-500"
                            }
                          >
                            {type.avgScore}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Performance</CardTitle>
                <CardDescription>User performance across different knowledge domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {certification.domains.map((domain) => (
                    <div key={domain.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{domain.name}</h3>
                        <span className={domain.passRate >= 70 ? "text-green-600" : "text-amber-600"}>
                          {domain.passRate}% Pass Rate
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileQuestion className="h-4 w-4" />
                        <span>{domain.questionCount} questions</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className={`h-full ${domain.passRate >= 70 ? "bg-green-500" : "bg-amber-500"}`}
                          style={{ width: `${domain.passRate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Link href={`/admin/certifications/${certification.id}/domains`}>
                <Button>Manage Domains</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Questions</CardTitle>
                <CardDescription>Questions with highest and lowest success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certification.topQuestions.map((question) => (
                    <div key={question.id} className="space-y-2 pb-4 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{question.text}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">{question.difficulty}</span>
                          <span
                            className={`flex items-center gap-1 text-sm ${
                              question.correctRate >= 70 ? "text-green-600" : "text-amber-600"
                            }`}
                          >
                            {question.correctRate >= 70 ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {question.correctRate}% Correct
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Link href={`/admin/certifications/${certification.id}/questions`}>
                <Button>Manage Questions</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User activity and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Active Users</h3>
                      <p className="text-2xl font-bold">{Math.round(certification.userCount * 0.7)}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(((certification.userCount * 0.7) / certification.userCount) * 100)}% of total users
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Tests Per User</h3>
                      <p className="text-2xl font-bold">
                        {Math.round(
                          (certification.testTypes.reduce((sum, type) => sum + type.attempts, 0) /
                            certification.userCount) *
                            10,
                        ) / 10}
                      </p>
                      <p className="text-xs text-muted-foreground">Average tests taken</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Premium Users</h3>
                      <p className="text-2xl font-bold">{Math.round(certification.userCount * 0.4)}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(((certification.userCount * 0.4) / certification.userCount) * 100)}% of total users
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Completion Rate</h3>
                      <p className="text-2xl font-bold">{Math.round(certification.passRate * 0.9)}%</p>
                      <p className="text-xs text-muted-foreground">Tests completed vs. started</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Link href={`/admin/certifications/${certification.id}/users`}>
                <Button>View User Details</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
