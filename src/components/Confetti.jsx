import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ active }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;

    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#ff80ab', '#ea80fc', '#82b1ff', '#ffe57f', '#b9f6ca', '#ffab40', '#f48fb1'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [active]);

  return null;
}
