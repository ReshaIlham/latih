"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-provider"
import { ArrowLeft, Calendar, Coins, CreditCard, MessageSquare } from "lucide-react"

export default function PaymentHistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("subscriptions")

  // Mock data for subscription payments
  const subscriptionPayments = [
    {
      id: "payment-1",
      type: "Subscription",
      item: "Professional Scrum Master (PSM)",
      amount: 149000,
      date: "2023-09-01T14:30:00Z",
      status: "completed",
      duration: "1 month",
      paymentMethod: "Bank Transfer",
      paymentId: "INV-123456",
    },
    {
      id: "payment-2",
      type: "Subscription",
      item: "Project Management Professional (PMP)",
      amount: 199000,
      date: "2023-08-15T09:45:00Z",
      status: "completed",
      duration: "3 months",
      paymentMethod: "Credit Card",
      paymentId: "INV-789012",
    },
    {
      id: "payment-4",
      type: "Subscription",
      item: "SAFe Agilist (SA)",
      amount: 249000,
      date: "2023-07-20T11:15:00Z",
      status: "completed",
      duration: "6 months",
      paymentMethod: "Bank Transfer",
      paymentId: "INV-345678",
    },
    {
      id: "payment-6",
      type: "Subscription",
      item: "Professional Scrum Master (PSM)",
      amount: 149000,
      date: "2022-09-01T10:30:00Z",
      status: "completed",
      duration: "1 month",
      paymentMethod: "Bank Transfer",
      paymentId: "INV-901234",
    },
    {
      id: "payment-7",
      type: "Subscription",
      item: "Project Management Professional (PMP)",
      amount: 199000,
      date: "2022-08-15T13:45:00Z",
      status: "completed",
      duration: "3 months",
      paymentMethod: "Credit Card",
      paymentId: "INV-567890",
    },
  ]

  // Mock data for mentoring credit payments
  const creditPayments = [
    {
      id: "credit-1",
      type: "Mentoring Credits",
      item: "20 Mentoring Credits",
      amount: 450000,
      date: "2023-10-05T15:20:00Z",
      status: "completed",
      paymentMethod: "Bank Transfer",
      paymentId: "INV-234567",
    },
    {
      id: "credit-2",
      type: "Mentoring Credits",
      item: "10 Mentoring Credits",
      amount: 225000,
      date: "2023-06-15T09:10:00Z",
      status: "completed",
      paymentMethod: "Credit Card",
      paymentId: "INV-890123",
    },
    {
      id: "credit-3",
      type: "Mentoring Credits",
      item: "15 Mentoring Credits",
      amount: 350000,
      date: "2022-10-05T14:30:00Z",
      status: "completed",
      paymentMethod: "Bank Transfer",
      paymentId: "INV-456789",
    },
  ]

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate total spent
  const totalSubscriptionSpent = subscriptionPayments.reduce((total, payment) => total + payment.amount, 0)
  const totalCreditSpent = creditPayments.reduce((total, payment) => total + payment.amount, 0)
  const totalSpent = totalSubscriptionSpent + totalCreditSpent

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/my-certifications")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Payment History</h1>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push("/contact")}>
                  <MessageSquare className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscriptions">Subscription Payments</TabsTrigger>
          <TabsTrigger value="credits">Mentoring Credit Purchases</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Transactions</CardTitle>
              <CardDescription>History of all your certification subscription payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptionPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.item}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pl-10">
                        Duration: {payment.duration} • Payment ID: {payment.paymentId}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(payment.amount)}</p>
                    </div>
                  </div>
                ))}

                {subscriptionPayments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No subscription payment records found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mentoring Credit Purchases</CardTitle>
              <CardDescription>History of all your mentoring credit purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creditPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <Coins className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.item}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pl-10">Payment ID: {payment.paymentId}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(payment.amount)}</p>
                    </div>
                  </div>
                ))}

                {creditPayments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No mentoring credit purchase records found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
