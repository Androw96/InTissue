# InTissue

Magyar nyelvű, privát szakmai katalógus. A megadott márkanév: InTissue.

## Ellenőrzés és élesítési adatok

Az OKFŐ publikus keresője a név (vagy névrészlet) és a nyilvántartási szám együttes megadásával használható. Orvosoknál és fogorvosoknál a pecsétszám az alap- és működési nyilvántartási számmal megegyezik. A keresés kézi csúszkás megerősítést igényel. Nyilvános gépi integrációt az elérhető keresőoldal nem dokumentál; automatizált scraping és a csúszka megkerülése nincs beépítve. Az automatikus adatkapcsolatról az OKFŐ tud tájékoztatást adni: omn@okfo.gov.hu.

Forrás: https://kereso.enkk.hu/ (2026-09-09).

A regisztrációs igény menthető; szakmai hozzáférést csak kézi ellenőrzéssel jóváhagyott, nem lejárt működési nyilvántartással rendelkező felhasználó kaphat. Az ellenőrnek a név/szám egyezést, aktív működési jogosultságot és a regisztráló személyazonosságát is ellenőriznie kell. Egy publikus pecsétszám ismerete önmagában nem személyazonosítás.

A privát bemutató Sites/ChatGPT azonosítást használ. Önálló, nyilvános orvosi ügyfélportál indítása előtt az üzemeltető által választott hitelesítést és annak infrastruktúráját külön szükséges beállítani.

Az adminisztrátori e-mail-cím és a hiteles térítési díjtáblázat még nincs megadva. Ne találjunk ki díjakat, készletet, magyar forgalmazási jogosultságot vagy DIZG-partneri státuszt. A termékek forrásoldalai szakmai referenciák; nem igazolják önmagukban a magyarországi forgalmazhatóságot.

## Gyártói termékforrások

- https://dizg.de/gewebetransplantat/spongiosa-wuerfel-und-bloecke/
- https://dizg.de/gewebetransplantat/os-ilium/
- https://dizg.de/en/allograft/osteotomy-wedges/

A DIZG fotói a privát referenciatervhez szolgálnak. Nyilvános kereskedelmi használat előtt a képek engedélyét rendezni vagy saját engedélyezett termékfotókra cserélni szükséges: https://dizg.de/impressum/.

## Munkamenet elfogadási követelményei

- 120 000 ms inaktivitás után a böngésző kijelentkeztet, és a kiszolgáló elutasítja a lejárt munkamenetet.
- Háttérben futó lekérdezés nem számít felhasználói aktivitásnak.
- Az időhatáron érkező aktivitás nem éleszthet újra lejárt munkamenetet.
- A védett végpontok minden kérésnél ellenőrzik az azonosítást, munkamenetet és szakmai jogosultságot.
- A regisztrációs űrlap csak formai ellenőrzést végez; minden új igény ellenőrzésre vár.
- Adminisztrátori jogosultság hiányában nem lehet jóváhagyni vagy díjat feltölteni.
- Kijelentkezéskor a kiszolgáló visszavonja a munkamenetet; érzékeny válaszok nem gyorsítótárazhatók.

## Elkészült funkciók és ellenőrzések

A `/admin` felületen az `ADMIN_EMAILS` környezeti változóban megadott felhasználók ellenőrzés után jóváhagyhatják vagy elutasíthatják a regisztrációkat, megadhatják az érvényességet, rögzíthetik a cikkszámhoz tartozó térítési díjakat és megtekinthetik az igényléseket. Minden döntéshez külön auditbejegyzés készül. Saját regisztráció nem hagyható jóvá.

Az adminisztrátor e-mail-címét a felhasználó még nem adta meg, ezért nincs kiadott adminisztrátori jogosultság. Az éles adattárban nincsenek tesztorvosok vagy kitalált térítési díjak.

A `tests/policy.test.ts` 5 időhatár-, dátum- és jogosultságtesztje, valamint a `tests/integration.mjs` 12 helyi API-ellenőrzése sikeres. Az integrációs teszt kizárólag az üres helyi fejlesztői adatbázis `local_seedy` tesztfelhasználójával futtatható; a saját tesztadatait eltávolítja.

Az `open_bone_product` WebMCP eszköz ugyanazt a termékadatlapot nyitja meg, mint a felület. Támogatott WebMCP-végrehajtási kontextus nem volt elérhető, ezért ennek böngészős szerződésellenőrzése nem történt meg. Teljes böngészős felületteszt nem volt kérve.

## InTissue forrástartalmak – 2026-09-09

A felhasználó kérésére átvettük az intissue.com főoldalának bemutatkozó tartalmát és az /animal állatgyógyászati katalógusát. A közvetlen /animal URL a lekéréskor 404-et adott; az oldal főoldaláról hivatkozott nyilvános /assets/index-lOWr1Wcq.js alkalmazáscsomag tartalmazta a teljes termékoldalt, a 3 termékcsaládot, 15 táblázatsort, a kiszereléseket, EUR referenciaösszegeket, termékfotó-hivatkozásokat és a gyártói ismertetőt. A forrásoldal táblázata és leírása helyenként eltérő kiszereléseket sorol fel; a táblázati adatokat használtuk, és ezt az adatlapon jelöltük.

Az állatgyógyászati termékek külön tájékoztató részt kaptak, a gyártó „not for use in human patients” korlátozásával. A 15 tétel nem került a humán igénylési végpont megengedett cikkszámai közé. A referencia térítési díjak EUR-ban, kiszolgálóoldalon tároltak, és a meglévő jóváhagyási/munkamenet-kapun keresztül kérhetők le. Nem írják felül a HUF-ban kezelt, visszaigazolt díjtáblázatot. Állatorvosi hitelesítést vagy állatgyógyászati rendelést ez a tartalombővítés nem vezet be.

A főoldal bemutatkozó szövege, a gyártó neve/címe, az általános tárolási ismertető és a szakmai videótár létezése szerepel a felületen. Gyógyulási ígéretek, nem ellenőrzött tanúsítási állítások és műtéti lépések nem kerültek új marketingállításként átvételre. A három új fotó eredeti InTissue termékfotó.

## 2026-09-21: Full light InTissue presentation site

- New homepage at `/`; existing gated catalog now at `/katalogus`.
- Shared white/sage/forest-green header, footer and typography across presentation pages and catalog.
- Original source routes represented: `/animal`, `/videos`, `/team`, `/production`, `/contact`, `/legal`.
- 13 professional profiles with original portraits and publication links; 16 original self-hosted videos, loaded on deliberate opening, without autoplay.
- Original product catalog and all 15 veterinary reference values rechecked against current source catalog; values unchanged.
- Veterinary product, handling, donor-screening, storage, processing and scientific content adapted into Hungarian summaries. Current manufacturer's package instructions remain authoritative; original full IFU linked.
- Contact form prepares a mailto message only; no automatic send, third-party backend credentials or unverifiable successful-send state. Original contact/order form linked separately.
- Legal page distinguishes original website practices from this Sites portal, rather than copying original claims that there are no accounts or external video requests.
- Original source assets and page data inspected from https://intissue.com, including current sitemap and source bundles, on 2026-09-21. Team/product images retained from original source; media rights remain with their owners.
- Typecheck and all nine primary route responses verified. All 16 video URLs respond 200 with video/mp4. Interactive visual QA unavailable because the Mac was locked; no UI settings changed.
