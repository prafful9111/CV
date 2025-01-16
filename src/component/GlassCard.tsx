import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`
        items-start
        bg-gradient-to-t 
        from-white/0 
        via-white/20 
        to-white/30 
        backdrop-blur-sm
        rounded-xl 
        p-6 
        shadow-lg 
        w-[235%]
        h-[1050px]
        mx-auto 
        text-center
        ${className ? className : ""}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
