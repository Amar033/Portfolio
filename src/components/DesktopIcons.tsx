import type { JSX } from "react";


type Props = {
  title: string;
  icon: string | JSX.Element;  // allow both string and JSX
  onOpen: () => void;
};

export default function DesktopIcon({ title, icon, onOpen }: Props) {
  return (
    <button
      onDoubleClick={onOpen}
      className="flex flex-col items-center text-[#cfeef5] hover:brightness-110"
      title={title}
    >
      <div className="w-12 h-12 grid place-items-center bg-[#142229] border border-[#3a5a66] shadow-[4px_4px_0_#091319]">
        <span className="text-xl">{icon}</span>
      </div>
      <span className="mt-1 px-1 text-[11px] bg-[#0b141a]/60 border border-[#28424c]">
        {title}
      </span>
    </button>
  );
}
