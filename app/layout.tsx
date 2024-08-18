import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Providers from "./Providers";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { getConfig } from "@/lib/web3Auth";

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
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  )

  return (
    <html lang="en">
      <body className={monaSans.variable}>
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
