import { Providers } from '../components/providers';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-pre antialiased bg-juiBackground-default text-juiText-primary text-xs`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
