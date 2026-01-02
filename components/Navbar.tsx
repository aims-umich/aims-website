"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { getAdminStatus } from "@/lib/supabase/actions"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResearchDropdownOpen, setIsResearchDropdownOpen] = useState(false)
  const [isMobileResearchExpanded, setIsMobileResearchExpanded] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAdminStatus().then(setIsAdmin)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsResearchDropdownOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResearchDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isResearchActive = pathname === "/research" || pathname.startsWith("/research/")

  return (
    <header
      className={`bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <div className="relative h-16 md:h-14 w-48">
              <Image src="/aims.png" width="120" height="120" alt="aims logo" />
            </div>
          </Link>

          {isAdmin && (
            <div className="flex items-center gap-1 bg-blue-michigan/10 text-blue-michigan px-3 py-1 rounded-full border border-blue-michigan/20">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Admin</span>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/culture" active={pathname === "/culture"}>
            Culture
          </NavLink>

          <NavLink href="/news" active={pathname === "/news"}>
            News
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <button
              className={`relative px-4 py-2 text-lg font-medium transition-colors flex items-center ${
                isResearchActive ? "text-blue-michigan" : "text-gray-700 hover:text-blue-michigan"
              }`}
              onClick={() => setIsResearchDropdownOpen(!isResearchDropdownOpen)}
              onMouseEnter={() => setIsResearchDropdownOpen(true)}
              aria-expanded={isResearchDropdownOpen}
              aria-haspopup="true"
            >
              Research
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${isResearchDropdownOpen ? "rotate-180" : ""}`}
              />
              {isResearchActive && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-maize rounded-t-md" />
              )}
            </button>

            {isResearchDropdownOpen && (
              <div
                className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                onMouseLeave={() => setIsResearchDropdownOpen(false)}
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  <DropdownLink href="/research" active={pathname === "/research"}>
                    Directory
                  </DropdownLink>
                  <DropdownLink href="/research/reactors" active={pathname === "/research/reactors"}>
                    Reactors
                  </DropdownLink>
                  <DropdownLink href="/research/controls" active={pathname === "/research/controls"}>
                    Controls
                  </DropdownLink>
                  <DropdownLink href="/research/computing" active={pathname === "/research/computing"}>
                    Computing
                  </DropdownLink>
                  <DropdownLink href="/research/software-datasets" active={pathname === "/research/software-datasets"}>
                    Software & Datasets
                  </DropdownLink>
                </div>
              </div>
            )}
          </div>

          <NavLink href="/members" active={pathname === "/members" || pathname.startsWith("/members/")}>
            Members
          </NavLink>
          <NavLink href="/teaching" active={pathname === "/teaching"}>
            Teaching
          </NavLink>
          <NavLink href="/gallery" active={pathname === "/gallery"}>
            Gallery
          </NavLink>
        </nav>

        <button
          className="md:hidden p-2 rounded-md text-blue-michigan hover:bg-blue-michigan/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink href="/" active={pathname === "/"}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/culture" active={pathname === "/culture"}>
                Culture
              </MobileNavLink>

              <MobileNavLink href="/news" active={pathname === "/news"}>
                News
              </MobileNavLink>

              <div>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 text-lg font-medium rounded-md transition-colors ${
                    isResearchActive
                      ? "bg-blue-michigan/10 text-blue-michigan"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-michigan"
                  }`}
                  onClick={() => setIsMobileResearchExpanded(!isMobileResearchExpanded)}
                >
                  <span>Research</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${isMobileResearchExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {isMobileResearchExpanded && (
                  <div className="mt-1 ml-4 pl-2 border-l-2 border-gray-200 space-y-1">
                    <MobileSubNavLink href="/research" active={pathname === "/research"}>
                      Directory
                    </MobileSubNavLink>
                    <MobileSubNavLink href="/research/reactors" active={pathname === "/research/reactors"}>
                      Reactors
                    </MobileSubNavLink>
                    <MobileSubNavLink href="/research/controls" active={pathname === "/research/controls"}>
                      Controls
                    </MobileSubNavLink>
                    <MobileSubNavLink href="/research/computing" active={pathname === "/research/computing"}>
                      Computing
                    </MobileSubNavLink>
                    <MobileSubNavLink href="/research/software-datasets" active={pathname === "/research/software-datasets"}>
                      Software & Datasets
                    </MobileSubNavLink>
                  </div>
                )}
              </div>

              <MobileNavLink href="/members" active={pathname === "/members" || pathname.startsWith("/members/")}>
                Members
              </MobileNavLink>
              <MobileNavLink href="/teaching" active={pathname === "/teaching"}>
                Teaching
              </MobileNavLink>
              <MobileNavLink href="/gallery" active={pathname === "/gallery"}>
                Gallery
              </MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-lg font-medium transition-colors ${
        active ? "text-blue-michigan" : "text-gray-700 hover:text-blue-michigan"
      }`}
    >
      {children}
      {active && <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-maize rounded-t-md" />}
    </Link>
  )
}

function DropdownLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-blue-michigan/5 text-blue-michigan font-medium"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-michigan"
      }`}
      role="menuitem"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 text-lg font-medium rounded-md transition-colors ${
        active ? "bg-blue-michigan/10 text-blue-michigan" : "text-gray-700 hover:bg-gray-100 hover:text-blue-michigan"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileSubNavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
        active ? "text-blue-michigan" : "text-gray-600 hover:text-blue-michigan"
      }`}
    >
      {children}
    </Link>
  )
}