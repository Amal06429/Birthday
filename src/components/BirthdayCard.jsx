import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import BirthdayCake from './BirthdayCake';
import Confetti from './Confetti';
import Fireworks from './Fireworks';
import Balloons from './Balloons';
import PhotoSection from './PhotoSection';
import LastSurprise from './LastSurprise';

export default function BirthdayCard() {
  const [typingDone, setTypingDone] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const handleTypingDone = useCallback(() => {
    setTypingDone(true);
    setTimeout(() => setShowCake(true), 600);
  }, []);

  const handleCandlesOut = useCallback(() => {
    setCelebrate(true);
  }, []);

  return (
    <>
      {/* Celebration effects */}
      <Confetti active={celebrate} />
      <Fireworks active={celebrate} />
      <Balloons active={celebrate} count={12} />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.25 }}
        className="w-full max-w-2xl mx-auto px-4 py-8"
      >
        <div
          className="glass-strong rounded-3xl px-6 md:px-10 py-10 relative overflow-hidden"
          style={{
            boxShadow: '0 20px 80px rgba(233,30,99,0.25), 0 0 0 1px rgba(255,255,255,0.3)',
          }}
        >
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: 'linear-gradient(90deg, #e91e8c, #9c27b0, #3f51b5, #e91e8c)', backgroundSize: '200%', animation: 'shimmer 3s linear infinite' }} />

          {/* Sparkle corners */}
          <div className="absolute top-4 left-4 text-2xl sparkle-star" style={{ animationDelay: '0s' }}>✨</div>
          <div className="absolute top-4 right-4 text-2xl sparkle-star" style={{ animationDelay: '0.5s' }}>✨</div>

          {/* Card title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold shimmer-text leading-tight">
              🎂 Happy Birthday, My Love ❤️
            </h1>
            <p className="text-pink-300 text-lg mt-2 font-medium">Ann Mariya, my ponna 🌸</p>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(233,30,99,0.4), transparent)' }} />
            <span className="text-2xl heartbeat">💕</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(233,30,99,0.4), transparent)' }} />
          </div>

          {/* Typewriter message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <TypewriterText onDone={handleTypingDone} />
          </motion.div>

          {/* Cake section */}
          {showCake && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center my-8 py-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <BirthdayCake onCandlesOut={handleCandlesOut} />
            </motion.div>
          )}

          {/* Celebration banner */}
          {celebrate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center my-6"
            >
              <p className="text-2xl font-bold shimmer-text">🎉 Hip Hip Hooray! 🎉</p>
              <p className="text-pink-400 mt-1">Today is all about YOU, my love!</p>
            </motion.div>
          )}
        </div>

        {/* Photo section */}
        <PhotoSection />

        {/* Last surprise */}
        <LastSurprise />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8"
        >
          <p className="text-pink-300 opacity-70 text-sm">
            Made with ❤️ especially for you, Ann Mariya 🌸
          </p>
          <p className="text-pink-200 opacity-50 text-xs mt-1">
            Forever yours 💕
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
}
