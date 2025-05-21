"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Search, ChevronLeft, ChevronRight, Edit, Trash2, Plus, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Mock subscription data - Modified to have one certification per row
const mockSubscriptions = [
  {
    id: "sub-1",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    certification: "PSM",
    numberOfMonths: 1,
    startDate: "2023-10-01",
    endDate: "2023-11-01",
    status: "active",
    amount: 99000,
    verificationStatus: "verified",
  },
  {
    id: "sub-2",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    certification: "PSPO",
    numberOfMonths: 1,
    startDate: "2023-10-01",
    endDate: "2023-11-01",
    status: "active",
    amount: 99000,
    verificationStatus: "pending",
  },
  {
    id: "sub-3",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    certification: "PSM",
    numberOfMonths: 12,
    startDate: "2023-09-15",
    endDate: "2024-09-15",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-4",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    certification: "PSPO",
    numberOfMonths: 12,
    startDate: "2023-09-15",
    endDate: "2024-09-15",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-5",
    userId: "user-2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    certification: "PMP",
    numberOfMonths: 12,
    startDate: "2023-09-15",
    endDate: "2024-09-15",
    status: "active",
    amount: 990000,
    verificationStatus: "pending",
  },
  {
    id: "sub-6",
    userId: "user-4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    certification: "PSM",
    numberOfMonths: 1,
    startDate: "2023-10-10",
    endDate: "2023-11-10",
    status: "active",
    amount: 99000,
    verificationStatus: "verified",
  },
  {
    id: "sub-7",
    userId: "user-5",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    certification: "PSM",
    numberOfMonths: 12,
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-8",
    userId: "user-5",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    certification: "PSPO",
    numberOfMonths: 12,
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    status: "active",
    amount: 990000,
    verificationStatus: "pending",
  },
  {
    id: "sub-9",
    userId: "user-7",
    userName: "David Miller",
    userEmail: "david@example.com",
    certification: "PSPO",
    numberOfMonths: 1,
    startDate: "2023-09-20",
    endDate: "2023-10-20",
    status: "expired",
    amount: 99000,
    verificationStatus: "verified",
  },
  {
    id: "sub-10",
    userId: "user-8",
    userName: "Lisa Anderson",
    userEmail: "lisa@example.com",
    certification: "PSM",
    numberOfMonths: 12,
    startDate: "2023-07-15",
    endDate: "2024-07-15",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-11",
    userId: "user-8",
    userName: "Lisa Anderson",
    userEmail: "lisa@example.com",
    certification: "PMP",
    numberOfMonths: 12,
    startDate: "2023-07-15",
    endDate: "2024-07-15",
    status: "active",
    amount: 990000,
    verificationStatus: "pending",
  },
  {
    id: "sub-12",
    userId: "user-9",
    userName: "Thomas Wright",
    userEmail: "thomas@example.com",
    certification: "PSM",
    numberOfMonths: 1,
    startDate: "2023-10-05",
    endDate: "2023-11-05",
    status: "active",
    amount: 99000,
    verificationStatus: "pending",
  },
  {
    id: "sub-13",
    userId: "user-10",
    userName: "Jessica Lee",
    userEmail: "jessica@example.com",
    certification: "PSM",
    numberOfMonths: 12,
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-14",
    userId: "user-10",
    userName: "Jessica Lee",
    userEmail: "jessica@example.com",
    certification: "PSPO",
    numberOfMonths: 12,
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    status: "active",
    amount: 990000,
    verificationStatus: "verified",
  },
  {
    id: "sub-15",
    userId: "user-10",
    userName: "Jessica Lee",
    userEmail: "jessica@example.com",
    certification: "PMP",
    numberOfMonths: 12,
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    status: "active",
    amount: 990000,
    verificationStatus: "pending",
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
  { id: "user-11", name: "Kevin Chen" },
  { id: "user-12", name: "Amanda Taylor" },
]

// Mock certifications for dropdown
const mockCertifications = [
  { id: "cert-1", name: "PSM" },
  { id: "cert-2", name: "PSPO" },
  { id: "cert-3", name: "PMP" },
]

// Initial state for new subscription
const initialNewSubscription = {
  userId: "",
  userName: "",
  certification: "",
  numberOfMonths: 1,
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  amount: 0,
  verificationStatus: "pending",
}

export default function UserSubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newSubscription, setNewSubscription] = useState(initialNewSubscription)
  const [editingSubscription, setEditingSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [verificationFilter, setVerificationFilter] = useState("all")

  // Apply filters
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.certification.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    const matchesVerification = verificationFilter === "all" || sub.verificationStatus === verificationFilter

    return matchesSearch && matchesStatus && matchesVerification
  })

  // Pagination
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubscriptions = filteredSubscriptions.slice(indexOfFirstItem, indexOfLastItem)

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

  // Calculate end date based on start date and number of months
  const calculateEndDate = (startDate, months) => {
    const date = new Date(startDate)
    date.setMonth(date.getMonth() + Number.parseInt(months))
    return date.toISOString().split("T")[0]
  }

  // Handle user selection
  const handleUserChange = (userId) => {
    const selectedUser = mockUsers.find((user) => user.id === userId)
    setNewSubscription({
      ...newSubscription,
      userId,
      userName: selectedUser ? selectedUser.name : "",
    })
  }

  // Handle certification selection
  const handleCertificationChange = (certification) => {
    setNewSubscription({
      ...newSubscription,
      certification,
    })
  }

  // Handle start date change
  const handleStartDateChange = (date) => {
    const endDate = calculateEndDate(date, newSubscription.numberOfMonths)
    setNewSubscription({
      ...newSubscription,
      startDate: date,
      endDate,
    })
  }

  // Handle number of months change
  const handleMonthsChange = (months) => {
    const endDate = calculateEndDate(newSubscription.startDate, months)
    setNewSubscription({
      ...newSubscription,
      numberOfMonths: months,
      endDate,
    })
  }

  // Add new subscription
  const handleAddSubscription = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newSub = {
        id: `sub-${Date.now()}`,
        ...newSubscription,
        userEmail: `${newSubscription.userName.toLowerCase().replace(" ", ".")}@example.com`,
        status: "active",
      }

      setSubscriptions([newSub, ...subscriptions])
      setIsAddDialogOpen(false)
      setNewSubscription(initialNewSubscription)
      setIsLoading(false)

      toast({
        title: "Subscription added",
        description: "The subscription has been added successfully.",
      })
    }, 1000)
  }

  // Edit subscription
  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription)
    setIsEditDialogOpen(true)
  }

  // Update subscription
  const handleUpdateSubscription = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubscriptions(subscriptions.map((sub) => (sub.id === editingSubscription.id ? editingSubscription : sub)))
      setIsEditDialogOpen(false)
      setEditingSubscription(null)
      setIsLoading(false)

      toast({
        title: "Subscription updated",
        description: "The subscription has been updated successfully.",
      })
    }, 1000)
  }

  // Delete subscription
  const handleDeleteSubscription = (id) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
      setIsLoading(false)

      toast({
        title: "Subscription deleted",
        description: "The subscription has been deleted successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Subscriptions</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor user subscription plans</p>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email, or certification..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={verificationFilter}
            onValueChange={(value) => {
              setVerificationFilter(value)
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
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Subscription</DialogTitle>
              <DialogDescription>Create a new subscription for a user.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user">User Name</Label>
                <Select value={newSubscription.userId} onValueChange={handleUserChange}>
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
                <Label htmlFor="certification">Certification</Label>
                <Select value={newSubscription.certification} onValueChange={handleCertificationChange}>
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

              <div className="grid gap-2">
                <Label htmlFor="months">Number of Months</Label>
                <Select
                  value={newSubscription.numberOfMonths.toString()}
                  onValueChange={(value) => handleMonthsChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (IDR)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newSubscription.amount}
                  onChange={(e) =>
                    setNewSubscription({
                      ...newSubscription,
                      amount: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter amount in IDR"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newSubscription.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" value={newSubscription.endDate} disabled />
                <p className="text-xs text-muted-foreground">
                  End date is calculated automatically based on start date and duration
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddSubscription}
                disabled={
                  isLoading || !newSubscription.userId || !newSubscription.certification || !newSubscription.amount
                }
              >
                {isLoading ? "Adding..." : "Add Subscription"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Certification</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSubscriptions.length > 0 ? (
              currentSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subscription.userName}</div>
                      <div className="text-sm text-muted-foreground">{subscription.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {subscription.certification}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {subscription.numberOfMonths} {subscription.numberOfMonths === 1 ? "month" : "months"}
                  </TableCell>
                  <TableCell>{formatDate(subscription.startDate)}</TableCell>
                  <TableCell>{formatDate(subscription.endDate)}</TableCell>
                  <TableCell>{formatCurrency(subscription.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={subscription.status === "active" ? "default" : "secondary"}
                      className={subscription.status === "active" ? "bg-green-500" : ""}
                    >
                      {subscription.status === "active" ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={subscription.verificationStatus === "verified" ? "default" : "outline"}
                      className={subscription.verificationStatus === "verified" ? "bg-blue-500" : ""}
                    >
                      {subscription.verificationStatus === "verified" ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditSubscription(subscription)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>

                      {subscription.verificationStatus === "pending" && (
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
                                Are you sure you want to verify this subscription for {subscription.userName}?
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
                                    setSubscriptions(
                                      subscriptions.map((sub) =>
                                        sub.id === subscription.id ? { ...sub, verificationStatus: "verified" } : sub,
                                      ),
                                    )
                                    setIsLoading(false)
                                    toast({
                                      title: "Subscription verified",
                                      description: "The subscription has been verified successfully.",
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
                              Are you sure you want to delete this subscription for {subscription.userName}? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeleteSubscription(subscription.id)}
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
                  No subscriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredSubscriptions.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubscriptions.length)} of{" "}
            {filteredSubscriptions.length} subscriptions
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

      {/* Edit Subscription Dialog */}
      {editingSubscription && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Subscription</DialogTitle>
              <DialogDescription>Update subscription details for {editingSubscription.userName}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-certification">Certification</Label>
                <Select
                  value={editingSubscription.certification}
                  onValueChange={(value) => {
                    setEditingSubscription({
                      ...editingSubscription,
                      certification: value,
                    })
                  }}
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

              <div className="grid gap-2">
                <Label htmlFor="edit-months">Number of Months</Label>
                <Select
                  value={editingSubscription.numberOfMonths.toString()}
                  onValueChange={(value) => {
                    const months = Number.parseInt(value)
                    const startDate = new Date(editingSubscription.startDate)
                    const endDate = new Date(startDate)
                    endDate.setMonth(endDate.getMonth() + months)

                    setEditingSubscription({
                      ...editingSubscription,
                      numberOfMonths: months,
                      endDate: endDate.toISOString().split("T")[0],
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-amount">Amount (IDR)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editingSubscription.amount}
                  onChange={(e) =>
                    setEditingSubscription({
                      ...editingSubscription,
                      amount: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter amount in IDR"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={editingSubscription.startDate}
                  onChange={(e) => {
                    const startDate = e.target.value
                    const months = editingSubscription.numberOfMonths
                    const endDate = new Date(startDate)
                    endDate.setMonth(endDate.getMonth() + months)

                    setEditingSubscription({
                      ...editingSubscription,
                      startDate,
                      endDate: endDate.toISOString().split("T")[0],
                    })
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input id="edit-endDate" type="date" value={editingSubscription.endDate} disabled />
                <p className="text-xs text-muted-foreground">
                  End date is calculated automatically based on start date and duration
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingSubscription.status}
                  onValueChange={(value) =>
                    setEditingSubscription({
                      ...editingSubscription,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateSubscription}
                disabled={isLoading || !editingSubscription.certification || !editingSubscription.amount}
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
