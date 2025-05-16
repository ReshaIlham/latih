"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { Calendar, Clock, CheckCircle, ExternalLink, Coins, CreditCard, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function MentoringPage() {
  const { user } = useAuth()
  const router = useRouter()

  // External booking link - replace with your actual booking link
  const bookingLink = "https://calendly.com/latih-mentoring/session"

  // Mock user credits - in a real app, this would come from your backend
  const userCredits = user ? 2 : 0 // Example: logged in users have 2 credits
  const sessionCreditCost = 1 // Each session costs 1 credit

  // Handle booking button click
  const handleBooking = () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      router.push("/login")
    } else if (userCredits < sessionCreditCost) {
      // Redirect to buy credits if user doesn't have enough credits
      router.push("/mentoring/buy-credits")
    } else {
      // Open booking link in a new tab if user is logged in and has enough credits
      window.open(bookingLink, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="container py-10">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Mentoring Sessions</h1>
        <p className="text-muted-foreground">
          Get personalized guidance from our expert mentors to accelerate your certification journey.
        </p>
      </div>

      {user && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Mentoring Credits</p>
                  <p className="text-2xl font-bold">{userCredits} Credits</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/mentoring/buy-credits">
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Buy Credits
                  </Button>
                </Link>
                <Link href="/mentoring/credit-history">
                  <Button variant="ghost" className="gap-2">
                    <Clock className="h-4 w-4" />
                    View History
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                      <h4 className="font-medium">30-minute session</h4>
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
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-primary" />
                      <p className="text-2xl font-bold">{sessionCreditCost} Credit</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Per 30-minute session</p>
                  </div>
                  <Button className="gap-2" onClick={handleBooking}>
                    {!user ? "Login to Book" : userCredits < sessionCreditCost ? "Buy Credits" : "Book Now"}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
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
                    <h3 className="font-medium">Purchase Credits</h3>
                    <p className="text-muted-foreground">
                      Buy mentoring credits through our secure payment system or get them as a bonus with your
                      certification subscriptions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Book Your Session</h3>
                    <p className="text-muted-foreground">
                      Choose your preferred date and time through our booking system. Each session costs 1 credit.
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
              <CardTitle>Buy Mentoring Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex flex-col items-center text-center">
                  <Coins className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">1 Credit</h3>
                  <p className="text-2xl font-bold">IDR 99,000</p>
                  <p className="text-sm text-muted-foreground mb-4">One 30-minute session</p>
                  <Link href={`/mentoring/buy-credits?amount=1`} className="w-full">
                    <Button className="w-full">Buy Now</Button>
                  </Link>
                </div>

                <div className="p-4 border rounded-md flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1">
                    POPULAR
                  </div>
                  <Coins className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">3 Credits</h3>
                  <p className="text-2xl font-bold">IDR 269,000</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">IDR 297,000</span> (Save 10%)
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">Three 30-minute sessions</p>
                  <Link href={`/mentoring/buy-credits?amount=3`} className="w-full">
                    <Button className="w-full">Buy Now</Button>
                  </Link>
                </div>

                <div className="p-4 border rounded-md flex flex-col items-center text-center">
                  <Coins className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">5 Credits</h3>
                  <p className="text-2xl font-bold">IDR 399,000</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">IDR 495,000</span> (Save 20%)
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">Five 30-minute sessions</p>
                  <Link href={`/mentoring/buy-credits?amount=5`} className="w-full">
                    <Button className="w-full">Buy Now</Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <Link href="https://wa.me/628123456789" className="text-sm text-primary hover:underline">
                  Need help? Contact us via WhatsApp
                </Link>
              </div>
            </CardContent>
          </Card>

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
              <Link href="/mentoring/buy-credits" className="w-full">
                <Button className="w-full gap-2">
                  <Coins className="h-4 w-4" />
                  Buy Mentoring Credits
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
                <h3 className="font-medium">How do mentoring credits work?</h3>
                <p className="text-sm text-muted-foreground">
                  Each credit allows you to book one 30-minute mentoring session. Credits never expire.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">What if I need to reschedule?</h3>
                <p className="text-sm text-muted-foreground">
                  You can reschedule up to 24 hours before your session at no additional cost. Your credit will only be
                  used when the session occurs.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Can I get credits with my certification subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Our 3, 6, and 12-month certification subscriptions include bonus mentoring credits.
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
