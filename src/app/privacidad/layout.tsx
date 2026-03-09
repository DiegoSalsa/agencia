import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de PuroCode. Conoce cómo recopilamos, usamos y protegemos tus datos personales.",
  alternates: {
    canonical: "https://www.purocode.com/privacidad",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
