"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, Clock, Edit, Trash2, Plus, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock mentoring session data
const mockMentoringSessions = [
  {
    id: "session-1",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    mentorName: "Dr. Sarah Johnson",
    certification: "PSM",
    date: "2023-10-25",
    time: "10:00 AM",
    duration: 60,
    status: "scheduled",
    creditsUsed: 2,
    notes: "Discuss Scrum Master certification preparation",
  },
  {
    id: "session-2",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    mentorName: "Prof. Michael Brown",
    certification: "PSPO",
    date: "2023-10-26",
    time: "2:00 PM",
    duration: 90,
    status: "scheduled",
    creditsUsed: 3,
    notes: "Review Product Owner responsibilities",
  },
  {
    id: "session-3",
    userId: "user-4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    mentorName: "Dr. Sarah Johnson",
    certification: "PSM",
    date: "2023-10-20",
    time: "11:00 AM",
    duration: 60,
    status: "completed",
    creditsUsed: 2,
    notes: "Mock exam review",
  },
  {
    id: "session-4",
    userId: "user-5",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    mentorName: "Prof. Michael Brown",
    certification: "PMP",
    date: "2023-10-18",
    time: "3:00 PM",
    duration: 120,
    status: "completed",
    creditsUsed: 4,
    notes: "Project management framework discussion",
  },
  {
    id: "session-5",
    userId: "user-7",
    userName: "David Miller",
    userEmail: "david@example.com",
    mentorName: "Dr. Sarah Johnson",
    certification: "PSPO",
    date: "2023-10-15",
    time: "9:00 AM",
    duration: 60,
    status: "cancelled",
    creditsUsed: 0,
    notes: "Cancelled due to scheduling conflict",
  },
  {
    id: "session-6",
    userId: "user-8",
    userName: "Lisa Anderson",
    userEmail: "lisa@example.com",
    mentorName: "Prof. Michael Brown",
    certification: "PSM",
    date: "2023-10-30",
    time: "1:00 PM",
    duration: 90,
    status: "scheduled",
    creditsUsed: 3,
    notes: "Agile principles and practices",
  },
  {
    id: "session-7",
    userId: "user-9",
    userName: "Thomas Wright",
    userEmail: "thomas@example.com",
    mentorName: "Dr. Sarah Johnson",
    certification: "PMP",
    date: "2023-10-28",
    time: "10:30 AM",
    duration: 120,
    status: "scheduled",
    creditsUsed: 4,
    notes: "PMP exam preparation",
  },
  {
    id: "session-8",
    userId: "user-10",
    userName: "Jessica Lee",
    userEmail: "jessica@example.com",
    mentorName: "Prof. Michael Brown",
    certification: "PSPO",
    date: "2023-11-02",
    time: "4:00 PM",
    duration: 60,
    status: "scheduled",
    creditsUsed: 2,
    notes: "Product backlog management",
  },
]

// Mock credit purchase data
const mockCreditPurchases = [
  {
    id: "credit-1",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    amount: 10,
    date: "2023-10-01",
    price: 250000,
    notes: "Initial credit purchase",
    verificationStatus: "verified",
  },
  {
    id: "credit-2",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    amount: 20,
    date: "2023-09-15",
    price: 450000,
    notes: "Bulk purchase discount applied",
    verificationStatus: "pending",
  },
  {
    id: "credit-3",
    userId: "user-4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    amount: 5,
    date: "2023-10-10",
    price: 150000,
    notes: "",
    verificationStatus: "verified",
  },
]

// Mock users for dropdown
const mockUsers = [
  { id: "user-1", name: "John Doe" },
  { id: "user-2", name: "Jane Smith" },
  { id: "user-4", name: "Emily Davis" },
  { id: "user-5", name: "Michael Wilson" },
  { id: "user-7", name: "David Miller" },
  { id: "user-8", name: "Lisa Anderson" },
  { id: "user-9", name: "Thomas Wright" },
  { id: "user-10", name: "Jessica Lee" },
]

// Mock mentors for dropdown
const mockMentors = [
  { id: "mentor-1", name: "Dr. Sarah Johnson" },
  { id: "mentor-2", name: "Prof. Michael Brown" },
]

// Mock certifications for dropdown
const mockCertifications = [
  { id: "cert-1", name: "PSM" },
  { id: "cert-2", name: "PSPO" },
  { id: "cert-3", name: "PMP" },
]

// Initial state for new session
const initialNewSession = {
  userId: "",
  userName: "",
  userEmail: "",
  mentorName: "",
  certification: "",
  date: new Date().toISOString().split("T")[0],
  time: "10:00",
  duration: 60,
  status: "scheduled",
  creditsUsed: 2,
  notes: "",
}

// Initial state for new credit purchase
const initialNewCreditPurchase = {
  userId: "",
  userName: "",
  userEmail: "",
  amount: 5,
  date: new Date().toISOString().split("T")[0],
  price: 150000,
  notes: "",
  verificationStatus: "pending",
}

export default function UserMentoringPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [certificationFilter, setCertificationFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [activeTab, setActiveTab] = useState("sessions")
  const [sessions, setSessions] = useState(mockMentoringSessions)
  const [creditPurchases, setCreditPurchases] = useState(mockCreditPurchases)
  const [isAddingSession, setIsAddingSession] = useState(false)
  const [isEditingSession, setIsEditingSession] = useState(false)
  const [currentSession, setCurrentSession] = useState(null)
  const [newSession, setNewSession] = useState(initialNewSession)
  const [isAddingCredit, setIsAddingCredit] = useState(false)
  const [isEditingCredit, setIsEditingCredit] = useState(false)
  const [currentCredit, setCurrentCredit] = useState(null)
  const [newCredit, setNewCredit] = useState(initialNewCreditPurchase)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Add creditVerificationFilter state
  const [creditVerificationFilter, setCreditVerificationFilter] = useState("all")

  // Apply filters for sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.mentorName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    const matchesCertification = certificationFilter === "all" || session.certification === certificationFilter

    return matchesSearch && matchesStatus && matchesCertification
  })

  // Apply filters for credit purchases
  const filteredCreditPurchases = creditPurchases.filter((purchase) => {
    const matchesSearch =
      purchase.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVerification =
      creditVerificationFilter === "all" || purchase.verificationStatus === creditVerificationFilter

    return matchesSearch && matchesVerification
  })

  // Determine which data to paginate based on active tab
  const filteredData = activeTab === "sessions" ? filteredSessions : filteredCreditPurchases

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Handle user selection for session
  const handleUserChangeForSession = (userId) => {
    const selectedUser = mockUsers.find((user) => user.id === userId)
    setNewSession({
      ...newSession,
      userId,
      userName: selectedUser ? selectedUser.name : "",
      userEmail: selectedUser ? `${selectedUser.name.toLowerCase().replace(" ", ".")}@example.com` : "",
    })
  }

  // Handle user selection for credit purchase
  const handleUserChangeForCredit = (userId) => {
    const selectedUser = mockUsers.find((user) => user.id === userId)
    setNewCredit({
      ...newCredit,
      userId,
      userName: selectedUser ? selectedUser.name : "",
      userEmail: selectedUser ? `${selectedUser.name.toLowerCase().replace(" ", ".")}@example.com` : "",
    })
  }

  // Add new session
  const handleAddSession = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newSessionData = {
        id: `session-${Date.now()}`,
        ...newSession,
      }

      setSessions([newSessionData, ...sessions])
      setIsAddingSession(false)
      setNewSession(initialNewSession)
      setIsLoading(false)

      toast({
        title: "Session added",
        description: "The mentoring session has been added successfully.",
      })
    }, 1000)
  }

  // Edit session
  const handleEditSession = (session) => {
    setCurrentSession(session)
    setIsEditingSession(true)
  }

  // Update session
  const handleUpdateSession = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSessions(sessions.map((session) => (session.id === currentSession.id ? currentSession : session)))
      setIsEditingSession(false)
      setCurrentSession(null)
      setIsLoading(false)

      toast({
        title: "Session updated",
        description: "The mentoring session has been updated successfully.",
      })
    }, 1000)
  }

  // Delete session
  const handleDeleteSession = (id) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSessions(sessions.filter((session) => session.id !== id))
      setIsLoading(false)

      toast({
        title: "Session deleted",
        description: "The mentoring session has been deleted successfully.",
      })
    }, 1000)
  }

  // Add new credit purchase
  const handleAddCreditPurchase = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newCreditData = {
        id: `credit-${Date.now()}`,
        ...newCredit,
      }

      setCreditPurchases([newCreditData, ...creditPurchases])
      setIsAddingCredit(false)
      setNewCredit(initialNewCreditPurchase)
      setIsLoading(false)

      toast({
        title: "Credit purchase added",
        description: "The credit purchase has been added successfully.",
      })
    }, 1000)
  }

  // Edit credit purchase
  const handleEditCreditPurchase = (credit) => {
    setCurrentCredit(credit)
    setIsEditingCredit(true)
  }

  // Update credit purchase
  const handleUpdateCreditPurchase = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCreditPurchases(creditPurchases.map((credit) => (credit.id === currentCredit.id ? currentCredit : credit)))
      setIsEditingCredit(false)
      setCurrentCredit(null)
      setIsLoading(false)

      toast({
        title: "Credit purchase updated",
        description: "The credit purchase has been updated successfully.",
      })
    }, 1000)
  }

  // Delete credit purchase
  const handleDeleteCreditPurchase = (id) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCreditPurchases(creditPurchases.filter((credit) => credit.id !== id))
      setIsLoading(false)

      toast({
        title: "Credit purchase deleted",
        description: "The credit purchase has been deleted successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container pt-10 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Mentoring</h1>
        <p className="text-muted-foreground mt-2">Manage mentoring sessions and credit purchases</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sessions" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sessions">Mentoring Sessions</TabsTrigger>
          <TabsTrigger value="credits">Credit Purchases</TabsTrigger>
        </TabsList>

        {/* Filters and Add Button */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            {activeTab === "sessions" && (
              <>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={certificationFilter}
                  onValueChange={(value) => {
                    setCertificationFilter(value)
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Certifications</SelectItem>
                    <SelectItem value="PSM">PSM</SelectItem>
                    <SelectItem value="PSPO">PSPO</SelectItem>
                    <SelectItem value="PMP">PMP</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            {activeTab === "credits" && (
              <Select
                value={creditVerificationFilter}
                onValueChange={(value) => {
                  setCreditVerificationFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verification</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {activeTab === "sessions" ? (
            <Button onClick={() => setIsAddingSession(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Session
            </Button>
          ) : (
            <Button onClick={() => setIsAddingCredit(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Credit Purchase
            </Button>
          )}
        </div>

        {/* Sessions Tab Content */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Credits Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{session.userName}</div>
                          <div className="text-sm text-muted-foreground">{session.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{session.mentorName}</TableCell>
                      <TableCell>{session.certification}</TableCell>
                      <TableCell>
                        <div>
                          <div>{formatDate(session.date)}</div>
                          <div className="text-sm text-muted-foreground">{session.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{session.duration} min</span>
                        </div>
                      </TableCell>
                      <TableCell>{session.creditsUsed}</TableCell>
                      <TableCell>{getStatusBadge(session.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSession(session)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this mentoring session for {session.userName}? This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteSession(session.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No mentoring sessions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Credits Tab Content */}
        <TabsContent value="credits" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Credits Purchased</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{purchase.userName}</div>
                          <div className="text-sm text-muted-foreground">{purchase.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{purchase.amount} credits</TableCell>
                      <TableCell>{formatDate(purchase.date)}</TableCell>
                      <TableCell>{formatCurrency(purchase.price)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={purchase.verificationStatus === "verified" ? "default" : "outline"}
                          className={purchase.verificationStatus === "verified" ? "bg-blue-500" : ""}
                        >
                          {purchase.verificationStatus === "verified" ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCreditPurchase(purchase)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          {purchase.verificationStatus === "pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="h-4 w-4 text-blue-500" />
                                  <span className="sr-only">Verify</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Verification</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to verify this credit purchase for {purchase.userName}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                    onClick={() => {
                                      setIsLoading(true)
                                      // Simulate API call
                                      setTimeout(() => {
                                        setCreditPurchases(
                                          creditPurchases.map((credit) =>
                                            credit.id === purchase.id
                                              ? { ...credit, verificationStatus: "verified" }
                                              : credit,
                                          ),
                                        )
                                        setIsLoading(false)
                                        toast({
                                          title: "Credit purchase verified",
                                          description: "The credit purchase has been verified successfully.",
                                        })
                                      }, 500)
                                    }}
                                  >
                                    Verify
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this credit purchase for {purchase.userName}? This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteCreditPurchase(purchase.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No credit purchases found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}{" "}
            {activeTab === "sessions" ? "sessions" : "purchases"}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNumber = i + 1
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNumber)}
                  className="h-8 w-8"
                >
                  {pageNumber}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
        </div>
      )}

      {/* Add Session Dialog */}
      <Dialog open={isAddingSession} onOpenChange={setIsAddingSession}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Mentoring Session</DialogTitle>
            <DialogDescription>Create a new mentoring session for a user.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">User</Label>
              <Select value={newSession.userId} onValueChange={handleUserChangeForSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mentor">Mentor</Label>
              <Select
                value={newSession.mentorName}
                onValueChange={(value) => setNewSession({ ...newSession, mentorName: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a mentor" />
                </SelectTrigger>
                <SelectContent>
                  {mockMentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.name}>
                      {mentor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="certification">Certification</Label>
              <Select
                value={newSession.certification}
                onValueChange={(value) => setNewSession({ ...newSession, certification: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a certification" />
                </SelectTrigger>
                <SelectContent>
                  {mockCertifications.map((cert) => (
                    <SelectItem key={cert.id} value={cert.name}>
                      {cert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={newSession.duration.toString()}
                  onValueChange={(value) => setNewSession({ ...newSession, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credits">Credits Used</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  value={newSession.creditsUsed}
                  onChange={(e) => setNewSession({ ...newSession, creditsUsed: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newSession.status}
                onValueChange={(value) => setNewSession({ ...newSession, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this session"
                value={newSession.notes}
                onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingSession(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSession}
              disabled={
                isLoading ||
                !newSession.userId ||
                !newSession.mentorName ||
                !newSession.certification ||
                !newSession.date ||
                !newSession.time
              }
            >
              {isLoading ? "Adding..." : "Add Session"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Session Dialog */}
      {currentSession && (
        <Dialog open={isEditingSession} onOpenChange={setIsEditingSession}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Mentoring Session</DialogTitle>
              <DialogDescription>Update session details for {currentSession.userName}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-mentor">Mentor</Label>
                <Select
                  value={currentSession.mentorName}
                  onValueChange={(value) => setCurrentSession({ ...currentSession, mentorName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMentors.map((mentor) => (
                      <SelectItem key={mentor.id} value={mentor.name}>
                        {mentor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-certification">Certification</Label>
                <Select
                  value={currentSession.certification}
                  onValueChange={(value) => setCurrentSession({ ...currentSession, certification: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a certification" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCertifications.map((cert) => (
                      <SelectItem key={cert.id} value={cert.name}>
                        {cert.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={currentSession.date}
                    onChange={(e) => setCurrentSession({ ...currentSession, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={currentSession.time.replace(" AM", "").replace(" PM", "")}
                    onChange={(e) => setCurrentSession({ ...currentSession, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Select
                    value={currentSession.duration.toString()}
                    onValueChange={(value) =>
                      setCurrentSession({ ...currentSession, duration: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-credits">Credits Used</Label>
                  <Input
                    id="edit-credits"
                    type="number"
                    min="0"
                    value={currentSession.creditsUsed}
                    onChange={(e) =>
                      setCurrentSession({ ...currentSession, creditsUsed: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentSession.status}
                  onValueChange={(value) => setCurrentSession({ ...currentSession, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Add any notes about this session"
                  value={currentSession.notes}
                  onChange={(e) => setCurrentSession({ ...currentSession, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditingSession(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSession} disabled={isLoading}>
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Credit Purchase Dialog */}
      <Dialog open={isAddingCredit} onOpenChange={setIsAddingCredit}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Credit Purchase</DialogTitle>
            <DialogDescription>Record a new credit purchase for a user.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="credit-user">User</Label>
              <Select value={newCredit.userId} onValueChange={handleUserChangeForCredit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="credit-amount">Credits Amount</Label>
                <Input
                  id="credit-amount"
                  type="number"
                  min="1"
                  value={newCredit.amount}
                  onChange={(e) => setNewCredit({ ...newCredit, amount: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credit-price">Price (IDR)</Label>
                <Input
                  id="credit-price"
                  type="number"
                  min="0"
                  value={newCredit.price}
                  onChange={(e) => setNewCredit({ ...newCredit, price: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="credit-date">Purchase Date</Label>
              <Input
                id="credit-date"
                type="date"
                value={newCredit.date}
                onChange={(e) => setNewCredit({ ...newCredit, date: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="credit-notes">Notes</Label>
              <Textarea
                id="credit-notes"
                placeholder="Add any notes about this purchase"
                value={newCredit.notes}
                onChange={(e) => setNewCredit({ ...newCredit, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCredit(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCreditPurchase}
              disabled={isLoading || !newCredit.userId || !newCredit.amount || !newCredit.price || !newCredit.date}
            >
              {isLoading ? "Adding..." : "Add Credit Purchase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Credit Purchase Dialog */}
      {currentCredit && (
        <Dialog open={isEditingCredit} onOpenChange={setIsEditingCredit}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Credit Purchase</DialogTitle>
              <DialogDescription>Update credit purchase details for {currentCredit.userName}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-credit-amount">Credits Amount</Label>
                  <Input
                    id="edit-credit-amount"
                    type="number"
                    min="1"
                    value={currentCredit.amount}
                    onChange={(e) =>
                      setCurrentCredit({ ...currentCredit, amount: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-credit-price">Price (IDR)</Label>
                  <Input
                    id="edit-credit-price"
                    type="number"
                    min="0"
                    value={currentCredit.price}
                    onChange={(e) =>
                      setCurrentCredit({ ...currentCredit, price: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-credit-date">Purchase Date</Label>
                <Input
                  id="edit-credit-date"
                  type="date"
                  value={currentCredit.date}
                  onChange={(e) => setCurrentCredit({ ...currentCredit, date: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-credit-notes">Notes</Label>
                <Textarea
                  id="edit-credit-notes"
                  placeholder="Add any notes about this purchase"
                  value={currentCredit.notes}
                  onChange={(e) => setCurrentCredit({ ...currentCredit, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditingCredit(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCreditPurchase} disabled={isLoading}>
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
