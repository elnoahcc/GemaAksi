"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const morphingWords = ["Ide", "Aksi", "Gema"]

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % morphingWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Ripple Effect Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-orange-300/30 rounded-full"
            animate={{
              scale: [1, 2, 3],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.3,
              ease: "easeOut",
            }}
            style={{
              width: "200px",
              height: "200px",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-orange-200">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-slate-700">GemaAksi</span>
          </div>
        </motion.div>

        {/* Main Heading with Morphing Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-slate-800">Setiap </span>
          <div className="inline-block relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"
              >
                {morphingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <br />
          <span className="text-slate-800">Kecil Bisa Jadi </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Gema Besar</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Platform kolaborasi untuk anak muda Indonesia yang ingin mengubah ide menjadi aksi nyata dan menciptakan
          dampak positif di masyarakat.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Button
              size="lg"
              className="bg-transparent shadow-none px-0 py-0 h-auto min-w-0"
            >
              Mulai Aksi Sekarang
            </Button>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent text-lg leading-6"
          >
            Jelajahi Gema
          </motion.button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { number: "1,250+", label: "Aksi Terealisasi" },
            { number: "50K+", label: "Orang Terdampak" },
            { number: "150+", label: "Kota Terjangkau" },
            { number: "500+", label: "Kolaborator" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center transition-transform duration-200 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center text-slate-500"
        >
          <span className="text-sm mb-2">Scroll untuk melihat gema</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
