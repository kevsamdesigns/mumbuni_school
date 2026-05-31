import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/mumbuni-logo.png";
import sign from "@/assets/brand-school-sign.png";
import students from "@/assets/hero-students-brand.png";
import lab from "@/assets/brand-science-group.png";
import computer from "@/assets/brand-computer-lab.png";
import leadership from "@/assets/brand-leadership-podium.png";

const slides = [
  {
    image: sign,
    title: "Mumbuni Boys Senior School",
    subtitle: "Together We Excel through discipline, academic focus and character.",
  },
  {
    image: students,
    title: "A Home for Responsible Young Men",
    subtitle: "Nurturing learners who are confident, principled and ready to lead.",
  },
  {
    image: lab,
    title: "Excellence in Senior School Learning",
    subtitle: "Strong academics, practical skills, sports and co-curricular growth.",
  },
  {
    image: computer,
    title: "Technology for Confident Learners",
    subtitle: "Digital literacy, research and practical skills for tomorrow's leaders.",
  },
  {
    image: leadership,
    title: "Leadership with Character",
    subtitle: "Nurturing confident young men who speak, serve and lead with integrity.",
  },
];

export const HeroCarousel = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section id="home" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden -mt-[72px] md:-mt-[104px]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className={`w-full h-full object-cover ${idx === i ? "animate-ken-burns" : ""}`}
            width={1920}
            height={1080}
            style={{ filter: "brightness(1.16) saturate(1.1) contrast(1.03)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/70 via-primary/34 to-secondary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-white/5" />
        </div>
      ))}

      <div className="relative z-10 h-full container flex flex-col justify-center text-primary-foreground">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-foreground/12 backdrop-blur border border-primary-foreground/20 text-sm mb-6 animate-fade-in">
            <img src={logo} alt="Mumbuni Boys Senior School logo" className="w-8 h-8 rounded bg-white object-contain p-0.5" />
            <span><GraduationCap className="w-4 h-4 inline mr-2" /> Boys Senior School - Machakos</span>
          </div>
          <h1 key={i} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {slides[i].title}
          </h1>
          <p key={`s-${i}`} className="text-lg md:text-2xl text-primary-foreground mb-10 max-w-2xl animate-fade-in-up drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
            {slides[i].subtitle}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Apply Now <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <button onClick={() => go(i - 1)} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-smooth flex items-center justify-center">
        <ChevronLeft />
      </button>
      <button onClick={() => go(i + 1)} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-smooth flex items-center justify-center">
        <ChevronRight />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-smooth ${idx === i ? "w-10 bg-accent" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground"}`}
          />
        ))}
      </div>
    </section>
  );
};
