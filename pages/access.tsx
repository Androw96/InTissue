import SiteShell, { PageIntro } from '../app/site-shell';
import { useLanguage } from '../app/language-provider';
export default function Access() {
  const { language } = useLanguage();
  const en = language === 'en';
  return <SiteShell>
    <PageIntro label="INTISSUE" title={en ? 'Professional access' : 'Szakmai hozzáférés'} description={en ? 'Professional registration and protected reimbursement fees are not yet available on this website.' : 'Az orvosi regisztráció és a védett térítési díjak ezen az oldalon még nem érhetők el.'} />
    <section className="site-wrap content-section">
      <p>{en ? 'Browse the product information and videos, or contact us with your enquiry. No registration details are collected here.' : 'A termékismertetők és a videók szabadon böngészhetők. Érdeklődésével forduljon hozzánk; ezen az oldalon regisztrációs adatokat nem kérünk.'}</p>
      <a className="button" href="/InTissue/contact/">{en ? 'Contact us' : 'Kapcsolatfelvétel'}</a>
    </section>
  </SiteShell>;
}
