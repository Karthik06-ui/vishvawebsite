import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoaded: () => void;
}

export function LoadingScreen({ isLoading, onLoaded }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-20 h-20 text-pink-500 fill-pink-500 mx-auto" />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Creating Magic...
        </motion.h2>

        <motion.p
          className="text-pink-900/60 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Preparing your love story
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-pink-500 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}