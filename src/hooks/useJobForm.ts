
import { useState, useCallback } from 'react';
import type { FormData, FormErrors, StepNumber } from '../types/form';


const API_URL = 'https://polo-confeccao-backend-production.up.railway.app';


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

  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData]       = useState<FormData>(initialData);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted]   = useState(false);
  const [shake, setShake]               = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);


  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData(prev => ({ ...prev, [key]: value }));
    
      setErrors(prev => ({ ...prev, [key]: undefined }));
    },
    []
  );

  
  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500); 
  }, []);

 
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
        if (!formData.vaga)             newErrors.vaga        = 'Selecione uma vaga';
        if (!formData.experiencia)      newErrors.experiencia = 'Selecione o nível';
        if (!formData.historico.trim()) newErrors.historico   = 'Campo obrigatório';
      }

      if (step === 3) {
        if (!formData.lgpd) newErrors.lgpd = 'Você deve concordar para continuar';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

 
  const nextStep = useCallback(() => {
    if (!validateStep(currentStep)) {
      triggerShake();
      return;
    }
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(s => (s + 1) as StepNumber);
    }
  }, [currentStep, validateStep, triggerShake]);

 
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(s => (s - 1) as StepNumber);
      setErrors({});
    }
  }, [currentStep]);

 
  const handleSubmit = useCallback(async () => {
    if (!validateStep(3)) { triggerShake(); return; }

    setIsSubmitting(true);
    setSubmitError(null);


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
   
    currentStep,
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    shake,
    submitError,
    totalSteps: TOTAL_STEPS,
  
    updateField,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
