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
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
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

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would call an API
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if the user exists in our example accounts
      const account = EXAMPLE_ACCOUNTS.find(
        (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password,
      )

      if (account) {
        // Use the example account
        const mockUser: User = {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
        }
        setUser(mockUser)
        localStorage.setItem("latih-user", JSON.stringify(mockUser))
      } else {
        // For demo, create a mock user based on email
        const mockUser: User = {
          id: "user-" + Date.now(),
          name: email.split("@")[0],
          email,
          role: "learner",
        }
        setUser(mockUser)
        localStorage.setItem("latih-user", JSON.stringify(mockUser))
      }
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        signIn,
        signUp,
        signOut,
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
