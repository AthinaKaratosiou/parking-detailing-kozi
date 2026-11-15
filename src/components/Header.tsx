import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { type Language, type content } from '../data/content'
type Content = (typeof content)[Language]

type Props = { lang: Language; setLang: (lang: Language) => void; t: Content }

export default function Header({ lang, setLang, t }: Props) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const links = [
    ['/', t.nav.home], ['/about', t.nav.about], ['/parking', t.nav.parking],
    ['/car-wash', t.nav.wash], ['/ev-charging', t.nav.ev], ['/products', t.nav.products],
    ['/gallery', t.nav.gallery], ['/contact', t.nav.contact],
  ]
  const switchLanguage = (next: Language) => {
    setLang(next)
    const path = location.pathname.replace(/^\/(el|en)/, '') || '/'
    navigate(`/${next}${path === '/' ? '/' : path}`)
  }
  return (
    <header className="site-header">
      <Link className="brand" to={`/${lang}/`} aria-label="KOZI home">
        <span className="brand-mark">ΚΟΖΙ</span>
        <span className="brand-sub">PARKING <i>•</i> CAR WASH</span>
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'main-nav is-open' : 'main-nav'}>
        {links.map(([path, label]) => (
          <Link key={path} onClick={() => setOpen(false)} className={location.pathname.endsWith(path) && path !== '/' ? 'active' : ''} to={`/${lang}${path === '/' ? '/' : path}`}>{label}</Link>
        ))}
      </nav>
      <div className="header-actions">
        <a className="phone-link" href="tel:+302461025066"><Phone size={15} /> 24610 25066</a>
        <div className="language-switch">
          <button className={lang === 'el' ? 'selected' : ''} onClick={() => switchLanguage('el')}>EL</button>
          <span>/</span>
          <button className={lang === 'en' ? 'selected' : ''} onClick={() => switchLanguage('en')}>EN</button>
        </div>
        <Link className="button button-small button-red" to={`/${lang}/reservations`}>{t.nav.book}<ChevronDown size={14}/></Link>
      </div>
    </header>
  )
}
