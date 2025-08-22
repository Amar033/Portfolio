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

// MusicPlayer.tsx
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "../MusicPlayer.css"

interface Track {
  title: string;
  url: string;
  thumbnail?: string;
  artist?: string;
  duration?: string;
}

const playlist: Track[] = [
  {
    title: "Persona 4 Chill/Study Mix",
    url: "https://www.youtube.com/watch?v=tvDyyiivXuQ&list=RDtvDyyiivXuQ",
    thumbnail: "https://img.youtube.com/vi/tvDyyiivXuQ/0.jpg",
    artist: "Persona OST",
    duration: "2:10:00",
  },
  {
    title: "Persona 3 Reload Chill Mix",
    url: "https://www.youtube.com/watch?v=aeCp0PNgoyI&list=RDaeCp0PNgoyI&start_radio=1",
    thumbnail: "https://img.youtube.com/vi/aeCp0PNgoyI/0.jpg",
    artist: "Persona OST",
    duration: "1:55:00",
  },
  {
    title: "Persona 3-4-5 OST Chill Mix",
    url: "https://www.youtube.com/watch?v=c7445hWWbrI&list=RDc7445hWWbrI&start_radio=1",
    thumbnail: "https://img.youtube.com/vi/c7445hWWbrI/0.jpg",
    artist: "Persona OST",
    duration: "3:00:00",
  },
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [mini, setMini] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const audioRef = useRef<typeof ReactPlayer>(null);

  /** Next/Prev */
  const nextTrack = () => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * playlist.length));
    } else {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }
  };
  const prevTrack = () =>
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

  /** Visualizer */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const draw = () => {
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 20; i++) {
        const barHeight = Math.random() * height * 0.4;
        ctx.fillStyle = `rgba(111, 182, 196, 0.6)`;
        ctx.fillRect(i * 20 + 10, height - barHeight, 10, barHeight);
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  /** Toggle mini player */
  const toggleMini = () => setMini((prev) => !prev);

  return (
    <div
      className={`relative w-full ${
        mini ? "h-24" : "h-64"
      } bg-[#0f171d] p-2 rounded border border-[#6fb6c4] shadow-[0_0_10px_#6fb6c4] flex flex-col gap-2 overflow-hidden`}
    >
      {/* Canvas visualizer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />

      {/* Track info */}
      {!mini && (
        <div className="flex items-center gap-2 text-xs text-[#cfeef5]">
          {playlist[currentIndex].thumbnail && (
            <img
              src={playlist[currentIndex].thumbnail}
              className="w-10 h-10 object-cover border border-[#6fb6c4]"
            />
          )}
          <div className="flex flex-col">
            <span className="font-bold">{playlist[currentIndex].title}</span>
            <span className="text-xs">{playlist[currentIndex].artist}</span>
            <span className="text-xs">{playlist[currentIndex].duration}</span>
          </div>
        </div>
      )}

      {/* ReactPlayer */}
      <ReactPlayer
        // ref={audioRef}
        src={playlist[currentIndex].url}
        playing={playing}
        controls={false}
        width="100%"
        height="60px"
        volume={volume}
        onEnded={() => {
          if (repeat) setPlaying(true);
          else nextTrack();
        }}
      />

      {/* Controls */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex gap-1">
          <button onClick={prevTrack} className="cyber-btn">
            ◀
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="cyber-btn"
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button onClick={nextTrack} className="cyber-btn">
            ▶
          </button>
          <button
            onClick={() => setShuffle((s) => !s)}
            className={`cyber-btn ${shuffle ? "bg-[#6fb6c4]/50" : ""}`}
          >
            ⇄
          </button>
          <button
            onClick={() => setRepeat((r) => !r)}
            className={`cyber-btn ${repeat ? "bg-[#6fb6c4]/50" : ""}`}
          >
            ↺ 
          </button>
        </div>

        {/* Volume slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-2 w-24"
        />

        <button onClick={toggleMini} className="cyber-btn">
          {mini ? "🗖" : "🗕"}
        </button>
      </div>

      {/* Playlist */}
      {!mini && (
        <div className="flex gap-2 overflow-x-auto mt-2">
          {playlist.map((t, i) => (
            <div
              key={i}
              className={`flex flex-col items-center cursor-pointer border ${
                i === currentIndex ? "border-[#6fb6c4]" : "border-transparent"
              } p-1 hover:border-[#6fb6c4]`}
              onClick={() => setCurrentIndex(i)}
            >
              {t.thumbnail && (
                <img
                  src={t.thumbnail}
                  className="w-12 h-12 object-cover"
                  alt={t.title}
                />
              )}
              <span className="text-[10px] text-center">{t.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
