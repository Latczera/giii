import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-lux-beige">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-grain" />

      {/* Organic Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-lux-nude/40 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 -right-1/4 w-[60vw] h-[60vw] bg-lux-gold/10 rounded-full blur-[120px]"
      />

       <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-0 left-1/3 w-[50vw] h-[50vw] bg-lux-brown/5 rounded-full blur-[90px]"
      />
    </div>
  );
};

export default Background;