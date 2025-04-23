import { Loader2 } from "lucide-react"

export function LoadingSpinner({
  size = "default",
  className = "",
}: { size?: "sm" | "default" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-10 w-10",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
