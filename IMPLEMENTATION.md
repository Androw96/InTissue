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
