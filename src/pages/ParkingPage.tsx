import { useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, CarFront, Clock3, Info, CheckCircle2, ArrowRight, Bike, MapPin } from 'lucide-react'
import type { Language } from '../data/content'

type Props = { lang: Language }
type Booking = { id: string; type: string; date: string; duration: string; name: string; phone: string }

const prices = [
  { label: '1 ώρα', value: '3 €' },
  { label: 'Έως 4 ώρες', value: '5 €' },
  { label: 'Ημερήσια στάθμευση', value: '8 €' },
]
const monthly = [
  { label: 'Αυτοκίνητο', value: '65 €', icon: CarFront },
  { label: 'Μοτοσικλέτα', value: '35 €', icon: Bike },
]

export default function ParkingPage({ lang }: Props) {
  const el = lang === 'el'
  const [vehicle, setVehicle] = useState('Αυτοκίνητο')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState('1 ώρα')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')
  const [booking, setBooking] = useState<Booking | null>(null)
  const [history, setHistory] = useState<Booking[]>([])
  const minDate = new Date().toISOString().slice(0,10)
  const price = useMemo(() => duration === '1 ώρα' ? '3 €' : duration === 'Έως 4 ώρες' ? '5 €' : duration === 'Ημερήσια' ? '8 €' : 'Κατόπιν επικοινωνίας', [duration])

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!date || !name.trim() || !phone.trim()) {
      setNotice(el ? 'Συμπλήρωσε όλα τα πεδία για να συνεχίσεις.' : 'Please complete all fields to continue.')
      return
    }
    const item: Booking = { id: `KOZI-${Date.now().toString().slice(-6)}`, type: vehicle, date, duration, name: name.trim(), phone: phone.trim() }
    setBooking(item)
    setHistory(prev => [item, ...prev])
    setNotice('')
  }

  return <main className="parking-page">
    <section className="parking-hero">
      <div className="wrap parking-hero-inner">
        <div className="section-kicker">{el ? 'PARKING DETAILING KOZI · ΚΟΖΑΝΗ' : 'PARKING DETAILING KOZI · KOZANI'}</div>
        <h1>{el ? 'Στάθμευση με απλές, ξεκάθαρες επιλογές.' : 'Straightforward parking options.'}</h1>
        <p>{el ? 'Ενημερώσου για τις διαθέσιμες διάρκειες στάθμευσης και επίλεξε αυτή που εξυπηρετεί την επίσκεψή σου.' : 'Review the available parking durations and choose the option that suits your visit.'}</p>
        <div className="parking-facts">
          <span><MapPin size={16}/> {el ? 'Δημοκρατίας 21, Κοζάνη' : '21 Dimokratias Street, Kozani'}</span>
          <span><Clock3 size={16}/> {el ? 'Δευτέρα–Σάββατο 09:00–22:00' : 'Monday–Saturday 09:00–22:00'}</span>
          <span><CarFront size={16}/> 3.300 m²</span>
        </div>
      </div>
    </section>

    <section className="wrap section-pad parking-prices">
      <div className="section-kicker">{el ? 'ΤΙΜΟΚΑΤΑΛΟΓΟΣ' : 'PARKING RATES'}</div>
      <div className="parking-section-head">
        <div><h2>{el ? 'Επιλογές στάθμευσης' : 'Parking options'}</h2><p>{el ? 'Οι παρακάτω τιμές προέρχονται από την πινακίδα της επιχείρησης και χρειάζονται τελική επιβεβαίωση πριν από τη δημόσια λειτουργία.' : 'The rates below are transcribed from the business sign and require confirmation before public launch.'}</p></div>
      </div>
      <div className="parking-price-grid">
        <article className="parking-price-card"><div className="price-card-title"><CarFront/><h3>{el ? 'Βραχυχρόνια στάθμευση' : 'Short-stay parking'}</h3></div>
          {prices.map(p=><div className="price-row" key={p.label}><span>{el ? p.label : p.label === '1 ώρα' ? '1 hour' : p.label === 'Έως 4 ώρες' ? 'Up to 4 hours' : 'Daily parking'}</span><strong>{p.value}</strong></div>)}
        </article>
        <article className="parking-price-card"><div className="price-card-title"><CalendarDays/><h3>{el ? 'Μηνιαία στάθμευση' : 'Monthly parking'}</h3></div>
          {monthly.map(p=><div className="price-row" key={p.label}><span>{el ? p.label : p.label === 'Αυτοκίνητο' ? 'Car' : 'Motorcycle'}</span><strong>{p.value}</strong></div>)}
        </article>
      </div>
      <p className="parking-disclaimer"><Info size={16}/>{el ? 'Οι τιμές εμφανίζονται ενδεικτικά μέχρι να επιβεβαιωθούν από την επιχείρηση. Η μηνιαία στάθμευση απαιτεί συνεννόηση.' : 'Rates are displayed for preview until confirmed by the business. Monthly parking is subject to arrangement.'}</p>
    </section>

    <section className="parking-booking-band">
      <div className="wrap parking-booking-layout">
        <div className="parking-booking-copy"><div className="section-kicker">{el ? 'ΔΟΚΙΜΑΣΤΙΚΗ ΚΡΑΤΗΣΗ' : 'BOOKING PREVIEW'}</div><h2>{el ? 'Οργάνωσε τη στάθμευσή σου.' : 'Plan your parking.'}</h2><p>{el ? 'Συμπλήρωσε τα στοιχεία της επίσκεψής σου για να δεις πώς λειτουργεί η διαδικασία κράτησης. Η καταχώριση είναι δοκιμαστική και δεν δεσμεύει πραγματική θέση.' : 'Enter your visit details to preview the booking process. This is a demo and does not reserve an actual space.'}</p>
          <div className="booking-note"><Info size={17}/><span>{el ? 'Η κράτηση αφορά διαθεσιμότητα στον χώρο και όχι συγκεκριμένη αριθμημένη θέση.' : 'Bookings are subject to overall capacity and do not allocate a numbered space.'}</span></div>
        </div>
        <form className="parking-form" onSubmit={submit}>
          <h3>{el ? 'Στοιχεία επίσκεψης' : 'Visit details'}</h3>
          <label>{el ? 'Τύπος οχήματος' : 'Vehicle type'}</label>
          <div className="vehicle-options">
            <button type="button" className={vehicle === 'Αυτοκίνητο' ? 'vehicle-option selected' : 'vehicle-option'} onClick={()=>setVehicle('Αυτοκίνητο')}><CarFront size={18}/>{el ? 'Αυτοκίνητο' : 'Car'}</button>
            <button type="button" className={vehicle === 'Μοτοσικλέτα' ? 'vehicle-option selected' : 'vehicle-option'} onClick={()=>setVehicle('Μοτοσικλέτα')}><Bike size={18}/>{el ? 'Μοτοσικλέτα' : 'Motorcycle'}</button>
          </div>
          <label htmlFor="parking-date">{el ? 'Ημερομηνία' : 'Date'}</label>
          <input id="parking-date" type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)} required/>
          <label htmlFor="parking-duration">{el ? 'Διάρκεια' : 'Duration'}</label>
          <select id="parking-duration" value={duration} onChange={e=>setDuration(e.target.value)}>
            <option value="1 ώρα">{el ? '1 ώρα' : '1 hour'}</option><option value="Έως 4 ώρες">{el ? 'Έως 4 ώρες' : 'Up to 4 hours'}</option><option value="Ημερήσια">{el ? 'Ημερήσια' : 'Daily'}</option><option value="Μηνιαία">{el ? 'Μηνιαία' : 'Monthly'}</option>
          </select>
          <div className="demo-estimate"><span>{el ? 'Ενδεικτικό κόστος' : 'Indicative price'}</span><strong>{price}</strong></div>
          <label htmlFor="parking-name">{el ? 'Ονοματεπώνυμο' : 'Full name'}</label>
          <input id="parking-name" value={name} onChange={e=>setName(e.target.value)} placeholder={el ? 'Το όνομά σου' : 'Your name'} required/>
          <label htmlFor="parking-phone">{el ? 'Τηλέφωνο επικοινωνίας' : 'Contact phone'}</label>
          <input id="parking-phone" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="69..." required/>
          {notice && <p className="form-notice" role="alert">{notice}</p>}
          <button className="button button-red parking-submit" type="submit">{el ? 'Υποβολή δοκιμαστικής κράτησης' : 'Submit demo booking'} <ArrowRight size={16}/></button>
          <small>{el ? 'Δεν αποστέλλονται στοιχεία και δεν δημιουργείται πραγματική κράτηση.' : 'No details are transmitted and no actual booking is created.'}</small>
          {booking && <div className="booking-confirmation" role="status"><CheckCircle2/><div><strong>{el ? 'Η δοκιμαστική καταχώριση ολοκληρώθηκε' : 'Demo booking created'}</strong><span>{booking.id} · {booking.date} · {booking.duration}</span></div></div>}
        </form>
      </div>
    </section>

    {history.length > 0 && <section className="wrap section-pad demo-history"><div className="section-kicker">{el ? 'ΤΟΠΙΚΟ ΙΣΤΟΡΙΚΟ DEMO' : 'LOCAL DEMO HISTORY'}</div><h2>{el ? 'Οι δοκιμαστικές καταχωρίσεις σου' : 'Your demo entries'}</h2>{history.map(item=><div className="history-row" key={item.id}><strong>{item.id}</strong><span>{item.date} · {item.type} · {item.duration}</span></div>)}</section>}
  </main>
}
