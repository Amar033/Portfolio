import { motion } from "framer-motion";
import CRTCanvas from "../components/CRT";

const menuItems = [
  "Skill", "Item", "Equip", "Persona", "Stats", "Quest", "Social Link", "Calendar", "System"
];

export default function PersonaMenu() {
  return (
    
    <section className="relative min-h-screen flex items-center justify-start bg-[url('src/assets/personahero.jpg')] bg-cover bg-center text-white">
      <CRTCanvas/>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c2a]/70 to-[#0b0c2a]/30"></div>
        
      <div className="relative z-10 flex items-center px-12 gap-12">
        
        {/* LEFT SIDE - Character */}
        {/* <motion.img
          src="src/assets/character.png"
          alt="Character"
          initial={{ x: 100,y: 100, opacity: 0 }}
          animate={{ x: 30,y:30, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h drop-shadow-[0_0_25px_#00c8ff]"
        /> */}

        {/* RIGHT SIDE - Menu */}
        <div className="flex flex-col gap-4 max-w">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item}
              whileHover={{ x: 15, scale: 1.05 }}
              className="relative"
            >
              {/* Angular box background (use your uploaded PNG) */}
              <img
                src="src/assets/angle-box.png"
                alt="Menu Shape"
                className="absolute inset-0 h-full w-full object-contain opacity-100"
              />
              
              {/* Menu text */}
              <p className={`relative px-6 py-2 font-extrabold uppercase text-2xl tracking-widest ${
                idx === 1 ? "text-red-500" : "text-[#00c8ff]"
              }`}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
