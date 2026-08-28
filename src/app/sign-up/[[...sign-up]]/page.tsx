import SignUpContent from "./SignUpContent";
import { LotusAnimation } from "@/components/LotusAnimation";

export default function SignUpPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sage/5 to-warm-white px-4 py-12">
      <div className="w-full max-w-md text-center">
        <LotusAnimation />
        <h1 className="font-serif text-2xl text-sage-dark mb-1">Crea tu cuenta</h1>
        <p className="text-sm text-charcoal/50 mb-8">Empieza tu viaje de gratitud</p>
        <SignUpContent />
      </div>
    </section>
  );
}
