"use client"

import { motion } from "framer-motion"
import { Expand, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GalleryImage {
  id: number
  src: string
  title: string
  subtitle: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=1200&text=Digital+Desa+Nusantara",
    title: "Digital Desa Nusantara",
    subtitle: "Transformasi Digital di Pedesaan",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Eco+Campus+Movement",
    title: "Eco Campus Movement",
    subtitle: "Revolusi Hijau Kampus",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=700&width=900&text=Mental+Health+Buddy",
    title: "Mental Health Buddy",
    subtitle: "Ruang Aman Berbagi",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=500&width=700&text=UMKM+Digital+Boost",
    title: "UMKM Digital Boost",
    subtitle: "Pemberdayaan Ekonomi Digital",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=900&text=Literasi+Finansial+Remaja",
    title: "Literasi Finansial Remaja",
    subtitle: "Edukasi Keuangan Generasi Z",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=550&width=750&text=Komunitas+Baca+Anak",
    title: "Komunitas Baca Anak",
    subtitle: "Menumbuhkan Minat Baca",
  },
]

export default function GaleriAksi() {
  const router = useRouter()

  const handleImageClick = (imageId: number) => {
    router.push(`/galeri/${imageId}`)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Main Gallery View */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-screen p-8">
        {/* Hero Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(1)}
          >
            <div className="relative w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img
                src={galleryImages[0].src || "/placeholder.svg"}
                alt={galleryImages[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-orange-500/20 flex items-center justify-center"
              >
                <Button
                  size="lg"
                  className="bg-white/90 text-slate-800 hover:bg-white rounded-full px-8 py-3 font-semibold shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Jelajahi Galeri
                </Button>
              </motion.div>

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{galleryImages[0].title}</h2>
                <p className="text-lg opacity-90">{galleryImages[0].subtitle}</p>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-4 border-2 border-white/20 rounded-3xl -z-10 group-hover:border-orange-400/40 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Abstract Positioned Images */}
        <div className="absolute inset-0 pointer-events-none">
          {galleryImages.slice(1).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              className="absolute pointer-events-auto group cursor-pointer"
              style={{
                top: `${[15, 60, 25, 70, 40][index]}%`,
                left: `${[75, 85, 5, 10, 15][index]}%`,
                transform: `rotate(${[-8, 12, -15, 6, -10][index]}deg)`,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
              onClick={() => handleImageClick(image.id)}
            >
              <div className="relative w-48 h-32 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Expand Icon */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Expand className="w-3 h-3 text-slate-700" />
                </div>

                {/* Title */}
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-xs font-semibold truncate">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/60"
      >
        <p className="text-sm mb-2">Klik foto untuk melihat cerita lengkap</p>
        <div className="w-16 h-1 bg-white/20 rounded-full mx-auto">
          <motion.div
            animate={{ x: [0, 32, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-4 h-1 bg-orange-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
