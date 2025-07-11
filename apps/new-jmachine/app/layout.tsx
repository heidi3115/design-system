import { Metadata } from 'next';
import { Providers } from '../components/providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'JUI next-app demo',
    template: '%s | JUI next-app demo',
  },
  description: 'jui nextjs 15 용 데모 페이지',
  icons: {
    icon: '/images/jason-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
