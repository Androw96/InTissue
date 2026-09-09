'use client';
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
          in<span>tissue</span>
          <i>+</i>
        </a>
        <a href="/regisztracio">Szakmai fiókom →</a>
      </header>
      <main className="admin-page">
        <div className="eyebrow">INTISSUE ADMINISZTRÁCIÓ</div>
        <h1>Regisztrációk és térítési díjak</h1>
        {loading ? (
          <p>Jogosultság ellenőrzése…</p>
        ) : !status.admin || !status.active ? (
          <div className="notice">
            Ehhez a felülethez beállított adminisztrátori jogosultság és aktív
            munkamenet szükséges.{' '}
            <a href="/regisztracio" className="text-link">
              Belépés →
            </a>
          </div>
        ) : (
          <>
            {message && (
              <p className="error" role="alert">
                {message}
              </p>
            )}
            <section className="admin-panel">
              <h2>Orvosi regisztrációk</h2>
              <p className="admin-note">
                Ellenőrizze a név és pecsétszám egyezését, az aktív működési
                jogosultságot és a regisztráló személyazonosságát.{' '}
                <a
                  href="https://kereso.enkk.hu/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  OKFŐ kereső megnyitása ↗
                </a>
              </p>
              {data?.doctors.length ? (
                data.doctors.map((d) => (
                  <Review key={d.user_id} doctor={d} done={load} />
                ))
              ) : (
                <p className="empty-note">Nincs beküldött regisztráció.</p>
              )}
            </section>
            <section className="admin-panel">
              <h2>Térítési díjak</h2>
              <p className="admin-note">
                Egész forintban, kiszerelésenként adja meg a térítési díjat.
                Csak hiteles díjtáblázat alapján töltse ki.
              </p>
              <div className="admin-grid">
                {products.flatMap((p) =>
                  p.variants.map((v) => (
                    <Fee
                      key={v.sku}
                      sku={v.sku}
                      label={v.label}
                      amount={data?.fees.find((f) => f.sku === v.sku)?.amount}
                      done={load}
                    />
                  )),
                )}
              </div>
            </section>
            <section className="admin-panel">
              <h2>Beérkezett igénylések</h2>
              {data?.requests.length ? (
                data.requests.map((r) => (
                  <div key={r.id} className="admin-record">
                    <h3>
                      {r.full_name} · {r.sku} · {r.quantity} db
                    </h3>
                    <p>
                      {r.email} · Összes térítési díj:{' '}
                      {(r.fee * r.quantity).toLocaleString('hu-HU')} Ft
                    </p>
                    <p className="fineprint">
                      Azonosító: {r.id} · Rögzített igénylés, visszaigazolás
                      szükséges.
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-note">Nincs rögzített igénylés.</p>
              )}
            </section>
          </>
        )}
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
        {d.full_name} · {d.stamp}
      </h3>
      <p>
        {d.email} · {d.institution}
      </p>
      <p>
        Állapot:{' '}
        {d.status === 'approved'
          ? 'Jóváhagyott'
          : d.status === 'rejected'
            ? 'Elutasított'
            : 'Ellenőrzésre vár'}
      </p>
      <form onSubmit={submit}>
        <label>
          Működési nyilvántartás érvényes eddig
          <input type="date" name="validUntil" />
        </label>
        <label>
          Ellenőrzés eredménye / indoklás
          <textarea
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
            A név és pecsétszám egyezik, a működési jogosultság aktív.
          </span>
        </label>
        <label className="checkbox-label">
          <Checkbox
            checked={identity}
            onCheckedChange={(v) => setIdentity(v === true)}
            aria-label="Személyazonosság ellenőrzése"
          />
          <span>A regisztráló személyazonosságát külön ellenőriztem.</span>
        </label>
        <button
          type="submit"
          value="approved"
          className="button"
          disabled={busy || !registry || !identity}
        >
          Jóváhagyás
        </button>
        <button
          type="submit"
          value="rejected"
          className="button outline"
          disabled={busy}
        >
          Elutasítás / hozzáférés visszavonása
        </button>
      </form>
      {msg && (
        <p role="status" className="notice">
          {msg}
        </p>
      )}
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
      <strong>{sku}</strong>
      <p className="fineprint">{label}</p>
      <label>
        Térítési díj / kiszerelés (Ft)
        <input
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
      <button type="submit" className="button small" disabled={busy}>
        Mentés
      </button>
      {msg && (
        <p className="fineprint" role="status">
          {msg}
        </p>
      )}
    </form>
  );
}
