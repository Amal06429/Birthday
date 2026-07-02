import { useMemo } from 'react';

const COLORS = [
  'rgba(255,182,193,0.8)',
  'rgba(216,191,216,0.8)',
  'rgba(255,215,0,0.7)',
  'rgba(255,105,180,0.6)',
  'rgba(238,130,238,0.7)',
];

export default function GlowingParticles({ count = 30 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 3}px`,
      color: COLORS[i % COLORS.length],
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 5}s`,
    })), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full sparkle-star"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${parseInt(p.size) * 3}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
