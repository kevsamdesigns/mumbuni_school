import { GraduationCap, BookOpen, FlaskConical, Languages, Calculator, Globe2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import lab from "@/assets/brand-lab-practical.png";

const grades = [
  {
    title: "Grade 10",
    system: "CBC / CBE",
    desc: "Senior School entry under the Competency-Based Curriculum. Students choose pathways aligned to their talents and career interests.",
    pathways: ["STEM", "Social Sciences", "Arts & Sports Science"],
  },
  {
    title: "Form 3",
    system: "8-4-4",
    desc: "Continuing learners deepen mastery of core sciences, languages and humanities in preparation for KCSE.",
    pathways: ["Sciences", "Languages", "Humanities"],
  },
  {
    title: "Form 4",
    system: "8-4-4",
    desc: "Final preparation for the Kenya Certificate of Secondary Education through focused revision, mentorship and career guidance.",
    pathways: ["KCSE Prep", "Career Guidance", "University Placement"],
  },
];

const departments = [
  { icon: Calculator, title: "Mathematics", desc: "Strong numerical foundation through guided practice and problem-solving." },
  { icon: FlaskConical, title: "Sciences", desc: "Biology, Chemistry and Physics with practical lab work." },
  { icon: Languages, title: "Languages", desc: "English, Kiswahili and communication skills for academic and professional readiness." },
  { icon: Globe2, title: "Humanities", desc: "History, Geography, CRE and Business Studies." },
  { icon: BookOpen, title: "Creative Arts", desc: "Music, art and design that nurture confidence and self-expression." },
  { icon: GraduationCap, title: "Technical Subjects", desc: "Computer Studies, Agriculture and practical skills for modern careers." },
];

const Academics = () => (
  <>
    <PageHeader eyebrow="Curriculum & Learning" title="Academics" subtitle="A rigorous CBC & CBE programme blended with the 8-4-4 system, designed for academic excellence at Mumbuni Boys Senior School." />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <img src={lab} alt="Mumbuni Boys students in a science laboratory" loading="lazy" width={1280} height={720} className="rounded-2xl shadow-strong object-cover aspect-[16/10]" />
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">CBC • CBE • 8-4-4</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-5">Two Curricula. One Standard of Excellence.</h2>
          <p className="text-foreground/85 text-lg leading-relaxed mb-4">
            Mumbuni Boys Senior School delivers both the <strong className="text-primary-deep">Competency-Based Curriculum (CBC)</strong> and Competency-Based Education (CBE) for Senior School learners, alongside the legacy <strong className="text-primary-deep">8-4-4 system</strong> for Form 3 and Form 4 candidates.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our teachers tailor instruction to each pathway so every learner discovers strengths, builds discipline and prepares for future study and work.
          </p>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Levels Offered</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Classes & Pathways</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {grades.map((g) => (
            <div key={g.title} className="bg-card border border-secondary/40 rounded-lg p-8 shadow-card-soft hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-3xl text-primary-deep">{g.title}</h3>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-deep text-xs font-semibold">{g.system}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">{g.desc}</p>
              <ul className="space-y-2">
                {g.pathways.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Departments</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Subjects We Teach</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d) => (
            <div key={d.title} className="p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
              <div className="w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center mb-4 shadow-elegant">
                <d.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl text-primary-deep mb-2">{d.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Academics;
