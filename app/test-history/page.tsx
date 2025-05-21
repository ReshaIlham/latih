"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-provider"
import { CheckCircle, XCircle, Calendar, BarChart3, BookOpen, Info, Search, Filter, ArrowLeft } from "lucide-react"
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
    domainScores: [
      { domain: "role", score: 70, correct: 7, total: 10 },
      { domain: "event", score: 50, correct: 5, total: 10 },
      { domain: "artifact", score: 60, correct: 6, total: 10 },
    ],
  },
]

// Add test types data
const testTypes = {
  short: "Short Test (10 questions)",
  medium: "Medium Test (30 questions)",
  full: "Full Test (80 questions)",
}

export default function TestHistoryPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCertification, setFilterCertification] = useState("all")
  const [filterTestType, setFilterTestType] = useState("all")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
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

    // Status filter
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "passed" && test.passed) ||
      (filterStatus === "failed" && !test.passed)

    // Certification filter
    const certMatch = filterCertification === "all" || test.certificationId === filterCertification

    // Test type filter
    const typeMatch = filterTestType === "all" || test.testType === filterTestType

    return searchMatch && statusMatch && certMatch && typeMatch
  })

  // Get unique certifications for filter
  const uniqueCertifications = Array.from(new Set(mockTestHistory.map((test) => test.certificationId))).map((id) => ({
    id,
    name: mockTestHistory.find((test) => test.certificationId === id)?.certificationName || "",
  }))

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.push("/my-certifications")} className="gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Test History</h1>
        <p className="text-muted-foreground">Review your past test attempts and track your progress over time</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
        {filteredTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No tests found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or search term to find what you're looking for.
            </p>
          </div>
        ) : (
          filteredTests.map((test) => (
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
                </div>
              </CardHeader>
              <CardContent>
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

                <div className="flex justify-end mt-4">
                  <Link href={`/test-results/${test.id}`}>
                    <Button size="sm" className="gap-1">
                      <Info className="h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
