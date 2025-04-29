"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { BackButton } from "@/components/back-button"
import { Clock, ArrowLeft, ArrowRight, CheckCircle, Flag, Calendar, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Question } from "@/lib/types"

// Mock test data
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

export default function TakeTestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const certificationId = searchParams.get("certification") || "cert1"
  const testType = searchParams.get("type") || "short"
  const testDuration = 30 * 60 // 30 minutes in seconds

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(testDuration)
  const [testCompleted, setTestCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testStartTime] = useState(new Date())
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false)
  const [testId] = useState(`TEST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const questions = mockQuestions
  const currentQuestion = questions[currentQuestionIndex]

  // Timer effect
  useEffect(() => {
    if (testCompleted) return

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testCompleted])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  // Add the function to get certification name
  const getCertificationName = (id: string) => {
    return mockCertifications[id as keyof typeof mockCertifications]?.name || "Practice Test"
  }

  // Add the function to get test type name
  const getTestTypeName = (type: string) => {
    return testTypes[type as keyof typeof testTypes] || "Practice Test"
  }

  // Add the function to get unanswered questions
  const getUnansweredQuestions = () => {
    return questions.filter((q) => !selectedAnswers[q.id]).map((_, index) => index + 1)
  }

  // Add the function to get flagged questions
  const getFlaggedQuestions = () => {
    return questions.filter((q) => flaggedQuestions.has(q.id)).map((_, index) => index + 1)
  }

  // Update the handleSubmitConfirmation function to show confirmation dialog
  const handleSubmitConfirmation = () => {
    setShowSubmitConfirmation(true)
  }

  // Update the handleSubmitTest function to redirect to results page
  const handleSubmitTest = () => {
    setIsSubmitting(true)
    setShowSubmitConfirmation(false)

    // Simulate API call
    setTimeout(() => {
      setTestCompleted(true)
      setIsSubmitting(false)

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Redirect to results page
      router.push(`/test-results/${testId}`)
    }, 1500)
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
        <BackButton label="Back to Certification" href={`/certifications/${certificationId}`} />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{getCertificationName(certificationId)}</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">Test ID: {testId}</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">{getTestTypeName(testType)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDateTime(testStartTime)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={`${timeRemaining < 60 ? "text-red-500 animate-pulse" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Question navigation and content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Question navigation sidebar */}
          <div className="order-2 md:order-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((question, index) => {
                    // Determine the button variant and styling based on question state
                    let buttonVariant: "default" | "outline" | "ghost" | "secondary" = "ghost"
                    let extraClasses = ""

                    // Current question
                    if (currentQuestionIndex === index) {
                      buttonVariant = "default"
                    }
                    // Answered question
                    else if (selectedAnswers[question.id]) {
                      buttonVariant = "secondary"
                      extraClasses = "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
                    }
                    // Unanswered question
                    else {
                      buttonVariant = "outline"
                      extraClasses = "bg-gray-50"
                    }

                    // Flagged question - add a flag indicator
                    if (flaggedQuestions.has(question.id)) {
                      extraClasses += " relative"
                    }

                    return (
                      <Button
                        key={question.id}
                        variant={buttonVariant}
                        size="sm"
                        className={cn("h-8 w-8 p-0 font-medium", extraClasses)}
                        onClick={() => handleJumpToQuestion(index)}
                      >
                        {index + 1}
                        {flaggedQuestions.has(question.id) && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full"></div>
                        )}
                      </Button>
                    )
                  })}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full border border-input bg-gray-50"></div>
                    <span>Not answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-full bg-green-100"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="relative h-3 w-3 rounded-full border border-input bg-gray-50">
                      <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span>Flagged for review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main question area */}
          <div className="order-1 md:order-2 md:col-span-3">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "gap-1",
                      flaggedQuestions.has(currentQuestion.id) && "text-yellow-600 border-yellow-400 bg-yellow-50",
                    )}
                    onClick={() => handleFlagQuestion(currentQuestion.id)}
                  >
                    <Flag className="h-4 w-4" />
                    {flaggedQuestions.has(currentQuestion.id) ? "Unflag" : "Flag for review"}
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    Domain: {currentQuestion.domain}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-lg font-medium">{currentQuestion.text}</div>

                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-start space-x-2 rounded-md border p-3 hover:bg-muted/50"
                      >
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="cursor-pointer font-normal transition-colors hover:text-primary flex-1"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <Button onClick={handleSubmitConfirmation} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                        <span className="ml-2">Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit Test
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitConfirmation} onOpenChange={setShowSubmitConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {getUnansweredQuestions().length > 0 && (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Unanswered Questions</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>You have {getUnansweredQuestions().length} unanswered questions:</p>
                      <p className="mt-1">Questions: {getUnansweredQuestions().join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {getFlaggedQuestions().length > 0 && (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Flag className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Flagged Questions</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>You have {getFlaggedQuestions().length} flagged questions:</p>
                      <p className="mt-1">Questions: {getFlaggedQuestions().join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {getUnansweredQuestions().length === 0 && getFlaggedQuestions().length === 0 && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">All Questions Answered</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>You have answered all questions and have no flagged questions.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTest} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Test"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
