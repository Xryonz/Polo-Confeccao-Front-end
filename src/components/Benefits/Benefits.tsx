/*
  BENEFITS.TSX — Seção de benefícios
  =====================================
  Demonstra um padrão muito usado em React: renderizar listas com .map().

  Em vez de repetir 6 blocos de <div class="beneficio-item"> no HTML,
  criamos um array de dados e geramos o HTML dinamicamente.
  Assim, adicionar ou remover um benefício é só editar o array.
*/

// Interface local — define o formato de cada benefício
interface Benefit {
  icon: React.ReactNode  // ReactNode = qualquer coisa renderizável (JSX, string, etc.)
  title: string
  description: string
}

// Dados separados da apresentação — fácil de editar
const benefits: Benefit[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '[ Benefício 1 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '[ Benefício 2 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: '[ Benefício 3 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: '[ Benefício 4 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: '[ Benefício 5 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: '[ Benefício 6 ]',
    description: '[ Descrição breve do benefício oferecido pela empresa ]',
  },
]

export default function Benefits() {
  return (
    <section className="beneficios-section">
      <div className="beneficios-inner">
        <div className="beneficios-left">
          <div className="section-header" style={{ justifyContent: 'flex-start', marginBottom: 32 }}>
            {/*
              Estilos inline em React são objetos JavaScript, não strings CSS.
              "justify-content" vira "justifyContent" (camelCase).
              Ex. original: style="justify-content: flex-start; margin-bottom: 32px"
            */}
            <span className="section-eyebrow">Por que trabalhar conosco</span>
            <div className="section-line" style={{ maxWidth: 80 }} />
          </div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Nossos<br /><em>benefícios</em>
          </h2>
        </div>

        <div className="beneficios-grid">
          {/*
            .map() transforma cada item do array num elemento JSX.
            "key" é obrigatório — React usa pra identificar cada elemento
            e atualizar só o que mudou (otimização de performance).
          */}
          {benefits.map((b, i) => (
            <div className="beneficio-item" key={i}>
              <div className="beneficio-icon">{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
