import { AlertCircle, DollarSign, Clock, LucideIcon } from "lucide-react";

export interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const problems: Problem[] = [
  {
    icon: AlertCircle,
    title: "Produtos complexos que ninguém explica direito",
    description: "Linguagem técnica e sem clareza sobre o que você está comprando",
  },
  {
    icon: DollarSign,
    title: "Taxas escondidas e conflitos de interesse",
    description: "Seu gerente ganha comissão vendendo produtos que nem sempre são os melhores para você",
  },
  {
    icon: Clock,
    title: "Sem tempo para acompanhar seus investimentos",
    description: "O mercado muda rápido e você não consegue ficar por dentro de tudo",
  },
];
