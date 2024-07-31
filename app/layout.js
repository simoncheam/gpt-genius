import { Inter } from 'next/font/google';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GPT Genius',
  description: 'Your AI language assistant',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en'>
        <body className={inter.className}>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
