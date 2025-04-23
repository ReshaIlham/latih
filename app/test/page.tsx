"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Clock, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { TestType } from "@/lib/types"

// Mock test data
const mockQuestions = [
  {
    id: "q1",
    text: "What is the primary responsibility of a Scrum Master?",
    options: [
      { id: "a", text: "Managing the team and assigning tasks" },
      { id: "b", text: "Facilitating Scrum events and removing impediments" },
      { id: "c", text: "Writing user stories and managing the product backlog" },
      { id: "d", text: "Reporting team progress to stakeholders" },
    ],
    correctOption: "b",
    explanation:
      "The Scrum Master is responsible for facilitating Scrum events, removing impediments, and ensuring the team follows Scrum practices.",
    domain: "role",
  },
  {
    id: "q2",
    text: "Which of the following is NOT a Scrum artifact?",
    options: [
      { id: "a", text: "Product Backlog" },
      { id: "b", text: "Sprint Backlog" },
      { id: "c", text: "Burndown Chart" },
      { id: "d", text: "Increment" },
    ],
    correctOption: "c",
    explanation:
      "The Burndown Chart is a tool used in Scrum, but it is not one of the three official Scrum artifacts (Product Backlog, Sprint Backlog, and Increment).",
    domain: "artifact",
  },
  {
    id: "q3",
    text: "How long should a Sprint Planning meeting last for a one-month Sprint?",
    options: [
      { id: "a", text: "4 hours" },
      { id: "b", text: "8 hours" },
      { id: "c", text: "2 hours" },
      { id: "d", text: "1 day" },
    ],
    correctOption: "b",
    explanation:
      "For a one-month Sprint, Sprint Planning is time-boxed to a maximum of eight hours. For shorter Sprints, the event is proportionally shorter.",
    domain: "event",
  },
  {
    id: "q4",
    text: "Who is responsible for ordering the Product Backlog?",
    options: [
      { id: "a", text: "The Development Team" },
      { id: "b", text: "The Scrum Master" },
      { id: "c", text: "The Product Owner" },
      { id: "d", text: "The Stakeholders" },
    ],
    correctOption: "c",
    explanation: "The Product Owner is responsible for ordering the items in the Product Backlog to maximize value.",
    domain: "role",
  },
  {
    id: "q5",
    text: "What happens during the Daily Scrum?",
    options: [
      { id: "a", text: "The Scrum Master reports on team progress" },
      { id: "b", text: "The Development Team plans work for the next 24 hours" },
      { id: "c", text: "The Product Owner updates the Product Backlog" },
      { id: "d", text: "Stakeholders provide feedback on the increment" },
    ],
    correctOption: "b",
    explanation:
      "During the Daily Scrum, the Development Team plans work for the next 24 hours, inspecting progress toward the Sprint Goal.",
    domain: "event",
  },
]

// Animation variants
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export default function TestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const certificationId = searchParams.get("certification") || ""
  const testType = (searchParams.get("type") as TestType) || "short"
  const domainsParam = searchParams.get("domains") || ""
  const selectedDomains = domainsParam.split(",")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter questions based on selected domains
  const filteredQuestions =
    selectedDomains.length > 0 ? mockQuestions.filter((q) => selectedDomains.includes(q.domain)) : mockQuestions

  // Limit questions based on test type
  const questions = filteredQuestions.slice(0, testType === "short" ? 5 : testType === "medium" ? 3 : 5)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Timer effect
  useEffect(() => {
    if (testCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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

  const handleSubmitTest = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Calculate score
      let correctAnswers = 0
      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctOption) {
          correctAnswers++
        }
      })

      const score = Math.round((correctAnswers / questions.length) * 100)

      // In a real app, we would save the test results to the database here

      setTestCompleted(true)
      setIsSubmitting(false)

      toast({
        title: "Test completed!",
        description: `Your score: ${score}%`,
      })
    }, 1500)
  }

  return (
    <div className="container py-10">
      {!testCompleted ? (
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Practice Test</h1>
            <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={`font-medium ${timeRemaining < 60 ? "text-red-500 animate-pulse" : ""}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants}
            >
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
                  <CardDescription>Select the best answer from the options below</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="cursor-pointer font-normal transition-colors hover:text-primary"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button onClick={handleSubmitTest} disabled={isSubmitting} className="shadow-sm hover:shadow-md">
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
                    <Button onClick={handleNextQuestion} className="shadow-sm hover:shadow-md">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center">
            <Button
              variant="ghost"
              onClick={handleSubmitTest}
              className="hover:text-primary transition-colors"
              disabled={isSubmitting}
            >
              End Test Early
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Test Results</CardTitle>
              <CardDescription>Review your answers and explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className="space-y-3 border-b pb-4 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">
                      {index + 1}. {question.text}
                    </h3>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1 ${
                        selectedAnswers[question.id] === question.correctOption
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedAnswers[question.id] === question.correctOption ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`rounded-md p-2 ${
                          option.id === question.correctOption
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : option.id === selectedAnswers[question.id] && option.id !== question.correctOption
                              ? "bg-red-50 text-red-800 border border-red-200"
                              : "bg-muted/50"
                        }`}
                      >
                        {option.text}
                        {option.id === question.correctOption && (
                          <span className="ml-2 text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Correct Answer
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-md bg-primary/5 p-3 text-sm border border-primary/10">
                    <p className="font-medium flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-primary" />
                      Explanation:
                    </p>
                    <p>{question.explanation}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push(`/certifications/${certificationId}`)}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Back to Certification
              </Button>
              <Button
                onClick={() => {
                  // Reset the test
                  setCurrentQuestionIndex(0)
                  setSelectedAnswers({})
                  setTimeRemaining(15 * 60)
                  setTestCompleted(false)
                }}
                className="shadow-sm hover:shadow-md"
              >
                Take Another Test
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
