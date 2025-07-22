export interface Project {
  id: number
  title: string
  description: string
  location: string // This will be used for filtering by province/city
  impact: string
  collaborators: number
  category: string
  progress: number
  image: string
  color: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Digital Desa Nusantara",
    description: "Memberdayakan warga desa dengan literasi digital untuk mengembangkan potensi wisata lokal.",
    location: "Yogyakarta", // Contoh: Provinsi
    impact: "300+ warga terlatih",
    collaborators: 15,
    category: "Digital Literacy",
    progress: 85,
    image: "/placeholder.svg?height=200&width=300&text=Digital+Desa+Nusantara",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    title: "Eco Campus Movement",
    description: "Gerakan sustainability di kampus dengan program zero waste dan urban farming.",
    location: "Jakarta", // Contoh: Provinsi
    impact: "50kg sampah/hari",
    collaborators: 23,
    category: "Environment",
    progress: 92,
    image: "/placeholder.svg?height=200&width=300&text=Eco+Campus+Movement",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Mental Health Buddy",
    description: "Platform peer counseling untuk kesehatan mental mahasiswa dengan pendekatan kultural Indonesia.",
    location: "Bandung", // Contoh: Kota, akan dipetakan ke Jawa Barat
    impact: "1000+ sesi konseling",
    collaborators: 12,
    category: "Health",
    progress: 78,
    image: "/placeholder.svg?height=200&width=300&text=Mental+Health+Buddy",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "UMKM Digital Boost",
    description: "Membantu UMKM tradisional go digital dengan marketplace dan digital marketing.",
    location: "Surabaya", // Contoh: Kota, akan dipetakan ke Jawa Timur
    impact: "200+ UMKM online",
    collaborators: 18,
    category: "Economy",
    progress: 95,
    image: "/placeholder.svg?height=200&width=300&text=UMKM+Digital+Boost",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    title: "Literasi Finansial Remaja",
    description: "Edukasi keuangan untuk generasi Z agar melek investasi dan pengelolaan uang.",
    location: "Semarang", // Contoh: Kota, akan dipetakan ke Jawa Tengah
    impact: "300+ siswa terlatih",
    collaborators: 10,
    category: "Education",
    progress: 88,
    image: "/placeholder.svg?height=200&width=300&text=Literasi+Finansial+Remaja",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: 6,
    title: "Komunitas Baca Anak",
    description: "Meningkatkan minat baca anak-anak di daerah terpencil melalui perpustakaan keliling.",
    location: "Bogor", // Contoh: Kota, akan dipetakan ke Jawa Barat
    impact: "1000+ buku terdistribusi",
    collaborators: 8,
    category: "Education",
    progress: 70,
    image: "/placeholder.svg?height=200&width=300&text=Komunitas+Baca+Anak",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 7,
    title: "Pengembangan Ekowisata Bahari",
    description: "Meningkatkan potensi ekowisata bahari di kepulauan terpencil.",
    location: "Raja Ampat", // Contoh: Provinsi Papua Barat Daya
    impact: "Peningkatan kunjungan turis 50%",
    collaborators: 10,
    category: "Environment",
    progress: 60,
    image: "/placeholder.svg?height=200&width=300&text=Ekowisata+Bahari",
    color: "from-blue-400 to-teal-500",
  },
  {
    id: 8,
    title: "Inovasi Pertanian Modern",
    description: "Menerapkan teknologi pertanian cerdas untuk meningkatkan hasil panen petani lokal.",
    location: "Malang", // Contoh: Kota, akan dipetakan ke Jawa Timur
    impact: "Peningkatan hasil panen 30%",
    collaborators: 12,
    category: "Agriculture",
    progress: 90,
    image: "/placeholder.svg?height=200&width=300&text=Pertanian+Modern",
    color: "from-lime-500 to-green-600",
  },
]

// Helper function to map city/regency to a broader province for map filtering
export function getProvinceFromLocation(location: string): string {
  const lowerCaseLocation = location.toLowerCase()
  if (lowerCaseLocation.includes("yogyakarta")) return "Yogyakarta"
  if (lowerCaseLocation.includes("jakarta")) return "Jakarta"
  if (lowerCaseLocation.includes("bandung") || lowerCaseLocation.includes("bogor")) return "Jawa Barat"
  if (lowerCaseLocation.includes("surabaya") || lowerCaseLocation.includes("malang")) return "Jawa Timur"
  if (lowerCaseLocation.includes("semarang")) return "Jawa Tengah"
  if (lowerCaseLocation.includes("raja ampat")) return "Papua Barat Daya" // Example for a specific region
  // Add more mappings as needed
  return "Lainnya" // Default for unmapped locations
}
