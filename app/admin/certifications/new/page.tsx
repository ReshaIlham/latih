"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { Plus, Minus, Upload } from "lucide-react"
import { BackButton } from "@/components/back-button"

// Types
type CertificationStatus = "active" | "not-active" | "coming-soon"
type Domain = {
  id: string
  name: string
}
type TestType = {
  id: string
  name: string
  timeLimit: number
  questionCount: number
  passingGrade: number
}

export default function NewCertificationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [newCertification, setNewCertification] = useState<{
    name: string
    description: string
    image: string
    coverImage: string | null
    status: CertificationStatus
    domains: Domain[]
    testTypes: TestType[]
  }>({
    name: "",
    description: "",
    image: "/placeholder.svg?height=200&width=360&text=New+Certification",
    coverImage: null,
    status: "not-active",
    domains: [],
    testTypes: [],
  })
  const [newDomain, setNewDomain] = useState<string>("")
  const [newTestType, setNewTestType] = useState<Omit<TestType, "id">>({
    name: "",
    timeLimit: 30,
    questionCount: 0,
    passingGrade: 70,
  })

  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleAddCertification = async () => {
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to create certifications.",
        variant: "destructive",
      })
      return
    }

    if (!newCertification.name || newCertification.domains.length === 0 || newCertification.testTypes.length === 0) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields and add at least one domain and test type.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Certification created",
        description: `${newCertification.name} certification has been created successfully.`,
      })
      router.push("/admin/certifications")
    } catch (error) {
      toast({
        title: "Failed to create certification",
        description: "There was a problem creating the certification.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDomain = () => {
    if (!newDomain) {
      toast({
        title: "Invalid domain",
        description: "Please provide a domain name.",
        variant: "destructive",
      })
      return
    }

    setNewCertification({
      ...newCertification,
      domains: [
        ...newCertification.domains,
        {
          id: `domain-${Date.now()}`,
          name: newDomain,
        },
      ],
    })

    setNewDomain("")
  }

  const handleRemoveDomain = (domainId: string) => {
    setNewCertification({
      ...newCertification,
      domains: newCertification.domains.filter((domain) => domain.id !== domainId),
    })
  }

  const handleAddTestType = () => {
    if (
      !newTestType.name ||
      newTestType.questionCount <= 0 ||
      newTestType.timeLimit <= 0 ||
      newTestType.passingGrade <= 0
    ) {
      toast({
        title: "Invalid test type",
        description: "Please provide a test name, valid question count, time limit, and passing grade.",
        variant: "destructive",
      })
      return
    }

    if (newTestType.passingGrade > 100) {
      toast({
        title: "Invalid passing grade",
        description: "Passing grade cannot be greater than 100%.",
        variant: "destructive",
      })
      return
    }

    setNewCertification({
      ...newCertification,
      testTypes: [
        ...newCertification.testTypes,
        {
          id: `test-${Date.now()}`,
          name: newTestType.name,
          timeLimit: newTestType.timeLimit,
          questionCount: newTestType.questionCount,
          passingGrade: newTestType.passingGrade,
        },
      ],
    })

    setNewTestType({
      name: "",
      timeLimit: 30,
      questionCount: 0,
      passingGrade: 70,
    })
  }

  const handleRemoveTestType = (testTypeId: string) => {
    setNewCertification({
      ...newCertification,
      testTypes: newCertification.testTypes.filter((test) => test.id !== testTypeId),
    })
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setNewCertification({
            ...newCertification,
            coverImage: event.target.result,
          })
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <BackButton href="/admin/certifications" />
        <h1 className="mt-6 text-3xl font-bold">Add New Certification</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Information */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Certification Name
                </label>
                <Input
                  id="name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  placeholder="e.g., Professional Scrum Master"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newCertification.description}
                  onChange={(e) => setNewCertification({ ...newCertification, description: e.target.value })}
                  placeholder="Brief description of the certification"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={newCertification.status}
                  onValueChange={(value: CertificationStatus) =>
                    setNewCertification({ ...newCertification, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="not-active">Not Active</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex flex-col gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4">
                    {newCertification.coverImage ? (
                      <div className="relative w-full h-48 rounded-md overflow-hidden">
                        <Image
                          src={newCertification.coverImage || "/placeholder.svg"}
                          alt="Cover image preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">No cover image selected</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById("cover-image-upload")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {newCertification.coverImage ? "Change Cover Image" : "Upload Cover Image"}
                      </Button>
                      <input
                        id="cover-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                      {newCertification.coverImage && (
                        <Button
                          type="button"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setNewCertification({ ...newCertification, coverImage: null })}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200 x 600 pixels. Max file size: 2MB.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Domains</CardTitle>
              <CardDescription>Add knowledge domains for this certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Input placeholder="Domain name" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} />
                  <Button type="button" onClick={handleAddDomain}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Domain
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="p-4">
                  <h3 className="font-medium">Domains</h3>
                  {newCertification.domains.length === 0 ? (
                    <p className="text-sm text-muted-foreground mt-2">No domains added yet.</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {newCertification.domains.map((domain) => (
                        <div key={domain.id} className="flex items-center justify-between rounded-md border p-2">
                          <p className="font-medium">{domain.name}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveDomain(domain.id)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Types</CardTitle>
              <CardDescription>Configure different test types for this certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input
                    placeholder="Test name"
                    value={newTestType.name}
                    onChange={(e) => setNewTestType({ ...newTestType, name: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Time Limit (minutes)</label>
                      <Input
                        type="number"
                        min="1"
                        value={newTestType.timeLimit || ""}
                        onChange={(e) =>
                          setNewTestType({ ...newTestType, timeLimit: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Question Count</label>
                      <Input
                        type="number"
                        min="1"
                        value={newTestType.questionCount || ""}
                        onChange={(e) =>
                          setNewTestType({ ...newTestType, questionCount: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Passing Grade (%)</label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={newTestType.passingGrade || ""}
                        onChange={(e) =>
                          setNewTestType({ ...newTestType, passingGrade: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={handleAddTestType}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test Type
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="p-4">
                  <h3 className="font-medium">Test Types</h3>
                  {newCertification.testTypes.length === 0 ? (
                    <p className="text-sm text-muted-foreground mt-2">No test types added yet.</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {newCertification.testTypes.map((test) => (
                        <div key={test.id} className="flex items-center justify-between rounded-md border p-2">
                          <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {test.questionCount} questions | {test.timeLimit} minutes | {test.passingGrade}% to pass
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTestType(test.id)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Certification Details</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {newCertification.name ? newCertification.name : "No name provided"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Status: {newCertification.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Domains</h3>
                {newCertification.domains.length === 0 ? (
                  <p className="text-sm text-muted-foreground mt-1">No domains added</p>
                ) : (
                  <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                    {newCertification.domains.map((domain) => (
                      <li key={domain.id}>{domain.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium">Test Types</h3>
                {newCertification.testTypes.length === 0 ? (
                  <p className="text-sm text-muted-foreground mt-1">No test types added</p>
                ) : (
                  <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                    {newCertification.testTypes.map((test) => (
                      <li key={test.id}>
                        {test.name} ({test.questionCount} questions, {test.timeLimit} min, {test.passingGrade}% to pass)
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleAddCertification}
                disabled={
                  isLoading ||
                  !newCertification.name ||
                  newCertification.domains.length === 0 ||
                  newCertification.testTypes.length === 0
                }
              >
                {isLoading ? "Creating..." : "Create Certification"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
