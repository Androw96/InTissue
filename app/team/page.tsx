import { Text, LocalizedImage } from '@/app/language-provider';
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
        <Text>
          {[
            ['human', 'Humán gyógyászat'],
            ['animal', 'Állatgyógyászat'],
          ].map(([category, title]) => (
            <section key={category}>
              <h2>
                <Text>{title}</Text>
              </h2>
              <div className="team-grid">
                <Text>
                  {team
                    .filter((p) => p.category === category)
                    .map((p) => (
                      <article key={p.name} className="team-card">
                        <LocalizedImage
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          width={130}
                          height={180}
                        />
                        <div>
                          <h3>
                            <Text>{p.name}</Text>
                          </h3>
                          <p>
                            <strong>
                              <Text>{p.role}</Text>
                            </strong>
                          </p>
                          <ul>
                            <Text>
                              {p.details.map((d) => (
                                <li key={d}>
                                  <Text>{d}</Text>
                                </li>
                              ))}
                            </Text>
                          </ul>
                          <Text>
                            {p.links.length > 0 && (
                              <div className="team-links">
                                <Text>
                                  {p.links.map((l) => (
                                    <a
                                      key={l.url}
                                      href={l.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <Text>{l.label}</Text>
                                      <Text>{' ↗ '}</Text>
                                    </a>
                                  ))}
                                </Text>
                              </div>
                            )}
                          </Text>
                        </div>
                      </article>
                    ))}
                </Text>
              </div>
            </section>
          ))}
        </Text>
        <p className="source-note">
          <Text>
            {'Bemutatkozások az InTissue eredeti csapatoldala alapján. '}
          </Text>
        </p>
      </section>
    </SiteShell>
  );
}
