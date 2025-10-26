import { useEffect, useRef } from 'react';

export default function SpectroSection({ height = 260, bands = 26, className = '', children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let width = 0, heightPx = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, heightPx);

      const maxAmp = Math.max(8, heightPx * 0.05);
      const baseStep = heightPx / bands;

      // Subtle cyan haze blend
      const haze = ctx.createLinearGradient(0, 0, 0, heightPx);
      haze.addColorStop(0, 'rgba(216, 239, 255, 0.25)');
      haze.addColorStop(1, 'rgba(216, 239, 255, 0.10)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, heightPx);

      for (let i = 0; i < bands; i++) {
        const yBase = (i + 0.5) * baseStep;
        const ampEnv = Math.sin((i / (bands - 1)) * Math.PI); // center emphasis
        const amp = (0.25 + 0.75 * ampEnv) * maxAmp;
        const freq = 0.004 + 0.004 * Math.random();
        const phase = Math.random() * Math.PI * 2;

        // intensity -> hue/sat/light/alpha
        const intensity = 0.35 + 0.65 * ampEnv;
        const sat = Math.round(80 + 15 * intensity);
        const light = Math.round(65 - 25 * intensity);
        const alpha = 0.06 + 0.10 * intensity;
        ctx.strokeStyle = `hsla(0, ${sat}%, ${light}%, ${alpha})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const t = x * freq + phase;
          const y = yBase
            + Math.sin(t) * amp
            + Math.sin(t * 0.53 + i * 0.37) * amp * 0.25
            + Math.sin(t * 1.93 + i * 0.11) * amp * 0.12;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (i % 6 === 0) {
          ctx.lineWidth = 1.8;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Soft vertical vignette
      const vg = ctx.createLinearGradient(0, 0, 0, heightPx);
      vg.addColorStop(0, 'rgba(255,255,255,0.0)');
      vg.addColorStop(0.04, 'rgba(255,255,255,0.05)');
      vg.addColorStop(0.96, 'rgba(255,255,255,0.05)');
      vg.addColorStop(1, 'rgba(255,255,255,0.0)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, heightPx);
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      heightPx = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(heightPx * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    const ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);
    resize();
    return () => {
      ro?.disconnect();
    };
  }, [bands]);

  return (
    <section className={`spectro ${className}`.trim()} style={{ minHeight: height }}>
      <canvas ref={canvasRef} className="spectro-canvas" aria-hidden="true" />
      <div className="spectro-inner">
        {children}
      </div>
    </section>
  );
}

