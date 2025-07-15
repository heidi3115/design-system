import { Metadata } from 'next';
import { Providers } from '../components/providers';
import '../styles/globals.css';
import { Toaster } from '@common/ui';

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
      <body className="dark">
        <Providers>
          {children}
          <Toaster position="top-center" closeButton />
        </Providers>
      </body>
    </html>
  );
}
