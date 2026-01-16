import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, Calendar, User, MessageCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Section } from '../types';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const iconMap: Record<Section, React.ElementType> = {
  [Section.HOME]: Home,
  [Section.SERVICES]: Sparkles,
  [Section.AGENDA]: Calendar,
  [Section.ABOUT]: User,
  [Section.CONTACT]: MessageCircle,
};

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8 items-end">
      {NAV_ITEMS.map((item) => {
        const isActive = currentSection === item.id;
        const Icon = iconMap[item.id as Section];

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group flex items-center gap-4 outline-none relative"
          >
            {/* Label Container */}
            <div className="overflow-hidden">
              <span 
                className={`
                  block text-xs uppercase tracking-widest font-sans font-bold transition-all duration-500
                  ${isActive 
                    ? 'text-lux-darkBrown translate-x-0 opacity-100' 
                    : 'text-lux-brown translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }
                `}
              >
                {item.label}
              </span>
            </div>

            {/* Icon Container */}
            <div className="relative flex items-center justify-center w-10 h-10">
              <motion.div
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${isActive ? 'bg-lux-gold/20' : 'bg-transparent group-hover:bg-lux-beige'}`}
                layoutId={isActive ? "active-nav-bg" : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              <Icon 
                size={20} 
                strokeWidth={1.5}
                className={`relative z-10 transition-all duration-300 ${
                  isActive 
                    ? 'text-lux-darkBrown scale-110' 
                    : 'text-lux-brown/70 group-hover:text-lux-darkBrown group-hover:scale-110'
                }`} 
              />

              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-lux-darkBrown rounded-full"
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;