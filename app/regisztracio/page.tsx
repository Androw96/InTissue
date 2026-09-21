'use client';
import {
  useLanguage,
  LanguageSwitcher,
  Text,
  LocalizedInput,
  LocalizedButton,
} from '@/app/language-provider';

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
  const { language, t } = useLanguage();
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
          <Text>{'in'}</Text>
          <span>
            <Text>{'tissue'}</Text>
          </span>
          <i>
            <Text>{'+'}</Text>
          </i>
        </a>
        <a className="text-link compact" href="/katalogus">
          <ArrowLeft size={16} />
          <Text>{' Vissza a katalógushoz '}</Text>
        </a>
        <LanguageSwitcher />
      </header>
      <main className="registration">
        <aside>
          <div className="eyebrow">
            <Text>{'SZAKMAI HOZZÁFÉRÉS'}</Text>
          </div>
          <h1>
            <Text>{'Együtt a'}</Text>
            <br />
            <em>
              <Text>{'biztos alapokért.'}</Text>
            </em>
          </h1>
          <p>
            <Text>
              {
                'Regisztráljon a térítési díjak megtekintéséhez és a transzplantátumok igényléséhez. '
              }
            </Text>
          </p>
          <ol className="steps">
            <li>
              <span>
                <Text>{'01'}</Text>
              </span>
              <div>
                <h3>
                  <Text>{'Azonosítás'}</Text>
                </h3>
                <p>
                  <Text>{'Belépés, majd a szakmai adatok megadása.'}</Text>
                </p>
              </div>
            </li>
            <li>
              <span>
                <Text>{'02'}</Text>
              </span>
              <div>
                <h3>
                  <Text>{'Pecsétszám ellenőrzése'}</Text>
                </h3>
                <p>
                  <Text>
                    {
                      'Név, pecsétszám és működési jogosultság egyeztetése az OKFŐ nyilvántartásával. '
                    }
                  </Text>
                </p>
              </div>
            </li>
            <li>
              <span>
                <Text>{'03'}</Text>
              </span>
              <div>
                <h3>
                  <Text>{'Jóváhagyott hozzáférés'}</Text>
                </h3>
                <p>
                  <Text>{'Aktiválás az ellenőrzést követően.'}</Text>
                </p>
              </div>
            </li>
          </ol>
          <a
            className="text-link"
            href="https://kereso.enkk.hu/"
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'OKFŐ nyilvántartás megnyitása '}</Text>
            <ExternalLink size={15} />
          </a>
        </aside>
        <section className="form-card">
          <ShieldCheck size={32} strokeWidth={1.4} />
          <h2>
            <Text>{'Orvosi regisztráció'}</Text>
          </h2>
          <Text>
            {loading ? (
              <p role="status">
                <Text>{'Belépési állapot ellenőrzése…'}</Text>
              </p>
            ) : !status.active ? (
              <>
                <p>
                  <Text>
                    {
                      'Az InTissue bemutató szakmai felületére ChatGPT-fiókkal léphet be. Ezután adhatja meg az orvosi adatait. '
                    }
                  </Text>
                </p>
                <Text>
                  {status.signedIn ? (
                    <LocalizedButton
                      className="button wide"
                      onClick={() => void start()}
                    >
                      <Text>{'Szakmai munkamenet megnyitása '}</Text>
                      <ArrowRight size={16} />
                    </LocalizedButton>
                  ) : (
                    <a
                      className="button wide"
                      href="/signin-with-chatgpt?return_to=%2Fregisztracio"
                      target="_top"
                    >
                      <Text>{'Belépés ChatGPT-fiókkal '}</Text>
                      <ArrowRight size={16} />
                    </a>
                  )}
                </Text>
                <p className="fineprint">
                  <Text>
                    {'A munkamenet 2 perc inaktivitás után lezárul. '}
                  </Text>
                </p>
              </>
            ) : status.doctor ? (
              <>
                <div
                  className={'status-box ' + (status.approved ? 'success' : '')}
                >
                  <Clock3 size={22} />
                  <h3>
                    <Text>
                      {status.approved
                        ? 'Jóváhagyott regisztráció'
                        : status.doctor.status === 'rejected'
                          ? 'A regisztráció nem került jóváhagyásra'
                          : status.doctor.status === 'approved'
                            ? 'Lejárt szakmai hozzáférés'
                            : 'Ellenőrzésre vár'}
                    </Text>
                  </h3>
                  <p>
                    <Text>
                      {status.approved
                        ? 'A szakmai hozzáférése aktív. Megtekintheti a rögzített térítési díjakat.'
                        : 'A térítési díjak és az igénylés csak érvényes, jóváhagyott regisztrációval érhetők el.'}
                    </Text>
                  </p>
                </div>
                <dl className="profile">
                  <dt>
                    <Text>{'Orvosi név'}</Text>
                  </dt>
                  <dd>
                    <Text>{status.doctor.full_name}</Text>
                  </dd>
                  <dt>
                    <Text>{'Pecsétszám'}</Text>
                  </dt>
                  <dd>
                    <Text>{status.doctor.stamp}</Text>
                  </dd>
                  <dt>
                    <Text>{'Intézmény'}</Text>
                  </dt>
                  <dd>
                    <Text>{status.doctor.institution}</Text>
                  </dd>
                  <Text>
                    {status.doctor.review_note && (
                      <>
                        <dt>
                          <Text>{'Ellenőrzés eredménye'}</Text>
                        </dt>
                        <dd>
                          <Text>{status.doctor.review_note}</Text>
                        </dd>
                      </>
                    )}
                  </Text>
                </dl>
                <Text>
                  {status.approved && (
                    <a href="/katalogus" className="button wide">
                      <Text>{'Vissza a katalógushoz '}</Text>
                      <ArrowRight size={16} />
                    </a>
                  )}
                </Text>
              </>
            ) : (
              <form onSubmit={submit}>
                <p>
                  <Text>
                    {
                      'A teljes orvosi nevét a nyilvántartásban szereplő formában adja meg. '
                    }
                  </Text>
                </p>
                <label>
                  <Text>{'Teljes orvosi név '}</Text>
                  <LocalizedInput
                    name="fullName"
                    autoComplete="name"
                    placeholder="Dr. Vezetéknév Keresztnév"
                    minLength={5}
                    maxLength={160}
                    required
                  />
                </label>
                <label>
                  <Text>{'Orvosi pecsétszám '}</Text>
                  <LocalizedInput
                    name="stamp"
                    inputMode="numeric"
                    placeholder="Nyilvántartási szám"
                    pattern="[0-9]{1,10}"
                    maxLength={10}
                    required
                  />
                  <span className="field-help">
                    <Text>
                      {
                        'A névvel együtt ellenőrizzük. A szám megadása még nem jelent jóváhagyást. '
                      }
                    </Text>
                  </span>
                </label>
                <label>
                  <Text>{'Intézmény / rendelő '}</Text>
                  <LocalizedInput
                    name="institution"
                    autoComplete="organization"
                    placeholder="Az intézmény neve"
                    minLength={3}
                    maxLength={200}
                    required
                  />
                </label>
                <label>
                  <Text>{'E-mail-cím '}</Text>
                  <LocalizedInput value={status.email || ''} disabled />
                </label>
                <label className="checkbox-label">
                  <Checkbox
                    checked={confirmed}
                    onCheckedChange={(v) => setConfirmed(v === true)}
                    aria-label={t('Adatok helyességének megerősítése')}
                  />
                  <span>
                    <Text>
                      {
                        'Megerősítem, hogy a saját, valós szakmai adataimat adtam meg. '
                      }
                    </Text>
                  </span>
                </label>
                <LocalizedButton
                  className="button wide"
                  disabled={busy || !confirmed}
                  type="submit"
                >
                  <Text>{busy ? 'Mentés…' : 'Regisztráció beküldése'} </Text>
                  <ArrowRight size={16} />
                </LocalizedButton>
                <p className="fineprint">
                  <Text>
                    {
                      'Bemutatóverzió. Az adatokat a regisztráció ellenőrzéséhez tároljuk; a fiók nem válik automatikusan aktívvá. '
                    }
                  </Text>
                </p>
              </form>
            )}
          </Text>
          <Text>
            {(message || error) && (
              <p className="error" role="alert">
                <Text>{message || error}</Text>
              </p>
            )}
          </Text>
          <Text>
            {status.active && (
              <div className="account-actions">
                <Text>
                  {status.admin && (
                    <a href="/admin">
                      <Text>{'Adminisztráció '}</Text>
                      <ArrowRight size={15} />
                    </a>
                  )}
                </Text>
                <LocalizedButton onClick={() => void logout()}>
                  <LogOut size={15} />
                  <Text>{' Kijelentkezés '}</Text>
                </LocalizedButton>
              </div>
            )}
          </Text>
        </section>
      </main>
    </>
  );
}
