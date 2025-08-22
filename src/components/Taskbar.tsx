
import { useState } from "react";

type TaskbarProps = {
  openWindows: { id: string; title: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onStartOpenAbout: () => void;
};

export default function Taskbar({
  openWindows,
  activeId,
  onSelect,
  onClose,
  onStartOpenAbout,
}: TaskbarProps) {
  return (
    <div className="h-9 bg-[linear-gradient(180deg,#121e25_0%,#0e171d_100%)] border-t border-[#38515a] text-[#cfeef5] px-2 flex items-center gap-2">
      <button
        onClick={onStartOpenAbout}
        className="px-2 py-1 bg-[#16242b] border border-[#6fb6c4] shadow-[3px_3px_0_#091319] active:translate-y-[1px]"
      >
        start
      </button>

      <div className="flex items-center gap-1 overflow-x-auto flex-1">
        {openWindows.map((w) => (
          <div
            key={w.id}
            className={`flex items-center gap-1 px-2 py-[6px] border border-[#3b5b66] bg-[#0f171d] shadow-[3px_3px_0_#091319] cursor-pointer whitespace-nowrap ${
              activeId === w.id ? "outline outline-1 outline-[#6fb6c4]" : ""
            }`}
            onClick={() => onSelect(w.id)}
            title={w.title}
          >
            <span>🗔</span>
            <span className="text-xs">{w.title}</span>
            <button
              className="ml-1 w-4 h-4 leading-none text-[10px] bg-[#1b2a31] border border-[#6fb6c4] grid place-items-center"
              onClick={(e) => {
                e.stopPropagation();
                onClose(w.id);
              }}
              aria-label={`Close ${w.title}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <TaskbarClock />
    </div>
  );
}

function TaskbarClock() {
  const [now, setNow] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  useState(() => {
    const t = setInterval(() => {
      setNow(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30_000);
    return () => clearInterval(t);
  });
  return (
    <span className="px-2 py-1 bg-[#0f171d] border border-[#38515a] shadow-[2px_2px_0_#091319]">
      {now}
    </span>
  );
}
