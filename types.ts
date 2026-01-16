export enum Section {
  HOME = 'home',
  SERVICES = 'services',
  AGENDA = 'agenda',
  ABOUT = 'about',
  CONTACT = 'contact'
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

export interface CalendarDay {
  day: number;
  status: 'available' | 'unavailable' | 'selected';
  isToday?: boolean;
  isSunday?: boolean;
  dateObj: Date;
}

export interface ServicesProps {
  selectedServices: string[];
  toggleService: (id: string) => void;
  onNavigateToAgenda: () => void;
}

export interface AgendaProps {
  selectedServices: string[];
}

export interface HomeProps {
  onNavigateToServices: () => void;
}