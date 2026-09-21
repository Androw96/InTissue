'use client';
import {
  useLanguage,
  Text,
  LocalizedInput,
  LocalizedTextarea,
  LocalizedButton,
} from '@/app/language-provider';

import { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import SiteShell, { PageIntro } from '../site-shell';
export default function Contact() {
  const { language, t } = useLanguage();
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
          <h2 style={{ marginTop: 0 }}>
            <Text>{'Üzenet előkészítése'}</Text>
          </h2>
          <p style={{ marginBottom: 25 }}>
            <Text>
              {
                'Az űrlap kitöltése után megnyitjuk a levelezőprogramját az előkészített üzenettel. A küldést ott tudja véglegesíteni. '
              }
            </Text>
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const body = `${t('Név')}: ${f.get('name')}\nE-mail: ${f.get('email')}\n${language === 'en' ? 'Country / institution' : 'Ország / intézmény'}: ${f.get('organization')}\n${t('Megkeresés témája')}: ${f.get('topic')}\n\n${f.get('message')}`;
              window.location.href = `mailto:orsi.hajas@gmail.com?subject=${encodeURIComponent('InTissue – ' + f.get('topic'))}&body=${encodeURIComponent(body)}`;
              setPrepared(true);
            }}
          >
            <label htmlFor="contact-name">
              <Text>{'Név '}</Text>
              <LocalizedInput
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                required
              />
            </label>
            <label htmlFor="contact-email">
              <Text>{'E-mail-cím '}</Text>
              <LocalizedInput
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                required
              />
            </label>
            <label htmlFor="contact-organization">
              <Text>{'Ország / intézmény (nem kötelező) '}</Text>
              <LocalizedInput
                id="contact-organization"
                name="organization"
                autoComplete="organization"
                maxLength={150}
              />
            </label>
            <label htmlFor="contact-topic">
              <Text>{'Megkeresés témája '}</Text>
              <select id="contact-topic" name="topic">
                <option>
                  <Text>{'Általános érdeklődés'}</Text>
                </option>
                <option>
                  <Text>{'Humán termékinformáció'}</Text>
                </option>
                <option>
                  <Text>{'Állatgyógyászati termékinformáció'}</Text>
                </option>
                <option>
                  <Text>{'Szakmai együttműködés'}</Text>
                </option>
                <option>
                  <Text>{'Termékkel kapcsolatos észrevétel'}</Text>
                </option>
              </select>
            </label>
            <label htmlFor="contact-message">
              <Text>{'Üzenet '}</Text>
              <LocalizedTextarea
                id="contact-message"
                name="message"
                rows={6}
                maxLength={2000}
                required
              />
            </label>
            <p className="source-note" style={{ margin: 0 }}>
              <Text>
                {'Páciensazonosítót és egészségügyi adatot ne adjon meg.'}
              </Text>
              <Text> </Text>
              <a href="/legal">
                <Text>{'Adatkezelési információk'}</Text>
              </a>
            </p>
            <LocalizedButton className="button" type="submit">
              <Text>{'Megnyitás a levelezőben '}</Text>
              <Mail size={17} />
            </LocalizedButton>
            <Text>
              {prepared && (
                <p role="status" className="notice-panel">
                  <Text>
                    {
                      'Az üzenetet előkészítettük. Küldje el a levelezőprogramjában. Ha nem nyílt meg, írjon közvetlenül az orsi.hajas@gmail.com címre. '
                    }
                  </Text>
                </p>
              )}
            </Text>
          </form>
        </div>
        <aside className="contact-meta">
          <p className="eyebrow">
            <Text>{'INTISSUE'}</Text>
          </p>
          <h2>
            <Text>{'Elérhetőségek'}</Text>
          </h2>
          <h3>
            <Text>{'Kapcsolattartó'}</Text>
          </h3>
          <p>
            <Text>{'Hajas Orsolya'}</Text>
          </p>
          <a href="mailto:orsi.hajas@gmail.com">
            <Text>{'orsi.hajas@gmail.com'}</Text>
          </a>
          <h3>
            <Text>{'Az eredeti weboldal üzemeltetője'}</Text>
          </h3>
          <p>
            <Text>{'BARLINKA Company Kft. '}</Text>
            <br />
            <Text>{'8174 Balatonkenese, '}</Text>
            <br />
            <Text>{'Kárpátalja utca 18. '}</Text>
          </p>
          <h3>
            <Text>{'Szakmai termékkatalógus'}</Text>
          </h3>
          <p>
            <Text>
              {
                'A humán igénylés és a térítési díjak elérése ellenőrzött orvosi regisztrációhoz kötött. '
              }
            </Text>
          </p>
          <a className="button outline" href="/katalogus">
            <Text>{'A katalógushoz → '}</Text>
          </a>
          <h3>
            <Text>{'Eredeti kapcsolatfelvételi űrlap'}</Text>
          </h3>
          <p>
            <Text>
              {
                'Az InTissue eredeti oldalán általános megkeresés és állatgyógyászati termékigénylés is összeállítható. '
              }
            </Text>
          </p>
          <a
            href="https://intissue.com/contact"
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Az eredeti űrlap megnyitása'}</Text>
            <Text> </Text>
            <ArrowUpRight size={14} style={{ display: 'inline' }} />
          </a>
        </aside>
      </section>
    </SiteShell>
  );
}
