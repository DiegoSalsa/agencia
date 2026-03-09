"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-JJJ4VZW6M9";

export default function GoogleAnalytics() {
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

  if (!hasConsent || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
