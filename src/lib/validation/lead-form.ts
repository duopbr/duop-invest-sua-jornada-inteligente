import * as z from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Por favor, insira seu nome" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  surname: z
    .string()
    .trim()
    .min(1, { message: "Por favor, insira seu sobrenome" })
    .max(100, { message: "Sobrenome deve ter no máximo 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
  hasInvestment: z.enum(["yes", "no"], {
    required_error: "Por favor, selecione uma opção",
  }),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
