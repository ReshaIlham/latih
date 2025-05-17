"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { CertificationCard } from "@/components/certification-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, CreditCard, Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-provider"

// Updated certifications data with three options including PMP
const certifications = [
  {
    id: "psm",
    title: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    questionCount: 120,
    domainCount: 3,
    testTypeCount: 3,
    isComingSoon: false,
    original_price: 199000,
    discount_price: 149000,
  },
  {
    id: "pspo",
    title: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
    questionCount: 95,
    domainCount: 3,
    testTypeCount: 3,
    isComingSoon: false,
    original_price: 199000,
    discount_price: null,
  },
  {
    id: "pmp",
    title: "Project Management Professional (PMP)",
    description: "Prepare for the globally recognized project management certification from PMI",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2940&auto=format&fit=crop",
    questionCount: 200,
    domainCount: 4,
    testTypeCount: 3,
    isComingSoon: true,
    original_price: 249000,
    discount_price: null,
  },
]

// Add mock subscription data with expiry dates
const userSubscriptions = [
  {
    certificationId: "psm",
    expiryDate: "June 15, 2025",
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

// Update the component to pass expiry dates to certification cards
export default function CertificationsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for user's purchased certifications
  const userPurchasedCertifications = user ? ["psm"] : []

  // Get expiry date for a certification
  const getExpiryDate = (certId: string) => {
    if (!user) return undefined
    const subscription = userSubscriptions.find((sub) => sub.certificationId === certId)
    return subscription?.expiryDate
  }

  // Filter certifications based on search term
  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div className="container py-10 md:py-16" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-3">Professional Certification Exam Simulator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Prepare for your certification exams with our comprehensive exam simulator and test explanation
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div className="mb-8 max-w-md mx-auto" variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certifications..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div className="grid gap-8 md:grid-cols-3" variants={containerVariants}>
        {filteredCertifications.length > 0 ? (
          filteredCertifications.map((cert) => (
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
                original_price={cert.original_price}
                discount_price={cert.discount_price}
                isPurchased={userPurchasedCertifications.includes(cert.id)}
                expiryDate={getExpiryDate(cert.id)}
                isPopular={false}
                hideExtendButton={true}
                buttonText="Start for Free Now"
              />
            </motion.div>
          ))
        ) : (
          <motion.div className="col-span-3 text-center py-12" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-2">No certifications found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search term or check back later for new certifications.
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div className="mt-16 text-center" variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Need more options?</h2>
        <p className="text-muted-foreground mb-6">
          We're constantly adding new certifications to our platform. Check back soon for more options, subscribe to our
          plans, or book a mentoring session for personalized guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/subscription">
            <Button size="lg" className="shadow-md gap-2">
              <CreditCard className="h-4 w-4" />
              View Subscription Plans
            </Button>
          </Link>
          <Link href="/mentoring">
            <Button size="lg" className="shadow-md gap-2">
              <Users className="h-4 w-4" />
              Book Mentoring Session
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
