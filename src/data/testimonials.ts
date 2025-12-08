export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Descobri que estava pagando 2,5% ao ano em taxas 'escondidas' do meu fundo. Em 2 semanas já realoquei 60% da carteira. Economizei R$ 3.200 no primeiro ano.",
    author: "João Silva",
    role: "Empresário, 34 anos",
  },
  {
    quote: "Meu gerente me colocou em 3 CDBs que rendiam MENOS que a inflação. A Duop explicou em 5 minutos por que isso era péssimo. Mudei tudo no dia seguinte.",
    author: "Maria Santos",
    role: "Médica, 42 anos",
  },
  {
    quote: "Achei que precisava de um assessor presencial caríssimo. Com a Duop por R$ 54,90/mês tenho análises melhores que as do meu banco. Sem enrolação, direto no WhatsApp.",
    author: "Pedro Costa",
    role: "Executivo, 38 anos",
  },
];
