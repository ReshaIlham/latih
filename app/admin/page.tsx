"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-provider"
import { PlusCircle, Users, FileQuestion } from "lucide-react"

// Mock data for the admin dashboard
const certificationStats = [
  { name: "Scrum Master", questions: 120, users: 450 },
  { name: "Product Owner", questions: 95, users: 320 },
  { name: "Agile Coach", questions: 75, users: 180 },
]

const recentUsers = [
  { id: "user-1", name: "John Doe", email: "john@example.com", joined: "2023-10-15" },
  { id: "user-2", name: "Jane Smith", email: "jane@example.com", joined: "2023-10-14" },
  { id: "user-3", name: "Robert Johnson", email: "robert@example.com", joined: "2023-10-12" },
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
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage certifications, questions, and user accounts</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">450</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
              </CardContent>
            </Card>
          </div>

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
                    <div className="text-sm text-muted-foreground">
                      Joined {new Date(user.joined).toLocaleDateString()}
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
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(cert.questions / 150) * 100}%` }}
                      ></div>
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
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Manage Certifications</h2>
            <Link href="/admin/certifications/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {certificationStats.map((cert, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{cert.name}</CardTitle>
                  <CardDescription>
                    {cert.questions} questions • {cert.users} users
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Link href={`/admin/certifications/${index}/questions`}>
                    <Button variant="outline">Manage Questions</Button>
                  </Link>
                  <Link href={`/admin/certifications/${index}/edit`}>
                    <Button>Edit Certification</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Manage Users</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Users
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
