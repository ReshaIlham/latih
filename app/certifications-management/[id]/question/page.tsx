"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Pencil, Trash2, Search, Download, ChevronLeft, ChevronRight, FileSpreadsheet } from "lucide-react"
import { BackButton } from "@/components/back-button"
import type { TestDomain } from "@/lib/types"
import * as XLSX from "xlsx"

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
    correctRate: 82,
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
    correctRate: 75,
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
    correctRate: 68,
  },
  {
    id: "q4",
    text: "Who is responsible for ordering the Product Backlog?",
    options: [
      { id: "a", text: "The Scrum Master" },
      { id: "b", text: "The Development Team" },
      { id: "c", text: "The Product Owner" },
      { id: "d", text: "The Stakeholders" },
    ],
    correctOption: "c",
    explanation: "The Product Owner is solely responsible for ordering the Product Backlog to maximize value.",
    domain: "role",
    correctRate: 90,
  },
  {
    id: "q5",
    text: "What happens during the Daily Scrum?",
    options: [
      { id: "a", text: "The Scrum Master assigns tasks to team members" },
      { id: "b", text: "Team members report progress to the Product Owner" },
      { id: "c", text: "Team members plan work for the next 24 hours" },
      { id: "d", text: "Stakeholders provide feedback on completed work" },
    ],
    correctOption: "c",
    explanation: "During the Daily Scrum, team members plan their work for the next 24 hours and coordinate efforts.",
    domain: "event",
    correctRate: 85,
  },
  {
    id: "q6",
    text: "What is the purpose of the Sprint Review?",
    options: [
      { id: "a", text: "To inspect the increment and adapt the Product Backlog" },
      { id: "b", text: "To plan the work for the next Sprint" },
      { id: "c", text: "To identify process improvements" },
      { id: "d", text: "To assign tasks to team members" },
    ],
    correctOption: "a",
    explanation:
      "The Sprint Review is held at the end of the Sprint to inspect the increment and adapt the Product Backlog if needed.",
    domain: "event",
    correctRate: 78,
  },
  {
    id: "q7",
    text: "What is the maximum recommended size for a Scrum Team?",
    options: [
      { id: "a", text: "5 people" },
      { id: "b", text: "9 people" },
      { id: "c", text: "12 people" },
      { id: "d", text: "15 people" },
    ],
    correctOption: "b",
    explanation:
      "The recommended size for a Scrum Team is typically 7 plus or minus 2 people, with a maximum of 9 to maintain effective communication.",
    domain: "role",
    correctRate: 72,
  },
  {
    id: "q8",
    text: "What is the Definition of Done?",
    options: [
      { id: "a", text: "A list of tasks that must be completed in a Sprint" },
      { id: "b", text: "A shared understanding of what it means for work to be complete" },
      { id: "c", text: "The acceptance criteria for a specific Product Backlog item" },
      { id: "d", text: "The goals set by the Product Owner for the Sprint" },
    ],
    correctOption: "b",
    explanation:
      "The Definition of Done is a shared understanding of what it means for work to be complete, ensuring transparency.",
    domain: "artifact",
    correctRate: 80,
  },
  {
    id: "q9",
    text: "Who participates in Sprint Planning?",
    options: [
      { id: "a", text: "Only the Development Team" },
      { id: "b", text: "The Scrum Master and Product Owner" },
      { id: "c", text: "The entire Scrum Team" },
      { id: "d", text: "The Stakeholders and the Scrum Team" },
    ],
    correctOption: "c",
    explanation:
      "The entire Scrum Team (Development Team, Scrum Master, and Product Owner) participates in Sprint Planning.",
    domain: "event",
    correctRate: 88,
  },
  {
    id: "q10",
    text: "What is the primary purpose of the Sprint Backlog?",
    options: [
      { id: "a", text: "To list all product features" },
      { id: "b", text: "To track team performance" },
      { id: "c", text: "To make visible the work needed to meet the Sprint Goal" },
      { id: "d", text: "To document customer requirements" },
    ],
    correctOption: "c",
    explanation:
      "The Sprint Backlog makes visible all the work that the Development Team identifies as necessary to meet the Sprint Goal.",
    domain: "artifact",
    correctRate: 76,
  },
]

// Generate more mock questions for pagination demo
const extendedMockQuestions = [...Array(30)].map((_, index) => {
  const baseQuestion = mockQuestions[index % mockQuestions.length]
  return {
    ...baseQuestion,
    id: `q${index + 11}`,
    text: `${baseQuestion.text} (Variation ${index + 1})`,
    correctRate: Math.floor(Math.random() * 30) + 60, // Random correct rate between 60-90%
  }
})

// Combine original and extended questions
const allMockQuestions = [...mockQuestions, ...extendedMockQuestions]

// Sample bulk upload template data
const sampleTemplateData = [
  {
    question: "What is the primary responsibility of a Scrum Master?",
    domain: "role",
    "option a": "Managing the team and assigning tasks",
    "option b": "Facilitating Scrum events and removing impediments",
    "option c": "Writing user stories and managing the product backlog",
    "option d": "Reporting team progress to stakeholders",
    "correct answer": "b",
    explanation:
      "The Scrum Master is responsible for facilitating Scrum events, removing impediments, and ensuring the team follows Scrum practices.",
  },
  {
    question: "Which of the following is NOT a Scrum artifact?",
    domain: "artifact",
    "option a": "Product Backlog",
    "option b": "Sprint Backlog",
    "option c": "Burndown Chart",
    "option d": "Increment",
    "correct answer": "c",
    explanation:
      "The Burndown Chart is a tool used in Scrum, but it is not one of the three official Scrum artifacts (Product Backlog, Sprint Backlog, and Increment).",
  },
]

export default function ManageQuestionsPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<TestDomain | "all">("all")
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [isEditingQuestion, setIsEditingQuestion] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [questionsPerPage, setQuestionsPerPage] = useState(10)
  const [bulkUploadPreview, setBulkUploadPreview] = useState<any[]>([])
  const [showBulkPreview, setShowBulkPreview] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Filter questions based on search and domain
  const filteredQuestions = allMockQuestions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = selectedDomain === "all" || question.domain === selectedDomain
    return matchesSearch && matchesDomain
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage)
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion)

  // New question form state
  const emptyQuestionTemplate = {
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
  }

  const [newQuestion, setNewQuestion] = useState(emptyQuestionTemplate)

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
    setNewQuestion(emptyQuestionTemplate)
    setIsAddingQuestion(false)
  }

  const handleEditQuestion = (question: any) => {
    setCurrentQuestion(question)
    setIsEditingQuestion(true)
  }

  const handleUpdateQuestion = () => {
    // In a real app, we would update the question in the database here
    toast({
      title: "Question Updated",
      description: "The question has been updated successfully.",
    })
    setIsEditingQuestion(false)
    setCurrentQuestion(null)
  }

  const handleDeleteQuestion = (questionId: string) => {
    // In a real app, we would delete the question from the database here
    toast({
      title: "Question Deleted",
      description: "The question has been deleted successfully.",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const fileExtension = file.name.split(".").pop()?.toLowerCase()

      if (fileExtension !== "xlsx" && fileExtension !== "xls") {
        toast({
          title: "Invalid file format",
          description: "Please upload only Excel files (.xlsx or .xls)",
          variant: "destructive",
        })
        return
      }

      setUploadFile(file)

      // In a real app, we would parse the Excel file here
      // For demo purposes, we'll use the sample data
      setBulkUploadPreview(sampleTemplateData)
    }
  }

  const handlePreviewBulkUpload = () => {
    if (!uploadFile) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to upload.",
        variant: "destructive",
      })
      return
    }

    setShowBulkPreview(true)
  }

  const handleBulkUpload = () => {
    // In a real app, we would process the Excel file here
    toast({
      title: "Questions Uploaded",
      description: `${bulkUploadPreview.length} questions have been uploaded successfully.`,
    })

    setUploadFile(null)
    setShowBulkUpload(false)
    setShowBulkPreview(false)
    setBulkUploadPreview([])
  }

  const handleDownloadTemplate = () => {
    // Create template data
    const templateData = [
      {
        question: "What is the primary responsibility of a Scrum Master?",
        domain: "role",
        "option a": "Managing the team and assigning tasks",
        "option b": "Facilitating Scrum events and removing impediments",
        "option c": "Writing user stories and managing the product backlog",
        "option d": "Reporting team progress to stakeholders",
        "correct answer": "b",
        explanation:
          "The Scrum Master is responsible for facilitating Scrum events, removing impediments, and ensuring the team follows Scrum practices.",
      },
      {
        question: "Which of the following is NOT a Scrum artifact?",
        domain: "artifact",
        "option a": "Product Backlog",
        "option b": "Sprint Backlog",
        "option c": "Burndown Chart",
        "option d": "Increment",
        "correct answer": "c",
        explanation:
          "The Burndown Chart is a tool used in Scrum, but it is not one of the three official Scrum artifacts (Product Backlog, Sprint Backlog, and Increment).",
      },
    ]

    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(templateData)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Questions Template")

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })

    // Create Blob and download
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "question_template.xlsx"
    link.click()

    // Clean up
    URL.revokeObjectURL(url)

    toast({
      title: "Excel Template Downloaded",
      description: "The Excel template has been downloaded.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <BackButton href="/certifications-management" />
        <h1 className="mt-6 text-3xl font-bold">Manage Questions</h1>
        <p className="text-muted-foreground mt-2">Certification: Scrum Master</p>
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
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBulkUpload(!showBulkUpload)}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel Upload
          </Button>
          <Button onClick={() => setIsAddingQuestion(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>

      {showBulkUpload && (
        <Card className="mb-8 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Excel Question Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload questions in bulk using an Excel file (.xlsx or .xls)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Download Excel Template
              </Button>
              <p className="text-sm text-muted-foreground">
                Download the Excel template and fill it with your questions before uploading.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-upload">Upload Excel File</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {uploadFile && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {uploadFile.name} ({Math.round(uploadFile.size / 1024)} KB)
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBulkUpload(false)}>
                Cancel
              </Button>
              <Button onClick={handlePreviewBulkUpload} disabled={!uploadFile}>
                Preview Questions
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Question</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Correct Answer</TableHead>
              <TableHead>Correct Answer Percentage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.text}</TableCell>
                  <TableCell>{question.domain.charAt(0).toUpperCase() + question.domain.slice(1)}</TableCell>
                  <TableCell className="uppercase font-medium">{question.correctOption}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          question.correctRate >= 80
                            ? "bg-green-100 text-green-800"
                            : question.correctRate >= 60
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {question.correctRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditQuestion(question)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="mb-2 text-lg font-semibold">No questions found</h3>
                    <p className="text-muted-foreground">Try adjusting your search filters or add new questions.</p>
                    <Button className="mt-4" onClick={() => setIsAddingQuestion(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - Matching the user management page style */}
      {filteredQuestions.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {indexOfFirstQuestion + 1} to {Math.min(indexOfLastQuestion, filteredQuestions.length)} of{" "}
            {filteredQuestions.length} questions
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="h-9 w-9"
                  >
                    {pageNumber}
                  </Button>
                )
              }
              if (pageNumber === 2 || pageNumber === totalPages - 1) {
                return <span key={`ellipsis-${pageNumber}`}>...</span>
              }
              return null
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Select
              value={questionsPerPage.toString()}
              onValueChange={(value) => {
                setQuestionsPerPage(Number.parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-[70px]">
                <SelectValue placeholder={questionsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
        </div>
      )}

      {/* Add Question Dialog */}
      <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>Create a new question for the certification</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog open={isEditingQuestion} onOpenChange={setIsEditingQuestion}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>Update question details</DialogDescription>
          </DialogHeader>
          {currentQuestion && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-question-text">Question Text</Label>
                <Textarea
                  id="edit-question-text"
                  placeholder="Enter the question text..."
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label>Answer Options</Label>
                {currentQuestion.options.map((option: any, index: number) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                      {option.id.toUpperCase()}
                    </div>
                    <Input
                      placeholder={`Option ${option.id.toUpperCase()}`}
                      value={option.text}
                      onChange={(e) => {
                        const updatedOptions = [...currentQuestion.options]
                        updatedOptions[index].text = e.target.value
                        setCurrentQuestion({ ...currentQuestion, options: updatedOptions })
                      }}
                    />
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`edit-correct-${option.id}`}
                        name="edit-correct-option"
                        checked={currentQuestion.correctOption === option.id}
                        onChange={() => setCurrentQuestion({ ...currentQuestion, correctOption: option.id })}
                        className="mr-2"
                      />
                      <Label htmlFor={`edit-correct-${option.id}`} className="text-sm">
                        Correct
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-explanation">Explanation</Label>
                <Textarea
                  id="edit-explanation"
                  placeholder="Explain why the correct answer is right..."
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-domain">Domain</Label>
                <Select
                  value={currentQuestion.domain}
                  onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, domain: value })}
                >
                  <SelectTrigger id="edit-domain">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="role">Roles</SelectItem>
                    <SelectItem value="artifact">Artifacts</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingQuestion(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateQuestion}>Update Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Preview Dialog */}
      <Dialog open={showBulkPreview} onOpenChange={setShowBulkPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Excel Questions</DialogTitle>
            <DialogDescription>
              Review the questions before uploading. {bulkUploadPreview.length} questions found in the Excel file.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Correct Answer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bulkUploadPreview.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.question}</TableCell>
                      <TableCell>{item.domain}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-semibold">A:</span> {item["option a"]}
                          </p>
                          <p>
                            <span className="font-semibold">B:</span> {item["option b"]}
                          </p>
                          <p>
                            <span className="font-semibold">C:</span> {item["option c"]}
                          </p>
                          <p>
                            <span className="font-semibold">D:</span> {item["option d"]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="uppercase font-medium">{item["correct answer"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkPreview(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkUpload}>Upload {bulkUploadPreview.length} Questions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
