import { useEffect, useRef } from 'react';

const COLORS = ['#ff80ab','#ea80fc','#82b1ff','#ffe57f','#b9f6ca','#ffab40','#ff1744','#f48fb1','#fff176'];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function Fireworks({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let launchCount = 0;
    const maxLaunches = 12;

    const launchFirework = () => {
      if (launchCount >= maxLaunches) return;
      launchCount++;
      const x = randomBetween(canvas.width * 0.15, canvas.width * 0.85);
      const y = randomBetween(canvas.height * 0.1, canvas.height * 0.5);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = Math.floor(randomBetween(60, 100));

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = randomBetween(2, 7);
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: randomBetween(2, 4),
          decay: randomBetween(0.012, 0.022),
          gravity: 0.06,
        });
      }
    };

    // Launch fireworks at intervals
    const intervals = [200, 700, 1400, 2200, 3000, 3800, 4600, 5200, 5900, 6500, 7100, 7600];
    const timers = intervals.map(t => setTimeout(launchFirework, t));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02);

      for (const p of particlesRef.current) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;
        p.size *= 0.995;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
      particlesRef.current = [];
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
}
