import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientProviders from '@/components/ClientProviders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box } from '@mui/material';

// 👇 Import the MessageProvider
import { MessageProvider } from '@/context/MessageContext';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Next.js CRUD App',
  description: 'Professional setup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProviders>
          {/* Wrap your entire layout with MessageProvider */}
          <MessageProvider>
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Header />
              <Box component="main" flexGrow={1} px={2} py={4}>
                {children}
              </Box>
              <Footer />
            </Box>
          </MessageProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
