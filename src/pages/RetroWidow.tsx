import { X } from "lucide-react";

type Props = {
  type: "notes" | "paint" | "settings";
  onClose: () => void;
};

export default function RetroWindow({ type, onClose }: Props) {
  const getTitle = () => {
    if (type === "notes") return "Retro Notes";
    if (type === "paint") return "Retro Paint";
    if (type === "settings") return "Retro Settings";
    return "";
  };

  return (
    <div className="absolute top-20 left-20 w-[400px] bg-gray-800 border-4 border-gray-600 shadow-lg">
      {/* Title Bar */}
      <div className="flex justify-between items-center bg-gray-700 p-2 text-white font-bold text-sm">
        <span>{getTitle()}</span>
        <button onClick={onClose} className="hover:bg-red-600 px-2">
          <X size={16} />
        </button>
      </div>

      {/* Window Body */}
      <div className="p-4 text-white text-sm">
        {type === "notes" && <textarea className="w-full h-40 bg-black text-green-400 p-2 font-mono" placeholder="Type here..." />}
        {type === "paint" && <div className="w-full h-40 bg-white"></div>}
        {type === "settings" && <div>⚙️ Retro Settings Panel</div>}
      </div>
    </div>
  );
}
