import { ArrowRight, ArrowUpRight } from 'lucide-react';
export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <span>INTELLIGENT TISSUE SOLUTIONS</span>
        <span>A regeneráció közös tudásunk.</span>
      </div>
      <header className="header site-header">
        <a className="logo" href="/" aria-label="InTissue főoldal">
          in<span>tissue</span>
          <i>+</i>
        </a>
        <nav aria-label="Fő navigáció">
          <a href="/">Főoldal</a>
          <a href="/katalogus">Termékkatalógus</a>
          <a href="/animal">Állatgyógyászat</a>
          <a href="/videos">Videótár</a>
          <a href="/team">Csapatunk</a>
          <a href="/contact">Kapcsolat</a>
        </nav>
        <a className="button small outline" href="/regisztracio">
          Szakmai belépés <ArrowRight size={15} />
        </a>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-wrap footer-grid">
        <div>
          <a className="logo" href="/">
            in<span>tissue</span>
            <i>+</i>
          </a>
          <p>
            Szövetregeneráció.
            <br />
            Szakértelem. Együttműködés.
          </p>
        </div>
        <div>
          <h3>Fedezze fel</h3>
          <a href="/katalogus">Termékkatalógus</a>
          <a href="/animal">Állatgyógyászat</a>
          <a href="/videos">Szakmai videótár</a>
        </div>
        <div>
          <h3>InTissue</h3>
          <a href="/team">Csapatunk</a>
          <a href="/production">Kreatív és technológiai partnerek</a>
          <a href="/contact">Kapcsolat</a>
        </div>
        <div>
          <h3>Szakmai információk</h3>
          <a href="/regisztracio">Orvosi regisztráció</a>
          <a href="/legal">Adatkezelés és impresszum</a>
          <a href="https://intissue.com" target="_blank" rel="noreferrer">
            Eredeti InTissue oldal <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="site-wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} InTissue · Intelligent Tissue Solutions
        </span>
        <span>Humán és állatgyógyászati megoldások</span>
      </div>
    </footer>
  );
}
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="editorial">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro site-wrap">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}
