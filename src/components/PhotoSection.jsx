import { useState } from 'react';
import { motion } from 'framer-motion';

// Import all photos
import photo1 from '../assets/WhatsApp Image 2026-07-02 at 2.01.28 PM.jpeg';
import photo2 from '../assets/WhatsApp Image 2026-07-02 at 2.01.29 PM (1).jpeg';
import photo3 from '../assets/WhatsApp Image 2026-07-02 at 2.01.29 PM.jpeg';
import photo4 from '../assets/WhatsApp Image 2026-07-02 at 2.01.30 PM (1).jpeg';
import photo5 from '../assets/WhatsApp Image 2026-07-02 at 2.01.30 PM.jpeg';

const PHOTOS = [photo1, photo2, photo3, photo4, photo5];
const CAPTIONS = [
  'My favorite smile 🌸',
  'Pure sunshine ✨',
  'Forever in my heart ❤️',
  'My world 💕',
  'The most beautiful soul 💖',
];

export default function PhotoSection() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <h2 className="text-center text-2xl md:text-3xl font-bold shimmer-text mb-8">
        Our Favorite Memories ❤️
      </h2>

      {/* Main photo */}
      <div className="relative mx-auto mb-6" style={{ maxWidth: 380 }}>
        <div
          className="glass-strong rounded-3xl overflow-hidden"
          style={{
            padding: '12px',
            boxShadow: '0 20px 60px rgba(233,30,99,0.3), 0 0 0 1px rgba(255,255,255,0.3)',
          }}
        >
          {/* Frame corners */}
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <motion.img
              key={active}
              src={PHOTOS[active]}
              alt={`Ann Mariya - ${CAPTIONS[active]}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(233,30,99,0.3) 0%, transparent 50%)',
            }} />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold text-lg"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {CAPTIONS[active]}
            </div>
          </div>
        </div>

        {/* Sparkle corners */}
        {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-yellow-300 sparkle-star`}
            style={{ animationDelay: `${i * 0.4}s`, fontSize: 18 }}>✨</div>
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 justify-center flex-wrap">
        {PHOTOS.map((p, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(i)}
            className="rounded-xl overflow-hidden cursor-pointer"
            style={{
              width: 60, height: 60,
              border: i === active
                ? '3px solid #e91e8c'
                : '2px solid rgba(255,255,255,0.3)',
              boxShadow: i === active ? '0 0 12px rgba(233,30,99,0.6)' : 'none',
              padding: 0,
              background: 'none',
            }}
          >
            <img src={p} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      <p className="text-center text-pink-300 text-sm mt-4 opacity-70">
        Ann Mariya, my ponna ❤️
      </p>
    </motion.div>
  );
}
