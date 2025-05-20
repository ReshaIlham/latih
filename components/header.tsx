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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  User,
  LogOut,
  Settings,
  Menu,
  BookOpen,
  LayoutDashboard,
  Users,
  Phone,
  CreditCard,
  UserCog,
  CreditCardIcon,
  UserCheck,
  Layers,
  ChevronDown,
} from "lucide-react"
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

  // Update the isActivePath function to correctly handle certifications management
  const isActivePath = (path: string) => {
    if (path === "#") return false

    // Special case for admin dashboard - only highlight if exactly at /admin
    if (path === "/admin") {
      return pathname === "/admin"
    }

    // Special case for certifications management
    if (path === "/certifications-management") {
      return pathname.startsWith("/certifications-management")
    }

    // Special case for certifications - don't highlight when in certifications-management
    if (path === "/certifications") {
      return (
        pathname === "/certifications" ||
        (pathname.startsWith("/certifications/") && !pathname.startsWith("/certifications-management"))
      )
    }

    // For other paths, use the normal check
    return pathname === path || (path !== "/" && pathname.startsWith(path))
  }

  // Now, let's update the navigation items to remove the specified pages
  // Update the getNavItems function to remove the unwanted pages
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
          href: "#",
          icon: Users,
          children: [
            {
              name: "User Account",
              href: "/users",
              icon: UserCog,
            },
            {
              name: "User Subscription",
              href: "/user-subscriptions",
              icon: CreditCardIcon,
            },
            {
              name: "User Mentoring Session",
              href: "/user-mentoring",
              icon: UserCheck,
            },
          ],
        },
        {
          name: "Certifications Management",
          href: "/certifications-management",
          icon: BookOpen,
        },
        {
          name: "Learner Features",
          href: "#",
          icon: Layers,
          children: [
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
              name: "Subscriptions",
              href: "/subscription",
              icon: CreditCard,
            },
            {
              name: "Mentoring Sessions",
              href: "/mentoring",
              icon: Users,
            },
          ],
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
          name: "Subscriptions",
          href: "/subscription",
          icon: CreditCard,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
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
          name: "Subscriptions",
          href: "/subscription",
          icon: CreditCard,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
        },
      ]
    }
  }

  // Update the getMobileMenuItems function to remove the unwanted pages
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
          name: "User Account",
          href: "/users",
          icon: UserCog,
        },
        {
          name: "User Subscription",
          href: "/user-subscriptions",
          icon: CreditCardIcon,
        },
        {
          name: "User Mentoring Session",
          href: "/user-mentoring",
          icon: UserCheck,
        },
        {
          name: "Certifications Management",
          href: "/certifications-management",
          icon: BookOpen,
        },
        {
          name: "Learner Features",
          href: "#",
          icon: Layers,
          isSection: true,
        },
        {
          name: "My Certifications",
          href: "/my-certifications",
          icon: LayoutDashboard,
          indent: true,
        },
        {
          name: "Browse Certifications",
          href: "/certifications",
          icon: BookOpen,
          indent: true,
        },
        {
          name: "Subscriptions",
          href: "/subscription",
          icon: CreditCard,
          indent: true,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
          indent: true,
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
          name: "Subscriptions",
          href: "/subscription",
          icon: CreditCard,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
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
          name: "Subscriptions",
          href: "/subscription",
          icon: CreditCard,
        },
        {
          name: "Mentoring Sessions",
          href: "/mentoring",
          icon: Users,
        },
      ]
    }
  }

  const navItems = getNavItems()
  const mobileMenuItems = getMobileMenuItems()

  // Check if any child path is active
  const hasActiveChild = (children: any[]) => {
    return children.some((child) => isActivePath(child.href))
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background shadow-sm"
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
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff3e3e" />
                      <stop offset="100%" stopColor="#ff7676" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2L4 6V12C4 15.31 7.58 19.81 12 22C16.42 19.81 20 15.31 20 12V6L12 2Z"
                    fill="url(#logoGradient)"
                    stroke="none"
                  />
                  <path
                    d="M8.5 12L11 14.5L16 9.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Latih
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              // Check if item has children (dropdown)
              if (item.children) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                          hasActiveChild(item.children)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuGroup>
                        {item.children.map((child) => (
                          <DropdownMenuItem key={child.name} asChild>
                            <Link
                              href={child.href}
                              className={`flex items-center ${isActivePath(child.href) ? "bg-primary/10 text-primary" : ""}`}
                            >
                              <span>{child.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              // Regular menu item without dropdown
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
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
                            <div className="flex items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1"
                              >
                                <defs>
                                  <linearGradient id="mobileLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff3e3e" />
                                    <stop offset="100%" stopColor="#ff7676" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M12 2L4 6V12C4 15.31 7.58 19.81 12 22C16.42 19.81 20 15.31 20 12V6L12 2Z"
                                  fill="url(#mobileLogoGradient)"
                                  stroke="none"
                                />
                                <path
                                  d="M8.5 12L11 14.5L16 9.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                Latih
                              </span>
                            </div>
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
                          {mobileMenuItems.map((item, index) => {
                            // Section header
                            if (item.isSection) {
                              return (
                                <div
                                  key={item.name}
                                  className="mt-2 mb-1 px-3 py-1 text-sm font-semibold text-foreground"
                                >
                                  <div className="flex items-center">
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                  </div>
                                </div>
                              )
                            }

                            // Regular or indented menu item
                            return (
                              <Link
                                key={item.href + index}
                                href={item.href}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                  isActivePath(item.href)
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                                } ${item.indent ? "ml-4" : ""}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                              </Link>
                            )
                          })}
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
                            <div className="flex items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1"
                              >
                                <defs>
                                  <linearGradient id="mobileLogoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff3e3e" />
                                    <stop offset="100%" stopColor="#ff7676" />
                                  </linearGradient>
                                </defs>
                                <path
                                  d="M12 2L4 6V12C4 15.31 7.58 19.81 12 22C16.42 19.81 20 15.31 20 12V6L12 2Z"
                                  fill="url(#mobileLogoGradient2)"
                                  stroke="none"
                                />
                                <path
                                  d="M8.5 12L11 14.5L16 9.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                Latih
                              </span>
                            </div>
                          </Link>
                        </div>

                        {/* Mobile Navigation for non-authenticated users */}
                        <nav className="flex flex-col space-y-1">
                          {mobileMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActivePath(item.href)
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
