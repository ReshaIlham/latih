"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { useSubscription } from "@/lib/subscription-provider"
import { Clock, FileQuestion, BookOpen, ArrowLeft, LayoutGrid, ListChecks } from "lucide-react"
import type { TestType } from "@/lib/types"

// Mock certification data
const certificationData = {
  psm: {
    id: "psm",
    name: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "/images/psm-certification.jpg",
    questionCount: 120,
    domains: [
      { id: "role", name: "Roles" },
      { id: "artifact", name: "Artifacts" },
      { id: "event", name: "Events" },
    ],
    testTypes: [
      { id: "short", name: "Short Test", questions: 10, time: 15, isPremium: false },
      { id: "medium", name: "Medium Test", questions: 30, time: 45, isPremium: true },
      { id: "full", name: "Full Test", questions: 80, time: 120, isPremium: true },
    ],
  },
  pspo: {
    id: "pspo",
    name: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "/images/pspo-certification.jpg",
    questionCount: 95,
    domains: [
      { id: "role", name: "Roles" },
      { id: "artifact", name: "Artifacts" },
      { id: "event", name: "Events" },
    ],
    testTypes: [
      { id: "short", name: "Short Test", questions: 10, time: 15, isPremium: false },
      { id: "medium", name: "Medium Test", questions: 30, time: 45, isPremium: true },
      { id: "full", name: "Full Test", questions: 80, time: 120, isPremium: true },
    ],
  },
  pmp: {
    id: "pmp",
    name: "Project Management Professional (PMP)",
    description: "Prepare for the globally recognized project management certification from PMI",
    image: "/images/pmp-certification.jpg",
    questionCount: 200,
    domains: [
      { id: "role", name: "Roles" },
      { id: "artifact", name: "Artifacts" },
      { id: "event", name: "Events" },
      { id: "process", name: "Processes" },
    ],
    testTypes: [
      { id: "short", name: "Short Test", questions: 10, time: 15, isPremium: false },
      { id: "medium", name: "Medium Test", questions: 30, time: 45, isPremium: true },
      { id: "full", name: "Full Test", questions: 80, time: 120, isPremium: true },
    ],
  },
}

export default function CertificationDetailPage({ params }: { params: { id: string } }) {
  const [selectedTestType, setSelectedTestType] = useState<TestType>("short")
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const { user } = useAuth()
  const { hasAccess } = useSubscription()
  const { toast } = useToast()
  const router = useRouter()

  // Get certification data based on ID
  const certification = certificationData[params.id as keyof typeof certificationData]

  if (!certification) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Certification not found</h1>
          <p className="mt-4">The certification you're looking for doesn't exist.</p>
          <Link href="/certifications">
            <Button className="mt-6">Back to Certifications</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDomainChange = (domain: string, checked: boolean) => {
    if (checked) {
      setSelectedDomains([...selectedDomains, domain])
    } else {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain))
    }
  }

  const handleStartTest = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to start a practice test.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (selectedDomains.length === 0) {
      toast({
        title: "Domain selection required",
        description: "Please select at least one domain for your test.",
        variant: "destructive",
      })
      return
    }

    const isPremiumTest = certification.testTypes.find((type) => type.id === selectedTestType)?.isPremium

    if (isPremiumTest && !hasAccess) {
      toast({
        title: "Premium content",
        description: "Please upgrade your subscription to access this test type.",
        variant: "destructive",
      })
      router.push("/pricing")
      return
    }

    // Navigate to the test page
    router.push(`/test?certification=${params.id}&type=${selectedTestType}&domains=${selectedDomains.join(",")}`)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/certifications">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Certifications
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Image
              src={certification.image || "/placeholder.svg"}
              alt={certification.name}
              width={400}
              height={225}
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{certification.name}</h1>
            <p className="text-muted-foreground mt-2">{certification.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Start a Practice Test</CardTitle>
              <CardDescription>Choose your test type and domain focus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Select Test Type</h3>
                <RadioGroup
                  value={selectedTestType}
                  onValueChange={(value) => setSelectedTestType(value as TestType)}
                  className="grid gap-4 md:grid-cols-3"
                >
                  {certification.testTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem
                        value={type.id}
                        id={`test-type-${type.id}`}
                        className="peer sr-only"
                        disabled={type.isPremium && !hasAccess}
                      />
                      <Label
                        htmlFor={`test-type-${type.id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                      >
                        <div className="mb-2 text-center font-semibold">{type.name}</div>
                        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <FileQuestion className="mr-1 h-4 w-4" />
                            {type.questions} questions
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {type.time} minutes
                          </div>
                        </div>
                        {type.isPremium && !hasAccess && (
                          <div className="mt-2 text-xs font-semibold text-primary">Premium</div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Select Domain Focus</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {certification.domains.map((domain) => (
                    <div key={domain.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`domain-${domain.id}`}
                        checked={selectedDomains.includes(domain.id)}
                        onCheckedChange={(checked) => handleDomainChange(domain.id, checked === true)}
                      />
                      <Label htmlFor={`domain-${domain.id}`} className="font-medium">
                        {domain.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedDomains.length === 0 && (
                  <p className="text-sm text-muted-foreground">Please select at least one domain</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartTest} className="w-full">
                Start Practice Test
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certification Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Total Questions</p>
                  <p className="text-sm text-muted-foreground">{certification.questionCount} practice questions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Domains Covered</p>
                  <p className="text-sm text-muted-foreground">{certification.domains.length} specialized domains</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Test Types</p>
                  <p className="text-sm text-muted-foreground">
                    {certification.testTypes.length} different test formats
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <>
                  <div>
                    <p className="font-medium">Tests Completed</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div>
                    <p className="font-medium">Average Score</p>
                    <p className="text-2xl font-bold">72%</p>
                  </div>
                  <div className="pt-2">
                    <Link href={`/analytics?certification=${params.id}`}>
                      <Button variant="outline" className="w-full">
                        View Detailed Analytics
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">Log in to track your progress</p>
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
