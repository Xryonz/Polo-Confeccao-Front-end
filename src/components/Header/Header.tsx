

export default function Header() {
  return (
    <header className="site-header">
      {}
      <div className="header-inner">
        <ul className="nav-left">
          <li><a href="#">{}</a></li>
          <li><a href="#">{}</a></li>
          <li><a href="#">{}</a></li>
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
