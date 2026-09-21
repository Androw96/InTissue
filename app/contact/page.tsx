'use client';
import { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import SiteShell, { PageIntro } from '../site-shell';
export default function Contact() {
  const [prepared, setPrepared] = useState(false);
  return (
    <SiteShell>
      <PageIntro
        label="KAPCSOLAT"
        title="Beszéljünk a lehetőségekről."
        description="Termékekkel, együttműködéssel vagy szakmai kérdéssel kapcsolatban az InTissue eredeti kapcsolattartójához fordulhat."
      />
      <section className="site-wrap content-section content-grid">
        <div className="content-card">
          <h2 style={{ marginTop: 0 }}>Üzenet előkészítése</h2>
          <p style={{ marginBottom: 25 }}>
            Az űrlap kitöltése után megnyitjuk a levelezőprogramját az
            előkészített üzenettel. A küldést ott tudja véglegesíteni.
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const body = `Név: ${f.get('name')}\nE-mail: ${f.get('email')}\nOrszág / intézmény: ${f.get('organization')}\nTéma: ${f.get('topic')}\n\n${f.get('message')}`;
              window.location.href = `mailto:orsi.hajas@gmail.com?subject=${encodeURIComponent('InTissue – ' + f.get('topic'))}&body=${encodeURIComponent(body)}`;
              setPrepared(true);
            }}
          >
            <label htmlFor="contact-name">
              Név
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="contact-email">
              E-mail-cím
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                required
              />
            </label>
            <label htmlFor="contact-organization">
              Ország / intézmény (nem kötelező)
              <input
                id="contact-organization"
                name="organization"
                autoComplete="organization"
                maxLength={150}
              />
            </label>
            <label htmlFor="contact-topic">
              Megkeresés témája
              <select id="contact-topic" name="topic">
                <option>Általános érdeklődés</option>
                <option>Humán termékinformáció</option>
                <option>Állatgyógyászati termékinformáció</option>
                <option>Szakmai együttműködés</option>
                <option>Termékkel kapcsolatos észrevétel</option>
              </select>
            </label>
            <label htmlFor="contact-message">
              Üzenet
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                maxLength={2000}
                required
              />
            </label>
            <p className="source-note" style={{ margin: 0 }}>
              Páciensazonosítót és egészségügyi adatot ne adjon meg.{' '}
              <a href="/legal">Adatkezelési információk</a>
            </p>
            <button className="button" type="submit">
              Megnyitás a levelezőben <Mail size={17} />
            </button>
            {prepared && (
              <p role="status" className="notice-panel">
                Az üzenetet előkészítettük. Küldje el a levelezőprogramjában. Ha
                nem nyílt meg, írjon közvetlenül az orsi.hajas@gmail.com címre.
              </p>
            )}
          </form>
        </div>
        <aside className="contact-meta">
          <p className="eyebrow">INTISSUE</p>
          <h2>Elérhetőségek</h2>
          <h3>Kapcsolattartó</h3>
          <p>Hajas Orsolya</p>
          <a href="mailto:orsi.hajas@gmail.com">orsi.hajas@gmail.com</a>
          <h3>Az eredeti weboldal üzemeltetője</h3>
          <p>
            BARLINKA Company Kft.
            <br />
            8174 Balatonkenese,
            <br />
            Kárpátalja utca 18.
          </p>
          <h3>Szakmai termékkatalógus</h3>
          <p>
            A humán igénylés és a térítési díjak elérése ellenőrzött orvosi
            regisztrációhoz kötött.
          </p>
          <a className="button outline" href="/katalogus">
            A katalógushoz →
          </a>
          <h3>Eredeti kapcsolatfelvételi űrlap</h3>
          <p>
            Az InTissue eredeti oldalán általános megkeresés és állatgyógyászati
            termékigénylés is összeállítható.
          </p>
          <a
            href="https://intissue.com/contact"
            target="_blank"
            rel="noreferrer"
          >
            Az eredeti űrlap megnyitása{' '}
            <ArrowUpRight size={14} style={{ display: 'inline' }} />
          </a>
        </aside>
      </section>
    </SiteShell>
  );
}
