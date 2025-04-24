"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { motion } from "framer-motion"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await resetPassword(token, password)
      setIsSuccess(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been reset successfully.",
      })
    } catch (error) {
      toast({
        title: "Reset failed",
        description: "There was a problem resetting your password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-primary/5"></div>
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-primary/3"></div>
          <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-primary/10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-primary/10"></div>
        </div>

        <Card className="mx-auto w-full max-w-md shadow-lg border-primary/20 z-10">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-6 text-center">
            <p className="mb-6">Please request a new password reset link.</p>
            <Link href="/forgot-password">
              <Button className="w-full">Request New Link</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-primary/3"></div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-primary/10"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-primary/10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 px-4"
      >
        <Card className="mx-auto w-full shadow-lg border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {isSuccess ? "Your password has been reset" : "Create a new password for your account"}
            </CardDescription>
          </CardHeader>

          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3 pt-3">
                <div className="space-y-1">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all focus:border-primary focus:ring-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="transition-all focus:border-primary focus:ring-primary"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button type="submit" className="w-full shadow-sm hover:shadow-md transition-all" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      <span className="ml-2">Resetting...</span>
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="pt-4 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="mb-6">Your password has been reset successfully.</p>
              <Link href="/login">
                <Button className="w-full">Log In</Button>
              </Link>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
