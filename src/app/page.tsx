import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { generatePageMetadata } from "@/lib/seo";

const homeTitle = "Desarrollo web y software a medida en Chile | PuroCode";
export const metadata: Metadata = {
  ...generatePageMetadata({
    title: homeTitle,
    description: "Desarrollo web y software a medida para empresas en Chile. Creamos sitios web, tiendas online y sistemas de gestión. Conoce nuestros proyectos y cotiza el tuyo.",
    path: "/",
  }),
  title: { absolute: homeTitle },
};

export default function Home() {
  return <HomePage />;
}
