"use client"

import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"

export default function Interactive3DModel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative h-[70vh] bg-white flex items-center justify-center overflow-hidden"
    >
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
      {/* Background Pattern (existing, now subtle on white) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto text-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/50 backdrop-blur-sm rounded-full border border-gray-300 mb-4"
        >
          <Lightbulb className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-gray-800">Ide Cemerlang</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="font-google-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 drop-shadow-lg leading-tight"
        >
          Galeri Gema Aksi 
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="font-google-sans text-lg text-gray-700 mb-8 max-w-xl lg:max-w-none"
        >
          Setiap gagasan memiliki bentuk. Mari visualisasikan potensi tak terbatas dari aksi Anda.
        </motion.p>
      </div>
    </motion.section>
  )
}
