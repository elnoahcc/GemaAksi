"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react" // Tambahkan useRef
import { motion, AnimatePresence } from "framer-motion"
import { projects, getProvinceFromLocation, type Project } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Import d3-geo untuk proyeksi peta
import { geoMercator, geoPath } from "d3-geo"

// Definisikan interface untuk data peta yang sudah diproses
interface ProvinceGeoData {
  id: string
  name: string
  d: string // String jalur SVG
  properties: any // Properti GeoJSON asli (misalnya, nama provinsi dari GeoJSON)
}



export default function IndonesiaMap() {
  const router = useRouter()
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // State untuk menyimpan jalur peta yang sudah diproses
  const [mapPaths, setMapPaths] = useState<ProvinceGeoData[]>([])
  const svgRef = useRef<SVGSVGElement>(null) // Ref untuk elemen SVG agar bisa mendapatkan dimensinya

  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Ambil file GeoJSON Anda dari direktori public
        // Pastikan jalur ini sesuai dengan lokasi file Anda
        const response = await fetch("/data/indonesia-provinces.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const geojsonData = await response.json()

        // Buat proyeksi Mercator
        const projection = geoMercator()
        const pathGenerator = geoPath().projection(projection)

        // Hitung bounding box untuk seluruh GeoJSON agar sesuai dengan ukuran SVG secara dinamis
        // Ini penting agar peta mengisi ruang yang tersedia
        if (svgRef.current) {
          // Dapatkan dimensi SVG container
          const { width, height } = svgRef.current.getBoundingClientRect()
          // Sesuaikan proyeksi agar peta pas di dalam dimensi tersebut
          projection.fitSize([width, height], geojsonData)
        } else {
          // Fallback jika ref SVG belum tersedia (misalnya, saat render awal)
          // Anda mungkin perlu menyesuaikan nilai ini jika peta tidak terlihat dengan benar
          projection.scale(1000).center([118, -2]) // Nilai default untuk Indonesia
        }

        // Proses setiap fitur (provinsi) dalam GeoJSON
        const paths: ProvinceGeoData[] = geojsonData.features
          .map((feature: any) => {
            // Asumsikan properti GeoJSON memiliki bidang 'name' atau 'NAME_1' untuk nama provinsi
            // Sesuaikan 'feature.properties.NAME_1' atau 'feature.properties.name'
            // dengan nama properti yang benar di file GeoJSON Anda yang menyimpan nama provinsi.
            const provinceName =
              feature.properties.NAME_1 || feature.properties.name || `Unknown Province ${feature.id}`
            return {
              id: feature.id || provinceName.replace(/\s+/g, "-").toLowerCase(), // Gunakan ID unik
              name: provinceName,
              d: pathGenerator(feature) || "", // Hasilkan string jalur SVG
              properties: feature.properties, // Simpan properti asli untuk referensi
            }
          })
          .filter((p: ProvinceGeoData) => p.d !== "") // Saring fitur yang tidak menghasilkan jalur

        setMapPaths(paths)
      } catch (error) {
        console.error("Error loading or processing map data:", error)
        // Tangani error, misalnya tampilkan pesan kepada pengguna
      }
    }

    loadMapData()

    // Opsional: Hitung ulang proyeksi saat ukuran jendela berubah
    const handleResize = () => {
      if (svgRef.current && mapPaths.length > 0) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        const projection = geoMercator()
        // Buat FeatureCollection sementara dari mapPaths untuk fitSize
        projection.fitSize([width, height], {
          type: "FeatureCollection",
          features: mapPaths.map((p) => ({
            type: "Feature",
            geometry: p.properties.geometry,
            properties: p.properties,
          })),
        })
        const pathGenerator = geoPath().projection(projection)
        setMapPaths((prevPaths) => prevPaths.map((p) => ({ ...p, d: pathGenerator(p.properties) || "" })))
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [svgRef.current]) // Jalankan ulang efek jika svgRef.current berubah (misalnya, setelah render awal)

  const handleProvinceClick = (provinceName: string) => {
    // Logika ini akan memfilter proyek berdasarkan nama provinsi yang diklik
    const projectsInProvince = projects.filter((project) => getProvinceFromLocation(project.location) === provinceName)
    setSelectedProvince(provinceName)
    setFilteredProjects(projectsInProvince)
  }

  const handleBackToMap = () => {
    setSelectedProvince(null)
    setFilteredProjects([])
  }

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>, provinceName: string) => {
    setHoveredProvince(provinceName)
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 }) // Offset tooltip sedikit
  }

  const handleMouseLeave = () => {
    setHoveredProvince(null)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Bagian */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Peta Nusantara</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Klik provinsi untuk informasi</p>
        </motion.div>

        {selectedProvince ? (
          // Tampilkan proyek yang difilter
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Button
              onClick={handleBackToMap}
              variant="outline"
              className="mb-8 bg-blue-400/20 backdrop-blur-sm border-blue-300/30 text-blue-100 hover:bg-blue-400/30 rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Peta
            </Button>
            <h3 className="text-2xl font-bold text-slate-800 mb-8">
              Gema Aksi di {selectedProvince} ({filteredProjects.length})
            </h3>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden border-0 shadow-lg bg-white">
                    <div className="relative w-full h-48">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20`} />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-slate-700">{project.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h4>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                <p className="text-lg">Belum ada Gema Aksi di provinsi ini.</p>
                <p className="text-sm">Jadilah yang pertama memulai aksi di {selectedProvince}!</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Tampilkan peta
          <div className="flex flex-col items-center">
            {/* Kontainer Peta */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[1000px] bg-white rounded-xl shadow-xl p-6 flex items-center justify-center min-h-[500px] lg:min-h-[600px]"
            >
              {mapPaths.length > 0 ? (
                <svg
                  ref={svgRef} // Lampirkan ref ke SVG
                  viewBox="0 0 1000 600" // Sesuaikan viewBox ini jika peta Anda tidak terlihat dengan benar
                  className="w-full h-auto max-h-[550px]"
                >
                  {/* Latar belakang untuk peta */}
                  <rect x="0" y="0" width="1000" height="600" fill="#ffffff" rx="10" ry="10" />{" "}
                  {/* Latar belakang putih */}
                  {mapPaths.map((province) => (
                    <motion.path
                      key={province.id}
                      d={province.d}
                      fill={
                        hoveredProvince === province.name || selectedProvince === province.name
                          ? "#f97316" // Oranye saat di-hover/dipilih
                          : "#000000" // Hitam default
                      }
                      stroke="#e2e8f0" // Border abu-abu terang
                      strokeWidth="0.5" // Border lebih tipis
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={(e) => handleMouseMove(e, province.name)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleProvinceClick(province.name)}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </svg>
              ) : (
                <div className="text-center text-slate-500">
                  <p>Memuat peta...</p>
                  <p className="text-sm">
                    Pastikan file GeoJSON Anda ada di `/public/data/indonesia-provinces.geojson`
                  </p>
                  <p className="text-sm mt-2">Jika masih tidak muncul, periksa konsol browser untuk error.</p>
                </div>
              )}
            </motion.div>

            {/* Tooltip untuk provinsi yang di-hover */}
            <AnimatePresence>
              {hoveredProvince && !selectedProvince && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="fixed px-3 py-1 bg-slate-800 text-white text-sm rounded-md shadow-lg pointer-events-none z-50"
                  style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                  {hoveredProvince}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tombol Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full px-8 py-3 text-lg"
              >
                Lihat Semua Gema
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
