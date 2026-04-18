/*
  CUSTOM HOOK: useJobForm
  =======================
  Um "hook" no React é uma função que começa com "use" e encapsula
  lógica com estado. Em vez de espalhar variáveis e funções pelo código,
  reunimos tudo aqui num só lugar.

  O que esse hook substitui do script.js original:
    - currentStep / showStep() → useState + setCurrentStep
    - validateStep()           → função validateStep interna
    - nextStep() / prevStep()  → funções nextStep / prevStep
    - shakeForm()              → estado shake + setTimeout
    - submit handler           → handleSubmit com setTimeout de 1200ms
    - file input logic         → tratado via updateField("curriculo", file)
*/

import { useState, useCallback } from 'react';
import type { FormData, FormErrors, StepNumber } from '../types/form';

// URL base da API — em produção troque pelo endereço real do servidor
const API_URL = 'https://polo-confeccao-backend-production.up.railway.app';

// Valores iniciais — todos os campos começam vazios/falsos
const initialData: FormData = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  nascimento: '',
  linkedin: '',
  vaga: '',
  modalidade: '',
  experiencia: '',
  pretensao: '',
  historico: '',
  curriculo: null,
  portfolio: '',
  observacoes: '',
  lgpd: false,
};

const TOTAL_STEPS: StepNumber = 3;

export function useJobForm() {
  /*
    useState<T>(valorInicial) retorna [valor, setValor].
    Sempre que setValor é chamado, o componente re-renderiza
    com o novo valor — o DOM é atualizado automaticamente.
  */
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData]       = useState<FormData>(initialData);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted]   = useState(false);
  const [shake, setShake]               = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  /*
    useCallback(fn, [deps]) memoriza a função para não recriar a cada render.
    Útil para funções passadas como props para componentes filhos.
  */

  // Atualiza qualquer campo do formulário de forma genérica
  // K extends keyof FormData → TypeScript garante que "key" é um campo válido
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData(prev => ({ ...prev, [key]: value }));
      // Remove o erro do campo quando o usuário começa a digitar
      setErrors(prev => ({ ...prev, [key]: undefined }));
    },
    []
  );

  // Animação de shake — igual ao shakeForm() original, mas em estado React
  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // duração da animação CSS
  }, []);

  // Valida os campos de uma etapa específica
  // Retorna true se válido, false se houver erros
  const validateStep = useCallback(
    (step: StepNumber): boolean => {
      const newErrors: FormErrors = {};

      if (step === 1) {
        if (!formData.nome.trim())     newErrors.nome     = 'Campo obrigatório';
        if (!formData.email.trim())    newErrors.email    = 'Campo obrigatório';
        if (!formData.telefone.trim()) newErrors.telefone = 'Campo obrigatório';
        if (!formData.cidade.trim())   newErrors.cidade   = 'Campo obrigatório';
      }

      if (step === 2) {
        if (!formData.vaga)               newErrors.vaga        = 'Selecione uma vaga';
        if (!formData.modalidade)         newErrors.modalidade  = 'Selecione a modalidade';
        if (!formData.experiencia)        newErrors.experiencia = 'Selecione o nível';
        if (!formData.historico.trim())   newErrors.historico   = 'Campo obrigatório';
      }

      if (step === 3) {
        if (!formData.curriculo) newErrors.curriculo = 'Anexe seu currículo';
        if (!formData.lgpd)      newErrors.lgpd      = 'Você deve concordar para continuar';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // válido se não há erros
    },
    [formData]
  );

  // Avança para o próximo step se a validação passar
  const nextStep = useCallback(() => {
    if (!validateStep(currentStep)) {
      triggerShake();
      return;
    }
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(s => (s + 1) as StepNumber);
    }
  }, [currentStep, validateStep, triggerShake]);

  // Volta para o step anterior (sem validação)
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(s => (s - 1) as StepNumber);
      setErrors({});
    }
  }, [currentStep]);

  // Submete o formulário via fetch para a API backend
  const handleSubmit = useCallback(async () => {
    if (!validateStep(3)) { triggerShake(); return; }

    setIsSubmitting(true);
    setSubmitError(null);

    // FormData nativo do browser (necessário para enviar arquivo junto)
    const data = new FormData();
    data.append('nome',        formData.nome);
    data.append('email',       formData.email);
    data.append('telefone',    formData.telefone);
    data.append('cidade',      formData.cidade);
    data.append('nascimento',  formData.nascimento);
    data.append('linkedin',    formData.linkedin);
    data.append('vaga',        formData.vaga);
    data.append('modalidade',  formData.modalidade);
    data.append('experiencia', formData.experiencia);
    data.append('pretensao',   formData.pretensao);
    data.append('historico',   formData.historico);
    data.append('portfolio',   formData.portfolio);
    data.append('observacoes', formData.observacoes);
    if (formData.curriculo) data.append('curriculo', formData.curriculo);

    try {
      const res = await fetch(`${API_URL}/api/candidaturas`, {
        method: 'POST',
        body: data,
        // Não defina Content-Type — o browser adiciona o boundary correto
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(json.message ?? 'Erro no servidor');
      }

      setIsSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setSubmitError(message);
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, triggerShake]);

  return {
    // Estado
    currentStep,
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    shake,
    submitError,
    totalSteps: TOTAL_STEPS,
    // Ações
    updateField,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
