import type { Metadata } from "next";
import { Geist, Nunito } from "next/font/google";
import "./globals.scss";
import { Call, Footer, Navbar, Whatsapp } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaoji",
  description: "Aaoji is your perfect pit stop on the highway, serving up bold, authentic flavors that are fast, fun, and full of taste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${nunito.variable} antialiased back-colour-whole`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <Footer />
        <Whatsapp whatsAppNumber="9599799429" />
        <Call callNumber="919599799429" />
      </body>
    </html>
  );
}
