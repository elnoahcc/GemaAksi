"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface GalleryImage {
  id: number
  src: string
  title: string
  subtitle: string
  description: string
  location: string
  category: string
  photographer: string
  date: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/assets/photo/galeries/desadigitalslamet.jpg",
    title: "Digital Desa Nusantara",
    subtitle: "Transformasi Digital di Pedesaan",
    description:
      "Momen ketika Pak Slamet, petani berusia 55 tahun, pertama kali berhasil mengunggah foto hasil panen ke Instagram desa. Ekspresi bangga dan bahagia terpancar dari wajahnya saat melihat like dan komentar positif dari pengunjung yang tertarik datang ke desanya. Program ini telah mengubah cara pandang warga desa terhadap teknologi, dari yang awalnya takut menjadi antusias belajar. Kini desa Pentingsari menjadi contoh sukses transformasi digital di pedesaan Indonesia.",
    location: "Desa Pentingsari, Yogyakarta",
    category: "Digital Literacy",
    photographer: "Tim GemaAksi",
    date: "15 Maret 2024",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800&text=Eco+Campus+Movement",
    title: "Eco Campus Movement",
    subtitle: "Revolusi Hijau Kampus",
    description:
      "Mahasiswa UI sedang memanen sayuran organik dari kebun urban farming yang mereka buat di atap gedung kampus. Program ini berhasil mengurangi sampah organik kampus hingga 70% dan menghasilkan 50kg sayuran segar setiap minggunya. Inisiatif ini kini menjadi model untuk kampus-kampus lain di Indonesia dan telah menyebar ke 20 universitas di seluruh nusantara.",
    location: "Universitas Indonesia, Jakarta",
    category: "Environment",
    photographer: "Sarah Putri",
    date: "22 Februari 2024",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=700&width=900&text=Mental+Health+Buddy",
    title: "Mental Health Buddy",
    subtitle: "Ruang Aman Berbagi",
    description:
      "Sesi peer counseling di taman kampus ITB. Dua mahasiswa sedang berbincang dalam suasana yang hangat dan supportive, menciptakan safe space untuk berbagi masalah mental health. Program ini telah membantu lebih dari 500 mahasiswa mengatasi stress akademik dan masalah personal dengan pendekatan yang sesuai budaya Indonesia, menghilangkan stigma negatif terhadap kesehatan mental.",
    location: "Institut Teknologi Bandung",
    category: "Mental Health",
    photographer: "Andi Pratama",
    date: "8 April 2024",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=500&width=700&text=UMKM+Digital+Boost",
    title: "UMKM Digital Boost",
    subtitle: "Pemberdayaan Ekonomi Digital",
    description:
      "Ibu Sari, pemilik warung nasi gudeg, sedang belajar menggunakan aplikasi kasir digital. Sejak go digital, omzet warungnya meningkat 150% berkat sistem delivery online dan pembayaran digital. Kini beliau bahkan sudah memiliki 200+ pelanggan tetap melalui aplikasi dan menjadi mentor bagi UMKM lain di sekitar Malioboro.",
    location: "Malioboro, Yogyakarta",
    category: "Economy",
    photographer: "Budi Santoso",
    date: "30 Januari 2024",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=900&text=Literasi+Finansial+Remaja",
    title: "Literasi Finansial Remaja",
    subtitle: "Edukasi Keuangan Generasi Z",
    description:
      "Workshop literasi finansial untuk siswa SMA di Surabaya. Para remaja antusias belajar cara mengelola uang saku dan memulai investasi sederhana untuk masa depan mereka. Program ini telah melatih 300+ siswa SMA di 5 kota besar Indonesia dan berhasil meningkatkan kesadaran finansial generasi muda secara signifikan.",
    location: "SMAN 5 Surabaya",
    category: "Education",
    photographer: "Dinda Maharani",
    date: "12 Maret 2024",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=550&width=750&text=Komunitas+Baca+Anak",
    title: "Komunitas Baca Anak",
    subtitle: "Menumbuhkan Minat Baca",
    description:
      "Anak-anak desa sedang asyik membaca buku di perpustakaan mini yang dibangun dari container bekas. Inisiatif ini berhasil meningkatkan minat baca anak-anak desa hingga 200% dan telah menyediakan akses ke 1000+ buku untuk 15 desa di Jawa Barat. Program ini juga melibatkan mahasiswa sebagai volunteer pengajar.",
    location: "Desa Cibodas, Bogor",
    category: "Education",
    photographer: "Rina Sari",
    date: "5 Februari 2024",
  },
]

interface DetailGaleriProps {
  imageId: number
}

export default function DetailGaleri({ imageId }: DetailGaleriProps) {
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>(null)

  const currentImage = galleryImages.find((img) => img.id === imageId) || galleryImages[0]
  const otherImages = galleryImages.filter((img) => img.id !== imageId).slice(0, 6)

  const handleBack = () => {
    router.push("/")
  }

  const handleImageClick = (newImageId: number) => {
    router.push(`/galeri/${newImageId}`)
  }

  const handleFullscreen = (image: GalleryImage) => {
    setFullscreenImage(image)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setTimeout(() => setFullscreenImage(null), 300)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        <Button
          onClick={handleBack}
          variant="outline"
          className="bg-cyan-400/20 backdrop-blur-sm border-cyan-300/30 text-cyan-100 hover:bg-cyan-400/30 rounded-full px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <div className="h-screen overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-[3200px] relative">
          {/* Left Section - Selected Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[500px] flex-shrink-0 flex items-center justify-center p-8"
          >
            <div className="relative group cursor-pointer" onClick={() => handleFullscreen(currentImage)}>
              <div className="relative w-[400px] h-[280px] rounded-xl overflow-hidden shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500">
                <img
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Expand className="w-4 h-4 text-slate-700" />
                </div>
              </div>
              <div className="absolute -inset-3 border border-white/20 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Center Section - Title & Description */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[800px] flex-shrink-0 flex flex-col justify-center p-12 text-white"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">
                {currentImage.category}
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                {currentImage.title}
              </h1>
              <h2 className="text-2xl text-cyan-200 font-semibold mb-8">{currentImage.subtitle}</h2>
            </div>

            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-[700px]">{currentImage.description}</p>

            <div className="space-y-4 text-base text-slate-400 mb-10">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-300 w-24">Lokasi:</span>
                <span>{currentImage.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-300 w-24">Fotografer:</span>
                <span>{currentImage.photographer}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-300 w-24">Tanggal:</span>
                <span>{currentImage.date}</span>
              </div>
            </div>

            <div className="flex gap-6">
              <Button
                onClick={() => handleFullscreen(currentImage)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-8 py-3 text-lg"
              >
                Lihat Fullscreen
              </Button>
              <Button
                variant="outline"
                className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 rounded-full px-8 py-3 text-lg bg-transparent"
              >
                Bagikan Cerita
              </Button>
            </div>
          </motion.div>

          {/* Right Section - Structured Gallery Grid (GTA VI Style) */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-[1900px] flex-shrink-0 relative"
          >
            {/* Header */}
            <div className="absolute top-8 right-8 text-white text-right z-10">
              <h3 className="text-xl font-semibold mb-2">Jelajahi Aksi Lainnya</h3>
              <p className="text-sm text-slate-400">Scroll horizontal untuk melihat cerita inspiratif lainnya</p>
            </div>

            {/* Structured Gallery with 6 images arranged like GTA VI */}
            <div className="relative h-full pt-20 pb-8 px-8">
              
              {/* Image 1: Large Portrait Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: "8%", 
                  left: "50px", 
                  width: "320px", 
                  height: "480px" 
                }}
                whileHover={{ scale: 1.02, zIndex: 20 }}
                onClick={() => handleImageClick(otherImages[0]?.id)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-orange-400/50 transition-all duration-300">
                  <img
                    src={otherImages[0]?.src || "/placeholder.svg"}
                    alt={otherImages[0]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-4 h-4 text-slate-700" />
                  </div>
                </div>
              </motion.div>

              {/* Image 2: Medium Square Top-Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: "8%", 
                  left: "420px", 
                  width: "280px", 
                  height: "280px" 
                }}
                whileHover={{ scale: 1.03, zIndex: 20 }}
                onClick={() => handleImageClick(otherImages[1]?.id)}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 group-hover:border-blue-400/50 transition-all duration-300">
                  <img
                    src={otherImages[1]?.src || "/placeholder.svg"}
                    alt={otherImages[1]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                </div>
              </motion.div>

              {/* Image 3: Wide Landscape Bottom-Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: "55%", 
                  left: "50px", 
                  width: "500px", 
                  height: "300px" 
                }}
                whileHover={{ scale: 1.02, zIndex: 20 }}
                onClick={() => handleImageClick(otherImages[2]?.id)}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 group-hover:border-green-400/50 transition-all duration-300">
                  <img
                    src={otherImages[2]?.src || "/placeholder.svg"}
                    alt={otherImages[2]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-4 h-4 text-slate-700" />
                  </div>
                </div>
              </motion.div>

              {/* Image 4: Medium Square Center-Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: "32%", 
                  left: "750px", 
                  width: "340px", 
                  height: "340px" 
                }}
                whileHover={{ scale: 1.02, zIndex: 20 }}
                onClick={() => handleImageClick(otherImages[3]?.id)}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 group-hover:border-purple-400/50 transition-all duration-300">
                  <img
                    src={otherImages[3]?.src || "/placeholder.svg"}
                    alt={otherImages[3]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-4 h-4 text-slate-700" />
                  </div>
                </div>
              </motion.div>

              {/* Image 5: Small Portrait Bottom-Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{ 
                  top: "65%", 
                  left: "580px", 
                  width: "240px", 
                  height: "320px" 
                }}
                whileHover={{ scale: 1.04, zIndex: 20 }}
                onClick={() => handleImageClick(otherImages[4]?.id)}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                  <img
                    src={otherImages[4]?.src || "/placeholder.svg"}
                    alt={otherImages[4]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                </div>
              </motion.div>

              {/* Image 6: Large Full Height - Far Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="absolute group cursor-pointer"
                style={{
                  top: "8%",
                  left: "1150px",
                  width: "650px",
                  height: "75vh",
                }}
                whileHover={{ scale: 1.01, zIndex: 20 }}
                onClick={() => handleFullscreen(otherImages[5])}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-rose-400/50 transition-all duration-300">
                  <img
                    src={otherImages[5]?.src || "/placeholder.svg"}
                    alt={otherImages[5]?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand className="w-5 h-5 text-slate-700" />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className="absolute bottom-8 right-8 flex items-center gap-3 text-slate-400 text-sm"
            >
              <span>Scroll untuk melihat lebih banyak</span>
              <motion.div
                animate={{ x: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-6 h-0.5 bg-orange-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh]"
            >
              <img
                src={fullscreenImage.src || "/placeholder.svg"}
                alt={fullscreenImage.title}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">{fullscreenImage.title}</h3>
                <p className="text-slate-300">{fullscreenImage.subtitle}</p>
                <p className="text-sm text-slate-400 mt-2">
                  {fullscreenImage.location} • {fullscreenImage.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}