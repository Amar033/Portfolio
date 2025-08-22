import { motion } from "framer-motion";
import { Home, Briefcase, Code, Mail } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Projects", icon: <Briefcase size={18} /> },
    { name: "Skills", icon: <Code size={18} /> },
    { name: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full bg-[#0b0c2a] text-white py-4 px-8 flex justify-center gap-10 border-b border-[#00c8ff] shadow-lg z-50"
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {navItems.map((item, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer hover:text-[#00c8ff] transition"
        >
          {item.icon}
          <span className="uppercase tracking-widest font-bold">{item.name}</span>
        </motion.div>
      ))}
    </motion.nav>
  );
}
