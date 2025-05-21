"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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

export function Footer() {
  return (
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
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3e3e" />
                      <stop offset="100%" stopColor="#ff7676" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2L4 6V12C4 15.31 7.58 19.81 12 22C16.42 19.81 20 15.31 20 12V6L12 2Z"
                    fill="url(#footerLogoGradient)"
                    stroke="none"
                  />
                  <path
                    d="M8.5 12L11 14.5L16 9.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Latih
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Practice for certification exams with customized tests tailored to your certification needs.
            </p>
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
                  href="/subscription"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3 text-primary/70" />
                  Subscriptions
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
  )
}
