// // src/components/Terminal.tsx
// import { useEffect, useMemo, useRef, useState } from "react";

// type Props = {
//   /** open a window by id from the desktop (e.g., "music", "projects") */
//   onOpenWindow?: (id: string) => void;
//   /** switch portfolio theme, e.g. "p3" | "p4" | "p5" */
//   onPersonaShift?: (theme: string) => void;
// };

// type Line = { text: string; kind?: "normal" | "system" | "error" | "ascii" };

// const ASCII_SET = [
// `   ___                       _           
//   / _ \\ _ __   ___ _ __ ___ (_)_ __  ___ 
//  | | | | '_ \\ / _ \\ '_ \` _ \\| | '_ \\/ __|
//  | |_| | |_) |  __/ | | | | | | | | \\__ \\
//   \\___/| .__/ \\___|_| |_| |_|_|_| |_|___/
//        |_|                                 `,
// `  ____                      _              
//  |  _ \\ ___  _ __ ___   ___| |_ ___  _ __  
//  | |_) / _ \\| '_ \` _ \\ / _ \\ __/ _ \\| '_ \\ 
//  |  __/ (_) | | | | | |  __/ || (_) | | | |
//  |_|   \\___/|_| |_| |_|\\___|\\__\\___/|_| |_|`,
// ];

// export default function Terminal({ onOpenWindow, onPersonaShift }: Props) {
//   const [lines, setLines] = useState<Line[]>([
//     { text: "PersonaOS v1.0 — type 'help' to begin", kind: "system" },
//   ]);
//   const [input, setInput] = useState("");
//   const [history, setHistory] = useState<string[]>([]);
//   const [histIdx, setHistIdx] = useState<number>(-1);

//   // matrix overlay
//   const [matrixOn, setMatrixOn] = useState(false);
//   const [matrixRows, setMatrixRows] = useState<string[]>([]);

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
//   }, [lines, matrixOn, matrixRows]);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // simple matrix animator
//   useEffect(() => {
//     if (!matrixOn) return;
//     const cols = 64;
//     const charset = "01░▒▓@#*+=- ";
//     const makeRow = () =>
//       Array.from({ length: cols }, () => charset[Math.floor(Math.random() * charset.length)]).join(
//         ""
//       );

//     const id = setInterval(() => {
//       setMatrixRows((r) => {
//         const next = r.slice(-18);
//         next.push(makeRow());
//         return next;
//       });
//     }, 80);

//     return () => clearInterval(id);
//   }, [matrixOn]);

//   const prompt = useMemo(() => "amar@PersonaOS:~$", []);

//   function print(text: string | string[], kind: Line["kind"] = "normal") {
//     const arr = Array.isArray(text) ? text : [text];
//     setLines((prev) => [...prev, ...arr.map((t) => ({ text: t, kind }))]);
//   }

//   function clear() {
//     setLines([]);
//   }

//   function cmd_help() {
//     print([
//       "Available commands:",
//       "  help                — show this help",
//       "  clear               — clear the terminal",
//       "  about               — who am I?",
//       "  projects            — list projects",
//       "  contact             — email / LinkedIn",
//       "  sysinfo             — neofetch-style system info",
//       "  ascii               — show random ASCII art",
//       "  matrix              — toggle matrix rain",
//       "  hack                — fake progress demo",
//       "  persona <p3|p4|p5>  — switch theme",
//       "  open music          — open Music window",
//     ]);
//   }

//   function cmd_about() {
//     print([
//       "Amardeep — aspiring AI/ML Engineer 🚀",
//       "Enjoys: music, gaming, and building playful UIs.",
//     ]);
//   }

//   function cmd_projects() {
//     print(
//       [
//         "projects/",
//         "├─ Universal Translator",
//         "├─ Emotify (Sentiment + Music)",
//         "└─ StAI (Stock Prediction AI)",
//       ],
//       "system"
//     );
//   }

//   function cmd_contact() {
//     print(["Email: amarbavi12345@gmail.com", "LinkedIn: linkedin.com/in/amar033"]);
//   }

//   function cmd_sysinfo() {
//     print(
//       [
//         "amar@Portfolio",
//         "OS: PersonaOS v1.0",
//         "Kernel: React 18 (TS)",
//         "Shell: retro-tty",
//         "CPU: Curiosity x∞",
//         "GPU: CRT-Glow 3000",
//         "Memory: 16GB vibes",
//       ],
//       "system"
//     );
//   }

//   function cmd_ascii() {
//     const pick = ASCII_SET[Math.floor(Math.random() * ASCII_SET.length)];
//     print(pick.split("\n"), "ascii");
//   }

//   async function cmd_hack() {
//     print("[INIT] establishing uplink…", "system");
//     for (let i = 0; i <= 20; i++) {
//       await new Promise((r) => setTimeout(r, 80));
//       const bar = "█".repeat(i) + "░".repeat(20 - i);
//       setLines((prev) => [...prev, { text: `[${bar}] ${i * 5}%`, kind: "system" }]);
//     }
//     print("OK — totally hacked the mainframe 😎", "system");
//   }

//   function cmd_persona(arg?: string) {
//     if (!arg || !["p3", "p4", "p5"].includes(arg)) {
//       print("usage: persona <p3|p4|p5>", "error");
//       return;
//     }
//     onPersonaShift?.(arg);
//     print(`Switched theme → ${arg.toUpperCase()}`, "system");
//   }

//   function cmd_open(arg?: string) {
//     if (arg === "music") {
//       onOpenWindow?.("music");
//       print("Launching Music.exe…", "system");
//     } else {
//       print("usage: open music", "error");
//     }
//   }

//   function run(raw: string) {
//     const input = raw.trim();
//     if (!input) return;

//     // echo command
//     print(`${prompt} ${input}`, "system");

//     // save to history
//     setHistory((h) => [input, ...h]);
//     setHistIdx(-1);

//     const [cmd, ...args] = input.split(/\s+/);
//     const arg0 = args[0];

//     switch (cmd) {
//       case "help":
//         cmd_help();
//         break;
//       case "clear":
//         clear();
//         break;
//       case "about":
//         cmd_about();
//         break;
//       case "projects":
//         cmd_projects();
//         break;
//       case "contact":
//         cmd_contact();
//         break;
//       case "sysinfo":
//         cmd_sysinfo();
//         break;
//       case "ascii":
//         cmd_ascii();
//         break;
//       case "matrix":
//         setMatrixOn((m) => !m);
//         print(`matrix ${!matrixOn ? "ON" : "OFF"}`, "system");
//         break;
//       case "hack":
//         void cmd_hack();
//         break;
//       case "persona":
//         cmd_persona(arg0);
//         break;
//       case "open":
//         cmd_open(arg0);
//         break;
//       default:
//         print(`command not found: ${cmd}`, "error");
//     }
//   }

//   function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const v = input;
//       setInput("");
//       run(v);
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       const next = Math.min(history.length - 1, histIdx + 1);
//       if (history[next]) {
//         setHistIdx(next);
//         setInput(history[next]);
//       }
//     } else if (e.key === "ArrowDown") {
//       e.preventDefault();
//       const next = Math.max(-1, histIdx - 1);
//       setHistIdx(next);
//       setInput(next === -1 ? "" : history[next]);
//     }
//   }

//   return (
//     <div className="relative w-[560px] max-w-full h-[360px] bg-[#0b1016] border border-[#38515a] overflow-hidden">
//       {/* scanlines */}
//       <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_50%,rgba(0,0,0,0)_100%)] bg-[length:100%_3px]" />
//       {/* glow */}
//       <div className="absolute inset-0 ring-1 ring-[#22303a] shadow-[inset_0_0_60px_rgba(0,255,255,.08)] pointer-events-none" />

//       {/* Matrix overlay */}
//       {matrixOn && (
//         <div className="absolute inset-0 bg-black/50 text-green-400 font-mono text-xs p-2 overflow-hidden">
//           {matrixRows.map((r, i) => (
//             <div key={i} className="whitespace-pre">{r}</div>
//           ))}
//           <div className="absolute top-1 right-2 text-[10px] opacity-70">matrix — press "matrix" again to stop</div>
//         </div>
//       )}

//       {/* Output */}
//       <div
//         ref={containerRef}
//         className="absolute inset-0 p-3 pb-8 font-mono text-[12px] text-[#d9faff] overflow-auto space-y-1"
//       >
//         {lines.map((l, i) => (
//           <pre
//             key={i}
//             className={
//               l.kind === "error"
//                 ? "text-red-300"
//                 : l.kind === "ascii"
//                 ? "text-yellow-300"
//                 : l.kind === "system"
//                 ? "text-[#6fb6c4]"
//                 : "text-[#d9faff]"
//             }
//           >
//             {l.text}
//           </pre>
//         ))}

//         {/* Prompt */}
//         <div className="flex gap-2 items-center">
//           <span className="text-[#6fb6c4]">{prompt}</span>
//           <input
//             ref={inputRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={onKeyDown}
//             className="flex-1 bg-transparent outline-none caret-[#6fb6c4] text-[#d9faff]"
//             autoCorrect="off"
//             autoCapitalize="none"
//             spellCheck={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/Terminal.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onOpenWindow?: (id: string) => void;
  onPersonaShift?: (theme: string) => void;
};

type Line = { text: string; kind?: "normal" | "system" | "error" | "ascii" };

const ASCII_SET = [
`   ██████╗ ███████╗███████╗███████╗ █████╗ 
  ██╔═══██╗██╔════╝██╔════╝██╔════╝██╔══██╗
  ██║   ██║███████╗███████╗█████╗  ███████║
  ██║   ██║╚════██║╚════██║██╔══╝  ██╔══██║
  ╚██████╔╝███████║███████║███████╗██║  ██║
   ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝`,
`   ___                       _           
  / _ \\ _ __   ___ _ __ ___ (_)_ __  ___ 
 | | | | '_ \\ / _ \\ '_ \` _ \\| | '_ \\/ __|
 | |_| | |_) |  __/ | | | | | | | | \\__ \\
  \\___/| .__/ \\___|_| |_| |_|_|_| |_|___/
       |_|                                 `,
];

export default function Terminal({ onOpenWindow, onPersonaShift }: Props) {
  const [lines, setLines] = useState<Line[]>([
    { text: "PersonaOS v1.0 — type 'help' to begin", kind: "system" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);

  // Matrix overlay
  const [matrixOn, setMatrixOn] = useState(false);
  const [matrixRows, setMatrixRows] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [lines, matrixOn, matrixRows]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // simple matrix animator
  useEffect(() => {
    if (!matrixOn) return;
    const cols = 64;
    const charset = "01░▒▓@#*+=- ";
    const makeRow = () =>
      Array.from({ length: cols }, () => charset[Math.floor(Math.random() * charset.length)]).join("");

    const id = setInterval(() => {
      setMatrixRows((r) => {
        const next = r.slice(-18);
        next.push(makeRow());
        return next;
      });
    }, 80);

    return () => clearInterval(id);
  }, [matrixOn]);

  const prompt = useMemo(() => "guest@personaOS:~$", []);

  function print(text: string | string[], kind: Line["kind"] = "normal") {
    const arr = Array.isArray(text) ? text : [text];
    setLines((prev) => [...prev, ...arr.map((t) => ({ text: t, kind }))]);
  }

  function clear() {
    setLines([]);
  }

  function cmd_help() {
    print([
      "Available commands:",
      "  help                — show this help",
      "  clear               — clear the terminal",
      "  about               — who am I?",
      "  projects            — list projects",
      "  contact             — email / LinkedIn",
      "  sysinfo             — neofetch-style system info",
      "  ascii               — show random ASCII art",
      "  matrix              — toggle matrix rain",
      "  hack                — fake progress demo",
      "  persona <p3|p4|p5>  — switch theme",
      "  open music          — open Music window",
    ]);
  }

  function cmd_about() {
    print([
      "Amardeep — aspiring AI/ML Engineer 🚀",
      "Enjoys: music, gaming, and building playful UIs.",
    ]);
  }

  function cmd_projects() {
    print(
      [
        "projects/",
        "├─ Universal Translator",
        "├─ Emotify (Sentiment + Music)",
        "└─ StAI (Stock Prediction AI)",
      ],
      "system"
    );
  }

  function cmd_contact() {
    print(["Email: amarbavi12345@gmail.com", "LinkedIn: linkedin.com/in/amar033"]);
  }

  function cmd_sysinfo() {
    print(
      [
        "guest@Portfolio",
        "OS: PersonaOS v1.0",
        "Kernel: React 18 (TS)",
        "Shell: retro-tty",
        "CPU: Curiosity x∞",
        "GPU: CRT-Glow 3000",
        "Memory: 16GB vibes",
      ],
      "system"
    );
  }

  function cmd_ascii() {
    const pick = ASCII_SET[Math.floor(Math.random() * ASCII_SET.length)];
    print(pick.split("\n"), "ascii");
  }

  async function cmd_hack() {
    print("[INIT] establishing uplink…", "system");
    for (let i = 0; i <= 20; i++) {
      await new Promise((r) => setTimeout(r, 80));
      const bar = "█".repeat(i) + "░".repeat(20 - i);
      setLines((prev) => [...prev, { text: `[${bar}] ${i * 5}%`, kind: "system" }]);
    }
    print("OK — totally hacked the mainframe 😎", "system");
  }

  function cmd_persona(arg?: string) {
    if (!arg || !["p3", "p4", "p5"].includes(arg)) {
      print("usage: persona <p3|p4|p5>", "error");
      return;
    }
    onPersonaShift?.(arg);
    print(`Switched theme → ${arg.toUpperCase()}`, "system");
  }

  function cmd_open(arg?: string) {
    if (arg === "music") {
      onOpenWindow?.("music");
      print("Launching Music.exe…", "system");
    } else {
      print("usage: open music", "error");
    }
  }

  function run(raw: string) {
    const input = raw.trim();
    if (!input) return;
    print(`${prompt} ${input}`, "system");
    setHistory((h) => [input, ...h]);
    setHistIdx(-1);

    const [cmd, ...args] = input.split(/\s+/);
    const arg0 = args[0];

    switch (cmd) {
      case "help": cmd_help(); break;
      case "clear": clear(); break;
      case "about": cmd_about(); break;
      case "projects": cmd_projects(); break;
      case "contact": cmd_contact(); break;
      case "sysinfo": cmd_sysinfo(); break;
      case "ascii": cmd_ascii(); break;
      case "matrix": setMatrixOn((m) => !m); print(`matrix ${!matrixOn ? "ON" : "OFF"}`, "system"); break;
      case "hack": void cmd_hack(); break;
      case "persona": cmd_persona(arg0); break;
      case "open": cmd_open(arg0); break;
      default: print(`command not found: ${cmd}`, "error");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input;
      setInput("");
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(history.length - 1, histIdx + 1);
      if (history[next]) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, histIdx - 1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  }

  return (
    <div className="relative w-[640px] max-w-full h-[400px] bg-[#0c0c0c] text-[#ffb400] border-4 border-[#333] shadow-[0_0_40px_#ffb40080,inset_0_0_60px_#ffb40030] font-mono overflow-hidden">
      {/* scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,180,0,0.1)_1px,transparent_1px)] bg-[length:100%_2px] opacity-30" />
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)]" />

      {/* Matrix overlay */}
      {matrixOn && (
        <div className="absolute inset-0 bg-black/80 text-green-400 font-mono text-xs p-2 overflow-hidden">
          {matrixRows.map((r, i) => (
            <div key={i} className="whitespace-pre">{r}</div>
          ))}
        </div>
      )}

      {/* Output */}
      <div ref={containerRef} className="absolute inset-0 p-4 pb-8 text-sm overflow-auto space-y-1">
        {lines.map((l, i) => (
          <motion.pre
            key={i}
            className={
              l.kind === "error"
                ? "text-red-400"
                : "text-[#ffb400]"
            }
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {l.text}
          </motion.pre>
        ))}

        {/* Prompt */}
        <div className="flex gap-2 items-center">
          <span>{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-[#ffb400]"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <motion.span
            className="inline-block w-2 bg-[#ffb400] ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
