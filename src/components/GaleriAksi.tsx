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
    src: "/assets/photo/galeries/desadigital.jpg",
    title: "Digital Desa Nusantara",
    subtitle: "Transformasi Digital di Pedesaan",
  },
  {
    id: 2,
    src: "/assets/photo/galeries/ecocampusindo.jpg",
    title: "Eco Campus Movement",
    subtitle: "Revolusi Hijau Kampus",
  },
  {
    id: 3,
    src: "/assets/photo/galeries/mentalhealth.jpg",
    title: "Mental Health Buddy",
    subtitle: "Ruang Aman Berbagi",
  },
  {
    id: 4,
    src: "/assets/photo/galeries/usahaumkm.jpg",
    title: "UMKM Digital Boost",
    subtitle: "Pemberdayaan Ekonomi Digital",
  },
  {
    id: 5,
    src: "/assets/photo/galeries/finansialremaja.jpg",
    title: "Literasi Finansial Remaja",
    subtitle: "Edukasi Keuangan Generasi Z",
  },
  {
    id: 6,
    src: "/assets/photo/galeries/anakindonesiabaca.jpg",
    title: "Komunitas Baca Anak",
    subtitle: "Menumbuhkan Minat Baca",
  },
]

// Define spread-out positions for the small images to avoid overlap
const smallImagePositions = [
  { top: "10%", left: "10%", rotate: -10 }, // Top-left
  { top: "15%", left: "70%", rotate: 8 }, // Top-right
  { top: "65%", left: "5%", rotate: 12 }, // Bottom-left
  { top: "70%", left: "75%", rotate: -7 }, // Bottom-right
  { top: "40%", left: "20%", rotate: -3 }, // Mid-left, slightly above center
]

// Define tape styles for small images to cycle through
const smallImageTapeStyles = [
  { className: "absolute -top-1 -left-1 w-14 h-4 bg-gray-300/70 shadow-sm rounded-sm rotate-3 z-10" },
  { className: "absolute -top-1 right-1 w-14 h-4 bg-gray-300/70 shadow-sm rounded-sm -rotate-3 z-10" },
  { className: "absolute bottom-1 -left-1 w-14 h-4 bg-gray-300/70 shadow-sm rounded-sm -rotate-3 z-10" },
  { className: "absolute bottom-1 right-1 w-14 h-4 bg-gray-300/70 shadow-sm rounded-sm rotate-3 z-10" },
]

export default function GaleriAksi() {
  const router = useRouter()

  const handleImageClick = (imageId: number) => {
    router.push(`/galeri/${imageId}`)
  }

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
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

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Main Gallery View */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-screen p-8">
        {/* Hero Image */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(1)}
          >
            {/* Central Red Pin for main image - DIHAPUS */}
            {/* Silotip for main image */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -top-2 left-1/4 w-24 h-6 bg-gray-300/70 shadow-sm rounded-sm rotate-3 z-10"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -bottom-2 right-1/4 w-20 h-5 bg-gray-300/70 shadow-sm rounded-sm -rotate-6 z-10"
            />

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
                    className="absolute inset-0 bg-gray-900/20 flex items-center justify-center"
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
            <div className="absolute -inset-4 border-2 border-white/20 rounded-3xl -z-10 group-hover:border-black-400/40 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Abstract Positioned Images (gambar-gambar kecil) */}
        <div className="absolute inset-0 pointer-events-none">
          {galleryImages.slice(1).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              className="absolute pointer-events-auto group cursor-pointer"
              style={{
                top: smallImagePositions[index].top,
                left: smallImagePositions[index].left,
                transform: `rotate(${smallImagePositions[index].rotate}deg)`,
                zIndex: 2,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 10, // Bring to front on hover
                transition: { duration: 0.3 },
              }}
              onClick={() => handleImageClick(image.id)}
            >
              {/* Red Pin - DIHAPUS */}
              {/* Silotip for small images */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.4 }}
                className={smallImageTapeStyles[index % smallImageTapeStyles.length].className}
              />

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

        {/* Additional Mading Decorations (Sticky Notes) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute top-[5%] left-[45%] w-40 h-24 bg-yellow-100/90 shadow-md rounded-md p-3 text-sm text-gray-800 rotate-6 z-10 pointer-events-none"
        >
          <p className="font-semibold mb-1">Ide Baru!</p>
          <p>Jelajahi lebih banyak proyek inovatif kami.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="absolute bottom-[10%] right-[20%] w-36 h-20 bg-blue-100/90 shadow-md rounded-md p-3 text-xs text-gray-800 -rotate-3 z-10 pointer-events-none"
        >
          <p className="font-semibold mb-1">Hubungi Kami</p>
          <p>Untuk kolaborasi dan pertanyaan.</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
