'use client';
import {
  useLanguage,
  Text,
  LocalizedImage,
  LocalizedInput,
  LocalizedButton,
} from '@/app/language-provider';

import { useState, useEffect } from 'react';
import VeterinaryCatalog from './veterinary-catalog';
import { SiteHeader, SiteFooter } from './site-shell';
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
export default function Catalog() {
  const { language, t } = useLanguage();
  const money = (n: number) =>
    new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
    }).format(n);

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
      <SiteHeader />
      <main>
        <Text>
          {status.active && (
            <div className="portal-banner">
              <ShieldCheck size={18} />
              <span>
                <Text>
                  {status.approved
                    ? 'Jóváhagyott szakmai hozzáférés'
                    : status.doctor
                      ? 'Regisztráció ellenőrzés alatt'
                      : 'A szakmai adatok megadása szükséges'}
                </Text>
              </span>
              <Text>
                {status.admin && (
                  <a href="/admin">
                    <Text>{'Adminisztráció'}</Text>
                  </a>
                )}
              </Text>
              <LocalizedButton
                className="button small outline"
                style={{ marginLeft: 'auto' }}
                onClick={() => void logout()}
              >
                <LogOut size={14} />
                <Text>{' Kijelentkezés '}</Text>
              </LocalizedButton>
            </div>
          )}
        </Text>
        <section className="intro">
          <div>
            <div className="eyebrow">
              <span />
              <Text>{' A REGENERÁCIÓ ALAPJAI '}</Text>
            </div>
            <h1>
              <Text>{'Csontpótlás. '}</Text>
              <br />
              <em>
                <Text>{'Biztos alapokon.'}</Text>
              </em>
            </h1>
            <p>
              <Text>
                {'Humán csontblokkok és állatgyógyászati csontgraftok. '}
              </Text>
              <br />
              <Text>{'A DIZG és az InTissue kínálata egy helyen. '}</Text>
            </p>
            <a className="text-link" href="#katalogus">
              <Text>{'Transzplantátumok megtekintése '}</Text>
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="intro-note">
            <span>
              <Text>{'HUMÁN ALLOGRAFTOK'}</Text>
            </span>
            <LocalizedImage
              src="/products/spongiosa.jpg"
              alt="DIZG spongiosa csontkockák és csontblokkok"
              width="1260"
              height="880"
            />
            <small>
              <Text>{'DIZG · Spongiosa'}</Text>
            </small>
            <span className="specimen-label">
              <span
                style={{ width: 20, height: 1, background: 'currentColor' }}
              />
              <Text> </Text>
              <Text>{'Termékfotó '}</Text>
            </span>
          </div>
        </section>
        <section className="catalog-section" id="katalogus">
          <div className="section-top">
            <div>
              <div className="eyebrow">
                <Text>{'DIZG · HUMÁN TERMÉKKATALÓGUS'}</Text>
              </div>
              <h2>
                <Text>{'Csontblokkok és ékek'}</Text>
              </h2>
            </div>
            <span className="count">
              <Text>{'03 transzplantátum-típus'}</Text>
            </span>
          </div>
          <Text>
            {loadError && (
              <p className="error" role="alert">
                <Text>{loadError}</Text>
              </p>
            )}
          </Text>
          <div className="product-grid">
            <Text>
              {products.map((p, i) => (
                <article className="product-card" key={p.id}>
                  <div className="product-visual">
                    <span className="product-index">
                      <Text>{'0'}</Text>
                      <Text>{i + 1}</Text>
                      <Text>{' / HUMÁN CSONT'}</Text>
                    </span>
                    <LocalizedImage
                      src={p.image}
                      alt={p.name + ' – DIZG termékfotó'}
                      width="1260"
                      height="880"
                      loading="lazy"
                    />
                    <span className="material">
                      <Text>{'Fagyasztva szárított'}</Text>
                    </span>
                  </div>
                  <div className="product-copy">
                    <span className="eyebrow">
                      <Text>{p.type}</Text>
                    </span>
                    <h3>
                      <Text>{p.name}</Text>
                    </h3>
                    <p>
                      <Text>{p.summary}</Text>
                    </p>
                    <div className="fee">
                      <LockKeyhole size={15} />
                      <span>
                        <Text>
                          {status.approved
                            ? 'Térítési díjak az adatlapon'
                            : 'Térítési díj szakmai hozzáféréssel'}
                        </Text>
                      </span>
                    </div>
                  </div>
                  <LocalizedButton
                    className="card-action"
                    onClick={() => openProduct(p)}
                  >
                    <Text>{'Termékadatlap '}</Text>
                    <ArrowUpRight size={18} />
                  </LocalizedButton>
                </article>
              ))}
            </Text>
          </div>
          <p className="fineprint" style={{ marginTop: 14 }}>
            <Text>
              {
                'Válogatás a DIZG gyártói portfóliójából. A rendelkezésre állás és a térítési díj külön visszaigazolás tárgya. '
              }
            </Text>
          </p>
        </section>
        <VeterinaryCatalog />
        <section className="access-band" id="hozzaferes">
          <ShieldCheck size={36} strokeWidth={1.3} />
          <div>
            <h2>
              <Text>{'Szakmai hozzáférés, ellenőrzött regisztráció.'}</Text>
            </h2>
            <p>
              <Text>
                {
                  'A regisztrációhoz orvosi név és érvényes pecsétszám szükséges. '
                }
              </Text>
            </p>
          </div>
          <a className="button" href="/regisztracio">
            <Text>{'Orvosi regisztráció '}</Text>
            <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="notes">
          <div>
            <LockKeyhole size={21} />
            <h3>
              <Text>{'Védett munkamenet'}</Text>
            </h3>
            <p>
              <Text>
                {'2 perc inaktivitás után automatikusan kijelentkeztetjük.'}
              </Text>
            </p>
          </div>
          <div>
            <ShieldCheck size={21} />
            <h3>
              <Text>{'Ellenőrzött jogosultság'}</Text>
            </h3>
            <p>
              <Text>
                {
                  'A szakmai hozzáférést az OKFŐ nyilvántartása alapján hagyjuk jóvá. '
                }
              </Text>
            </p>
          </div>
          <div>
            <CircleHelp size={21} />
            <h3>
              <Text>{'Gyártói dokumentáció'}</Text>
            </h3>
            <p>
              <Text>
                {
                  'A részletes jellemzőket és alkalmazási előírásokat a DIZG ismerteti. '
                }
              </Text>
            </p>
          </div>
        </section>
        <Text>
          {status.approved && (
            <section className="requests-list">
              <h2>
                <Text>{'Rögzített igényléseim'}</Text>
              </h2>
              <Text>
                {requests.length ? (
                  requests.map((r) => (
                    <div className="request-row" key={r.id}>
                      <strong>
                        <Text>{r.sku}</Text>
                      </strong>
                      <span>
                        <Text>{r.quantity}</Text>
                        <Text>{' db'}</Text>
                      </span>
                      <span>
                        <Text>{'Térítési díj: '}</Text>
                        <Text>{money(r.fee * r.quantity)}</Text>
                      </span>
                      <span>
                        <Text>
                          {new Date(r.created_at).toLocaleDateString(
                            language === 'en' ? 'en-GB' : 'hu-HU',
                          )}
                        </Text>
                        <Text>{' · Rögzítve '}</Text>
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="empty-note">
                    <Text>{'Még nincs rögzített igénylés.'}</Text>
                  </p>
                )}
              </Text>
            </section>
          )}
        </Text>
      </main>
      <SiteFooter />
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="dialog-content">
          <Text>
            {selected && (
              <>
                <div className="eyebrow">
                  <Text>{selected.original}</Text>
                </div>
                <DialogTitle
                  style={{ fontSize: 28, fontWeight: 400, marginBottom: 8 }}
                >
                  <Text>{selected.name}</Text>
                </DialogTitle>
                <DialogDescription className="detail-description">
                  <Text>{selected.detail}</Text>
                </DialogDescription>
                <div className="detail-layout">
                  <LocalizedImage
                    src={selected.image}
                    width="1260"
                    height="880"
                    alt={selected.name}
                  />
                  <div>
                    <h3>
                      <Text>{'Változatok és térítési díjak'}</Text>
                    </h3>
                    <div className="variant-list">
                      <Text>
                        {selected.variants.map((v) => (
                          <div key={v.sku}>
                            <span>
                              <Text>{v.label}</Text>
                              <small>
                                <Text>{v.sku}</Text>
                              </small>
                            </span>
                            <strong>
                              <Text>
                                {status.approved
                                  ? fees[v.sku] === undefined
                                    ? 'Egyeztetés alatt'
                                    : money(fees[v.sku])
                                  : 'Zárolt'}
                              </Text>
                            </strong>
                          </div>
                        ))}
                      </Text>
                    </div>
                    <a className="text-link" href={`/termekek/${selected.id}`}>
                      <Text>{'Részletes termékprofil '}</Text>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <Text>
                  {status.approved ? (
                    <form className="request-form" onSubmit={submit}>
                      <label>
                        <Text>{'Változat '}</Text>
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
                            <Text>
                              {selected.variants.map((v) => (
                                <SelectItem key={v.sku} value={v.sku}>
                                  <Text>{v.sku}</Text>
                                  <Text>{' · '}</Text>
                                  <Text>{v.label}</Text>
                                </SelectItem>
                              ))}
                            </Text>
                          </SelectContent>
                        </Select>
                      </label>
                      <label>
                        <Text>{'Mennyiség '}</Text>
                        <LocalizedInput
                          type="number"
                          min={1}
                          max={100}
                          step={1}
                          required
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                      </label>
                      <LocalizedButton
                        className="button"
                        disabled={busy || fees[sku] === undefined}
                        type="submit"
                      >
                        <Text>
                          {busy ? 'Rögzítés…' : 'Igénylés rögzítése'}{' '}
                        </Text>
                        <ArrowRight size={16} />
                      </LocalizedButton>
                      <p className="fineprint">
                        <Text>
                          {fees[sku] === undefined
                            ? 'A változat térítési díja még nincs rögzítve.'
                            : 'Összes térítési díj: ' +
                              money(fees[sku] * quantity) +
                              '. Az igénylés külön visszaigazolást igényel.'}
                        </Text>
                      </p>
                    </form>
                  ) : (
                    <div className="notice">
                      <LockKeyhole
                        size={17}
                        style={{ display: 'inline', marginRight: 10 }}
                      />
                      <Text>
                        {
                          'A térítési díjak és az igénylés jóváhagyott orvosi regisztrációval érhetők el.'
                        }
                      </Text>
                      <Text> </Text>
                      <a
                        href="/regisztracio"
                        style={{ textDecoration: 'underline' }}
                      >
                        <Text>{'Szakmai hozzáférés → '}</Text>
                      </a>
                    </div>
                  )}
                </Text>
                <Text>
                  {message && (
                    <p role="status" className="notice">
                      <Text>{message}</Text>
                    </p>
                  )}
                </Text>
                <p className="fineprint">
                  <Text>
                    {
                      'Szakmai információ. Az alkalmazási előírásokhoz mindig az aktuális gyártói dokumentáció az irányadó. '
                    }
                  </Text>
                </p>
              </>
            )}
          </Text>
        </DialogContent>
      </Dialog>
    </>
  );
}
