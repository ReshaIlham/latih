// User Types
export type UserRole = "admin" | "learner"

export interface User {
  id: string
  name: string | null
  email: string
  image?: string | null
  role: UserRole
}

// Certification Types
export type TestType = "full" | "medium" | "short"
export type TestDomain = "role" | "artifact" | "event" | "all"

export interface Certification {
  id: string
  name: string
  description: string
  image?: string
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
  domain: TestDomain
  difficulty: "easy" | "medium" | "hard"
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

// Subscription Types
export type SubscriptionTier = "free" | "basic" | "premium"

export interface Subscription {
  userId: string
  tier: SubscriptionTier
  isActive: boolean
  startedAt: Date
  expiresAt: Date | null
}
