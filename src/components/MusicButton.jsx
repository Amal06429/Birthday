import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Try to use a royalty-free romantic music via URL
    // User can replace this with a local file like /music.mp3
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.4;
    // Try local first, fallback gracefully
    audio.src = '/music.mp3';
    audio.addEventListener('canplaythrough', () => setLoaded(true));
    audio.addEventListener('error', () => {
      // If no local file, we just show disabled state
      setLoaded(false);
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      title={playing ? 'Pause Music' : 'Play Music 🎵'}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold shadow-xl cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
        boxShadow: '0 4px 20px rgba(233,30,99,0.5)',
        border: 'none',
        fontSize: 15,
      }}
    >
      <span style={{ fontSize: 20 }}>{playing ? '⏸️' : '🎵'}</span>
      <span className="hidden sm:inline">{playing ? 'Pause' : 'Play Music'}</span>
    </motion.button>
  );
}
