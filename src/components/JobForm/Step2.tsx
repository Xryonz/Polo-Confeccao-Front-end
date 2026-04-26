import type { FormData, FormErrors } from '../../types/form'

interface Step2Props {
  formData: FormData
  errors: FormErrors
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  onNext: () => void
  onPrev: () => void
}

const experienciaOptions = [
  { value: 'sem',     label: 'Sem experiência' },
  { value: '1-3anos', label: '1 a 3 anos' },
  { value: '3-5anos', label: '3 a 5 anos' },
  { value: '5+anos',  label: '5 anos ou mais' },
]

export default function Step2({ formData, errors, updateField, onNext, onPrev }: Step2Props) {
  return (
    <div className="form-step active" id="step2">
      <div className="form-step-header">
        <span className="form-step-num">02</span>
        <div>
          <h3 className="form-step-title">Vaga & Experiência</h3>
          <p className="form-step-sub">Sobre o cargo e sua trajetória</p>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="vaga">Vaga de interesse <span className="req">*</span></label>
          <div className="select-wrap">
            <select
              id="vaga"
              name="vaga"
              value={formData.vaga}
              onChange={e => updateField('vaga', e.target.value)}
              className={errors.vaga ? 'error' : ''}
            >
              <option value="" disabled>Selecione uma vaga</option>
              <option value="revisora">Revisora</option>
              <option value="costureira">Costureira</option>
            </select>
            <svg className="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {errors.vaga && <span className="error-msg">{errors.vaga}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="pretensao">Pretensão salarial</label>
          <input
            type="text"
            id="pretensao"
            name="pretensao"
            placeholder="Ex: R$ 2.500,00"
            value={formData.pretensao}
            onChange={e => updateField('pretensao', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full">
          <label>Nível de experiência <span className="req">*</span></label>
          <div className="radio-group">
            {experienciaOptions.map(opt => (
              <label className="radio-item" key={opt.value}>
                <input
                  type="radio"
                  name="experiencia"
                  value={opt.value}
                  checked={formData.experiencia === opt.value}
                  onChange={() => updateField('experiencia', opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {errors.experiencia && <span className="error-msg">{errors.experiencia}</span>}
        </div>
      </div>

      <div className="form-group full">
        <label htmlFor="historico">Histórico profissional <span className="req">*</span></label>
        <textarea
          id="historico"
          name="historico"
          rows={5}
          placeholder="Descreva suas experiências anteriores, habilidades e o que te motiva a trabalhar conosco..."
          value={formData.historico}
          onChange={e => updateField('historico', e.target.value)}
          className={errors.historico ? 'error' : ''}
        />
        {errors.historico && <span className="error-msg">{errors.historico}</span>}
      </div>

      <div className="form-nav">
        <button type="button" className="btn-back" onClick={onPrev}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
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