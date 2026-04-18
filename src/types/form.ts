/*
  TIPOS DO FORMULÁRIO
  ===================
  TypeScript usa "interfaces" e "types" para descrever a forma dos dados.
  Aqui definimos exatamente quais campos o formulário tem e seus tipos.

  Vantagem: se você tentar acessar "formData.nomeErrado", o TypeScript
  vai reclamar ANTES de rodar — no editor, em vermelho.
*/

// Interface: descreve a estrutura de um objeto
export interface FormData {
  // Etapa 1 — Dados Pessoais
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  nascimento: string;  // valor do input[type="date"] é sempre string
  linkedin: string;

  // Etapa 2 — Vaga & Experiência
  vaga: string;
  modalidade: string;
  experiencia: string; // "sem" | "junior" | "pleno" | "senior"
  pretensao: string;
  historico: string;

  // Etapa 3 — Currículo & Envio
  curriculo: File | null; // File é um tipo nativo do browser; null = ainda não enviado
  portfolio: string;
  observacoes: string;
  lgpd: boolean;         // checkbox: true ou false
}

/*
  Erros de validação por campo.
  Cada chave é opcional (?) — campos sem erro simplesmente não existem no objeto.

  Exemplo de uso:
    errors.nome → "Campo obrigatório" ou undefined (sem erro)
*/
export type FormErrors = Partial<Record<keyof FormData, string>>;

// Tipo auxiliar: quais steps existem (1, 2 ou 3)
export type StepNumber = 1 | 2 | 3;
