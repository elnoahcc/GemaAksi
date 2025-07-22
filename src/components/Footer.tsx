import { Instagram, MapPin, Heart, Users, } from "lucide-react"

export default function Footer() {
  return (
    <footer className="font-google-sans bg-white text-black py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="col-span-1 md:col-span-1">
            {/* Logo - Adjusted positioning */}
            <div className="mb-5 -mt-10">
               <img 
                src="/assets/photo/logogemaaksi_light.png" 
                alt="Gema Aksi Logo" 
                className="w-30 h-30 rounded-lg object-cover"
              />
            </div>
            
            {/* Mission Statement */}
            <div className="mb-15 -mt-10">
              <p className="text-black-300 text-sm leading-relaxed">
                Bersama membangun perubahan sosial yang berkelanjutan untuk masyarakat Indonesia dan dunia yang lebih baik.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mb-6 -mt-13 mr-8">
          <a href="#" className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>  
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-5 -mt-5 text-black-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Indonesia</span>
            </div>
          </div>

          {/* Program Sosial Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'YDGO12, sans-serif' }}>
              <Users className="w-5 h-5 text-orange-500" />
              Program Sosial
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-black-400 hover:text-orange-500 transition-colors text-sm">
                  Bantuan Pendidikan
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-orange-500 transition-colors text-sm">
                  Kesehatan Masyarakat
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-orange-500 transition-colors text-sm">
                  Pemberdayaan Ekonomi
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-orange-500 transition-colors text-sm">
                  Lingkungan Hidup
                </a>
              </li>
            </ul>
          </div>

          {/* Keterlibatan Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: 'YDGO12, sans-serif' }}>
              <Heart className="w-5 h-5 text-blue-500" />
              Keterlibatan
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Jadi Relawan
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Donasi
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Kolaborasi
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Komunitas
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'YDGO12, sans-serif' }}>Informasi</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Laporan Dampak
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="text-black-400 hover:text-blue-500 transition-colors text-sm">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black-400 text-sm mb-4 md:mb-0">
              © 2025 Gema Aksi - Platform Perubahan Sosial Indonesia dan Dunia
            </p>
            <div className="flex items-center gap-4 text-black-400 text-sm">
              <span>Dibuat dengan untuk Indonesia dan Dunia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}