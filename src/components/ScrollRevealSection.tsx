"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function ScrollRevealSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Tracks scroll from when component enters to when it leaves
  })

  // Image scale and opacity animation
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Text reveal animations with smoother easing
  const text1Opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
  const text1Y = useTransform(scrollYProgress, [0.3, 0.4], [80, 0])

  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const text2Y = useTransform(scrollYProgress, [0.45, 0.55], [80, 0])

  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])
  const text3Y = useTransform(scrollYProgress, [0.6, 0.7], [80, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-slate-900 text-white">
      <div className="sticky top-0 h-screen flex items-center justify-center p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
          {/* Left side: Animated Image */}
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl flex-shrink-0"
          >
            <Image
              src="/assets/photo/mulaidarisini.jpg"
              alt="Aksi Nyata di Lapangan"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle gradient overlay for depth */}
            <div className="font-google-sans absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Right side: Text content that reveals on scroll with glowing effect */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.h2
              style={{ opacity: text1Opacity, y: text1Y }}
              className=" font-google-sans text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 drop-shadow-lg"
            >
              Transformasi Dimulai dari Sini.
            </motion.h2>
            <motion.p
              style={{ opacity: text2Opacity, y: text2Y }}
              className="text-lg md:text-xl text-slate-200 leading-relaxed font-google-sans"
            >
              Setiap ide brilian, setiap semangat perubahan, kini menemukan wadahnya. GemaAksi adalah katalisator bagi
              generasi muda Indonesia untuk mewujudkan impian menjadi aksi nyata.
            </motion.p>
            <motion.p
              style={{ opacity: text3Opacity, y: text3Y }}
              className="font-google-sans text-lg md:text-xl text-slate-200 leading-relaxed"
            >
              Kami menghubungkan Anda dengan kolaborator, sumber daya, dan inspirasi untuk menciptakan dampak positif
              yang tak terhingga. Bersama, kita ciptakan gelombang perubahan yang menggema di seluruh negeri.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
