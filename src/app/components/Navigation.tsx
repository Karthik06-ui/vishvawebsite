import { motion } from 'motion/react';
import { Heart, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSettings: () => void;
}

export function Navigation({ currentPage, onNavigate, onSettings }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'moments', label: 'Moments' },
    { id: 'envelope', label: 'Envelope' },
    { id: 'surprise', label: 'Surprise' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/30 rounded-full px-6 py-3 shadow-lg border border-pink-200/30">
        <motion.div 
          className="flex items-center gap-2 text-pink-600"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 fill-pink-500" />
          <span className="font-semibold text-base md:text-lg">Forever</span>
        </motion.div>

        <div className="flex items-center gap-4 md:gap-8">
          <ul className="flex gap-3 md:gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  onClick={() => onNavigate(item.id)}
                  className="relative text-sm md:text-base text-pink-900/80 hover:text-pink-600 transition-colors duration-300 pb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-500"
                      layoutId="nav-underline"
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={onSettings}
            className="p-2 rounded-full bg-pink-100/50 hover:bg-pink-200/50 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}