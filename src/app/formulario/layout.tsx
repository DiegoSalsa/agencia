import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotiza tu Proyecto Web",
  description:
    "Elige el tipo de proyecto que necesitas y completa el briefing. Landing page, sitio corporativo o e-commerce. Cotización instantánea y gratuita.",
  alternates: {
    canonical: "https://www.purocode.com/formulario",
  },
  openGraph: {
    title: "Cotiza tu Proyecto Web | PuroCode",
    description:
      "Completa el briefing y recibe tu cotización personalizada al instante. Landing pages, sitios corporativos y e-commerce.",
    url: "https://www.purocode.com/formulario",
  },
};

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
