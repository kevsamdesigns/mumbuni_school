import { Quote, Target, Eye, Heart, GraduationCap, ShieldCheck, BookOpen, ClipboardList, Trophy, HeartHandshake, UserCog } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useContent } from "@/hooks/useContent";
import campusAerial from "@/assets/brand-campus-aerial.png";
import deputyOloo from "@/assets/deputy-oloo.jpg";

const aboutDefaults = {
  "header.eyebrow": "Who We Are",
  "header.title": "About Mumbuni Boys Senior School",
  "header.subtitle": "A center of academic excellence, discipline and responsible leadership in Machakos, Kenya.",
  "history.eyebrow": "Short School History",
  "history.heading": "A Growing Heritage of Excellence",
  "history.imageBadge": "Mumbuni Boys Senior School Campus",
  "history.body":
    "Mumbuni Boys Senior School has grown into a respected boys' learning institution in Machakos, known for discipline, academic ambition, and strong character formation.\n\nOver the years, the school has built a culture where classroom learning, mentorship, spiritual growth, sports, clubs, and leadership opportunities work together to shape responsible young men.\n\nToday, Mumbuni Boys Senior School continues to serve learners from Machakos and beyond, preparing them for senior school pathways, national examinations, higher education, and meaningful service to society.\n\nGuided by the motto Together We Excel, the school remains committed to academic excellence, integrity, discipline, and holistic development.",
  "history.motto": "Together We Excel",
  "history.mottoBody": "Academic excellence, discipline, leadership and service.",
  "mission.title": "Our Mission",
  "mission.body": "To nurture holistic, disciplined and responsible learners through quality education, mentorship and co-curricular growth.",
  "vision.title": "Our Vision",
  "vision.body": "To be a center of academic excellence that prepares boys to lead, serve and excel in a changing world.",
  "motto.title": "Our Motto",
  "motto.body": "Together We Excel.",
  "leadership.eyebrow": "School Leadership",
  "leadership.heading": "Leadership and Student Support",
  "leadership.body": "A dedicated team driving academic excellence, discipline and a thriving school community.",
  "deputy.academics.name": "Mr. Mutisya",
  "deputy.academics.role": "Deputy Academics",
  "deputy.academics.message": "Our academic programme is anchored on strong classroom instruction, regular assessment, mentorship and a culture of continuous improvement.",
  "deputy.admin.name": "Mr. Masuki",
  "deputy.admin.role": "Deputy Administration",
  "deputy.admin.message": "We provide a structured environment where learners are safe, disciplined, responsible and supported to grow into dependable young men.",
  "staff.eyebrow": "Departmental Heads",
  "staff.heading": "Senior Staff",
  "staff.body": "A dedicated team supporting every aspect of learning and school life.",
  "staff.1.name": "Senior Teacher",
  "staff.1.role": "Academic Standards",
  "staff.1.desc": "Coordinates teaching staff, lesson supervision and learner progress.",
  "staff.2.name": "Exams Coordinator",
  "staff.2.role": "Assessment",
  "staff.2.desc": "Plans, administers and analyses internal and national assessments.",
  "staff.3.name": "Sports Director",
  "staff.3.role": "Co-curricular",
  "staff.3.desc": "Leads sports programmes, teams and talent development.",
  "staff.4.name": "Guidance & Counselling",
  "staff.4.role": "Student Support",
  "staff.4.desc": "Supports student wellbeing, mentorship and personal growth.",
  "story.eyebrow": "Our Story",
  "story.heading": "A Heritage of Excellence",
  "story.body":
    "Mumbuni Boys Senior School is a boys' secondary school in Machakos, Kenya, dedicated to building academic excellence, discipline and responsible leadership.\n\nThe school provides both Senior School pathways and 8-4-4 candidate preparation, supported by committed teachers, structured routines, mentorship and co-curricular opportunities.\n\nBeyond academics, students participate in clubs, sports, leadership and service activities that strengthen confidence, teamwork and character.",
} as const;

const paragraphList = (value: string) => value.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

const About = () => {
  const { getContent } = useContent("about");

  const deputies = [
  {
    name: getContent("deputy.academics.name", aboutDefaults["deputy.academics.name"]),
    role: getContent("deputy.academics.role", aboutDefaults["deputy.academics.role"]),
    icon: GraduationCap,
    photo: deputyOloo,
    message: getContent("deputy.academics.message", aboutDefaults["deputy.academics.message"]),
  },
  {
    name: getContent("deputy.admin.name", aboutDefaults["deputy.admin.name"]),
    role: getContent("deputy.admin.role", aboutDefaults["deputy.admin.role"]),
    icon: ShieldCheck,
    photo: deputyOloo,
    message: getContent("deputy.admin.message", aboutDefaults["deputy.admin.message"]),
  },
  ];

  const seniorStaff = [
    { name: getContent("staff.1.name", aboutDefaults["staff.1.name"]), role: getContent("staff.1.role", aboutDefaults["staff.1.role"]), icon: UserCog, desc: getContent("staff.1.desc", aboutDefaults["staff.1.desc"]) },
    { name: getContent("staff.2.name", aboutDefaults["staff.2.name"]), role: getContent("staff.2.role", aboutDefaults["staff.2.role"]), icon: ClipboardList, desc: getContent("staff.2.desc", aboutDefaults["staff.2.desc"]) },
    { name: getContent("staff.3.name", aboutDefaults["staff.3.name"]), role: getContent("staff.3.role", aboutDefaults["staff.3.role"]), icon: Trophy, desc: getContent("staff.3.desc", aboutDefaults["staff.3.desc"]) },
    { name: getContent("staff.4.name", aboutDefaults["staff.4.name"]), role: getContent("staff.4.role", aboutDefaults["staff.4.role"]), icon: HeartHandshake, desc: getContent("staff.4.desc", aboutDefaults["staff.4.desc"]) },
  ];

  const values = [
    { icon: Target, title: getContent("mission.title", aboutDefaults["mission.title"]), desc: getContent("mission.body", aboutDefaults["mission.body"]) },
    { icon: Eye, title: getContent("vision.title", aboutDefaults["vision.title"]), desc: getContent("vision.body", aboutDefaults["vision.body"]) },
    { icon: Heart, title: getContent("motto.title", aboutDefaults["motto.title"]), desc: getContent("motto.body", aboutDefaults["motto.body"]) },
  ];

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", aboutDefaults["header.eyebrow"])}
      title={getContent("header.title", aboutDefaults["header.title"])}
      subtitle={getContent("header.subtitle", aboutDefaults["header.subtitle"])}
    />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-primary/30 rounded-2xl" />
          <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-accent/30 rounded-2xl" />
          <img src={campusAerial} alt="Aerial view of Mumbuni Boys Senior School campus" loading="lazy" width={1200} height={800} className="relative rounded-2xl shadow-strong w-full max-w-xl mx-auto object-cover aspect-[4/3]" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-elegant whitespace-nowrap">
            {getContent("history.imageBadge", aboutDefaults["history.imageBadge"])}
          </div>
        </div>
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("history.eyebrow", aboutDefaults["history.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-6">{getContent("history.heading", aboutDefaults["history.heading"])}</h2>
          <BookOpen className="w-10 h-10 text-secondary mb-4" />
          <div className="space-y-4 text-foreground/85 leading-relaxed mb-6">
            {paragraphList(getContent("history.body", aboutDefaults["history.body"])).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="border-l-4 border-secondary pl-4">
            <p className="font-display font-bold text-xl text-primary-deep">{getContent("history.motto", aboutDefaults["history.motto"])}</p>
            <p className="text-sm text-muted-foreground">{getContent("history.mottoBody", aboutDefaults["history.mottoBody"])}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container grid md:grid-cols-3 gap-6">
        {values.map((c) => (
          <div key={c.title} className="bg-card p-8 rounded-lg border border-secondary/40 shadow-card-soft hover-lift">
            <div className="w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center mb-5 shadow-elegant">
              <c.icon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl text-primary-deep mb-3">{c.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("leadership.eyebrow", aboutDefaults["leadership.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("leadership.heading", aboutDefaults["leadership.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("leadership.body", aboutDefaults["leadership.body"])}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {deputies.map((d) => (
            <article key={d.name} className="group p-8 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift transition-smooth">
              <div className="flex items-center gap-5 mb-5">
                <div className="relative shrink-0">
                  <img
                    src={d.photo}
                    alt={d.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="w-24 h-24 rounded-2xl object-cover shadow-elegant ring-2 ring-secondary/40 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-md">
                    <d.icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-primary-deep">{d.name}</h3>
                  <p className="text-sm text-secondary font-semibold">{d.role}</p>
                </div>
              </div>
              <Quote className="w-7 h-7 text-secondary mb-3" />
              <p className="text-foreground/85 leading-relaxed">{d.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("staff.eyebrow", aboutDefaults["staff.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("staff.heading", aboutDefaults["staff.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("staff.body", aboutDefaults["staff.body"])}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seniorStaff.map((s) => (
            <article key={s.name} className="group p-6 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift text-center">
              <div className="inline-flex w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-elegant">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg text-primary-deep">{s.name}</h3>
              <p className="text-sm text-secondary font-semibold mb-2">{s.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container max-w-4xl">
        <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3 text-center">{getContent("story.eyebrow", aboutDefaults["story.eyebrow"])}</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-8 text-center">{getContent("story.heading", aboutDefaults["story.heading"])}</h2>
        <div className="space-y-5 text-foreground/85 text-lg leading-relaxed">
          {paragraphList(getContent("story.body", aboutDefaults["story.body"])).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  </>
  );
};

export default About;
