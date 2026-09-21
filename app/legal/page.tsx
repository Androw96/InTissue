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
          Ez az InTissue bemutatkozó tartalmainak új megjelenésű, zárt szakmai
          változata. Az eredeti intissue.com és az itt működő szakmai portál
          adatkezelési folyamatai eltérnek; az alábbiak ezt külön jelzik.
        </p>
        <h2 id="imprint">Üzemeltetői adatok az eredeti honlap alapján</h2>
        <dl>
          <dt>Cégnév</dt>
          <dd>BARLINKA Company Szolgáltató Korlátolt Felelősségű Társaság</dd>
          <dt>Márkanév</dt>
          <dd>InTissue</dd>
          <dt>Székhely</dt>
          <dd>8174 Balatonkenese, Kárpátalja utca 18.</dd>
          <dt>Cégjegyzékszám</dt>
          <dd>19-09-520561</dd>
          <dt>Adószám</dt>
          <dd>14845639-2-19</dd>
          <dt>Képviselő</dt>
          <dd>Hajas Orsolya</dd>
          <dt>Kapcsolat</dt>
          <dd>
            <a href="mailto:orsi.hajas@gmail.com">orsi.hajas@gmail.com</a>
          </dd>
          <dt>Eredeti weboldal</dt>
          <dd>
            <a href="https://intissue.com" target="_blank" rel="noreferrer">
              intissue.com
            </a>
          </dd>
        </dl>
        <h2>Az új szakmai portál adatai</h2>
        <p>
          Az orvosi regisztráció a szakmai jogosultság ellenőrzését szolgálja. A
          portál a regisztráció során megadott adatokat, az ellenőrzés
          eredményét, a munkamenetet és a beküldött termékigényléseket tárolja.
          A hozzáférés jóváhagyáshoz kötött; a munkamenet két perc inaktivitás
          után lezárul. A regisztrációs oldal részletesen bemutatja az
          ellenőrzés menetét.
        </p>
        <p>
          Ez a változat Sites-tárhelyen működik. A bejelentkezés és a szakmai
          munkamenet működéséhez technikailag szükséges azonosítók használhatók.
          A megvalósításba külön analitikai vagy hirdetési követőkódot nem
          építettünk.
        </p>
        <h2>Kapcsolatfelvétel ezen az oldalon</h2>
        <p>
          Az itt található űrlap a böngészőben állítja össze a levelet, és a
          felhasználó levelezőprogramját nyitja meg. Az űrlap nem küld
          automatikusan üzenetet és nem menti az üzenetszöveget a portál
          adatbázisába. Az elküldésről a felhasználó a levelezőprogramjában
          dönt; a további feldolgozásban annak szolgáltatója és a címzett vesz
          részt.
        </p>
        <h2>Az eredeti intissue.com adatkezelése</h2>
        <p>
          Az eredeti oldal tájékoztatója szerint a kapcsolatfelvételi űrlapon
          megadott név, e-mail-cím és üzenet a megkeresés megválaszolásához
          szükséges. A megjelölt jogalap szerződéskötést megelőző intézkedés
          vagy jogos érdek, a közölt megőrzési idő az utolsó
          kapcsolatfelvételtől számított öt év. Ez az eredeti űrlapra vonatkozó
          tájékoztatás, nem a portál orvosi regisztrációjának megőrzési
          szabálya.
        </p>
        <p>
          Az eredeti űrlap Microsoft Azure nyugat-európai infrastruktúrán
          dolgozza fel az üzeneteket, és Microsoft 365/Exchange Online útján
          továbbítja azokat. Az ILLU Kft. az eredeti weboldal műszaki
          támogatását és a kapcsolódó postafiókot kezeli. Az eredeti statikus
          honlap GitHub Pages szolgáltatáson működik; a tárhelyszolgáltató
          szervernaplókat kezelhet.
        </p>
        <p>
          Az eredeti tájékoztató nem jelez analitikai vagy hirdetési sütiket. A
          portál videói az intissue.com címről töltődnek be a lejátszó
          megnyitásakor, ezért ekkor a böngésző kapcsolatba lép az eredeti
          médiatár szolgáltatójával. A külső szolgáltatások adatkezelése nem
          azonos a portál saját működésével; az eredeti szabályzat a nemzetközi
          adattovábbításokat is ismerteti.
        </p>
        <h2>Adatkezeléssel kapcsolatos jogok</h2>
        <p>
          Az eredeti tájékoztató ismerteti a hozzáférés, helyesbítés, törlés,
          korlátozás, adathordozhatóság, tiltakozás és a hozzájárulás
          visszavonásának lehetőségét. Kérelmével a megadott kapcsolattartóhoz
          fordulhat. Az alkalmazandó feltételeket és határidőket az eredeti
          szabályzat és a GDPR részletezi.
        </p>
        <p>
          Magyar felügyeleti hatóság: Nemzeti Adatvédelmi és Információszabadság
          Hatóság (NAIH), 1055 Budapest, Alkotmány u. 3.; levelezési cím: 1363
          Budapest, Pf. 9.; telefon: +36 (1) 391-1400;{' '}
          <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>;{' '}
          <a href="https://www.naih.hu" target="_blank" rel="noreferrer">
            naih.hu
          </a>
          .
        </p>
        <h2>Szerzői jogok és szakmai tájékoztatás</h2>
        <p>
          Az eredeti InTissue képek, felvételek és tartalmak jogai
          jogosultjaiknál maradnak. Az eredeti honlap fejlesztője az Illu Kft.,
          vizuális tartalmainak partnere a BARLINKA Company Kft. Az itt
          megjelenő szakmai összefoglalók nem helyettesítik a termékhez
          mellékelt aktuális dokumentációt vagy a kezelő szakember döntését. A
          külső hivatkozások tartalmáért azok üzemeltetői felelnek.
        </p>
        <p className="source-note">
          Tartalmi forrás ellenőrzése: 2026. szeptember 21. ·{' '}
          <a href="https://intissue.com/legal" target="_blank" rel="noreferrer">
            Az eredeti adatkezelési tájékoztató és impresszum ↗
          </a>
        </p>
      </article>
    </SiteShell>
  );
}
