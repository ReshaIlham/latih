"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { Search, UserCog, Trash2, RefreshCw, Plus, X, ChevronLeft, ChevronRight, History } from "lucide-react"
import Link from "next/link"

// First, update the User type to include expiresAt
type User = {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "learner"
  plan: "free" | "premium"
  lastUpdated: string
  expiresAt?: string | null
}

// Update the mockUsers data to include expiresAt for premium users
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "learner",
    plan: "premium",
    lastUpdated: "2023-05-15T14:30:45",
    expiresAt: "2024-05-15T14:30:45",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    role: "learner",
    plan: "free",
    lastUpdated: "2023-06-22T09:15:22",
    expiresAt: null,
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 456-7890",
    role: "admin",
    plan: "premium",
    lastUpdated: "2023-01-10T11:45:30",
    expiresAt: "2024-01-10T11:45:30",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    role: "learner",
    plan: "premium",
    lastUpdated: "2023-07-05T16:20:10",
    expiresAt: "2024-07-05T16:20:10",
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "+1 (555) 876-5432",
    role: "learner",
    plan: "free",
    lastUpdated: "2023-08-17T08:55:42",
    expiresAt: null,
  },
  {
    id: "user-6",
    name: "Sarah Brown",
    email: "sarah@example.com",
    phone: "+1 (555) 345-6789",
    role: "admin",
    plan: "premium",
    lastUpdated: "2023-03-28T13:10:05",
    expiresAt: "2024-03-28T13:10:05",
  },
  {
    id: "user-7",
    name: "David Miller",
    email: "david@example.com",
    phone: "+1 (555) 654-3210",
    role: "learner",
    plan: "premium",
    lastUpdated: "2023-09-14T10:30:15",
    expiresAt: "2024-09-14T10:30:15",
  },
  {
    id: "user-8",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1 (555) 789-0123",
    role: "learner",
    plan: "free",
    lastUpdated: "2023-02-19T15:45:33",
    expiresAt: null,
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@latih.com",
    phone: "+1 (555) 111-2222",
    role: "admin",
    plan: "premium",
    lastUpdated: "2022-10-05T09:20:18",
    expiresAt: "2023-10-05T09:20:18", // Expired
  },
  {
    id: "learner-1",
    name: "Learner User",
    email: "learner@latih.com",
    phone: "+1 (555) 333-4444",
    role: "learner",
    plan: "free",
    lastUpdated: "2023-04-12T14:25:50",
    expiresAt: null,
  },
  {
    id: "user-9",
    name: "Thomas Wright",
    email: "thomas@example.com",
    phone: "+1 (555) 555-6666",
    role: "learner",
    plan: "premium",
    lastUpdated: "2023-10-01T11:22:33",
    expiresAt: "2023-09-01T11:22:33", // Expired
  },
  {
    id: "user-10",
    name: "Jessica Lee",
    email: "jessica@example.com",
    phone: "+1 (555) 777-8888",
    role: "learner",
    plan: "free",
    lastUpdated: "2023-10-05T16:42:10",
    expiresAt: null,
  },
  {
    id: "user-11",
    name: "Kevin Chen",
    email: "kevin@example.com",
    phone: "+1 (555) 999-0000",
    role: "learner",
    plan: "premium",
    lastUpdated: "2023-10-10T09:15:27",
    expiresAt: "2024-10-10T09:15:27",
  },
  {
    id: "user-12",
    name: "Amanda Taylor",
    email: "amanda@example.com",
    phone: "+1 (555) 222-3333",
    role: "admin",
    plan: "premium",
    lastUpdated: "2023-10-15T14:30:45",
    expiresAt: "2024-10-15T14:30:45",
  },
]

// Update the newUser state to include expiresAt
const initialNewUserState: Omit<User, "id" | "lastUpdated"> = {
  name: "",
  email: "",
  phone: "",
  role: "learner",
  plan: "free",
  expiresAt: null,
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [expirationFilter, setExpirationFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)
  const [passwordResetEmail, setPasswordResetEmail] = useState("")
  const [newUserDialog, setNewUserDialog] = useState(false)
  const [newUser, setNewUser] = useState<Omit<User, "id" | "lastUpdated">>(initialNewUserState)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Verify admin access
  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
      toast({
        title: "Unauthorized",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      })
    }
  }, [isAdmin, router, toast])

  // Check if a user's subscription is expired
  const isExpired = (user: User) => {
    if (user.plan !== "premium" || !user.expiresAt) return false
    return new Date(user.expiresAt) < new Date()
  }

  // Apply filters and search
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesPlan = planFilter === "all" || user.plan === planFilter

      // Apply expiration filter
      const matchesExpiration =
        expirationFilter === "all" ||
        (expirationFilter === "expired" && isExpired(user)) ||
        (expirationFilter === "active" && user.plan === "premium" && !isExpired(user)) ||
        (expirationFilter === "never" && user.plan === "premium" && !user.expiresAt)

      return matchesSearch && matchesRole && matchesPlan && matchesExpiration
    })
    // Sort by lastUpdated (newest first)
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleEditUser = (user: User) => {
    setEditUser(user)
    setShowEditDialog(true)
  }

  const handleUpdateUser = () => {
    if (!editUser) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const now = new Date().toISOString()
      const updatedUser = { ...editUser, lastUpdated: now }

      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
      setShowEditDialog(false)
      setEditUser(null)
      setIsLoading(false)

      toast({
        title: "User updated",
        description: "User information has been updated successfully.",
      })
    }, 1000)
  }

  const handleDeleteUser = (userId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      setIsLoading(false)

      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      })
    }, 1000)
  }

  const handleResetPassword = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setShowResetPasswordDialog(false)
      setPasswordResetEmail("")
      setIsLoading(false)

      toast({
        title: "Password reset",
        description: "A password reset link has been sent to the user's email.",
      })
    }, 1000)
  }

  // Add expiresAt field to the Add User dialog
  const handleAddUser = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newUserId = `user-${Date.now()}`
      const now = new Date().toISOString()

      const userToAdd: User = {
        id: newUserId,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        plan: newUser.plan,
        lastUpdated: now,
        expiresAt: newUser.plan === "premium" ? newUser.expiresAt : null,
      }

      setUsers((prevUsers) => [userToAdd, ...prevUsers])
      setNewUserDialog(false)
      setNewUser(initialNewUserState)
      setIsLoading(false)
      setCurrentPage(1) // Reset to first page to show the new user

      toast({
        title: "User added",
        description: "New user has been added successfully.",
      })
    }, 1000)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setRoleFilter("all")
    setPlanFilter("all")
    setExpirationFilter("all")
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts, roles, and subscriptions</p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page when search changes
              }}
            />
          </div>
          <Select
            value={roleFilter}
            onValueChange={(value) => {
              setRoleFilter(value)
              setCurrentPage(1) // Reset to first page when filter changes
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="learner">Learner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={planFilter}
            onValueChange={(value) => {
              setPlanFilter(value)
              setCurrentPage(1) // Reset to first page when filter changes
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Plan</SelectLabel>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={expirationFilter}
            onValueChange={(value) => {
              setExpirationFilter(value)
              setCurrentPage(1) // Reset to first page when filter changes
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by expiration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Expiration Status</SelectLabel>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active Premium</SelectItem>
                <SelectItem value="expired">Expired Premium</SelectItem>
                <SelectItem value="never">Never Expires</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {(searchTerm || roleFilter !== "all" || planFilter !== "all" || expirationFilter !== "all") && (
            <Button variant="ghost" size="icon" onClick={resetFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account. The user will receive a welcome email.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Full Name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Email Address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Phone Number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: "admin" | "learner") => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="learner">Learner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select
                  value={newUser.plan}
                  onValueChange={(value: "free" | "premium") => setNewUser({ ...newUser, plan: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newUser.plan === "premium" && (
                <div className="grid gap-2">
                  <Label htmlFor="expiresAt">Expires After</Label>
                  <Input
                    id="expiresAt"
                    type="date"
                    value={newUser.expiresAt ? new Date(newUser.expiresAt).toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null
                      setNewUser({
                        ...newUser,
                        expiresAt: date ? date.toISOString() : null,
                      })
                    }}
                    placeholder="Expiration Date"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for never expiring premium</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewUserDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={isLoading || !newUser.name || !newUser.email}>
                {isLoading ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Expires After</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id} className={isExpired(user) ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "outline"}
                      className={user.role === "admin" ? "bg-primary" : ""}
                    >
                      {user.role === "admin" ? "Admin" : "Learner"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.plan === "premium" ? "default" : "outline"}
                      className={user.plan === "premium" ? (isExpired(user) ? "bg-destructive" : "bg-primary") : ""}
                    >
                      {user.plan === "premium" ? (isExpired(user) ? "Expired" : "Premium") : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateTime(user.lastUpdated)}</TableCell>
                  <TableCell>
                    {user.plan === "premium" && user.expiresAt
                      ? formatDateTime(user.expiresAt)
                      : user.plan === "premium"
                        ? "Never"
                        : "-"}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                      <UserCog className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setPasswordResetEmail(user.email)
                        setShowResetPasswordDialog(true)
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Reset Password</span>
                    </Button>

                    <Link href={`/test-history/${user.id}`}>
                      <Button variant="ghost" size="icon" title="View Test History">
                        <History className="h-4 w-4 text-primary" />
                        <span className="sr-only">Test History</span>
                      </Button>
                    </Link>

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
                            Are you sure you want to delete {user.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value))
                setCurrentPage(1) // Reset to first page when items per page changes
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Edit User Dialog */}
      {editUser && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and settings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editUser.phone}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editUser.role}
                  onValueChange={(value: "admin" | "learner") => setEditUser({ ...editUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="learner">Learner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-plan">Subscription Plan</Label>
                <Select
                  value={editUser.plan}
                  onValueChange={(value: "free" | "premium") => setEditUser({ ...editUser, plan: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editUser.plan === "premium" && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-expiresAt">Expires After</Label>
                  <Input
                    id="edit-expiresAt"
                    type="date"
                    value={editUser.expiresAt ? new Date(editUser.expiresAt).toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null
                      setEditUser({
                        ...editUser,
                        expiresAt: date ? date.toISOString() : null,
                      })
                    }}
                    placeholder="Expiration Date"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for never expiring premium</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} disabled={isLoading}>
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset User Password</DialogTitle>
            <DialogDescription>Send a password reset link to the user's email address.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              A password reset link will be sent to: <span className="font-medium">{passwordResetEmail}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              The user will be able to set a new password by following the link in the email.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
