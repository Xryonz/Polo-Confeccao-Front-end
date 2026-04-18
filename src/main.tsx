/*
  MAIN.TSX — Ponto de entrada da aplicação
  =========================================
  É o equivalente do <script src="script.js"> no HTML original.
  Mas em vez de manipular o DOM diretamente, ele "monta" o React.

  StrictMode: modo de desenvolvimento que detecta problemas comuns.
  Em produção ele não tem efeito — só serve pra alertas no console.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'  // CSS global importado aqui (Vite processa automaticamente)
import App from './App'

// document.getElementById('root') — pega a <div id="root"> do index.html
// O "!" diz ao TypeScript: "tenho certeza que esse elemento existe"
// (se não existir, vai dar erro em runtime)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
