// import { useState, useRef, useEffect } from "react";

// type Song = { title: string; src: string };

// const songs: Song[] = [
//   { title: "Retro Track 1", src: "/music/Wake Up, Get Up, Get Out There.mp3" },
//   { title: "Retro Track 2", src: "/music/song2.mp3" },
//   { title: "Online Track", src: "https://www.example.com/song.mp3" },
// ];

// export default function MusicPlayer() {
//   const [current, setCurrent] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const playSong = async (index: number) => {
//     setCurrent(index);
//     if (!audioRef.current) return;
//     audioRef.current.src = songs[index].src;
//     try {
//       await audioRef.current.play();
//       setPlaying(true);
//     } catch (err) {
//       console.warn("Playback failed:", err);
//       setPlaying(false);
//     }
//   };

//   const togglePlay = async () => {
//     if (!audioRef.current) return;
//     try {
//       if (playing) audioRef.current.pause();
//       else await audioRef.current.play();
//       setPlaying(!playing);
//     } catch (err) {
//       console.warn("Playback failed:", err);
//       setPlaying(false);
//     }
//   };

//   const nextSong = () => playSong((current + 1) % songs.length);
//   const prevSong = () =>
//     playSong((current - 1 + songs.length) % songs.length);

//   // Update progress
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!audioRef.current) return;
//       setProgress(
//         (audioRef.current.currentTime / (audioRef.current.duration || 1)) *
//           100
//       );
//     }, 200);
//     return () => clearInterval(interval);
//   }, [current]);

//   // Visualizer: looping random bars
//   const [bars, setBars] = useState<number[]>(Array.from({ length: 10 }, () => 50));
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBars(Array.from({ length: 10 }, () => 30 + Math.random() * 70));
//     }, 150);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full p-2 font-mono text-[#6fb6c4] bg-[#0f171d] border border-[#3a5a66] box-border space-y-2">
//       <h2 className="text-lg font-bold">🎶 Retro Music Player</h2>

//       {/* Song title & progress */}
//       <div className="h-20 bg-[#0b1016] border border-[#3a5a66] p-1 box-border overflow-hidden relative">
//         <div className="overflow-hidden whitespace-nowrap w-full">
//           <div
//             className="animate-marquee inline-block"
//             style={{ animationDuration: `${songs[current].title.length * 0.4}s` }}
//           >
//             {songs[current].title}
//           </div>
//         </div>
//         <pre className="absolute bottom-1 left-1 m-0 p-0 text-xs">
//           {`[${"█".repeat(Math.round(progress / 5))}${"░".repeat(
//             20 - Math.round(progress / 5)
//           )}]`}
//         </pre>
//       </div>

//       {/* Visualizer bars */}
//       <div className="flex gap-1 h-8">
//         {bars.map((height, i) => (
//           <div
//             key={i}
//             className="w-1 bg-[#6fb6c4] transition-all duration-150"
//             style={{ height: `${height}%` }}
//           />
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="flex justify-between">
//         <button
//           onClick={prevSong}
//           className="w-8 h-6 bg-[#1b2a31] border border-[#6fb6c4] hover:bg-[#28424c] active:translate-y-[1px]"
//         >
//           ◀
//         </button>
//         <button
//           onClick={togglePlay}
//           className="w-8 h-6 bg-[#1b2a31] border border-[#6fb6c4] hover:bg-[#28424c] active:translate-y-[1px]"
//         >
//           {playing ? "⏸" : "▶"}
//         </button>
//         <button
//           onClick={nextSong}
//           className="w-8 h-6 bg-[#1b2a31] border border-[#6fb6c4] hover:bg-[#28424c] active:translate-y-[1px]"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Song list */}
//       <ul className="max-h-32 overflow-auto border border-[#3a5a66] p-1 box-border space-y-1">
//         {songs.map((song, i) => (
//           <li key={i}>
//             <button
//               onClick={() => playSong(i)}
//               className={`block w-full text-left p-1 border border-[#3a5a66] ${
//                 i === current ? "bg-[#28424c]" : "hover:bg-[#1c3037]"
//               }`}
//             >
//               {song.title}
//             </button>
//           </li>
//         ))}
//       </ul>

//       <audio ref={audioRef} />
//     </div>
//   );
// }


import { useState } from "react";
import ReactPlayer from "react-player";

const playlist = [
  {
    title: "Persona 4 Chill/Study Mix",
    url: "https://www.youtube.com/watch?v=tvDyyiivXuQ&list=RDtvDyyiivXuQ",
    artist: "Persona OST",
    thumb: "https://img.youtube.com/vi/tvDyyiivXuQ/mqdefault.jpg",
  },
  {
    title: "Persona 3 Reload Chill/Study Mix",
    url: "https://www.youtube.com/watch?v=aeCp0PNgoyI&list=RDaeCp0PNgoyI&start_radio=1",
    artist: "Persona OST",
    thumb: "https://img.youtube.com/vi/aeCp0PNgoyI/mqdefault.jpg",
  },
  {
    title: "Persona 3-4-5 OST Chill Mix",
    url: "https://www.youtube.com/watch?v=c7445hWWbrI&list=RDc7445hWWbrI&start_radio=1",
    artist: "Persona OST",
    thumb: "https://img.youtube.com/vi/c7445hWWbrI/mqdefault.jpg",
  },
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [miniMode, setMiniMode] = useState(false);

  const nextTrack = () => setCurrentIndex((prev) => (prev + 1) % playlist.length);
  const prevTrack = () =>
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <div className="relative w-full flex flex-col gap-2">
      {/* Floating Mini Toggle */}
      <button
        className="absolute top-0 right-0 z-50 px-2 py-1 text-xs border border-[#6fb6c4] hover:bg-[#243943] text-[#cfeef5] rounded"
        onClick={() => setMiniMode((m) => !m)}
      >
        {miniMode ? "Full" : "Mini"}
      </button>

      {/* Player + Visualizer */}
      <div className={`relative w-full ${miniMode ? "h-32" : "h-64"} rounded-md overflow-hidden bg-[#081017]`}>
        {/* Tiny animated bars */}
        <div className="absolute inset-0 flex items-end justify-center gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#6fb6c4] animate-pulse"
              style={{
                height: `${Math.random() * 40 + 10}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* ReactPlayer */}
        <ReactPlayer
          src={playlist[currentIndex].url}
          playing={playing}
          controls={false}
          volume={volume}
          width="100%"
          height="100%"
          style={{ objectFit: "cover", pointerEvents: "none" }}
          onEnded={nextTrack}
        />
      </div>

      {/* Track Info */}
      {!miniMode && (
        <div className="text-xs text-center font-bold text-[#6fb6c4] mt-1">
          {playlist[currentIndex].title} — {playlist[currentIndex].artist}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center mt-1 gap-2">
        <div className="flex gap-1">
          <button onClick={prevTrack} className="px-2 py-1 bg-[#1b2a31] border border-[#6fb6c4] text-[#cfeef5] hover:bg-[#243943] rounded">◀</button>
          <button onClick={() => setPlaying((p) => !p)} className="px-2 py-1 bg-[#1b2a31] border border-[#6fb6c4] text-[#cfeef5] hover:bg-[#243943] rounded">{playing ? "❚❚" : "▶"}</button>
          <button onClick={nextTrack} className="px-2 py-1 bg-[#1b2a31] border border-[#6fb6c4] text-[#cfeef5] hover:bg-[#243943] rounded">▶</button>
        </div>

        {/* Volume */}
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-24" />
      </div>

      {/* Playlist Thumbnails */}
      {!miniMode && (
        <div className="flex gap-2 overflow-x-auto mt-1">
          {playlist.map((track, idx) => (
            <div
              key={idx}
              className={`w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer ${idx === currentIndex ? "border-[#6fb6c4]" : "border-transparent"} hover:border-[#00ffff]`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={track.thumb} alt={track.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
