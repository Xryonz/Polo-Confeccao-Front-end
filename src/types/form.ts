
export interface FormData {
 
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  nascimento: string;  
  linkedin: string;

 
  vaga: string;
  modalidade: string;
  experiencia: string; 
  pretensao: string;
  historico: string;

  
  curriculo: File | null; 
  portfolio: string;
  observacoes: string;
  lgpd: boolean;         
}


export type FormErrors = Partial<Record<keyof FormData, string>>;

// Tipo auxiliar: quais steps existem (1, 2 ou 3)
export type StepNumber = 1 | 2 | 3;
