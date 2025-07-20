"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, MapPin, Clock, Star } from "lucide-react"

const collaborators = [
  {
    id: 1,
    name: "Sarah Putri",
    role: "Environmental Engineer",
    location: "Jakarta",
    skills: ["Sustainability", "Project Management", "Community Outreach"],
    projects: 5,
    rating: 4.9,
    bio: "Passionate about creating sustainable solutions for urban communities.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available",
    interests: ["Environment", "Education"],
  },
  {
    id: 2,
    name: "Ahmad Rizki",
    role: "Full Stack Developer",
    location: "Bandung",
    skills: ["React", "Node.js", "Mobile Development"],
    projects: 8,
    rating: 4.8,
    bio: "Building digital solutions for social impact and community empowerment.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Busy",
    interests: ["Technology", "Digital Literacy"],
  },
  {
    id: 3,
    name: "Dinda Maharani",
    role: "Social Worker",
    location: "Yogyakarta",
    skills: ["Community Development", "Mental Health", "Public Speaking"],
    projects: 12,
    rating: 5.0,
    bio: "Dedicated to improving mental health awareness among Indonesian youth.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available",
    interests: ["Mental Health", "Youth Development"],
  },
  {
    id: 4,
    name: "Budi Santoso",
    role: "Marketing Strategist",
    location: "Surabaya",
    skills: ["Digital Marketing", "Content Creation", "Brand Strategy"],
    projects: 6,
    rating: 4.7,
    bio: "Helping social projects reach wider audiences through strategic marketing.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available",
    interests: ["Marketing", "Social Media"],
  },
  {
    id: 5,
    name: "Rina Sari",
    role: "UI/UX Designer",
    location: "Medan",
    skills: ["UI Design", "UX Research", "Prototyping"],
    projects: 4,
    rating: 4.9,
    bio: "Creating user-friendly designs for social impact applications.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available",
    interests: ["Design", "Technology"],
  },
  {
    id: 6,
    name: "Fajar Nugroho",
    role: "Data Analyst",
    location: "Semarang",
    skills: ["Data Analysis", "Python", "Visualization"],
    projects: 7,
    rating: 4.6,
    bio: "Using data to measure and improve social impact initiatives.",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Busy",
    interests: ["Data Science", "Research"],
  },
]

const skillCategories = ["All", "Technology", "Design", "Marketing", "Social Work", "Environment", "Data"]

export default function KolaborasiHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredCollaborators, setFilteredCollaborators] = useState(collaborators)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterCollaborators(term, selectedCategory)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterCollaborators(searchTerm, category)
  }

  const filterCollaborators = (search: string, category: string) => {
    let filtered = collaborators

    if (search) {
      filtered = filtered.filter(
        (collab) =>
          collab.name.toLowerCase().includes(search.toLowerCase()) ||
          collab.role.toLowerCase().includes(search.toLowerCase()) ||
          collab.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (collab) =>
          collab.interests.includes(category) ||
          collab.skills.some((skill) => skill.toLowerCase().includes(category.toLowerCase())),
      )
    }

    setFilteredCollaborators(filtered)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Kolaborasi Hub</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan kolaborator yang tepat untuk mewujudkan ide-ide perubahan sosial yang berdampak
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Cari berdasarkan nama, keahlian, atau role..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-3 border-2 border-slate-200 focus:border-orange-400 rounded-full focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>

            {/* Filter Button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-200 hover:border-orange-400 bg-transparent"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </motion.div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborators.map((collaborator, index) => (
            <motion.div
              key={collaborator.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.img
                      src={collaborator.image}
                      alt={collaborator.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{collaborator.name}</h3>
                      <p className="text-orange-600 font-semibold text-sm mb-2">{collaborator.role}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{collaborator.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{collaborator.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={collaborator.availability === "Available" ? "default" : "secondary"}
                      className={
                        collaborator.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {collaborator.availability}
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{collaborator.bio}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {collaborator.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {collaborator.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{collaborator.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{collaborator.projects} proyek</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Aktif minggu ini</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        Ajak Kolaborasi
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="px-3 bg-transparent">
                        Lihat Profil
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCollaborators.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Tidak ada kolaborator yang sesuai dengan pencarian Anda</p>
              <p className="text-sm">Coba ubah kata kunci atau filter yang digunakan</p>
            </div>
          </motion.div>
        )}

        {/* Join as Collaborator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ingin Menjadi Kolaborator?</h3>
            <p className="text-lg mb-6 opacity-90">
              Bergabunglah dengan komunitas kolaborator dan berkontribusi dalam proyek-proyek perubahan sosial
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
              Daftar Sebagai Kolaborator
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
