"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { useSubscription } from "@/lib/subscription-provider"
import {
  Clock,
  FileQuestion,
  BookOpen,
  ArrowLeft,
  LayoutGrid,
  ListChecks,
  BarChart3,
  Lock,
  CheckCircle,
  Coins,
} from "lucide-react"
import type { TestType } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

// Mock certification data
const certificationData = {
  psm: {
    id: "psm",
    name: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "/placeholder.svg?height=225&width=400&text=PSM",
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
    original_price: 199000,
    discount_price: 149000,
  },
  pspo: {
    id: "pspo",
    name: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "/placeholder.svg?height=225&width=400&text=PSPO",
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
    original_price: 199000,
    discount_price: null,
  },
  pmp: {
    id: "pmp",
    name: "Project Management Professional (PMP)",
    description: "Prepare for the globally recognized project management certification from PMI",
    image: "/placeholder.svg?height=225&width=400&text=PMP",
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
    original_price: 249000,
    discount_price: 199000,
  },
}

// Mock user progress data
const mockUserProgress = {
  psm: {
    testsCompleted: {
      short: 2,
      medium: 1,
      full: 0,
    },
    domainScores: {
      role: 78,
      artifact: 65,
      event: 82,
    },
    overallScore: 72,
  },
  pspo: {
    testsCompleted: {
      short: 1,
      medium: 0,
      full: 0,
    },
    domainScores: {
      role: 70,
      artifact: 60,
      event: 75,
    },
    overallScore: 68,
  },
  pmp: {
    testsCompleted: {
      short: 0,
      medium: 0,
      full: 0,
    },
    domainScores: {},
    overallScore: 0,
  },
}

export default function CertificationDetailPage({ params }: { params: { id: string } }) {
  const [selectedTestType, setSelectedTestType] = useState<TestType>("short")
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [showPremiumFeatureModal, setShowPremiumFeatureModal] = useState(false)
  const { user } = useAuth()
  const { hasAccess } = useSubscription()
  const { toast } = useToast()
  const router = useRouter()

  // Get certification data based on ID
  const certification = certificationData[params.id as keyof typeof certificationData]
  const userProgress = mockUserProgress[params.id as keyof typeof mockUserProgress]

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

  const handleTestTypeChange = (value: string) => {
    const testType = value as TestType
    const isTestTypePremium = certification.testTypes.find((type) => type.id === testType)?.isPremium

    if (isTestTypePremium && !hasAccess) {
      // Show premium feature modal but don't change the selected test type
      setShowPremiumFeatureModal(true)
    } else {
      // Only change the selected test type if user has access or it's not premium
      setSelectedTestType(testType)
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
      setShowPremiumFeatureModal(true)
      return
    }

    // Navigate to the test page
    router.push(`/take-test?certification=${params.id}&type=${selectedTestType}&domains=${selectedDomains.join(",")}`)
  }

  const handleSubscribe = () => {
    setShowPremiumFeatureModal(false)

    if (!user) {
      // Redirect to login page with return URL to subscription page
      router.push(`/login?redirect=/subscription?certification=${params.id}`)
      toast({
        title: "Login required",
        description: "Please log in to subscribe to premium features.",
        variant: "destructive",
      })
    } else {
      // User is logged in, redirect to subscription page
      router.push(`/subscription?certification=${params.id}`)
    }
  }

  // Calculate total tests completed
  const getTotalTestsCompleted = () => {
    if (!userProgress) return 0
    return Object.values(userProgress.testsCompleted).reduce((sum, count) => sum + count, 0)
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
        <div>
          <h1 className="text-3xl font-bold">{certification.name}</h1>
          <p className="text-muted-foreground mt-2">{certification.description}</p>
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
                  onValueChange={handleTestTypeChange}
                  className="grid gap-4 md:grid-cols-3"
                >
                  {certification.testTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem value={type.id} id={`test-type-${type.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`test-type-${type.id}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
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
                          <div className="mt-2 text-xs font-semibold text-primary flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Premium
                          </div>
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
              <Button onClick={handleStartTest} className="w-full" disabled={selectedDomains.length === 0}>
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
                    <p className="font-medium mb-2">Tests Completed</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {certification.testTypes.map((type) => (
                        <div key={type.id} className="flex justify-between">
                          <span>{type.name}:</span>
                          <span className="font-medium">{userProgress?.testsCompleted[type.id] || 0}</span>
                        </div>
                      ))}
                      <div className="flex justify-between col-span-2 border-t pt-1 mt-1">
                        <span>Total:</span>
                        <span className="font-bold">{getTotalTestsCompleted()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Domain Performance</p>
                    {Object.entries(userProgress?.domainScores || {}).length > 0 ? (
                      <div className="space-y-2">
                        {Object.entries(userProgress.domainScores).map(([domain, score]) => {
                          const domainName = certification.domains.find((d) => d.id === domain)?.name || domain
                          return (
                            <div key={domain} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{domainName}:</span>
                                <span className={score >= 70 ? "text-green-600" : "text-amber-600"}>{score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className={score >= 70 ? "bg-green-500 h-1.5" : "bg-amber-500 h-1.5"}
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                        <div className="pt-1 border-t mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Overall:</span>
                            <span className="font-bold">{userProgress.overallScore}%</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Complete a test to see domain performance</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Link href="/my-certifications">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
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

      {/* Premium Feature Modal */}
      <Dialog open={showPremiumFeatureModal} onOpenChange={setShowPremiumFeatureModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Premium Feature
            </DialogTitle>
            <DialogDescription>Premium test types are available exclusively to subscribers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="font-medium text-base mb-4">Subscription Details</h3>
              <div className="space-y-4">
                {/* Certification name and details */}
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-primary">{certification.name}</h4>

                  {/* Price display styled like certification cards */}
                  <div className="mt-3 flex items-center">
                    {certification.discount_price ? (
                      <>
                        <div className="flex flex-col">
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(certification.discount_price)}
                            </span>
                            <span className="text-sm ml-2 text-muted-foreground">/month</span>
                          </div>
                          <span className="text-sm line-through text-muted-foreground">
                            {formatPrice(certification.original_price)}
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
                            {formatPrice(certification.original_price)}
                          </span>
                          <span className="text-sm ml-2 text-muted-foreground">/month</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features list */}
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
