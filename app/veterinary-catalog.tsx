'use client';
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
            <div className="eyebrow">INTISSUE · ÁLLATGYÓGYÁSZATI KATALÓGUS</div>
            <h2>Csontmátrixok és strukturális graftok</h2>
          </div>
          <span className="count">3 termékcsalád · 15 kiszerelés</span>
        </div>
        <div className="veterinary-notice">
          <PawPrint size={20} />
          <p>
            Állatgyógyászati termékek.{' '}
            <strong>Humán betegeknél nem alkalmazhatók.</strong>
          </p>
        </div>
        <div className="product-grid">
          {veterinaryProducts.map((p) => (
            <article className="product-card" key={p.id}>
              <div className={'product-visual vet-visual ' + p.id}>
                <span className="product-index">INTISSUE / VETERINARY</span>
                <img
                  src={p.image}
                  alt={p.name + ' – InTissue termékfotó'}
                  width={290}
                  height={386}
                  loading="lazy"
                />
                <span className="material">{p.origin}</span>
              </div>
              <div className="product-copy">
                <span className="eyebrow">{p.type}</span>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div className="fee">
                  <LockKeyhole size={15} />
                  <span>Referencia térítési díjak · EUR</span>
                </div>
              </div>
              <button className="card-action" onClick={() => setSelected(p)}>
                Adatlap · {p.variants.length} kiszerelés{' '}
                <ArrowUpRight size={18} />
              </button>
            </article>
          ))}
        </div>
        <p className="fineprint">
          Az intissue.com /animal tartalma alapján · Ellenőrizve: 2026.
          szeptember 9. · Tájékoztató katalógus, online állatgyógyászati
          igénylés nélkül.
        </p>
      </section>
      <section className="intissue-about" id="intissue">
        <div>
          <div className="eyebrow">INTISSUE · INTELLIGENT TISSUE SOLUTIONS</div>
          <h2>
            Szakértelem a<br />
            szövetregeneráció mögött.
          </h2>
          <p>
            Az InTissue csontgraftokkal, humán és állatgyógyászati sebészeti
            ismeretterjesztéssel foglalkozik. Honlapján szakmai videókat és
            esetbemutatásokat is közöl.
          </p>
          <p className="manufacturer">
            Az állatgyógyászati termékeknél megjelölt gyártó:
            <br />
            <strong>InTissue (Hisztolabor Ltd)</strong>
            <br />
            9026 Győr, Kocsag utca 2.
          </p>
          <a
            className="text-link"
            href={veterinarySource.home}
            target="_blank"
            rel="noreferrer"
          >
            Az InTissue eredeti weboldala <ExternalLink size={15} />
          </a>
        </div>
        <div className="source-facts">
          <article>
            <PackageCheck size={22} />
            <div>
              <h3>Fagyasztva szárított, sterilizált graftok</h3>
              <p>
                A gyártói tájékoztató szobahőmérsékletű tárolást és legfeljebb 5
                éves eltarthatóságot ad meg. Az adott csomag címkéjén
                feltüntetett lejárat az irányadó.
              </p>
            </div>
          </article>
          <article>
            <Layers3 size={22} />
            <div>
              <h3>Szemcséktől az egyedi blokkokig</h3>
              <p>
                BMG, csontszemcsék és strukturális blokkok. Egyedi méretekről a
                gyártóval szükséges egyeztetni.
              </p>
            </div>
          </article>
          <article>
            <GraduationCap size={22} />
            <div>
              <h3>Szakmai oktatás és esetbemutatások</h3>
              <p>
                A forrásoldal humán sebészeti, parodontológiai és
                állatgyógyászati videótárat mutat be.
              </p>
            </div>
          </article>
          <p className="fineprint">
            Forrás: intissue.com. A fenti tárolási összefoglaló az
            állatgyógyászati InTissue-termékekre vonatkozik; a DIZG-termékekhez
            saját gyártói dokumentációjuk tartozik.
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
          {selected && (
            <>
              <div className="eyebrow">
                INTISSUE · KIZÁRÓLAG ÁLLATGYÓGYÁSZATI FELHASZNÁLÁS
              </div>
              <DialogTitle style={{ fontSize: 28, fontWeight: 400 }}>
                {selected.name}
              </DialogTitle>
              <DialogDescription className="detail-description">
                {selected.detail}
              </DialogDescription>
              <div className="veterinary-notice">
                <PawPrint size={19} />
                <p>Nem alkalmazható humán betegeknél.</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Forrásazonosító</TableHead>
                    <TableHead>Változat</TableHead>
                    <TableHead>Kiszerelés</TableHead>
                    <TableHead className="text-right">
                      Referencia térítési díj
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selected.variants.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>#{v.id}</TableCell>
                      <TableCell>{v.label}</TableCell>
                      <TableCell>{v.pack}</TableCell>
                      <TableCell className="text-right">
                        {status.active && status.approved
                          ? fees[v.id] === undefined
                            ? 'Betöltés…'
                            : new Intl.NumberFormat('hu-HU', {
                                style: 'currency',
                                currency: 'EUR',
                                maximumFractionDigits: 0,
                              }).format(fees[v.id])
                          : 'Szakmai hozzáféréssel'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="fineprint">
                A számozás a forrásoldal terméktáblázatának azonosítója. 1 cm³ =
                1 cc. A forrásleírás és a terméktáblázat kiszerelései helyenként
                eltérnek; itt a táblázat adatai szerepelnek.
              </p>
              {error && status.approved && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              {status.approved ? (
                <p className="notice">
                  A közölt EUR összegek a forrásoldal referencia térítési díjai
                  (2026. szeptember 9.). Nem visszaigazolt ajánlatok; az
                  aktuális díj, elérhetőség és felhasználási megfelelőség külön
                  gyártói egyeztetést igényel.
                </p>
              ) : (
                <p className="notice">
                  <LockKeyhole
                    size={16}
                    style={{ display: 'inline', marginRight: 8 }}
                  />
                  A referencia térítési díjak a meglévő szakmai hozzáféréssel
                  tekinthetők meg.{' '}
                  <a
                    href="/regisztracio"
                    style={{ textDecoration: 'underline' }}
                  >
                    Belépés →
                  </a>
                </p>
              )}
              <a
                href={veterinarySource.home}
                className="text-link"
                target="_blank"
                rel="noreferrer"
              >
                InTissue – gyártói információk <ExternalLink size={15} />
              </a>
              <p className="fineprint">
                Az eredeti honlapon az „Animal treatment / Products & Info”
                menüpont tartalmazza a részletes termékinformációkat.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
