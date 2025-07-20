"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, MapPin, Heart } from "lucide-react"

const stats = [
  {
    number: "1,250",
    label: "Aksi Terealisasi",
    description: "Proyek sosial yang berhasil dilaksanakan",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
  },
  {
    number: "50,000",
    label: "Orang Terdampak",
    description: "Masyarakat yang merasakan manfaat langsung",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "150",
    label: "Kota Terjangkau",
    description: "Kota dan kabupaten di seluruh Indonesia",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "500",
    label: "Kolaborator Aktif",
    description: "Anak muda yang terlibat dalam berbagai proyek",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
  },
]

const stories = [
  {
    title: "Dari Desa Terpencil ke Digital",
    location: "Desa Pentingsari, Yogyakarta",
    story:
      "Pak Slamet, seorang petani berusia 55 tahun, kini mahir menggunakan Instagram untuk mempromosikan wisata desanya. Berkat program Digital Desa Nusantara, pendapatan desanya meningkat 150%.",
    image: "/placeholder.svg?height=300&width=400&text=Petani+Digital",
    impact: "150% peningkatan pendapatan desa",
  },
  {
    title: "Kampus Hijau, Masa Depan Cerah",
    location: "Universitas Indonesia, Jakarta",
    story:
      "Sarah dan tim Eco Campus berhasil mengubah kampus menjadi zero waste. Kini 15 kampus lain mengikuti jejak mereka, menciptakan gerakan nasional untuk sustainability.",
    image: "/placeholder.svg?height=300&width=400&text=Eco+Campus",
    impact: "70% pengurangan sampah kampus",
  },
  {
    title: "Kesehatan Mental Tanpa Stigma",
    location: "Bandung & 10 kota lainnya",
    story:
      "Platform Mental Health Buddy telah membantu ribuan mahasiswa mengatasi masalah mental health dengan pendekatan yang sesuai budaya Indonesia.",
    image: "/placeholder.svg?height=300&width=400&text=Mental+Health",
    impact: "1000+ sesi konseling berhasil",
  },
  {
    title: "UMKM Go Digital",
    location: "Malioboro, Yogyakarta",
    story:
      "Ibu Sari, pemilik warung nasi gudeg, kini mahir menggunakan aplikasi kasir digital. Omzet warungnya meningkat 150% berkat sistem delivery online dan pembayaran digital.",
    image: "/placeholder.svg?height=300&width=400&text=UMKM+Digital",
    impact: "150% peningkatan omzet UMKM",
  },
  {
    title: "Literasi Finansial Remaja",
    location: "Surabaya",
    story:
      "Workshop literasi finansial untuk siswa SMA di Surabaya. Para remaja antusias belajar cara mengelola uang saku dan memulai investasi sederhana untuk masa depan mereka.",
    image: "/placeholder.svg?height=300&width=400&text=Finansial+Remaja",
    impact: "300+ siswa terlatih",
  },
]

export default function CeritaPerubahan() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const storyRefs = Array.from({ length: stories.length }, () => useRef(null))

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Cerita Perubahan</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Setiap angka memiliki cerita, setiap aksi menciptakan dampak nyata dalam kehidupan masyarakat Indonesia
          </p>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-slate-800 mb-2"
                  >
                    {stat.number}+
                  </motion.div>

                  <h3 className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</h3>

                  <p className="text-sm text-slate-500">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interactive Timeline Section */}
        <div ref={timelineRef} className="relative py-12">
          {/* Vertical Timeline Line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-1/2 top-0 h-full w-1 bg-orange-300 origin-top transform -translate-x-1/2 rounded-full"
          />

          {stories.map((story, index) => {
            const isEven = index % 2 === 0
            const itemRef = storyRefs[index]
            const { scrollYProgress: itemScrollYProgress } = useScroll({
              target: itemRef,
              offset: ["start 0.9", "center center"], // Start animation when 90% of item is visible, complete at center
            })

            const opacity = useTransform(itemScrollYProgress, [0, 0.5], [0, 1])
            const x = useTransform(itemScrollYProgress, [0, 0.5], [isEven ? -100 : 100, 0])
            const scale = useTransform(itemScrollYProgress, [0, 0.5], [0.8, 1])

            return (
              <div key={index} className="relative mb-20 last:mb-0">
                {/* Timeline Dot */}
                <motion.div
                  style={{ opacity: itemScrollYProgress, scale: itemScrollYProgress }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full z-10 border-4 border-white shadow-lg"
                />

                <motion.div
                  ref={itemRef}
                  style={{ opacity, x, scale }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 items-center lg:items-start`}
                >
                  {/* Story Image */}
                  <div className="flex-1 w-full lg:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-2xl shadow-lg border border-slate-200"
                    >
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Story Content */}
                  <div className="flex-1 space-y-4 text-center lg:text-left">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">{story.title}</h3>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-600 font-semibold mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed">{story.story}</p>

                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 px-4 py-2 rounded-full">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-700 font-semibold text-sm">{story.impact}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Siap Menjadi Bagian dari Cerita Perubahan?</h3>
            <p className="text-lg mb-6 opacity-90">
              Bergabunglah dengan ribuan anak muda Indonesia yang telah menciptakan dampak positif di masyarakat
            </p>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg">
              Mulai Aksi Sekarang
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
