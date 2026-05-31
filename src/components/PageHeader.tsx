interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export const PageHeader = ({ title, subtitle, eyebrow }: PageHeaderProps) => (
  <section className="relative overflow-hidden bg-gradient-cta py-12 text-primary-foreground md:py-20 lg:py-24">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 18% 40%, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
    <div className="container text-center">
      {eyebrow && (
        <p className="text-accent font-semibold uppercase tracking-[0.3em] text-xs mb-4">{eyebrow}</p>
      )}
      <h1 className="section-title-accent mb-4 font-display text-3xl font-extrabold leading-tight animate-fade-in-up md:text-5xl lg:text-6xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto max-w-3xl text-base text-primary-foreground/90 animate-fade-in md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
    <div className="sky-curve" />
  </section>
);
