import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HomeProps } from '../types';

const Home: React.FC<HomeProps> = ({ onNavigateToServices }) => {
  const letterAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const title = "GIOVANA TAYNARA".split("");

  return (
    <section className="h-full w-full flex flex-col justify-center items-center relative px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-[1px] border-lux-gold/20 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[480px] md:h-[480px] border-[1px] border-lux-gold/20 rounded-full rotate-45"
      />

      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lux-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-8 font-sans font-bold"
      >
        Luxury Beauty Studio
      </motion.span>

      <div className="flex flex-wrap justify-center overflow-hidden mb-2">
        {title.map((char, index) => (
          <motion.h1
            key={index}
            custom={index}
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-7xl lg:text-8xl font-serif text-lux-darkBrown"
          >
            {char === " " ? "\u00A0" : char}
          </motion.h1>
        ))}
      </div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-2xl md:text-5xl lg:text-6xl font-serif text-lux-brown/80 mb-6"
      >
        Studio
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-lux-brown text-lg font-light italic mb-12 tracking-wide font-serif"
      >
        Beleza elevada ao detalhe.
      </motion.p>

      <motion.button
        onClick={onNavigateToServices}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(93, 64, 55, 1)" }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden bg-lux-darkBrown text-lux-beige px-8 py-4 rounded-full flex items-center gap-4 transition-all duration-500 shadow-xl shadow-lux-brown/20 cursor-pointer"
      >
        <span className="font-sans uppercase tracking-widest text-xs font-bold z-10">Agendar Atendimento</span>
        <ArrowRight className="w-4 h-4 z-10 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-lux-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </motion.button>
    </section>
  );
};

export default Home;