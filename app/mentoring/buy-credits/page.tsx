"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import {
  MessageSquare,
  Upload,
  CheckCircle,
  CreditCard,
  FileText,
  Package,
  ArrowRight,
  Check,
  Zap,
  Coins,
} from "lucide-react"

// Credit packages
const creditPackages = [
  {
    id: "1",
    amount: 1,
    price: 99000,
    originalPrice: 99000,
    discount: 0,
    popular: false,
  },
  {
    id: "3",
    amount: 3,
    price: 269000,
    originalPrice: 297000,
    discount: 10,
    popular: true,
  },
  {
    id: "5",
    amount: 5,
    price: 399000,
    originalPrice: 495000,
    discount: 20,
    popular: false,
  },
]

// Steps
const STEPS = {
  SELECT_PACKAGE: 0,
  PAYMENT_METHOD: 1,
  COMPLETE_PAYMENT: 2,
  CONFIRMATION: 3,
}

export default function BuyCreditsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_PACKAGE)
  const [selectedPackageId, setSelectedPackageId] = useState("3")
  const [paymentMethod, setPaymentMethod] = useState<"form" | "whatsapp">("form")

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get selected package data
  const selectedPackage = creditPackages.find((pkg) => pkg.id === selectedPackageId) || creditPackages[1]

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
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
        title: "Payment request submitted",
        description: "We'll process your request and add credits to your account shortly.",
      })
    }, 1500)
  }

  const handleContactAdmin = () => {
    // Open WhatsApp with a predefined message
    const message = `Hello, I'm interested in purchasing ${selectedPackage.amount} mentoring credits for ${formatPrice(
      selectedPackage.price,
    )}. Please provide more information.`
    const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Remove the line that moves to confirmation step
    // setCurrentStep(STEPS.CONFIRMATION)
  }

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId)
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
              currentStep >= STEPS.SELECT_PACKAGE ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
          </div>
          <div className={`w-12 h-1 ${currentStep > STEPS.SELECT_PACKAGE ? "bg-primary" : "bg-muted"}`}></div>
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

  // Render package selection step
  const renderSelectPackage = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Choose Credit Package</h1>
          <p className="text-muted-foreground mt-2">
            Select a credit package to book mentoring sessions with our experts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                pkg.popular ? "border-primary ring-1 ring-primary" : ""
              }`}
              onClick={() => handleSelectPackage(pkg.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <CardTitle>{pkg.amount} Credits</CardTitle>
                  </div>
                  {pkg.popular && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
                <CardDescription>
                  {pkg.amount === 1 ? "One 30-minute session" : `${pkg.amount} 30-minute sessions with our experts`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{formatPrice(pkg.price)}</div>
                  {pkg.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through text-muted-foreground">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Save {pkg.discount}%
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground pt-2">
                    {pkg.amount === 1
                      ? "Perfect for a single consultation"
                      : pkg.amount === 3
                        ? "Most popular choice for certification prep"
                        : "Comprehensive preparation package"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  Select Package <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">What you can do with mentoring credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">One-on-One Sessions</h3>
                  <p className="text-xs text-muted-foreground mt-1">Book private sessions with certification experts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Personalized Guidance</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get tailored advice for your certification journey
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Practice & Feedback</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Practice with real-world scenarios and get expert feedback
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render payment method selection step
  const renderPaymentMethod = () => {
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
            Back to Packages
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Choose Payment Method</h1>
            <p className="text-muted-foreground mt-2">Select how you'd like to complete your purchase</p>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Details</CardTitle>
              <CardDescription>Review your credit package details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-32 flex-shrink-0 bg-muted rounded-md flex items-center justify-center">
                  <Coins className="h-16 w-16 text-primary/40" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedPackage.amount} Mentoring Credits</h3>
                  <p className="text-muted-foreground mt-1">
                    {selectedPackage.amount === 1
                      ? "One 30-minute session with our certification experts"
                      : `${selectedPackage.amount} 30-minute sessions with our certification experts`}
                  </p>

                  {/* Discount display */}
                  {selectedPackage.discount > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Package Discount: {selectedPackage.discount}% OFF</span>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-muted/30 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Price:</span>
                      <div>
                        {selectedPackage.discount > 0 ? (
                          <div className="text-right">
                            <span className="text-sm line-through text-muted-foreground">
                              {formatPrice(selectedPackage.originalPrice)}
                            </span>
                            <div className="text-xl font-bold text-primary">{formatPrice(selectedPackage.price)}</div>
                          </div>
                        ) : (
                          <div className="text-xl font-bold text-primary">{formatPrice(selectedPackage.price)}</div>
                        )}
                      </div>
                    </div>

                    {/* Display discount */}
                    {selectedPackage.discount > 0 && (
                      <div className="mt-2 pt-2 border-t border-muted">
                        <div className="text-sm text-muted-foreground">Applied discount:</div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Package Discount:</span>
                          <span className="text-green-600">
                            {formatPrice(selectedPackage.originalPrice - selectedPackage.price)} OFF
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
                    <p className="text-sm font-medium">Get Credits</p>
                    <p className="text-xs text-muted-foreground">Credits added after verification</p>
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
                    <p className="text-xs text-muted-foreground">Get credits right after confirmation</p>
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
                <CardTitle>Purchase Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{selectedPackage.amount} Mentoring Credits</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedPackage.amount === 1
                          ? "One 30-minute session"
                          : `${selectedPackage.amount} 30-minute sessions`}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Price Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>{formatPrice(selectedPackage.originalPrice)}</span>
                    </div>
                    {selectedPackage.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Package Discount</span>
                        <span>-{formatPrice(selectedPackage.originalPrice - selectedPackage.price)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>{formatPrice(selectedPackage.price)}</span>
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
                      <span className="text-muted-foreground">
                        {selectedPackage.amount} mentoring credits ({selectedPackage.amount} x 30-minute sessions)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">One-on-one sessions with certification experts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">
                        Personalized guidance for your certification journey
                      </span>
                    </li>
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
          <h1 className="text-3xl font-bold">Payment Request Received</h1>
          <p className="text-muted-foreground mt-2">Thank you for your payment request. We'll process it shortly.</p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Payment Submitted Successfully</CardTitle>
                <CardDescription>Your credits will be added after verification</CardDescription>
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
                    We'll verify your payment and add credits to your account within 24 hours.
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
            <Link href="/mentoring" className="w-full">
              <Button variant="outline" className="w-full">
                Return to Mentoring
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Purchase Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{selectedPackage.amount} Mentoring Credits</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedPackage.amount === 1
                    ? "One 30-minute session"
                    : `${selectedPackage.amount} 30-minute sessions`}
                </p>
              </div>
            </div>

            <div className="text-sm border-t pt-3">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">{formatPrice(selectedPackage.price)}</span>
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
      </div>
    )
  }

  return (
    <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mx-auto">
        {currentStep < STEPS.CONFIRMATION && renderStepIndicators()}
        {currentStep === STEPS.SELECT_PACKAGE && renderSelectPackage()}
        {currentStep === STEPS.PAYMENT_METHOD && renderPaymentMethod()}
        {currentStep === STEPS.COMPLETE_PAYMENT && renderCompletePayment()}
        {currentStep === STEPS.CONFIRMATION && renderConfirmation()}
      </div>
    </div>
  )
}
