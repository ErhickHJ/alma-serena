export default function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-sage-light ${className}`}>
      <span className="block h-px w-12 bg-sage-light/50" />
      <span className="text-lg">✿</span>
      <span className="block h-px w-12 bg-sage-light/50" />
    </div>
  );
}
