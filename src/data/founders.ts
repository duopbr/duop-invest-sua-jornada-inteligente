import philippeImage from "@/assets/philippe-drevon.png";
import gustavoImage from "@/assets/gustavo-teixeira.png";
import rodrigoImage from "@/assets/rodrigo-lamas.png";

export interface Founder {
  name: string;
  credentials: string;
  description: string;
  image: string;
}

export const founders: Founder[] = [
  {
    name: "Philippe Drevon",
    credentials: "Engenheiro PUC-RJ",
    description: "Mestre em Economia e Finanças pela FGV. 12 anos no mercado financeiro, 9 anos na gestão de fundos multimercados.",
    image: philippeImage,
  },
  {
    name: "Gustavo Teixeira, CFA",
    credentials: "Engenheiro PUC-RJ",
    description: "14 anos no mercado financeiro, 9 anos na gestão de fundos multimercados, 5 anos em assessoria de investimentos.",
    image: gustavoImage,
  },
  {
    name: "Rodrigo Lamas",
    credentials: "Engenheiro ITA",
    description: "Mestre em Economia e Finanças pela FGV e Doutor em Administração pela FGV.",
    image: rodrigoImage,
  },
];
