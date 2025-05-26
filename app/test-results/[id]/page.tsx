"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Info, Lock, Coins, ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-provider"
import type { Question } from "@/lib/types"

// Mock test data (same as in take-test page)
const mockQuestions: Question[] = [
  {
    id: "q1",
    certificationId: "cert1",
    text: "What is the primary responsibility of a Scrum Master?",
    options: [
      { id: "a", text: "Managing the team and assigning tasks", isCorrect: false },
      { id: "b", text: "Facilitating Scrum events and removing impediments", isCorrect: true },
      { id: "c", text: "Writing user stories and managing the product backlog", isCorrect: false },
      { id: "d", text: "Reporting team progress to stakeholders", isCorrect: false },
    ],
    explanation:
      "The Scrum Master is responsible for facilitating Scrum events, removing impediments, and ensuring the team follows Scrum practices.",
    domain: "role",
    taskId: "t1",
    difficulty: "medium",
    source: "Scrum Guide 2020",
  },
  {
    id: "q2",
    certificationId: "cert1",
    text: "Which of the following is NOT a Scrum artifact?",
    options: [
      { id: "a", text: "Product Backlog", isCorrect: false },
      { id: "b", text: "Sprint Backlog", isCorrect: false },
      { id: "c", text: "Burndown Chart", isCorrect: true },
      { id: "d", text: "Increment", isCorrect: false },
    ],
    explanation:
      "The Burndown Chart is a tool used in Scrum, but it is not one of the three official Scrum artifacts (Product Backlog, Sprint Backlog, and Increment).",
    domain: "artifact",
    taskId: "t3",
    difficulty: "easy",
    source: "Scrum Guide 2020",
  },
  {
    id: "q3",
    certificationId: "cert1",
    text: "How long should a Sprint Planning meeting last for a one-month Sprint?",
    options: [
      { id: "a", text: "4 hours", isCorrect: false },
      { id: "b", text: "8 hours", isCorrect: true },
      { id: "c", text: "2 hours", isCorrect: false },
      { id: "d", text: "1 day", isCorrect: false },
    ],
    explanation:
      "For a one-month Sprint, Sprint Planning is time-boxed to a maximum of eight hours. For shorter Sprints, the event is proportionally shorter.",
    domain: "event",
    taskId: "t5",
    difficulty: "medium",
    source: "Scrum Guide 2020",
  },
  {
    id: "q4",
    certificationId: "cert1",
    text: "Who is responsible for ordering the Product Backlog?",
    options: [
      { id: "a", text: "The Development Team", isCorrect: false },
      { id: "b", text: "The Scrum Master", isCorrect: false },
      { id: "c", text: "The Product Owner", isCorrect: true },
      { id: "d", text: "The Stakeholders", isCorrect: false },
    ],
    explanation: "The Product Owner is responsible for ordering the items in the Product Backlog to maximize value.",
    domain: "role",
    taskId: "t2",
    difficulty: "easy",
    source: "Scrum Guide 2020",
  },
  {
    id: "q5",
    certificationId: "cert1",
    text: "What happens during the Daily Scrum?",
    options: [
      { id: "a", text: "The Scrum Master reports on team progress", isCorrect: false },
      { id: "b", text: "The Development Team plans work for the next 24 hours", isCorrect: true },
      { id: "c", text: "The Product Owner updates the Product Backlog", isCorrect: false },
      { id: "d", text: "Stakeholders provide feedback on the increment", isCorrect: false },
    ],
    explanation:
      "During the Daily Scrum, the Development Team plans work for the next 24 hours, inspecting progress toward the Sprint Goal.",
    domain: "event",
    taskId: "t6",
    difficulty: "medium",
    source: "Scrum Guide 2020",
  },
  {
    id: "q6",
    certificationId: "cert1",
    text: "What is the maximum recommended size of a Scrum Team?",
    options: [
      { id: "a", text: "7 people", isCorrect: false },
      { id: "b", text: "9 people", isCorrect: false },
      { id: "c", text: "10 people", isCorrect: true },
      { id: "d", text: "12 people", isCorrect: false },
    ],
    explanation:
      "The Scrum Guide recommends that Scrum Teams be small enough to remain nimble and large enough to complete significant work. Typically, 10 or fewer people works best.",
    domain: "role",
    taskId: "t1",
    difficulty: "easy",
    source: "Scrum Guide 2020",
  },
  {
    id: "q7",
    certificationId: "cert1",
    text: "Which statement best describes the Sprint Review?",
    options: [
      { id: "a", text: "A meeting where the Scrum Team inspects how they worked together", isCorrect: false },
      { id: "b", text: "A meeting to inspect the increment and adapt the Product Backlog", isCorrect: true },
      { id: "c", text: "A daily meeting for the Development Team to synchronize activities", isCorrect: false },
      { id: "d", text: "A meeting to plan the work for the upcoming Sprint", isCorrect: false },
    ],
    explanation:
      "The Sprint Review is a meeting held at the end of the Sprint to inspect the increment and adapt the Product Backlog if needed.",
    domain: "event",
    taskId: "t5",
    difficulty: "medium",
    source: "Scrum Guide 2020",
  },
  {
    id: "q8",
    certificationId: "cert1",
    text: "What is the primary purpose of the Sprint Retrospective?",
    options: [
      { id: "a", text: "To review the product increment with stakeholders", isCorrect: false },
      { id: "b", text: "To plan the work for the next Sprint", isCorrect: false },
      { id: "c", text: "To inspect and adapt the team's process and practices", isCorrect: true },
      { id: "d", text: "To update the Product Backlog with new items", isCorrect: false },
    ],
    explanation:
      "The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint.",
    domain: "event",
    taskId: "t6",
    difficulty: "medium",
    source: "Scrum Guide 2020",
  },
  {
    id: "q9",
    certificationId: "cert1",
    text: "What is the time-box for a Daily Scrum?",
    options: [
      { id: "a", text: "15 minutes", isCorrect: true },
      { id: "b", text: "30 minutes", isCorrect: false },
      { id: "c", text: "1 hour", isCorrect: false },
      { id: "d", text: "No time limit", isCorrect: false },
    ],
    explanation: "The Daily Scrum is time-boxed to 15 minutes, regardless of team size.",
    domain: "event",
    taskId: "t6",
    difficulty: "easy",
    source: "Scrum Guide 2020",
  },
  {
    id: "q10",
    certificationId: "cert1",
    text: "Which of the following is NOT a value in the Scrum Guide?",
    options: [
      { id: "a", text: "Commitment", isCorrect: false },
      { id: "b", text: "Focus", isCorrect: false },
      { id: "c", text: "Efficiency", isCorrect: true },
      { id: "d", text: "Respect", isCorrect: false },
    ],
    explanation:
      "The five values of Scrum are Commitment, Focus, Openness, Respect, and Courage. Efficiency is not one of the Scrum values.",
    domain: "artifact",
    taskId: "t4",
    difficulty: "hard",
    source: "Scrum Guide 2020",
  },
]

// Mock test results data
const mockTestResults = {
  "test-1": {
    id: "test-1",
    certificationId: "cert1",
    testType: "medium",
    startTime: new Date("2023-10-15T14:30:00"),
    endTime: new Date("2023-10-15T15:15:00"),
    selectedAnswers: {
      q1: "b",
      q2: "c",
      q3: "b",
      q4: "c",
      q5: "b",
      q6: "c",
      q7: "b",
      q8: "c",
      q9: "a",
      q10: "c",
    },
    score: 85,
  },
  "test-2": {
    id: "test-2",
    certificationId: "cert2",
    testType: "short",
    startTime: new Date("2023-10-10T10:00:00"),
    endTime: new Date("2023-10-10T10:30:00"),
    selectedAnswers: {
      q1: "b",
      q2: "c",
      q3: "b",
      q4: "c",
      q5: "a", // incorrect
      q6: "c",
      q7: "a", // incorrect
      q8: "c",
      q9: "a",
      q10: "c",
    },
    score: 80,
  },
}

// Add the mock certification data
const mockCertifications = {
  cert1: {
    id: "cert1",
    name: "Professional Scrum Master (PSM)",
    original_price: 199000,
    discount_price: 149000,
  },
  cert2: {
    id: "cert2",
    name: "Professional Scrum Product Owner (PSPO)",
    original_price: 199000,
    discount_price: null,
  },
  cert3: {
    id: "cert3",
    name: "Project Management Professional (PMP)",
    original_price: 249000,
    discount_price: 199000,
  },
}

// Add test types data
const testTypes = {
  short: "Short Test (10 questions)",
  medium: "Medium Test (30 questions)",
  full: "Full Test (80 questions)",
}

const mockDomains = [
  {
    id: "role",
    name: "Roles",
    tasks: [
      { id: "t1", name: "Scrum Master Responsibilities", domainId: "role" },
      { id: "t2", name: "Product Owner Duties", domainId: "role" },
    ],
  },
  {
    id: "artifact",
    name: "Artifacts",
    tasks: [
      { id: "t3", name: "Product Backlog Management", domainId: "artifact" },
      { id: "t4", name: "Sprint Backlog Creation", domainId: "artifact" },
    ],
  },
  {
    id: "event",
    name: "Events",
    tasks: [
      { id: "t5", name: "Sprint Planning", domainId: "event" },
      { id: "t6", name: "Daily Scrum", domainId: "event" },
    ],
  },
]

export default function TestResultsPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.id as string
  const { user } = useAuth()

  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [selectedQuestionForExplanation, setSelectedQuestionForExplanation] = useState<Question | null>(null)
  const [showPremiumFeatureModal, setShowPremiumFeatureModal] = useState(false)

  // Get test result data
  const testResult = mockTestResults[testId as keyof typeof mockTestResults]

  // Mock user's purchased certifications
  const userPurchasedCertifications = user ? ["cert1"] : []

  if (!testResult) {
    return (
      <div className="container py-6 md:py-10">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-4">Test Result Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The test result you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/test-history")}>Back to Test History</Button>
        </div>
      </div>
    )
  }

  const questions = mockQuestions
  const selectedAnswers = testResult.selectedAnswers
  const certificationId = testResult.certificationId
  const testType = testResult.testType

  // Check if user has purchased this certification
  const hasAccess = userPurchasedCertifications.includes(certificationId)

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  // Function to get certification name
  const getCertificationName = (id: string) => {
    return mockCertifications[id as keyof typeof mockCertifications]?.name || "Practice Test"
  }

  // Function to get test type name
  const getTestTypeName = (type: string) => {
    return testTypes[type as keyof typeof testTypes] || "Practice Test"
  }

  // Function to calculate domain scores
  const calculateDomainScores = () => {
    const domainScores: Record<string, { correct: number; total: number }> = {}

    questions.forEach((question) => {
      const domain = question.domain
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 }
      }

      domainScores[domain].total += 1

      const correctOptionId = question.options.find((option) => option.isCorrect)?.id
      if (selectedAnswers[question.id] === correctOptionId) {
        domainScores[domain].correct += 1
      }
    })

    return Object.entries(domainScores).map(([domain, scores]) => ({
      domain,
      score: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total,
    }))
  }

  const calculateScore = () => {
    let correctAnswers = 0
    questions.forEach((question) => {
      const correctOptionId = question.options.find((option) => option.isCorrect)?.id
      if (selectedAnswers[question.id] === correctOptionId) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passingGrade = 70 // Assuming 70% is the passing grade

    return {
      score,
      correctCount: correctAnswers,
      totalCount: questions.length,
      passed: score >= passingGrade,
      passingGrade,
    }
  }

  const handleShowExplanation = (question: Question) => {
    if (hasAccess) {
      setSelectedQuestionForExplanation(question)
      setShowExplanationModal(true)
    } else {
      setShowPremiumFeatureModal(true)
    }
  }

  const getCorrectOptionId = (question: Question) => {
    return question.options.find((option) => option.isCorrect)?.id || ""
  }

  const getSelectedOptionText = (question: Question) => {
    const selectedOptionId = selectedAnswers[question.id]
    return question.options.find((option) => option.id === selectedOptionId)?.text || "Not answered"
  }

  const handleSubscribe = () => {
    setShowPremiumFeatureModal(false)
    router.push(`/subscription?certification=${certificationId}`)
  }

  const handleContactAdmin = () => {
    // Open WhatsApp with a predefined message
    const message = `Hello, I'm interested in subscribing to the ${getCertificationName(
      certificationId,
    )} certification on Latih. Please provide more information.`
    const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowPremiumFeatureModal(false)
  }

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Calculate discount percentage
  const calculateDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100)
  }

  return (
    <div className="container py-6 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/test-history")} className="gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Test Results</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{getCertificationName(certificationId)}</span>
              <span>•</span>
              <span>{getTestTypeName(testType)}</span>
              <span>•</span>
              <span>Test ID: {testId}</span>
              <span>•</span>
              <span>{formatDateTime(testResult.startTime)}</span>
            </div>
            <div className="mt-2">
              {(() => {
                const { score, correctCount, totalCount, passed, passingGrade } = calculateScore()
                return (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Your Score</span>
                      <span className="text-2xl font-bold">{score}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-2 transition-all duration-500", passed ? "bg-green-500" : "bg-red-500")}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Correct answers: {correctCount}/{totalCount}
                      </span>
                      <span>
                        Status:{" "}
                        <span className={passed ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {passed ? "PASSED" : "FAILED"}
                        </span>{" "}
                        (Passing grade: {passingGrade}%)
                        {passed && " 🎉"}
                      </span>
                    </div>
                  </div>
                )
              })()}
            </div>
          </CardHeader>
          <CardContent>
            {/* Domain scores section */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Domain Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {calculateDomainScores().map((domainScore) => (
                  <Card key={domainScore.domain} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{domainScore.domain}</span>
                          <span className="font-bold">{domainScore.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-1.5 transition-all duration-500",
                              domainScore.score >= 70 ? "bg-green-500" : "bg-red-500",
                            )}
                            style={{ width: `${domainScore.score}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {domainScore.correct}/{domainScore.total} correct
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <h3 className="font-medium mb-4">Question Summary</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">No.</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-[100px]">Your Answer</TableHead>
                  <TableHead className="w-[100px]">Correct Answer</TableHead>
                  <TableHead className="w-[100px]">Result</TableHead>
                  <TableHead className="w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question, index) => {
                  const selectedOptionId = selectedAnswers[question.id] || ""
                  const correctOptionId = getCorrectOptionId(question)
                  const isCorrect = selectedOptionId === correctOptionId

                  return (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{question.text}</TableCell>
                      <TableCell className="uppercase">{selectedOptionId || "-"}</TableCell>
                      <TableCell className="uppercase">{correctOptionId}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "capitalize",
                            isCorrect
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200",
                          )}
                        >
                          {isCorrect ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn("h-8 gap-1", hasAccess ? "text-primary" : "text-muted-foreground")}
                          onClick={() => handleShowExplanation(question)}
                        >
                          {hasAccess ? <Info className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => router.push(`/certifications/${certificationId}`)}>
              Back to Certification
            </Button>
            <Button onClick={() => router.push(`/take-test?certification=${certificationId}&type=${testType}`)}>
              Take Another Test
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Explanation Modal */}
      <Dialog open={showExplanationModal} onOpenChange={setShowExplanationModal}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Question Explanation</DialogTitle>
          </DialogHeader>
          {selectedQuestionForExplanation && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium mb-1">Question:</h3>
                <p className="text-sm">{selectedQuestionForExplanation.text}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Options:</h3>
                {selectedQuestionForExplanation.options.map((option) => {
                  const isCorrect = option.isCorrect
                  const isSelected = selectedAnswers[selectedQuestionForExplanation.id] === option.id

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "p-2 rounded-md border",
                        isCorrect ? "border-green-200 bg-green-50" : "",
                        isSelected && !isCorrect ? "border-red-200 bg-red-50" : "",
                        !isSelected && !isCorrect ? "border-gray-200" : "",
                      )}
                    >
                      <div className="flex items-start">
                        <span className="font-medium mr-2 uppercase text-sm">{option.id}.</span>
                        <span className="flex-1 text-sm">{option.text}</span>
                        {isCorrect && <CheckCircle className="h-4 w-4 text-green-600 ml-2 flex-shrink-0" />}
                        {isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-600 ml-2 flex-shrink-0" />}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <h3 className="text-base font-medium mb-1">Your Answer:</h3>
                <p
                  className={cn(
                    "text-sm",
                    selectedAnswers[selectedQuestionForExplanation.id] ===
                      getCorrectOptionId(selectedQuestionForExplanation)
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium",
                  )}
                >
                  {selectedAnswers[selectedQuestionForExplanation.id]
                    ? `${selectedAnswers[selectedQuestionForExplanation.id].toUpperCase()}. ${getSelectedOptionText(
                        selectedQuestionForExplanation,
                      )}`
                    : "Not answered"}
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-1">Explanation:</h3>
                <p className="text-sm">{selectedQuestionForExplanation.explanation}</p>
              </div>

              {selectedQuestionForExplanation.source && (
                <div>
                  <h3 className="text-base font-medium mb-1">Source:</h3>
                  <p className="text-sm">{selectedQuestionForExplanation.source}</p>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="capitalize text-xs">
                  Domain: {selectedQuestionForExplanation.domain}
                </Badge>
                {(() => {
                  const domain = mockDomains.find((d) => d.id === selectedQuestionForExplanation.domain)
                  const task = domain?.tasks.find((t) => t.id === selectedQuestionForExplanation.taskId)
                  return task ? (
                    <Badge variant="outline" className="text-xs">
                      Task: {task.name}
                    </Badge>
                  ) : null
                })()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Premium Feature Modal - Updated with certification card style pricing and new benefits */}
      <Dialog open={showPremiumFeatureModal} onOpenChange={setShowPremiumFeatureModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Premium Feature
            </DialogTitle>
            <DialogDescription>Detailed explanations are available exclusively to subscribers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="font-medium text-base mb-4">Subscription Details</h3>
              <div className="space-y-4">
                {/* Certification name and details - styled like certification cards */}
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-primary">{getCertificationName(certificationId)}</h4>

                  {/* Price display styled like certification cards */}
                  <div className="mt-3 flex items-center">
                    {mockCertifications[certificationId as keyof typeof mockCertifications]?.discount_price ? (
                      <>
                        <div className="flex flex-col">
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(
                                mockCertifications[certificationId as keyof typeof mockCertifications]?.discount_price!,
                              )}
                            </span>
                            <span className="text-sm ml-2 text-muted-foreground">/month</span>
                          </div>
                          <span className="text-sm line-through text-muted-foreground">
                            {formatPrice(
                              mockCertifications[certificationId as keyof typeof mockCertifications]?.original_price,
                            )}
                          </span>
                        </div>
                        <div className="ml-auto">
                          <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Up to 25% OFF
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(
                              mockCertifications[certificationId as keyof typeof mockCertifications]?.original_price,
                            )}
                          </span>
                          <span className="text-sm ml-2 text-muted-foreground">/month</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features list - Updated to match the subscription page style */}
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-3">What You'll Get:</h5>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span>Access to all test types</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span>Detailed explanations for all questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-primary" />
                      </div>
                      <span>Unlimited practice tests</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                        <Coins className="h-3 w-3 text-amber-600" />
                      </div>
                      <span>Up to 4 free mentoring credits (worth Rp 396.000)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-base mb-3">How to Subscribe</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Choose a Subscription Method</p>
                    <p className="text-xs text-muted-foreground">Select between payment form or WhatsApp contact</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Complete Payment</p>
                    <p className="text-xs text-muted-foreground">Transfer to our bank account and submit proof</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Access Premium Features</p>
                    <p className="text-xs text-muted-foreground">Get immediate access after verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowPremiumFeatureModal(false)} className="sm:flex-1">
              Maybe Later
            </Button>
            <Button onClick={handleSubscribe} className="sm:flex-1">
              Subscribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
