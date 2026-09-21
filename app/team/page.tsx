import SiteShell, { PageIntro } from '../site-shell';
import { team } from '@/lib/team';
export default function Team() {
  return (
    <SiteShell>
      <PageIntro
        label="AKIK AZ INTISSUE MÖGÖTT ÁLLNAK"
        title="Szakértelem, amely összeköt."
        description="Sebészek, kutatók és állatorvosok közös munkája a regeneratív medicina területén. Ismerje meg az InTissue szakmai közösségét."
      />
      <section className="site-wrap content-section">
        {[
          ['human', 'Humán gyógyászat'],
          ['animal', 'Állatgyógyászat'],
        ].map(([category, title]) => (
          <section key={category}>
            <h2>{title}</h2>
            <div className="team-grid">
              {team
                .filter((p) => p.category === category)
                .map((p) => (
                  <article key={p.name} className="team-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={130}
                      height={180}
                    />
                    <div>
                      <h3>{p.name}</h3>
                      <p>
                        <strong>{p.role}</strong>
                      </p>
                      <ul>
                        {p.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      {p.links.length > 0 && (
                        <div className="team-links">
                          {p.links.map((l) => (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {l.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
        <p className="source-note">
          Bemutatkozások az InTissue eredeti csapatoldala alapján.
        </p>
      </section>
    </SiteShell>
  );
}
