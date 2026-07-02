import { useState, useEffect } from 'react';

const MESSAGE = `Happy Birthday to the most amazing person in my life.

Thank you for filling my days with happiness, laughter, and love.

I hope today brings you as much joy as you bring into my life.

May all your dreams come true.

I feel lucky to have you.

Happy Birthday ❤️`;

export default function TypewriterText({ onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (idx < MESSAGE.length) {
      const delay = MESSAGE[idx] === '\n' ? 120 : 45;
      const t = setTimeout(() => {
        setDisplayed(prev => prev + MESSAGE[idx]);
        setIdx(i => i + 1);
      }, delay);
      return () => clearTimeout(t);
    } else if (!finished) {
      setFinished(true);
      onDone?.();
    }
  }, [idx, finished, onDone]);

  return (
    <div className="text-center max-w-lg mx-auto px-4">
      <p
        className="text-base md:text-lg leading-relaxed whitespace-pre-line"
        style={{ color: '#6d3a5e', fontFamily: 'Georgia, serif' }}
      >
        {displayed}
        {!finished && (
          <span
            className="inline-block w-0.5 h-5 ml-0.5 align-middle"
            style={{ background: '#e91e8c', animation: 'pulse 0.7s ease-in-out infinite' }}
          />
        )}
      </p>
    </div>
  );
}
