export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-3xl sm:text-4xl text-sage-dark text-center">
      {children}
    </h2>
  );
}
