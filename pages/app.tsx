import Home from '../app/page';
import Team from '../app/team/page';
import Contact from '../app/contact/page';
import Production from '../app/production/page';
import { LanguageProvider } from '../app/language-provider';
import type { Language } from '../lib/i18n';

export const routes = ['/', '/team/', '/contact/', '/production/'];

export function PagesApp({ path, language }: { path: string; language: Language }) {
  const Page = path === '/team/' ? Team : path === '/contact/' ? Contact : path === '/production/' ? Production : Home;
  return <LanguageProvider language={language}><Page /></LanguageProvider>;
}
