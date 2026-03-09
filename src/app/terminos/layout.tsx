import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de servicio de PuroCode. Lee las condiciones que aplican al uso de nuestros servicios de desarrollo web.",
  alternates: {
    canonical: "https://purocode.com/terminos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
