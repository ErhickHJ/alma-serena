"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

function RedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      router.replace("/sign-up");
    }
  }, [searchParams, router]);

  return null;
}

export default function LoginPage() {
  return (
    <section className="py-12 bg-gradient-to-b from-sage/5 to-warm-white">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">Cuenta</div>
          <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Iniciar sesión</h1>
        </div>
        <div className="bg-warm-white rounded-xl p-8 border border-sage/10 shadow-sm flex justify-center">
          <Suspense fallback={null}>
            <RedirectHandler />
            <SignIn signUpUrl="/sign-up" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
