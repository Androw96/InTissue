'use client';
import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import SiteShell, { PageIntro } from '../site-shell';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { videos } from '@/lib/videos';
export default function Videos() {
  const [selected, setSelected] = useState<(typeof videos)[number] | null>(
    null,
  );
  return (
    <SiteShell>
      <PageIntro
        label="TUDÁS A GYAKORLATBÓL"
        title="Szakmai videótár."
        description="Műtéti technikák, regeneratív eljárások és esettanulmányok az InTissue humán és állatgyógyászati gyakorlatából."
      />
      <section className="site-wrap content-section">
        <p className="notice-panel">
          A felvételek valós műtéti jeleneteket tartalmaznak, és szakmai
          tájékoztatásra szolgálnak. A lejátszás külön kattintással indítható.
        </p>
        {[
          ['human', 'Humán sebészet'],
          ['animal', 'Állatgyógyászati esetek'],
        ].map(([cat, title]) => (
          <section key={cat} id={cat}>
            <h2>
              {title}{' '}
              <small
                style={{ fontSize: 13, color: '#768574', letterSpacing: 0 }}
              >
                {videos.filter((v) => v.category === cat).length} videó
              </small>
            </h2>
            <div className="video-grid">
              {videos
                .filter((v) => v.category === cat)
                .map((v) => (
                  <button
                    key={v.src}
                    type="button"
                    className="video-card"
                    onClick={() => setSelected(v)}
                    aria-label={`${v.title} – videó megnyitása`}
                  >
                    <Play className="play-icon" />
                    <div>
                      <h3>{v.title}</h3>
                      <span>
                        {v.duration} / {v.originalTitle}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </section>
        ))}
        <p className="source-note">
          A videók az intissue.com eredeti médiatárából töltődnek be.
        </p>
        <a className="button outline" href="/katalogus">
          Kapcsolódó termékek <ArrowRight size={17} />
        </a>
      </section>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="video-dialog">
          <DialogTitle>{selected?.title ?? 'Műtéti videó'}</DialogTitle>
          <DialogDescription>
            Valós műtéti felvétel · {selected?.duration} · InTissue
          </DialogDescription>
          {selected && (
            <>
              <video
                key={selected.src}
                className="video-player"
                src={selected.src}
                controls
                playsInline
                preload="none"
              />
              <a
                className="text-link"
                href={selected.src}
                target="_blank"
                rel="noreferrer"
              >
                Videó megnyitása külön ablakban ↗
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}
