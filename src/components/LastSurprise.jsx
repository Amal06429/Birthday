import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FloatingHeartOverlay() {
  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 30 + 18}px`,
    duration: `${Math.random() * 5 + 4}s`,
    delay: `${Math.random() * 4}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute bottom-0 floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
          }}
        >❤️</div>
      ))}
    </div>
  );
}

export default function LastSurprise() {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center py-12 px-4"
    >
      {!revealed ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRevealed(true)}
          className="px-10 py-5 rounded-full text-white text-xl font-bold cursor-pointer pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #e91e8c 0%, #9c27b0 50%, #3f51b5 100%)',
            border: 'none',
            letterSpacing: '0.04em',
            boxShadow: '0 8px 30px rgba(233,30,99,0.5)',
          }}
        >
          🎁 One Last Surprise ❤️
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative glass-strong rounded-3xl px-8 py-12 text-center overflow-hidden"
            style={{
              maxWidth: 500,
              boxShadow: '0 20px 80px rgba(233,30,99,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <FloatingHeartOverlay />

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              ❤️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold shimmer-text mb-4"
              style={{ lineHeight: 1.3 }}
            >
              I Love You ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl font-semibold mb-2"
              style={{ color: '#9c27b0' }}
            >
              Happy Birthday Beautiful
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg mt-4"
              style={{ color: '#e91e8c' }}
            >
              Ann Mariya, my ponna 🌸
            </motion.p>

            {/* Sparkles */}
            {['✨','💖','🌟','💕','⭐','💗'].map((s, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl sparkle-star"
                style={{
                  top: `${15 + (i * 13) % 70}%`,
                  left: `${5 + (i * 17) % 90}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >{s}</motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
