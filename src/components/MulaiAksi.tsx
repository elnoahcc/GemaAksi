"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Users, Target, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

// Framer-motion wrapper agar Button bisa menerima props animasi
const MotionButton = motion(Button)

const categories = ["Pendidikan", "Lingkungan", "Kesehatan", "Teknologi", "Ekonomi", "Sosial", "Budaya", "Lainnya"]

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

export default function MulaiAksi() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    problem: "",
    solution: "",
    target: "",
    location: "",
    timeline: "",
    resources: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      if (field === "category" && !formData.category) {
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
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)
    }
  }

  const currentStepData = stepsData[currentStep - 1]

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl font-bold text-slate-800 mb-4">Ide Anda Berhasil Dikirim! 🎉</h2>

              <p className="text-lg text-slate-600 mb-8">
                Tim GemaAksi akan meninjau proposal Anda dalam 2-3 hari kerja. Kami akan menghubungi Anda melalui email
                untuk langkah selanjutnya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MotionButton
                  onClick={() => setIsSubmitted(false)}
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
    <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Mulai Aksi Sekarang</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Punya ide untuk menciptakan perubahan? Wujudkan bersama komunitas GemaAksi dan ciptakan dampak nyata di
            masyarakat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Steps Guide */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Bagaimana Cara Memulai?</h3>

            <div className="space-y-6">
              {stepsData.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                    currentStep === step.number
                      ? "bg-orange-100 border-2 border-orange-300"
                      : "bg-white border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep === step.number ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{step.title}</h4>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Inspiration Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Butuh Inspirasi?</h4>
                  <p className="text-sm opacity-90">
                    Lihat contoh-contoh proyek yang sudah berhasil di bagian "Gema Terbaru" untuk mendapatkan ide dan
                    inspirasi.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">{currentStepData.title}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Proyek *</label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori *</label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Dampak *</label>
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
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi *</label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Estimasi Waktu *</label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                        <div className="space-y-4 text-slate-700">
                          <h4 className="text-xl font-bold mb-4">Ringkasan Ide Anda:</h4>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Judul Proyek:</p>
                            <p>{formData.title || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Kategori:</p>
                            <p>{formData.category || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Masalah:</p>
                            <p>{formData.problem || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Solusi:</p>
                            <p>{formData.solution || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Target Dampak:</p>
                            <p>{formData.target || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Lokasi:</p>
                            <p>{formData.location || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Estimasi Waktu:</p>
                            <p>{formData.timeline || "-"}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="font-semibold">Sumber Daya Dibutuhkan:</p>
                            <p>{formData.resources || "-"}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
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
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-semibold"
                        whileTap={{ scale: 0.98 }}
                      >
                        Kirim Ide Saya
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </MotionButton>
                    )}
                  </div>
                </form>

                <p className="text-xs text-slate-500 mt-4 text-center">
                  Dengan mengirim ide, Anda menyetujui bahwa ide ini akan direview oleh tim GemaAksi dan berpotensi
                  dipublikasikan.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
