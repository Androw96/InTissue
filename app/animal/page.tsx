import { Text, LocalizedImage } from '@/app/language-provider';
import SiteShell, { PageIntro } from '../site-shell';
import VeterinaryCatalog from '../veterinary-catalog';
const info = [
  [
    'A termékek felépítése és alkalmazási területei',
    'A BMG részlegesen dekalcinált, antigénmentesített, autolizált corticalis csontmátrix-koncentrátum. A gyártó a feldolgozás során megőrzött BMP-aktivitást és oszteoinduktív tulajdonságokat emeli ki. A corticospongiosus chips csontdefektusok és ciszták kitöltéséhez alkalmazható, BMG-vel is kombinálható. A strukturális graftok a csont folytonosságának és biomechanikájának helyreállítását szolgálják. A termékismertető törések, csontvesztés, elhúzódó vagy elmaradó csontgyógyulás, TPLO/TTA és arthrodesis esetén említi a felhasználást. Az azonos fajon belüli alkalmazásnál a gyártó átépülést ír le; a spongiosus és corticalis részek átépülési üteme eltérő.',
  ],
  [
    'Kiszerelések és termékazonosítás',
    'A szemcsés készítmények hordozóanyag nélkül, térfogatra adagolva kerülnek csomagolásra. A blokkformák többféle méretben, egyes esetekben egyedi kivitelben kérhetők. A gyártói szöveg általános kiszerelései és a tételes terméktáblázat eltérhetnek; a katalógus a tételes táblázatot követi. A konkrét graft típusa, donor faja, mérete, tartósítási módja és lejárata mindig a csomagolás címkéjén ellenőrizendő. Természetes biológiai eltérések, például sűrűségkülönbségek előfordulhatnak.',
  ],
  [
    'Csomagolás és steril átadás',
    'Felhasználás előtt ellenőrizni kell a külső és belső csomagolás sértetlenségét. Sérült csomagolás esetén a graft nem tekinthető sterilnek. A belső vákuumcsomagot aszeptikus technikával kell a steril csapatnak átadni. A transzplantációs adatlap egy példányát a beteg dokumentációjában kell megőrizni, egy példányát a gyártó részére kell visszajuttatni.',
  ],
  [
    'Rehidrálás és beültetés',
    'A gyártói útmutató vérrel vagy steril fiziológiás oldattal történő rehidrálást ismertet; a műtéti területen jelen lévő vér bizonyos helyzetekben elegendő lehet. A szemcsék és a nagyobb blokkok eltérő idő alatt hidratálódnak. A felhasznált folyadékot, adalékokat és graftmennyiséget a kezelő állatorvos választja meg a termékhez mellékelt útmutató szerint. A graft stabilizált, megfelelő vérellátású befogadóhelyet igényel. Méretre alakításkor a steril körülményeket és a hőkárosodás elkerülését biztosítani kell. A csomag egy páciens egyszeri ellátására szolgál.',
  ],
  [
    'Ellenjavallatok, óvintézkedések és nyomon követés',
    'Kizárólag állatgyógyászati felhasználásra: humán betegekbe nem ültethető. A szövet nem sterilizálható újra. Aktív vagy lappangó fertőzéssel érintett befogadóhelyre a gyártó nem javasolja beültetni. A donorszűrés és a feldolgozás csökkenti, de nem szünteti meg teljesen a fertőzésátvitel kockázatát. A szövethez köthető nemkívánatos eseményt haladéktalanul jelenteni kell az InTissue részére. A beérkezés, beültetés, páciensazonosító és tételadatok dokumentálása biztosítja a nyomon követhetőséget.',
  ],
  [
    'Donoralkalmasság és szűrés',
    'A gyártó a donorszűrés és a fertőző ágensekre végzett vizsgálatok eredménye alapján minősíti alkalmasnak a graftot. Kutyadonoroknál többek között a veszettség, szopornyica, parvovírus és adenovírus elleni oltási előzményeket, illetve szükség szerint PCR-vizsgálatokat ellenőriznek. A felsorolt további vizsgálatok: Brucella canis, Babesia spp., Ehrlichia spp., Anaplasma spp. és Dirofilaria immitis. Lódonoroknál a veszettség és tetanusz elleni előzmények mellett fertőző kevésvérűség, EHV-1 és EHV-4, lóinfluenza, Streptococcus equi, Babesia caballi és Theileria equi szerepel a gyártói szűrési tájékoztatóban.',
  ],
  [
    'Feldolgozás és minőségbiztosítás',
    'Az InTissue lamináris légáramlású, ellenőrzött környezetet, szabályozott munkafolyamatokat, dokumentumkezelést, donorszűrést és nyomon követést ismertet. A feldolgozás célja a sejtes elemek és az immunogenitás csökkentése a csontképződést támogató fehérjék megőrzésével. A folyamatban alkalmazott reagensekből nyomnyi mennyiség visszamaradhat. A fagyasztva szárítás után közölt nedvességtartalom 5% alatti; a gyártó etilén-oxidos sterilizálást és a maradékok eltávolítását írja le. A csomagoláson sterilizálási indikátor található.',
  ],
  [
    'Tárolás, lejárat és felbontás',
    'A gyártói leírás szerint a bontatlan, sértetlen csomag szobahőmérsékleten tárolható, a csomagolástól számított legfeljebb öt évig. Mindig az egyedi címke lejárati dátuma az irányadó. A graftot óvni kell a tartós túlmelegedéstől; a forrás külön említi a 45 °C feletti, két napnál hosszabb hőhatást. Felbontás után aszeptikus körülmények szükségesek. A forrás két órát meghaladó felbontott tárolásnál zárt edényben hűtést, hat órán belül fel nem használt graftnál megsemmisítést ír elő. A tényleges felhasználásnál a termékhez mellékelt aktuális útmutatót kell követni.',
  ],
];
export default function Animal() {
  return (
    <SiteShell>
      <PageIntro
        label="INTISSUE / VETERINARY"
        title="Regeneratív megoldások állatoknak."
        description="Fagyasztva szárított, sterilizált csontgraftok lovak, kutyák és macskák ellátásához. Termékcsaládok, szakmai háttér és gyártói információk egy helyen."
      />
      <div className="site-wrap">
        <p className="notice-panel">
          <Text>
            {
              'Az InTissue eredeti tájékoztatója ISO 9001:2015 és ISO 13485:2016 tanúsítású állatgyógyászati szövetbankként mutatja be a szervezetet. '
            }
          </Text>
        </p>
      </div>
      <VeterinaryCatalog />
      <section className="site-wrap content-section">
        <p className="eyebrow">
          <Text>{'GYÁRTÓI TÁJÉKOZTATÓ'}</Text>
        </p>
        <h2>
          <Text>{'Felhasználás és minőségbiztosítás'}</Text>
        </h2>
        <p>
          <Text>
            {
              'A gyártói információk magyar nyelvű összefoglalója. A konkrét termék használatakor a csomagoláshoz tartozó, aktuális használati útmutató az irányadó. '
            }
          </Text>
        </p>
        <Text>
          {info.map(([title, text]) => (
            <details key={title}>
              <summary>
                <Text>{title}</Text>
              </summary>
              <div>
                <p>
                  <Text>{text}</Text>
                </p>
              </div>
            </details>
          ))}
        </Text>
        <p className="source-note">
          <a
            href="https://intissue.com/animal"
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Eredeti, teljes angol nyelvű használati útmutató ↗ '}</Text>
          </a>
          <Text> </Text>
          <Text>
            {'· Gyártó: InTissue (Hisztolabor Ltd), 9026 Győr, Kocsag utca 2. '}
          </Text>
        </p>
        <h2>
          <Text>{'A csontregeneráció fogalmai'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az eredeti ismertető az ideális csontgraft tulajdonságait az alábbi fogalmakkal mutatja be. Ezek nem mindegyike jellemző minden termékre. '
            }
          </Text>
        </p>
        <div className="content-grid">
          <Text>
            {[
              [
                'Oszteokonduktivitás',
                'A befogadó szövet sejtjeinek és ereinek benövését támogató térbeli váz.',
              ],
              [
                'Oszteoinduktivitás',
                'A csontképződést ösztönző biológiai hatás, amelyhez például BMP-fehérjék járulhatnak hozzá.',
              ],
              [
                'Oszteogén tulajdonság',
                'Aktív csontképző sejtek jelenléte. Ez nem jelenti azt, hogy a sterilizált, fagyasztva szárított termékek élő sejteket tartalmaznak.',
              ],
              [
                'Teljes átépülés',
                'A graft felszívódása és saját, új csontszövettel történő helyettesítése.',
              ],
            ].map(([title, text]) => (
              <article className="content-card" key={title}>
                <h3>
                  <Text>{title}</Text>
                </h3>
                <p>
                  <Text>{text}</Text>
                </p>
              </article>
            ))}
          </Text>
        </div>
        <div className="content-grid" style={{ marginTop: 35 }}>
          <figure>
            <LocalizedImage
              src="/images/newboneformation.webp"
              alt="Gyártói ábra: új csontképződés BMG alkalmazása után"
              loading="lazy"
            />
            <figcaption>
              <Text>
                {
                  'A gyártó által bemutatott csontképződés hat hónappal BMG alkalmazása után, ló fogászati esetében. '
                }
              </Text>
            </figcaption>
          </figure>
          <figure>
            <LocalizedImage
              src="/images/bmgremodelling.webp"
              alt="BMG átépülését bemutató gyártói ábra"
              loading="lazy"
            />
            <figcaption>
              <Text>{'BMG átépülése – az InTissue eredeti ábrája.'}</Text>
            </figcaption>
          </figure>
        </div>
        <a
          className="button outline"
          href="/videos#animal"
          style={{ marginTop: 35 }}
        >
          <Text>{'Állatgyógyászati videók → '}</Text>
        </a>
      </section>
    </SiteShell>
  );
}
