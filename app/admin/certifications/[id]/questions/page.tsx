"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react"
import type { TestDomain } from "@/lib/types"

// Mock questions data
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
    difficulty: "medium",
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
    difficulty: "easy",
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
    difficulty: "medium",
  },
]

export default function ManageQuestionsPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<TestDomain | "all">("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Filter questions based on search, domain, and difficulty
  const filteredQuestions = mockQuestions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = selectedDomain === "all" || question.domain === selectedDomain
    const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty
    return matchesSearch && matchesDomain && matchesDifficulty
  })

  // New question form state
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: [
      { id: "a", text: "" },
      { id: "b", text: "" },
      { id: "c", text: "" },
      { id: "d", text: "" },
    ],
    correctOption: "a",
    explanation: "",
    domain: "role" as TestDomain,
    difficulty: "medium",
  })

  const handleAddQuestion = () => {
    // Validate form
    if (!newQuestion.text || newQuestion.options.some((opt) => !opt.text) || !newQuestion.explanation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields for the question.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would save the question to the database here
    toast({
      title: "Question Added",
      description: "The question has been added successfully.",
    })

    // Reset form and close
    setNewQuestion({
      text: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
        { id: "c", text: "" },
        { id: "d", text: "" },
      ],
      correctOption: "a",
      explanation: "",
      domain: "role",
      difficulty: "medium",
    })
    setIsAddingQuestion(false)
  }

  const handleDeleteQuestion = (questionId: string) => {
    // In a real app, we would delete the question from the database here
    toast({
      title: "Question Deleted",
      description: "The question has been deleted successfully.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/admin/certifications">
            <Button variant="ghost" size="sm">
              Back to Certifications
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Manage Questions</h1>
        <p className="text-muted-foreground">Certification: Scrum Master</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedDomain} onValueChange={(value) => setSelectedDomain(value as TestDomain | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="role">Roles</SelectItem>
              <SelectItem value="artifact">Artifacts</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsAddingQuestion(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      {isAddingQuestion && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Question</CardTitle>
            <CardDescription>Create a new question for the Scrum Master certification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea
                id="question-text"
                placeholder="Enter the question text..."
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Answer Options</Label>
              {newQuestion.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                    {option.id.toUpperCase()}
                  </div>
                  <Input
                    placeholder={`Option ${option.id.toUpperCase()}`}
                    value={option.text}
                    onChange={(e) => {
                      const updatedOptions = [...newQuestion.options]
                      updatedOptions[index].text = e.target.value
                      setNewQuestion({ ...newQuestion, options: updatedOptions })
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`correct-${option.id}`}
                      name="correct-option"
                      checked={newQuestion.correctOption === option.id}
                      onChange={() => setNewQuestion({ ...newQuestion, correctOption: option.id })}
                      className="mr-2"
                    />
                    <Label htmlFor={`correct-${option.id}`} className="text-sm">
                      Correct
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                placeholder="Explain why the correct answer is right..."
                value={newQuestion.explanation}
                onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Select
                  value={newQuestion.domain}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, domain: value as TestDomain })}
                >
                  <SelectTrigger id="domain">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="role">Roles</SelectItem>
                    <SelectItem value="artifact">Artifacts</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={newQuestion.difficulty}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{question.text}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingQuestion(question.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Domain: {question.domain.charAt(0).toUpperCase() + question.domain.slice(1)} • Difficulty:{" "}
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center rounded-md p-2 ${
                        option.id === question.correctOption ? "bg-green-50 text-green-800" : ""
                      }`}
                    >
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted font-medium">
                        {option.id.toUpperCase()}
                      </div>
                      <span>{option.text}</span>
                      {option.id === question.correctOption && (
                        <span className="ml-2 text-xs font-medium">(Correct Answer)</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-medium">Explanation:</p>
                  <p>{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">No questions found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters or add new questions.</p>
            <Button className="mt-4" onClick={() => setIsAddingQuestion(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
