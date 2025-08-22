export default function Resume() {
  return (
    <div className="text-[#cfeef5] space-y-2">
      <h2 className="text-sm font-bold tracking-wide">RESUME.EXE</h2>
      <div className="grid grid-cols-2 gap-3">
        <section className="bg-[#0f171d] border border-[#38515a] p-2">
          <h3 className="text-xs font-semibold mb-1">SUMMARY</h3>
          <p className="text-[11px] leading-snug">
            Placeholder summary. Aspiring AI/ML Engineer focused on practical models and delightful
            UI. Passion for retro-futurism and systems design.
          </p>
        </section>
        <section className="bg-[#0f171d] border border-[#38515a] p-2">
          <h3 className="text-xs font-semibold mb-1">SKILLS</h3>
          <ul className="list-disc pl-4 text-[11px]">
            <li>Python, Java, C</li>
            <li>React, FastAPI, Tailwind</li>
            <li>TensorFlow, OpenCV</li>
            <li>Power BI</li>
          </ul>
        </section>
        <section className="bg-[#0f171d] border border-[#38515a] p-2 col-span-2">
          <h3 className="text-xs font-semibold mb-1">PROJECTS</h3>
          <ul className="list-disc pl-4 text-[11px]">
            <li>Universal Translator — realtime speech → speech</li>
            <li>Emotify — sentiment + music pairing</li>
            <li>StAI — stock prediction experiments</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
