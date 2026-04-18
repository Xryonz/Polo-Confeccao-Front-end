

import type { FormData, FormErrors } from '../../types/form'

interface Step1Props {
  formData: FormData
  errors: FormErrors
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  onNext: () => void
}

export default function Step1({ formData, errors, updateField, onNext }: Step1Props) {
  return (
    <div className="form-step active" id="step1">
      <div className="form-step-header">
        <span className="form-step-num">01</span>
        <div>
          <h3 className="form-step-title">Dados Pessoais</h3>
          <p className="form-step-sub">Informações básicas de contato</p>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nome">
            Nome completo <span className="req">*</span>
          </label>
          {}
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome completo"
            value={formData.nome}
            onChange={e => updateField('nome', e.target.value)}
            className={errors.nome ? 'error' : ''}
          />
          {errors.nome && <span className="error-msg">{errors.nome}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail <span className="req">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="telefone">Telefone / WhatsApp <span className="req">*</span></label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={e => updateField('telefone', e.target.value)}
            className={errors.telefone ? 'error' : ''}
          />
          {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade / Estado <span className="req">*</span></label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            placeholder="Ex: São Paulo, SP"
            value={formData.cidade}
            onChange={e => updateField('cidade', e.target.value)}
            className={errors.cidade ? 'error' : ''}
          />
          {errors.cidade && <span className="error-msg">{errors.cidade}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nascimento">Data de nascimento</label>
          <input
            type="date"
            id="nascimento"
            name="nascimento"
            value={formData.nascimento}
            onChange={e => updateField('nascimento', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn (opcional)</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="linkedin.com/in/seuperfil"
            value={formData.linkedin}
            onChange={e => updateField('linkedin', e.target.value)}
          />
        </div>
      </div>

      <div className="form-nav">
        <span /> {}
        <button type="button" className="btn-next" onClick={onNext}>
          Próximo
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
