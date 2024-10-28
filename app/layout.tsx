import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Providers from "./Providers";

const monaSans = localFont({
  src: './MonaSans.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
})

export const metadata: Metadata = {
  title: "Fuse Node Sale",
  description: "Unique opportunity for the existing validators and community members to buy a Data Availability node license",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={monaSans.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
