import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface LandingPageProps {
  content: {
    subtitle: string;
    passage: string;
  };
}

export function LandingPage({ content }: LandingPageProps) {
  const loveTexts = [
    { text: 'I love you', lang: 'English', size: 180, x: 10, y: 15, opacity: 0.03 },
    { text: 'Je t\'aime', lang: 'French', size: 150, x: 60, y: 25, opacity: 0.04 },
    { text: 'Te amo', lang: 'Spanish', size: 200, x: 20, y: 50, opacity: 0.03 },
    { text: 'Ti amo', lang: 'Italian', size: 140, x: 70, y: 60, opacity: 0.04 },
    { text: '愛してる', lang: 'Japanese', size: 160, x: 15, y: 80, opacity: 0.03 },
    { text: '사랑해', lang: 'Korean', size: 170, x: 65, y: 10, opacity: 0.04 },
    { text: 'मैं तुमसे प्यार करता हूँ', lang: 'Hindi', size: 120, x: 40, y: 70, opacity: 0.03 },
    { text: 'أحبك', lang: 'Arabic', size: 190, x: 50, y: 40, opacity: 0.04 },
    { text: 'Ich liebe dich', lang: 'German', size: 155, x: 30, y: 30, opacity: 0.03 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Multilingual background */}
      <div className="absolute inset-0 overflow-hidden">
        {loveTexts.map((item, index) => (
          <motion.div
            key={index}
            className="absolute font-bold text-pink-400 select-none hidden md:block"
            style={{
              fontSize: `${item.size}px`,
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: item.opacity,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100/80" />

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent leading-tight"
            animate={{
              textShadow: [
                '0 0 20px rgba(236, 72, 153, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.5)',
                '0 0 20px rgba(236, 72, 153, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Happy Valentine's Day ❤️
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-pink-900/70 mb-10 md:mb-12 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {content.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="relative px-10 md:px-12 py-3 md:py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-base md:text-lg font-semibold overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Begin Our Story</span>
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-pink-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Love passage section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-pink-400/20 rounded-3xl blur-2xl" />
            
            {/* Glass card */}
            <div className="relative backdrop-blur-md bg-white/40 rounded-3xl p-8 md:p-12 border border-pink-200/50 shadow-2xl">
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl md:text-6xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💕
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-serif">
                A Love Letter to Time
              </h2>
              
              <p className="text-base md:text-lg leading-relaxed text-pink-900/80 text-center whitespace-pre-line font-serif-alt">
                {content.passage}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}