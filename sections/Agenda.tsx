import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Sparkles, Check, Calendar as CalendarIcon } from 'lucide-react';
import { createWhatsAppLink } from '../utils';
import { SERVICES_DATA } from '../constants';
import { AgendaProps, CalendarDay } from '../types';

const DAYS_HEADER = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const START_HOUR = 9;
const END_HOUR = 18;

const Agenda: React.FC<AgendaProps> = ({ selectedServices }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarGrid, setCalendarGrid] = useState<CalendarDay[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  
  // Ref for auto-scrolling on mobile
  const timeSectionRef = useRef<HTMLDivElement>(null);

  const selectedServiceNames = SERVICES_DATA
    .filter(s => selectedServices.includes(s.id))
    .map(s => s.name);

  useEffect(() => {
    const slots: string[] = [];
    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const isLunchBlock = (hour === 13) || (hour === 14 && minute < 30);
        if (!isLunchBlock) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          slots.push(timeString);
        }
      }
    }
    setTimeSlots(slots);
  }, []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    const days: CalendarDay[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: 0, status: 'unavailable', dateObj: new Date(year, month, 0), isSunday: false }); 
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      const isSunday = dateObj.getDay() === 0;
      const isPast = dateObj < new Date(today.setHours(0,0,0,0));
      let status: 'available' | 'unavailable' = 'available';
      if (isSunday || isPast) status = 'unavailable';
      days.push({ day: i, status, isToday: false, isSunday, dateObj });
    }
    
    if (year === today.getFullYear() && month === today.getMonth()) {
        const todayIndex = days.findIndex(d => d.day === today.getDate());
        if(todayIndex !== -1) days[todayIndex].isToday = true;
    }

    setCalendarGrid(days);
    setSelectedDay(null);
    setSelectedTime(null);
  }, [currentDate]);

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDayClick = (day: CalendarDay) => {
    if (day.status === 'unavailable') return;
    setSelectedDay(day.day);
    setSelectedTime(null);
    
    // Smooth scroll to time section on mobile
    setTimeout(() => {
      timeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBooking = () => {
    if (!selectedDay || !selectedTime) return;
    const monthName = MONTHS[currentDate.getMonth()];
    const dateStr = `${selectedDay} de ${monthName}`;
    const servicesStr = selectedServiceNames.length > 0 ? `[${selectedServiceNames.join(', ')}]` : 'um atendimento';
    const message = `Olá! Gostaria de agendar o serviço ${servicesStr} para o dia ${dateStr} às ${selectedTime}.`;
    window.open(createWhatsAppLink(message), '_blank');
  };

  // Reusable Calendar Component
  const CalendarGrid = () => (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-4 md:p-8 shadow-2xl shadow-lux-brown/10 border border-white/80 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lux-beige via-lux-gold to-lux-beige opacity-50" />
      <div className="flex justify-between items-center mb-6 px-2">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-lux-beige rounded-full transition-colors text-lux-darkBrown"><ChevronLeft size={20} /></button>
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-serif text-lux-darkBrown">{MONTHS[currentDate.getMonth()]}</h3>
          <span className="text-[10px] uppercase tracking-widest text-lux-gold font-bold">{currentDate.getFullYear()}</span>
        </div>
        <button onClick={handleNextMonth} className="p-2 hover:bg-lux-beige rounded-full transition-colors text-lux-darkBrown"><ChevronRight size={20} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_HEADER.map((d, i) => <div key={i} className="text-center text-[10px] font-bold text-lux-brown/40 uppercase py-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-3">
        {calendarGrid.map((d, index) => {
           if (d.day === 0) return <div key={`empty-${index}`} />;
           const isSelected = selectedDay === d.day;
           const isUnavailable = d.status === 'unavailable';
           return (
             <motion.button
               key={index}
               whileTap={!isUnavailable ? { scale: 0.9 } : {}}
               onClick={() => handleDayClick(d)}
               disabled={isUnavailable}
               className={`relative aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-300 ${isSelected ? 'bg-lux-darkBrown text-white ring-2 ring-lux-gold' : isUnavailable ? 'text-gray-300' : 'bg-lux-beige/50 text-lux-darkBrown hover:bg-white'}`}
             >
               <span className={`text-sm ${isUnavailable ? '' : 'font-medium'}`}>{d.day}</span>
               {d.isToday && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-lux-gold rounded-full" />}
               {isSelected && <span className="absolute -top-1 -right-1 w-3 h-3 bg-lux-gold rounded-full flex items-center justify-center"><Check size={6} className="text-white" /></span>}
             </motion.button>
           )
        })}
      </div>
    </div>
  );

  return (
    <section className="h-full w-full bg-lux-beige/20 md:bg-transparent">
      
      {/* ================= MOBILE LAYOUT (Vertical Scroll) ================= */}
      <div className="lg:hidden h-full flex flex-col overflow-y-auto no-scrollbar scroll-smooth">
        <div className="px-6 pt-2 pb-40 flex flex-col gap-6">
          
          {/* Header */}
          <div className="mt-2">
            <h2 className="text-4xl font-serif text-lux-darkBrown">Agenda</h2>
            <p className="text-lux-brown font-light text-sm">Escolha o dia ideal para você.</p>
          </div>

          {/* Services Summary */}
          {selectedServiceNames.length > 0 && (
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/60">
              <div className="flex items-center gap-2 mb-2 text-lux-gold font-bold text-[10px] uppercase tracking-widest">
                <Sparkles size={12} /> <span>Serviços</span>
              </div>
              <p className="text-lux-darkBrown font-serif text-base leading-tight">
                {selectedServiceNames.join(', ')}
              </p>
            </div>
          )}

          {/* Calendar */}
          <CalendarGrid />

          {/* Time Selection (Appears below calendar) */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                ref={timeSectionRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2">
                  <h3 className="text-lg font-serif text-lux-darkBrown mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-lux-gold" />
                    Horários para dia {selectedDay}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-lg text-sm font-sans font-medium transition-all ${selectedTime === time ? 'bg-lux-darkBrown text-lux-beige shadow-md' : 'bg-white/50 text-lux-darkBrown'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Mobile Button */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-xl border-t border-white/50 z-50">
           <button
              onClick={handleBooking}
              disabled={!selectedDay || !selectedTime}
              className={`w-full py-4 rounded-xl font-sans uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2 ${selectedDay && selectedTime ? 'bg-lux-darkBrown text-lux-beige shadow-lg' : 'bg-gray-200 text-gray-400'}`}
            >
              <span>Confirmar Agendamento</span>
              {selectedDay && selectedTime && <Check size={16} />}
            </button>
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT (Split View) ================= */}
      <div className="hidden lg:flex w-full h-full items-center justify-center px-4 relative">
        <div className="w-full max-w-7xl flex gap-12 items-center h-[600px]">
          {/* Left Panel: Dynamic Content */}
          <div className="flex-1 h-full flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {!selectedDay ? (
                <motion.div 
                  key="intro"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-6xl font-serif text-lux-darkBrown mb-4">Agenda <br/> Premium</h2>
                    <p className="text-lux-brown font-light text-lg">Selecione uma data para ver horários.</p>
                  </div>
                  {/* ... (Desktop specific info content) ... */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/30 p-4 rounded-xl border border-white/40">
                      <span className="font-bold text-xs uppercase tracking-wider block mb-1 text-lux-gold">Seg - Sáb</span>
                      <span className="font-light text-sm text-lux-brown">09:00 - 19:00</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="times"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full"
                >
                  {/* Time Selection Header */}
                  <div className="flex items-center gap-4 mb-6">
                      <button onClick={() => setSelectedDay(null)} className="p-2 rounded-full hover:bg-white/50 transition-colors"><ChevronLeft size={20} /></button>
                      <div>
                          <span className="text-xs uppercase tracking-widest text-lux-gold font-bold">Disponibilidade</span>
                          <h3 className="text-3xl font-serif text-lux-darkBrown">{selectedDay} de {MONTHS[currentDate.getMonth()]}</h3>
                      </div>
                  </div>
                  {/* Desktop Time Grid */}
                  <div className="flex-1 overflow-y-auto pr-2 no-scrollbar mb-6">
                      <div className="grid grid-cols-4 gap-3">
                          {timeSlots.map((time) => (
                             <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-lg text-sm font-sans transition-all ${selectedTime === time ? 'bg-lux-darkBrown text-lux-beige shadow-lg' : 'bg-white/50 hover:bg-lux-gold/20'}`}
                             >
                                {time}
                             </button>
                          ))}
                      </div>
                  </div>
                  <button
                      onClick={handleBooking}
                      disabled={!selectedTime}
                      className={`w-full py-5 rounded-xl font-sans uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-3 ${selectedTime ? 'bg-lux-darkBrown text-lux-beige hover:bg-lux-gold shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                      <span>Confirmar Agendamento</span>
                      <Check size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Right: Calendar */}
          <div className="flex-[1.5] h-fit">
            <CalendarGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
