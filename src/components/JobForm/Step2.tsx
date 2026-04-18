/*
  STEP 2 — Vaga & Experiência
  ============================
  Demonstra como lidar com selects e radio buttons em React.

  Ponto importante: radio buttons em React também são controlados.
  Em vez de checar `r.checked` no DOM, usamos `formData.experiencia === value`.
*/

import type { FormData, FormErrors } from '../../types/form'

interface Step2Props {
  formData: FormData
  errors: FormErrors
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  onNext: () => void
  onPrev: () => void
}

// Opções de experiência — centralizadas aqui, fáceis de alterar
const experienciaOptions = [
  { value: 'sem',    label: 'Sem experiência' },
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno',  label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
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
              <option value="vaga1">[ Vaga 1 ]</option>
              <option value="vaga2">[ Vaga 2 ]</option>
              <option value="vaga3">[ Vaga 3 ]</option>
              <option value="vaga4">[ Vaga 4 ]</option>
              <option value="espontaneo">Envio espontâneo</option>
            </select>
            <svg className="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {errors.vaga && <span className="error-msg">{errors.vaga}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="modalidade">Modalidade <span className="req">*</span></label>
          <div className="select-wrap">
            <select
              id="modalidade"
              name="modalidade"
              value={formData.modalidade}
              onChange={e => updateField('modalidade', e.target.value)}
              className={errors.modalidade ? 'error' : ''}
            >
              <option value="" disabled>Selecione</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
              <option value="remoto">Remoto</option>
            </select>
            <svg className="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {errors.modalidade && <span className="error-msg">{errors.modalidade}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Nível de experiência <span className="req">*</span></label>
          <div className="radio-group">
            {experienciaOptions.map(opt => (
              /*
                Radio controlado: checked={formData.experiencia === opt.value}
                Em vez de deixar o browser controlar qual está marcado,
                o React compara com o estado atual.

                onChange={() => updateField('experiencia', opt.value)}
                → Ao clicar, atualiza o estado, React re-renderiza,
                  o radio correto fica marcado. Tudo determinístico.
              */
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
