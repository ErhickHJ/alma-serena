"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;

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
  }, []);

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
