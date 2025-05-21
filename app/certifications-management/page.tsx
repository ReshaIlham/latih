"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  FileQuestion,
  X,
  MoreHorizontal,
  FileText,
  ListOrdered,
  Grid,
  Calendar,
  Crown,
} from "lucide-react"

// Types
type CertificationStatus = "active" | "not-active" | "coming-soon"
type Domain = {
  id: string
  name: string
}
type TestType = {
  id: string
  name: string
  timeLimit: number
  questionCount: number
  passingGrade: number
}

// Update the mockCertifications array with Unsplash images
const mockCertifications = [
  {
    id: "psm",
    name: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    questionCount: 120,
    userCount: 450,
    passRate: 68,
    status: "active" as CertificationStatus,
    lastUpdated: "2023-10-15T14:30:45",
    domains: [
      { id: "d1", name: "Roles" },
      { id: "d2", name: "Artifacts" },
      { id: "d3", name: "Events" },
    ],
    testTypes: [
      { id: "t1", name: "Short Test", timeLimit: 30, questionCount: 40, passingGrade: 70 },
      { id: "t2", name: "Medium Test", timeLimit: 60, questionCount: 80, passingGrade: 75 },
      { id: "t3", name: "Full Test", timeLimit: 120, questionCount: 120, passingGrade: 80 },
    ],
    isPopular: true,
  },
  {
    id: "pspo",
    name: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
    questionCount: 95,
    userCount: 320,
    passRate: 72,
    status: "active" as CertificationStatus,
    lastUpdated: "2023-09-22T09:15:22",
    domains: [
      { id: "d4", name: "Roles" },
      { id: "d5", name: "Artifacts" },
      { id: "d6", name: "Events" },
    ],
    testTypes: [
      { id: "t4", name: "Short Test", timeLimit: 30, questionCount: 30, passingGrade: 70 },
      { id: "t5", name: "Medium Test", timeLimit: 60, questionCount: 60, passingGrade: 75 },
      { id: "t6", name: "Full Test", timeLimit: 90, questionCount: 90, passingGrade: 80 },
    ],
    isPopular: false,
  },
  {
    id: "pmp",
    name: "Project Management Professional (PMP)",
    description: "Prepare for the globally recognized project management certification from PMI",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2940&auto=format&fit=crop",
    questionCount: 200,
    userCount: 180,
    passRate: 70,
    status: "coming-soon" as CertificationStatus,
    lastUpdated: "2023-07-05T16:20:10",
    domains: [
      { id: "d10", name: "Initiating" },
      { id: "d11", name: "Planning" },
      { id: "d12", name: "Executing" },
      { id: "d13", name: "Monitoring and Controlling" },
      { id: "d14", name: "Closing" },
    ],
    testTypes: [
      { id: "t10", name: "Short Test", timeLimit: 45, questionCount: 50, passingGrade: 70 },
      { id: "t11", name: "Medium Test", timeLimit: 90, questionCount: 100, passingGrade: 75 },
      { id: "t12", name: "Full Test", timeLimit: 180, questionCount: 200, passingGrade: 80 },
    ],
    isPopular: true,
  },
]

type Certification = {
  id: string
  name: string
  description: string
  image: string
  questionCount: number
  userCount: number
  passRate: number
  status: CertificationStatus
  lastUpdated: string
  domains: Domain[]
  testTypes: TestType[]
  isPopular: boolean
}

export default function CertificationsManagementPage() {
  const [certifications, setCertifications] = useState<Certification[]>(mockCertifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  // Apply search filter
  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDeleteCertification = (certificationId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCertifications((prevCerts) => prevCerts.filter((cert) => cert.id !== certificationId))
      setIsLoading(false)

      toast({
        title: "Certification deleted",
        description: "Certification has been deleted successfully.",
      })
    }, 1000)
  }

  const getStatusBadge = (status: CertificationStatus) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "not-active":
        return <Badge variant="outline">Not Active</Badge>
      case "coming-soon":
        return <Badge className="bg-red-500">Coming Soon</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Certification Management</h1>
        <p className="text-muted-foreground">Manage certification exams, questions, and analytics</p>
      </div>

      {/* Search and Add */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search certifications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Link href="/certifications-management/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
        </Link>
      </div>

      {/* Certifications Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertifications.length > 0 ? (
          filteredCertifications.map((certification) => (
            <div
              key={certification.id}
              className="certification-card group relative bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full"
            >
              <div className="relative">
                <Image
                  src={certification.image || "/placeholder.svg"}
                  alt={certification.name}
                  width={360}
                  height={200}
                  className={`w-full h-48 object-cover ${certification.status === "coming-soon" ? "filter grayscale opacity-70" : ""}`}
                />
                <div className="absolute top-2 right-2">{getStatusBadge(certification.status)}</div>
                {certification.isPopular && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-500 text-white px-2 py-1 flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Popular
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3
                  className={`text-xl font-bold mb-2 line-clamp-2 leading-tight ${certification.status === "coming-soon" ? "text-muted-foreground" : "group-hover:text-primary transition-colors"}`}
                >
                  {certification.name}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{certification.description}</p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <FileText className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">{certification.questionCount} Questions</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <ListOrdered className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">{certification.domains.length} Domains</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <Grid className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">{certification.testTypes.length} Test Types</span>
                  </div>
                </div>
              </div>

              {/* New colored footer with last updated and three dots menu */}
              <div className="flex items-center justify-between p-4 bg-red-50 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Updated: {formatDateTime(certification.lastUpdated)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/certifications-management/${certification.id}/edit`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/certifications-management/${certification.id}/question`} className="cursor-pointer">
                        <FileQuestion className="mr-2 h-4 w-4" />
                        Questions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {certification.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeleteCertification(certification.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">No certifications found</h3>
            <p className="text-muted-foreground">Try adjusting your search or add a new certification.</p>
            <Link href="/certifications-management/new" className="mt-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
