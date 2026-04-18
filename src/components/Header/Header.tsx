/*
  HEADER.TSX — Componente de cabeçalho
  ======================================
  Extraído diretamente do <header class="site-header"> do HTML original.

  Como não tem estado (nenhum dado muda aqui), é um componente "puro" —
  sempre renderiza o mesmo resultado. Ideal para partes estáticas da UI.
*/

export default function Header() {
  return (
    <header className="site-header">
      {/*
        Em JSX, "class" é reservado pelo JavaScript.
        Por isso usamos "className" no lugar de "class".
        O Vite/Babel converte isso para class="..." no HTML final.
      */}
      <div className="header-inner">
        <ul className="nav-left">
          <li><a href="#">{/* Link 1 */}</a></li>
          <li><a href="#">{/* Link 2 */}</a></li>
          <li><a href="#">{/* Link 3 */}</a></li>
        </ul>

        <a href="#" className="logo">
          <span className="logo-brand">Polo confecção</span>
          <div className="logo-sub">
            <div className="logo-sub-line" />
            <div className="logo-diamond" />
            <div className="logo-sub-line" />
          </div>
        </a>

        <div className="header-right" />
      </div>
    </header>
  )
}
