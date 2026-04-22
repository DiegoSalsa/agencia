"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PHCH2KNZ";

export default function GoogleTagManager() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    function checkConsent() {
      const consent = localStorage.getItem("cookie_consent");
      setHasConsent(consent === "all");
    }
    checkConsent();
    window.addEventListener("consent-updated", checkConsent);
    return () => window.removeEventListener("consent-updated", checkConsent);
  }, []);

  if (!hasConsent || !GTM_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
    </Script>
  );
}
