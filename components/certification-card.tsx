"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ListChecks, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

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
}

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
}: CertificationCardProps) {
  return (
    <div
      className={cn(
        "certification-card group relative bg-white rounded-xl border shadow-card overflow-hidden hover:shadow-medium transition-all duration-200 flex flex-col h-full",
        className,
      )}
    >
      <div className="relative">
        {isComingSoon ? (
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
        ) : (
          <Link href={`/certifications/${id}`} className="block">
            <Image
              src={
                image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop"
              }
              alt={title}
              width={360}
              height={200}
              className="w-full h-48 object-cover"
            />
          </Link>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        {isComingSoon ? (
          <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight text-muted-foreground">{title}</h3>
        ) : (
          <Link href={`/certifications/${id}`} className="block">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
        )}
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

        <div className="mt-auto">
          {isComingSoon ? (
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          ) : (
            <Link href={`/certifications/${id}`} className="w-full">
              <Button className="w-full group">
                Start Practicing
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
          )}
        </div>
      </div>
    </div>
  )
}
