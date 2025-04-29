"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { Calendar, Clock, CheckCircle, ArrowRight, ExternalLink } from "lucide-react"

export default function MentoringPage() {
  const { user } = useAuth()
  const router = useRouter()

  // External booking link - replace with your actual booking link
  const bookingLink = "https://calendly.com/latih-mentoring/session"

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container py-10">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Mentoring Sessions</h1>
        <p className="text-muted-foreground">
          Get personalized guidance from our expert mentors to accelerate your certification journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Private Mentoring Sessions</CardTitle>
              <CardDescription>Book a one-on-one session with our certification experts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative h-64 rounded-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop"
                  alt="Mentoring Sessions"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">One-on-One Mentoring</h3>
                  <p className="text-muted-foreground">
                    Get personalized guidance tailored to your specific needs and learning pace. Our expert mentors will
                    help you focus on areas where you need the most improvement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">60-minute session</h4>
                      <p className="text-sm text-muted-foreground">Focused time with your mentor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Flexible scheduling</h4>
                      <p className="text-sm text-muted-foreground">Book at your convenience</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">What to expect:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Personalized study plan based on your current knowledge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deep dive into complex certification topics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Practice with real-world scenarios and examples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Targeted feedback on your weak areas</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between bg-primary/5 p-4 rounded-md">
                  <div>
                    <p className="font-medium">Individual Session</p>
                    <p className="text-2xl font-bold">$99</p>
                    <p className="text-sm text-muted-foreground">Per 60-minute session</p>
                  </div>
                  <Link href={bookingLink} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2">
                      Book Now <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Book Your Session</h3>
                    <p className="text-muted-foreground">
                      Choose your preferred date and time through our booking system. You'll receive a confirmation
                      email with all the details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Payment Confirmation</h3>
                    <p className="text-muted-foreground">
                      Our team will contact you regarding payment options. Once payment is confirmed, your session is
                      secured.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Pre-Session Questionnaire</h3>
                    <p className="text-muted-foreground">
                      You'll receive a short questionnaire to help your mentor prepare and tailor the session to your
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Attend Your Session</h3>
                    <p className="text-muted-foreground">
                      Join the video call at your scheduled time. Come prepared with questions and areas you want to
                      focus on.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Follow-Up Resources</h3>
                    <p className="text-muted-foreground">
                      After your session, you'll receive follow-up materials and resources to continue your learning
                      journey.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Meet Our Mentors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop"
                      alt="John Smith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-muted-foreground">PSM III, PSPO II</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2888&auto=format&fit=crop"
                      alt="Sarah Davis"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah Davis</h3>
                    <p className="text-sm text-muted-foreground">PMP, CSM, SAFe Agilist</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop"
                      alt="Michael Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Michael Johnson</h3>
                    <p className="text-sm text-muted-foreground">AWS Solutions Architect, Azure Expert</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic">
                    "The mentoring session was incredibly helpful. My mentor identified gaps in my knowledge and
                    provided targeted resources that helped me pass my certification exam on the first try."
                  </p>
                  <p className="text-sm font-medium">- Alex P., PSM I Certified</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic">
                    "My mentor's expertise was invaluable. They provided practical insights and techniques that weren't
                    covered in any of the study materials I had been using."
                  </p>
                  <p className="text-sm font-medium">- Jamie L., AWS Certified</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={bookingLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2">
                  Book Your Session Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">How long are the sessions?</h3>
                <p className="text-sm text-muted-foreground">Each mentoring session is 60 minutes long.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">What if I need to reschedule?</h3>
                <p className="text-sm text-muted-foreground">
                  You can reschedule up to 24 hours before your session at no additional cost.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">How do I pay for sessions?</h3>
                <p className="text-sm text-muted-foreground">
                  After booking, our team will contact you with payment options including credit card and bank transfer.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Can I request a specific mentor?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can request a specific mentor when booking, subject to availability.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
