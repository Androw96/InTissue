import { createRoot, hydrateRoot } from 'react-dom/client';
import { PagesApp } from './app';
import '../app/globals.css';

const language = document.cookie.split('; ').includes('intissue_language=en') ? 'en' : 'hu';
document.documentElement.lang = language;
const path = location.pathname.replace(/^\/InTissue/, '').replace(/index\.html$/, '').replace(/\/?$/, '/');
const root = document.getElementById('root')!;
const app = <PagesApp path={path} language={language} />;
if (language === 'hu') hydrateRoot(root, app);
else createRoot(root).render(app);
