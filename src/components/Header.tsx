"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, MapPin, User, Home, Sparkles, Award, BookOpen, Users, Rocket } from "lucide-react" // Added new icons
import Link from "next/link"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = storedTheme ? (storedTheme as "light" | "dark") : prefersDark ? "dark" : "light"
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true)
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const navLinks = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Gema Terbaru", href: "#gema-terbaru", icon: Sparkles },
    { name: "Aksi Unggulan", href: "#aksi-unggulan", icon: Award },
    { name: "Cerita Perubahan", href: "#cerita-perubahan", icon: BookOpen },
    { name: "Kolaborasi Hub", href: "#kolaborasi-hub", icon: Users },
    { name: "Mulai Aksi", href: "#mulai-aksi", icon: Rocket },
  ]

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="font-google-sans fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl flex items-center justify-between h-20 px-4 sm:px-6 md:px-8 bg-white rounded-full shadow-lg border border-gray-100 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img
            src="/assets/photo/logogemaaksi_light.png"
            alt="Logo GemaAksi"
            className="h-20 w-auto max-h-[80px]" // Adjusted height to fit header better
          />
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-center h-10 text-gray-700 hover:bg-purple-600 hover:text-white transition-colors duration-200 font-medium px-4 rounded-full text-base whitespace-nowrap dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Separate Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          {/* Profile */}
          <div>
            <Button
              size="icon"
              className="w-10 h-10 text-gray-700 hover:text-white hover:bg-purple-600 bg-white rounded-full shadow transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
          {/* Theme Toggle */}
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 text-gray-700 hover:text-white hover:bg-purple-600 bg-white rounded-full shadow transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          {/* Language Button */}
          <div>
            <Button
              size="sm"
              className="h-10 bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 px-5 rounded-full font-semibold shadow transition-colors duration-200 flex items-center gap-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
            >
              <MapPin className="w-4 h-4" />
              INDONESIA
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 text-gray-700 dark:text-gray-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-950 lg:hidden flex flex-col p-4 pt-24" // pt-24 to clear header
          >
            <nav className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 text-lg font-medium text-gray-800 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            <div className="flex flex-col gap-4 border-t pt-4 border-gray-200 dark:border-gray-800">
              {/* Profile */}
              <Button
                className="w-full justify-start h-12 text-gray-700 hover:text-white hover:bg-purple-600 bg-white rounded-lg shadow transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start h-12 text-gray-700 hover:text-white hover:bg-purple-600 bg-white rounded-lg shadow transition-all duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              {/* Language Button */}
              <Button
                size="lg"
                className="w-full justify-start h-12 bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 rounded-lg font-semibold shadow transition-colors duration-200 flex items-center gap-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin className="w-5 h-5" />
                INDONESIA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
