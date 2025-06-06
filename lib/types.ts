// User Types
export type UserRole = "admin" | "learner"

export interface User {
  id: string
  name: string | null
  email: string
  image?: string | null
  role: UserRole
  // Plan field removed as requested
}

// Certification Types
export type TestType = "full" | "medium" | "short"

export interface TestDomain {
  id: string
  name: string
  tasks: TestTask[]
}

export interface TestTask {
  id: string
  name: string
  domainId: string
}

export interface Certification {
  id: string
  name: string
  description: string
  image?: string
  original_price: number // Added original price field
  discount_price: number | null // Added discount price field
  isPopular?: boolean // Added isPopular field
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  certificationId: string
  text: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation: string
  domain: string
  taskId?: string // Add task field
  difficulty: "easy" | "medium" | "hard"
  source?: string
}

export interface Test {
  id: string
  certificationId: string
  type: TestType
  domain: TestDomain
  questions: string[] // Array of question IDs
  timeLimit?: number // In minutes
}

// User Progress Types
export interface TestResult {
  id: string
  userId: string
  testId: string
  score: number
  totalQuestions: number
  completedAt: Date
  timeSpent: number // In seconds
}

export interface UserProgress {
  userId: string
  certificationId: string
  testsCompleted: number
  averageScore: number
  lastTestAt: Date
}

// User Purchases
export interface UserPurchase {
  userId: string
  certificationId: string
  purchasedAt: Date
  expiresAt: Date | null
  isActive: boolean
}
