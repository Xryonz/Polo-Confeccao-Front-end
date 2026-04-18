/*
  JOB FORM — Componente principal do formulário
  ===============================================
  É o "maestro": usa o hook useJobForm para obter estado e ações,
  e distribui tudo para os componentes filhos (FormAside, Step1, 2, 3).

  Padrão usado: "Lifting State Up" (estado elevado)
  - O estado vive aqui (via hook)
  - Os steps filhos recebem só o que precisam via props
  - Nenhum step filho precisa saber da existência dos outros
*/

import { useJobForm } from '../../hooks/useJobForm'
import FormAside from './FormAside'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default function JobForm() {
  /*
    Desestruturamos tudo do hook de uma vez.
    O hook retorna um objeto com estado e funções — aqui pegamos o que precisamos.
  */
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    shake,
    submitError,
    updateField,
    nextStep,
    prevStep,
    handleSubmit,
  } = useJobForm()

  return (
    <section className="form-section" id="formulario">
      <div className="form-layout">
        {/* Sidebar: passa o step atual para destacar o indicador correto */}
        <FormAside currentStep={currentStep} />

        {/*
          Template literal com operador ternário:
          Se shake === true → adiciona a classe "shake" → CSS anima
          Se shake === false → sem a classe → sem animação
          Isso substitui o shakeForm() com setInterval do JS original.
        */}
        <div className={`form-wrap${shake ? ' shake' : ''}`}>
          <form className="job-form" id="jobForm" noValidate>
            {/*
              Renderização condicional com &&:
              "expressão && <Componente />" só renderiza o componente se a expressão for true.
              Substitui o display:none/active do JS original.

              currentStep === 1 && <Step1 .../> → mostra Step1 só no step 1
            */}
            {currentStep === 1 && (
              <Step1
                formData={formData}
                errors={errors}
                updateField={updateField}
                onNext={nextStep}
              />
            )}

            {currentStep === 2 && (
              <Step2
                formData={formData}
                errors={errors}
                updateField={updateField}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 3 && !isSubmitted && (
              <Step3
                formData={formData}
                errors={errors}
                updateField={updateField}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}

            {/* Tela de sucesso — aparece quando isSubmitted vira true */}
            {isSubmitted && (
              <div className="form-success show">
                <div className="success-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Candidatura enviada!</h3>
                <p>
                  Obrigado pelo interesse. Analisaremos seu perfil e entraremos em
                  contato em breve.
                </p>
                <a href="#" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
                  Voltar ao início
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
