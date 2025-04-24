"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { requestPasswordReset } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await requestPasswordReset(email)
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was a problem sending the reset link.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? "Check your email for a password reset link"
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3 pt-3">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <span className="ml-2">Sending...</span>
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
                <div className="text-center text-sm">
                  <Link
                    href="/login"
                    className="font-medium text-primary underline-offset-4 hover:underline flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="pt-4 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-4">
                We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
                instructions to reset your password.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                If you don't see the email, check your spam folder or try again.
              </p>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  Try a different email
                </Button>
                <Link href="/login" className="w-full">
                  <Button className="w-full">Back to Login</Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
