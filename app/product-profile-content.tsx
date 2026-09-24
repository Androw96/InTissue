import { Text, LocalizedImage } from '@/app/language-provider';
import SiteShell, { PageIntro } from './site-shell';
import { products } from '@/lib/products';
export default function ProductProfileContent({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  return (
    <SiteShell>
      <PageIntro
        label="INTISSUE / HUMÁN TERMÉKPROFIL"
        title={product.name}
        description={product.summary}
      />
      <section className="site-wrap content-section">
        <a className="text-link" href="/katalogus">
          <Text>{'← Vissza a katalógushoz'}</Text>
        </a>
        <div className="product-profile-grid">
          <div className="profile-photo">
            <LocalizedImage
              src={product.image}
              alt={product.name}
              width={640}
              height={480}
            />
          </div>
          <article>
            <p className="eyebrow">
              <Text>{'DIZG · HUMÁN ALLOGRAFT'}</Text>
            </p>
            <h2>
              <Text>{product.name}</Text>
            </h2>
            <p>
              <Text>{product.detail}</Text>
            </p>
            <dl className="profile-facts">
              <dt>
                <Text>{'Szövettípus'}</Text>
              </dt>
              <dd>
                <Text>{product.type}</Text>
              </dd>
              <dt>
                <Text>{'Feldolgozás'}</Text>
              </dt>
              <dd>
                <Text>{'Fagyasztva szárított'}</Text>
              </dd>
              <dt>
                <Text>{'Gyártó'}</Text>
              </dt>
              <dd>
                <Text>
                  {'Deutsches Institut für Zell- und Gewebeersatz (DIZG)'}
                </Text>
              </dd>
              <dt>
                <Text>{'Felhasználási terület'}</Text>
              </dt>
              <dd>
                <Text>{'Humán csontpótlás · szakmai felhasználás'}</Text>
              </dd>
            </dl>
            <a className="button" href="/regisztracio">
              <Text>{'Térítési díjak és szakmai hozzáférés →'}</Text>
            </a>
          </article>
        </div>
        <h2>
          <Text>{'Változatok és kiszerelések'}</Text>
        </h2>
        <div className="profile-table">
          <table>
            <thead>
              <tr>
                <th>
                  <Text>{'Cikkszám'}</Text>
                </th>
                <th>
                  <Text>{'Kiszerelés / méret'}</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              <Text>
                {product.variants.map((v) => (
                  <tr key={v.sku}>
                    <td>
                      <Text>{v.sku}</Text>
                    </td>
                    <td>
                      <Text>{v.label}</Text>
                    </td>
                  </tr>
                ))}
              </Text>
            </tbody>
          </table>
        </div>
        <div className="content-grid" style={{ marginTop: 30 }}>
          <article className="content-card">
            <h3>
              <Text>{'Termékazonosítás'}</Text>
            </h3>
            <p>
              <Text>
                {
                  'A megfelelő változatot a cikkszám és a csomagolás címkéje azonosítja. A rendelkezésre állás és a térítési díj külön visszaigazolás tárgya.'
                }
              </Text>
            </p>
          </article>
          <article className="content-card">
            <h3>
              <Text>{'Alkalmazási információk'}</Text>
            </h3>
            <p>
              <Text>
                {
                  'A termék kiválasztása és alkalmazása a kezelő szakember feladata. A tárolás, előkészítés és beültetés során a csomaghoz mellékelt aktuális használati útmutatót kell követni.'
                }
              </Text>
            </p>
          </article>
        </div>
        <p className="source-note">
          <Text>
            {
              'Az InTissue saját termékismertetője a DIZG termékadatai alapján. Az összefoglaló nem helyettesíti a termékhez mellékelt használati útmutatót.'
            }
          </Text>
        </p>
        <a className="button outline" href="/katalogus#katalogus">
          <Text>{'Változat kiválasztása és igénylés →'}</Text>
        </a>
      </section>
    </SiteShell>
  );
}
