import { Send, Sparkles, TrendingUp, LucideIcon } from "lucide-react";

export type StepMockupType = "whatsapp-send" | "analyzing" | "results";

export interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  mockup: StepMockupType;
}

export const steps: Step[] = [
  {
    icon: Send,
    number: "1",
    title: "Envie sua carteira pelo WhatsApp",
    description: "Compartilhe seus investimentos de forma segura e prática",
    mockup: "whatsapp-send",
  },
  {
    icon: Sparkles,
    number: "2",
    title: "Nossa IA + especialistas analisam sua carteira",
    description: "Análise detalhada entregue em até 24 horas",
    mockup: "analyzing",
  },
  {
    icon: TrendingUp,
    number: "3",
    title: "Receba sua análise completa",
    description: "Decisões informadas com recomendações personalizadas em até 24 horas",
    mockup: "results",
  },
];
