"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, BarChart3, CheckCircle, Users, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { CertificationCard } from "@/components/certification-card"
import { motion } from "framer-motion"

export default function Home() {
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after component mounts to trigger animations
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Mock data for user's purchased certifications
  const userPurchasedCertifications = user ? ["psm"] : []

  // Mock subscription data with expiry dates
  const userSubscriptions = [
    {
      certificationId: "psm",
      expiryDate: "June 15, 2025",
    },
  ]

  // Get expiry date for a certification
  const getExpiryDate = (certId: string) => {
    if (!user) return undefined
    const subscription = userSubscriptions.find((sub) => sub.certificationId === certId)
    return subscription?.expiryDate
  }

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with Enhanced Design Elements and Animations */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Enhanced Background with Dynamic Gradient and Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,64,64,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

        {/* Animated Shape Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-primary/5"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr from-primary/10 to-primary/5"
        >
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-primary/10 to-primary/5"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            className="w-full h-full"
          />
        </motion.div>

        {/* Decorative Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-20 left-1/4 w-40 h-[1px] bg-primary/20 rotate-45"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-40 right-1/4 w-60 h-[1px] bg-primary/20 -rotate-45"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute top-1/3 right-1/3 w-20 h-[1px] bg-primary/20 rotate-90"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            className="w-full h-full"
          />
        </motion.div>

        {/* Small Decorative Dots */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-primary/30"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="w-full h-full rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-primary/30"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            className="w-full h-full rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-primary/30"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
            className="w-full h-full rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/30"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
            className="w-full h-full rounded-full"
          />
        </motion.div>

        <div className="container relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <motion.div
                  variants={itemVariants}
                  className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full"
                >
                  Certification Practice Platform
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                >
                  Master Your <span className="text-primary">Certification Exams</span> with Latih
                </motion.h1>
                <motion.p variants={itemVariants} className="max-w-[600px] text-muted-foreground md:text-xl">
                  Practice with customized tests tailored to your certification needs. Choose from various test types
                  and domains to enhance your learning.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col gap-2 sm:flex-row">
                <Link href={user ? "/certifications" : "/signup"} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-1.5 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {user ? "Browse Certifications" : "Get Started"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-primary/90 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                    How It Works
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mt-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>5,000+ Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Premium Content</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Expert-Crafted</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={scaleUpVariants}
              className="flex items-center justify-center mt-8 lg:mt-0"
            >
              <div className="relative w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Decorative Element */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/10 rounded-full"
                />

                <Image
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop"
                  alt="Certification Practice"
                  width={500}
                  height={300}
                  className="w-full object-cover rounded-2xl border border-primary/10"
                />

                {/* Floating certification badges */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Certifications Section - Enhanced Design */}
      <section className="w-full py-12 md:py-24 relative">
        {/* Enhanced Background with Gradient and Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(216,64,64,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(216,64,64,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          >
            <motion.div variants={itemVariants} className="w-16 h-1 bg-primary rounded-full mb-4" />
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Popular Certifications
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-[700px] text-muted-foreground">
              Join thousands of professionals preparing for their certification exams
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* PSM Certification Card - Using the standardized component with animation wrapper */}
            <motion.div variants={itemVariants}>
              <CertificationCard
                id="psm"
                title="Professional Scrum Master (PSM)"
                description="Learn the role and responsibilities of a Scrum Master in agile development"
                image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                questionCount={120}
                domainCount={3}
                testTypeCount={3}
                original_price={199000}
                discount_price={149000}
                isPurchased={userPurchasedCertifications.includes("psm")}
                expiryDate={getExpiryDate("psm")}
                buttonText="Start for Free Now"
                hideExtendButton={true}
              />
            </motion.div>

            {/* PSPO Certification Card - Using the standardized component with animation wrapper */}
            <motion.div variants={itemVariants}>
              <CertificationCard
                id="pspo"
                title="Professional Scrum Product Owner (PSPO)"
                description="Master the skills needed to be an effective Product Owner in Scrum"
                image="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop"
                questionCount={95}
                domainCount={3}
                testTypeCount={3}
                original_price={199000}
                discount_price={null}
                isPurchased={userPurchasedCertifications.includes("pspo")}
                expiryDate={getExpiryDate("pspo")}
                buttonText="Start for Free Now"
                hideExtendButton={true}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <Link href="/certifications">
              <Button variant="outline" className="gap-2 group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Browse All Certifications
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-primary/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced Design */}
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        {/* Enhanced Background with Gradient and Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(216,64,64,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2"
        >
          <motion.div
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 translate-y-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
            className="w-full h-full"
          />
        </motion.div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4"
            >
              <BarChart3 className="h-6 w-6 text-primary" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Features Designed for <span className="text-primary">Effective Learning</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-[700px] text-muted-foreground">
              Everything you need to prepare for your certification exams
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature Card 1 - Enhanced Design with Animation */}
            <motion.div
              variants={itemVariants}
              className="feature-card group bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mb-4 rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customized Tests</h3>
              <p className="text-muted-foreground">
                Choose from full, medium, or short tests based on your study time and needs.
              </p>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-primary/10 opacity-50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border border-primary/10 opacity-50"></div>
            </motion.div>

            {/* Feature Card 2 - Enhanced Design with Animation */}
            <motion.div
              variants={itemVariants}
              className="feature-card group bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mb-4 rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Domain Focus</h3>
              <p className="text-muted-foreground">
                Practice specific domains like Role, Artifact, or Event to target your weak areas.
              </p>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-primary/10 opacity-50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border border-primary/10 opacity-50"></div>
            </motion.div>

            {/* Feature Card 3 - Enhanced Design with Animation */}
            <motion.div
              variants={itemVariants}
              className="feature-card group bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="mb-4 rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                Get guidance from certified professionals through mentoring sessions.
              </p>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-primary/10 opacity-50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border border-primary/10 opacity-50"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - New Section with Enhanced Design */}
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        {/* Enhanced Background with Gradient and Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(216,64,64,0.03)_1px,transparent_1px),linear-gradient(135deg,rgba(216,64,64,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

          {/* Floating quote marks */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-20 left-[10%] text-primary/10 text-[200px] font-serif"
          >
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
              className="w-full h-full"
            >
              "
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute bottom-20 right-[10%] text-primary/10 text-[200px] font-serif"
          >
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 5 }}
              className="w-full h-full"
            >
              "
            </motion.div>
          </motion.div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
            >
              Success Stories
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl">
              From Our Certified Community
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-[700px] text-muted-foreground">
              Join thousands of professionals who have achieved certification success with Latih
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Testimonial 1 */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <p className="text-muted-foreground italic mb-6">
                "Latih helped me pass my PSM certification on the first try. The practice questions were spot-on and the
                explanations really helped me understand the concepts."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Scrum Master, TechCorp</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <p className="text-muted-foreground italic mb-6">
                "The domain-specific practice tests were exactly what I needed to focus my studying. I passed my PSPO
                certification with a 95% score!"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">Product Owner, InnovateSoft</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <p className="text-muted-foreground italic mb-6">
                "The analytics and progress tracking helped me identify my weak areas. After focusing on those topics, I
                felt completely confident taking my PMP exam."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Aisha Patel</h3>
                  <p className="text-sm text-muted-foreground">Project Manager, GlobalSystems</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section - Enhanced Design */}
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        {/* Enhanced Background with Gradient and Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] z-0"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
              className="w-full h-full"
            />
          </motion.div>

          {/* Decorative Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute top-10 left-10 w-20 h-[1px] bg-white/20 rotate-45"
          >
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute bottom-10 right-10 w-20 h-[1px] bg-white/20 -rotate-45"
          >
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/4 w-10 h-[1px] bg-white/20"
          >
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="absolute bottom-1/3 right-1/3 w-10 h-[1px] bg-white/20"
          >
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
              className="w-full h-full"
            />
          </motion.div>

          {/* Small Decorative Dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
            className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white/30"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="w-full h-full rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            viewport={{ once: true }}
            className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white/30"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="w-full h-full rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            viewport={{ once: true }}
            className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-white/30"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="w-full h-full rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            viewport={{ once: true }}
            className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-white/30"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
              className="w-full h-full rounded-full"
            />
          </motion.div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/50"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start <span className="text-primary">Practicing?</span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join thousands of learners who have successfully passed their certification exams with Latih.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full max-w-md space-y-2">
              <Link href={user ? "/certifications" : "/signup"} className="w-full">
                <Button size="lg" className="w-full shadow-lg hover:shadow-xl transition-all group">
                  <span className="relative z-10 flex items-center">
                    {user ? "Browse Certifications" : "Get Started Today"}
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">Start for free and upgrade when you're ready</p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Expert Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced Design */}
      <footer className="w-full py-6 md:py-12 bg-background border-t relative">
        {/* Enhanced Background with Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,64,64,0.02)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">L</span>
                </div>
                <span className="ml-2 text-xl font-bold">Latih</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Practice for certification exams with customized tests tailored to your certification needs.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium mb-4 relative inline-block">
                Main Menu
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/my-certifications"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    My Certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Browse Certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentoring"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Mentoring Sessions
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium mb-4 relative inline-block">
                Account
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forgot-password"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Forgot Password
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account-settings"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Account Settings
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium mb-4 relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@latih.com"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    support@latih.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6281905454606"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/70" />
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="container mt-8 border-t pt-8"
          >
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Latih. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
