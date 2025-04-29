"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { User, LogOut, Settings, Menu, BookOpen, LayoutDashboard, Users, CreditCard, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut, isAdmin } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Skip header on login and signup pages
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password"

  // Navigation items based on user role
  const getNavItems = () => {
    // Items for admin users - reordered as requested
    if (isAdmin) {
      return [
        {
          name: "Admin Dashboard",
          href: "/admin",
          icon: Settings,
        },
        {
          name: "User Management",
          href: "/admin/users",
          icon: Users,
        },
        {
          name: "Certifications Management",
          href: "/admin/certifications",
          icon: BookOpen,
        },
        {
          name: "My Certifications",
          href: "/my-certifications",
          icon: LayoutDashboard,
        },
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
      ]
    }
    // Items for learner users - reordered as requested and added mentoring session
    else if (user) {
      return [
        {
          name: "My Certifications",
          href: "/my-certifications",
          icon: LayoutDashboard,
        },
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
        },
        {
          name: "Pricing",
          href: "/pricing",
          icon: CreditCard,
        },
      ]
    }
    // For non-authenticated users
    else {
      return [
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
        {
          name: "Pricing",
          href: "/pricing",
          icon: CreditCard,
        },
      ]
    }
  }

  // Mobile menu items based on user role
  const getMobileMenuItems = () => {
    // Items for admin users
    if (isAdmin) {
      return [
        {
          name: "Admin Dashboard",
          href: "/admin",
          icon: Settings,
        },
        {
          name: "User Management",
          href: "/admin/users",
          icon: Users,
        },
        {
          name: "Certifications Management",
          href: "/admin/certifications",
          icon: BookOpen,
        },
        {
          name: "My Certifications",
          href: "/my-certifications",
          icon: LayoutDashboard,
        },
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
      ]
    }
    // Items for learner users
    else if (user) {
      return [
        {
          name: "My Certifications",
          href: "/my-certifications",
          icon: LayoutDashboard,
        },
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
        },
        {
          name: "Pricing",
          href: "/pricing",
          icon: CreditCard,
        },
      ]
    }
    // For non-authenticated users
    else {
      return [
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
        },
        {
          name: "Pricing",
          href: "/pricing",
          icon: CreditCard,
        },
      ]
    }
  }

  const navItems = getNavItems()
  const mobileMenuItems = getMobileMenuItems()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-lg font-bold">L</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">Latih</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : pathname.startsWith(item.href + "/") && item.href !== "/admin"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {!isAuthPage && (
            <>
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name?.charAt(0) || <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-primary mt-1 font-medium">
                          {user.role === "admin" ? "Administrator" : "Learner"}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account-settings" className="flex cursor-pointer items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Account Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/contact" className="flex cursor-pointer items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Contact</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Mobile Menu Button for authenticated users */}
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>

                  {/* Mobile Menu Sheet */}
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                      <div className="flex flex-col space-y-6 py-6">
                        <div className="flex items-center justify-between">
                          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <span className="text-lg font-bold">L</span>
                            </div>
                            <span className="ml-2 text-xl font-bold">Latih</span>
                          </Link>
                        </div>

                        <div className="flex flex-col space-y-1 p-2 border-b pb-4">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {user.role === "admin" ? "Administrator" : "Learner"}
                          </p>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex flex-col space-y-1">
                          {mobileMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === item.href
                                  ? "bg-primary/10 text-primary"
                                  : pathname.startsWith(item.href + "/") && item.href !== "/admin"
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon className="mr-2 h-4 w-4" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>

                        <div className="border-t pt-4 space-y-2">
                          <Link href="/account-settings" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full flex items-center justify-start">
                              <Settings className="mr-2 h-4 w-4" />
                              Account Settings
                            </Button>
                          </Link>
                          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full flex items-center justify-start">
                              <Phone className="mr-2 h-4 w-4" />
                              Contact
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-start text-red-500"
                            onClick={() => {
                              signOut()
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              ) : (
                <>
                  <div className="hidden items-center gap-2 md:flex">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>

                  {/* Mobile Menu Button for non-authenticated users */}
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>

                  {/* Mobile Menu Sheet for non-authenticated users */}
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                      <div className="flex flex-col space-y-6 py-6">
                        <div className="flex items-center justify-between">
                          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <span className="text-lg font-bold">L</span>
                            </div>
                            <span className="ml-2 text-xl font-bold">Latih</span>
                          </Link>
                        </div>

                        {/* Mobile Navigation for non-authenticated users */}
                        <nav className="flex flex-col space-y-1">
                          {mobileMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === item.href
                                  ? "bg-primary/10 text-primary"
                                  : pathname.startsWith(item.href + "/") && item.href !== "/admin"
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <item.icon className="mr-2 h-4 w-4" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>

                        <div className="border-t pt-4">
                          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full flex items-center justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Log In
                            </Button>
                          </Link>
                          <div className="mt-3">
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                              <Button className="w-full flex items-center justify-start">
                                <User className="mr-2 h-4 w-4" />
                                Sign Up
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
