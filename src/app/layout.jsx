import AppSessionProvider from '@components/AppSessionProvider';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Groove Box',
  description: 'Request songs to be played on the Groove Box',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppSessionProvider>{children}</AppSessionProvider>
      </body>
    </html>
  );
}
