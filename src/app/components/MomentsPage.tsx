import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Edit2 } from 'lucide-react';

export interface Moment {
  id: number;
  image: string;
  caption: string;
  layout: 'left' | 'right' | 'center';
}

interface MomentsPageProps {
  moments: Moment[];
  onEdit: (momentId: number) => void;
}

function MomentCard({ moment, index, onEdit }: { moment: Moment; index: number; onEdit: (id: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);

  const layoutClass = {
    left: 'md:flex-row',
    right: 'md:flex-row-reverse',
    center: 'flex-col items-center'
  }[moment.layout];

  return (
    <motion.div
      ref={ref}
      className={`flex ${layoutClass} gap-8 md:gap-16 items-center mb-32 relative group`}
      style={{ opacity, scale, y }}
    >
      {/* Edit button */}
      <motion.button
        onClick={() => onEdit(moment.id)}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Edit2 className="w-4 h-4 text-pink-600" />
      </motion.button>

      {/* Image */}
      <motion.div
        className={`relative mt-6${moment.layout === 'center' ? 'w-full max-w-2xl' : 'w-full md:w-1/2'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glow background */}
        <div className="absolute -inset-4 bg-gradient-to-br from-pink-300/40 via-rose-300/40 to-pink-400/40 rounded-3xl blur-2xl" />
        
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
          <img
            src={moment.image}
            alt={moment.caption}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>

      {/* Caption */}
      <motion.div
        className={`${moment.layout === 'center' ? 'w-full text-center max-w-2xl' : 'w-full md:w-1/2'}`}
        initial={{ opacity: 0, x: moment.layout === 'left' ? 50 : moment.layout === 'right' ? -50 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-2xl blur-lg" />
          <p className="relative text-2xl md:text-3xl font-serif text-pink-900 leading-relaxed italic px-6 py-4">
            "{moment.caption}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MomentsPage({ moments, onEdit }: MomentsPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 pt-32 pb-20 px-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Our Moments
          </h1>
          <p className="text-xl text-pink-900/60">Every moment with you is a treasure</p>
        </motion.div>

        {moments.map((moment, index) => (
          <MomentCard key={moment.id} moment={moment} index={index} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
