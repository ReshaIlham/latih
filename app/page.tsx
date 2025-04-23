import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, BarChart3, CheckCircle, ListChecks, LayoutGrid } from "lucide-react"

export default function Home() {
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
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-1.5">
                    Get Started
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
                  src="/images/psm-certification.jpg"
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
              Join thousands of professionals preparing for their Scrum certification exams
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PSM Certification Card */}
            <div className="certification-card group bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full">
              <Link href="/certifications/psm" className="block relative">
                <Image
                  src="/images/psm-certification.jpg"
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
                  src="/images/pspo-certification.jpg"
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

      {/* Rest of the page remains unchanged */}
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
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Get Started
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
              <Link href="/signup" className="w-full">
                <Button size="lg" className="w-full">
                  Get Started
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
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Certifications</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Professional Scrum Master
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Professional Scrum Product Owner
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  View All
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
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
