"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ListChecks, LayoutGrid, Check, Crown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Update the CertificationCardProps interface to include the new props
interface CertificationCardProps {
  id: string
  title: string
  image: string
  description: string
  questionCount: number
  domainCount: number
  testTypeCount: number
  isComingSoon?: boolean
  className?: string
  original_price: number
  discount_price: number | null
  isPurchased?: boolean
  expiryDate?: string
  isPopular?: boolean
  hideExtendButton?: boolean
  hideContinueButton?: boolean
  onSubscribeClick?: () => void
  buttonText?: string
  disableNavigation?: boolean
  buttonClassName?: string
  hidePricing?: boolean
  hidePopularBadge?: boolean
}

// Update the function parameters to include the new props
export function CertificationCard({
  id,
  title,
  image,
  description,
  questionCount,
  domainCount,
  testTypeCount,
  isComingSoon = false,
  className,
  original_price,
  discount_price,
  isPurchased = false,
  expiryDate,
  isPopular = false,
  hideExtendButton = false,
  hideContinueButton = false,
  onSubscribeClick,
  buttonText = "Subscribe Now",
  disableNavigation = false,
  buttonClassName = "",
  hidePricing = false,
  hidePopularBadge = false,
}: CertificationCardProps) {
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubscribeClick = (e: React.MouseEvent) => {
    if (onSubscribeClick) {
      e.preventDefault()
      onSubscribeClick()
    }
  }

  // Update the renderImageSection function to respect the hidePopularBadge prop
  const renderImageSection = () => {
    if (isComingSoon) {
      return (
        <div className="w-full h-48 relative">
          <Image
            src={
              image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop"
            }
            alt={title}
            width={360}
            height={200}
            className="w-full h-48 object-cover filter grayscale opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">Coming Soon</Badge>
          </div>
        </div>
      )
    }

    const imageContent = (
      <>
        <Image
          src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop"}
          alt={title}
          width={360}
          height={200}
          className="w-full h-48 object-cover"
        />
        {isPurchased && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 text-white px-2 py-1 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Subscribed
            </Badge>
          </div>
        )}
        {isPopular && !hidePopularBadge && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-amber-500 text-white px-2 py-1 flex items-center gap-1">
              <Crown className="h-3 w-3" />
              Popular
            </Badge>
          </div>
        )}
      </>
    )

    if (disableNavigation) {
      return <div className="block relative">{imageContent}</div>
    }

    return (
      <Link href={`/certifications/${id}`} className="block relative">
        {imageContent}
      </Link>
    )
  }

  // Render the title with or without navigation
  const renderTitle = () => {
    if (isComingSoon) {
      return <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight text-muted-foreground">{title}</h3>
    }

    if (disableNavigation) {
      return (
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      )
    }

    return (
      <Link href={`/certifications/${id}`} className="block">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
    )
  }

  // Render the button section
  const renderButtonSection = () => {
    if (isComingSoon) {
      return (
        <Button className="w-full" disabled>
          Coming Soon
        </Button>
      )
    }

    if (isPurchased) {
      return (
        <div className="space-y-2">
          <div className="text-sm text-green-600 flex items-center gap-1 mb-2">
            <Crown className="h-4 w-4" />
            <span>You are currently subscribed to this certification</span>
          </div>
          {!hideContinueButton && !hideExtendButton && (
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/certifications/${id}`}>
                <Button className="w-full" variant="outline">
                  Continue Learning
                </Button>
              </Link>
              <Link href={`/subscription?certification=${id}&extend=true`}>
                <Button className="w-full">Extend Subscription</Button>
              </Link>
            </div>
          )}
          {hideContinueButton && !hideExtendButton && (
            <Link href={`/subscription?certification=${id}&extend=true`}>
              <Button className="w-full">Extend Subscription</Button>
            </Link>
          )}
          {!hideContinueButton && hideExtendButton && (
            <Link href={`/certifications/${id}`}>
              <Button className="w-full">Continue Learning</Button>
            </Link>
          )}
        </div>
      )
    }

    if (onSubscribeClick) {
      return (
        <Button className={cn("w-full group", buttonClassName)} onClick={handleSubscribeClick}>
          {buttonText}
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
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Button>
      )
    }

    return (
      <Link href={`/certifications/${id}`} className="w-full">
        <Button className={cn("w-full group", buttonClassName)}>
          {buttonText}
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
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Button>
      </Link>
    )
  }

  // Update the return JSX to respect the hidePricing prop
  return (
    <div
      className={cn(
        "certification-card group relative bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full",
        isPurchased && "border-primary border-2",
        className,
      )}
    >
      <div className="relative">{renderImageSection()}</div>
      <div className="p-6 flex-grow flex flex-col">
        {renderTitle()}
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
            <BookOpen className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{questionCount} Questions</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
            <ListChecks className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{domainCount} Domains</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
            <LayoutGrid className="h-4 w-4 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">{testTypeCount} Test Types</span>
          </div>
        </div>

        {/* Updated Price display with "Up To" text */}
        {!hidePricing && (
          <div className="mb-4 bg-primary/5 p-3 rounded-lg">
            {discount_price ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">{formatPrice(discount_price)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(original_price)}</span>
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                  Up To {Math.round((1 - discount_price / original_price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <div className="text-lg font-bold text-primary">{formatPrice(original_price)}</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">per month</div>
          </div>
        )}

        {/* Subscription expiry date display */}
        {isPurchased && expiryDate && (
          <div className="mb-4 text-sm">
            <div className="flex items-center gap-1 text-amber-600">
              <Clock className="h-4 w-4" />
              <span>Expires: {expiryDate}</span>
            </div>
          </div>
        )}

        <div className="mt-auto">{renderButtonSection()}</div>
      </div>
    </div>
  )
}
