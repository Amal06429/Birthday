import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Candle({ lit, index }) {
  return (
    <div className="flex flex-col items-center" style={{ marginInline: 6 }}>
      {/* Flame */}
      <div style={{ height: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <AnimatePresence>
          {lit ? (
            <motion.div
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Outer glow */}
              <div
                className="candle-flame relative"
                style={{
                  width: 14, height: 22,
                  borderRadius: '50% 50% 30% 30%',
                  background: 'radial-gradient(ellipse at 50% 80%, #fff7 0%, #ffe082 30%, #ff9800 70%, #e65100 100%)',
                  boxShadow: '0 0 12px 6px rgba(255,180,0,0.7), 0 0 24px 10px rgba(255,120,0,0.3)',
                  animationDelay: `${index * 0.13}s`,
                }}
              />
            </motion.div>
          ) : (
            /* Smoke */
            <motion.div
              key="smoke"
              initial={{ opacity: 0.8, y: 0 }}
              animate={{ opacity: 0, y: -30, scaleX: 3 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{
                width: 6, height: 20,
                borderRadius: '50%',
                background: 'rgba(180,180,180,0.6)',
              }}
            />
          )}
        </AnimatePresence>
      </div>
      {/* Candle stick */}
      <div style={{
        width: 10, height: 34,
        borderRadius: '3px 3px 0 0',
        background: `linear-gradient(to bottom, 
          ${['#ff80ab','#ea80fc','#82b1ff','#b9f6ca','#ffe57f'][index % 5]} 0%, 
          ${['#f48fb1','#ce93d8','#90caf9','#a5d6a7','#ffcc80'][index % 5]} 100%)`,
        boxShadow: '1px 0 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

export default function BirthdayCake({ onCandlesOut }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blownOut, setBlownOut] = useState(false);
  const CANDLES = 5;

  useEffect(() => {
    // Auto blow out after 4 seconds
    const t = setTimeout(() => {
      setCandlesLit(false);
      setBlownOut(true);
      setTimeout(() => onCandlesOut?.(), 1500);
    }, 4000);
    return () => clearTimeout(t);
  }, [onCandlesOut]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.9, type: 'spring', bounce: 0.3, delay: 0.2 }}
      className="flex flex-col items-center select-none"
    >
      {/* Candles row */}
      <div className="flex items-end mb-0" style={{ zIndex: 2 }}>
        {Array.from({ length: CANDLES }, (_, i) => (
          <Candle key={i} lit={candlesLit} index={i} />
        ))}
      </div>

      {/* Cake */}
      <div className="relative" style={{ width: 200 }}>
        {/* Top tier */}
        <div style={{
          height: 50, width: 140, margin: '0 auto',
          borderRadius: '12px 12px 0 0',
          background: 'linear-gradient(135deg, #f8bbd9 0%, #f48fb1 50%, #ec407a 100%)',
          boxShadow: '0 4px 15px rgba(236,64,122,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Frosting drips */}
          {[15, 35, 55, 75, 95, 115].map(x => (
            <div key={x} style={{
              position: 'absolute', top: 0, left: x,
              width: 12, height: 18,
              borderRadius: '0 0 8px 8px',
              background: 'rgba(255,255,255,0.85)',
            }} />
          ))}
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', whiteSpace: 'nowrap',
          }}>
            Happy Birthday 🎂
          </div>
        </div>

        {/* Middle tier */}
        <div style={{
          height: 60, width: 170, margin: '0 auto',
          background: 'linear-gradient(135deg, #ce93d8 0%, #ab47bc 50%, #8e24aa 100%)',
          boxShadow: '0 4px 15px rgba(142,36,170,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Polka dots */}
          {[20, 50, 80, 120, 150].map((x, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: x, top: i % 2 === 0 ? 15 : 30,
              width: 10, height: 10, borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
            }} />
          ))}
          {[35, 65, 95, 135].map((x, i) => (
            <div key={`b${i}`} style={{
              position: 'absolute', top: 0, left: x,
              width: 14, height: 20, borderRadius: '0 0 8px 8px',
              background: 'rgba(255,255,255,0.75)',
            }} />
          ))}
        </div>

        {/* Bottom tier */}
        <div style={{
          height: 70, width: 200,
          borderRadius: '0 0 16px 16px',
          background: 'linear-gradient(135deg, #f48fb1 0%, #e91e8c 50%, #c2185b 100%)',
          boxShadow: '0 8px 25px rgba(194,24,91,0.45)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Stripes */}
          {[20, 60, 100, 140, 180].map((x, i) => (
            <div key={i} style={{
              position: 'absolute', left: x, top: 0,
              width: 6, height: '100%',
              background: 'rgba(255,255,255,0.15)',
              transform: 'skewX(-15deg)',
            }} />
          ))}
          {[30, 70, 110, 150].map((x, i) => (
            <div key={`d${i}`} style={{
              position: 'absolute', top: 0, left: x,
              width: 16, height: 22, borderRadius: '0 0 10px 10px',
              background: 'rgba(255,255,255,0.7)',
            }} />
          ))}
          {/* Flower decorations */}
          {[45, 100, 155].map((x, i) => (
            <div key={`f${i}`} style={{
              position: 'absolute', bottom: 8, left: x,
              fontSize: 18,
            }}>🌸</div>
          ))}
        </div>

        {/* Plate */}
        <div style={{
          height: 12, width: 220, margin: '0 auto',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }} />
      </div>

      {blownOut && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-pink-500 font-semibold text-sm"
        >
          🌬️ Make a wish, Ann Mariya! ✨
        </motion.p>
      )}
    </motion.div>
  );
}
