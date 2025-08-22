import React, { useEffect, useRef } from "react";
import type REGL from "regl";
import createREGL from "regl";

const CRTCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const regl = createREGL({ canvas, attributes: { antialias: true, alpha: false } });

    const bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = 480;
    bufferCanvas.height = 320;
    const bufferCtx = bufferCanvas.getContext("2d")!;

    const characterSet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    interface Trail { x: number; y: number; vy: number; }
    const trails: Trail[] = Array.from({ length: 30 }, () => ({
      x: Math.floor(Math.random() * 80),
      y: Math.random() * 32,
      vy: 5 + Math.random() * 10,
    }));

    const spriteTexture = regl.texture({ width: bufferCanvas.width, height: bufferCanvas.height, mag: "linear" });

    // --- Draw quad with proper props typing ---
    type DrawProps = { time: number };
    const drawQuad = regl<{}, {}, {}, DrawProps>({
      frag: `
        precision mediump float;
        uniform sampler2D tex;
        uniform float time;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          uv.y += sin(time * 0.5) * 0.02;
          vec3 col = texture2D(tex, uv).rgb;

          // Glow effect
          float glow = 0.0;
          for (int x=-1; x<=1; x++) {
            for (int y=-1; y<=1; y++) {
              vec2 offset = vec2(float(x), float(y)) * 0.002;
              glow += texture2D(tex, uv + offset).r;
            }
          }
          glow /= 9.0;
          col = mix(col, vec3(0.0, glow, 0.0), 0.6);

          // Scanlines
          float scan = sin(uv.y * 800.0) * 0.05;
          col -= scan;

          // Vignette
          vec2 centered = uv - 0.5;
          float vignette = 0.3 * length(centered);
          col *= 1.0 - vignette;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      vert: `
        precision mediump float;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = 0.5 + 0.5 * position;
          gl_Position = vec4(position, 0, 1);
        }
      `,
      attributes: {
        position: [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1]
        ],
      },
      elements: [
        [0, 1, 2],
        [0, 2, 3]
      ],
      uniforms: {
        tex: spriteTexture, // static
        // time: regl.prop<"time", number>("time") // dynamic uniform
        //  time: ({ time }) => time
        time: (context: REGL.DefaultContext) => context.time
      },
    });

    function updateTrails() {
      trails.forEach(trail => {
        trail.y += trail.vy * 0.016;
        if (trail.y > 32) trail.y = 0;
      });
    }

    regl.frame(({ time }) => {
      updateTrails();

      bufferCtx.fillStyle = "rgba(0,0,0,0.2)";
      bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

      bufferCtx.fillStyle = "#0f0";
      bufferCtx.font = "12px monospace";

      trails.forEach(trail => {
        const char = characterSet[Math.floor(Math.random() * characterSet.length)];
        bufferCtx.fillText(char, trail.x * 6, trail.y * 10);
      });

      spriteTexture({ data: bufferCanvas });

      drawQuad({ time }); // pass dynamic time
    });

    return () => { regl.destroy(); };
  }, []);

  return <canvas ref={canvasRef} width={640} height={480} style={{ borderRadius: "20px" }} />;
};

export default CRTCanvas;
