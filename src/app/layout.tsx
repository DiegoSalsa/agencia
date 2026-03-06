import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-display bg-[var(--bg)] text-[var(--text)] antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
