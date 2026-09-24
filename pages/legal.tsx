import SiteShell, { PageIntro } from '../app/site-shell';
import { useLanguage } from '../app/language-provider';
export default function Legal() {
  const { language } = useLanguage();
  const en = language === 'en';
  return <SiteShell>
    <PageIntro label="INTISSUE" title={en ? 'Privacy and legal information' : 'Adatkezelés és impresszum'} description={en ? 'Information about this public InTissue website.' : 'Tájékoztató az InTissue nyilvános bemutatkozó oldaláról.'} />
    <article className="site-wrap content-section legal-copy">
      <h2>{en ? 'Contact' : 'Kapcsolattartó'}</h2>
      <p>BARLINKA Company Szolgáltató Korlátolt Felelősségű Társaság<br />8174 Balatonkenese, Kárpátalja utca 18.<br />Hajas Orsolya · <a href="mailto:orsi.hajas@gmail.com">orsi.hajas@gmail.com</a></p>
      <h2>{en ? 'How this website works' : 'Az oldal működése'}</h2>
      <p>{en ? 'This website is hosted on GitHub Pages. It does not collect medical registrations or provide authenticated sessions. The contact form prepares an email in your own email application; you decide whether to send it. The selected language is stored in the intissue_language cookie for up to one year.' : 'Az oldal GitHub Pages tárhelyen működik. Nem gyűjt orvosi regisztrációkat és nem hoz létre bejelentkezett munkamenetet. A kapcsolatfelvételi űrlap a saját levelezőprogramjában készíti elő az üzenetet; az elküldésről Ön dönt. A választott nyelvet az intissue_language süti legfeljebb egy évig tárolja.'}</p>
      <p>{en ? 'Videos are loaded from intissue.com when the player is opened. GitHub and the media provider may process technical access logs. No analytics or advertising trackers have been added.' : 'A videók a lejátszó megnyitásakor az intissue.com oldalról töltődnek be. A GitHub és a médiaszolgáltató technikai hozzáférési naplókat kezelhet. Külön analitikai vagy hirdetési követőkódot nem építettünk be.'}</p>
      <p>{en ? 'Images and videos remain the property of their respective rights holders. Product information does not replace the current instructions for use.' : 'A képek és videók jogai jogosultjaiknál maradnak. A termékismertetők nem helyettesítik az aktuális használati útmutatót.'}</p>
    </article>
  </SiteShell>;
}
