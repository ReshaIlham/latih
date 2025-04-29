import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Have questions or need assistance? We're here to help.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
              <CardDescription>Send us an email and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">For general inquiries, support requests, or feedback:</p>
              <a href="mailto:support@latih.com" className="text-primary hover:underline font-medium">
                support@latih.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                WhatsApp Support
              </CardTitle>
              <CardDescription>Get in touch with our support team via WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">For faster response and subscription inquiries:</p>
              <a
                href="https://wa.me/6281905454606"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <MessageSquare className="h-4 w-4" />
                +62 819-0545-4606
              </a>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How do I upgrade to a Premium account?</h3>
              <p className="text-muted-foreground">
                You can upgrade to Premium by visiting our{" "}
                <Link href="/pricing" className="text-primary hover:underline">
                  Pricing page
                </Link>{" "}
                and clicking on "Subscribe via WhatsApp". Our team will guide you through the payment process.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We currently accept bank transfers and digital payments. Details will be provided during the
                subscription process.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How long does it take to activate my Premium account?</h3>
              <p className="text-muted-foreground">
                Once payment is confirmed, your Premium account will be activated within 24 hours, though it's typically
                much faster.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time by contacting our support team. Your Premium access
                will remain active until the end of your billing period.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is ready to assist you with any other questions or concerns you might have.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@latih.com">
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email Us
              </Button>
            </a>
            <a href="https://wa.me/6281905454606" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp Support
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
