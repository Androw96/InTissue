'use client';
import { Text, LocalizedImage, LocalizedButton } from '@/app/language-provider';

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
          <Text>
            {
              'A felvételek valós műtéti jeleneteket tartalmaznak, és szakmai tájékoztatásra szolgálnak. A lejátszás külön kattintással indítható. '
            }
          </Text>
        </p>
        <Text>
          {[
            ['human', 'Humán sebészet'],
            ['animal', 'Állatgyógyászati esetek'],
          ].map(([cat, title]) => (
            <section key={cat} id={cat}>
              <h2>
                <Text>{title} </Text>
                <small
                  style={{ fontSize: 13, color: '#857475', letterSpacing: 0 }}
                >
                  <Text>{videos.filter((v) => v.category === cat).length}</Text>
                  <Text>{' videó '}</Text>
                </small>
              </h2>
              <div className="video-grid">
                <Text>
                  {videos
                    .filter((v) => v.category === cat)
                    .map((v) => (
                      <LocalizedButton
                        key={v.src}
                        type="button"
                        className="video-card"
                        onClick={() => setSelected(v)}
                        aria-label={`${v.title} – videó megnyitása`}
                      >
                        <div className="video-thumbnail">
                          <LocalizedImage
                            src={v.poster}
                            alt=""
                            loading="lazy"
                            width={640}
                            height={360}
                          />
                          <Play className="play-icon" aria-hidden="true" />
                        </div>
                        <div className="video-title-bar">
                          <h3>
                            <Text>{v.title}</Text>
                          </h3>
                          <span>
                            <Text>{v.duration}</Text>
                          </span>
                        </div>
                      </LocalizedButton>
                    ))}
                </Text>
              </div>
            </section>
          ))}
        </Text>
        <p className="source-note">
          <Text>
            {'A videók az intissue.com eredeti médiatárából töltődnek be. '}
          </Text>
        </p>
        <a className="button outline" href="/katalogus">
          <Text>{'Kapcsolódó termékek '}</Text>
          <ArrowRight size={17} />
        </a>
      </section>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="video-dialog">
          <DialogTitle>
            <Text>{selected?.title ?? 'Műtéti videó'}</Text>
          </DialogTitle>
          <DialogDescription>
            <Text>{'Valós műtéti felvétel · '}</Text>
            <Text>{selected?.duration}</Text>
            <Text>{' · InTissue '}</Text>
          </DialogDescription>
          <Text>
            {selected && (
              <>
                <video
                  key={selected.src}
                  className="video-player"
                  src={selected.src}
                  poster={selected.poster}
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
                  <Text>{'Videó megnyitása külön ablakban ↗ '}</Text>
                </a>
              </>
            )}
          </Text>
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}
