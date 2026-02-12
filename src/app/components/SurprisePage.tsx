import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

interface SurprisePageProps {
  photos: string[];
  onEdit: () => void;
}

export function SurprisePage({ photos, onEdit }: SurprisePageProps) {
  const [boxState, setBoxState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(false);

  const handleBoxClick = () => {
    if (boxState === 'closed') {
      setBoxState('opening');
      setTimeout(() => {
        setBoxState('open');
        setAutoSlide(true);
      }, 1000);
    }
  };

  const nextPhoto = () => {
    setAutoSlide(false);
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setAutoSlide(false);
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Auto slide effect
  useState(() => {
    if (autoSlide && boxState === 'open') {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
      {/* Floating hearts when open */}
      <AnimatePresence>
        {boxState === 'open' && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-3xl pointer-events-none"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0.5],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              >
                {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            A Special Surprise
          </h1>
          <p className="text-base md:text-lg text-pink-900/60">
            {boxState === 'closed' ? 'Click the gift to reveal' : 'Our beautiful memories together'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {boxState !== 'open' ? (
            /* Gift Box */
            <motion.div
              key="gift-box"
              className="relative w-64 h-64 md:w-80 md:h-80 mx-auto cursor-pointer"
              onClick={handleBoxClick}
              whileHover={boxState === 'closed' ? { scale: 1.05 } : {}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/40 via-rose-400/40 to-pink-400/40 rounded-3xl blur-2xl" />

              {/* Box base */}
              <motion.div
                className="absolute inset-x-8 bottom-8 top-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-2xl"
                animate={boxState === 'closed' ? {
                  boxShadow: [
                    '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
                    '0 25px 50px -12px rgba(236, 72, 153, 0.5)',
                    '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Ribbon vertical */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-12 bg-gradient-to-b from-yellow-400 to-amber-500" />
              </motion.div>

              {/* Box lid */}
              <motion.div
                className="absolute inset-x-4 top-24 h-16 md:h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-t-2xl shadow-xl origin-bottom z-10"
                animate={{
                  rotateX: boxState === 'opening' ? -90 : 0,
                  y: boxState === 'opening' ? -100 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Ribbon horizontal on lid */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-8 md:h-12 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400" />
                
                {/* Bow */}
                <motion.div
                  className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-4xl md:text-6xl"
                  animate={boxState === 'closed' ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </motion.div>

              {/* Light glow from inside when opening */}
              {boxState === 'opening' && (
                <motion.div
                  className="absolute inset-x-8 top-32 bottom-8 bg-gradient-to-t from-pink-300 via-rose-200 to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              )}
            </motion.div>
          ) : (
            /* Photo Carousel */
            <motion.div
              key="carousel"
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Edit button */}
              <motion.button
                onClick={onEdit}
                className="absolute -top-4 right-4 md:top-4 md:right-4 z-30 p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
              </motion.button>

              <div className="relative flex items-center justify-center gap-2 md:gap-4">
                {/* Previous button */}
                <motion.button
                  onClick={prevPhoto}
                  className="z-20 p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                </motion.button>

                {/* Photos */}
                <div className="relative w-full max-w-2xl h-64 md:h-96 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhotoIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 100, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -100, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/30 via-rose-400/30 to-pink-400/30 rounded-3xl blur-2xl" />
                      
                      <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/50">
                        <img
                          src={photos[currentPhotoIndex]}
                          alt={`Memory ${currentPhotoIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next button */}
                <motion.button
                  onClick={nextPhoto}
                  className="z-20 p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                </motion.button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-6 md:mt-8 flex-wrap px-4">
                {photos.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setAutoSlide(false);
                      setCurrentPhotoIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPhotoIndex
                        ? 'w-8 bg-gradient-to-r from-pink-500 to-rose-500'
                        : 'w-2 bg-pink-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}