"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Target, Calendar, Award } from "lucide-react"

const featuredProjects = [
  {
    id: 1,
    title: "Digital Desa Nusantara",
    subtitle: "Transformasi Digital untuk Desa Wisata",
    description:
      "Program komprehensif yang mengajarkan literasi digital kepada warga desa untuk mengembangkan potensi wisata lokal. Dari pembuatan konten media sosial hingga pengelolaan booking online.",
    longDescription:
      "Dimulai dari Desa Pentingsari, Yogyakarta, program ini telah melatih lebih dari 300 warga dalam menggunakan teknologi digital untuk mempromosikan wisata desa mereka. Hasilnya, kunjungan wisatawan meningkat 150% dan pendapatan desa naik signifikan.",
    location: "Yogyakarta & 15 desa lainnya",
    duration: "6 bulan",
    impact: "300+ warga terlatih, 150% peningkatan wisatawan",
    collaborators: 15,
    category: "Digital Literacy",
    status: "Ongoing",
    image: "/placeholder.svg?height=400&width=600",
    testimonial: {
      text: "Sekarang kami bisa promosi desa sendiri di Instagram dan dapat tamu dari Jakarta!",
      author: "Pak Slamet",
      role: "Ketua Pokdarwis Desa Pentingsari",
    },
    achievements: [
      "Website desa dengan 10K+ pengunjung/bulan",
      "Instagram desa dengan 5K+ followers",
      "50+ homestay terdaftar online",
      "Sistem booking digital terintegrasi",
    ],
  },
  {
    id: 2,
    title: "Eco Campus Movement",
    subtitle: "Revolusi Hijau di Kampus Indonesia",
    description:
      "Gerakan sustainability yang dimulai dari kampus dengan program zero waste, urban farming, dan edukasi lingkungan. Menciptakan model kampus hijau yang bisa direplikasi.",
    longDescription:
      "Dimulai dari 5 kampus di Jakarta, gerakan ini telah menyebar ke 20 kampus di seluruh Indonesia. Program ini berhasil mengurangi sampah kampus hingga 70% dan menciptakan 15 kebun urban farming produktif.",
    location: "Jakarta & 20 kampus nasional",
    duration: "1 tahun",
    impact: "70% pengurangan sampah, 20 kampus terlibat",
    collaborators: 23,
    category: "Environment",
    status: "Expanding",
    image: "/placeholder.svg?height=400&width=600",
    testimonial: {
      text: "Kampus kami sekarang jadi contoh sustainability untuk universitas lain!",
      author: "Sarah Putri",
      role: "Mahasiswa Teknik Lingkungan UI",
    },
    achievements: [
      "50kg sampah organik diolah/hari",
      "15 kebun urban farming aktif",
      "500+ mahasiswa eco-ambassador",
      "Penghargaan Green Campus Award 2024",
    ],
  },
  {
    id: 3,
    title: "Mental Health Buddy",
    subtitle: "Kesehatan Mental dengan Pendekatan Kultural",
    description:
      "Platform peer counseling yang menggabungkan psikologi modern dengan nilai-nilai budaya Indonesia. Menyediakan ruang aman untuk berbagi dan saling mendukung.",
    longDescription:
      "Dengan pendekatan yang sensitif terhadap budaya Indonesia, platform ini telah memfasilitasi lebih dari 1000 sesi konseling peer-to-peer dan mengurangi stigma terhadap kesehatan mental di kalangan mahasiswa.",
    location: "Bandung & 10 kota lainnya",
    duration: "8 bulan",
    impact: "1000+ sesi konseling, 500+ mahasiswa terbantu",
    collaborators: 12,
    category: "Mental Health",
    status: "Growing",
    image: "/placeholder.svg?height=400&width=600",
    testimonial: {
      text: "Akhirnya ada tempat yang aman untuk cerita tanpa takut dijudge.",
      author: "Andi (nama samaran)",
      role: "Mahasiswa Psikologi",
    },
    achievements: [
      "24/7 peer support tersedia",
      "95% user merasa terbantu",
      "Kerjasama dengan 15 kampus",
      "Webinar kesehatan mental bulanan",
    ],
  },
]

export default function AksiUnggulan() {
  const [currentProject, setCurrentProject] = useState(0)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % featuredProjects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const project = featuredProjects[currentProject]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Aksi Unggulan</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Proyek-proyek yang telah menciptakan dampak signifikan dan menjadi inspirasi untuk aksi-aksi selanjutnya
          </p>
        </motion.div>

        {/* Featured Project Showcase */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-0 shadow-2xl bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">{project.status}</Badge>
                    </div>
                  </div>

                  {/* Project Details */}
                  <CardContent className="p-8 lg:p-12">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-3">
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">{project.title}</h3>
                      <p className="text-lg text-orange-600 font-semibold mb-4">{project.subtitle}</p>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">{project.longDescription}</p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-600">{project.impact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-slate-600">{project.collaborators} kolaborator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <span className="text-slate-600">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-purple-500" />
                        <span className="text-slate-600">{project.location}</span>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <p className="text-slate-700 italic mb-2">"{project.testimonial.text}"</p>
                      <div className="text-sm">
                        <span className="font-semibold text-slate-800">{project.testimonial.author}</span>
                        <span className="text-slate-500"> - {project.testimonial.role}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Pencapaian Utama:</h4>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      whileTap={{ scale: 0.98 }}
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="rounded-full border-2 border-orange-200 hover:bg-orange-50 bg-transparent"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Project Indicators */}
            <div className="flex gap-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject ? "bg-orange-500 w-8" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="rounded-full border-2 border-orange-200 hover:bg-orange-50 bg-transparent"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
