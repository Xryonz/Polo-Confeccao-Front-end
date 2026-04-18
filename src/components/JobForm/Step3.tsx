
import { useRef } from 'react'
import type { FormData, FormErrors } from '../../types/form'

interface Step3Props {
  formData: FormData
  errors: FormErrors
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  onPrev: () => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string | null
}

export default function Step3({ formData, errors, updateField, onPrev, onSubmit, isSubmitting, submitError }: Step3Props) {
 
  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleFileChange = (file: File | undefined) => {
    if (file) updateField('curriculo', file)
  }

 
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() 
    e.currentTarget.classList.add('dragover')
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  return (
    <div className="form-step active" id="step3">
      <div className="form-step-header">
        <span className="form-step-num">03</span>
        <div>
          <h3 className="form-step-title">Currículo & Envio</h3>
          <p className="form-step-sub">Finalize sua candidatura</p>
        </div>
      </div>

      <div className="form-group full">
        <label>Currículo (PDF ou DOC) <span className="req">*</span></label>
        <div
          className="file-drop"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {}
          <input
            ref={fileInputRef}
            type="file"
            id="curriculo"
            name="curriculo"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={e => handleFileChange(e.target.files?.[0])}
          />
          <div
            className="file-drop-inner"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="file-drop-text">
              Clique para selecionar ou arraste o arquivo aqui
            </p>
            <span className="file-drop-hint">PDF, DOC ou DOCX — máx. 5MB</span>
          </div>
          {}
          {formData.curriculo && (
            <div className="file-name">✓&nbsp;&nbsp;{formData.curriculo.name}</div>
          )}
        </div>
        {errors.curriculo && <span className="error-msg">{errors.curriculo}</span>}
      </div>

      <div className="form-group full">
        <label htmlFor="portfolio">Link do portfólio (opcional)</label>
        <input
          type="url"
          id="portfolio"
          name="portfolio"
          placeholder="https://seuportfolio.com"
          value={formData.portfolio}
          onChange={e => updateField('portfolio', e.target.value)}
        />
      </div>

      <div className="form-group full">
        <label htmlFor="observacoes">Observações adicionais</label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={3}
          placeholder="Alguma informação que queira compartilhar conosco?"
          value={formData.observacoes}
          onChange={e => updateField('observacoes', e.target.value)}
        />
      </div>

      <div className="form-group full">
        <label className="checkbox-item">
          <input
            type="checkbox"
            id="lgpd"
            name="lgpd"
            checked={formData.lgpd}
            onChange={e => updateField('lgpd', e.target.checked)}
          />
          <span>
            Concordo com o uso dos meus dados para fins de recrutamento e seleção,
            conforme a <a href="#">Política de Privacidade</a>. <span className="req">*</span>
          </span>
        </label>
        {errors.lgpd && <span className="error-msg">{errors.lgpd}</span>}
      </div>

      {submitError && (
        <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(180,0,0,0.6)' }}>
          ⚠ {submitError}
        </p>
      )}

      <div className="form-nav">
        <button type="button" className="btn-back" onClick={onPrev}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <button
          type="button"
          className="btn-submit"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {}
          {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
          {!isSubmitting && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
