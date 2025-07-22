"use client"

import Image from "next/image"
import { ArrowRight, X } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    className: "font-google-sans",
    title: "Kerja Nyata Kemasyarakatan",
    image: "/assets/photo/program/program_kemasyarakatan.jpg",
    description:
      "Program kerja nyata kemasyarakatan yang bertujuan untuk membantu dan memberdayakan masyarakat sekitar melalui berbagai kegiatan sosial dan pembangunan. Program ini melibatkan mahasiswa dan relawan untuk terjun langsung ke masyarakat.",
  },
  {
    id: 2,
    title: "Forum antar Komunitas",
    className: "font-google-sans",
    image: "/assets/photo/program/program_forumkomunitas.jpg",
    description:
      "Forum diskusi dan dialog antar komunitas untuk membangun komunikasi yang baik, saling bertukar pengalaman, dan mencari solusi bersama atas berbagai tantangan yang dihadapi komunitas.",
  },
  {
    id: 3,
    title: "Bantuan Anak Panti Asuhan",
    className: "font-google-sans",
    image: "/assets/photo/program/program-pantiasuhan.jpg",
    description:
      "Program bantuan untuk anak-anak panti asuhan berupa penyediaan kebutuhan sehari-hari, pendidikan, dan kegiatan pengembangan karakter untuk masa depan yang lebih baik.",
  },
  {
    id: 4,
    title: "Pelatihan Remaja Desa",
    className: "font-google-sans",
    image: "/assets/photo/program/program_pelatihanremaja.jpg",
    description:
      "Program pelatihan keterampilan dan pengembangan diri untuk remaja desa agar memiliki bekal kemampuan yang dapat digunakan untuk meningkatkan kualitas hidup dan ekonomi keluarga.",
  },
  {
    id: 5,
    title: "Donasi Buku Sekolah",
    image: "/assets/photo/program/program_donasibuku.jpg",
    className: "font-google-sans",
    description:
      "Program donasi buku-buku pelajaran dan bacaan untuk sekolah yang membutuhkan, guna mendukung pendidikan dan meningkatkan minat baca siswa.",
  },
]

export default function ProgramKami() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

  // Duplicate projects once for a seamless loop
  const loopItems = [...projects, ...projects]

  const openDialog = (project) => {
    setSelectedProject(project)
  }
  const closeDialog = () => {
    setSelectedProject(null)
  }
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <section className="font-google-sans bg-white py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Judul */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2">Program kami</h2>
            <p className="text-base md:text-lg text-slate-700">
              Program disesuaikan dengan kebutuhan komunitas sekitar
            </p>
          </div>
          {/* Container scroll otomatis dengan fade */}
          <div className="font-google-sans font-bold relative w-full overflow-hidden">
            {/* Fade kiri */}
            <div className="absolute top-0 left-0 h-full w-20 z-20 pointer-events-none bg-gradient-to-r from-white via-white/50 to-transparent" />
            {/* Fade kanan */}
            <div className="absolute top-0 right-0 h-full w-20 z-20 pointer-events-none bg-gradient-to-l from-white via-white/50 to-transparent" />

            <div
              className="flex gap-6 w-max py-2"
              style={{
                animation: "scroll 30s linear infinite",
                animationPlayState: isHovered ? "paused" : "running", // Smoothly pause/resume animation
                transform: "translateX(0)", // Initial state
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {loopItems.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] h-[340px] bg-[#d9d9d9] rounded-xl overflow-hidden shadow-lg relative cursor-pointer transform transition-transform duration-500 ease-out hover:scale-[1.02]"
                >
                  {/* Gambar sebagai latar belakang */}
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px" // `sizes` prop is required when using `fill` [^2][^3]
                  />
                  {/* Overlay untuk teks agar lebih terbaca */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {/* Isi dan Tombol panah */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div className="text-white text-sm sm:text-base font-extrabold leading-tight z-10 flex-1 pr-2">
                      {item.title}
                    </div>
                    <button
                      onClick={() => openDialog(item)}
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
        `}</style>
      </section>
      {/* Dialog/Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Gambar */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, 672px" // `sizes` prop is required when using `fill` [^2][^3]
                />
                {/* Tombol Close */}
                <button
                  onClick={closeDialog}
                  className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Konten */}
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-black mb-4" style={{ fontFamily: "YDGO12, sans-serif" }}>
                  {selectedProject.title}
                </h3>
                <p className="text-slate-700 leading-relaxed" style={{ fontFamily: "YDGO12, sans-serif" }}>
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
