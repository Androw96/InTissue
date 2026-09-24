import Home from '../app/page';
import Team from '../app/team/page';
import Contact from '../app/contact/page';
import Production from '../app/production/page';
import Catalog from '../app/catalog';
import Animal from '../app/animal/page';
import Videos from '../app/videos/page';
import ProductProfile from '../app/product-profile-content';
import { products } from '../lib/products';
import Access from './access';
import Legal from './legal';
import { LanguageProvider } from '../app/language-provider';
import type { Language } from '../lib/i18n';

export const routes = ['/', '/team/', '/contact/', '/production/', '/katalogus/', '/animal/', '/videos/', '/regisztracio/', '/admin/', '/legal/', ...products.map(p => `/termekek/${p.id}/`)];

export function PagesApp({ path, language }: { path: string; language: Language }) {
  const components: Record<string, React.ComponentType> = { '/': Home, '/team/': Team, '/contact/': Contact, '/production/': Production, '/katalogus/': Catalog, '/animal/': Animal, '/videos/': Videos, '/regisztracio/': Access, '/admin/': Access, '/legal/': Legal };
  const Page = components[path] ?? Home;
  return <LanguageProvider language={language}>{path.startsWith('/termekek/') ? <ProductProfile id={path.split('/')[2]} /> : <Page />}</LanguageProvider>;
}
