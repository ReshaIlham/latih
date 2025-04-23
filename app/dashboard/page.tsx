"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-provider"
import { useSubscription } from "@/lib/subscription-provider"
import { ArrowRight, BookOpen, Clock, BarChart3, Trophy, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for the dashboard
const recentTests = [
  {
    id: "test-1",
    certification: "Professional Scrum Master",
    date: "2023-10-15",
    score: 85,
    type: "medium",
  },
  {
    id: "test-2",
    certification: "Professional Scrum Product Owner",
    date: "2023-10-10",
    score: 92,
    type: "short",
  },
]

const recommendedCertifications = [
  {
    id: "psm",
    name: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    progress: 65,
    image: "/placeholder.svg?height=80&width=120&text=Professional+Scrum+Master",
  },
  {
    id: "pspo",
    name: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    progress: 30,
    image: "/placeholder.svg?height=80&width=120&text=Professional+Scrum+Product+Owner",
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

export default function DashboardPage() {
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
    <motion.div className="container" initial="hidden" animate="visible" variants={containerVariants}>
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
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Recent Tests
              </CardTitle>
              <CardDescription>Your latest practice test results</CardDescription>
            </CardHeader>
            <CardContent>
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
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        <span
                          className={
                            test.score >= 80 ? "text-green-500" : test.score >= 60 ? "text-amber-500" : "text-red-500"
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
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
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Recommended Certifications
              </CardTitle>
              <CardDescription>Based on your interests and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedCertifications.map((cert) => (
                  <div key={cert.id} className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.name}
                        width={120}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{cert.name}</h3>
                        {cert.progress > 0 && (
                          <span className="text-xs text-muted-foreground">{cert.progress}% complete</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{cert.description}</p>
                      {cert.progress > 0 && (
                        <Progress value={cert.progress} className="h-1" aria-label={`${cert.progress}% complete`} />
                      )}
                      <div className="flex justify-end">
                        <Link href={`/certifications/${cert.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 hover:text-primary">
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/certifications" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse All Certifications
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div className="mt-8" variants={itemVariants}>
        <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/certifications" className="w-full">
            <Button variant="outline" className="w-full justify-start gap-2">
              <BookOpen className="h-5 w-5" />
              Browse Certifications
            </Button>
          </Link>
          <Link href="/start-test" className="w-full">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Clock className="h-5 w-5" />
              Take a Practice Test
            </Button>
          </Link>
          <Link href="/analytics" className="w-full">
            <Button variant="outline" className="w-full justify-start gap-2">
              <BarChart3 className="h-5 w-5" />
              View Analytics
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
