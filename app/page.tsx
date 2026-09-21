import { Text, LocalizedImage } from '@/app/language-provider';
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
            <span />
            <Text>{' INTELLIGENT TISSUE SOLUTIONS '}</Text>
          </p>
          <h1>
            <Text>{'A regeneráció '}</Text>
            <br />
            <em>
              <Text>{'közös jövőnk.'}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {
                'Csontgraftmegoldások a humán és állatgyógyászati ellátásban. Tudás, tapasztalat és szöveti innováció — az InTissue-tól. '
              }
            </Text>
          </p>
          <div className="hero-actions">
            <a href="/katalogus" className="button">
              <Text>{'Termékek felfedezése '}</Text>
              <ArrowRight size={18} />
            </a>
            <a href="/team" className="text-link">
              <Text>{'Ismerjen meg minket '}</Text>
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-note">
            <span className="tiny-mark">
              <Text>{'+'}</Text>
            </span>
            <span>
              <Text>{'Humán és állatgyógyászati szakértelem. '}</Text>
              <br />
              <strong>
                <Text>{'Együtt a szövetregenerációért.'}</Text>
              </strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <LocalizedImage
            src="/images/hero_banner.webp"
            alt="InTissue – a szövetregeneráció világa"
            fetchPriority="high"
          />
          <div className="hero-caption">
            <span>
              <Text>{'01 / INNOVÁCIÓ A GYAKORLATBAN'}</Text>
            </span>
            <p>
              <Text>{'Apró struktúrák. '}</Text>
              <br />
              <Text>{'Új lehetőségek. '}</Text>
            </p>
          </div>
          <span className="hero-symbol" aria-hidden="true">
            <Text>{'+ '}</Text>
          </span>
        </div>
      </section>
      <div className="home-strip">
        <span>
          <Text>{'HUMÁN CSONTGRAFTOK'}</Text>
        </span>
        <span>
          <Text>{'ÁLLATGYÓGYÁSZATI MEGOLDÁSOK'}</Text>
        </span>
        <span>
          <Text>{'SZAKMAI TUDÁSMEGOSZTÁS'}</Text>
        </span>
      </div>
      <section className="site-wrap home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <Text>{'KÖZÖS ALAPOK, KÜLÖNBÖZŐ SZAKTERÜLETEK'}</Text>
            </p>
            <h2>
              <Text>{'A tudástól a gyógyításig.'}</Text>
            </h2>
          </div>
          <p>
            <Text>
              {
                'A megfelelő anyag mellett a tapasztalat is számít. Fedezze fel termékeinket és a mögöttük álló szakmai munkát. '
              }
            </Text>
          </p>
        </div>
        <div className="pathway-grid">
          <a className="pathway" href="/katalogus">
            <LocalizedImage
              src="/images/human_treatment.webp"
              alt="Humán sebészeti ellátás"
              loading="lazy"
            />
            <div>
              <span>
                <Text>{'01 / HUMÁN ELLÁTÁS'}</Text>
              </span>
              <h3>
                <Text>{'Biztos alap a csontpótláshoz.'}</Text>
              </h3>
              <p>
                <Text>{'Humán csontblokkok, sebészet és parodontológia.'}</Text>
              </p>
              <b>
                <Text>{'Humán termékkatalógus '}</Text>
                <ArrowUpRight size={20} />
              </b>
            </div>
          </a>
          <a className="pathway" href="/animal">
            <LocalizedImage
              src="/images/animal_treatment.webp"
              alt="Állatgyógyászati ellátás"
              loading="lazy"
            />
            <div>
              <span>
                <Text>{'02 / ÁLLATGYÓGYÁSZAT'}</Text>
              </span>
              <h3>
                <Text>{'Gondoskodás, fajokon át.'}</Text>
              </h3>
              <p>
                <Text>
                  {'BMG, csontchips és strukturális graftok állatok számára.'}
                </Text>
              </p>
              <b>
                <Text>{'Állatgyógyászati megoldások '}</Text>
                <ArrowUpRight size={20} />
              </b>
            </div>
          </a>
        </div>
      </section>
      <section className="benefits-section">
        <div className="site-wrap home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <Text>{'MIÉRT SZÖVETBANKI CSONTGRAFT?'}</Text>
              </p>
              <h2>
                <Text>{'A természetből. '}</Text>
                <br />
                <Text>{'A szakértelem erejével. '}</Text>
              </h2>
            </div>
            <p>
              <Text>
                {
                  'A fagyasztva szárított, sterilizált csontgraftok a sajátcsont-átültetés alternatíváját kínálják. A megfelelő termék kiválasztása mindig az adott beavatkozástól függ. '
                }
              </Text>
            </p>
          </div>
          <div className="benefit-grid">
            <Text>
              {benefits.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={25} strokeWidth={1.5} />
                  <h3>
                    <Text>{title}</Text>
                  </h3>
                  <p>
                    <Text>{text}</Text>
                  </p>
                </article>
              ))}
            </Text>
          </div>
        </div>
      </section>
      <section className="site-wrap home-section case-feature">
        <div className="case-image">
          <LocalizedImage
            src="/images/tati_dog.webp"
            alt="Táti kutya – InTissue esettanulmány"
            loading="lazy"
          />
          <span>
            <Text>{'ESETBEMUTATÁS / ÁLLATGYÓGYÁSZAT'}</Text>
          </span>
        </div>
        <div>
          <p className="eyebrow">
            <Text>{'VALÓDI ESETEK. MEGOSZTOTT TAPASZTALAT.'}</Text>
          </p>
          <h2>
            <Text>{'Minden eset '}</Text>
            <br />
            <em>
              <Text>{'egy új történet.'}</Text>
            </em>
          </h2>
          <p>
            <Text>
              {
                'Ismerje meg Táti történetét és az InTissue szakmai videóit. Humán és állatgyógyászati műtéti eljárások, regeneratív megoldások, közvetlenül a gyakorlatból. '
              }
            </Text>
          </p>
          <a className="button outline" href="/videos">
            <Text>{'Megnézem a videótárat '}</Text>
            <ArrowRight size={18} />
          </a>
          <small>
            <Text>{'A videótár műtéti felvételeket tartalmaz.'}</Text>
          </small>
        </div>
      </section>
      <section className="site-wrap home-cta">
        <div>
          <p className="eyebrow">
            <Text>{'LÉPJÜNK KAPCSOLATBA'}</Text>
          </p>
          <h2>
            <Text>{'A következő lépés '}</Text>
            <br />
            <Text>{'egy beszélgetés. '}</Text>
          </h2>
          <p>
            <Text>
              {'Termékinformációra vagy szakmai együttműködésre van szüksége?'}
            </Text>
          </p>
        </div>
        <a className="button" href="/contact">
          <Text>{'Kapcsolatfelvétel '}</Text>
          <ArrowRight size={18} />
        </a>
      </section>
    </SiteShell>
  );
}
