import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = "Back to Certification Management" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors rounded-full bg-red-50 px-4 py-2"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}
