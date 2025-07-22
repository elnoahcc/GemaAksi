"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Users, Target, CheckCircle, ArrowRight, ArrowLeft, Sparkles, X } from "lucide-react"

// Framer-motion wrapper agar Button bisa menerima props animasi
const MotionButton = motion(Button)

const categories = ["Pendidikan", "Lingkungan", "Kesehatan", "Teknologi", "Ekonomi", "Sosial", "Budaya", "Lainnya"]

const initialFormData = {
  title: "",
  category: "",
  problem: "",
  solution: "",
  target: "",
  location: "",
  timeline: "",
  resources: "",
}

const stepsData = [
  {
    number: 1,
    title: "Ceritakan Ide Anda",
    description: "Jelaskan masalah yang ingin diselesaikan dan solusi yang Anda tawarkan",
    icon: Lightbulb,
    fields: ["title", "category", "problem", "solution"],
  },
  {
    number: 2,
    title: "Tentukan Target & Lokasi",
    description: "Siapa yang akan terbantu, dampak apa yang ingin dicapai, dan di mana aksi akan dilakukan",
    icon: Target,
    fields: ["target", "location", "timeline"],
  },
  {
    number: 3,
    title: "Sumber Daya & Kolaborasi",
    description: "Identifikasi sumber daya yang dibutuhkan dan jenis kolaborator yang dicari",
    icon: Users,
    fields: ["resources"],
  },
  {
    number: 4,
    title: "Konfirmasi & Kirim",
    description: "Periksa kembali semua informasi sebelum mengirimkan ide Anda",
    icon: CheckCircle,
    fields: [], // No new fields, just review
  },
]

// Data proyek untuk ditampilkan di sisi kiri
const projects = [
  {
    id: 1,
    title: "Kerja Nyata Kemasyarakatan",
    image: "/assets/photo/program/program_kemasyarakatan.jpg",
  },
  {
    id: 2,
    title: "Forum antar Komunitas",
    image: "/assets/photo/program/program_forumkomunitas.jpg",
  },
  {
    id: 3,
    title: "Bantuan Anak Panti Asuhan",
    image: "/assets/photo/program/program-pantiasuhan.jpg",
  },
  {
    id: 4,
    title: "Pelatihan Remaja Desa",
    image: "/assets/photo/program/program_pelatihanremaja.jpg",
  },
  {
    id: 5,
    title: "Donasi Buku Sekolah",
    image: "/assets/photo/program/program_donasibuku.jpg",
  },
]

export default function MulaiAksi() {
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showIcon, setShowIcon] = useState(true) // State untuk mengontrol tampilan ikon atau kolase

  // Efek untuk mengontrol transisi ikon ke kolase
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false)
    }, 1000) // Tampilkan ikon selama 1 detik
    return () => clearTimeout(timer)
  }, [])

  // Reset form state when modal is closed or submission is reset
  useEffect(() => {
    if (!isModalOpen && !isSubmitted) {
      setFormData(initialFormData)
      setCurrentStep(1)
      setErrors({})
      setShowIcon(true) // Reset showIcon saat modal ditutup atau form direset
    }
  }, [isModalOpen, isSubmitted])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (stepNum: number) => {
    const currentStepFields = stepsData.find((step) => step.number === stepNum)?.fields || []
    const newErrors: Record<string, string> = {}
    let isValid = true
    currentStepFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "Bidang ini wajib diisi."
        isValid = false
      }
      if (field === "category" && !formData.category && stepNum === 1) {
        newErrors[field] = "Pilih kategori."
        isValid = false
      }
    })
    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      setIsSubmitted(true)
      setIsModalOpen(false) // Close the modal on successful submission
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)
    }
  }

  const currentStepData = stepsData[currentStep - 1]

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-slate-100">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
                Ide Anda Berhasil Dikirim! 🎉
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
                Tim GemaAksi akan meninjau proposal Anda dalam 2-3 hari kerja. Kami akan menghubungi Anda melalui email
                untuk langkah selanjutnya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <MotionButton
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData(initialFormData)
                    setCurrentStep(1)
                    setErrors({})
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  whileTap={{ scale: 0.95 }}
                >
                  Kirim Ide Lain
                </MotionButton>
                <MotionButton
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-100"
                  whileTap={{ scale: 0.95 }}
                >
                  Kembali ke Beranda
                </MotionButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Mulai Aksi Sekarang (tetap di tengah) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-google-sans text-3xl md:text-4xl font-bold text-slate-800 mb-3">Mulai Aksi Sekarang</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Images (Icon then Collage) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center min-h-[400px]" // Menjaga tinggi agar transisi mulus
          >
            <AnimatePresence mode="wait">
              {showIcon ? (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-full max-w-lg h-[400px]" // Menyesuaikan ukuran ikon dengan kolase
                >
                  <Image
                    src="/assets/photo/logogemaaksi_icon.png"
                    alt="GemaAksi Icon"
                    width={400} // Ukuran ikon disesuaikan
                    height={400} // Ukuran ikon disesuaikan
                    className="rounded-full shadow-lg object-contain" // object-contain agar tidak terpotong
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="collage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-4 w-full max-w-lg" // Grid kolase 2x2
                >
                  {projects.slice(0, 4).map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md"
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-2 text-white text-xs font-semibold">
                        {project.title}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Text Content (left-aligned) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-start text-left"
          >
            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-md font-semibold"  style={{ fontFamily: 'YDGO12, sans-serif' }}>
              Punya ide untuk menciptakan perubahan? Wujudkan bersama komunitas GemaAksi dan ciptakan dampak nyata di
              masyarakat
            </p>
            {/* Inspiration Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white max-w-md w-full mb-8"
            >
              <div className="flex items-start gap-3 justify-start">
                <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1"  style={{ fontFamily: 'YDGO12, sans-serif' }}>Butuh Inspirasi?</h4>
                  <p className="text-sm opacity-90"  style={{ fontFamily: 'YDGO12, sans-serif' }}>
                    Lihat contoh-contoh proyek yang sudah berhasil di bagian "Gema Terbaru" untuk mendapatkan ide dan
                    inspirasi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Button to open the modal */}
            <MotionButton
              onClick={() => setIsModalOpen(true)}
              className="font-google-sans bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 text-lg font-semibold rounded-full shadow-lg"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Lightbulb className="w-6 h-6 mr-3" />
              Ajukan Ide Baru Anda
            </MotionButton>
          </motion.div>
        </div>
      </div>

      {/* Custom Modal for the Multi-Step Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button for the Modal */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all duration-200 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <Card className="border-0 shadow-none bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6 text-left">
                    <h2 className="text-2xl font-bold text-slate-800">{currentStepData.title}</h2>
                    <p className="text-slate-600">{currentStepData.description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentStep === 1 && (
                          <>
                            {/* Project Title */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Judul Proyek *
                              </label>
                              <Input
                                placeholder="Contoh: Digital Desa Nusantara"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                required
                                className={`border-2 ${errors.title ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                              />
                              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>
                            {/* Category */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori *</label>
                              <div
                                className={`flex flex-wrap gap-2 ${errors.category ? "border-red-500 rounded-md p-1" : ""}`}
                              >
                                {categories.map((category) => (
                                  <MotionButton
                                    key={category}
                                    type="button"
                                    onClick={() => handleInputChange("category", category)}
                                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                                      formData.category === category
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-orange-100"
                                    }`}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {category}
                                  </MotionButton>
                                ))}
                              </div>
                              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                            {/* Problem Description */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Masalah yang Ingin Diselesaikan *
                              </label>
                              <Textarea
                                placeholder="Jelaskan masalah yang Anda lihat di masyarakat..."
                                value={formData.problem}
                                onChange={(e) => handleInputChange("problem", e.target.value)}
                                required
                                rows={3}
                                className={`border-2 ${errors.problem ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                              />
                              {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem}</p>}
                            </div>
                            {/* Solution */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Solusi yang Ditawarkan *
                              </label>
                              <Textarea
                                placeholder="Bagaimana cara Anda menyelesaikan masalah tersebut?"
                                value={formData.solution}
                                onChange={(e) => handleInputChange("solution", e.target.value)}
                                required
                                rows={3}
                                className={`border-2 ${errors.solution ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                              />
                              {errors.solution && <p className="text-red-500 text-xs mt-1">{errors.solution}</p>}
                            </div>
                          </>
                        )}
                        {currentStep === 2 && (
                          <>
                            {/* Target & Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                  Target Dampak *
                                </label>
                                <Input
                                  placeholder="Contoh: 500 warga desa"
                                  value={formData.target}
                                  onChange={(e) => handleInputChange("target", e.target.value)}
                                  required
                                  className={`border-2 ${errors.target ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                                />
                                {errors.target && <p className="text-red-500 text-xs mt-1">{errors.target}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lokasi *</label>
                                <Input
                                  placeholder="Contoh: Yogyakarta"
                                  value={formData.location}
                                  onChange={(e) => handleInputChange("location", e.target.value)}
                                  required
                                  className={`border-2 ${errors.location ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                                />
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                              </div>
                            </div>
                            {/* Timeline */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Estimasi Waktu *
                              </label>
                              <Input
                                placeholder="Contoh: 6 bulan"
                                value={formData.timeline}
                                onChange={(e) => handleInputChange("timeline", e.target.value)}
                                required
                                className={`border-2 ${errors.timeline ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                              />
                              {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
                            </div>
                          </>
                        )}
                        {currentStep === 3 && (
                          <>
                            {/* Resources Needed */}
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Sumber Daya yang Dibutuhkan *
                              </label>
                              <Textarea
                                placeholder="Contoh: Developer, Designer, Budget Rp 10 juta, dll"
                                value={formData.resources}
                                onChange={(e) => handleInputChange("resources", e.target.value)}
                                required
                                rows={4}
                                className={`border-2 ${errors.resources ? "border-red-500" : "border-slate-200"} focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-200`}
                              />
                              {errors.resources && <p className="text-red-500 text-xs mt-1">{errors.resources}</p>}
                            </div>
                          </>
                        )}
                        {currentStep === 4 && (
                          <div className="space-y-3 text-slate-700 text-sm">
                            <h4 className="text-lg font-bold mb-3">Ringkasan Ide Anda:</h4>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Judul Proyek:</p>
                              <p>{formData.title || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Kategori:</p>
                              <p>{formData.category || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Masalah:</p>
                              <p>{formData.problem || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Solusi:</p>
                              <p>{formData.solution || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Target Dampak:</p>
                              <p>{formData.target || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Lokasi:</p>
                              <p>{formData.location || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Estimasi Waktu:</p>
                              <p>{formData.timeline || "-"}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <p className="font-semibold">Sumber Daya Dibutuhkan:</p>
                              <p>{formData.resources || "-"}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                      {currentStep > 1 && (
                        <MotionButton
                          type="button"
                          onClick={handlePrevious}
                          variant="outline"
                          className="border-slate-200 hover:bg-slate-100"
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Sebelumnya
                        </MotionButton>
                      )}
                      {currentStep < stepsData.length ? (
                        <MotionButton
                          type="button"
                          onClick={handleNext}
                          className="ml-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                          whileTap={{ scale: 0.98 }}
                        >
                          Selanjutnya
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </MotionButton>
                      ) : (
                        <MotionButton
                          type="submit"
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 text-base font-semibold"
                          whileTap={{ scale: 0.98 }}
                        >
                          Kirim Ide Saya
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </MotionButton>
                      )}
                    </div>
                  </form>
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    Dengan mengirim ide, Anda menyetujui bahwa ide ini akan direview oleh tim GemaAksi dan berpotensi
                    dipublikasikan.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
