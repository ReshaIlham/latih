"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BackButton } from "@/components/back-button"
import { CheckCircle, XCircle, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
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
    difficulty: "medium",
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
    difficulty: "easy",
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
    difficulty: "medium",
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
    difficulty: "easy",
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
    difficulty: "medium",
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
    difficulty: "easy",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "easy",
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
    difficulty: "hard",
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
  },
  cert2: {
    id: "cert2",
    name: "Professional Scrum Product Owner (PSPO)",
  },
  cert3: {
    id: "cert3",
    name: "Project Management Professional (PMP)",
  },
}

// Add test types data
const testTypes = {
  short: "Short Test (10 questions)",
  medium: "Medium Test (30 questions)",
  full: "Full Test (80 questions)",
}

export default function TestResultsPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.id as string

  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [selectedQuestionForExplanation, setSelectedQuestionForExplanation] = useState<Question | null>(null)

  // Get test result data
  const testResult = mockTestResults[testId as keyof typeof mockTestResults]

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
    setSelectedQuestionForExplanation(question)
    setShowExplanationModal(true)
  }

  const getCorrectOptionId = (question: Question) => {
    return question.options.find((option) => option.isCorrect)?.id || ""
  }

  const getSelectedOptionText = (question: Question) => {
    const selectedOptionId = selectedAnswers[question.id]
    return question.options.find((option) => option.id === selectedOptionId)?.text || "Not answered"
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
        <BackButton label="Back to Test History" href="/test-history" />
      </div>

      <div className="mx-auto max-w-4xl">
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
                          className="h-8 gap-1 text-primary"
                          onClick={() => handleShowExplanation(question)}
                        >
                          <Info className="h-3.5 w-3.5" />
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

              <div className="pt-2">
                <Badge variant="outline" className="capitalize text-xs">
                  Domain: {selectedQuestionForExplanation.domain}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
