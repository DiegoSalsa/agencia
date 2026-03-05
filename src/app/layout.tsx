import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/context/I18nContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PuroCode | Desarrollo Web & SaaS Premium",
  description:
    "Soluciones web y SaaS a medida con tecnología de vanguardia. Transformamos ideas complejas en productos digitales de alto rendimiento.",
  icons: {
    icon: "/img/favicon/favicon.ico",
    apple: "/img/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-display bg-background-dark text-white antialiased overflow-x-hidden`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
