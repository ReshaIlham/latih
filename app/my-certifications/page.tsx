"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { useSubscription } from "@/lib/subscription-provider"
import { ArrowRight, BookOpen, Clock, BarChart3, Trophy, TrendingUp, ListChecks, LayoutGrid, Play } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for the dashboard
const recentTests = [
  {
    id: "test-1",
    certification: "Professional Scrum Master",
    date: "2023-10-15",
    score: 85,
    type: "medium",
    completed: true,
  },
  {
    id: "test-2",
    certification: "Professional Scrum Product Owner",
    date: "2023-10-10",
    score: 92,
    type: "short",
    completed: true,
  },
  {
    id: "test-3",
    certification: "Project Management Professional",
    date: "2023-10-18",
    progress: 65, // Progress percentage
    type: "full",
    completed: false,
    questionsAnswered: 52,
    totalQuestions: 80,
    timeRemaining: "45 minutes",
  },
]

const recommendedCertifications = [
  {
    id: "psm",
    title: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "/placeholder.svg?height=80&width=120&text=PSM",
    questionCount: 120,
    domainCount: 3,
    testTypeCount: 3,
  },
  {
    id: "pspo",
    title: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "/placeholder.svg?height=80&width=120&text=PSPO",
    questionCount: 95,
    domainCount: 3,
    testTypeCount: 3,
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

export default function MyCertificationsPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { status, hasAccess } = useSubscription()
  const router = useRouter()

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

  return (
    <motion.div className="container py-10 md:py-16" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-primary">{user.name}</span>
        </h1>
        <p className="text-muted-foreground">Track your progress and continue your certification journey</p>
      </motion.div>

      {/* Subscription Status */}
      {!hasAccess && (
        <motion.div variants={itemVariants}>
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Upgrade Your Plan</CardTitle>
              <CardDescription>Get full access to all certifications and test types</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                You are currently on the <span className="font-semibold">{status.tier}</span> plan. Upgrade to unlock
                more features and certifications.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/pricing">
                <Button>View Plans</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      <motion.div className="grid gap-6 md:grid-cols-3" variants={containerVariants}>
        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Trophy className="mr-2 h-4 w-4 text-primary" />
                Tests Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +2 from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5 hours</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Recent Tests */}
        <motion.div variants={itemVariants}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Recent Tests
              </CardTitle>
              <CardDescription>Your latest practice test results</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{test.certification}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{new Date(test.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{test.type} test</span>
                      </div>
                      {!test.completed && (
                        <div className="mt-1 text-xs text-primary">
                          {test.questionsAnswered}/{test.totalQuestions} questions • {test.timeRemaining} remaining
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {test.completed ? (
                        <>
                          <div className="text-lg font-bold">
                            <span
                              className={
                                test.score >= 80
                                  ? "text-green-500"
                                  : test.score >= 60
                                    ? "text-amber-500"
                                    : "text-red-500"
                              }
                            >
                              {test.score}%
                            </span>
                          </div>
                          <Link href={`/test-results/${test.id}`}>
                            <Button variant="ghost" size="sm" className="hover:text-primary">
                              View Details
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href={`/test?id=${test.id}&continue=true`}>
                            <Button size="sm" className="gap-1">
                              <Play className="h-3 w-3" />
                              Continue
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href="/test-history" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Tests
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Recommended Certifications */}
        <motion.div variants={itemVariants}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Recommended Certifications
              </CardTitle>
              <CardDescription>Based on your interests and progress</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {recommendedCertifications.map((cert) => (
                  <div key={cert.id} className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.title}
                        width={120}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{cert.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <BookOpen className="mr-1 h-3 w-3 text-primary" />
                          <span>{cert.questionCount} Questions</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ListChecks className="mr-1 h-3 w-3 text-primary" />
                          <span>{cert.domainCount} Domains</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <LayoutGrid className="mr-1 h-3 w-3 text-primary" />
                          <span>{cert.testTypeCount} Test Types</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/certifications/${cert.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 hover:text-primary">
                            Start Practicing
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href="/certifications" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse All Certifications
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
