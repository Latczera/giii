import { ServiceItem, Section } from './types';

export const WHATSAPP_NUMBER = "554399042279";
export const EMAIL = "giovanataynara34@gmail.com";
export const ADDRESS = "Rua José Batista de Paiva, 38 – Mauá da Serra";

export const SERVICES_DATA: ServiceItem[] = [
  { id: '1', name: 'Design Personalizado', price: 35 },
  { id: '2', name: 'Design com Henna', price: 45 },
  { id: '3', name: 'Coloração', price: 45 },
  { id: '4', name: 'Nanopigmentação', price: 350 },
  { id: '5', name: 'Brow Lamination', price: 120 },
  { id: '6', name: 'Buço', price: 5 },
];

export const NAV_ITEMS = [
  { id: Section.HOME, label: 'Início' },
  { id: Section.SERVICES, label: 'Serviços' },
  { id: Section.AGENDA, label: 'Agenda' },
  { id: Section.ABOUT, label: 'Sobre' },
  { id: Section.CONTACT, label: 'Contato' },
];