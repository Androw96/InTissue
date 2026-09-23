import type { Metadata } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { LanguageProvider } from './language-provider';
import { PortalProvider } from './portal-provider';
export async function generateMetadata(): Promise<Metadata> {
  const en = (await cookies()).get('intissue_language')?.value === 'en';
  return {
    title: 'InTissue | Intelligent Tissue Solutions',
    icons: { icon: '/it-logo.jpg' },
    description: en
      ? 'Human DIZG bone blocks and InTissue veterinary grafts. Product profiles, professional resources and verified access to reimbursement fees.'
      : 'Humán DIZG csontblokkok és InTissue állatgyógyászati graftok. Termékprofilok, szakmai információk és ellenőrzött hozzáférés a térítési díjakhoz.',
  };
}
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const language =
    (await cookies()).get('intissue_language')?.value === 'en' ? 'en' : 'hu';
  return (
    <html lang={language}>
      <body>
        <LanguageProvider language={language}>
          <PortalProvider>{children}</PortalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
