"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, BarChart3, CheckCircle, ListChecks, LayoutGrid } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col">
      {/* Hero Section with Design Pattern */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        {/* Design Pattern - Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-primary/5"></div>
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-primary/3"></div>
          <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-primary/10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-primary/10"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="animate-slide-up text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Your <span className="text-primary">Certification Exams</span> with Latih
                </h1>
                <p className="animate-slide-up [animation-delay:200ms] max-w-[600px] text-muted-foreground md:text-xl">
                  Practice with customized tests tailored to your certification needs. Choose from various test types
                  and domains to enhance your learning.
                </p>
              </div>
              <div className="animate-slide-up [animation-delay:400ms] flex flex-col gap-2 sm:flex-row">
                <Link href={user ? "/certifications" : "/signup"} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-1.5">
                    {user ? "Browse Certifications" : "Get Started"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 lg:mt-0">
              <div className="animate-slide-up [animation-delay:600ms] relative w-full max-w-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
                  alt="Certification Practice"
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Certifications Section - Updated to match certifications page */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Certifications</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Join thousands of professionals preparing for their certification exams
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PSM Certification Card */}
            <div className="certification-card group bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full">
              <Link href="/certifications/psm" className="block relative">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                  alt="Professional Scrum Master"
                  width={360}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6 flex-grow flex flex-col">
                <Link href="/certifications/psm" className="block">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    Professional Scrum Master (PSM)
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Learn the role and responsibilities of a Scrum Master in agile development
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <BookOpen className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">120 Questions</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <ListChecks className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">3 Domains</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <LayoutGrid className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">3 Test Types</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/certifications/psm">
                    <Button className="w-full">Start Practicing</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* PSPO Certification Card */}
            <div className="certification-card group bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full">
              <Link href="/certifications/pspo" className="block relative">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop"
                  alt="Professional Scrum Product Owner"
                  width={360}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6 flex-grow flex flex-col">
                <Link href="/certifications/pspo" className="block">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    Professional Scrum Product Owner (PSPO)
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Master the skills needed to be an effective Product Owner in Scrum
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <BookOpen className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">95 Questions</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <ListChecks className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">3 Domains</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                    <LayoutGrid className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">3 Test Types</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href="/certifications/pspo">
                    <Button className="w-full">Start Practicing</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/certifications">
              <Button variant="outline" className="gap-2">
                Browse All Certifications
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Features Designed for <span className="text-primary">Effective Learning</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Everything you need to prepare for your certification exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customized Tests</h3>
              <p className="text-muted-foreground">
                Choose from full, medium, or short tests based on your study time and needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Domain Focus</h3>
              <p className="text-muted-foreground">
                Practice specific domains like Role, Artifact, or Event to target your weak areas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your improvement with detailed analytics and performance insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section Preview */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[700px] text-muted-foreground">Choose the plan that fits your certification journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Free</h3>
                <p className="text-muted-foreground">Basic access to get started</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
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
              <Link href={user ? "/certifications" : "/signup"}>
                <Button variant="outline" className="w-full">
                  {user ? "Browse Certifications" : "Get Started"}
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="rounded-lg border border-primary bg-card p-6 shadow-md relative">
              <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                RECOMMENDED
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Premium</h3>
                <p className="text-muted-foreground">Complete certification preparation</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
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
              </ul>
              <Link href="/pricing">
                <Button className="w-full">Subscribe Now</Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/pricing">
              <Button className="gap-2">
                View All Pricing Options
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start <span className="text-primary">Practicing?</span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join thousands of learners who have successfully passed their certification exams with Latih.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <Link href={user ? "/certifications" : "/signup"} className="w-full">
                <Button size="lg" className="w-full">
                  {user ? "Browse Certifications" : "Get Started"}
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">No credit card required for free plan</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 md:py-12 bg-background border-t">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-lg font-bold">L</span>
              </div>
              <span className="ml-2 text-xl font-bold">Latih</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Practice for certification exams with customized tests tailored to your certification needs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Main Menu</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/my-certifications" className="text-muted-foreground hover:text-foreground">
                  My Certifications
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-muted-foreground hover:text-foreground">
                  Browse Certifications
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-foreground">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
                  Forgot Password
                </Link>
              </li>
              <li>
                <Link href="/account-settings" className="text-muted-foreground hover:text-foreground">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@latih.com" className="text-muted-foreground hover:text-foreground">
                  support@latih.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281905454606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Latih. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
