import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white flex items-center justify-between overflow-hidden px-8">
      
      {/* Left text block */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-xl"
      >
        <h1 className="text-6xl font-extrabold tracking-tight uppercase leading-tight">
          Welcome to <span className="text-blue-400">Your App</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          A stylish interface inspired by Persona 3’s iconic menu system.
        </p>
        <button className="mt-8 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/30 uppercase">
          Get Started
        </button>
      </motion.div>

      {/* Right character image */}
      <motion.img
        src="/your-character.png" // replace with your uploaded png
        alt="Persona character"
        className="absolute bottom-0 right-0 max-h-[90vh] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Overlay angled shape */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/30 skew-x-12 transform origin-top-left" />
    </section>
  );
}
