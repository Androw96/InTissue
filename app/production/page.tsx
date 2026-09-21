import { Text } from '@/app/language-provider';
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
            <Text>{'FOTÓ ÉS VIDEÓ '}</Text>
          </p>
          <h2>
            <Text>{'BARLINKA Company Kft.'}</Text>
          </h2>
          <p>
            <Text>
              {
                'Az InTissue eredeti weboldalának és szakmai kommunikációjának fotós és videós partnere. Az orvosi és állatorvosi környezethez igazodó, diszkrét munkavégzéssel dokumentálják a beavatkozásokat, eszközöket és szakmai eredményeket. '
              }
            </Text>
          </p>
          <ul>
            <li>
              <Text>{'Orvosi és állatgyógyászati fotográfia'}</Text>
            </li>
            <li>
              <Text>{'Implantátum-, eszköz- és makrofotózás'}</Text>
            </li>
            <li>
              <Text>{'Retusálás, publikálásra előkészített képek'}</Text>
            </li>
            <li>
              <Text>{'Professzionális videógyártás'}</Text>
            </li>
          </ul>
          <h3>
            <Text>{'A dokumentáció minősége'}</Text>
          </h3>
          <p>
            <Text>
              {
                'A pontos és igényes vizuális dokumentáció segíti a tapasztalatok átadását a szakmai közösség, partnerek és intézmények között. A BARLINKA munkái a Semmelweis Gyermekgyógyászati Klinika PIC-részlegéhez kapcsolódóan is megjelentek az eredeti bemutatkozás szerint. '
              }
            </Text>
          </p>
          <a
            className="button outline"
            href="https://www.instagram.com/orsolyahajasphotography/"
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Hajas Orsolya fotográfiái '}</Text>
            <ArrowUpRight size={17} />
          </a>
        </article>
        <article className="content-card">
          <Server size={30} />
          <p className="eyebrow" style={{ marginTop: 25 }}>
            <Text>{'INFORMATIKA ÉS WEBFEJLESZTÉS '}</Text>
          </p>
          <h2>
            <Text>{'Illu Kft.'}</Text>
          </h2>
          <p>
            <Text>
              {
                'Az eredeti intissue.com weboldal fejlesztője és informatikai partnere. Az infrastruktúrától a digitális biztonságig több területen támogatja a vállalkozások működését. '
              }
            </Text>
          </p>
          <ul>
            <li>
              <Text>{'Webdesign és webfejlesztés'}</Text>
            </li>
            <li>
              <Text>
                {'Informatikai infrastruktúra és teljes körű támogatás'}
              </Text>
            </li>
            <li>
              <Text>{'Technológiai tanácsadás és rendszertervezés'}</Text>
            </li>
            <li>
              <Text>{'Digitális biztonság és teljesítményoptimalizálás'}</Text>
            </li>
            <li>
              <Text>{'Folyamatos műszaki támogatás'}</Text>
            </li>
          </ul>
          <div className="notice-panel" style={{ marginBlock: 25 }}>
            <h3>
              <Text>{'Vállalati adatmentés'}</Text>
            </h3>
            <p>
              <Text>
                {
                  'Üzleti adatok védelme, megbízható biztonsági mentések és katasztrófa utáni helyreállítás a stabil digitális működéshez. '
                }
              </Text>
            </p>
          </div>
          <a
            className="button outline"
            href="https://illu.hu"
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Az Illu Kft. weboldala '}</Text>
            <ArrowUpRight size={17} />
          </a>
        </article>
      </section>
    </SiteShell>
  );
}
