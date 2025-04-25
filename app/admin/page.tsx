"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-provider"
import {
  Users,
  FileQuestion,
  BarChart3,
  TrendingUp,
  BookOpen,
  Award,
  BookOpenCheck,
  Brain,
  Clock,
  User,
  CheckCircle,
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
} from "recharts"

// Mock data for the admin dashboard
const platformStats = {
  dailyActiveUsers: 875,
  activeUsersChange: 42,
  totalUsers: 1250,
  totalCertifications: 8,
  totalQuestions: 450,
  totalTestsTaken: 3280,
  averageScore: 76,
  premiumUsers: 320,
  conversionRate: 25.6, // percentage
}

// Monthly new users data
const newUsersData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 220 },
  { month: "May", users: 250 },
  { month: "Jun", users: 280 },
  { month: "Jul", users: 310 },
  { month: "Aug", users: 340 },
  { month: "Sep", users: 370 },
  { month: "Oct", users: 400 },
  { month: "Nov", users: 430 },
  { month: "Dec", users: 460 },
]

// Monthly active users data
const activeUsersData = [
  { month: "Jan", users: 80 },
  { month: "Feb", users: 110 },
  { month: "Mar", users: 140 },
  { month: "Apr", users: 170 },
  { month: "May", users: 200 },
  { month: "Jun", users: 230 },
  { month: "Jul", users: 260 },
  { month: "Aug", users: 290 },
  { month: "Sep", users: 320 },
  { month: "Oct", users: 350 },
  { month: "Nov", users: 380 },
  { month: "Dec", users: 410 },
]

// Monthly tests per certification data
const testsPerCertificationData = [
  { month: "Jan", PSM: 45, PSPO: 30, PMP: 20 },
  { month: "Feb", PSM: 50, PSPO: 35, PMP: 25 },
  { month: "Mar", PSM: 55, PSPO: 40, PMP: 30 },
  { month: "Apr", PSM: 60, PSPO: 45, PMP: 35 },
  { month: "May", PSM: 65, PSPO: 50, PMP: 40 },
  { month: "Jun", PSM: 70, PSPO: 55, PMP: 45 },
  { month: "Jul", PSM: 75, PSPO: 60, PMP: 50 },
  { month: "Aug", PSM: 80, PSPO: 65, PMP: 55 },
  { month: "Sep", PSM: 85, PSPO: 70, PMP: 60 },
  { month: "Oct", PSM: 90, PSPO: 75, PMP: 65 },
  { month: "Nov", PSM: 95, PSPO: 80, PMP: 70 },
  { month: "Dec", PSM: 100, PSPO: 85, PMP: 75 },
]

// Monthly free vs premium users data
const userTypeData = [
  { month: "Jan", free: 90, premium: 30 },
  { month: "Feb", free: 100, premium: 50 },
  { month: "Mar", free: 110, premium: 70 },
  { month: "Apr", free: 120, premium: 90 },
  { month: "May", free: 130, premium: 110 },
  { month: "Jun", free: 140, premium: 130 },
  { month: "Jul", free: 150, premium: 150 },
  { month: "Aug", free: 160, premium: 170 },
  { month: "Sep", free: 170, premium: 190 },
  { month: "Oct", free: 180, premium: 210 },
  { month: "Nov", free: 190, premium: 230 },
  { month: "Dec", free: 200, premium: 250 },
]

// Define chart colors directly
const chartColors = {
  users: "#D84040", // Primary red color
  activeUsers: "#E86464", // Lighter red
  PSM: "#D84040", // Primary red
  PSPO: "#F0A0A0", // Light red
  PMP: "#AA3030", // Dark red
  free: "#A0A0A0", // Gray
  premium: "#D84040", // Primary red
}

const certificationStats = [
  {
    id: "cert-1",
    name: "Professional Scrum Master",
    questions: 120,
    domains: [
      { name: "Role", questions: 40 },
      { name: "Artifacts", questions: 40 },
      { name: "Events", questions: 40 },
    ],
    averageScore: 68,
    domainScores: [
      { name: "Role", score: 72 },
      { name: "Artifacts", score: 65 },
      { name: "Events", score: 67 },
    ],
    testsTaken: 450,
    testTypes: [
      { type: "Short", count: 200 },
      { type: "Medium", count: 150 },
      { type: "Full", count: 100 },
    ],
    users: 320,
    premiumUsers: 180,
  },
  {
    id: "cert-2",
    name: "Professional Scrum Product Owner",
    questions: 95,
    domains: [
      { name: "Role", questions: 30 },
      { name: "Artifacts", questions: 35 },
      { name: "Events", questions: 30 },
    ],
    averageScore: 72,
    domainScores: [
      { name: "Role", score: 75 },
      { name: "Artifacts", score: 70 },
      { name: "Events", score: 71 },
    ],
    testsTaken: 320,
    testTypes: [
      { type: "Short", count: 150 },
      { type: "Medium", count: 120 },
      { type: "Full", count: 50 },
    ],
    users: 240,
    premiumUsers: 140,
  },
  {
    id: "cert-3",
    name: "Project Management Professional",
    questions: 75,
    domains: [
      { name: "Role", questions: 25 },
      { name: "Artifacts", questions: 25 },
      { name: "Events", questions: 25 },
    ],
    averageScore: 65,
    domainScores: [
      { name: "Role", score: 68 },
      { name: "Artifacts", score: 64 },
      { name: "Events", score: 62 },
    ],
    testsTaken: 180,
    testTypes: [
      { type: "Short", count: 80 },
      { type: "Medium", count: 70 },
      { type: "Full", count: 30 },
    ],
    users: 120,
    premiumUsers: 70,
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                Daily Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.dailyActiveUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{platformStats.activeUsersChange} this week
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
              <div className="text-2xl font-bold">
                {platformStats.premiumUsers} / {platformStats.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">{platformStats.conversionRate}% conversion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Charts Section - Using direct color values */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* New Users Chart */}
            <Card>
              <CardHeader>
                <CardTitle>New Users per Month</CardTitle>
                <CardDescription>Growth trend of new user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={newUsersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        name="New Users"
                        stroke={chartColors.users}
                        strokeWidth={2}
                        dot={{ fill: chartColors.users }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Active Users Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Active Users per Month</CardTitle>
                <CardDescription>Monthly active user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeUsersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        name="Active Users"
                        stroke={chartColors.activeUsers}
                        strokeWidth={2}
                        dot={{ fill: chartColors.activeUsers }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tests per Certification Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tests per Certification</CardTitle>
                <CardDescription>Monthly test attempts by certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={testsPerCertificationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                      />
                      <Legend />
                      <Bar dataKey="PSM" name="Professional Scrum Master" fill={chartColors.PSM} />
                      <Bar dataKey="PSPO" name="Professional Scrum Product Owner" fill={chartColors.PSPO} />
                      <Bar dataKey="PMP" name="Project Management Professional" fill={chartColors.PMP} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Free vs Premium Users Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Free vs Premium Users</CardTitle>
                <CardDescription>Monthly distribution of user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                        labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                      />
                      <Legend />
                      <Bar dataKey="free" name="Free Users" fill={chartColors.free} />
                      <Bar dataKey="premium" name="Premium Users" fill={chartColors.premium} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certification Stats */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Certification Statistics</h2>
              <Link href="/admin/certifications">
                <Button variant="outline">View All Certifications</Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {certificationStats.map((cert) => (
                <Card key={cert.id} className="overflow-hidden border-none shadow-lg">
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
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                            <Brain className="mr-2 h-4 w-4" />
                            Domain Distribution
                          </h4>
                          <div className="space-y-2">
                            {cert.domains.map((domain, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-sm">{domain.name}</span>
                                <div className="flex items-center">
                                  <span className="text-sm font-medium">{domain.questions}</span>
                                  <span className="text-xs text-muted-foreground ml-1">questions</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
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
                        <div className="bg-gray-50 p-4 rounded-lg">
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

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold mb-3 flex items-center text-primary">
                            <User className="mr-2 h-4 w-4" />
                            User Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-primary">{cert.users}</div>
                              <div className="text-xs text-muted-foreground">Total Users</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-primary">{cert.premiumUsers}</div>
                              <div className="text-xs text-muted-foreground">Premium Users</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-primary">{cert.testsTaken}</div>
                              <div className="text-xs text-muted-foreground">Tests Taken</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-primary">{cert.averageScore}%</div>
                              <div className="text-xs text-muted-foreground">Avg. Score</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
