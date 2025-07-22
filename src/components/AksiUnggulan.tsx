"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function AksiNyata() {
  const actionItems = [
    {
      title: "Relawan",
      description: "Menjadi pahlawan kemanusiaan di lapangan dan kemasyarakatan",
      image: "/assets/photo/relawan1.jpg",
    },
    {
      title: "Donatur",
      description: "Tak bisa hadir langsung? Donasimu bisa jadi langkah nyata perubahan.",
      image: "/assets/photo/donation.jpg",
    },
    {
      title: "Mentor",
      description: "Punya talenta mendidik dan mengajar sesama? Mungkin ini cocok untukmu",
      image: "/assets/photo/1.png",
    },
    {
      title: "For Your Idea",
      description: "Kamu punya ide untuk kemanusiaan? Serahkan saja kepada kami!",
      image: "/assets/photo/3.png",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">Pelita Sesama</h2>
          <p className="text-lg text-gray-700">Ambil Peran dalam Misi Kemanusiaan</p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-2 gap-8 place-items-center">
          {actionItems.map((item, index) => (
            <Card
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group w-[220px] h-[280px] sm:w-[240px] sm:h-[300px] transition-transform duration-300"
            >
              {/* Gambar */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay gelap saat hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Teks yang muncul saat hover */}
              <div className="absolute bottom-0 w-full p-4 text-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
