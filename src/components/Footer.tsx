import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'
import { type Language, type content } from '../data/content'
type Content = (typeof content)[Language]

export default function Footer({ lang, t }: { lang: Language; t: Content }) {
  return <footer className="footer">
    <div className="footer-grid">
      <div><div className="brand-mark footer-brand">ΚΟΖΙ</div><p className="muted">PARKING • CAR WASH • AUTOMOTIVE CARE</p><p className="footer-note">{t.footer}</p></div>
      <div><h4>{lang === 'el' ? 'Επικοινωνία' : 'Contact'}</h4><p><MapPin size={15}/> Δημοκρατίας 21, Κοζάνη</p><p><Phone size={15}/> 24610 25066</p><p><Clock size={15}/> {t.hours}</p></div>
      <div><h4>{lang === 'el' ? 'Περιήγηση' : 'Explore'}</h4><Link to={`/${lang}/parking`}>{t.nav.parking}</Link><Link to={`/${lang}/car-wash`}>{t.nav.wash}</Link><Link to={`/${lang}/products`}>{t.nav.products}</Link><Link to={`/${lang}/contact`}>{t.nav.contact}</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ΚΟΖΙ</span><span>{lang === 'el' ? 'Πιλοτική έκδοση' : 'Pilot version'}</span></div>
  </footer>
}
