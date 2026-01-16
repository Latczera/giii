import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants';
import { formatCurrency } from '../utils';
import { ServicesProps } from '../types';

const Services: React.FC<ServicesProps> = ({ selectedServices, toggleService, onNavigateToAgenda }) => {
  
  return (
    <section className="h-full w-full relative">
      {/* 
        Mobile: Single scrollable column 
        Desktop: Fixed 2-column layout 
      */}
      <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-start md:justify-center overflow-y-auto md:overflow-hidden">
        
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 px-6 md:px-12 pt-4 pb-40 md:py-0 md:h-[80vh]">
          
          {/* Header Column */}
          <div className="flex-none md:flex-1 flex flex-col justify-center items-start z-10 mt-4 md:mt-0">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lux-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-2 md:mb-4"
            >
              Menu de Serviços
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-serif text-lux-darkBrown mb-4 md:mb-8"
            >
              Exclusividade <br/> & Cuidado
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lux-brown max-w-md font-sans font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base"
            >
              Selecione os procedimentos desejados abaixo.
            </motion.p>
          </div>

          {/* Services List Column */}
          <div className="flex-1 md:flex-[1.5] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {SERVICES_DATA.map((service, index) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => toggleService(service.id)}
                    className={`
                      relative p-5 md:p-6 rounded-xl cursor-pointer transition-all duration-300 border group w-full
                      ${isSelected 
                        ? 'bg-lux-darkBrown text-lux-beige border-lux-darkBrown shadow-xl transform scale-[1.01] z-10' 
                        : 'bg-white/40 backdrop-blur-sm active:bg-white/60 md:hover:bg-white/70 border-white/50 text-lux-darkBrown shadow-sm'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-serif text-lg md:text-xl transition-colors ${isSelected ? 'text-white' : 'text-lux-darkBrown'}`}>
                        {service.name}
                      </h3>
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ml-2
                        ${isSelected ? 'bg-lux-gold border-lux-gold rotate-0' : 'border-lux-brown/30 rotate-90 group-hover:border-lux-brown'}
                      `}>
                        {isSelected ? <Check size={14} className="text-white" /> : <Plus size={14} className="text-lux-brown" />}
                      </div>
                    </div>
                    <p className={`font-sans font-light text-base md:text-lg transition-colors ${isSelected ? 'text-lux-nude' : 'text-lux-brown'}`}>
                      {formatCurrency(service.price)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar - Fixed to bottom of viewport */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 flex justify-center px-4"
          >
            <div className="bg-white/80 backdrop-blur-xl p-2 pr-2 md:pr-3 rounded-full shadow-2xl shadow-lux-darkBrown/20 border border-white/50 flex items-center gap-2 md:gap-4 max-w-full">
              <div className="bg-lux-beige px-3 py-2 md:px-4 rounded-full flex-shrink-0">
                <span className="text-lux-darkBrown font-serif italic text-xs md:text-base whitespace-nowrap">
                  {selectedServices.length} {selectedServices.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <button
                onClick={onNavigateToAgenda}
                className="bg-lux-darkBrown text-white pl-4 pr-4 py-3 md:pl-6 md:pr-5 rounded-full font-sans uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-lux-gold transition-colors flex items-center gap-2 group whitespace-nowrap"
              >
                Agendar
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;