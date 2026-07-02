import { useMemo } from 'react';
import { motion } from 'framer-motion';

const BALLOON_COLORS = [
  { body: '#ff80ab', string: '#e91e8c' },
  { body: '#ea80fc', string: '#9c27b0' },
  { body: '#82b1ff', string: '#3f51b5' },
  { body: '#ffe57f', string: '#fbc02d' },
  { body: '#b9f6ca', string: '#2e7d32' },
  { body: '#ffab40', string: '#e65100' },
  { body: '#f48fb1', string: '#c2185b' },
  { body: '#80deea', string: '#00838f' },
];

function BalloonSVG({ color }) {
  return (
    <svg width="48" height="70" viewBox="0 0 48 70" fill="none">
      <ellipse cx="24" cy="24" rx="20" ry="24" fill={color.body} />
      <ellipse cx="17" cy="14" rx="5" ry="7" fill="rgba(255,255,255,0.35)" />
      <polygon points="24,48 20,56 28,56" fill={color.body} />
      <path d="M24 56 Q28 60 24 65 Q20 60 24 56" stroke={color.string} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default function Balloons({ active, count = 10 }) {
  const balloons = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 2,
      duration: 5 + Math.random() * 4,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      rotate: Math.random() * 30 - 15,
    })), [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 45 }}>
      {balloons.map(b => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', opacity: 0, rotate: b.rotate }}
          animate={{ y: '-20vh', opacity: [0, 1, 1, 0], rotate: b.rotate + 10 }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: 'easeOut',
          }}
          style={{ position: 'absolute', left: b.left, bottom: 0 }}
        >
          <BalloonSVG color={b.color} />
        </motion.div>
      ))}
    </div>
  );
}
