
import { useJobForm } from '../../hooks/useJobForm'
import FormAside from './FormAside'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default function JobForm() {

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
        {}
        <FormAside currentStep={currentStep} />

        {}
        <div className={`form-wrap${shake ? ' shake' : ''}`}>
          <form className="job-form" id="jobForm" noValidate>
            {}
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

            {}
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
