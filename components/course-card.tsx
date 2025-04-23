"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  id: string
  title: string
  image: string
  instructor: string
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  isPremium?: boolean
  isFavorite?: boolean
  onToggleFavorite?: () => void
  className?: string
}

export function CourseCard({
  id,
  title,
  image,
  instructor,
  rating,
  reviewCount,
  price,
  originalPrice,
  isPremium = false,
  isFavorite = false,
  onToggleFavorite,
  className,
}: CourseCardProps) {
  return (
    <div className={cn("course-card group relative", className)}>
      <div className="relative">
        <Link href={`/certifications/${id}`}>
          <Image
            src={image || "/placeholder.svg?height=200&width=360"}
            alt={title}
            width={360}
            height={200}
            className="course-card-image"
          />
        </Link>
        {isPremium && <div className="course-card-badge">Premium</div>}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-muted-foreground hover:bg-white hover:text-primary"
          onClick={onToggleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-primary text-primary")} />
        </Button>
      </div>
      <div className="p-4">
        <Link href={`/certifications/${id}`}>
          <h3 className="mb-1 line-clamp-2 font-semibold leading-tight hover:text-primary">{title}</h3>
        </Link>
        <p className="mb-2 text-sm text-muted-foreground">{instructor}</p>
        <div className="mb-3 flex items-center">
          <div className="flex items-center">
            <div className="mr-1 text-amber-500">★</div>
            <span className="mr-1 font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
        <div className="course-card-price">
          <span className="course-card-price-current">${price}</span>
          {originalPrice && <span className="course-card-price-original">${originalPrice}</span>}
        </div>
      </div>
    </div>
  )
}
