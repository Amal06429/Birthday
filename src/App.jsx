import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import GlowingParticles from './components/GlowingParticles';
import Envelope from './components/Envelope';
import BirthdayCard from './components/BirthdayCard';
import MusicButton from './components/MusicButton';

export default function App() {
  const [stage, setStage] = useState('landing'); // 'landing' | 'opening' | 'card'

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 25%, #1e0a3c 50%, #3d0a3d 75%, #1a0a2e 100%)',
      }}
    >
      {/* Always-on background effects */}
      <FloatingHearts count={24} />
      <GlowingParticles count={35} />

      {/* Music button */}
      <MusicButton />

      {/* Scene transitions */}
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Envelope onOpen={() => setStage('card')} />
          </motion.div>
        )}

        {stage === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 min-h-screen overflow-y-auto py-6 flex flex-col items-center"
          >
            <BirthdayCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
