'use client';
import {
  useLanguage,
  Text,
  LocalizedImage,
  LocalizedButton,
} from '@/app/language-provider';

import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  LockKeyhole,
  PawPrint,
  PackageCheck,
  Layers3,
  GraduationCap,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { veterinaryProducts, veterinarySource } from '@/lib/veterinary';
import { portalApi, usePortal } from './portal-provider';
export default function VeterinaryCatalog() {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState<
    (typeof veterinaryProducts)[number] | null
  >(null);
  const { status } = usePortal();
  const [fees, setFees] = useState<Record<number, number>>({});
  const [error, setError] = useState('');
  useEffect(() => {
    if (!status.active || !status.approved) {
      setFees({});
      return;
    }
    let live = true;
    portalApi('veterinary-fees')
      .then((data) => {
        if (live) {
          setFees(Object.fromEntries(data.fees.map((f) => [f.id, f.amount])));
          setError('');
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [status.active, status.approved]);
  return (
    <>
      <section
        className="catalog-section veterinary-section"
        id="allatgyogyaszat"
      >
        <div className="section-top">
          <div>
            <div className="eyebrow">
              <Text>{'INTISSUE · ÁLLATGYÓGYÁSZATI KATALÓGUS'}</Text>
            </div>
            <h2>
              <Text>{'Csontmátrixok és strukturális graftok'}</Text>
            </h2>
          </div>
          <span className="count">
            <Text>{'3 termékcsalád · 15 kiszerelés'}</Text>
          </span>
        </div>
        <div className="veterinary-notice">
          <PawPrint size={20} />
          <p>
            <Text>{'Állatgyógyászati termékek.'}</Text>
            <Text> </Text>
            <strong>
              <Text>{'Humán betegeknél nem alkalmazhatók.'}</Text>
            </strong>
          </p>
        </div>
        <div className="product-grid">
          <Text>
            {veterinaryProducts.map((p) => (
              <article className="product-card" key={p.id}>
                <div className={'product-visual vet-visual ' + p.id}>
                  <span className="product-index">
                    <Text>{'INTISSUE / VETERINARY'}</Text>
                  </span>
                  <LocalizedImage
                    src={p.image}
                    alt={p.name + ' – InTissue termékfotó'}
                    width={290}
                    height={386}
                    loading="lazy"
                  />
                  <span className="material">
                    <Text>{p.origin}</Text>
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
                      <Text>{'Referencia térítési díjak · EUR'}</Text>
                    </span>
                  </div>
                </div>
                <LocalizedButton
                  className="card-action"
                  onClick={() => setSelected(p)}
                >
                  <Text>{'Adatlap · '}</Text>
                  <Text>{p.variants.length}</Text>
                  <Text>{' kiszerelés'}</Text>
                  <Text> </Text>
                  <ArrowUpRight size={18} />
                </LocalizedButton>
              </article>
            ))}
          </Text>
        </div>
        <p className="fineprint">
          <Text>
            {
              'Az intissue.com /animal tartalma alapján · Ellenőrizve: 2026. szeptember 9. · Tájékoztató katalógus, online állatgyógyászati igénylés nélkül. '
            }
          </Text>
        </p>
      </section>
      <section className="intissue-about" id="intissue">
        <div>
          <div className="eyebrow">
            <Text>{'INTISSUE · INTELLIGENT TISSUE SOLUTIONS'}</Text>
          </div>
          <h2>
            <Text>{'Szakértelem a'}</Text>
            <br />
            <Text>{'szövetregeneráció mögött. '}</Text>
          </h2>
          <p>
            <Text>
              {
                'Az InTissue csontgraftokkal, humán és állatgyógyászati sebészeti ismeretterjesztéssel foglalkozik. Honlapján szakmai videókat és esetbemutatásokat is közöl. '
              }
            </Text>
          </p>
          <p className="manufacturer">
            <Text>{'Az állatgyógyászati termékeknél megjelölt gyártó: '}</Text>
            <br />
            <strong>
              <Text>{'InTissue (Hisztolabor Ltd)'}</Text>
            </strong>
            <br />
            <Text>{'9026 Győr, Kocsag utca 2. '}</Text>
          </p>
          <a
            className="text-link"
            href={veterinarySource.home}
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Az InTissue eredeti weboldala '}</Text>
            <ExternalLink size={15} />
          </a>
        </div>
        <div className="source-facts">
          <article>
            <PackageCheck size={22} />
            <div>
              <h3>
                <Text>{'Fagyasztva szárított, sterilizált graftok'}</Text>
              </h3>
              <p>
                <Text>
                  {
                    'A gyártói tájékoztató szobahőmérsékletű tárolást és legfeljebb 5 éves eltarthatóságot ad meg. Az adott csomag címkéjén feltüntetett lejárat az irányadó. '
                  }
                </Text>
              </p>
            </div>
          </article>
          <article>
            <Layers3 size={22} />
            <div>
              <h3>
                <Text>{'Szemcséktől az egyedi blokkokig'}</Text>
              </h3>
              <p>
                <Text>
                  {
                    'BMG, csontszemcsék és strukturális blokkok. Egyedi méretekről a gyártóval szükséges egyeztetni. '
                  }
                </Text>
              </p>
            </div>
          </article>
          <article>
            <GraduationCap size={22} />
            <div>
              <h3>
                <Text>{'Szakmai oktatás és esetbemutatások'}</Text>
              </h3>
              <p>
                <Text>
                  {
                    'A forrásoldal humán sebészeti, parodontológiai és állatgyógyászati videótárat mutat be. '
                  }
                </Text>
              </p>
            </div>
          </article>
          <p className="fineprint">
            <Text>
              {
                'Forrás: intissue.com. A fenti tárolási összefoglaló az állatgyógyászati InTissue-termékekre vonatkozik; a DIZG-termékekhez saját gyártói dokumentációjuk tartozik. '
              }
            </Text>
          </p>
        </div>
      </section>
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
                  <Text>
                    {'INTISSUE · KIZÁRÓLAG ÁLLATGYÓGYÁSZATI FELHASZNÁLÁS '}
                  </Text>
                </div>
                <DialogTitle style={{ fontSize: 28, fontWeight: 400 }}>
                  <Text>{selected.name}</Text>
                </DialogTitle>
                <DialogDescription className="detail-description">
                  <Text>{selected.detail}</Text>
                </DialogDescription>
                <div className="veterinary-notice">
                  <PawPrint size={19} />
                  <p>
                    <Text>{'Nem alkalmazható humán betegeknél.'}</Text>
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Text>{'Forrásazonosító'}</Text>
                      </TableHead>
                      <TableHead>
                        <Text>{'Változat'}</Text>
                      </TableHead>
                      <TableHead>
                        <Text>{'Kiszerelés'}</Text>
                      </TableHead>
                      <TableHead className="text-right">
                        <Text>{'Referencia térítési díj '}</Text>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <Text>
                      {selected.variants.map((v) => (
                        <TableRow key={v.id}>
                          <TableCell>
                            <Text>{'#'}</Text>
                            <Text>{v.id}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{v.label}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{v.pack}</Text>
                          </TableCell>
                          <TableCell className="text-right">
                            <Text>
                              {status.active && status.approved
                                ? fees[v.id] === undefined
                                  ? 'Betöltés…'
                                  : new Intl.NumberFormat(
                                      language === 'en' ? 'en-GB' : 'hu-HU',
                                      {
                                        style: 'currency',
                                        currency: 'EUR',
                                        maximumFractionDigits: 0,
                                      },
                                    ).format(fees[v.id])
                                : 'Szakmai hozzáféréssel'}
                            </Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Text>
                  </TableBody>
                </Table>
                <p className="fineprint">
                  <Text>
                    {
                      'A számozás a forrásoldal terméktáblázatának azonosítója. 1 cm³ = 1 cc. A forrásleírás és a terméktáblázat kiszerelései helyenként eltérnek; itt a táblázat adatai szerepelnek. '
                    }
                  </Text>
                </p>
                <Text>
                  {error && status.approved && (
                    <p className="error" role="alert">
                      <Text>{error}</Text>
                    </p>
                  )}
                </Text>
                <Text>
                  {status.approved ? (
                    <p className="notice">
                      <Text>
                        {
                          'A közölt EUR összegek a forrásoldal referencia térítési díjai (2026. szeptember 9.). Nem visszaigazolt ajánlatok; az aktuális díj, elérhetőség és felhasználási megfelelőség külön gyártói egyeztetést igényel. '
                        }
                      </Text>
                    </p>
                  ) : (
                    <p className="notice">
                      <LockKeyhole
                        size={16}
                        style={{ display: 'inline', marginRight: 8 }}
                      />
                      <Text>
                        {
                          'A referencia térítési díjak a meglévő szakmai hozzáféréssel tekinthetők meg.'
                        }
                      </Text>
                      <Text> </Text>
                      <a
                        href="/regisztracio"
                        style={{ textDecoration: 'underline' }}
                      >
                        <Text>{'Belépés → '}</Text>
                      </a>
                    </p>
                  )}
                </Text>
                <a
                  href={veterinarySource.home}
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text>{'InTissue – gyártói információk '}</Text>
                  <ExternalLink size={15} />
                </a>
                <p className="fineprint">
                  <Text>
                    {
                      'Az eredeti honlapon az „Animal treatment / Products & Info” menüpont tartalmazza a részletes termékinformációkat. '
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
