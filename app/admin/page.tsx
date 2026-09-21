'use client';
import {
  useLanguage,
  LanguageSwitcher,
  Text,
  LocalizedInput,
  LocalizedTextarea,
  LocalizedButton,
} from '@/app/language-provider';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { products } from '@/lib/products';
import { usePortal, portalApi } from '../portal-provider';
type Doctor = {
  user_id: string;
  full_name: string;
  stamp: string;
  email: string;
  institution: string;
  status: string;
  valid_until: number | null;
};
export default function Admin() {
  const { language, t } = useLanguage();
  const { status, loading } = usePortal();
  const [data, setData] = useState<{
    doctors: Doctor[];
    fees: { sku: string; amount: number }[];
    requests: {
      id: string;
      full_name: string;
      email: string;
      sku: string;
      quantity: number;
      fee: number;
    }[];
  } | null>(null);
  const [message, setMessage] = useState('');
  async function load() {
    try {
      setData(await portalApi('admin'));
    } catch (e) {
      setMessage((e as Error).message);
    }
  }
  useEffect(() => {
    if (status.admin && status.active) void load();
    else setData(null);
  }, [status.admin, status.active]);
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
        <a href="/regisztracio">
          <Text>{'Szakmai fiókom →'}</Text>
        </a>
        <LanguageSwitcher />
      </header>
      <main className="admin-page">
        <div className="eyebrow">
          <Text>{'INTISSUE ADMINISZTRÁCIÓ'}</Text>
        </div>
        <h1>
          <Text>{'Regisztrációk és térítési díjak'}</Text>
        </h1>
        <Text>
          {loading ? (
            <p>
              <Text>{'Jogosultság ellenőrzése…'}</Text>
            </p>
          ) : !status.admin || !status.active ? (
            <div className="notice">
              <Text>
                {
                  'Ehhez a felülethez beállított adminisztrátori jogosultság és aktív munkamenet szükséges.'
                }
              </Text>
              <Text> </Text>
              <a href="/regisztracio" className="text-link">
                <Text>{'Belépés → '}</Text>
              </a>
            </div>
          ) : (
            <>
              <Text>
                {message && (
                  <p className="error" role="alert">
                    <Text>{message}</Text>
                  </p>
                )}
              </Text>
              <section className="admin-panel">
                <h2>
                  <Text>{'Orvosi regisztrációk'}</Text>
                </h2>
                <p className="admin-note">
                  <Text>
                    {
                      'Ellenőrizze a név és pecsétszám egyezését, az aktív működési jogosultságot és a regisztráló személyazonosságát.'
                    }
                  </Text>
                  <Text> </Text>
                  <a
                    href="https://kereso.enkk.hu/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    <Text>{'OKFŐ kereső megnyitása ↗ '}</Text>
                  </a>
                </p>
                <Text>
                  {data?.doctors.length ? (
                    data.doctors.map((d) => (
                      <Review key={d.user_id} doctor={d} done={load} />
                    ))
                  ) : (
                    <p className="empty-note">
                      <Text>{'Nincs beküldött regisztráció.'}</Text>
                    </p>
                  )}
                </Text>
              </section>
              <section className="admin-panel">
                <h2>
                  <Text>{'Térítési díjak'}</Text>
                </h2>
                <p className="admin-note">
                  <Text>
                    {
                      'Egész forintban, kiszerelésenként adja meg a térítési díjat. Csak hiteles díjtáblázat alapján töltse ki. '
                    }
                  </Text>
                </p>
                <div className="admin-grid">
                  <Text>
                    {products.flatMap((p) =>
                      p.variants.map((v) => (
                        <Fee
                          key={v.sku}
                          sku={v.sku}
                          label={v.label}
                          amount={
                            data?.fees.find((f) => f.sku === v.sku)?.amount
                          }
                          done={load}
                        />
                      )),
                    )}
                  </Text>
                </div>
              </section>
              <section className="admin-panel">
                <h2>
                  <Text>{'Beérkezett igénylések'}</Text>
                </h2>
                <Text>
                  {data?.requests.length ? (
                    data.requests.map((r) => (
                      <div key={r.id} className="admin-record">
                        <h3>
                          <Text>{r.full_name}</Text>
                          <Text>{' · '}</Text>
                          <Text>{r.sku}</Text>
                          <Text>{' · '}</Text>
                          <Text>{r.quantity}</Text>
                          <Text>{' db '}</Text>
                        </h3>
                        <p>
                          <Text>{r.email}</Text>
                          <Text>{' · Összes térítési díj:'}</Text>
                          <Text> </Text>
                          <Text>
                            {(r.fee * r.quantity).toLocaleString(
                              language === 'en' ? 'en-GB' : 'hu-HU',
                            )}
                          </Text>
                          <Text>{' Ft '}</Text>
                        </p>
                        <p className="fineprint">
                          <Text>{'Azonosító: '}</Text>
                          <Text>{r.id}</Text>
                          <Text>
                            {
                              ' · Rögzített igénylés, visszaigazolás szükséges. '
                            }
                          </Text>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="empty-note">
                      <Text>{'Nincs rögzített igénylés.'}</Text>
                    </p>
                  )}
                </Text>
              </section>
            </>
          )}
        </Text>
      </main>
    </>
  );
}
function Review({
  doctor: d,
  done,
}: {
  doctor: Doctor;
  done: () => Promise<void>;
}) {
  const [registry, setRegistry] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    const f = new FormData(e.currentTarget);
    const decision = (e.nativeEvent as SubmitEvent).submitter?.getAttribute(
      'value',
    );
    try {
      await portalApi('review', {
        userId: d.user_id,
        decision,
        note: f.get('note'),
        validUntil: f.get('validUntil'),
        registryConfirmed: registry,
        identityConfirmed: identity,
      });
      setMsg('A döntést mentettük.');
      await done();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-record">
      <h3>
        <Text>{d.full_name}</Text>
        <Text>{' · '}</Text>
        <Text>{d.stamp}</Text>
      </h3>
      <p>
        <Text>{d.email}</Text>
        <Text>{' · '}</Text>
        <Text>{d.institution}</Text>
      </p>
      <p>
        <Text>{'Állapot:'}</Text>
        <Text> </Text>
        <Text>
          {d.status === 'approved'
            ? 'Jóváhagyott'
            : d.status === 'rejected'
              ? 'Elutasított'
              : 'Ellenőrzésre vár'}
        </Text>
      </p>
      <form onSubmit={submit}>
        <label>
          <Text>{'Működési nyilvántartás érvényes eddig '}</Text>
          <LocalizedInput type="date" name="validUntil" />
        </label>
        <label>
          <Text>{'Ellenőrzés eredménye / indoklás '}</Text>
          <LocalizedTextarea
            name="note"
            minLength={10}
            maxLength={1500}
            required
            placeholder="Az ellenőrzés ténye, dátuma és eredménye"
          />
        </label>
        <label className="checkbox-label">
          <Checkbox
            checked={registry}
            onCheckedChange={(v) => setRegistry(v === true)}
            aria-label="Nyilvántartási egyezés"
          />
          <span>
            <Text>
              {'A név és pecsétszám egyezik, a működési jogosultság aktív. '}
            </Text>
          </span>
        </label>
        <label className="checkbox-label">
          <Checkbox
            checked={identity}
            onCheckedChange={(v) => setIdentity(v === true)}
            aria-label="Személyazonosság ellenőrzése"
          />
          <span>
            <Text>
              {'A regisztráló személyazonosságát külön ellenőriztem.'}
            </Text>
          </span>
        </label>
        <LocalizedButton
          type="submit"
          value="approved"
          className="button"
          disabled={busy || !registry || !identity}
        >
          <Text>{'Jóváhagyás '}</Text>
        </LocalizedButton>
        <LocalizedButton
          type="submit"
          value="rejected"
          className="button outline"
          disabled={busy}
        >
          <Text>{'Elutasítás / hozzáférés visszavonása '}</Text>
        </LocalizedButton>
      </form>
      <Text>
        {msg && (
          <p role="status" className="notice">
            <Text>{msg}</Text>
          </p>
        )}
      </Text>
    </div>
  );
}
function Fee({
  sku,
  label,
  amount,
  done,
}: {
  sku: string;
  label: string;
  amount?: number;
  done: () => Promise<void>;
}) {
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    const input = new FormData(e.currentTarget).get('amount');
    try {
      await portalApi('fee', { sku, amount: Number(input) });
      setMsg('Térítési díj mentve.');
      await done();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit}>
      <strong>
        <Text>{sku}</Text>
      </strong>
      <p className="fineprint">
        <Text>{label}</Text>
      </p>
      <label>
        <Text>{'Térítési díj / kiszerelés (Ft) '}</Text>
        <LocalizedInput
          key={amount}
          name="amount"
          type="number"
          required
          min={0}
          max={100000000}
          step={1}
          defaultValue={amount}
        />
      </label>
      <LocalizedButton type="submit" className="button small" disabled={busy}>
        <Text>{'Mentés '}</Text>
      </LocalizedButton>
      <Text>
        {msg && (
          <p className="fineprint" role="status">
            <Text>{msg}</Text>
          </p>
        )}
      </Text>
    </form>
  );
}
