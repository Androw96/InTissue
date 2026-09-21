'use client';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock3,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { usePortal, portalApi } from '../portal-provider';
export default function Registration() {
  const { status, loading, error, start, refresh, logout } = usePortal();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const form = new FormData(e.currentTarget);
    try {
      await portalApi('register', {
        fullName: form.get('fullName'),
        stamp: form.get('stamp'),
        institution: form.get('institution'),
        confirmed,
      });
      await refresh();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header className="header">
        <a className="logo" href="/">
          in<span>tissue</span>
          <i>+</i>
        </a>
        <a className="text-link compact" href="/katalogus">
          <ArrowLeft size={16} /> Vissza a katalógushoz
        </a>
      </header>
      <main className="registration">
        <aside>
          <div className="eyebrow">SZAKMAI HOZZÁFÉRÉS</div>
          <h1>
            Együtt a<br />
            <em>biztos alapokért.</em>
          </h1>
          <p>
            Regisztráljon a térítési díjak megtekintéséhez és a
            transzplantátumok igényléséhez.
          </p>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Azonosítás</h3>
                <p>Belépés, majd a szakmai adatok megadása.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Pecsétszám ellenőrzése</h3>
                <p>
                  Név, pecsétszám és működési jogosultság egyeztetése az OKFŐ
                  nyilvántartásával.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Jóváhagyott hozzáférés</h3>
                <p>Aktiválás az ellenőrzést követően.</p>
              </div>
            </li>
          </ol>
          <a
            className="text-link"
            href="https://kereso.enkk.hu/"
            target="_blank"
            rel="noreferrer"
          >
            OKFŐ nyilvántartás megnyitása <ExternalLink size={15} />
          </a>
        </aside>
        <section className="form-card">
          <ShieldCheck size={32} strokeWidth={1.4} />
          <h2>Orvosi regisztráció</h2>
          {loading ? (
            <p role="status">Belépési állapot ellenőrzése…</p>
          ) : !status.active ? (
            <>
              <p>
                Az InTissue bemutató szakmai felületére ChatGPT-fiókkal léphet
                be. Ezután adhatja meg az orvosi adatait.
              </p>
              {status.signedIn ? (
                <button className="button wide" onClick={() => void start()}>
                  Szakmai munkamenet megnyitása <ArrowRight size={16} />
                </button>
              ) : (
                <a
                  className="button wide"
                  href="/signin-with-chatgpt?return_to=%2Fregisztracio"
                  target="_top"
                >
                  Belépés ChatGPT-fiókkal <ArrowRight size={16} />
                </a>
              )}
              <p className="fineprint">
                A munkamenet 2 perc inaktivitás után lezárul.
              </p>
            </>
          ) : status.doctor ? (
            <>
              <div
                className={'status-box ' + (status.approved ? 'success' : '')}
              >
                <Clock3 size={22} />
                <h3>
                  {status.approved
                    ? 'Jóváhagyott regisztráció'
                    : status.doctor.status === 'rejected'
                      ? 'A regisztráció nem került jóváhagyásra'
                      : status.doctor.status === 'approved'
                        ? 'Lejárt szakmai hozzáférés'
                        : 'Ellenőrzésre vár'}
                </h3>
                <p>
                  {status.approved
                    ? 'A szakmai hozzáférése aktív. Megtekintheti a rögzített térítési díjakat.'
                    : 'A térítési díjak és az igénylés csak érvényes, jóváhagyott regisztrációval érhetők el.'}
                </p>
              </div>
              <dl className="profile">
                <dt>Orvosi név</dt>
                <dd>{status.doctor.full_name}</dd>
                <dt>Pecsétszám</dt>
                <dd>{status.doctor.stamp}</dd>
                <dt>Intézmény</dt>
                <dd>{status.doctor.institution}</dd>
                {status.doctor.review_note && (
                  <>
                    <dt>Ellenőrzés eredménye</dt>
                    <dd>{status.doctor.review_note}</dd>
                  </>
                )}
              </dl>
              {status.approved && (
                <a href="/katalogus" className="button wide">
                  Vissza a katalógushoz <ArrowRight size={16} />
                </a>
              )}
            </>
          ) : (
            <form onSubmit={submit}>
              <p>
                A teljes orvosi nevét a nyilvántartásban szereplő formában adja
                meg.
              </p>
              <label>
                Teljes orvosi név
                <input
                  name="fullName"
                  autoComplete="name"
                  placeholder="Dr. Vezetéknév Keresztnév"
                  minLength={5}
                  maxLength={160}
                  required
                />
              </label>
              <label>
                Orvosi pecsétszám
                <input
                  name="stamp"
                  inputMode="numeric"
                  placeholder="Nyilvántartási szám"
                  pattern="[0-9]{1,10}"
                  maxLength={10}
                  required
                />
                <span className="field-help">
                  A névvel együtt ellenőrizzük. A szám megadása még nem jelent
                  jóváhagyást.
                </span>
              </label>
              <label>
                Intézmény / rendelő
                <input
                  name="institution"
                  autoComplete="organization"
                  placeholder="Az intézmény neve"
                  minLength={3}
                  maxLength={200}
                  required
                />
              </label>
              <label>
                E-mail-cím
                <input value={status.email || ''} disabled />
              </label>
              <label className="checkbox-label">
                <Checkbox
                  checked={confirmed}
                  onCheckedChange={(v) => setConfirmed(v === true)}
                  aria-label="Adatok helyességének megerősítése"
                />
                <span>
                  Megerősítem, hogy a saját, valós szakmai adataimat adtam meg.
                </span>
              </label>
              <button
                className="button wide"
                disabled={busy || !confirmed}
                type="submit"
              >
                {busy ? 'Mentés…' : 'Regisztráció beküldése'}{' '}
                <ArrowRight size={16} />
              </button>
              <p className="fineprint">
                Bemutatóverzió. Az adatokat a regisztráció ellenőrzéséhez
                tároljuk; a fiók nem válik automatikusan aktívvá.
              </p>
            </form>
          )}
          {(message || error) && (
            <p className="error" role="alert">
              {message || error}
            </p>
          )}
          {status.active && (
            <div className="account-actions">
              {status.admin && (
                <a href="/admin">
                  Adminisztráció <ArrowRight size={15} />
                </a>
              )}
              <button onClick={() => void logout()}>
                <LogOut size={15} /> Kijelentkezés
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
