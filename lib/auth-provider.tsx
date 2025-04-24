"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string | null
  email: string
  image?: string | null
  role: "admin" | "learner"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<User | null>
  signUp: (name: string, email: string, password: string) => Promise<User | null>
  signOut: () => void
  resetPassword: (token: string, newPassword: string) => Promise<void>
  requestPasswordReset: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Example accounts
const EXAMPLE_ACCOUNTS = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@latih.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "learner-1",
    name: "Learner User",
    email: "learner@latih.com",
    password: "learner123",
    role: "learner" as const,
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user is stored in localStorage (in a real app, this would verify a token with the server)
    const storedUser = localStorage.getItem("latih-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<User | null> => {
    // Mock authentication - in a real app, this would call an API
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if the user exists in our example accounts
      const account = EXAMPLE_ACCOUNTS.find(
        (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password,
      )

      let mockUser: User

      if (account) {
        // Use the example account
        mockUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
        }
      } else {
        // For demo, create a mock user based on email
        mockUser = {
          id: "user-" + Date.now(),
          name: email.split("@")[0],
          email,
          role: "learner",
        }
      }

      setUser(mockUser)
      localStorage.setItem("latih-user", JSON.stringify(mockUser))
      return mockUser
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string): Promise<User | null> => {
    // Mock sign up - in a real app, this would call an API
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: "user-" + Date.now(),
        name,
        email,
        role: "learner", // Default role for new users
      }

      setUser(newUser)
      localStorage.setItem("latih-user", JSON.stringify(newUser))
      return newUser
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("latih-user")
  }

  const requestPasswordReset = async (email: string): Promise<void> => {
    // Mock password reset request
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would send an email with a reset link
      console.log(`Password reset requested for ${email}`)

      // For demo purposes, we'll store the reset token in localStorage
      const resetToken = `reset-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem(`reset-token-${email}`, resetToken)

      // In a real app, this would send an email with the reset token
    } catch (error) {
      console.error("Password reset request failed:", error)
      throw error
    }
  }

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    // Mock password reset
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would verify the token and update the password
      console.log(`Password reset with token ${token}`)

      // For demo purposes, we'll just log the action
    } catch (error) {
      console.error("Password reset failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        signIn,
        signUp,
        signOut,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
