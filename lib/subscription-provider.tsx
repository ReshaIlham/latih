"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-provider"

type SubscriptionTier = "free" | "premium"

type SubscriptionStatus = {
  tier: SubscriptionTier
  isActive: boolean
  expiresAt: Date | null
}

type SubscriptionContextType = {
  status: SubscriptionStatus
  isLoading: boolean
  hasAccess: boolean
  subscribe: (tier: SubscriptionTier) => Promise<void>
  cancelSubscription: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [status, setStatus] = useState<SubscriptionStatus>({
    tier: "free",
    isActive: false,
    expiresAt: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mock subscription check
  useEffect(() => {
    if (user) {
      // Check if subscription is stored in localStorage (in a real app, this would verify with the server)
      const storedSubscription = localStorage.getItem(`latih-subscription-${user.id}`)
      if (storedSubscription) {
        const parsedSubscription = JSON.parse(storedSubscription)
        // Convert string date back to Date object
        parsedSubscription.expiresAt = parsedSubscription.expiresAt ? new Date(parsedSubscription.expiresAt) : null
        setStatus(parsedSubscription)
      } else {
        // Default to free tier if no subscription found
        setStatus({
          tier: "free",
          isActive: false,
          expiresAt: null,
        })
      }
    } else {
      // Reset to default if no user
      setStatus({
        tier: "free",
        isActive: false,
        expiresAt: null,
      })
    }
    setIsLoading(false)
  }, [user])

  const subscribe = async (tier: SubscriptionTier) => {
    if (!user) throw new Error("User must be logged in to subscribe")

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set expiration date to 30 days from now
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      const newStatus: SubscriptionStatus = {
        tier,
        isActive: true,
        expiresAt,
      }

      setStatus(newStatus)
      localStorage.setItem(`latih-subscription-${user.id}`, JSON.stringify(newStatus))
    } catch (error) {
      console.error("Subscription failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async () => {
    if (!user) throw new Error("User must be logged in to cancel subscription")

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newStatus: SubscriptionStatus = {
        tier: "free",
        isActive: false,
        expiresAt: null,
      }

      setStatus(newStatus)
      localStorage.setItem(`latih-subscription-${user.id}`, JSON.stringify(newStatus))
    } catch (error) {
      console.error("Cancellation failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Determine if user has access to premium features
  const hasAccess = status.isActive && status.tier === "premium"

  return (
    <SubscriptionContext.Provider
      value={{
        status,
        isLoading,
        hasAccess,
        subscribe,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
