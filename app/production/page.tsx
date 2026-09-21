import SiteShell, { PageIntro } from '../site-shell';
import { Camera, Server, ArrowUpRight } from 'lucide-react';
export default function Production() {
  return (
    <SiteShell>
      <PageIntro
        label="KREATÍV ÉS TECHNOLÓGIAI PARTNEREK"
        title="A háttér, amely összeköt."
        description="Ahogyan a kötőszövet a szervezetet, úgy kapcsolják össze partnereink az InTissue vizuális és digitális jelenlétének részleteit."
      />
      <section className="site-wrap content-section content-grid">
        <article className="content-card">
          <Camera size={30} />
          <p className="eyebrow" style={{ marginTop: 25 }}>
            FOTÓ ÉS VIDEÓ
          </p>
          <h2>BARLINKA Company Kft.</h2>
          <p>
            Az InTissue eredeti weboldalának és szakmai kommunikációjának fotós
            és videós partnere. Az orvosi és állatorvosi környezethez igazodó,
            diszkrét munkavégzéssel dokumentálják a beavatkozásokat, eszközöket
            és szakmai eredményeket.
          </p>
          <ul>
            <li>Orvosi és állatgyógyászati fotográfia</li>
            <li>Implantátum-, eszköz- és makrofotózás</li>
            <li>Retusálás, publikálásra előkészített képek</li>
            <li>Professzionális videógyártás</li>
          </ul>
          <h3>A dokumentáció minősége</h3>
          <p>
            A pontos és igényes vizuális dokumentáció segíti a tapasztalatok
            átadását a szakmai közösség, partnerek és intézmények között. A
            BARLINKA munkái a Semmelweis Gyermekgyógyászati Klinika
            PIC-részlegéhez kapcsolódóan is megjelentek az eredeti bemutatkozás
            szerint.
          </p>
          <a
            className="button outline"
            href="https://www.instagram.com/orsolyahajasphotography/"
            target="_blank"
            rel="noreferrer"
          >
            Hajas Orsolya fotográfiái <ArrowUpRight size={17} />
          </a>
        </article>
        <article className="content-card">
          <Server size={30} />
          <p className="eyebrow" style={{ marginTop: 25 }}>
            INFORMATIKA ÉS WEBFEJLESZTÉS
          </p>
          <h2>Illu Kft.</h2>
          <p>
            Az eredeti intissue.com weboldal fejlesztője és informatikai
            partnere. Az infrastruktúrától a digitális biztonságig több
            területen támogatja a vállalkozások működését.
          </p>
          <ul>
            <li>Webdesign és webfejlesztés</li>
            <li>Informatikai infrastruktúra és teljes körű támogatás</li>
            <li>Technológiai tanácsadás és rendszertervezés</li>
            <li>Digitális biztonság és teljesítményoptimalizálás</li>
            <li>Folyamatos műszaki támogatás</li>
          </ul>
          <div className="notice-panel" style={{ marginBlock: 25 }}>
            <h3>Vállalati adatmentés</h3>
            <p>
              Üzleti adatok védelme, megbízható biztonsági mentések és
              katasztrófa utáni helyreállítás a stabil digitális működéshez.
            </p>
          </div>
          <a
            className="button outline"
            href="https://illu.hu"
            target="_blank"
            rel="noreferrer"
          >
            Az Illu Kft. weboldala <ArrowUpRight size={17} />
          </a>
        </article>
      </section>
    </SiteShell>
  );
}
