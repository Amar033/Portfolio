


import { FileText, Mail, MapPin, User } from "lucide-react";

export default function Profile({ onOpenResume }: { onOpenResume: () => void }) {
  /** Constrained card — no fixed/absolute fullscreen so it stays inside Window */
  return (
    <div className="text-[#cfeef5]">
      {/* Header strip */}
      <div className="flex justify-between items-center text-[11px] border-b border-[#38515a] pb-1 mb-2">
        <span>警察 LAPD</span>
        <span>SIGNAL LOW ▓▒░</span>
      </div>

      {/* Officer + Access */}
      <div className="flex justify-between items-center text-[11px] mb-1">
        <span>OFFICER</span>
        <span>ACCESS ********</span>
      </div>

      <div className="text-xl font-bold tracking-wider mb-3">K D6-3.7</div>

      {/* Main grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Photo */}
        <div className="relative bg-[#1a2227] border border-[#38515a] h-36 grid place-items-center">
          <img
            src="src/assets/Profile.jpg"
            alt="profile"
            // className="w-full h-full object-cover pixelated contrast-150"
            className="w-32 h-32 object-cover border border-gray-500"
  style={{
    filter: "grayscale(100%) contrast(150%) brightness(80%)",
    imageRendering: "pixelated"
  }}
          />
          <span className="absolute bottom-1 right-1 text-[9px] bg-[#0f171d] px-1 border border-[#38515a]">
            ID: 25805-K-2973
          </span>
        </div>

        {/* Info */}
        <div className="text-[11px] space-y-1">
          <p>NEXUS 9 SRS</p>
          <p>SEC CODE 25805-K-2973</p>
          <p className="tracking-wide">ブレードランナー</p>
          <p>BLADE RUNNER</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-[#6fb6c4]" />
              <div className="w-1 h-6 bg-[#6fb6c4]" />
              <div className="w-1 h-3 bg-[#6fb6c4]" />
            </div>
            <span>WALLACE CORPORATION</span>
          </div>
        </div>
      </div>

      {/* Contact/info blocks (neobrutalist chips, muted colors) */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="flex items-center gap-2 px-2 py-2 bg-[#0f171d] border border-[#38515a]">
          <MapPin size={14} /> <span className="text-[8px]">Kannur</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 bg-[#0f171d] border border-[#38515a]">
          <Mail size={14} /> <span className="text-[8px]">amarbavi12345@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 bg-[#0f171d] border border-[#38515a]">
          <User size={14} /> <span className="text-[8px]">AI/ML Enthusiast</span>
        </div>
      </div>

      {/* Authorization text */}
      <p className="mt-3 text-[10px] uppercase leading-tight border-t border-b border-[#38515a] py-2">
        AUTHORIZATION GRANTED TO THE ABOVE USER TO DETAIN, IDENTIFY, AND/OR RETIRE ANY INDIVIDUAL
        OR ENTITY SUSPECTED OF PRIOR VIOLATION OF THE REPLICANT PROHIBITION ACT OF 2023 OR OTHERWISE
        IN BREACH OF ALLOWED OPERATIONAL PARAMETERS.
      </p>

      {/* Footer + Resume */}
      <div className="mt-3 flex items-center justify-between text-[10px] border-t border-[#38515a] pt-2">
        <span>☗ PROPERTY OF LOS ANGELES POLICE DEPT / DETECTION UNIT ☗</span>
        <button
          onClick={onOpenResume}
          className="ml-2 px-2 py-1 bg-[#16242b] border border-[#6fb6c4] text-[#cfeef5] hover:brightness-110"
        >
          <span className="inline-flex items-center gap-1">
            <FileText size={12} /> Resume
          </span>
        </button>
      </div>
    </div>
  );
}
