export default function CheckoutLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-2xl mx-auto px-4">
      <div className="h-8 w-40 bg-sage/10 rounded-lg mx-auto mb-8" />
      <div className="bg-warm-white rounded-xl border border-sage/10 p-6 space-y-4">
        <div className="h-4 w-1/3 bg-sage/10 rounded" />
        <div className="h-10 w-full bg-sage/10 rounded-lg" />
        <div className="h-10 w-full bg-sage/10 rounded-lg" />
        <div className="h-10 w-1/2 bg-sage/10 rounded-lg" />
        <div className="h-12 w-full bg-sage/10 rounded-lg" />
      </div>
    </div>
  );
}
