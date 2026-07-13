import { SignIn } from "@clerk/nextjs";
import { LotusAnimation } from "@/components/LotusAnimation";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sage/5 to-warm-white">
      <div className="w-full max-w-md px-4 py-12 text-center">
        <LotusAnimation />
        <h1 className="font-serif text-2xl text-sage-dark mb-1">Bienvenido de nuevo</h1>
        <p className="text-sm text-charcoal/50 mb-8">Inicia sesión para continuar tu viaje</p>
        <SignIn />
      </div>
    </div>
  );
}
