'use client';
import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  CircleHelp,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { products, Product } from '@/lib/products';
import { usePortal, portalApi } from './portal-provider';
type RequestRow = {
  id: string;
  sku: string;
  quantity: number;
  fee: number;
  created_at: number;
};
const money = (n: number) =>
  new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0,
  }).format(n);
export default function Catalog() {
  const { status, logout } = usePortal();
  const [selected, setSelected] = useState<Product | null>(null);
  const [fees, setFees] = useState<Record<string, number>>({});
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [loadError, setLoadError] = useState('');
  const [requestId, setRequestId] = useState('');
  function openProduct(p: Product) {
    setSelected(p);
    setSku(p.variants[0].sku);
    setQuantity(1);
    setMessage('');
    setRequestId(crypto.randomUUID());
  }
  useEffect(() => {
    if (!status.active || !status.approved) {
      setFees({});
      setRequests([]);
      return;
    }
    let live = true;
    Promise.all([portalApi('fees'), portalApi('requests')])
      .then(([f, r]) => {
        if (live) {
          setFees(
            Object.fromEntries(
              f.fees.map((v: { sku: string; amount: number }) => [
                v.sku,
                v.amount,
              ]),
            ),
          );
          setRequests(r.requests);
          setLoadError('');
        }
      })
      .catch((e) => {
        if (live) setLoadError(e.message);
      });
    return () => {
      live = false;
    };
  }, [status.active, status.approved]);
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context) return;
    const life = new AbortController();
    Promise.resolve(
      context.registerTool(
        {
          name: 'open_bone_product',
          title: 'Csonttranszplantátum adatlap megnyitása',
          description:
            'Megnyitja egy katalógustermék adatlapját. Nem ad fel igénylést.',
          inputSchema: {
            type: 'object',
            properties: {
              productId: { type: 'string', enum: products.map((p) => p.id) },
            },
            required: ['productId'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute: async (input: unknown) => {
            if (
              !input ||
              typeof input !== 'object' ||
              Object.keys(input).length !== 1
            )
              throw new Error('Érvénytelen paraméter.');
            const p = products.find(
              (p) => p.id === (input as { productId?: unknown }).productId,
            );
            if (!p) throw new Error('Ismeretlen termék.');
            openProduct(p);
            return { opened: p.id, name: p.name };
          },
        },
        { signal: life.signal },
      ),
    ).catch(() => {});
    return () => life.abort();
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const result = await portalApi('request', {
        sku,
        quantity,
        fee: fees[sku],
        requestId,
      });
      setMessage(
        'Az igénylést rögzítettük. Azonosító: ' + result.id.slice(0, 8),
      );
      setRequests((await portalApi('requests')).requests);
      setRequestId(crypto.randomUUID());
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="topbar">
        <span>HUMÁN SZÖVETPÓTLÁS · SZAKMAI PORTÁL</span>
        <span>Orvosok és egészségügyi intézmények számára</span>
      </div>
      <header className="header">
        <a className="logo" href="/">
          in<span>tissue</span>
          <i>+</i>
        </a>
        <nav>
          <a className="active" href="#katalogus">
            Transzplantátumok
          </a>
          <a href="#hozzaferes">Szakmai hozzáférés</a>
          <a href="https://dizg.de" target="_blank" rel="noreferrer">
            A DIZG-ről <ArrowUpRight size={14} />
          </a>
        </nav>
        <a className="button small outline" href="/regisztracio">
          {status.active ? 'Szakmai fiókom' : 'Orvosi belépés'}{' '}
          <ArrowRight size={16} />
        </a>
      </header>
      <main>
        {status.active && (
          <div className="portal-banner">
            <ShieldCheck size={18} />
            <span>
              {status.approved
                ? 'Jóváhagyott szakmai hozzáférés'
                : status.doctor
                  ? 'Regisztráció ellenőrzés alatt'
                  : 'A szakmai adatok megadása szükséges'}
            </span>
            {status.admin && <a href="/admin">Adminisztráció</a>}
            <button
              className="button small outline"
              style={{ marginLeft: 'auto' }}
              onClick={() => void logout()}
            >
              <LogOut size={14} /> Kijelentkezés
            </button>
          </div>
        )}
        <section className="intro">
          <div>
            <div className="eyebrow">
              <span /> A REGENERÁCIÓ ALAPJAI
            </div>
            <h1>
              Csontpótlás.
              <br />
              <em>Biztos alapokon.</em>
            </h1>
            <p>
              Humán csontblokkok és strukturális transzplantátumok.
              <br />
              Ismerje meg a DIZG kínálatát egy helyen.
            </p>
            <a className="text-link" href="#katalogus">
              Transzplantátumok megtekintése <ArrowRight size={18} />
            </a>
          </div>
          <div className="intro-note">
            <span>HUMÁN ALLOGRAFTOK</span>
            <img
              src="/products/spongiosa.jpg"
              alt="DIZG spongiosa csontkockák és csontblokkok"
              width="1260"
              height="880"
            />
            <small>DIZG · Spongiosa</small>
            <span className="specimen-label">
              <span
                style={{ width: 20, height: 1, background: 'currentColor' }}
              />{' '}
              Termékfotó
            </span>
          </div>
        </section>
        <section className="catalog-section" id="katalogus">
          <div className="section-top">
            <div>
              <div className="eyebrow">TERMÉKKATALÓGUS</div>
              <h2>Csontblokkok és ékek</h2>
            </div>
            <span className="count">03 transzplantátum-típus</span>
          </div>
          {loadError && (
            <p className="error" role="alert">
              {loadError}
            </p>
          )}
          <div className="product-grid">
            {products.map((p, i) => (
              <article className="product-card" key={p.id}>
                <div className="product-visual">
                  <span className="product-index">0{i + 1} / HUMÁN CSONT</span>
                  <img
                    src={p.image}
                    alt={p.name + ' – DIZG termékfotó'}
                    width="1260"
                    height="880"
                    loading="lazy"
                  />
                  <span className="material">Fagyasztva szárított</span>
                </div>
                <div className="product-copy">
                  <span className="eyebrow">{p.type}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <div className="fee">
                    <LockKeyhole size={15} />
                    <span>
                      {status.approved
                        ? 'Térítési díjak az adatlapon'
                        : 'Térítési díj szakmai hozzáféréssel'}
                    </span>
                  </div>
                </div>
                <button className="card-action" onClick={() => openProduct(p)}>
                  Termékadatlap <ArrowUpRight size={18} />
                </button>
              </article>
            ))}
          </div>
          <p className="fineprint" style={{ marginTop: 14 }}>
            Válogatás a DIZG gyártói portfóliójából. A rendelkezésre állás és a
            térítési díj külön visszaigazolás tárgya.
          </p>
        </section>
        <section className="access-band" id="hozzaferes">
          <ShieldCheck size={36} strokeWidth={1.3} />
          <div>
            <h2>Szakmai hozzáférés, ellenőrzött regisztráció.</h2>
            <p>
              A regisztrációhoz orvosi név és érvényes pecsétszám szükséges.
            </p>
          </div>
          <a className="button" href="/regisztracio">
            Orvosi regisztráció <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="notes">
          <div>
            <LockKeyhole size={21} />
            <h3>Védett munkamenet</h3>
            <p>2 perc inaktivitás után automatikusan kijelentkeztetjük.</p>
          </div>
          <div>
            <ShieldCheck size={21} />
            <h3>Ellenőrzött jogosultság</h3>
            <p>
              A szakmai hozzáférést az OKFŐ nyilvántartása alapján hagyjuk jóvá.
            </p>
          </div>
          <div>
            <CircleHelp size={21} />
            <h3>Gyártói dokumentáció</h3>
            <p>
              A részletes jellemzőket és alkalmazási előírásokat a DIZG
              ismerteti.
            </p>
          </div>
        </section>
        {status.approved && (
          <section className="requests-list">
            <h2>Rögzített igényléseim</h2>
            {requests.length ? (
              requests.map((r) => (
                <div className="request-row" key={r.id}>
                  <strong>{r.sku}</strong>
                  <span>{r.quantity} db</span>
                  <span>Térítési díj: {money(r.fee * r.quantity)}</span>
                  <span>
                    {new Date(r.created_at).toLocaleDateString('hu-HU')} ·
                    Rögzítve
                  </span>
                </div>
              ))
            ) : (
              <p className="empty-note">Még nincs rögzített igénylés.</p>
            )}
          </section>
        )}
      </main>
      <footer>
        <a className="logo" href="/">
          in<span>tissue</span>
          <i>+</i>
        </a>
        <span>Szakmai katalógus · Privát bemutató · Termékfotók: DIZG</span>
        <a href="https://kereso.enkk.hu/" target="_blank" rel="noreferrer">
          OKFŐ nyilvántartás <ArrowUpRight size={14} />
        </a>
      </footer>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="dialog-content">
          {selected && (
            <>
              <div className="eyebrow">{selected.original}</div>
              <DialogTitle
                style={{ fontSize: 28, fontWeight: 400, marginBottom: 8 }}
              >
                {selected.name}
              </DialogTitle>
              <DialogDescription className="detail-description">
                {selected.detail}
              </DialogDescription>
              <div className="detail-layout">
                <img
                  src={selected.image}
                  width="1260"
                  height="880"
                  alt={selected.name}
                />
                <div>
                  <h3>Változatok és térítési díjak</h3>
                  <div className="variant-list">
                    {selected.variants.map((v) => (
                      <div key={v.sku}>
                        <span>
                          {v.label}
                          <small>{v.sku}</small>
                        </span>
                        <strong>
                          {status.approved
                            ? fees[v.sku] === undefined
                              ? 'Egyeztetés alatt'
                              : money(fees[v.sku])
                            : 'Zárolt'}
                        </strong>
                      </div>
                    ))}
                  </div>
                  <a
                    className="text-link"
                    href={selected.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gyártói adatlap és dokumentáció <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              {status.approved ? (
                <form className="request-form" onSubmit={submit}>
                  <label>
                    Változat
                    <Select
                      value={sku}
                      onValueChange={(v) => {
                        if (v) setSku(v);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selected.variants.map((v) => (
                          <SelectItem key={v.sku} value={v.sku}>
                            {v.sku} · {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>
                  <label>
                    Mennyiség
                    <input
                      type="number"
                      min={1}
                      max={100}
                      step={1}
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </label>
                  <button
                    className="button"
                    disabled={busy || fees[sku] === undefined}
                    type="submit"
                  >
                    {busy ? 'Rögzítés…' : 'Igénylés rögzítése'}{' '}
                    <ArrowRight size={16} />
                  </button>
                  <p className="fineprint">
                    {fees[sku] === undefined
                      ? 'A változat térítési díja még nincs rögzítve.'
                      : 'Összes térítési díj: ' +
                        money(fees[sku] * quantity) +
                        '. Az igénylés külön visszaigazolást igényel.'}
                  </p>
                </form>
              ) : (
                <div className="notice">
                  <LockKeyhole
                    size={17}
                    style={{ display: 'inline', marginRight: 10 }}
                  />
                  A térítési díjak és az igénylés jóváhagyott orvosi
                  regisztrációval érhetők el.{' '}
                  <a
                    href="/regisztracio"
                    style={{ textDecoration: 'underline' }}
                  >
                    Szakmai hozzáférés →
                  </a>
                </div>
              )}
              {message && (
                <p role="status" className="notice">
                  {message}
                </p>
              )}
              <p className="fineprint">
                Szakmai információ. Az alkalmazási előírásokhoz mindig az
                aktuális gyártói dokumentáció az irányadó.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
