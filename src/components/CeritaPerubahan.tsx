"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { TrendingUp, Users, MapPin, Heart, ArrowRight, Play } from "lucide-react"

const stats = [
  {
    number: 1250,
    label: "Aksi Terealisasi",
    description: "Proyek sosial yang berhasil dilaksanakan",
    icon: TrendingUp,
    color: "bg-blue-600",
    bgAccent: "bg-blue-50",
  },
  {
    number: 50000,
    label: "Orang Terdampak",
    description: "Masyarakat yang merasakan manfaat langsung",
    icon: Users,
    color: "bg-emerald-600",
    bgAccent: "bg-emerald-50",
  },
  {
    number: 150,
    label: "Kota Terjangkau",
    description: "Kota dan kabupaten di seluruh Indonesia",
    icon: MapPin,
    color: "bg-orange-600",
    bgAccent: "bg-orange-50",
  },
  {
    number: 500,
    label: "Kolaborator Aktif",
    description: "Anak muda yang terlibat dalam berbagai proyek",
    icon: Heart,
    color: "bg-purple-600",
    bgAccent: "bg-purple-50",
  },
]

const stories = [
  {
    title: "Transformasi Digital Desa Pujon Kidul",
    location: "Desa Pujon Kidul, Malang",
    story:
      "Desa Pujon Kidul di Kabupaten Malang menjadi contoh sukses bagaimana teknologi informasi mampu mendorong kemajuan desa secara signifikan. Dengan mengembangkan Sistem Informasi Elektronik Desa (SIE) secara mandiri, desa ini berhasil menyajikan data kependudukan, potensi wisata dan UMKM, kesehatan, pembangunan, hingga keuangan secara digital dan real-time. Sistem ini dapat diakses masyarakat melalui",
    image: "/assets/photo/galeries/desapujon.jpg",
    impact: "150% peningkatan pendapatan",
    category: "Digital Transformation",
    color: "bg-blue-500",
  },
  {
    title: "Program Zero Waste Menuju Kota Tanpa Sampah",
    location: "Kota Krobokan, Semarang",
    story:
      "GEBRAKAN BARU DI SEMARANG! Wali Kota canangkan gerakan Zero Waste, dimulai dari satu lokasi percontohan. Warga siap? Baca selengkapnya!.",
     image: "/assets/photo/galeries/ZeroWaste.jpeg",
    impact: "70% pengurangan limbah",
    category: "Sustainability",
    color: "bg-green-500",
  },
  {
    title: "Hasil Survei I-NAMHS: Satu dari Tiga Remaja Indonesia Memiliki Masalah Kesehatan Mental",
    location: "Bandung & 10 kota lainnya",
    story:
      "Mental Health Buddy telah menjadi platform terdepan untuk konseling kesehatan mental dengan pendekatan yang sesuai dengan budaya Indonesia, melayani ribuan pengguna aktif.",
    image: "/assets/photo/galeries/kesehatanmental.jpg",
    impact: "5,000+ sesi konseling",
    category: "Health & Wellness",
    color: "bg-purple-500",
  },
  {
    title: "Ekosistem UMKM Digital",
    location: "Malioboro, Yogyakarta",
    story:
      "Ibu Sari dan 200+ pemilik UMKM lainnya telah bertransformasi menjadi bisnis digital yang modern. Integrasi teknologi kasir dan delivery menghasilkan pertumbuhan eksponensial.",
    image: "/assets/photo/galeries/umkmindonesia.jpg",
    impact: "200% peningkatan revenue",
    category: "Business Development",
    color: "bg-orange-500",
  },
  {
    title: "Literasi Keuangan OJK Surakarta",
    location: "Surakarta",
    story:
      "Program edukasi keuangan dari OJK Surakarta yang telah melibatkan lebih dari 6.000 peserta dari pelajar, mahasiswa, pelaku UMKM, hingga masyarakat umum. Materi mencakup perencanaan keuangan, investasi cerdas, dan pencegahan penipuan digital, disampaikan secara interaktif melalui 39 kegiatan literasi sepanjang tahun.",
  image: "/assets/photo/galeries/financialgenz.jpg",
    impact: " 6.456 peserta teredukasi",
    category: "Financial Education",
    color: "bg-indigo-500",
  },
]

// Optimized Counter component with a smooth ease-out effect
function AnimatedCounter({ targetNumber, isVisible, duration = 2000, delay = 0 }) {
  const [displayNumber, setDisplayNumber] = useState(0)
  const animationFrameRef = useRef()

  useEffect(() => {
    if (!isVisible) return

    const startTimestamp = Date.now() + delay

    const animate = () => {
      const now = Date.now()
      const elapsedTime = now - startTimestamp

      if (elapsedTime < 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (elapsedTime >= duration) {
        setDisplayNumber(targetNumber)
        return
      }

      const progress = elapsedTime / duration
      const easedProgress = progress * (2 - progress)
      const currentNumber = Math.floor(easedProgress * targetNumber)
      
      setDisplayNumber(currentNumber)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetNumber, isVisible, duration, delay])

  return (
    <span className="font-google-sans">
      {displayNumber.toLocaleString()}
    </span>
  )
}

export default function CeritaPerubahan() {
  const timelineRef = useRef(null)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="py-24 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Cerita Perubahan
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Setiap angka memiliki cerita mendalam, setiap aksi menciptakan 
            <span className="font-semibold text-blue-600"> dampak berkelanjutan </span>
            dalam kehidupan masyarakat Indonesia
          </p>
        </motion.div>

        {/* Statistics Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgAccent} rounded-full -translate-y-10 translate-x-10 opacity-60 group-hover:opacity-80 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.color} mb-6 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 min-h-[60px] flex items-center">
                    <AnimatedCounter 
                      targetNumber={stat.number} 
                      isVisible={statsInView}
                      delay={index * 200}
                    />
                    <span className="text-2xl text-slate-500">+</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-3 group-hover:text-slate-800 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Timeline */}
        <div ref={timelineRef} className="relative py-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
          </div>

          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-1/2 top-0 h-full w-2 bg-blue-500 origin-top transform -translate-x-1/2 rounded-full shadow-lg"
          />

          {stories.map((story, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative mb-24 lg:mb-32 last:mb-0">
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, amount: "all" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-blue-500 shadow-xl">
                    <div className="w-full h-full bg-blue-500 rounded-full animate-pulse" />
                  </div>
                </motion.div>
                
                {/* Story Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center lg:items-stretch`}
                >
                  {/* Story Image */}
                  <div className="flex-1 w-full lg:w-auto">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: isEven ? 5 : -5,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 group"
                      style={{ perspective: "1000px" }} // Needed for rotateY
                    >
                      <div className={`absolute inset-0 ${story.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {story.category}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Story Content */}
                  <div className="flex-1 space-y-6 text-center lg:text-left flex flex-col justify-center">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                        {story.title}
                      </h3>
                      <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-600 font-semibold mb-6">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{story.location}</span>
                      </div>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {story.story}
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                      <div className={`inline-flex items-center gap-3 ${story.color} text-white px-6 py-3 rounded-full shadow-lg`}>
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">{story.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}