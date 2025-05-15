import { Providers } from '../components/providers';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-pre antialiased bg-juiBackground-default text-juiText-primary`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
