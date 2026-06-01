import { GraduationCap, BookOpen, FlaskConical, Languages, Calculator, Globe2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useContent } from "@/hooks/useContent";
import lab from "@/assets/brand-lab-practical.png";

const academicsDefaults = {
  "header.eyebrow": "Curriculum & Learning",
  "header.title": "Academics",
  "header.subtitle": "A rigorous CBC & CBE programme blended with the 8-4-4 system, designed for academic excellence at Mumbuni Boys Senior School.",
  "overview.eyebrow": "CBC • CBE • 8-4-4",
  "overview.heading": "Two Curricula. One Standard of Excellence.",
  "overview.body":
    "Mumbuni Boys Senior School delivers both the Competency-Based Curriculum (CBC) and Competency-Based Education (CBE) for Senior School learners, alongside the legacy 8-4-4 system for Form 3 and Form 4 candidates.\n\nOur teachers tailor instruction to each pathway so every learner discovers strengths, builds discipline and prepares for future study and work.",
  "levels.eyebrow": "Levels Offered",
  "levels.heading": "Classes & Pathways",
  "grade.1.title": "Grade 10",
  "grade.1.system": "CBC / CBE",
  "grade.1.desc": "Senior School entry under the Competency-Based Curriculum. Students choose pathways aligned to their talents and career interests.",
  "grade.1.pathways": "STEM\nSocial Sciences\nArts & Sports Science",
  "grade.2.title": "Form 3",
  "grade.2.system": "8-4-4",
  "grade.2.desc": "Continuing learners deepen mastery of core sciences, languages and humanities in preparation for KCSE.",
  "grade.2.pathways": "Sciences\nLanguages\nHumanities",
  "grade.3.title": "Form 4",
  "grade.3.system": "8-4-4",
  "grade.3.desc": "Final preparation for the Kenya Certificate of Secondary Education through focused revision, mentorship and career guidance.",
  "grade.3.pathways": "KCSE Prep\nCareer Guidance\nUniversity Placement",
  "departments.eyebrow": "Departments",
  "departments.heading": "Subjects We Teach",
  "department.1.title": "Mathematics",
  "department.1.desc": "Strong numerical foundation through guided practice and problem-solving.",
  "department.2.title": "Sciences",
  "department.2.desc": "Biology, Chemistry and Physics with practical lab work.",
  "department.3.title": "Languages",
  "department.3.desc": "English, Kiswahili and communication skills for academic and professional readiness.",
  "department.4.title": "Humanities",
  "department.4.desc": "History, Geography, CRE and Business Studies.",
  "department.5.title": "Creative Arts",
  "department.5.desc": "Music, art and design that nurture confidence and self-expression.",
  "department.6.title": "Technical Subjects",
  "department.6.desc": "Computer Studies, Agriculture and practical skills for modern careers.",
} as const;

const lines = (value: string) => value.split(/\n+/).map((item) => item.trim()).filter(Boolean);
const paragraphs = (value: string) => value.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

const Academics = () => {
  const { getContent } = useContent("academics");

  const grades = [
    {
      title: getContent("grade.1.title", academicsDefaults["grade.1.title"]),
      system: getContent("grade.1.system", academicsDefaults["grade.1.system"]),
      desc: getContent("grade.1.desc", academicsDefaults["grade.1.desc"]),
      pathways: lines(getContent("grade.1.pathways", academicsDefaults["grade.1.pathways"])),
    },
    {
      title: getContent("grade.2.title", academicsDefaults["grade.2.title"]),
      system: getContent("grade.2.system", academicsDefaults["grade.2.system"]),
      desc: getContent("grade.2.desc", academicsDefaults["grade.2.desc"]),
      pathways: lines(getContent("grade.2.pathways", academicsDefaults["grade.2.pathways"])),
    },
    {
      title: getContent("grade.3.title", academicsDefaults["grade.3.title"]),
      system: getContent("grade.3.system", academicsDefaults["grade.3.system"]),
      desc: getContent("grade.3.desc", academicsDefaults["grade.3.desc"]),
      pathways: lines(getContent("grade.3.pathways", academicsDefaults["grade.3.pathways"])),
    },
  ];

  const departments = [
    { icon: Calculator, title: getContent("department.1.title", academicsDefaults["department.1.title"]), desc: getContent("department.1.desc", academicsDefaults["department.1.desc"]) },
    { icon: FlaskConical, title: getContent("department.2.title", academicsDefaults["department.2.title"]), desc: getContent("department.2.desc", academicsDefaults["department.2.desc"]) },
    { icon: Languages, title: getContent("department.3.title", academicsDefaults["department.3.title"]), desc: getContent("department.3.desc", academicsDefaults["department.3.desc"]) },
    { icon: Globe2, title: getContent("department.4.title", academicsDefaults["department.4.title"]), desc: getContent("department.4.desc", academicsDefaults["department.4.desc"]) },
    { icon: BookOpen, title: getContent("department.5.title", academicsDefaults["department.5.title"]), desc: getContent("department.5.desc", academicsDefaults["department.5.desc"]) },
    { icon: GraduationCap, title: getContent("department.6.title", academicsDefaults["department.6.title"]), desc: getContent("department.6.desc", academicsDefaults["department.6.desc"]) },
  ];

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", academicsDefaults["header.eyebrow"])}
      title={getContent("header.title", academicsDefaults["header.title"])}
      subtitle={getContent("header.subtitle", academicsDefaults["header.subtitle"])}
    />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <img src={lab} alt="Mumbuni Boys students in a science laboratory" loading="lazy" width={1280} height={720} className="rounded-2xl shadow-strong object-cover aspect-[16/10]" />
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("overview.eyebrow", academicsDefaults["overview.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-5">{getContent("overview.heading", academicsDefaults["overview.heading"])}</h2>
          {paragraphs(getContent("overview.body", academicsDefaults["overview.body"])).map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "text-foreground/85 text-lg leading-relaxed mb-4" : "text-muted-foreground leading-relaxed"}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("levels.eyebrow", academicsDefaults["levels.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("levels.heading", academicsDefaults["levels.heading"])}</h2>
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
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("departments.eyebrow", academicsDefaults["departments.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("departments.heading", academicsDefaults["departments.heading"])}</h2>
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
};

export default Academics;
