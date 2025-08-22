import { useEffect, useRef, useState } from "react";

type WindowProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  isActive?: boolean;
  zIndex?: number;
  defaultPos?: { x: number; y: number };
};

/** Win95 chrome with cyberpunk accents; fully draggable */
export default function Window({
  id,
  title,
  children,
  onClose,
  onFocus,
  isActive = false,
  zIndex = 100,
  defaultPos = { x: 180, y: 140 },
}: WindowProps) {
  const [pos, setPos] = useState(defaultPos);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseDownTitle = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    onFocus(id);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div
      ref={ref}
      className={`absolute select-none`}
      style={{ left: pos.x, top: pos.y, zIndex }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Frame */}
      <div
        className={`w-[420px] bg-[#ced6da]/5 border border-[#5d7b86] shadow-[8px_8px_0_#091319] ${
          isActive ? "ring-2 ring-[#6fb6c4]" : "ring-1 ring-[#2c4650]"
        }`}
      >
        {/* Title bar (Win95 shape + cyber gradient) */}
        <div
          onMouseDown={onMouseDownTitle}
          className="flex items-center justify-between px-2 py-1 cursor-move text-[#cfeef5] bg-[linear-gradient(180deg,#1a2a33_0%,#142229_100%)] border-b border-[#38515a]"
        >
          <span className="text-xs font-bold tracking-wide">{title}</span>
          <div className="flex items-center gap-1">
            <button
              title="Close"
              onClick={() => onClose(id)}
              className="w-5 h-5 grid place-items-center bg-[#1b2a31] border border-[#6fb6c4] text-[#cfeef5] text-[10px] leading-none hover:bg-[#243943] active:translate-y-[1px]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content area (make sure children never escape) */}
        <div className="p-3 bg-[#0f171d] text-[#cfeef5] overflow-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
