"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "alma-cookie-consent";
const ACCEPTED = "accepted";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === ACCEPTED;
  } catch {
    return false;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const [consented, setConsented] = useState(() =>
    typeof window !== "undefined" ? hasConsent() : false
  );

  useEffect(() => {
    const sync = () => setConsented(hasConsent());
    window.addEventListener("storage", sync);
    window.addEventListener("alma-cookie-consent-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("alma-cookie-consent-change", sync);
    };
  }, []);

  useEffect(() => {
    if (!consented) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname, consented]);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "${GA_ID}");
        `}
      </Script>
    </>
  );
}
