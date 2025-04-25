"use client"

import { motion } from "framer-motion"
import { CertificationCard } from "@/components/certification-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, BarChart3 } from "lucide-react"
import Link from "next/link"

// Updated certifications data with three options including PMP
const certifications = [
  {
    id: "psm",
    title: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "/images/psm-certification.jpg",
    questionCount: 120,
    domainCount: 3,
    testTypeCount: 3,
    isComingSoon: false,
  },
  {
    id: "pspo",
    title: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "/images/pspo-certification.jpg",
    questionCount: 95,
    domainCount: 3,
    testTypeCount: 3,
    isComingSoon: false,
  },
  {
    id: "pmp",
    title: "Project Management Professional (PMP)",
    description: "Prepare for the globally recognized project management certification from PMI",
    image: "/images/pmp-certification.jpg",
    questionCount: 200,
    domainCount: 4,
    testTypeCount: 3,
    isComingSoon: true,
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export default function CertificationsPage() {
  return (
    <motion.div className="container py-10 md:py-16" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-3">Professional Certification Exam Simulator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Prepare for your certification exams with our comprehensive exam simulator and test explanation
        </p>
      </motion.div>

      {/* Feature highlights */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" variants={containerVariants}>
        <motion.div
          className="bg-primary/5 rounded-xl p-6 text-center flex flex-col items-center"
          variants={itemVariants}
        >
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">Comprehensive Content</h3>
          <p className="text-muted-foreground">Over 200 practice questions covering all exam domains</p>
        </motion.div>

        <motion.div
          className="bg-primary/5 rounded-xl p-6 text-center flex flex-col items-center"
          variants={itemVariants}
        >
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">Realistic Simulations</h3>
          <p className="text-muted-foreground">Timed tests that mimic the actual certification exam experience</p>
        </motion.div>

        <motion.div
          className="bg-primary/5 rounded-xl p-6 text-center flex flex-col items-center"
          variants={itemVariants}
        >
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">Performance Analytics</h3>
          <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
        </motion.div>
      </motion.div>

      <motion.div className="mb-12" variants={itemVariants}>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get certified?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our practice tests are designed to help you pass your certification exam on the first try. Choose a
            certification below to get started.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-md">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div className="grid gap-8 md:grid-cols-3" variants={containerVariants}>
        {certifications.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <CertificationCard
              id={cert.id}
              title={cert.title}
              image={cert.image}
              description={cert.description}
              questionCount={cert.questionCount}
              domainCount={cert.domainCount}
              testTypeCount={cert.testTypeCount}
              isComingSoon={cert.isComingSoon}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-16 text-center" variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Need more options?</h2>
        <p className="text-muted-foreground mb-6">
          We're constantly adding new certifications to our platform. Check back soon for more options.
        </p>
        <Link href="/pricing">
          <Button variant="outline" size="lg">
            View Pricing Plans
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
