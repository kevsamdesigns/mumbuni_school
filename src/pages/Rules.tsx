import { Languages, Clock, Shirt, Ban, Sparkles, Church, ShieldAlert, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const rules = [
  {
    icon: Languages,
    title: "Language",
    desc: "English and Kiswahili are the only official languages allowed within the school.",
  },
  {
    icon: Clock,
    title: "Punctuality",
    desc: "Students must strictly follow the bell for all activities — lessons, meals, prep and assembly.",
  },
  {
    icon: Shirt,
    title: "Uniform",
    desc: "Clean school uniform must be worn at all times. Civilian clothes are strictly forbidden.",
  },
  {
    icon: Ban,
    title: "Prohibited Items",
    desc: "Electronics (mobile phones, radios) and intoxicants of any kind are not allowed on school grounds.",
  },
  {
    icon: Sparkles,
    title: "Appearance",
    desc: "Natural hair only — no chemicals. Makeup, nail polish (cutex) and jewellery (bangles) are prohibited.",
  },
  {
    icon: Church,
    title: "Religion",
    desc: "Sunday services are compulsory for all students as part of our spiritual nurturing programme.",
  },
  {
    icon: ShieldAlert,
    title: "Conduct",
    desc: "Theft, tribal groupings or damaging school property may lead to expulsion or involvement of the police.",
  },
];

const Rules = () => (
  <>
    <PageHeader
      eyebrow="Discipline & Order"
      title="Rules & Regulations"
      subtitle="Our standards uphold a safe, focused and respectful learning environment for every student."
    />

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Code of Conduct</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Key School Rules</h2>
          <p className="text-muted-foreground text-lg">
            Every student and parent is expected to read, understand and uphold these rules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {rules.map((r, i) => (
            <article key={r.title} className="flex gap-5 p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                <r.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary mb-1">RULE {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-xl text-primary-deep mb-2">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-accent/10 border-l-4 border-accent flex gap-4">
          <AlertTriangle className="w-6 h-6 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-display font-bold text-primary-deep mb-1">Disciplinary Note</h4>
            <p className="text-sm text-foreground/80">
              Serious breaches of the above rules will be handled in accordance with the school's disciplinary policy
              and the Ministry of Education guidelines, in consultation with parents/guardians.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Rules;
