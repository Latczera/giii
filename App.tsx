import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './types';
import Background from './components/Background';
import Navigation from './components/Navigation';
import FloatingContact from './components/FloatingContact';
import Home from './sections/Home';
import Services from './sections/Services';
import Agenda from './sections/Agenda';
import About from './sections/About';
import Contact from './sections/Contact';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from './constants';
import { createWhatsAppLink } from './utils';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleNavigateToAgenda = () => {
    setCurrentSection(Section.AGENDA);
  };

  const handleNavigateToServices = () => {
    setCurrentSection(Section.SERVICES);
  };

  // Transition variants for content
  const variants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5, ease: 'easeIn' } }
  };

  // Menu Animation Variants - Circular Reveal
  const menuVariants = {
    closed: { 
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    open: { 
      opacity: 1, 
      clipPath: "circle(150% at 100% 0%)",
      transition: { 
        duration: 0.7, 
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const renderSection = () => {
    switch (currentSection) {
      case Section.HOME:
        return <Home onNavigateToServices={handleNavigateToServices} />;
      case Section.SERVICES:
        return (
          <Services 
            selectedServices={selectedServices} 
            toggleService={toggleService}
            onNavigateToAgenda={handleNavigateToAgenda}
          />
        );
      case Section.AGENDA:
        return <Agenda selectedServices={selectedServices} />;
      case Section.ABOUT:
        return <About />;
      case Section.CONTACT:
        return <Contact />;
      default:
        return <Home onNavigateToServices={handleNavigateToServices} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-lux-darkBrown selection:bg-lux-gold/30 selection:text-lux-darkBrown">
      <Background />
      
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center md:hidden pointer-events-none">
        <div className={`pointer-events-auto transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
           <span className="text-xs font-serif font-bold tracking-[0.2em] text-lux-darkBrown uppercase">
              Giovana Taynara
           </span>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            relative w-12 h-12 rounded-full pointer-events-auto flex items-center justify-center transition-all duration-300
            ${isMobileMenuOpen 
                ? 'bg-transparent text-lux-beige rotate-90 scale-110' 
                : 'bg-white/40 backdrop-blur-md text-lux-darkBrown shadow-lg shadow-lux-brown/10 border border-white/50 hover:bg-white/60'
            }
          `}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-lux-darkBrown flex flex-col items-center justify-center md:hidden overflow-hidden"
          >
            {/* Decorative BG Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lux-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-lux-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col gap-6 items-center z-10 w-full px-8">
                <motion.div variants={menuItemVariants} className="mb-4">
                  <span className="text-lux-gold text-[10px] tracking-[0.4em] uppercase font-bold">Menu Principal</span>
                </motion.div>

                {NAV_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={menuItemVariants}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      text-4xl font-serif transition-all duration-300 relative group
                      ${currentSection === item.id ? 'text-lux-gold italic' : 'text-lux-beige/90'}
                    `}
                  >
                    {item.label}
                    {currentSection === item.id && (
                       <motion.div layoutId="menuLine" className="absolute -bottom-2 left-0 right-0 h-[1px] bg-lux-gold" />
                    )}
                  </motion.button>
                ))}

                <motion.div variants={menuItemVariants} className="w-8 h-[1px] bg-white/20 my-6" />

                <motion.button 
                   variants={menuItemVariants}
                   onClick={() => {
                      setCurrentSection(Section.SERVICES);
                      setIsMobileMenuOpen(false);
                   }}
                   className="px-8 py-3 rounded-full border border-lux-gold/40 text-lux-gold text-xs uppercase tracking-widest hover:bg-lux-gold hover:text-lux-darkBrown transition-all duration-300"
                >
                   Agendar Agora
                </motion.button>
            </div>
            
             <motion.div variants={menuItemVariants} className="absolute bottom-10 text-lux-beige/30 text-[10px] uppercase tracking-[0.3em]">
                  Giovana Taynara Studio
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="relative w-full h-full flex flex-col z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full absolute inset-0 pt-20 md:pt-0" // Increased padding top for mobile header
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingContact />
    </div>
  );
};

export default App;