import { Text } from '@/app/language-provider';
import { LanguageSwitcher } from './language-provider';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <span>
          <Text>{'INTELLIGENT TISSUE SOLUTIONS'}</Text>
        </span>
        <span>
          <Text>{'A regeneráció közös tudásunk.'}</Text>
        </span>
        <LanguageSwitcher />
      </div>
      <header className="header site-header">
        <a className="logo" href="/" aria-label="InTissue főoldal"><img className="brand-mark" src="/it-logo.jpg" alt="InTissue" width={48} height={48}/><span className="brand-name" aria-hidden="true">In<span>Tissue</span></span></a>
        <nav aria-label="Fő navigáció">
          <a href="/">
            <Text>{'Főoldal'}</Text>
          </a>
          <a href="/katalogus">
            <Text>{'Termékkatalógus'}</Text>
          </a>
          <a href="/animal">
            <Text>{'Állatgyógyászat'}</Text>
          </a>
          <a href="/videos">
            <Text>{'Videótár'}</Text>
          </a>
          <a href="/team">
            <Text>{'Csapatunk'}</Text>
          </a>
          <a href="/contact">
            <Text>{'Kapcsolat'}</Text>
          </a>
        </nav>
        <a className="button small outline" href="/regisztracio">
          <Text>{'Szakmai belépés '}</Text>
          <ArrowRight size={15} />
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
          <a className="logo" href="/"><img className="brand-mark" src="/it-logo.jpg" alt="InTissue" width={48} height={48}/><span className="brand-name" aria-hidden="true">In<span>Tissue</span></span></a>
          <p>
            <Text>{'Szövetregeneráció. '}</Text>
            <br />
            <Text>{'Szakértelem. Együttműködés. '}</Text>
          </p>
        </div>
        <div>
          <h3>
            <Text>{'Fedezze fel'}</Text>
          </h3>
          <a href="/katalogus">
            <Text>{'Termékkatalógus'}</Text>
          </a>
          <a href="/animal">
            <Text>{'Állatgyógyászat'}</Text>
          </a>
          <a href="/videos">
            <Text>{'Szakmai videótár'}</Text>
          </a>
        </div>
        <div>
          <h3>
            <Text>{'InTissue'}</Text>
          </h3>
          <a href="/team">
            <Text>{'Csapatunk'}</Text>
          </a>
          <a href="/production">
            <Text>{'Kreatív és technológiai partnerek'}</Text>
          </a>
          <a href="/contact">
            <Text>{'Kapcsolat'}</Text>
          </a>
        </div>
        <div>
          <h3>
            <Text>{'Szakmai információk'}</Text>
          </h3>
          <a href="/regisztracio">
            <Text>{'Orvosi regisztráció'}</Text>
          </a>
          <a href="/legal">
            <Text>{'Adatkezelés és impresszum'}</Text>
          </a>
          <a href="https://intissue.com" target="_blank" rel="noreferrer">
            <Text>{'Eredeti InTissue oldal '}</Text>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="site-wrap footer-bottom">
        <span>
          <Text>{'© '}</Text>
          <Text>{new Date().getFullYear()}</Text>
          <Text>{' InTissue · Intelligent Tissue Solutions '}</Text>
        </span>
        <span>
          <Text>{'Humán és állatgyógyászati megoldások'}</Text>
        </span>
      </div>
    </footer>
  );
}
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="editorial">
        <Text>{children}</Text>
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
      <p className="eyebrow">
        <Text>{label}</Text>
      </p>
      <h1>
        <Text>{title}</Text>
      </h1>
      <p className="lead">
        <Text>{description}</Text>
      </p>
    </section>
  );
}
