import { Shield, MessageSquare, Users, LucideIcon } from "lucide-react";

export interface Solution {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const solutions: Solution[] = [
  {
    icon: Shield,
    title: "Análises Independentes",
    description: "Não vendemos produtos, só a verdade",
  },
  {
    icon: MessageSquare,
    title: "Linguagem Simples",
    description: "Explicamos tudo de forma clara",
  },
  {
    icon: Users,
    title: "24/7 no WhatsApp",
    description: "Tire dúvidas quando precisar",
  },
];
