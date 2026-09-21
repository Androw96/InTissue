import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Microscope,
  HeartPulse,
  ShieldCheck,
  Shapes,
  Stethoscope,
} from 'lucide-react';
import SiteShell from './site-shell';
const benefits = [
  {
    icon: Stethoscope,
    title: 'Egy műtéti terület',
    text: 'Az allograft alkalmazásával elkerülhető a saját csont kinyeréséhez szükséges külön beavatkozás.',
  },
  {
    icon: HeartPulse,
    title: 'Kevesebb donorhelyi terhelés',
    text: 'Nincs külön csontkivételi hely, így annak fájdalma és szövődményei sem terhelik a pácienst.',
  },
  {
    icon: Layers3,
    title: 'Tervezhető felhasználás',
    text: 'Előkészített graftok különböző kiszerelésekben, a beavatkozás igényeihez választva.',
  },
  {
    icon: Shapes,
    title: 'Szemcséktől a blokkokig',
    text: 'Változatos szemcseméretek, térfogatok és strukturális formák a csontdefektusokhoz.',
  },
  {
    icon: Microscope,
    title: 'A regeneráció támogatása',
    text: 'Az egyes graftok eltérő oszteokonduktív és oszteoinduktív tulajdonságai segítik az anyagválasztást.',
  },
  {
    icon: ShieldCheck,
    title: 'Szakmai háttér',
    text: 'Termékinformációk, felhasználási útmutatók és bemutatott műtéti esetek egy helyen.',
  },
];
export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero site-wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> INTELLIGENT TISSUE SOLUTIONS
          </p>
          <h1>
            A regeneráció
            <br />
            <em>közös jövőnk.</em>
          </h1>
          <p>
            Csontgraftmegoldások a humán és állatgyógyászati ellátásban. Tudás,
            tapasztalat és szöveti innováció — az InTissue-tól.
          </p>
          <div className="hero-actions">
            <a href="/katalogus" className="button">
              Termékek felfedezése <ArrowRight size={18} />
            </a>
            <a href="/team" className="text-link">
              Ismerjen meg minket <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-note">
            <span className="tiny-mark">+</span>
            <span>
              Humán és állatgyógyászati szakértelem.
              <br />
              <strong>Együtt a szövetregenerációért.</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/hero_banner.webp"
            alt="InTissue – a szövetregeneráció világa"
            fetchPriority="high"
          />
          <div className="hero-caption">
            <span>01 / INNOVÁCIÓ A GYAKORLATBAN</span>
            <p>
              Apró struktúrák.
              <br />
              Új lehetőségek.
            </p>
          </div>
          <span className="hero-symbol" aria-hidden="true">
            +
          </span>
        </div>
      </section>
      <div className="home-strip">
        <span>HUMÁN CSONTGRAFTOK</span>
        <span>ÁLLATGYÓGYÁSZATI MEGOLDÁSOK</span>
        <span>SZAKMAI TUDÁSMEGOSZTÁS</span>
      </div>
      <section className="site-wrap home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">KÖZÖS ALAPOK, KÜLÖNBÖZŐ SZAKTERÜLETEK</p>
            <h2>A tudástól a gyógyításig.</h2>
          </div>
          <p>
            A megfelelő anyag mellett a tapasztalat is számít. Fedezze fel
            termékeinket és a mögöttük álló szakmai munkát.
          </p>
        </div>
        <div className="pathway-grid">
          <a className="pathway" href="/katalogus">
            <img
              src="/images/human_treatment.webp"
              alt="Humán sebészeti ellátás"
              loading="lazy"
            />
            <div>
              <span>01 / HUMÁN ELLÁTÁS</span>
              <h3>Biztos alap a csontpótláshoz.</h3>
              <p>Humán csontblokkok, sebészet és parodontológia.</p>
              <b>
                Humán termékkatalógus <ArrowUpRight size={20} />
              </b>
            </div>
          </a>
          <a className="pathway" href="/animal">
            <img
              src="/images/animal_treatment.webp"
              alt="Állatgyógyászati ellátás"
              loading="lazy"
            />
            <div>
              <span>02 / ÁLLATGYÓGYÁSZAT</span>
              <h3>Gondoskodás, fajokon át.</h3>
              <p>BMG, csontchips és strukturális graftok állatok számára.</p>
              <b>
                Állatgyógyászati megoldások <ArrowUpRight size={20} />
              </b>
            </div>
          </a>
        </div>
      </section>
      <section className="benefits-section">
        <div className="site-wrap home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MIÉRT SZÖVETBANKI CSONTGRAFT?</p>
              <h2>
                A természetből.
                <br />A szakértelem erejével.
              </h2>
            </div>
            <p>
              A fagyasztva szárított, sterilizált csontgraftok a
              sajátcsont-átültetés alternatíváját kínálják. A megfelelő termék
              kiválasztása mindig az adott beavatkozástól függ.
            </p>
          </div>
          <div className="benefit-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={25} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="site-wrap home-section case-feature">
        <div className="case-image">
          <img
            src="/images/tati_dog.webp"
            alt="Táti kutya – InTissue esettanulmány"
            loading="lazy"
          />
          <span>ESETBEMUTATÁS / ÁLLATGYÓGYÁSZAT</span>
        </div>
        <div>
          <p className="eyebrow">VALÓDI ESETEK. MEGOSZTOTT TAPASZTALAT.</p>
          <h2>
            Minden eset
            <br />
            <em>egy új történet.</em>
          </h2>
          <p>
            Ismerje meg Táti történetét és az InTissue szakmai videóit. Humán és
            állatgyógyászati műtéti eljárások, regeneratív megoldások,
            közvetlenül a gyakorlatból.
          </p>
          <a className="button outline" href="/videos">
            Megnézem a videótárat <ArrowRight size={18} />
          </a>
          <small>A videótár műtéti felvételeket tartalmaz.</small>
        </div>
      </section>
      <section className="site-wrap home-cta">
        <div>
          <p className="eyebrow">LÉPJÜNK KAPCSOLATBA</p>
          <h2>
            A következő lépés
            <br />
            egy beszélgetés.
          </h2>
          <p>Termékinformációra vagy szakmai együttműködésre van szüksége?</p>
        </div>
        <a className="button" href="/contact">
          Kapcsolatfelvétel <ArrowRight size={18} />
        </a>
      </section>
    </SiteShell>
  );
}
