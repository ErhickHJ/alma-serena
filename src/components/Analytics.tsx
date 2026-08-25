"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  if (!GA_ID) return null;

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
