import type { Metadata } from 'next';
import './globals.css';
import { PortalProvider } from './portal-provider';
export const metadata: Metadata = {
  title: 'InTissue | Csonttranszplantátumok',
  icons: { icon: '/favicon.svg' },
  description:
    'Humán DIZG csontblokkok és InTissue állatgyógyászati csontgraftok katalógusa. Orvosi regisztráció, ellenőrzött hozzáférés és térítési díjak.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>
        <PortalProvider>{children}</PortalProvider>
      </body>
    </html>
  );
}
