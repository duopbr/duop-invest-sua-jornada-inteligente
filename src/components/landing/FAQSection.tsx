import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Por que vocês não vendem produtos de investimento?",
    answer:
      "Simples: nosso negócio é a assinatura mensal, não comissão de vendas. Quanto melhor você investe (de verdade), mais tempo você fica conosco. Não temos conflito de interesse. Só queremos que você invista bem.",
  },
  {
    question: "Quanto tempo leva para receber a análise?",
    answer:
      "Seu relatório completo é entregue em até 24 horas. Priorizamos qualidade sobre velocidade - cada análise é revisada por nossos especialistas.",
  },
  {
    question: "Como funcionam as 5 interações grátis?",
    answer:
      "Você pode fazer 5 perguntas ou análises sem compromisso. Depois disso, oferecemos planos a partir de R$ 54,90/mês.",
  },
  {
    question: "É seguro compartilhar minha carteira?",
    answer:
      "Sim, somos 100% seguros, não pedimos senhas e respeitamos a LGPD. Seus dados são criptografados e nunca compartilhados.",
  },
  {
    question: "Qual a diferença do ChatGPT?",
    answer:
      "Fomos treinados especificamente para o mercado financeiro brasileiro com expertise de gestores reais. ChatGPT é genérico e não entende nuances de FIIs, renda fixa brasileira, etc.",
  },
  {
    question: "Preciso ter muito dinheiro investido?",
    answer:
      "Não! Atendemos desde quem está começando até carteiras de milhões. O importante é tomar decisões informadas, independente do valor.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-card-foreground hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
