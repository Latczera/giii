import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle } from 'lucide-react';
import { ADDRESS, EMAIL, WHATSAPP_NUMBER } from '../constants';
import { createWhatsAppLink } from '../utils';

const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const contactMethods = [
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      value: '+55 43 9904-2279', 
      action: () => window.open(createWhatsAppLink("Olá!"), '_blank') 
    },
    { 
      icon: Mail, 
      label: 'Email', 
      value: EMAIL, 
      action: () => window.location.href = `mailto:${EMAIL}` 
    },
    { 
      icon: MapPin, 
      label: 'Studio', 
      value: ADDRESS, 
      action: () => window.open(`https://maps.google.com/?q=${ADDRESS}`, '_blank') 
    }
  ];

  return (
    <section className="h-full w-full flex flex-col justify-center items-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-left md:text-right space-y-4">
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-lux-darkBrown">
            Vamos <br/> Conversar?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lux-brown font-light">
            Estamos prontos para realçar sua beleza natural.
          </motion.p>
        </div>

        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={method.action}
              className="group flex items-center gap-6 p-6 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl cursor-pointer hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-lux-beige flex items-center justify-center text-lux-darkBrown group-hover:bg-lux-gold group-hover:text-white transition-colors duration-300">
                <method.icon size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-lux-brown font-bold mb-1">{method.label}</p>
                <p className="text-lg md:text-xl font-serif text-lux-darkBrown">{method.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-center w-full"
      >
        <p className="text-lux-brown/40 text-[10px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Giovana Taynara Studio. All rights reserved.
        </p>
      </motion.footer>
    </section>
  );
};

export default Contact;