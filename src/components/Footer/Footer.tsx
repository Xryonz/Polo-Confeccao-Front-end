
const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5547992816481',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
]


const contactItems = [
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    content: <a href="tel:5547992816481">(47) 99281-6481</a>,
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    content: <a href="mailto:polofaccao@gmail.com">polofaccao@gmail.com</a>,
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    content: <span>[ Endereço completo ]</span>,
  },
  {
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    content: <span>Seg – Sex, 08h às 18h</span>,
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      {}
      <div className="footer-top">
        <div className="footer-logo-wrap">
          <span className="footer-logo-brand">Polo confecção</span>
          <div className="footer-logo-sub">
            <div className="footer-logo-line" />
            <div className="footer-logo-diamond" />
            <div className="footer-logo-line" />
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      {}
      <div className="footer-mid">
        <div className="footer-social-block">
          <span className="footer-block-label">Redes Sociais</span>
          <div className="footer-social-links">
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} className="footer-social-item">
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-mid-divider" />

        <div className="footer-contact-block">
          <span className="footer-block-label">Contato</span>
          <ul className="footer-contact-list">
            {contactItems.map((item, i) => (
              <li key={i}>
                {item.icon}
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-divider" />

      {}
      <div className="footer-bottom">
        <span className="footer-copy">
          © 2017 – 2026 Polo confecção — Todos os direitos reservados
        </span>
      </div>
    </footer>
  )
}
