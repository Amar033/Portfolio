import { type FC } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, description, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="bg-black text-white p-6 rounded-lg relative border-[4px] border-[var(--persona-red)] transform -rotate-3"
    >
      <img
        src={image}
        alt={title}
        className="absolute -top-4 -right-4 w-16 h-16 object-cover border-2 border-white"
      />
      <h3 className="font-[var(--font-display)] text-2xl">{title}</h3>
      <p className="font-[var(--font-body)] mt-2">{description}</p>
    </motion.div>
  );
};

export default ProjectCard;
