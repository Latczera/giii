import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
         <h1 className="text-[20vw] font-serif text-lux-darkBrown leading-none">STUDIO</h1>
      </div>

      <div className="max-w-3xl text-center z-10">
        <motion.div
           initial={{ height: 0 }}
           animate={{ height: 80 }}
           transition={{ duration: 1, ease: "easeInOut" }}
           className="w-[1px] bg-lux-gold mx-auto mb-8"
        />
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-lux-darkBrown mb-12"
        >
          Essência & <span className="italic text-lux-gold">Elegância</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xl md:text-2xl font-light text-lux-brown leading-relaxed font-sans"
        >
          "Criado para mulheres que valorizam beleza com elegância, o Giovana Taynara Studio oferece uma experiência exclusiva, unindo técnica, cuidado e sofisticação em cada atendimento."
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-24 h-1 bg-lux-gold/30 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;