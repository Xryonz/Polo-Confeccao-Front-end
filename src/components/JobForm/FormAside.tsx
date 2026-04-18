

interface FormAsideProps {
  currentStep: number  
}


const steps = [
  { num: '01', label: 'Dados pessoais' },
  { num: '02', label: 'Vaga & experiência' },
  { num: '03', label: 'Currículo & envio' },
]

export default function FormAside({ currentStep }: FormAsideProps) {

  return (
    <aside className="form-aside">
      <div className="section-header" style={{ justifyContent: 'flex-start', marginBottom: 28 }}>
        <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Candidatura
        </span>
        <div className="section-line" style={{ borderColor: 'rgba(255,255,255,0.1)', maxWidth: 60 }} />
      </div>

      <h2 className="form-aside-title">
        Envie sua<br /><em>candidatura</em>
      </h2>

      <p className="form-aside-desc">
        Preencha todos os campos.<br />
        Entraremos em contato em até <strong>7 dias úteis</strong>.
      </p>

      <div className="form-aside-steps">
        {steps.map((step, i) => (
          
          <div key={step.num}>
            <div className={`step${i + 1 === currentStep ? ' active' : ''}`}>
              <span className="step-num">{step.num}</span>
              <span className="step-label">{step.label}</span>
            </div>
            {}
            {i < steps.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>

      <div className="form-aside-contact">
        <p>Dúvidas? Entre em contato:</p>
        <a href="mailto:polofaccao@gmail.com">polofaccao@gmail.com</a>
      </div>
    </aside>
  )
}
