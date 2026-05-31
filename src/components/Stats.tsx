import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 800, suffix: "+", label: "Students" },
  { value: 30, suffix: "+", label: "Teachers" },
  { value: 12, suffix: "", label: "Streams" },
  { value: 12000, suffix: "+", label: "Alumni" },
];

const useCounter = (target: number, active: boolean, duration = 1800) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
};

const StatItem = ({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) => {
  const n = useCounter(value, active);
  return (
    <div className="text-center rounded-lg border border-white/20 bg-white/10 p-7 shadow-strong backdrop-blur transition-smooth hover:-translate-y-1 hover:bg-white/15">
      <p className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-2">
        {n.toLocaleString()}{suffix}
      </p>
      <p className="text-accent uppercase tracking-widest text-sm font-semibold">{label}</p>
    </div>
  );
};

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-cta relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};
