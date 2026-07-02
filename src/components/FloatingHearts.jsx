import { useMemo } from 'react';

const HEARTS = ['❤️', '💕', '💗', '💖', '💝', '🌸', '✨'];

export default function FloatingHearts({ count = 20 }) {
  const hearts = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: HEARTS[i % HEARTS.length],
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 24 + 14}px`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.5 + 0.3,
    })), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute bottom-0 floating-heart select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
            opacity: h.opacity,
          }}
        >
          {h.symbol}
        </div>
      ))}
    </div>
  );
}
