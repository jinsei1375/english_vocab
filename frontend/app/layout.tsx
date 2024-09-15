import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CssBaseline } from '@mui/material';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'English Vocab',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
        <CssBaseline />
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
