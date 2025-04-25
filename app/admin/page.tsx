"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import {
  Users,
  FileQuestion,
  BarChart3,
  TrendingUp,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  BookOpenCheck,
} from "lucide-react"

// Mock data for the admin dashboard
const platformStats = {
  totalUsers: 1250,
  activeUsers: 875,
  newUsersThisWeek: 42,
  totalCertifications: 8,
  totalQuestions: 450,
  totalTestsTaken: 3280,
  averageScore: 76,
  premiumUsers: 320,
  conversionRate: 25.6, // percentage
}

const recentUsers = [
  { id: "user-1", name: "John Doe", email: "john@example.com", joined: "2023-10-15", role: "learner" },
  { id: "user-2", name: "Jane Smith", email: "jane@example.com", joined: "2023-10-14", role: "learner" },
  { id: "user-3", name: "Robert Johnson", email: "robert@example.com", joined: "2023-10-12", role: "admin" },
]

const certificationStats = [
  { name: "Scrum Master", questions: 120, users: 450, passRate: 68 },
  { name: "Product Owner", questions: 95, users: 320, passRate: 72 },
  { name: "Agile Coach", questions: 75, users: 180, passRate: 65 },
]

const alertItems = [
  {
    id: "alert-1",
    type: "warning",
    message: "Low pass rate for Agile Coach certification",
    details: "Pass rate has dropped below 70%",
    date: "2023-10-16",
  },
  {
    id: "alert-2",
    type: "info",
    message: "New certification ready for review",
    details: "DevOps certification needs approval",
    date: "2023-10-15",
  },
  {
    id: "alert-3",
    type: "success",
    message: "User milestone reached",
    details: "Platform has reached 1,000+ registered users",
    date: "2023-10-14",
  },
]

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading, isAdmin } = useAuth()
  const router = useRouter()

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

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container py-6">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage certifications, questions, and user accounts</p>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-4">
          {/* Platform Overview Cards */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{platformStats.newUsersThisWeek} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalCertifications}</div>
              <p className="text-xs text-muted-foreground">{platformStats.totalQuestions} questions total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Award className="mr-2 h-4 w-4 text-primary" />
                Tests Taken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalTestsTaken.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{platformStats.averageScore}% average score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                Premium Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.premiumUsers}</div>
              <p className="text-xs text-muted-foreground">{platformStats.conversionRate}% conversion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Alerts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Important Alerts</CardTitle>
              <CardDescription>Issues that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertItems.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-amber-50 text-amber-800"
                        : alert.type === "success"
                          ? "bg-green-50 text-green-800"
                          : "bg-blue-50 text-blue-800"
                    }`}
                  >
                    <div className="mt-0.5">
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <BookOpenCheck className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm opacity-80">{alert.details}</p>
                      <p className="text-xs mt-1 opacity-70">{new Date(alert.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Alerts
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>New users who joined recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Learner"}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        Joined {new Date(user.joined).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full">
                  View All Users
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Certification Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Certification Statistics</CardTitle>
              <CardDescription>Overview of certifications and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificationStats.map((cert, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{cert.name}</p>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center text-sm text-muted-foreground">
                          <FileQuestion className="mr-1 h-4 w-4" />
                          {cert.questions} questions
                        </span>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {cert.users} users
                        </span>
                        <span
                          className={`flex items-center text-sm ${
                            cert.passRate >= 70 ? "text-green-600" : "text-amber-600"
                          }`}
                        >
                          <Award className="mr-1 h-4 w-4" />
                          {cert.passRate}% pass rate
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/certifications">
                <Button variant="outline" className="w-full">
                  Manage Certifications
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
