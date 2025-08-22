
import { useMemo, useState, useEffect, type JSX } from "react";
import Window from "./pages/Window";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcons";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

/** Keep ids as strings everywhere to avoid TS mismatches */
type WinId =
  | "profile"
  | "resume"
  | "about"
  | "skills"
  | "projects"
  | "contact"
  | "hobbies"
  | "clock"
  | "music";

export default function App() {
  /** Window z-order */
  const [openOrder, setOpenOrder] = useState<WinId[]>(["profile"]);
  const [active, setActive] = useState<WinId | null>("profile");

  const titles: Record<WinId, string> = {
    profile: "Profile.exe",
    resume: "Resume.exe",
    about: "About Me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    hobbies: "Hobbies",
    clock: "Clock",
    music: "Music",
  };

  const icons = useMemo(
    () => [
      { id: "about" as WinId, title: "About Me", icon: <span className="pixel-emoji">👤</span> },
      { id: "skills" as WinId, title: "Skills", icon: <span className="pixel-emoji">💻</span> },
      { id: "projects" as WinId, title: "Projects", icon: <span className="pixel-emoji">📂</span> },
      { id: "contact" as WinId, title: "Contact", icon: <span className="pixel-emoji">📧</span> },
      { id: "hobbies" as WinId, title: "Hobbies", icon: <span className="pixel-emoji">🎮</span> },
      { id: "clock" as WinId, title: "Clock", icon: <span className="pixel-emoji">⏰</span> },
      { id: "resume" as WinId, title: "Resume.exe", icon: <span className="pixel-emoji">📄</span> },
      { id: "music" as WinId, title: "Music.exe", icon: <span className="pixel-emoji">🎵</span> },
    ],
    []
  );

  /** Window content */
  const contentFor = (id: WinId): JSX.Element => {
    switch (id) {
      case "profile": return <Profile onOpenResume={() => openWindow("resume")} />;
      case "resume": return <Resume />;
      case "about": return <p>Hello! I’m Amardeep, an aspiring AI/ML Engineer 🚀</p>;
      case "skills": return <SkillsContent />;
      case "projects": return <ProjectsContent />;
      case "contact": return <ContactContent />;
      case "hobbies": return <HobbiesContent />;
      case "clock": return <LiveClock />;
      case "music": return <MusicPlayer />;
      default: return <p>Unknown Window</p>;
    }
  };

  /** Window handlers */
  const openWindow = (id: WinId) => {
    setOpenOrder((prev) => (prev.includes(id) ? [...prev] : [...prev, id]));
    setActive(id);
  };
  const closeWindow = (id: WinId) => {
    setOpenOrder((prev) => prev.filter((w) => w !== id));
    setActive((a) => (a === id ? null : a));
  };
  const focusWindow = (id: WinId) => {
    setOpenOrder((prev) => [...prev.filter((w) => w !== id), id]);
    setActive(id);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      {/* CRT frame */}
      <div className="relative h-screen w-auto aspect-[4/3] mx-auto bg-[#0b1016] text-[#cfeef5] overflow-hidden crt-effect rounded-[24px] ring-1 ring-[#22303a] shadow-[0_0_0_6px_#0b1016,0_0_60px_rgba(0,255,255,0.1)_inset]">

        {/* Wallpaper */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#0f1a22_0%,#0b1016_60%,#081017_100%)] z-0" />

        {/* Desktop icons */}
        <div className="absolute top-6 left-6 right-6 bottom-14 z-40 flex flex-wrap gap-6 overflow-auto p-2">
          {icons.map((it) => (
            <DesktopIcon
              key={it.id}
              title={it.title}
              onOpen={() => openWindow(it.id)}
              icon={it.icon}
            />
          ))}
        </div>

        {/* Windows */}
        {openOrder.map((id, i) => (
          <Window
            key={id}
            id={id}
            title={titles[id]}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
            isActive={active === id}
            zIndex={100 + i + (active === id ? 100 : 0)}
            defaultPos={{ x: 160 + i * 26, y: 110 + i * 18 }}
          >
            {contentFor(id)}
          </Window>
        ))}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <Taskbar
            openWindows={openOrder.map((id) => ({ id, title: titles[id] }))}
            activeId={active}
            onSelect={(id) => focusWindow(id as WinId)}  // cast here
            onClose={(id) => closeWindow(id as WinId)}   // cast here
            onStartOpenAbout={() => openWindow("about")}
          />
        </div>
      </div>
    </div>
  );
}

/** Subcomponents */
function SkillsContent() {
  return (
    <div className="space-y-2">
      <ul className="list-disc pl-6">
        <li>Python, Java, C</li>
        <li>React, FastAPI, Flutter</li>
        <li>TensorFlow, OpenCV</li>
        <li>Power BI</li>
      </ul>
      <div className="space-y-1">
        {[
          ["Python", 90],
          ["React", 80],
          ["TensorFlow", 75],
          ["FastAPI", 70],
        ].map(([name, pct]) => (
          <div key={name as string}>
            <div className="text-xs">{name}</div>
            <div className="h-2 bg-[#1a2227] border border-[#6fb6c4]">
              <div className="h-full bg-[#6fb6c4]" style={{ width: `${pct as number}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-1">
      <p>🔹 Universal Translator</p>
      <p>🔹 Emotify (Sentiment + Music)</p>
      <p>🔹 StAI (Stock Prediction AI)</p>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-1">
      <p>Email: amarbavi12345@gmail.com</p>
      <p>LinkedIn: linkedin.com/in/amar033</p>
    </div>
  );
}

function HobbiesContent() {
  return (
    <ul className="list-disc pl-6">
      <li>🎵 Music</li>
      <li>🎮 Gaming</li>
      <li>🤖 AI/ML side projects</li>
    </ul>
  );
}

/** Live clock */
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="text-lg tracking-widest">
      {now.toLocaleTimeString([], { hour12: false })}
    </div>
  );
}
