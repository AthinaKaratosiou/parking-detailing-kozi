import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useParams, Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CarFront, Droplets, Zap, ShoppingBag, Clock3, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import { content, type Language } from './data/content'

function Home({ lang, t }: { lang: Language; t: typeof content.el }) {
  const icons = [CarFront, Droplets, Zap, ShoppingBag]
  const paths = ['/parking', '/car-wash', '/ev-charging', '/products']
  return <>
    <section className="hero">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content">
        <div className="eyebrow"><span />{t.heroEyebrow}</div>
        <h1>{t.heroTitle}<br/><em>{t.heroAccent}</em></h1>
        <p>{t.heroText}</p>
        <div className="hero-actions">
          <Link className="button button-red" to={`/${lang}/parking`}>{t.bookParking}<ArrowUpRight size={17}/></Link>
          <Link className="button button-outline" to={`/${lang}/car-wash`}>{t.explore}<ArrowRight size={17}/></Link>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span>KOZI AUTOMOTIVE EXPERIENCE</span></div>
      </div>
      <div className="pilot-stamp">{t.demo}</div>
    </section>
    <section className="stats wrap">
      {t.stats.map((s, i) => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
    </section>
    <section className="intro-section section-pad wrap">
      <div className="section-kicker">{t.introLabel}</div>
      <div className="intro-grid"><h2>{t.introTitle}</h2><p>{t.introText}</p></div>
      <div className="intro-rule"><span/><span>KOZI / 2026</span></div>
    </section>
    <section className="services-section section-pad">
      <div className="wrap">
        <div className="section-kicker">{t.servicesLabel}</div>
        <div className="section-heading"><h2>{t.servicesTitle}</h2><span>01 — 04</span></div>
        <div className="service-grid">
          {t.services.map((s, i) => { const Icon = icons[i]; return <Link className="service-card" to={`/${lang}${paths[i]}`} key={s.title}>
            <div className="service-icon"><Icon size={24}/><span>0{i+1}</span></div><h3>{s.title}</h3><p>{s.text}</p><span className="service-link">{s.action}<ArrowUpRight size={16}/></span>
          </Link> })}
        </div>
      </div>
    </section>
    <section className="feature-band wrap">
      <div className="feature-photo" />
      <div className="feature-copy"><div className="section-kicker">{t.productsLabel}</div><h2>{t.productsTitle}</h2><p>{t.productsText}</p><Link className="text-link" to={`/${lang}/products`}>{t.productsAction}<ArrowRight size={17}/></Link></div>
    </section>
    <section className="gallery-preview section-pad wrap">
      <div className="section-kicker">{t.galleryLabel}</div><div className="section-heading"><h2>{t.galleryTitle}</h2><Link className="text-link" to={`/${lang}/gallery`}>{lang === 'el' ? 'Όλη η συλλογή' : 'View gallery'} <ArrowRight size={16}/></Link></div>
      <div className="gallery-grid"><div className="gallery-tile tile-one"/><div className="gallery-tile tile-two"/><div className="gallery-tile tile-three"/></div>
      <p className="muted gallery-caption">{t.galleryText}</p>
    </section>
    <section className="contact-strip">
      <div className="wrap contact-strip-inner"><div><div className="section-kicker">{t.contactLabel}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><Link className="button button-light" to={`/${lang}/contact`}>{t.nav.contact}<ArrowUpRight size={17}/></Link></div>
    </section>
  </>
}

function GenericPage({ lang, title, subtitle }: { lang: Language; title: string; subtitle: string }) {
  return <main className="generic-page wrap section-pad"><div className="section-kicker">KOZI / {lang.toUpperCase()}</div><h1>{title}</h1><p className="generic-lead">{subtitle}</p><div className="coming-panel"><Sparkles size={24}/><h2>{lang === 'el' ? 'Η ενότητα σχεδιάζεται' : 'This section is being designed'}</h2><p>{lang === 'el' ? 'Η πλήρης παρουσίαση και οι διαδραστικές λειτουργίες θα προστεθούν στο επόμενο παραδοτέο.' : 'The complete content and interactive features will be added in the next project milestone.'}</p><Link className="button button-red" to={`/${lang}/`}>{lang === 'el' ? 'Επιστροφή στην αρχική' : 'Back to home'}<ArrowRight size={16}/></Link></div></main>
}

function LangApp() {
  const { lang: rawLang } = useParams()
  const lang: Language = rawLang === 'en' ? 'en' : 'el'
  const t = content[lang]
  useEffect(() => { document.documentElement.lang = lang; document.title = `ΚΟΖΙ | ${lang === 'el' ? 'Parking • Πλυντήριο' : 'Parking • Car Wash'}` }, [lang])
  return <><Header lang={lang} setLang={() => {}} t={t}/><Routes>
    <Route index element={<Home lang={lang} t={t}/>} />
    <Route path="about" element={<GenericPage lang={lang} title={lang === 'el' ? 'Η επιχείρηση' : 'About KOZI'} subtitle={lang === 'el' ? 'Γνώρισε την ταυτότητα, τις εγκαταστάσεις και τη φιλοσοφία εξυπηρέτησης του ΚΟΖΙ.' : 'Discover KOZI, our facilities and our approach to customer service.'}/>} />
    <Route path="parking/*" element={<GenericPage lang={lang} title="Parking" subtitle={lang === 'el' ? 'Χώρος στάθμευσης 3.300 m². Πληροφορίες, επιλογές και τιμοκατάλογος.' : 'A 3,300 m² parking facility. Information, options and pricing.'}/>} />
    <Route path="car-wash/*" element={<GenericPage lang={lang} title="Car Wash" subtitle={lang === 'el' ? 'Υπηρεσίες καθαρισμού και περιποίησης αυτοκινήτου.' : 'Vehicle cleaning and detailing services.'}/>} />
    <Route path="ev-charging" element={<GenericPage lang={lang} title="EV Charging" subtitle={lang === 'el' ? 'Πληροφορίες για τη φόρτιση ηλεκτρικών οχημάτων.' : 'Information about electric vehicle charging.'}/>} />
    <Route path="products/*" element={<GenericPage lang={lang} title={lang === 'el' ? 'Προϊόντα' : 'Products'} subtitle={lang === 'el' ? 'Ο κατάλογος προϊόντων αυτοκινήτου του ΚΟΖΙ.' : 'Explore the KOZI automotive product catalogue.'}/>} />
    <Route path="gallery" element={<GenericPage lang={lang} title="Gallery" subtitle={lang === 'el' ? 'Φωτογραφίες και βίντεο από τον χώρο και τις υπηρεσίες μας.' : 'Photos and videos from our facilities and services.'}/>} />
    <Route path="reservations/*" element={<GenericPage lang={lang} title={lang === 'el' ? 'Κρατήσεις' : 'Reservations'} subtitle={lang === 'el' ? 'Προγραμμάτισε την επίσκεψή σου στο ΚΟΖΙ.' : 'Plan your visit to KOZI.'}/>} />
    <Route path="contact" element={<GenericPage lang={lang} title={lang === 'el' ? 'Επικοινωνία' : 'Contact'} subtitle={lang === 'el' ? 'Βρες μας στη Δημοκρατίας 21, Κοζάνη.' : 'Find us at 21 Dimokratias Street, Kozani, Greece.'}/>} />
    <Route path="*" element={<Navigate to={`/${lang}/`} replace/>}/>
  </Routes><Footer lang={lang} t={t}/></>
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Navigate to="/el/" replace/>}/>
    <Route path="/:lang/*" element={<LangApp/>}/>
    <Route path="*" element={<Navigate to="/el/" replace/>}/>
  </Routes>
}
