import { Quote, Target, Eye, Heart, GraduationCap, ShieldCheck, BookOpen, ClipboardList, Trophy, HeartHandshake, UserCog } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import campusAerial from "@/assets/brand-campus-aerial.png";
import deputyOloo from "@/assets/deputy-oloo.jpg";
import deputyAgnes from "@/assets/deputy-agnes.jpg";

const deputies = [
  {
    name: "Deputy Principal - Academics",
    role: "Academic Programmes",
    icon: GraduationCap,
    photo: deputyOloo,
    message:
      "Our academic programme is anchored on strong classroom instruction, regular assessment, mentorship and a culture of continuous improvement.",
  },
  {
    name: "Deputy Principal - Administration",
    role: "Student Welfare & Discipline",
    icon: ShieldCheck,
    photo: deputyAgnes,
    message:
      "We provide a structured environment where learners are safe, disciplined, responsible and supported to grow into dependable young men.",
  },
];

const seniorStaff = [
  { name: "Senior Teacher", role: "Academic Standards", icon: UserCog, desc: "Coordinates teaching staff, lesson supervision and learner progress." },
  { name: "Exams Coordinator", role: "Assessment", icon: ClipboardList, desc: "Plans, administers and analyses internal and national assessments." },
  { name: "Sports Director", role: "Co-curricular", icon: Trophy, desc: "Leads sports programmes, teams and talent development." },
  { name: "Guidance & Counselling", role: "Student Support", icon: HeartHandshake, desc: "Supports student wellbeing, mentorship and personal growth." },
];

const About = () => (
  <>
    <PageHeader eyebrow="Who We Are" title="About Mumbuni Boys Senior School" subtitle="A center of academic excellence, discipline and responsible leadership in Machakos, Kenya." />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-primary/30 rounded-2xl" />
          <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-accent/30 rounded-2xl" />
          <img src={campusAerial} alt="Aerial view of Mumbuni Boys Senior School campus" loading="lazy" width={1200} height={800} className="relative rounded-2xl shadow-strong w-full max-w-xl mx-auto object-cover aspect-[4/3]" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-elegant whitespace-nowrap">
            Mumbuni Boys Senior School Campus
          </div>
        </div>
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Short School History</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-6">A Growing Heritage of Excellence</h2>
          <BookOpen className="w-10 h-10 text-secondary mb-4" />
          <div className="space-y-4 text-foreground/85 leading-relaxed mb-6">
            <p>
              <strong className="text-primary-deep">Mumbuni Boys Senior School</strong> has grown into a respected boys' learning institution in Machakos, known for discipline, academic ambition, and strong character formation.
            </p>
            <p>
              Over the years, the school has built a culture where classroom learning, mentorship, spiritual growth, sports, clubs, and leadership opportunities work together to shape responsible young men.
            </p>
            <p>
              Today, Mumbuni Boys Senior School continues to serve learners from Machakos and beyond, preparing them for senior school pathways, national examinations, higher education, and meaningful service to society.
            </p>
            <p>
              Guided by the motto <strong className="text-primary-deep">Together We Excel</strong>, the school remains committed to academic excellence, integrity, discipline, and holistic development.
            </p>
          </div>
          <div className="border-l-4 border-secondary pl-4">
            <p className="font-display font-bold text-xl text-primary-deep">Together We Excel</p>
            <p className="text-sm text-muted-foreground">Academic excellence, discipline, leadership and service.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Mission", desc: "To nurture holistic, disciplined and responsible learners through quality education, mentorship and co-curricular growth." },
          { icon: Eye, title: "Our Vision", desc: "To be a center of academic excellence that prepares boys to lead, serve and excel in a changing world." },
          { icon: Heart, title: "Our Motto", desc: "Together We Excel." },
        ].map((c) => (
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
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">School Leadership</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Leadership and Student Support</h2>
          <p className="text-muted-foreground text-lg">A dedicated team driving academic excellence, discipline and a thriving school community.</p>
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
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Departmental Heads</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Senior Staff</h2>
          <p className="text-muted-foreground text-lg">A dedicated team supporting every aspect of learning and school life.</p>
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
        <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3 text-center">Our Story</p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-8 text-center">A Heritage of Excellence</h2>
        <div className="space-y-5 text-foreground/85 text-lg leading-relaxed">
          <p>
            Mumbuni Boys Senior School is a boys' secondary school in Machakos, Kenya, dedicated to building academic excellence, discipline and responsible leadership.
          </p>
          <p>
            The school provides both Senior School pathways and 8-4-4 candidate preparation, supported by committed teachers, structured routines, mentorship and co-curricular opportunities.
          </p>
          <p>
            Beyond academics, students participate in clubs, sports, leadership and service activities that strengthen confidence, teamwork and character.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default About;
