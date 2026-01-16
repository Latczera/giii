import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../utils';

const FloatingContact: React.FC = () => {
  return (
    <motion.a
      href={createWhatsAppLink("Olá! Vim pelo site.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="bg-white/80 backdrop-blur text-lux-darkBrown text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
        Agende agora
      </span>
      <div className="w-14 h-14 bg-lux-darkBrown text-lux-beige rounded-full flex items-center justify-center shadow-2xl shadow-lux-brown/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-lux-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageCircle className="w-6 h-6 z-10" />
      </div>
    </motion.a>
  );
};

export default FloatingContact;