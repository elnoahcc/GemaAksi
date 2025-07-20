"use client"

import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { MeshBasicMaterial, Color, Mesh } from "three" // Import MeshBasicMaterial
import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"

export default function Interactive3DModel() {
  // Load the GLB model
  // NOTE: Replace '/assets/3d/duck.glb' with your actual lightbulb GLB model path
  const gltf = useLoader(GLTFLoader, "/assets/3d/lamp_incandescent.glb")

  // Create a basic glowing material that doesn't rely on external lights
  const glowingBasicMaterial = new MeshBasicMaterial({
    color: new Color("#FFD700"), // Pure yellow/gold color for the glow
    transparent: true, // Enable transparency
    opacity: 0.9, // Slightly transparent to give a glass-like feel
  })

  // Traverse the GLTF scene to apply the basic glowing material to all meshes
  // This ensures all parts of the model get the desired glowing color
  gltf.scene.traverse((object) => {
    if (object instanceof Mesh) {
      object.material = glowingBasicMaterial
    }
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      className="relative h-[70vh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center px-4 max-w-7xl mx-auto">
        {/* Left side: 3D Canvas */}
        <div className="w-full h-full flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
            {" "}
            {/* Adjusted camera position */}
            <ambientLight intensity={0.5} />
            {/* Strong point light at the model's position to simulate light emission */}
            <pointLight position={[0, 0, 0]} intensity={20} color="#FFD700" /> {/* Increased intensity */}
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.8} />
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
              {/* Drastically reduced scale for the model */}
              <primitive object={gltf.scene} scale={0.15} position={[0, -0.2, 0]} /> {/* Further reduced scale */}
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Right side: Text Content */}
        <div className="text-center lg:text-left px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-orange-200/20 mb-4"
          >
            <Lightbulb className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-slate-200">Ide Cemerlang</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-lg leading-tight"
          >
            Wujudkan Ide Anda dalam Dimensi Baru
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-slate-200 mb-8 max-w-xl lg:max-w-none"
          >
            Setiap gagasan memiliki bentuk. Mari visualisasikan potensi tak terbatas dari aksi Anda.
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
