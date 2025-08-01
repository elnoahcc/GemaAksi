import Hero from "@/components/Hero"
import GemaTerbaru from "@/components/GemaTerbaru"
import AksiUnggulan from "@/components/AksiUnggulan"
import CeritaPerubahan from "@/components/CeritaPerubahan"
import KolaborasiHub from "@/components/KolaborasiHub"
import MulaiAksi from "@/components/MulaiAksi"
import GaleriAksi from "@/components/GaleriAksi"
import ScrollRevealSection from "@/components/ScrollRevealSection"
import Interactive3DModel from "@/components/InterActive3DModels"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <ScrollRevealSection />
      <GemaTerbaru />
      <AksiUnggulan />
      <CeritaPerubahan />
      <Interactive3DModel />
      <GaleriAksi />
      <KolaborasiHub />
      <MulaiAksi />
      <Footer />
    </main>
  )
}
