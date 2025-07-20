"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, TrendingUp } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Digital Desa Nusantara",
    description: "Memberdayakan warga desa dengan literasi digital untuk mengembangkan potensi wisata lokal.",
    location: "Yogyakarta",
    impact: "300+ warga terlatih",
    collaborators: 15,
    category: "Digital Literacy",
    progress: 85,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    title: "Eco Campus Movement",
    description: "Gerakan sustainability di kampus dengan program zero waste dan urban farming.",
    location: "Jakarta",
    impact: "50kg sampah/hari",
    collaborators: 23,
    category: "Environment",
    progress: 92,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Mental Health Buddy",
    description: "Platform peer counseling untuk kesehatan mental mahasiswa dengan pendekatan kultural Indonesia.",
    location: "Bandung",
    impact: "1000+ sesi konseling",
    collaborators: 12,
    category: "Health",
    progress: 78,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "UMKM Digital Boost",
    description: "Membantu UMKM tradisional go digital dengan marketplace dan digital marketing.",
    location: "Surabaya",
    impact: "200+ UMKM online",
    collaborators: 18,
    category: "Economy",
    progress: 95,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-orange-500 to-red-600",
  },
]

export default function GemaTerbaru() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Gema Terbaru</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Lihat aksi-aksi terbaru yang sedang menciptakan gelombang perubahan di berbagai daerah Indonesia
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-700 hover:bg-white">{project.category}</Badge>
                  </div>

                  {/* Progress Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-slate-700">
                      {project.progress}%
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-4 line-clamp-2">{project.description}</p>

                  {/* Project Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>{project.impact}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users className="w-4 h-4" />
                      <span>{project.collaborators} kolaborator</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">Progress</span>
                      <span className="text-sm text-slate-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${project.color}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Lihat Semua Gema
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
