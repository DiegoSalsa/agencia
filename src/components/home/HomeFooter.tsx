"use client";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { useI18n } from "@/context/I18nContext";
import styles from "./home.module.css";

// Complete original Footer content; editorial presentation for the Home.
export default function HomeFooter() {
  const { t } = useI18n();
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerIdentity}>
          <Link href="/#hero" className={styles.footerBrand} aria-label="PuroCode, inicio"><span className={styles.smallMark} aria-hidden="true" /><span>PuroCode</span></Link>
          <p>{t("footer_desc")}</p>
          <div className={styles.footerSocials}>
            <a href="https://www.instagram.com/purocodecl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} aria-hidden="true" /></a>
            <a href="https://www.facebook.com/PuroCode.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} aria-hidden="true" /></a>
            <a href="https://wa.me/56949255006" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
          </div>
        </div>
        <nav aria-label={t("footer_services")}><h3>{t("footer_services")}</h3>
          <Link href="/soluciones/landing-pages">{t("footer_landing")}</Link>
          <Link href="/soluciones/paginas-web-corporativas">{t("footer_corp")}</Link>
          <Link href="/soluciones/tienda-online">{t("footer_shop")}</Link>
          <Link href="/servicios">{t("nav_services")}</Link>
          <Link href="/planes">{t("nav_pricing")}</Link>
        </nav>
        <div><h3>{t("footer_contact")}</h3>
          <a href="mailto:contacto@purocode.com">contacto@purocode.com</a>
          <a href="https://wa.me/56949255006" target="_blank" rel="noopener noreferrer">+56 9 4925 5006</a>
        </div>
        <nav aria-label={t("footer_company")}><h3>{t("footer_company")}</h3>
          <Link href="/contacto">{t("nav_contact")}</Link>
          <Link href="/labs">{t("footer_labs")}</Link>
          <Link href="/faq">{t("faq_title")}</Link>
          <Link href="/terminos">{t("footer_terms")}</Link>
          <Link href="/privacidad">{t("footer_privacy")}</Link>
        </nav>
      </div>
      <div className={styles.footerBottom}><p>© {new Date().getFullYear()} PuroCode. {t("footer_rights")}</p><nav aria-label="Legal"><Link href="/terminos">{t("footer_terms")}</Link><span aria-hidden="true">·</span><Link href="/privacidad">{t("footer_privacy")}</Link></nav></div>
    </footer>
  );
}
