import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Labs from "@/components/landing/Labs";
import { PromoProvider } from "@/context/PromoContext";
import SocialFloater from "@/components/shared/SocialFloater";
import PromoBanner from "@/components/landing/PromoBanner";
import PromoPopup from "@/components/landing/PromoPopup";
import PageHeader from "@/components/shared/PageHeader";
import { Beaker } from "lucide-react";
import { generatePageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { labsJsonLd, labsPageCopy } from "@/lib/labs";

const SITE_URL = "https://www.purocode.com";
const PAGE_URL = `${SITE_URL}/labs`;

export const metadata: Metadata = generatePageMetadata({
  title: "Labs: Puragenda, SaaS de agendamiento",
  description: labsPageCopy.description,
  path: "/labs",
});

export default function LabsPage() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            ...labsJsonLd(),
            breadcrumbJsonLd([
              { name: "Inicio", url: SITE_URL },
              { name: "Labs", url: PAGE_URL },
            ]),
          ]),
        }}
      />
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader
          title="PuroCode"
          highlight="Labs"
          subtitle={labsPageCopy.hubIntro}
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase">
              <Beaker size={14} />
              Productos propios
            </div>
          }
          breadcrumb={[{ label: "Labs", href: "/labs" }]}
        />
        <div className="pb-20">
          <Labs />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
