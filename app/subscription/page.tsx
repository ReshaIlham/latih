"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { CertificationCard } from "@/components/certification-card"
import {
  MessageSquare,
  Upload,
  CheckCircle,
  CreditCard,
  FileText,
  Package,
  ArrowRight,
  Check,
  Clock,
  Zap,
  Coins,
} from "lucide-react"

// Mock certification data - only PSM and PSPO
const mockCertifications = [
  {
    id: "psm",
    title: "Professional Scrum Master (PSM)",
    description: "Learn the role and responsibilities of a Scrum Master in agile development",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    questionCount: 120,
    domainCount: 3,
    testTypeCount: 3,
    original_price: 199000,
    discount_price: 149000,
    certDiscount: 25, // Certification discount percentage
    isPopular: false,
    isComingSoon: false,
  },
  {
    id: "pspo",
    title: "Professional Scrum Product Owner (PSPO)",
    description: "Master the skills needed to be an effective Product Owner in Scrum",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop",
    questionCount: 95,
    domainCount: 3,
    testTypeCount: 3,
    original_price: 199000,
    discount_price: null,
    certDiscount: 0, // No certification discount
    isPopular: false,
    isComingSoon: false,
  },
]

// Mock user subscriptions
const userSubscriptions = [
  {
    certificationId: "psm",
    expiryDate: "June 15, 2025",
  },
]

// Subscription steps
const STEPS = {
  SELECT_CERTIFICATION: 0,
  PAYMENT_METHOD: 1,
  COMPLETE_PAYMENT: 2,
  CONFIRMATION: 3,
}

// Duration discounts
const DURATION_DISCOUNTS = {
  "1": { multiplier: 1, discount: 0 },
  "3": { multiplier: 2.7, discount: 10 },
  "6": { multiplier: 5, discount: 17 },
  "12": { multiplier: 9, discount: 25 },
}

export default function SubscriptionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const initialCertId = searchParams.get("certification")
  const isExtending = searchParams.get("extend") === "true"
  const { toast } = useToast()

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_CERTIFICATION)
  const [selectedCertificationId, setSelectedCertificationId] = useState<string | null>(initialCertId)
  const [paymentMethod, setPaymentMethod] = useState<"form" | "whatsapp">("form")

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionDuration, setSubscriptionDuration] = useState<"1" | "3" | "6" | "12">("1")

  // Set initial certification if provided in URL
  useEffect(() => {
    if (initialCertId) {
      const certExists = mockCertifications.some((cert) => cert.id === initialCertId)
      if (certExists) {
        setSelectedCertificationId(initialCertId)
        setCurrentStep(STEPS.PAYMENT_METHOD)
      }
    }
  }, [initialCertId])

  // Get selected certification data
  const selectedCertification = selectedCertificationId
    ? mockCertifications.find((cert) => cert.id === selectedCertificationId)
    : null

  // Check if user is subscribed to the selected certification
  const isSubscribed = (certId: string) => {
    if (!user) return false
    return userSubscriptions.some((sub) => sub.certificationId === certId)
  }

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

  // Calculate total price based on duration and certification discount
  const calculateTotalPrice = (basePrice: number) => {
    const durationData = DURATION_DISCOUNTS[subscriptionDuration]
    return Math.round(basePrice * durationData.multiplier)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep(STEPS.CONFIRMATION)
      toast({
        title: "Subscription request submitted",
        description: "We'll process your request and activate your subscription shortly.",
      })
    }, 1500)
  }

  const handleContactAdmin = () => {
    if (!selectedCertification) return

    // Open WhatsApp with a predefined message
    const message = `Hello, I'm interested in ${isExtending ? "extending my subscription to" : "subscribing to"} the ${
      selectedCertification.title
    } certification on Latih for ${subscriptionDuration} month${
      subscriptionDuration !== "1" ? "s" : ""
    }. Please provide more information.`
    const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Remove the line that moves to confirmation step
    // setCurrentStep(STEPS.CONFIRMATION)
  }

  const handleSelectCertification = (certId: string) => {
    // If user is not logged in, redirect to login page
    if (!user) {
      router.push(`/login?redirect=/subscription?certification=${certId}`)
      return
    }

    setSelectedCertificationId(certId)
    setCurrentStep(STEPS.PAYMENT_METHOD)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= STEPS.SELECT_CERTIFICATION ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
          </div>
          <div className={`w-12 h-1 ${currentStep > STEPS.SELECT_CERTIFICATION ? "bg-primary" : "bg-muted"}`}></div>
        </div>

        <div className="flex items-center">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= STEPS.PAYMENT_METHOD ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <CreditCard className="h-4 w-4" />
          </div>
          <div className={`w-12 h-1 ${currentStep > STEPS.PAYMENT_METHOD ? "bg-primary" : "bg-muted"}`}></div>
        </div>

        <div className="flex items-center">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentStep >= STEPS.COMPLETE_PAYMENT ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
          </div>
          <div className={`w-12 h-1 ${currentStep > STEPS.COMPLETE_PAYMENT ? "bg-primary" : "bg-muted"}`}></div>
        </div>

        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full ${
            currentStep >= STEPS.CONFIRMATION ? "bg-primary text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          <CheckCircle className="h-4 w-4" />
        </div>
      </div>
    )
  }

  // Render certification selection step
  const renderSelectCertification = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Choose a Certification</h1>
          <p className="text-muted-foreground mt-2">
            {user
              ? "Select a certification to subscribe and access premium features"
              : "Browse our certifications. You'll need to log in to subscribe."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mockCertifications.map((cert) => (
            <div key={cert.id} className="cursor-pointer" onClick={() => handleSelectCertification(cert.id)}>
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
                isPurchased={isSubscribed(cert.id)}
                expiryDate={getExpiryDate(cert.id)}
                isPopular={cert.isPopular}
                hideContinueButton={true}
                hideExtendButton={false}
                onSubscribeClick={() => handleSelectCertification(cert.id)}
                buttonText="Subscribe Now"
                disableNavigation={true}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render payment method selection step
  const renderPaymentMethod = () => {
    if (!selectedCertification) return null

    const durationData = DURATION_DISCOUNTS[subscriptionDuration]
    const basePrice = selectedCertification.discount_price || selectedCertification.original_price
    const durationDiscount = durationData.discount
    const certDiscount = selectedCertification.certDiscount || 0

    return (
      <div className="space-y-6">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={handleBack}>
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
              className="mr-2 h-4 w-4"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Certifications
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Choose Payment Method</h1>
            <p className="text-muted-foreground mt-2">Select how you'd like to complete your subscription</p>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                {isExtending ? "Extend your subscription to this certification" : "Subscribe to this certification"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                  <Image
                    src={selectedCertification.image || "/placeholder.svg"}
                    alt={selectedCertification.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedCertification.title}</h3>
                  <p className="text-muted-foreground mt-1">{selectedCertification.description}</p>

                  {isExtending && (
                    <div className="mt-2 flex items-center gap-1 text-amber-600 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Current expiry: {getExpiryDate(selectedCertification.id)}</span>
                    </div>
                  )}

                  {/* Certification discount display */}
                  {certDiscount > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Certification Discount: {certDiscount}% OFF</span>
                    </div>
                  )}

                  <div className="mt-4">
                    <Label htmlFor="duration">Subscription Duration</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <Button
                        type="button"
                        variant={subscriptionDuration === "1" ? "default" : "outline"}
                        className="flex flex-col items-center py-2 h-auto relative"
                        onClick={() => setSubscriptionDuration("1")}
                      >
                        <span className="text-lg font-bold">1</span>
                        <span className="text-xs">Month</span>
                      </Button>
                      <Button
                        type="button"
                        variant={subscriptionDuration === "3" ? "default" : "outline"}
                        className="flex flex-col items-center py-2 h-auto relative"
                        onClick={() => setSubscriptionDuration("3")}
                      >
                        <span className="text-lg font-bold">3</span>
                        <span className="text-xs">Months</span>
                        {subscriptionDuration === "3" && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded absolute -bottom-1">
                            10% OFF
                          </span>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant={subscriptionDuration === "6" ? "default" : "outline"}
                        className="flex flex-col items-center py-2 h-auto relative"
                        onClick={() => setSubscriptionDuration("6")}
                      >
                        <span className="text-lg font-bold">6</span>
                        <span className="text-xs">Months</span>
                        {subscriptionDuration === "6" && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded absolute -bottom-1">
                            17% OFF
                          </span>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant={subscriptionDuration === "12" ? "default" : "outline"}
                        className="flex flex-col items-center py-2 h-auto relative"
                        onClick={() => setSubscriptionDuration("12")}
                      >
                        <span className="text-lg font-bold">12</span>
                        <span className="text-xs">Months</span>
                        {subscriptionDuration === "12" && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded absolute -bottom-1">
                            25% OFF
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-muted/30 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Price:</span>
                      <div>
                        {selectedCertification.discount_price ? (
                          <div className="text-right">
                            <span className="text-sm line-through text-muted-foreground">
                              {formatPrice(calculateTotalPrice(selectedCertification.original_price))}
                            </span>
                            <div className="text-xl font-bold text-primary">
                              {formatPrice(calculateTotalPrice(selectedCertification.discount_price))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xl font-bold text-primary">
                            {formatPrice(calculateTotalPrice(selectedCertification.original_price))}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          for {subscriptionDuration} month{subscriptionDuration !== "1" ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    {/* Display both discount types */}
                    {(certDiscount > 0 || durationDiscount > 0) && (
                      <div className="mt-2 pt-2 border-t border-muted">
                        <div className="text-sm text-muted-foreground">Applied discounts:</div>
                        <div className="flex flex-col gap-1 mt-1">
                          {certDiscount > 0 && (
                            <div className="flex justify-between text-xs">
                              <span>Certification Discount:</span>
                              <span className="text-green-600">
                                {formatPrice((selectedCertification.original_price * certDiscount) / 100)} OFF
                              </span>
                            </div>
                          )}
                          {durationDiscount > 0 && (
                            <div className="flex justify-between text-xs">
                              <span>Duration Discount:</span>
                              <span className="text-green-600">
                                {formatPrice((basePrice * durationData.multiplier * durationDiscount) / 100)} OFF
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Add bonus credits information */}
                    {subscriptionDuration !== "1" && (
                      <div className="mt-2 pt-2 border-t border-muted">
                        <div className="text-sm text-muted-foreground">Bonus benefits:</div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-primary" />
                            Mentoring Credits:
                          </span>
                          <span className="text-primary font-medium">
                            {subscriptionDuration === "3" ? "1" : subscriptionDuration === "6" ? "2" : "4"} free credits
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer transition-all hover:border-primary ${
              paymentMethod === "form" ? "border-primary ring-1 ring-primary" : ""
            }`}
            onClick={() => {
              setPaymentMethod("form")
              setCurrentStep(STEPS.COMPLETE_PAYMENT)
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Payment Form
              </CardTitle>
              <CardDescription>Fill out a form and upload your payment proof</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Transfer Payment</p>
                    <p className="text-xs text-muted-foreground">Transfer to our bank account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Upload Proof</p>
                    <p className="text-xs text-muted-foreground">Upload your payment receipt</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Get Access</p>
                    <p className="text-xs text-muted-foreground">Access granted after verification</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <ArrowRight className="h-4 w-4" />
                Continue with Form
              </Button>
            </CardFooter>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:border-primary ${
              paymentMethod === "whatsapp" ? "border-primary ring-1 ring-primary" : ""
            }`}
            onClick={() => {
              setPaymentMethod("whatsapp")
              handleContactAdmin()
              // Don't change the step
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                WhatsApp
              </CardTitle>
              <CardDescription>Chat directly with our admin for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Contact Admin</p>
                    <p className="text-xs text-muted-foreground">Chat with our admin via WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Get Payment Details</p>
                    <p className="text-xs text-muted-foreground">Receive payment instructions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Immediate Activation</p>
                    <p className="text-xs text-muted-foreground">Get access right after confirmation</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                <MessageSquare className="h-4 w-4" />
                Contact via WhatsApp
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // Render complete payment step
  const renderCompletePayment = () => {
    if (!selectedCertification) return null

    const basePrice = selectedCertification.discount_price || selectedCertification.original_price
    const durationDiscount = DURATION_DISCOUNTS[subscriptionDuration].discount
    const certDiscount = selectedCertification.certDiscount || 0

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Payment</h1>
          <p className="text-muted-foreground mt-2">Fill out the form and upload your payment proof</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedCertification.image || "/placeholder.svg"}
                        alt={selectedCertification.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{selectedCertification.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {subscriptionDuration} Month{subscriptionDuration !== "1" ? "s" : ""} Subscription
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Price Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>
                        {formatPrice(selectedCertification.original_price)}
                        <span className="text-xs text-muted-foreground"> / month</span>
                      </span>
                    </div>
                    {certDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Certification Discount</span>
                        <span>-{formatPrice((selectedCertification.original_price * certDiscount) / 100)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span>
                        {subscriptionDuration} month{subscriptionDuration !== "1" ? "s" : ""}
                      </span>
                    </div>
                    {durationDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Duration Discount</span>
                        <span>
                          -
                          {formatPrice(
                            (basePrice * DURATION_DISCOUNTS[subscriptionDuration].multiplier * durationDiscount) / 100,
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotalPrice(basePrice))}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Bank Account Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>Bank: BCA</p>
                    <p>Account Number: 1234567890</p>
                    <p>Account Name: PT Latih Indonesia</p>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-medium mb-2">What You'll Get</h3>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">Access to all test types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">Detailed explanations for all questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">Unlimited practice tests</span>
                    </li>
                    {subscriptionDuration !== "1" && (
                      <li className="flex items-start gap-2">
                        <Coins className="h-3.5 w-3.5 text-primary mt-0.5" />
                        <span className="text-primary font-medium">
                          {subscriptionDuration === "3" ? "1" : subscriptionDuration === "6" ? "2" : "4"} free mentoring
                          credits (worth{" "}
                          {formatPrice(
                            subscriptionDuration === "3" ? 99000 : subscriptionDuration === "6" ? 198000 : 396000,
                          )}
                          )
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Please fill out the form below and upload your payment proof</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-proof">Payment Proof</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="payment-proof"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload a screenshot or photo of your payment receipt (JPG, PNG, or PDF)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information you'd like to share"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Submit Payment"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Render confirmation step
  const renderConfirmation = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Subscription Request Received</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your subscription request. We'll process your payment shortly.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Payment Submitted Successfully</CardTitle>
                <CardDescription>
                  Your subscription will be {isExtending ? "extended" : "activated"} after verification
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment Verification</p>
                  <p className="text-xs text-muted-foreground">
                    We'll verify your payment and {isExtending ? "extend" : "activate"} your subscription within 24
                    hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment History</p>
                  <p className="text-xs text-muted-foreground">
                    You can view your payment history and subscription status in the My Certifications page.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Need Help?</p>
                  <p className="text-xs text-muted-foreground">
                    If you have any questions, please contact our support team via WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6 bg-muted/10">
            <Link href="/my-certifications" className="w-full">
              <Button className="w-full">Go to My Certifications</Button>
            </Link>
            <Link href="/certifications" className="w-full">
              <Button variant="outline" className="w-full">
                Browse More Certifications
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {selectedCertification && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Subscription Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={selectedCertification.image || "/placeholder.svg"}
                    alt={selectedCertification.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{selectedCertification.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {subscriptionDuration} Month{subscriptionDuration !== "1" ? "s" : ""} Subscription
                  </p>
                </div>
              </div>

              <div className="text-sm border-t pt-3">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">
                    {formatPrice(
                      calculateTotalPrice(selectedCertification.discount_price || selectedCertification.original_price),
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="text-amber-600 font-medium">Pending Verification</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mx-auto">
        {currentStep < STEPS.CONFIRMATION && renderStepIndicators()}
        {currentStep === STEPS.SELECT_CERTIFICATION && renderSelectCertification()}
        {currentStep === STEPS.PAYMENT_METHOD && renderPaymentMethod()}
        {currentStep === STEPS.COMPLETE_PAYMENT && renderCompletePayment()}
        {currentStep === STEPS.CONFIRMATION && renderConfirmation()}
      </div>
    </div>
  )
}
