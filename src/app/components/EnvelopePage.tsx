import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface EnvelopePageProps {
  letter: string;
  onEdit: () => void;
}

export function EnvelopePage({ letter, onEdit }: EnvelopePageProps) {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'open'>('closed');

  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('opening');
      setTimeout(() => setEnvelopeState('open'), 800);
    }
  };

  const handleClose = () => {
    setEnvelopeState('closed');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
      {/* Ambient particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pink-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Background darkening when open */}
      <AnimatePresence>
        {envelopeState === 'open' && (
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            A Letter for You
          </h1>
          <p className="text-base md:text-lg text-pink-900/60">
            {envelopeState === 'closed' ? 'Click to open the envelope' : 'Read with your heart'}
          </p>
        </motion.div>

        {/* Envelope container */}
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Envelope */}
          <motion.div
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            whileHover={envelopeState === 'closed' ? { scale: 1.02 } : {}}
          >
            {/* Envelope body */}
            <div className="relative bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg shadow-2xl border-2 border-pink-200/50 overflow-hidden"
                 style={{ aspectRatio: '16/10' }}>
              
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.4),transparent_50%)]" />
              </div>

              {/* Heart seal */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl z-10"
                animate={envelopeState === 'closed' ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌
              </motion.div>

              {/* Envelope flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-rose-200 to-pink-200 origin-top border-b-2 border-pink-300/50"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                animate={{
                  rotateX: envelopeState === 'closed' ? 0 : envelopeState === 'opening' ? -120 : -180,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Shadow under flap */}
              {envelopeState !== 'closed' && (
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 bg-black/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-300/30 via-rose-300/30 to-pink-300/30 rounded-lg blur-xl -z-10" />
          </motion.div>

          {/* Letter */}
          <AnimatePresence>
            {envelopeState === 'open' && (
              <motion.div
                className="absolute inset-x-0 top-0 z-30"
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{ y: -100, scale: 1, opacity: 1, rotate: -2 }}
                exit={{ y: 0, scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl border-2 border-amber-200/50 p-6 md:p-12 mx-4 md:mx-0 max-h-[70vh] overflow-y-auto">
                  {/* Edit button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className="w-4 h-4 text-pink-600" />
                  </motion.button>

                  {/* Paper texture */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIgLz48L3N2Zz4=')] opacity-30 rounded-lg" />

                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-serif text-rose-800 mb-2">My Dearest Love,</h2>
                      </div>
                      
                      <p className="text-base md:text-lg font-serif leading-relaxed text-gray-800 whitespace-pre-line">
                        {letter}
                      </p>

                      <div className="mt-6 md:mt-8 text-right">
                        <p className="text-lg md:text-xl font-serif text-rose-700">Forever yours,</p>
                        <p className="text-xl md:text-2xl font-serif text-rose-800 mt-2">❤️</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Glow behind letter */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-pink-400/20 rounded-lg blur-2xl -z-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}