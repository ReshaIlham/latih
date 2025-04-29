"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { useSubscription } from "@/lib/subscription-provider"
import { CheckCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

export default function PricingPage() {
  const { user } = useAuth()
  const { subscribe, status } = useSubscription()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubscribe = async (tier: "free" | "premium") => {
    if (!user) {
      router.push("/login?redirect=pricing")
      return
    }

    if (tier === "free") {
      setIsLoading(tier)
      try {
        await subscribe(tier)
        toast({
          title: "Subscription updated",
          description: `You are now subscribed to the ${tier} plan.`,
        })
        router.push("/dashboard")
      } catch (error) {
        toast({
          title: "Subscription failed",
          description: "There was a problem updating your subscription.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(null)
      }
    } else {
      // For premium, redirect to WhatsApp
      const message = `Hello Latih Team, I would like to upgrade my account to Premium. My email is: ${user.email}`
      const whatsappURL = `https://wa.me/6281905454606?text=${encodeURIComponent(message)}`
      window.open(whatsappURL, "_blank")
    }
  }

  return (
    <motion.div className="container py-10" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="mx-auto max-w-4xl space-y-8" variants={containerVariants}>
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h1 className="text-4xl font-bold">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your certification journey</p>
        </motion.div>

        <motion.div className="grid gap-8 md:grid-cols-2" variants={containerVariants}>
          {/* Free Plan */}
          <motion.div variants={itemVariants}>
            <Card className={`${status.tier === "free" ? "border-primary" : ""} h-full flex flex-col card-shadow`}>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Basic access to get started</CardDescription>
                <div className="mt-4 text-4xl font-bold">$0</div>
                <p className="text-sm text-muted-foreground">Forever free</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Access to 1 certification</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Short practice tests only</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic progress tracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSubscribe("free")}
                  disabled={isLoading !== null || status.tier === "free"}
                  className="w-full"
                  variant={status.tier === "free" ? "outline" : "default"}
                >
                  {status.tier === "free" ? "Current Plan" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div variants={itemVariants}>
            <Card
              className={`${status.tier === "premium" ? "border-primary" : ""} relative h-full flex flex-col card-shadow`}
            >
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  RECOMMENDED
                </div>
              </div>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Complete certification preparation</CardDescription>
                <div className="mt-4 text-4xl font-bold">$19.99</div>
                <p className="text-sm text-muted-foreground">per month</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited certifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>All test types (short, medium, full)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced domain filtering</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Detailed explanations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Performance insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSubscribe("premium")}
                  disabled={isLoading !== null || status.tier === "premium"}
                  className="w-full shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading === "premium" ? (
                    <span className="flex items-center">
                      <span className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      <span className="ml-2">Processing...</span>
                    </span>
                  ) : status.tier === "premium" ? (
                    "Current Plan"
                  ) : (
                    "Subscribe via WhatsApp"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="mt-8 text-center" variants={itemVariants}>
          <p className="text-sm text-muted-foreground">
            All plans include access to our platform, regular updates, and customer support.
            <br />
            Need help choosing?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our team
            </Link>
            .
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
