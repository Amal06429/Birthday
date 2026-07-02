import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ onOpen }) {
  const [lidOpen, setLidOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (lidOpen) return;
    setLidOpen(true);
    setTimeout(() => setLetterVisible(true), 900);
    setTimeout(() => {
      setDone(true);
      onOpen();
    }, 2800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold shimmer-text mb-3">
          A Special Birthday Surprise ❤️
        </h1>
        <p className="text-pink-200 text-lg md:text-xl opacity-80">
          Something magical is waiting for you…
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, type: 'spring', bounce: 0.4 }}
        className="relative flex items-center justify-center"
        style={{ width: 320, height: 230 }}
      >
        {/* Letter rising from envelope */}
        <AnimatePresence>
          {letterVisible && !done && (
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: -90, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute z-20 glass rounded-2xl px-8 py-6 text-center shadow-2xl"
              style={{ width: 260, background: 'rgba(255,240,248,0.95)' }}
            >
              <div className="text-4xl mb-2">💌</div>
              <p className="text-pink-600 font-semibold text-lg">For Ann Mariya</p>
              <p className="text-pink-400 text-sm mt-1">My Ponna ❤️</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope body */}
        <div className="relative" style={{ width: 320, height: 220 }}>
          {/* Body */}
          <div
            className="absolute inset-0 rounded-b-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fce4f0 0%, #f9d0e8 50%, #f0b8da 100%)',
              boxShadow: '0 20px 60px rgba(255,105,180,0.4)',
              borderRadius: '12px',
            }}
          >
            {/* Inner fold lines */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%),
                linear-gradient(225deg, rgba(255,255,255,0.3) 0%, transparent 50%)
              `,
            }} />
            {/* Bottom triangle */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: 110, overflow: 'hidden' }}>
              <div style={{
                width: 0, height: 0,
                borderLeft: '160px solid transparent',
                borderRight: '160px solid transparent',
                borderBottom: '110px solid rgba(240,160,200,0.6)',
                position: 'absolute', bottom: 0,
              }} />
            </div>
            {/* Left bottom triangle */}
            <div style={{
              position:'absolute', bottom:0, left:0,
              width:0, height:0,
              borderBottom: '110px solid rgba(230,140,190,0.5)',
              borderRight: '160px solid transparent',
            }} />
            {/* Right bottom triangle */}
            <div style={{
              position:'absolute', bottom:0, right:0,
              width:0, height:0,
              borderBottom: '110px solid rgba(225,130,185,0.5)',
              borderLeft: '160px solid transparent',
            }} />
          </div>

          {/* Envelope lid (flap) */}
          <div
            className="absolute top-0 left-0 right-0 envelope-wrap"
            style={{ height: 120, zIndex: 10 }}
          >
            <div
              className={`envelope-lid${lidOpen ? ' open' : ''}`}
              style={{
                width: '100%',
                height: 120,
                position: 'relative',
              }}
            >
              {/* Front of lid */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderLeft: '160px solid transparent',
                  borderRight: '160px solid transparent',
                  borderTop: '120px solid rgba(245,175,215,0.95)',
                  filter: 'drop-shadow(0 4px 8px rgba(255,105,180,0.3))',
                }} />
              </div>
              {/* Back of lid (inside) */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderLeft: '160px solid transparent',
                  borderRight: '160px solid transparent',
                  borderTop: '120px solid rgba(255,220,240,0.95)',
                }} />
              </div>
            </div>
          </div>

          {/* Wax seal */}
          {!lidOpen && (
            <div
              className="absolute z-20 heartbeat flex items-center justify-center rounded-full shadow-lg cursor-pointer"
              style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 4px 15px rgba(233,30,99,0.5)',
              }}
            >
              <span style={{ fontSize: 20 }}>❤️</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Button */}
      {!lidOpen && (
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="mt-12 px-10 py-4 rounded-full font-semibold text-white text-lg cursor-pointer pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #e91e8c 0%, #9c27b0 100%)',
            border: 'none',
            letterSpacing: '0.05em',
          }}
        >
          💌 Open Your Letter
        </motion.button>
      )}
    </div>
  );
}
