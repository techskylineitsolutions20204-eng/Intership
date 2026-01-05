
export interface TechCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

export interface ContactDetails {
  name: string;
  company: string;
  usaPhone: string;
  whatsapp: string;
  email: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
