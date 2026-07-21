"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("alma-cookie-consent") === "accepted") {
      setConsented(true);
    }
  }, []);

  useEffect(() => {
    if (!GA_ID || !consented) return;

    if (!(window as any).gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () { (window as any).dataLayer.push(arguments); };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", GA_ID);
    }
  }, [consented]);

  useEffect(() => {
    if ((window as any).gtag && consented) {
      (window as any).gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname, consented]);

  return null;
}
