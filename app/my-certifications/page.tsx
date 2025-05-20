"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import {
  BookOpen,
  Clock,
  BarChart3,
  Trophy,
  TrendingUp,
  Play,
  Calendar,
  Wallet,
  ExternalLink,
  ChevronRight,
  CreditCard,
  History,
  Coins,
} from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificationCard } from "@/components/certification-card"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for the dashboard
const recentTests = [
  {
    id: "test-1",
    certification: "Professional Scrum Master",
    certificationId: "psm",
    date: "2023-10-15",
    score: 85,
    type: "medium",
    completed: true,
  },
  {
    id: "test-2",
    certification: "Professional Scrum Product Owner",
    certificationId: "pspo",
    date: "2023-10-10",
    score: 92,
    type: "short",
    completed: true,
  },
  {
    id: "test-3",
    certification: "Project Management Professional",
    certificationId: "pmp",
    date: "2023-10-18",
    progress: 65, // Progress percentage
    type: "full",
    completed: false,
    questionsAnswered: 52,
    totalQuestions: 80,
    timeRemaining: "45 minutes",
  },
  {
    id: "test-4",
    certification: "SAFe Agilist",
    certificationId: "safe",
    date: "2023-10-05",
    score: 78,
    type: "medium",
    completed: true,
  },
  {
    id: "test-5",
    certification: "Certified ScrumMaster",
    certificationId: "csm",
    date: "2023-10-01",
    score: 88,
    type: "short",
    completed: true,
  },
  {
    id: "test-6",
    certification: "Professional Scrum Master",
    certificationId: "psm",
    date: "2023-09-25",
    score: 90,
    type: "full",
    completed: true,
  },
  {
    id: "test-7",
    certification: "Professional Scrum Product Owner",
    certificationId: "pspo",
    date: "2023-09-20",
    score: 82,
    type: "medium",
    completed: true,
  },
]

// Update the recommendedCertifications array with pricing information
const recommendedCertifications = [
  {
    id: "psm",
    title: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    questionCount: 120,
    domainCount: 3,
    testTypeCount: 3,
    original_price: 199000,
    discount_price: 149000,
    isPurchased: true,
    purchaseDate: "2023-09-01",
    expiryDate: "2024-09-01",
  },
  {
    id: "pspo",
    title: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
    questionCount: 95,
    domainCount: 3,
    testTypeCount: 3,
    original_price: 199000,
    discount_price: null,
    isPurchased: false,
  },
  {
    id: "pmp",
    title: "Project Management Professional (PMP)",
    description: "Comprehensive preparation for the PMP certification exam",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=2940&auto=format&fit=crop",
    questionCount: 150,
    domainCount: 4,
    testTypeCount: 3,
    original_price: 249000,
    discount_price: 199000,
    isPurchased: true,
    purchaseDate: "2023-08-15",
    expiryDate: "2024-08-15",
  },
  {
    id: "safe",
    title: "SAFe Agilist (SA)",
    description: "Learn how to lead a Lean-Agile enterprise using the Scaled Agile Framework",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop",
    questionCount: 180,
    domainCount: 5,
    testTypeCount: 3,
    original_price: 299000,
    discount_price: 249000,
    isPurchased: true,
    purchaseDate: "2023-07-20",
    expiryDate: "2024-07-20",
  },
  {
    id: "csm",
    title: "Certified ScrumMaster (CSM)",
    description: "Learn Scrum theory, practices, and rules, and how to protect the team from distractions",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop",
    questionCount: 110,
    domainCount: 3,
    testTypeCount: 3,
    original_price: 189000,
    discount_price: 159000,
    isPurchased: false,
    isPopular: true,
  },
]

// Mock user stats
const userStats = {
  testsCompleted: 12,
  totalTests: 15,
  averageScore: 78,
  studyTime: "8.5 hours",
}

// Mock mentoring credits data
const mentoringCredits = {
  available: 8,
  used: 12,
  total: 20,
  lastPurchase: "2023-10-05",
}

// Update the upcomingMentoringSessions array to include more entries
const upcomingMentoringSessions = [
  {
    id: "session-1",
    certification: "Professional Scrum Master",
    mentor: "Dr. Sarah Johnson",
    date: "2023-11-05",
    time: "10:00 AM",
    duration: 60,
  },
  {
    id: "session-2",
    certification: "Project Management Professional",
    mentor: "Prof. Michael Brown",
    date: "2023-11-10",
    time: "2:00 PM",
    duration: 90,
  },
  {
    id: "session-3",
    certification: "Professional Scrum Product Owner",
    mentor: "Dr. Emily Roberts",
    date: "2023-11-12",
    time: "11:30 AM",
    duration: 60,
  },
  {
    id: "session-4",
    certification: "Professional Scrum Master",
    mentor: "Dr. Sarah Johnson",
    date: "2023-11-15",
    time: "3:00 PM",
    duration: 45,
  },
  {
    id: "session-5",
    certification: "Project Management Professional",
    mentor: "Prof. Michael Brown",
    date: "2023-11-18",
    time: "9:00 AM",
    duration: 120,
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
  const router = useRouter()
  const [subscribedCertifications, setSubscribedCertifications] = useState([])
  const isMobile = useMobile()

  useEffect(() => {
    // Include all certifications for the example
    setSubscribedCertifications(recommendedCertifications)
  }, [])

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

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get only the 5 most recent tests
  const recentTestsLimited = recentTests.slice(0, 5)

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container pt-10 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6">
        {/* Header Section with User Welcome and Stats */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-0"
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                Welcome back, <span className="text-primary">{user.name}</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track your progress and continue your certification journey
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 sm:gap-4"
            >
              <Link href="/certifications">
                <Button size={isMobile ? "sm" : "default"} className="gap-2 text-xs sm:text-sm">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  Browse Certifications
                </Button>
              </Link>
              <Link href="/mentoring">
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  Schedule Mentoring
                </Button>
              </Link>
              {/* New Payment History button */}
              <Link href="/payment-history">
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 text-xs sm:text-sm">
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                  Payment History
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8"
        >
          <Card className="bg-white/50 backdrop-blur-sm border-primary/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                  <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Tests Completed</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {userStats.testsCompleted}/{userStats.totalTests}
                  </h3>
                </div>
              </div>
              <div className="text-xs flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-primary/10 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                  <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Average Score</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{userStats.averageScore}%</h3>
                </div>
              </div>
              <div className="text-xs flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-primary/10 hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Study Time</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{userStats.studyTime}</h3>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">This week</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs - Removed Payments tab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="certifications" className="w-full">
            <TabsList className={`w-full ${isMobile ? "flex" : "grid grid-cols-3"} mb-4 sm:mb-6`}>
              <TabsTrigger value="certifications" className={isMobile ? "text-xs py-1.5 flex-1" : ""}>
                {isMobile ? "Certifications" : "Your Certifications"}
              </TabsTrigger>
              <TabsTrigger value="tests" className={isMobile ? "text-xs py-1.5 flex-1" : ""}>
                Recent Tests
              </TabsTrigger>
              <TabsTrigger value="mentoring" className={isMobile ? "text-xs py-1.5 flex-1" : ""}>
                Mentoring
              </TabsTrigger>
            </TabsList>

            {/* Your Certifications Tab */}
            <TabsContent value="certifications" className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">Your Certifications</h2>
                <Link href="/certifications">
                  <Button variant="ghost" size="sm" className="gap-1 text-primary text-xs sm:text-sm">
                    Browse All
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Subscribed certifications */}
                {subscribedCertifications
                  .filter((cert) => cert.isPurchased)
                  .map((cert) => (
                    <CertificationCard
                      key={cert.id}
                      id={cert.id}
                      title={cert.title}
                      image={cert.image}
                      description={cert.description}
                      questionCount={cert.questionCount}
                      domainCount={cert.domainCount}
                      testTypeCount={cert.testTypeCount}
                      original_price={cert.original_price}
                      discount_price={cert.discount_price}
                      isPurchased={cert.isPurchased}
                      expiryDate={formatDate(cert.expiryDate)}
                      buttonText="Continue Learning"
                      hideExtendButton={true}
                      hidePricing={true}
                      hidePopularBadge={true}
                    />
                  ))}

                {/* Non-subscribed certification example - Changed button text to "Continue Learning" */}
                <CertificationCard
                  id="csm"
                  title="Certified ScrumMaster (CSM)"
                  image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop"
                  description="Learn Scrum theory, practices, and rules, and how to protect the team from distractions"
                  questionCount={110}
                  domainCount={3}
                  testTypeCount={3}
                  original_price={189000}
                  discount_price={159000}
                  isPurchased={false}
                  buttonText="Continue Learning"
                  hidePricing={true}
                  hidePopularBadge={true}
                />
              </div>

              {/* Update the recommended certifications section */}
              <div className="mt-4 sm:mt-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {recommendedCertifications
                    .filter((cert) => !cert.isPurchased)
                    .map((cert) => (
                      <CertificationCard
                        key={cert.id}
                        id={cert.id}
                        title={cert.title}
                        image={cert.image}
                        description={cert.description}
                        questionCount={cert.questionCount}
                        domainCount={cert.domainCount}
                        testTypeCount={cert.testTypeCount}
                        original_price={cert.original_price}
                        discount_price={cert.discount_price}
                        isPurchased={cert.isPurchased}
                        buttonText="Start For Free Now"
                      />
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Recent Tests Tab */}
            <TabsContent value="tests" className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">Recent Tests</h2>
                <Link href={`/test-history/${user.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary text-xs sm:text-sm">
                    View All Tests
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {recentTestsLimited.map((test) => (
                  <Card key={test.id} className="overflow-hidden hover:shadow-md transition-all duration-200">
                    <CardContent className="p-3 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <h3 className="font-bold text-base sm:text-lg">{test.certification}</h3>
                          <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {formatDate(test.date)}
                            <span className="mx-1 sm:mx-2">•</span>
                            <span className="capitalize">{test.type} test</span>
                          </div>
                          {!test.completed && (
                            <div className="mt-2">
                              <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mb-1">
                                <div
                                  className="bg-primary h-1.5 sm:h-2 rounded-full"
                                  style={{ width: `${test.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  {test.questionsAnswered}/{test.totalQuestions} questions
                                </span>
                                <span>{test.timeRemaining} remaining</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
                          {test.completed ? (
                            <>
                              <div className="text-center">
                                <div
                                  className={`text-xl sm:text-2xl font-bold ${
                                    test.score >= 80
                                      ? "text-green-500"
                                      : test.score >= 60
                                        ? "text-amber-500"
                                        : "text-red-500"
                                  }`}
                                >
                                  {test.score}%
                                </div>
                                <div className="text-xs text-muted-foreground">Score</div>
                              </div>
                              <Link href={`/test-results/${test.id}`}>
                                <Button size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm">
                                  View Details
                                </Button>
                              </Link>
                            </>
                          ) : (
                            <Link
                              href={`/take-test?certification=${test.certificationId}&type=${test.type}&testId=${test.id}&continue=true`}
                            >
                              <Button size={isMobile ? "sm" : "default"} className="gap-2 text-xs sm:text-sm">
                                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                                Continue Test
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Mentoring Tab */}
            <TabsContent value="mentoring" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        Mentoring Credits
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Your available mentoring session credits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">Available Credits</p>
                          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                            {mentoringCredits.available}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-muted-foreground">Total Credits</p>
                          <p className="text-base sm:text-lg md:text-xl font-semibold">{mentoringCredits.total}</p>
                        </div>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2 sm:h-2.5 mb-3 sm:mb-4">
                        <div
                          className="bg-primary h-2 sm:h-2.5 rounded-full"
                          style={{ width: `${(mentoringCredits.used / mentoringCredits.total) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs sm:text-sm mb-3 sm:mb-4">
                        <span>Used: {mentoringCredits.used}</span>
                        <span>Available: {mentoringCredits.available}</span>
                      </div>

                      <div className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                        <p>Last purchase: {formatDate(mentoringCredits.lastPurchase)}</p>
                      </div>

                      <div>
                        <div className="mb-4">
                          <Link href="/mentoring/buy-credits">
                            <Button
                              size={isMobile ? "sm" : "default"}
                              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm"
                            >
                              <Coins className="h-3 w-3 sm:h-4 sm:w-4" />
                              Buy More Credits
                            </Button>
                          </Link>
                        </div>
                        <div>
                          <Link href="/mentoring/credit-history">
                            <Button
                              variant="outline"
                              size={isMobile ? "sm" : "default"}
                              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm"
                            >
                              <History className="h-3 w-3 sm:h-4 sm:w-4" />
                              View Credit History
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 pb-2 sm:pb-3">
                      <div>
                        <CardTitle className="flex items-center text-base sm:text-lg">
                          <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          Upcoming Mentoring Sessions
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Your scheduled mentoring sessions
                        </CardDescription>
                      </div>
                      <Link href="/mentoring" className="mt-2 sm:mt-0">
                        <Button variant="outline" size="sm" className="gap-1 text-xs sm:text-sm">
                          <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Schedule
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
                      {upcomingMentoringSessions.length > 0 ? (
                        <div className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[350px] overflow-y-auto pr-1 sm:pr-2">
                          {upcomingMentoringSessions.map((session) => (
                            <Card key={session.id} className="bg-muted/30">
                              <CardContent className="p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                                  <div>
                                    <h4 className="font-medium text-sm sm:text-base">{session.certification}</h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground">with {session.mentor}</p>
                                  </div>
                                  <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="text-center">
                                      <p className="font-medium text-xs sm:text-sm">{formatDate(session.date)}</p>
                                      <p className="text-xs text-muted-foreground">{session.time}</p>
                                    </div>
                                    <div className="flex items-center bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                      <Clock className="h-3 w-3 mr-1 text-primary" />
                                      <span className="text-xs">{session.duration} min</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
                          <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No upcoming sessions</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
