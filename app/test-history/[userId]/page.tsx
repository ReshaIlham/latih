"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { useAuth } from "@/lib/auth-provider"
import {
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  BookOpen,
  Info,
  Search,
  Filter,
  Play,
  Clock,
  Trophy,
  TrendingUp,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock test history data
const mockTestHistory = [
  {
    id: "test-1",
    certificationId: "cert1",
    certificationName: "Professional Scrum Master (PSM)",
    testType: "medium",
    date: new Date("2023-10-15T14:30:00"),
    score: 85,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 90, correct: 9, total: 10 },
      { domain: "event", score: 80, correct: 8, total: 10 },
      { domain: "artifact", score: 70, correct: 7, total: 10 },
    ],
  },
  {
    id: "test-2",
    certificationId: "cert2",
    certificationName: "Professional Scrum Product Owner (PSPO)",
    testType: "short",
    date: new Date("2023-10-10T10:00:00"),
    score: 92,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 100, correct: 10, total: 10 },
      { domain: "event", score: 90, correct: 9, total: 10 },
      { domain: "artifact", score: 80, correct: 8, total: 10 },
    ],
  },
  {
    id: "test-3",
    certificationId: "cert3",
    certificationName: "Project Management Professional (PMP)",
    testType: "full",
    date: new Date("2023-10-05T09:00:00"),
    score: 65,
    passed: false,
    completed: true,
    domainScores: [
      { domain: "initiating", score: 70, correct: 7, total: 10 },
      { domain: "planning", score: 60, correct: 6, total: 10 },
      { domain: "executing", score: 50, correct: 5, total: 10 },
      { domain: "monitoring", score: 80, correct: 8, total: 10 },
      { domain: "closing", score: 60, correct: 6, total: 10 },
    ],
  },
  {
    id: "test-4",
    certificationId: "cert1",
    certificationName: "Professional Scrum Master (PSM)",
    testType: "short",
    date: new Date("2023-09-28T16:00:00"),
    score: 75,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 80, correct: 8, total: 10 },
      { domain: "event", score: 70, correct: 7, total: 10 },
      { domain: "artifact", score: 60, correct: 6, total: 10 },
    ],
  },
  {
    id: "test-5",
    certificationId: "cert2",
    certificationName: "Professional Scrum Product Owner (PSPO)",
    testType: "medium",
    date: new Date("2023-09-20T11:30:00"),
    score: 60,
    passed: false,
    completed: true,
    domainScores: [
      { domain: "role", score: 70, correct: 7, total: 10 },
      { domain: "event", score: 50, correct: 5, total: 10 },
      { domain: "artifact", score: 60, correct: 6, total: 10 },
    ],
  },
  // Incomplete tests
  {
    id: "test-6",
    certificationId: "cert1",
    certificationName: "Professional Scrum Master (PSM)",
    testType: "full",
    date: new Date("2023-10-20T13:45:00"),
    completed: false,
    questionsAnswered: 45,
    totalQuestions: 80,
    timeRemaining: "35 minutes",
    progress: 56,
  },
  {
    id: "test-7",
    certificationId: "cert3",
    certificationName: "Project Management Professional (PMP)",
    testType: "medium",
    date: new Date("2023-10-18T09:15:00"),
    completed: false,
    questionsAnswered: 12,
    totalQuestions: 30,
    timeRemaining: "25 minutes",
    progress: 40,
  },
  {
    id: "test-8",
    certificationId: "cert2",
    certificationName: "Professional Scrum Product Owner (PSPO)",
    testType: "short",
    date: new Date("2023-10-17T15:30:00"),
    completed: false,
    questionsAnswered: 3,
    totalQuestions: 10,
    timeRemaining: "8 minutes",
    progress: 30,
  },
  // More tests for pagination
  {
    id: "test-9",
    certificationId: "cert1",
    certificationName: "Professional Scrum Master (PSM)",
    testType: "medium",
    date: new Date("2023-09-15T14:30:00"),
    score: 82,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 85, correct: 8, total: 10 },
      { domain: "event", score: 80, correct: 8, total: 10 },
      { domain: "artifact", score: 75, correct: 7, total: 10 },
    ],
  },
  {
    id: "test-10",
    certificationId: "cert2",
    certificationName: "Professional Scrum Product Owner (PSPO)",
    testType: "short",
    date: new Date("2023-09-10T10:00:00"),
    score: 90,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 95, correct: 9, total: 10 },
      { domain: "event", score: 90, correct: 9, total: 10 },
      { domain: "artifact", score: 85, correct: 8, total: 10 },
    ],
  },
  {
    id: "test-11",
    certificationId: "cert3",
    certificationName: "Project Management Professional (PMP)",
    testType: "full",
    date: new Date("2023-09-05T09:00:00"),
    score: 68,
    passed: false,
    completed: true,
    domainScores: [
      { domain: "initiating", score: 75, correct: 7, total: 10 },
      { domain: "planning", score: 65, correct: 6, total: 10 },
      { domain: "executing", score: 55, correct: 5, total: 10 },
      { domain: "monitoring", score: 85, correct: 8, total: 10 },
      { domain: "closing", score: 65, correct: 6, total: 10 },
    ],
  },
  {
    id: "test-12",
    certificationId: "cert1",
    certificationName: "Professional Scrum Master (PSM)",
    testType: "short",
    date: new Date("2023-08-28T16:00:00"),
    score: 78,
    passed: true,
    completed: true,
    domainScores: [
      { domain: "role", score: 85, correct: 8, total: 10 },
      { domain: "event", score: 75, correct: 7, total: 10 },
      { domain: "artifact", score: 65, correct: 6, total: 10 },
    ],
  },
]

// Mock users data
const mockUsers = {
  "user-1": { id: "user-1", name: "John Doe", email: "john@example.com" },
  "user-2": { id: "user-2", name: "Jane Smith", email: "jane@example.com" },
  "user-3": { id: "user-3", name: "Robert Johnson", email: "robert@example.com" },
  "admin-1": { id: "admin-1", name: "Admin User", email: "admin@latih.com" },
}

// Add test types data
const testTypes = {
  short: "Short Test (10 questions)",
  medium: "Medium Test (30 questions)",
  full: "Full Test (80 questions)",
}

export default function TestHistoryPage({ params }: { params: { userId: string } }) {
  const { userId } = params
  const { user, isAdmin, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // passed, failed, all
  const [filterCompletion, setFilterCompletion] = useState("all") // completed, incomplete, all
  const [filterCertification, setFilterCertification] = useState("all")
  const [filterTestType, setFilterTestType] = useState("all")
  const [visibleTests, setVisibleTests] = useState(5)
  const [userData, setUserData] = useState<{ id: string; name: string; email: string } | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login")
      } else if (!isAdmin && userId !== user.id) {
        // If not admin and trying to view someone else's history
        router.push(`/test-history/${user.id}`)
      } else {
        // Set user data
        setUserData(mockUsers[userId as keyof typeof mockUsers] || { id: userId, name: "Unknown User", email: "" })
      }
    }
  }, [user, authLoading, router, userId, isAdmin])

  if (authLoading || !user || !userData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  // Get test type name
  const getTestTypeName = (type: string) => {
    return testTypes[type as keyof typeof testTypes] || "Practice Test"
  }

  // Filter tests
  const filteredTests = mockTestHistory.filter((test) => {
    // Search term filter
    const searchMatch =
      test.certificationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter (only applies to completed tests)
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "passed" && test.completed && test.passed) ||
      (filterStatus === "failed" && test.completed && !test.passed)

    // Completion filter
    const completionMatch =
      filterCompletion === "all" ||
      (filterCompletion === "completed" && test.completed) ||
      (filterCompletion === "incomplete" && !test.completed)

    // Certification filter
    const certMatch = filterCertification === "all" || test.certificationId === filterCertification

    // Test type filter
    const typeMatch = filterTestType === "all" || test.testType === filterTestType

    return searchMatch && statusMatch && completionMatch && certMatch && typeMatch
  })

  // Sort by date (newest first)
  const sortedTests = [...filteredTests].sort((a, b) => b.date.getTime() - a.date.getTime())

  // Paginate tests
  const paginatedTests = sortedTests.slice(0, visibleTests)
  const hasMoreTests = visibleTests < sortedTests.length

  // Load more tests
  const loadMoreTests = () => {
    setVisibleTests((prev) => prev + 5)
  }

  // Get unique certifications for filter
  const uniqueCertifications = Array.from(new Set(mockTestHistory.map((test) => test.certificationId))).map((id) => ({
    id,
    name: mockTestHistory.find((test) => test.certificationId === id)?.certificationName || "",
  }))

  // Calculate statistics
  const completedTests = mockTestHistory.filter((test) => test.completed)
  const totalTests = mockTestHistory.length
  const averageScore = completedTests.length
    ? Math.round(completedTests.reduce((sum, test) => sum + (test.score || 0), 0) / completedTests.length)
    : 0
  const studyTime = "10.5 hours" // This would be calculated from actual data

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
        <BackButton
          label={userId === user.id ? "Back to My Certifications" : "Back to User Management"}
          href={userId === user.id ? "/my-certifications" : "/admin/users"}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">Test History</h1>
          {userId !== user.id && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <User className="h-3.5 w-3.5 mr-1" />
              {userData.name}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">{userId === user.id ? `${userData.name}` : `${userData.name}`}</p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Trophy className="mr-2 h-4 w-4 text-primary" />
              Tests Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTests.length}/{totalTests}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-primary" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyTime}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterCompletion} onValueChange={setFilterCompletion}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by completion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tests</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCertification} onValueChange={setFilterCertification}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by certification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Certifications</SelectItem>
            {uniqueCertifications.map((cert) => (
              <SelectItem key={cert.id} value={cert.id}>
                {cert.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterTestType} onValueChange={setFilterTestType}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by test type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Test Types</SelectItem>
            <SelectItem value="short">Short Test</SelectItem>
            <SelectItem value="medium">Medium Test</SelectItem>
            <SelectItem value="full">Full Test</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Test History List */}
      <div className="space-y-4">
        {paginatedTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No tests found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or search term to find what you're looking for.
            </p>
          </div>
        ) : (
          paginatedTests.map((test) => (
            <Card key={test.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{test.certificationName}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{getTestTypeName(test.testType)}</span>
                      <span>•</span>
                      <span>Test ID: {test.id}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(test.date)}</span>
                      </div>
                    </div>
                  </div>
                  {test.completed ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        test.passed
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200",
                      )}
                    >
                      {test.passed ? (
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                      )}
                      {test.passed ? "Passed" : "Failed"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 capitalize">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      In Progress
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {test.completed ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Overall Score */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1 text-primary" />
                        Overall Score
                      </h3>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-muted-foreground">Score</span>
                        <span className="font-medium">{test.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-2 transition-all duration-500", test.passed ? "bg-green-500" : "bg-red-500")}
                          style={{ width: `${test.score}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Domain Scores */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-primary" />
                        Domain Scores
                      </h3>
                      <div className="space-y-2">
                        {test.domainScores.map((domain) => (
                          <div key={domain.domain} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="capitalize">{domain.domain}</span>
                              <span className="font-medium">{domain.score}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-1.5 transition-all duration-500",
                                  domain.score >= 70 ? "bg-green-500" : "bg-red-500",
                                )}
                                style={{ width: `${domain.score}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{test.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-primary transition-all duration-500"
                          style={{ width: `${test.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Test Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>
                          <span className="font-medium">{test.questionsAnswered}</span>/{test.totalQuestions} questions
                          answered
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>
                          <span className="font-medium">{test.timeRemaining}</span> remaining
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  {test.completed ? (
                    <Link href={`/test-results/${test.id}`}>
                      <Button size="sm" className="gap-1">
                        <Info className="h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={`/take-test?certification=${test.certificationId}&type=${test.testType}&testId=${test.id}&continue=true`}
                    >
                      <Button size="sm" className="gap-1">
                        <Play className="h-4 w-4" />
                        Continue Test
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Load More Button */}
        {hasMoreTests && (
          <div className="flex justify-center mt-6">
            <Button onClick={loadMoreTests} variant="outline" className="gap-2">
              Load More Tests
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
