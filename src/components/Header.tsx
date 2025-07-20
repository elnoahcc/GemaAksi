"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Change 50 to desired scroll threshold
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Gema Terbaru", href: "#gema-terbaru" }, // Assuming you'll add IDs to sections
    { name: "Aksi Unggulan", href: "#aksi-unggulan" },
    { name: "Cerita Perubahan", href: "#cerita-perubahan" },
    { name: "Kolaborasi Hub", href: "#kolaborasi-hub" },
    { name: "Mulai Aksi", href: "#mulai-aksi" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isScrolled ? 0 : -100, opacity: isScrolled ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl" // Adjusted width and centering
    >
      <div
        className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 border ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-md shadow-xl border-slate-700"
            : "bg-slate-900/60 backdrop-blur-md shadow-lg border-slate-800"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white text-lg font-bold flex-shrink-0">
          <Sparkles className="w-6 h-6 text-orange-400" />
          GemaAksi
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium ${
                isScrolled ? "text-white/90" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 rounded-full font-semibold shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            Gabung
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/90 backdrop-blur-md pb-4 mt-2 rounded-xl border border-slate-800" // Adjusted for mobile menu shape
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200 py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 rounded-full font-semibold shadow-md mt-4"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gabung
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
