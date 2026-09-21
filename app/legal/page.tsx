import { Text } from '@/app/language-provider';
import SiteShell, { PageIntro } from '../site-shell';
export default function Legal() {
  return (
    <SiteShell>
      <PageIntro
        label="ÁTLÁTHATÓ MŰKÖDÉS"
        title="Adatkezelés és impresszum."
        description="Az eredeti InTissue weboldal üzemeltetői adatai és az új szakmai portál működésével kapcsolatos információk."
      />
      <article className="site-wrap content-section legal-copy">
        <p className="notice-panel">
          <Text>
            {
              'Ez az InTissue bemutatkozó tartalmainak új megjelenésű, zárt szakmai változata. Az eredeti intissue.com és az itt működő szakmai portál adatkezelési folyamatai eltérnek; az alábbiak ezt külön jelzik. '
            }
          </Text>
        </p>
        <h2 id="imprint">
          <Text>{'Üzemeltetői adatok az eredeti honlap alapján'}</Text>
        </h2>
        <dl>
          <dt>
            <Text>{'Cégnév'}</Text>
          </dt>
          <dd>
            <Text>
              {'BARLINKA Company Szolgáltató Korlátolt Felelősségű Társaság'}
            </Text>
          </dd>
          <dt>
            <Text>{'Márkanév'}</Text>
          </dt>
          <dd>
            <Text>{'InTissue'}</Text>
          </dd>
          <dt>
            <Text>{'Székhely'}</Text>
          </dt>
          <dd>
            <Text>{'8174 Balatonkenese, Kárpátalja utca 18.'}</Text>
          </dd>
          <dt>
            <Text>{'Cégjegyzékszám'}</Text>
          </dt>
          <dd>
            <Text>{'19-09-520561'}</Text>
          </dd>
          <dt>
            <Text>{'Adószám'}</Text>
          </dt>
          <dd>
            <Text>{'14845639-2-19'}</Text>
          </dd>
          <dt>
            <Text>{'Képviselő'}</Text>
          </dt>
          <dd>
            <Text>{'Hajas Orsolya'}</Text>
          </dd>
          <dt>
            <Text>{'Kapcsolat'}</Text>
          </dt>
          <dd>
            <a href="mailto:orsi.hajas@gmail.com">
              <Text>{'orsi.hajas@gmail.com'}</Text>
            </a>
          </dd>
          <dt>
            <Text>{'Eredeti weboldal'}</Text>
          </dt>
          <dd>
            <a href="https://intissue.com" target="_blank" rel="noreferrer">
              <Text>{'intissue.com '}</Text>
            </a>
          </dd>
        </dl>
        <h2>
          <Text>{'Az új szakmai portál adatai'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az orvosi regisztráció a szakmai jogosultság ellenőrzését szolgálja. A portál a regisztráció során megadott adatokat, az ellenőrzés eredményét, a munkamenetet és a beküldött termékigényléseket tárolja. A hozzáférés jóváhagyáshoz kötött; a munkamenet két perc inaktivitás után lezárul. A regisztrációs oldal részletesen bemutatja az ellenőrzés menetét. '
            }
          </Text>
        </p>
        <p>
          <Text>
            {
              'Ez a változat Sites-tárhelyen működik. A bejelentkezés és a szakmai munkamenet működéséhez technikailag szükséges azonosítók használhatók. A megvalósításba külön analitikai vagy hirdetési követőkódot nem építettünk. '
            }
          </Text>
        </p>
        <h2>
          <Text>{'Kapcsolatfelvétel ezen az oldalon'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az itt található űrlap a böngészőben állítja össze a levelet, és a felhasználó levelezőprogramját nyitja meg. Az űrlap nem küld automatikusan üzenetet és nem menti az üzenetszöveget a portál adatbázisába. Az elküldésről a felhasználó a levelezőprogramjában dönt; a további feldolgozásban annak szolgáltatója és a címzett vesz részt. '
            }
          </Text>
        </p>
        <h2>
          <Text>{'Az eredeti intissue.com adatkezelése'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az eredeti oldal tájékoztatója szerint a kapcsolatfelvételi űrlapon megadott név, e-mail-cím és üzenet a megkeresés megválaszolásához szükséges. A megjelölt jogalap szerződéskötést megelőző intézkedés vagy jogos érdek, a közölt megőrzési idő az utolsó kapcsolatfelvételtől számított öt év. Ez az eredeti űrlapra vonatkozó tájékoztatás, nem a portál orvosi regisztrációjának megőrzési szabálya. '
            }
          </Text>
        </p>
        <p>
          <Text>
            {
              'Az eredeti űrlap Microsoft Azure nyugat-európai infrastruktúrán dolgozza fel az üzeneteket, és Microsoft 365/Exchange Online útján továbbítja azokat. Az ILLU Kft. az eredeti weboldal műszaki támogatását és a kapcsolódó postafiókot kezeli. Az eredeti statikus honlap GitHub Pages szolgáltatáson működik; a tárhelyszolgáltató szervernaplókat kezelhet. '
            }
          </Text>
        </p>
        <p>
          <Text>
            {
              'Az eredeti tájékoztató nem jelez analitikai vagy hirdetési sütiket. A portál videói az intissue.com címről töltődnek be a lejátszó megnyitásakor, ezért ekkor a böngésző kapcsolatba lép az eredeti médiatár szolgáltatójával. A külső szolgáltatások adatkezelése nem azonos a portál saját működésével; az eredeti szabályzat a nemzetközi adattovábbításokat is ismerteti. '
            }
          </Text>
        </p>
        <h2>
          <Text>{'Adatkezeléssel kapcsolatos jogok'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az eredeti tájékoztató ismerteti a hozzáférés, helyesbítés, törlés, korlátozás, adathordozhatóság, tiltakozás és a hozzájárulás visszavonásának lehetőségét. Kérelmével a megadott kapcsolattartóhoz fordulhat. Az alkalmazandó feltételeket és határidőket az eredeti szabályzat és a GDPR részletezi. '
            }
          </Text>
        </p>
        <p>
          <Text>
            {
              'Magyar felügyeleti hatóság: Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Alkotmány u. 3.; levelezési cím: 1363 Budapest, Pf. 9.; telefon: +36 (1) 391-1400;'
            }
          </Text>
          <Text> </Text>
          <a href="mailto:ugyfelszolgalat@naih.hu">
            <Text>{'ugyfelszolgalat@naih.hu'}</Text>
          </a>
          <Text>{';'}</Text>
          <Text> </Text>
          <a href="https://www.naih.hu" target="_blank" rel="noreferrer">
            <Text>{'naih.hu '}</Text>
          </a>
          <Text>{'. '}</Text>
        </p>
        <h2>
          <Text>{'Szerzői jogok és szakmai tájékoztatás'}</Text>
        </h2>
        <p>
          <Text>
            {
              'Az eredeti InTissue képek, felvételek és tartalmak jogai jogosultjaiknál maradnak. Az eredeti honlap fejlesztője az Illu Kft., vizuális tartalmainak partnere a BARLINKA Company Kft. Az itt megjelenő szakmai összefoglalók nem helyettesítik a termékhez mellékelt aktuális dokumentációt vagy a kezelő szakember döntését. A külső hivatkozások tartalmáért azok üzemeltetői felelnek. '
            }
          </Text>
        </p>
        <p className="source-note">
          <Text>{'Tartalmi forrás ellenőrzése: 2026. szeptember 21. ·'}</Text>
          <Text> </Text>
          <a href="https://intissue.com/legal" target="_blank" rel="noreferrer">
            <Text>
              {'Az eredeti adatkezelési tájékoztató és impresszum ↗ '}
            </Text>
          </a>
        </p>
      <p><Text>{"A választott nyelvet az intissue_language beállítási süti legfeljebb egy évig megőrzi. A nyelvváltóval bármikor módosítható."}</Text></p></article>
    </SiteShell>
  );
}
