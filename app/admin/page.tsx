"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-provider"
import {
  Users,
  FileQuestion,
  BarChart3,
  TrendingUp,
  Award,
  BookOpenCheck,
  Clock,
  User,
  CheckCircle,
  Coins,
  CreditCard,
  DollarSign,
  ArrowRight,
  CalendarIcon,
} from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts"

// First, add the import for framer-motion at the top of the file
import { motion } from "framer-motion"

// Available years for the filter
const availableYears = ["2023", "2024", "2025"]

// Mock data for the admin dashboard
const platformStats = {
  "2023": {
    totalUsers: 8500,
    totalCertifications: 6,
    totalQuestions: 350,
    totalTestsTaken: 2180,
    averageScore: 72,
    totalCredits: 950,
    creditsUsed: 680,
    averageCLTV: 185000,
    cltvChange: 12.3, // percentage
    totalRevenue: 28600000,
    revenueChange: 10.5, // percentage
  },
  "2024": {
    totalUsers: 12500,
    totalCertifications: 8,
    totalQuestions: 450,
    totalTestsTaken: 3280,
    averageScore: 76,
    totalCredits: 1450,
    creditsUsed: 980,
    averageCLTV: 225000,
    cltvChange: 15.3, // percentage
    totalRevenue: 45600000,
    revenueChange: 12.5, // percentage
  },
  "2025": {
    totalUsers: 18200,
    totalCertifications: 10,
    totalQuestions: 580,
    totalTestsTaken: 4750,
    averageScore: 78,
    totalCredits: 2100,
    creditsUsed: 1450,
    averageCLTV: 265000,
    cltvChange: 17.8, // percentage
    totalRevenue: 68900000,
    revenueChange: 14.2, // percentage
  },
}

// Monthly revenue growth data
const revenueGrowthData = {
  "2023": [
    { month: "Jan", subscriptions: 2500000, credits: 800000 },
    { month: "Feb", subscriptions: 2600000, credits: 900000 },
    { month: "Mar", subscriptions: 2700000, credits: 850000 },
    { month: "Apr", subscriptions: 2900000, credits: 1000000 },
    { month: "May", subscriptions: 3100000, credits: 950000 },
    { month: "Jun", subscriptions: 3300000, credits: 1200000 },
    { month: "Jul", subscriptions: 3600000, credits: 1300000 },
    { month: "Aug", subscriptions: 3900000, credits: 1400000 },
    { month: "Sep", subscriptions: 4200000, credits: 1500000 },
    { month: "Oct", subscriptions: 4500000, credits: 1600000 },
    { month: "Nov", subscriptions: 4800000, credits: 1700000 },
    { month: "Dec", subscriptions: 5200000, credits: 1800000 },
  ],
  "2024": [
    { month: "Jan", subscriptions: 4500000, credits: 1200000 },
    { month: "Feb", subscriptions: 4700000, credits: 1500000 },
    { month: "Mar", subscriptions: 4900000, credits: 1400000 },
    { month: "Apr", subscriptions: 5300000, credits: 1800000 },
    { month: "May", subscriptions: 5900000, credits: 1600000 },
    { month: "Jun", subscriptions: 6300000, credits: 2100000 },
    { month: "Jul", subscriptions: 7100000, credits: 2400000 },
    { month: "Aug", subscriptions: 7900000, credits: 2600000 },
    { month: "Sep", subscriptions: 8700000, credits: 2900000 },
    { month: "Oct", subscriptions: 9300000, credits: 3100000 },
    { month: "Nov", subscriptions: 10100000, credits: 3400000 },
    { month: "Dec", subscriptions: 11200000, credits: 3800000 },
  ],
  "2025": [
    { month: "Jan", subscriptions: 6800000, credits: 1800000 },
    { month: "Feb", subscriptions: 7100000, credits: 2200000 },
    { month: "Mar", subscriptions: 7400000, credits: 2100000 },
    { month: "Apr", subscriptions: 8000000, credits: 2700000 },
    { month: "May", subscriptions: 8900000, credits: 2400000 },
    { month: "Jun", subscriptions: 9500000, credits: 3200000 },
    { month: "Jul", subscriptions: 10700000, credits: 3600000 },
    { month: "Aug", subscriptions: 11900000, credits: 3900000 },
    { month: "Sep", subscriptions: 13100000, credits: 4400000 },
    { month: "Oct", subscriptions: 14000000, credits: 4700000 },
    { month: "Nov", subscriptions: 15200000, credits: 5100000 },
    { month: "Dec", subscriptions: 16900000, credits: 5700000 },
  ],
}

// User conversion funnel data
const userConversionData = {
  "2023": [
    { month: "Jan", registered: 250, active: 180, purchased: 80 },
    { month: "Feb", registered: 270, active: 210, purchased: 100 },
    { month: "Mar", registered: 290, active: 230, purchased: 120 },
    { month: "Apr", registered: 320, active: 260, purchased: 150 },
    { month: "May", registered: 340, active: 280, purchased: 170 },
    { month: "Jun", registered: 360, active: 300, purchased: 190 },
    { month: "Jul", registered: 380, active: 320, purchased: 210 },
    { month: "Aug", registered: 400, active: 340, purchased: 230 },
    { month: "Sep", registered: 420, active: 360, purchased: 250 },
    { month: "Oct", registered: 440, active: 380, purchased: 270 },
    { month: "Nov", registered: 460, active: 400, purchased: 290 },
    { month: "Dec", registered: 480, active: 420, purchased: 310 },
  ],
  "2024": [
    { month: "Jan", registered: 350, active: 280, purchased: 120 },
    { month: "Feb", registered: 380, active: 310, purchased: 150 },
    { month: "Mar", registered: 410, active: 330, purchased: 180 },
    { month: "Apr", registered: 450, active: 360, purchased: 220 },
    { month: "May", registered: 480, active: 390, purchased: 250 },
    { month: "Jun", registered: 510, active: 420, purchased: 280 },
    { month: "Jul", registered: 540, active: 450, purchased: 310 },
    { month: "Aug", registered: 570, active: 480, purchased: 340 },
    { month: "Sep", registered: 600, active: 510, purchased: 370 },
    { month: "Oct", registered: 630, active: 540, purchased: 400 },
    { month: "Nov", registered: 660, active: 570, purchased: 430 },
    { month: "Dec", registered: 690, active: 600, purchased: 460 },
  ],
  "2025": [
    { month: "Jan", registered: 530, active: 420, purchased: 180 },
    { month: "Feb", registered: 570, active: 470, purchased: 230 },
    { month: "Mar", registered: 620, active: 500, purchased: 270 },
    { month: "Apr", registered: 680, active: 540, purchased: 330 },
    { month: "May", registered: 720, active: 590, purchased: 380 },
    { month: "Jun", registered: 770, active: 630, purchased: 420 },
    { month: "Jul", registered: 810, active: 680, purchased: 470 },
    { month: "Aug", registered: 860, active: 720, purchased: 510 },
    { month: "Sep", registered: 900, active: 770, purchased: 560 },
    { month: "Oct", registered: 950, active: 810, purchased: 600 },
    { month: "Nov", registered: 990, active: 860, purchased: 650 },
    { month: "Dec", registered: 1040, active: 900, purchased: 690 },
  ],
}

// Monthly credit usage data
const creditUsageData = {
  "2023": [
    { month: "Jan", purchased: 50, used: 40 },
    { month: "Feb", purchased: 80, used: 60 },
    { month: "Mar", purchased: 70, used: 55 },
    { month: "Apr", purchased: 100, used: 80 },
    { month: "May", purchased: 90, used: 75 },
    { month: "Jun", purchased: 120, used: 95 },
    { month: "Jul", purchased: 130, used: 110 },
    { month: "Aug", purchased: 150, used: 125 },
    { month: "Sep", purchased: 160, used: 130 },
    { month: "Oct", purchased: 170, used: 140 },
    { month: "Nov", purchased: 180, used: 150 },
    { month: "Dec", purchased: 200, used: 170 },
  ],
  "2024": [
    { month: "Jan", purchased: 80, used: 65 },
    { month: "Feb", purchased: 120, used: 90 },
    { month: "Mar", purchased: 100, used: 85 },
    { month: "Apr", purchased: 150, used: 120 },
    { month: "May", purchased: 130, used: 110 },
    { month: "Jun", purchased: 170, used: 140 },
    { month: "Jul", purchased: 190, used: 160 },
    { month: "Aug", purchased: 210, used: 180 },
    { month: "Sep", purchased: 230, used: 190 },
    { month: "Oct", purchased: 250, used: 210 },
    { month: "Nov", purchased: 270, used: 230 },
    { month: "Dec", purchased: 300, used: 250 },
  ],
  "2025": [
    { month: "Jan", purchased: 120, used: 100 },
    { month: "Feb", purchased: 180, used: 140 },
    { month: "Mar", purchased: 150, used: 130 },
    { month: "Apr", purchased: 230, used: 180 },
    { month: "May", purchased: 200, used: 170 },
    { month: "Jun", purchased: 260, used: 210 },
    { month: "Jul", purchased: 290, used: 240 },
    { month: "Aug", purchased: 320, used: 270 },
    { month: "Sep", purchased: 350, used: 290 },
    { month: "Oct", purchased: 380, used: 320 },
    { month: "Nov", purchased: 410, used: 350 },
    { month: "Dec", purchased: 450, used: 380 },
  ],
}

// Revenue by certification data
const revenueByCertificationData = {
  "2023": [
    { month: "Jan", PSM: 1500000, PSPO: 1000000, PMP: 800000 },
    { month: "Feb", PSM: 1600000, PSPO: 1100000, PMP: 900000 },
    { month: "Mar", PSM: 1700000, PSPO: 1200000, PMP: 1000000 },
    { month: "Apr", PSM: 1800000, PSPO: 1300000, PMP: 1100000 },
    { month: "May", PSM: 1900000, PSPO: 1400000, PMP: 1200000 },
    { month: "Jun", PSM: 2000000, PSPO: 1500000, PMP: 1300000 },
    { month: "Jul", PSM: 2100000, PSPO: 1600000, PMP: 1400000 },
    { month: "Aug", PSM: 2200000, PSPO: 1700000, PMP: 1500000 },
    { month: "Sep", PSM: 2300000, PSPO: 1800000, PMP: 1600000 },
    { month: "Oct", PSM: 2400000, PSPO: 1900000, PMP: 1700000 },
    { month: "Nov", PSM: 2500000, PSPO: 2000000, PMP: 1800000 },
    { month: "Dec", PSM: 2600000, PSPO: 2100000, PMP: 1900000 },
  ],
  "2024": [
    { month: "Jan", PSM: 2500000, PSPO: 1800000, PMP: 1200000 },
    { month: "Feb", PSM: 2700000, PSPO: 2000000, PMP: 1400000 },
    { month: "Mar", PSM: 2900000, PSPO: 2200000, PMP: 1600000 },
    { month: "Apr", PSM: 3100000, PSPO: 2400000, PMP: 1800000 },
    { month: "May", PSM: 3300000, PSPO: 2600000, PMP: 2000000 },
    { month: "Jun", PSM: 3500000, PSPO: 2800000, PMP: 2200000 },
    { month: "Jul", PSM: 3700000, PSPO: 3000000, PMP: 2400000 },
    { month: "Aug", PSM: 3900000, PSPO: 3200000, PMP: 2600000 },
    { month: "Sep", PSM: 4100000, PSPO: 3400000, PMP: 2800000 },
    { month: "Oct", PSM: 4300000, PSPO: 3600000, PMP: 3000000 },
    { month: "Nov", PSM: 4500000, PSPO: 3800000, PMP: 3200000 },
    { month: "Dec", PSM: 4700000, PSPO: 4000000, PMP: 3400000 },
  ],
  "2025": [
    { month: "Jan", PSM: 3800000, PSPO: 2700000, PMP: 1800000 },
    { month: "Feb", PSM: 4100000, PSPO: 3000000, PMP: 2100000 },
    { month: "Mar", PSM: 4400000, PSPO: 3300000, PMP: 2400000 },
    { month: "Apr", PSM: 4700000, PSPO: 3600000, PMP: 2700000 },
    { month: "May", PSM: 5000000, PSPO: 3900000, PMP: 3000000 },
    { month: "Jun", PSM: 5300000, PSPO: 4200000, PMP: 3300000 },
    { month: "Jul", PSM: 5600000, PSPO: 4500000, PMP: 3600000 },
    { month: "Aug", PSM: 5900000, PSPO: 4800000, PMP: 3900000 },
    { month: "Sep", PSM: 6200000, PSPO: 5100000, PMP: 4200000 },
    { month: "Oct", PSM: 6500000, PSPO: 5400000, PMP: 4500000 },
    { month: "Nov", PSM: 6800000, PSPO: 5700000, PMP: 4800000 },
    { month: "Dec", PSM: 7100000, PSPO: 6000000, PMP: 5100000 },
  ],
}

// Define chart colors directly
const chartColors = {
  users: "#D84040", // Primary red color
  activeUsers: "#E86464", // Lighter red
  PSM: "#D84040", // Primary red
  PSPO: "#F0A0A0", // Light red
  PMP: "#AA3030", // Dark red
  free: "#A0A0A0", // Gray
  premium: "#D84040", // Primary red
  credits: "#40A0D8", // Blue
  creditsUsed: "#2080B0", // Darker blue
  registered: "#40D880", // Green
  active: "#F0D040", // Yellow
  purchased: "#D84040", // Red
  subscriptions: "#D84040", // Red
}

const certificationStats = {
  "2023": [
    {
      id: "cert-1",
      name: "Professional Scrum Master",
      questions: 100,
      averageScore: 65,
      testsTaken: 320,
      users: 220,
      activeSubscriptions: 120,
      subscriptionRevenue: 11880000,
      cltv: 195000,
      avgUserLifespan: 7.2,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 150 },
        { type: "Medium", count: 110 },
        { type: "Full", count: 60 },
      ],
      domainScores: [
        { name: "Role", score: 68 },
        { name: "Artifacts", score: 62 },
        { name: "Events", score: 64 },
      ],
    },
    {
      id: "cert-2",
      name: "Professional Scrum Product Owner",
      questions: 80,
      averageScore: 68,
      testsTaken: 240,
      users: 180,
      activeSubscriptions: 100,
      subscriptionRevenue: 9900000,
      cltv: 180000,
      avgUserLifespan: 6.5,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 120 },
        { type: "Medium", count: 90 },
        { type: "Full", count: 30 },
      ],
      domainScores: [
        { name: "Role", score: 70 },
        { name: "Artifacts", score: 66 },
        { name: "Events", score: 68 },
      ],
    },
    {
      id: "cert-3",
      name: "Project Management Professional",
      questions: 60,
      averageScore: 62,
      testsTaken: 140,
      users: 90,
      activeSubscriptions: 50,
      subscriptionRevenue: 6950000,
      cltv: 220000,
      avgUserLifespan: 5.8,
      monthlyPricing: {
        original: 199000,
        discount: 139000,
      },
      testTypes: [
        { type: "Short", count: 60 },
        { type: "Medium", count: 50 },
        { type: "Full", count: 30 },
      ],
      domainScores: [
        { name: "Role", score: 64 },
        { name: "Artifacts", score: 60 },
        { name: "Events", score: 58 },
      ],
    },
  ],
  "2024": [
    {
      id: "cert-1",
      name: "Professional Scrum Master",
      questions: 120,
      averageScore: 68,
      testsTaken: 450,
      users: 320,
      activeSubscriptions: 180,
      subscriptionRevenue: 17820000,
      cltv: 245000,
      avgUserLifespan: 8.5,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 200 },
        { type: "Medium", count: 150 },
        { type: "Full", count: 100 },
      ],
      domainScores: [
        { name: "Role", score: 72 },
        { name: "Artifacts", score: 65 },
        { name: "Events", score: 67 },
      ],
    },
    {
      id: "cert-2",
      name: "Professional Scrum Product Owner",
      questions: 95,
      averageScore: 72,
      testsTaken: 320,
      users: 240,
      activeSubscriptions: 140,
      subscriptionRevenue: 13860000,
      cltv: 215000,
      avgUserLifespan: 7.2,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 150 },
        { type: "Medium", count: 120 },
        { type: "Full", count: 50 },
      ],
      domainScores: [
        { name: "Role", score: 75 },
        { name: "Artifacts", score: 70 },
        { name: "Events", score: 71 },
      ],
    },
    {
      id: "cert-3",
      name: "Project Management Professional",
      questions: 75,
      averageScore: 65,
      testsTaken: 180,
      users: 120,
      activeSubscriptions: 70,
      subscriptionRevenue: 9730000,
      cltv: 278000,
      avgUserLifespan: 6.8,
      monthlyPricing: {
        original: 199000,
        discount: 139000,
      },
      testTypes: [
        { type: "Short", count: 80 },
        { type: "Medium", count: 70 },
        { type: "Full", count: 30 },
      ],
      domainScores: [
        { name: "Role", score: 68 },
        { name: "Artifacts", score: 64 },
        { name: "Events", score: 62 },
      ],
    },
  ],
  "2025": [
    {
      id: "cert-1",
      name: "Professional Scrum Master",
      questions: 150,
      averageScore: 72,
      testsTaken: 680,
      users: 480,
      activeSubscriptions: 270,
      subscriptionRevenue: 26730000,
      cltv: 290000,
      avgUserLifespan: 9.8,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 300 },
        { type: "Medium", count: 230 },
        { type: "Full", count: 150 },
      ],
      domainScores: [
        { name: "Role", score: 76 },
        { name: "Artifacts", score: 70 },
        { name: "Events", score: 72 },
      ],
    },
    {
      id: "cert-2",
      name: "Professional Scrum Product Owner",
      questions: 120,
      averageScore: 75,
      testsTaken: 480,
      users: 360,
      activeSubscriptions: 210,
      subscriptionRevenue: 20790000,
      cltv: 260000,
      avgUserLifespan: 8.5,
      monthlyPricing: {
        original: 149000,
        discount: 99000,
      },
      testTypes: [
        { type: "Short", count: 230 },
        { type: "Medium", count: 180 },
        { type: "Full", count: 70 },
      ],
      domainScores: [
        { name: "Role", score: 78 },
        { name: "Artifacts", score: 74 },
        { name: "Events", score: 75 },
      ],
    },
    {
      id: "cert-3",
      name: "Project Management Professional",
      questions: 95,
      averageScore: 70,
      testsTaken: 270,
      users: 180,
      activeSubscriptions: 105,
      subscriptionRevenue: 14595000,
      cltv: 320000,
      avgUserLifespan: 7.9,
      monthlyPricing: {
        original: 199000,
        discount: 139000,
      },
      testTypes: [
        { type: "Short", count: 120 },
        { type: "Medium", count: 100 },
        { type: "Full", count: 50 },
      ],
      domainScores: [
        { name: "Role", score: 72 },
        { name: "Artifacts", score: 68 },
        { name: "Events", score: 66 },
      ],
    },
  ],
}

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading, isAdmin } = useAuth()
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState("2024") // Default to 2024

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/login")
    }
  }, [user, authLoading, isAdmin, router])

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  // Get data for the selected year
  const currentStats = platformStats[selectedYear]
  const currentRevenueData = revenueGrowthData[selectedYear]
  const currentUserData = userConversionData[selectedYear]
  const currentCreditData = creditUsageData[selectedYear]
  const currentCertRevenue = revenueByCertificationData[selectedYear]
  const currentCertStats = certificationStats[selectedYear]

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
        duration: 0.5,
      },
    },
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container pt-10 pb-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage certifications, questions, and user accounts</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/user-subscriptions">
              <Button className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                User Subscriptions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/user-mentoring">
              <Button className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                User Mentoring
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-6 mb-8 md:grid-cols-3"
        >
          {/* Platform Overview Cards */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-primary" />
                  Customer Lifetime Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(currentStats.averageCLTV)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{currentStats.cltvChange}% growth
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Coins className="mr-2 h-4 w-4 text-primary" />
                  Mentoring Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentStats.creditsUsed} / {currentStats.totalCredits}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((currentStats.creditsUsed / currentStats.totalCredits) * 100)}% utilization rate
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-primary" />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(currentStats.totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{currentStats.revenueChange}% this year
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-lg font-semibold">Dashboard Analytics</h2>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Charts Section - Using direct color values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Revenue Growth Chart - Now as Area Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly revenue from subscriptions and mentoring credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tickFormatter={(value) => (value / 1000000).toFixed(1) + "M"} tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            fontSize: "12px",
                          }}
                          labelStyle={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px" }}
                          formatter={(value) =>
                            new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(value)
                          }
                        />
                        <Legend wrapperStyle={{ fontSize: "10px" }} />
                        <Area
                          type="monotone"
                          dataKey="subscriptions"
                          name="Certification Subscriptions"
                          stackId="1"
                          fill={chartColors.subscriptions}
                          fillOpacity={0.8}
                          stroke={chartColors.subscriptions}
                        />
                        <Area
                          type="monotone"
                          dataKey="credits"
                          name="Mentoring Credits"
                          stackId="1"
                          fill={chartColors.credits}
                          fillOpacity={0.8}
                          stroke={chartColors.credits}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>User Growth & Conversion</CardTitle>
                  <CardDescription>Tracking user journey from registration to purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentUserData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            fontSize: "12px",
                          }}
                          labelStyle={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px" }}
                        />
                        <Legend wrapperStyle={{ fontSize: "10px" }} />
                        <Line
                          type="monotone"
                          dataKey="registered"
                          name="Registered Users"
                          stroke={chartColors.registered}
                          strokeWidth={2}
                          dot={{ fill: chartColors.registered }}
                        />
                        <Line
                          type="monotone"
                          dataKey="active"
                          name="Active Users"
                          stroke={chartColors.active}
                          strokeWidth={2}
                          dot={{ fill: chartColors.active }}
                        />
                        <Line
                          type="monotone"
                          dataKey="purchased"
                          name="Purchasing Users"
                          stroke={chartColors.purchased}
                          strokeWidth={2}
                          dot={{ fill: chartColors.purchased }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Credit Usage Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Mentoring Credits</CardTitle>
                  <CardDescription>Monthly purchased vs. used credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentCreditData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            fontSize: "12px",
                          }}
                          labelStyle={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px" }}
                        />
                        <Legend wrapperStyle={{ fontSize: "10px" }} />
                        <Bar dataKey="purchased" name="Credits Purchased" fill={chartColors.credits} />
                        <Bar dataKey="used" name="Credits Used" fill={chartColors.creditsUsed} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue by Certification Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Certification</CardTitle>
                  <CardDescription>Monthly revenue breakdown by certification (IDR)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentCertRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tickFormatter={(value) => (value / 1000000).toFixed(1) + "M"} tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            fontSize: "12px",
                          }}
                          labelStyle={{ fontWeight: "bold", marginBottom: "5px", fontSize: "12px" }}
                          formatter={(value) =>
                            new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(value)
                          }
                        />
                        <Legend wrapperStyle={{ fontSize: "10px" }} />
                        <Area
                          type="monotone"
                          dataKey="PSM"
                          name="Professional Scrum Master"
                          stackId="1"
                          fill={chartColors.PSM}
                          fillOpacity={0.8}
                          stroke={chartColors.PSM}
                        />
                        <Area
                          type="monotone"
                          dataKey="PSPO"
                          name="Professional Scrum Product Owner"
                          stackId="1"
                          fill={chartColors.PSPO}
                          fillOpacity={0.8}
                          stroke={chartColors.PSPO}
                        />
                        <Area
                          type="monotone"
                          dataKey="PMP"
                          name="Project Management Professional"
                          stackId="1"
                          fill={chartColors.PMP}
                          fillOpacity={0.8}
                          stroke={chartColors.PMP}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Certification Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-4"
            >
              <h2 className="text-xl font-bold">Certification Statistics</h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {currentCertStats.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="overflow-hidden hover:shadow transition-all duration-300 bg-white rounded-lg">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                      <h3 className="text-xl font-bold text-primary">{cert.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary" className="bg-white/80 text-primary">
                          <FileQuestion className="mr-1 h-3 w-3" />
                          {cert.questions} questions
                        </Badge>
                        <Badge variant="secondary" className="bg-white/80 text-primary">
                          <Award className="mr-1 h-3 w-3" />
                          {cert.averageScore}% avg score
                        </Badge>
                        <Badge variant="secondary" className="bg-white/80 text-primary">
                          <BookOpenCheck className="mr-1 h-3 w-3" />
                          {cert.testsTaken} tests
                        </Badge>
                        <Badge variant="secondary" className="bg-white/80 text-primary">
                          <Users className="mr-1 h-3 w-3" />
                          {cert.users} users
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          {/* User Statistics section moved here */}
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                              <User className="mr-2 h-4 w-4" />
                              User Statistics
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-primary">{cert.users}</div>
                                <div className="text-xs text-muted-foreground">Total Users</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-primary">{cert.activeSubscriptions}</div>
                                <div className="text-xs text-muted-foreground">Subscribers</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-primary">{cert.testsTaken}</div>
                                <div className="text-xs text-muted-foreground">Tests Taken</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-primary">{cert.averageScore}%</div>
                                <div className="text-xs text-muted-foreground">Avg. Score</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Domain Performance
                            </h4>
                            <div className="space-y-2">
                              {cert.domainScores.map((score, idx) => (
                                <div key={idx}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm">{score.name}</span>
                                    <span className="text-sm font-medium">{score.score}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="bg-primary h-1.5 rounded-full"
                                      style={{ width: `${score.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Customer Lifetime Value
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Average CLTV</span>
                                <span className="text-sm font-medium">
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0,
                                  }).format(cert.cltv)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Avg. User Lifespan</span>
                                <span className="text-sm font-medium">{cert.avgUserLifespan} months</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Total Revenue</span>
                                <span className="text-sm font-medium">
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0,
                                  }).format(cert.subscriptionRevenue)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Monthly Price</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium">
                                    {new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      maximumFractionDigits: 0,
                                    }).format(cert.monthlyPricing.discount)}
                                  </span>
                                  <span className="text-xs text-muted-foreground line-through">
                                    {new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      maximumFractionDigits: 0,
                                    }).format(cert.monthlyPricing.original)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                            <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                              <Clock className="mr-2 h-4 w-4" />
                              Test Types
                            </h4>
                            <div className="space-y-3">
                              {cert.testTypes.map((type, idx) => (
                                <div key={idx}>
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1.5 text-primary" />
                                      <span className="text-sm">{type.type}</span>
                                    </div>
                                    <span className="text-sm font-medium">{type.count}</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="bg-primary h-1.5 rounded-full"
                                      style={{ width: `${(type.count / cert.testsTaken) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
