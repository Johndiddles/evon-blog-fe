"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import UserContextProvider from "./context/userAuth";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Evon Medics Blog",
//   description: "Evon Medics Weekly Articles",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Evon Medics Blog</title>
      </Head>
      <body className={`${inter.className} min-h-screen flex flex-col gap-5`}>
        <UserContextProvider>
          <Header />

          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
