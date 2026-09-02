import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import ServiceFicha from "@/components/seo/ServiceFicha";

export const metadata: Metadata = generatePageMetadata({
  title: "E-commerce Chile",
  description:
    "Tienda online con catálogo, carrito, checkout y pagos locales. Desde $550.000 CLP. A medida cuando el template no alcanza. Remoto para todo Chile.",
  path: "/soluciones/tienda-online",
});

export default function Page() {
  return (
    <PromoProvider>
      <Header />
      <ServiceFicha
        title="E-commerce"
        highlight="Chile"
        subtitle="Catálogo, carrito y pagos. Si el template se queda corto, la tienda se arma a medida. No un PDF con transferencia."
        path="/soluciones/tienda-online"
        breadcrumbLabel="E-commerce"
        lead={[
          "Una tienda online tiene que dejar comprar: ver el producto, armar el carrito, pagar y recibir el pedido. En Chile eso implica Webpay, Flow o Mercado Pago, no solo una ficha de Instagram.",
          "Si Shopify o un tema genérico te alcanza, úsalos. Acá entramos cuando el flujo, el catálogo o la marca piden algo que el template no da.",
        ]}
        priceLabel="Desde $550.000 CLP"
        timeline="15–25 días hábiles"
        includes={[
          "Catálogo de productos con fichas, fotos y stock",
          "Carrito y checkout",
          "Pasarela de pago local (Webpay, Flow o Mercado Pago)",
          "Diseño a medida, móvil primero",
          "Dominio .cl o .com y hosting el primer año",
          "Soporte técnico 6 meses",
        ]}
        excludes={[
          "Marketplace tipo Mercado Libre (eso es otro canal)",
          "Fotos de producto ni operación logística",
          "Pauta de Meta/Google ni community management",
          "ERP o facturación electrónica, salvo que se cotice aparte",
        ]}
        forWho={[
          "Marcas que ya venden y se les quedó chico el template",
          "Negocios con catálogo real (no tres productos y un WhatsApp)",
          "Quien necesita checkout y pago en Chile, no solo transferencia",
        ]}
        notFor={[
          "Un servicio que se cotiza a medida: eso es corporativa o landing",
          "Quien todavía no tiene productos, fotos ni cómo despacha",
        ]}
        example={{
          client: "Florería Wildgarden",
          type: "E-commerce",
          problem:
            "Vendían arreglos por Instagram. No tenían canal propio ni un pedido que no dependiera del chat.",
          solution:
            "Tienda con catálogo visual, flujo de pedido y diseño pensado para elegir el arreglo y comprar.",
          result:
            "Canal de venta 24/7, independiente de la red social.",
          href: "https://www.floreriawildgarden.cl",
        }}
        faqs={[
          {
            question: "¿Por qué no usar solo Shopify?",
            answer:
              "Si Shopify te sirve, úsalo. Cotizamos a medida cuando el checkout, el catálogo o la marca no entran en el tema: combos, pedidos con fecha, catálogo visual pesado, o un front que tenga que cargar rápido y rankear.",
          },
          {
            question: "¿Qué medios de pago incluyen?",
            answer:
              "Webpay, Flow o Mercado Pago, según el negocio. Transferencia como respaldo si la quieres. El alta en Transbank o similar la hace el cliente; nosotros integramos.",
          },
          {
            question: "¿Cuánto demora y cómo se paga?",
            answer:
              "15 a 25 días hábiles después de aprobar diseño y estructura del catálogo. 50% al inicio y 50% a la entrega, más IVA. Dominio y hosting el primer año, soporte 6 meses.",
          },
          {
            question: "¿Quién carga los productos?",
            answer:
              "El plan base deja el catálogo armado para que cargues. Si el listado es grande, se puede cotizar la carga inicial. Fotos y precios los defines tú.",
          },
        ]}
        quoteHref="/formulario/ecommerce"
        whatsappText="Hola, quiero cotizar una tienda online"
        schemaName="E-commerce Chile"
        schemaDescription="Tienda online con catálogo, carrito, checkout y pagos locales. Desde $550.000 CLP. Remoto para todo Chile."
        related={[
          { href: "/soluciones/landing-pages", label: "Landing pages" },
          { href: "/soluciones/paginas-web-corporativas", label: "Páginas corporativas" },
          { href: "/mantenimiento", label: "Mantención" },
          { href: "/planes", label: "Ver planes" },
        ]}
      />
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
