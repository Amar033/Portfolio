type IconProps = {
  label: string;
  onOpen: () => void;
};

export default function Icon({ label, onOpen }: IconProps) {
  return (
    <div
      onDoubleClick={onOpen}
      className="flex flex-col items-center cursor-pointer text-center text-white"
    >
      <div className="w-12 h-12 bg-white/20 border border-white/40 rounded-sm" />
      <span className="mt-1 text-xs font-mono">{label}</span>
    </div>
  );
}
