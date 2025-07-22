"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const morphingWords = ["Gema", "Aksi", "Perubahan"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % morphingWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-white" style={{ fontFamily: 'YDGO12, sans-serif' }}>
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
          repeating-linear-gradient(
            0deg,
            #e5e7eb 0px,
            #e5e7eb 1px,
            transparent 1px,
            transparent 30px
          ),
          repeating-linear-gradient(
            90deg,
            #e5e7eb 0px,
            #e5e7eb 1px,
            transparent 1px,
            transparent 30px
          )
        `,
          opacity: "0.4",
        }}
      />
      {/* Gradient fade overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, transparent 30%, white 100%)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-start text-left space-y-8">
          {/* Main Title - Left Aligned with Morphing Effect */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4" style={{ fontFamily: 'YDG012, sans-serif' }}>
              <span className="text-gray-900" style={{ fontFamily: 'YDGO12, sans-serif' }} >Setiap Ide Kecil Bisa Jadi </span>
              <div className="font-google-sans inline-block relative">
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
              <span className="text-gray-900" style={{ fontFamily: 'YDGO12, sans-serif' }}> Besar</span>
              <span className="inline-block w-3 h-3 bg-blue-600 ml-2" style={{ transform: "rotate(45deg)" }}></span>
              <span className="inline-block w-3 h-3 bg-orange-500 ml-1" style={{ transform: "rotate(45deg)" }}></span>
            </h1>
          </div>

          {/* Main Image Card */}
          <Card className="relative w-full max-w-5xl h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/assets/photo/home.jpg"
              alt="Smiling children from community"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle dark overlay for better button visibility */}
            <div className="absolute inset-0 bg-black/20" />
            <Button className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>

          {/* Bottom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-5xl mt-8">
            {/* Card 1: Gabung sekarang */}
            <div className="flex flex-col items-start">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex items-center w-full">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src="/assets/photo/home2.jpg"
                    alt="People in traditional attire"
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h2 className="font-google-sans text-2xl font-bold mb-1 text-gray-900 leading-tight">
                    Gabung sekarang.
                  </h2>
                  <p className="text-gray-500 text-sm leading-tight"
                     style={{ fontFamily: 'YDGO12, sans-serif' }}>
                    Komunitas disekitarmu <span className="font-bold">membutuhkanmu!</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2 w-full">
                <div className="h-2 bg-purple-600 rounded-full w-full" />
                <div className="h-2 bg-purple-400 rounded-full w-full" />
              </div>
            </div>

            {/* Card 2: Idemu Berharga! */}
            <div className="flex flex-col items-start">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex items-center w-full">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src="/assets/photo/home3.jpg"
                    alt="Two women working on a laptop"
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h2 className="font-google-sans text-2xl font-bold mb-1 text-gray-900 leading-tight">
                    Idemu Berharga!
                  </h2>
                  <p className="text-gray-500 text-sm leading-tight"
                     style={{ fontFamily: 'YDGO12, sans-serif' }}>
                    Idemu <span className="font-bold">berharga</span> dan menjadi{" "}
                    <span className="font-bold">dampak yang besar</span> bagi komunitas sekitar
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2 w-full">
                <div className="h-2 bg-yellow-400 rounded-full w-full" />
                <div className="h-2 bg-orange-500 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}