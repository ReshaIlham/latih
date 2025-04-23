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
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Login successful",
        description: "Welcome back to Latih!",
      })
      router.push("/my-certifications")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const setDemoAccount = (type: "admin" | "learner") => {
    if (type === "admin") {
      setEmail("admin@latih.com")
      setPassword("admin123")
    } else {
      setEmail("learner@latih.com")
      setPassword("learner123")
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
            <CardTitle className="text-2xl font-bold text-center">Log in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
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
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    <span className="ml-2">Logging in...</span>
                  </span>
                ) : (
                  "Log in"
                )}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>

          {/* Demo accounts section */}
          <div className="px-6 pb-6 pt-2">
            <div className="border-t pt-4">
              <p className="text-sm text-center mb-3 text-muted-foreground">Demo Accounts</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setDemoAccount("admin")}
                >
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Admin</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setDemoAccount("learner")}
                >
                  <User className="h-4 w-4 text-primary" />
                  <span>Learner</span>
                </Button>
              </div>
              <div className="mt-2 text-xs text-center text-muted-foreground">
                Click to fill credentials, then click Log in
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
