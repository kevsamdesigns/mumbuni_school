import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Monitor,
  ShieldCheck,
  Trophy,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { useContent } from "@/hooks/useContent";
import heroStudents from "@/assets/hero-students-brand.png";
import heroSign from "@/assets/brand-school-sign.png";
import heroScience from "@/assets/brand-science-group.png";
import heroComputer from "@/assets/brand-computer-lab.png";
import heroLeadership from "@/assets/brand-leadership-podium.png";
import principal from "@/assets/principal.png";
import academicsImg from "@/assets/brand-computer-lab.png";
import sportsImg from "@/assets/brand-football.png";
import studentLifeImg from "@/assets/brand-reading-line.png";
import admissionsImg from "@/assets/brand-school-sign.png";
import newsImg from "@/assets/brand-assembly.png";

const highlights = [
  { icon: GraduationCap, title: "Academic Excellence", desc: "Quality education for bright futures.", color: "secondary" },
  { icon: Users, title: "Discipline & Integrity", desc: "Building character and strong moral values.", color: "primary" },
  { icon: Trophy, title: "Sports & Talent Development", desc: "Nurturing talent through sports and clubs.", color: "secondary" },
  { icon: ShieldCheck, title: "Leadership Opportunities", desc: "Developing leaders for tomorrow.", color: "primary" },
  { icon: Monitor, title: "Technology & Innovation", desc: "Preparing students for the digital world.", color: "secondary" },
];

const quickCards = [
  {
    image: academicsImg,
    title: "Academics",
    desc: "A strong curriculum that inspires excellence and critical thinking.",
    to: "/academics",
  },
  {
    image: sportsImg,
    title: "Sports & Activities",
    desc: "Discover, develop and enhance talent beyond the classroom.",
    to: "/gallery",
  },
  {
    image: studentLifeImg,
    title: "Student Life",
    desc: "Building friendships, leadership and lifelong memories.",
    to: "/about",
  },
  {
    image: admissionsImg,
    title: "Admissions",
    desc: "Join our family and be part of a legacy of excellence.",
    to: "/admissions",
  },
  {
    image: newsImg,
    title: "Latest News",
    desc: "Stay updated with the latest news and school events.",
    to: "/news",
  },
];

const heroSlides = [
  { image: heroStudents, alt: "Mumbuni Boys Senior School students in maroon blazers" },
  { image: heroSign, alt: "Mumbuni Boys Senior School sign" },
  { image: heroScience, alt: "Students doing science practicals" },
  { image: heroComputer, alt: "Students in the computer laboratory" },
  { image: heroLeadership, alt: "Student leader speaking at the podium" },
];

const homeDefaults = {
  "hero.title": "Mumbuni Boys\nSenior School",
  "hero.subtitle": "Empowering young men with knowledge, character, leadership, and excellence.",
  "hero.cta": "Learn More",
  "intro.heading": "Welcome to Mumbuni Boys Senior School",
  "intro.body":
    "Mumbuni Boys Senior School is committed to academic excellence, discipline, leadership, and holistic growth. We prepare young men to serve their communities with confidence, skill, and integrity.",
  "principal.message":
    "Welcome to Mumbuni Boys Senior School, a center of academic excellence, character formation, and holistic development.\n\nAt Mumbuni Boys, we believe that education extends beyond the classroom. Our mission is to nurture responsible, disciplined, and confident young men who are equipped with the knowledge, skills, and values needed to thrive in a rapidly changing world. Through quality teaching, innovation, mentorship, and co-curricular activities, we empower every learner to discover and maximize their potential.\n\nWe are committed to creating a supportive and inclusive learning environment where academic achievement, integrity, leadership, and personal growth are highly valued. Our dedicated staff work tirelessly to inspire excellence and cultivate a culture of hard work, respect, and lifelong learning.\n\nAs we continue to uphold our tradition of excellence, we warmly invite parents, guardians, alumni, and all stakeholders to partner with us in shaping the future of our learners. Together, we can prepare young men who will make meaningful contributions to their communities, our nation, and the world.\n\nThank you for visiting our website and for your interest in Mumbuni Boys Senior School.\n\nTogether We Excel.",
  "stats.students": "800+",
  "stats.teachers": "30+",
  "stats.streams": "12",
  "stats.alumni": "12000+",
} as const;

const parseStatValue = (value: string) => {
  const trimmed = value.trim();
  const numericValue = Number.parseInt(trimmed.replace(/,/g, "").replace(/[^\d]/g, ""), 10);
  const suffix = trimmed.replace(/[\d,\s]/g, "") || "";

  return {
    value: Number.isNaN(numericValue) ? 0 : numericValue,
    suffix,
  };
};

const Home = () => {
  const [slide, setSlide] = useState(0);
  const { getContent, loading } = useContent("home");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const heroTitle = getContent("hero.title", homeDefaults["hero.title"]);
  const heroSubtitle = getContent("hero.subtitle", homeDefaults["hero.subtitle"]);
  const heroCta = getContent("hero.cta", homeDefaults["hero.cta"]);
  const introHeading = getContent("intro.heading", homeDefaults["intro.heading"]);
  const introBody = getContent("intro.body", homeDefaults["intro.body"]);
  const principalMessage = getContent("principal.message", homeDefaults["principal.message"]);
  const studentStat = getContent("stats.students", homeDefaults["stats.students"]);
  const teacherStat = getContent("stats.teachers", homeDefaults["stats.teachers"]);
  const streamStat = getContent("stats.streams", homeDefaults["stats.streams"]);
  const alumniStat = getContent("stats.alumni", homeDefaults["stats.alumni"]);

  const glanceStats = [
    { icon: Users, value: studentStat, label: "Students", color: "secondary" },
    { icon: BookOpen, value: teacherStat, label: "Teachers", color: "primary" },
    { icon: Building2, value: streamStat, label: "Streams", color: "secondary" },
    { icon: Trophy, value: alumniStat, label: "Alumni", color: "primary" },
    { icon: CalendarDays, value: "10+", label: "Years of Excellence", color: "secondary" },
  ];

  const counterStats = [
    { ...parseStatValue(studentStat), label: "Students" },
    { ...parseStatValue(teacherStat), label: "Teachers" },
    { ...parseStatValue(streamStat), label: "Streams" },
    { ...parseStatValue(alumniStat), label: "Alumni" },
  ];

  return (
  <>
    <section className="relative min-h-[520px] overflow-hidden bg-primary-deep md:min-h-[560px]" aria-busy={loading}>
      {heroSlides.map((item, index) => (
        <img
          key={item.image}
          src={item.image}
          alt={item.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === slide ? "opacity-100 animate-ken-burns" : "opacity-0"}`}
          width={1920}
          height={1080}
          style={{ filter: "brightness(1.2) saturate(1.1) contrast(1.02)" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/86 via-primary-deep/62 to-black/18" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/45 via-black/12 to-transparent md:w-2/3" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-background [clip-path:ellipse(80%_55%_at_50%_100%)] md:h-24 md:[clip-path:ellipse(70%_55%_at_50%_100%)]" />
      <div className="absolute inset-x-0 bottom-7 h-5 bg-secondary [clip-path:ellipse(75%_70%_at_50%_100%)] md:bottom-9 md:h-7 md:[clip-path:ellipse(65%_70%_at_50%_100%)]" />

      <div className="container relative z-10 flex min-h-[520px] items-center py-12 md:min-h-[560px] md:py-16">
        <div className="max-w-3xl text-white">
          <h1 className="font-display text-4xl font-black leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl lg:text-7xl">
            {heroTitle.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < heroTitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div className="my-5 flex max-w-full items-center gap-3">
            <span className="h-0.5 w-10 shrink-0 bg-accent sm:w-16" />
            <p className="font-display text-base font-extrabold uppercase text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-xl md:text-2xl">Together We Excel</p>
            <span className="h-0.5 w-10 shrink-0 bg-accent sm:w-16" />
          </div>
          <p className="mb-7 max-w-xl text-base font-semibold leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] md:text-xl">
            {heroSubtitle}
          </p>
          <Button asChild className="bg-primary px-8 font-bold uppercase hover:bg-primary-deep">
            <Link to="/about">{heroCta}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-24">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show hero slide ${index + 1}`}
            onClick={() => setSlide(index)}
            className={`h-2 rounded-full transition-smooth ${index === slide ? "w-9 bg-accent" : "w-2 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>

    <section className="bg-background py-10 md:py-12">
      <div className="container max-w-4xl text-center">
        <h2 className="font-display text-2xl font-black uppercase text-primary md:text-3xl">{introHeading}</h2>
        <div className="mx-auto mb-5 mt-2 h-1 w-12 bg-secondary" />
        <p className="text-[15px] leading-relaxed text-foreground md:text-base">{introBody}</p>
      </div>
    </section>

    <section className="relative bg-background py-8 md:pb-8 md:pt-3">
      <div className="container grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {highlights.map((item) => (
          <article key={item.title} className="flex gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-elegant ${item.color === "primary" ? "bg-primary" : "bg-secondary"}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-2 font-display text-sm font-extrabold uppercase leading-snug text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-gradient-to-r from-secondary/12 via-background to-secondary/12 py-12 md:py-16">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
        <img
          src={principal}
          alt="Mr. Peter Kilonzo, Chief Principal"
          loading="lazy"
          className="max-h-[330px] w-full rounded-sm object-cover shadow-strong"
          width={1200}
          height={800}
        />
        <div>
          <h2 className="font-display text-2xl font-black uppercase text-primary md:text-3xl">Principal's Message</h2>
          <div className="mb-5 mt-2 h-1 w-12 bg-secondary" />
          <div className="space-y-3 text-[15px] leading-relaxed text-foreground">
            {principalMessage.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph} className={paragraph.trim() === "Together We Excel." ? "font-display font-extrabold text-primary" : undefined}>
                {paragraph}
              </p>
            ))}
            <div className="border-l-4 border-secondary pl-4 pt-1">
              <p className="font-display font-extrabold text-primary-deep">Mr. Peter Kilonzo</p>
              <p className="text-sm font-semibold text-foreground">Chief Principal</p>
              <p className="text-sm text-muted-foreground">Mumbuni Boys Senior School</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-background py-10 md:py-12">
      <div className="container">
        <div className="mb-7 text-center">
          <h2 className="font-display text-2xl font-black uppercase text-primary md:text-3xl">Our School at a Glance</h2>
          <div className="mx-auto mt-2 h-1 w-12 bg-secondary" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {glanceStats.map((item) => (
            <article key={item.label} className="flex items-center justify-center gap-4 rounded-sm border border-border bg-card p-5 shadow-card-soft">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${item.color === "primary" ? "bg-primary" : "bg-secondary"}`}>
                <item.icon className="h-7 w-7" />
              </div>
              <div>
                <p className={`font-display text-2xl font-black ${item.color === "primary" ? "text-primary" : "text-secondary"}`}>{item.value}</p>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-background pb-12 md:pb-8">
      <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {quickCards.map((card) => (
          <article key={card.title} className="overflow-hidden rounded-sm bg-secondary/10 text-center shadow-card-soft">
            <img src={card.image} alt={card.title} loading="lazy" className="h-32 w-full object-cover" width={520} height={300} />
            <div className="p-5">
              <h3 className="mb-2 font-display text-lg font-black uppercase text-foreground">{card.title}</h3>
              <p className="mb-4 min-h-[60px] text-sm leading-relaxed text-foreground">{card.desc}</p>
              <Button asChild size="sm" className="bg-primary px-6 text-xs font-bold uppercase hover:bg-primary-deep">
                <Link to={card.to}>Read More</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>

    <Stats items={counterStats} />
  </>
  );
};

export default Home;
