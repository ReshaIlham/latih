"use client"

import Link from "next/link"
import { BookOpen, ListChecks, LayoutGrid, BookOpenCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface CertificationCardProps {
  id: string
  title: string
  image: string // We'll ignore this but keep it for compatibility
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
          <div className="w-full h-48 relative bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <BookOpenCheck className="h-16 w-16 text-primary/30 mb-2" />
              <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">Coming Soon</Badge>
            </div>
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-around">
                    {Array.from({ length: 5 }).map((_, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-8 h-8 m-2 rounded-full border border-primary/20"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link href={`/certifications/${id}`} className="block">
            <div className="w-full h-48 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center relative">
              <BookOpenCheck className="h-16 w-16 text-primary/30" />
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-around">
                      {Array.from({ length: 5 }).map((_, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="w-8 h-8 m-2 rounded-full border border-primary/20"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
              <Button className="w-full">Start Practicing</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
