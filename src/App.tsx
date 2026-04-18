/*
  APP.TSX — Componente raiz
  ==========================
  No HTML original, toda a estrutura ficava num único arquivo index.html.
  Em React, quebramos isso em componentes — cada um com sua responsabilidade.

  Um componente React é simplesmente uma função que retorna JSX.
  JSX parece HTML mas é TypeScript: você pode usar expressões {}, lógica, etc.
*/

import Header   from './components/Header/Header'
import Benefits from './components/Benefits/Benefits'
import JobForm  from './components/JobForm/JobForm'
import Footer   from './components/Footer/Footer'

// FC = Function Component — tipo do React para componentes funcionais.
// Pode omitir se preferir, mas fica explícito que é um componente.
export default function App() {
  return (
    <>
      {/*
        Fragmento (<> </>) — React exige um único elemento raiz.
        O fragmento agrupa vários elementos sem adicionar uma <div> no DOM.
      */}
      <Header />
      <Benefits />
      <JobForm />
      <Footer />
    </>
  )
}
