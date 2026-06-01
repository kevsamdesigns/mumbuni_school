import { Languages, Clock, Shirt, Ban, Sparkles, Church, ShieldAlert, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useContent } from "@/hooks/useContent";

const rulesDefaults = {
  "header.eyebrow": "Discipline & Order",
  "header.title": "Rules & Regulations",
  "header.subtitle": "Our standards uphold a safe, focused and respectful learning environment for every student.",
  "intro.eyebrow": "Code of Conduct",
  "intro.heading": "Key School Rules",
  "intro.body": "Every student and parent is expected to read, understand and uphold these rules.",
  "rule.labelPrefix": "RULE",
  "rule.1.title": "Language",
  "rule.1.desc": "English and Kiswahili are the only official languages allowed within the school.",
  "rule.2.title": "Punctuality",
  "rule.2.desc": "Students must strictly follow the bell for all activities - lessons, meals, prep and assembly.",
  "rule.3.title": "Uniform",
  "rule.3.desc": "Clean school uniform must be worn at all times. Civilian clothes are strictly forbidden.",
  "rule.4.title": "Prohibited Items",
  "rule.4.desc": "Electronics (mobile phones, radios) and intoxicants of any kind are not allowed on school grounds.",
  "rule.5.title": "Appearance",
  "rule.5.desc": "Natural hair only - no chemicals. Makeup, nail polish (cutex) and jewellery (bangles) are prohibited.",
  "rule.6.title": "Religion",
  "rule.6.desc": "Sunday services are compulsory for all students as part of our spiritual nurturing programme.",
  "rule.7.title": "Conduct",
  "rule.7.desc": "Theft, tribal groupings or damaging school property may lead to expulsion or involvement of the police.",
  "note.title": "Disciplinary Note",
  "note.body": "Serious breaches of the above rules will be handled in accordance with the school's disciplinary policy and the Ministry of Education guidelines, in consultation with parents/guardians.",
} as const;

const Rules = () => {
  const { getContent } = useContent("rules");
  const rules = [
    { icon: Languages, title: getContent("rule.1.title", rulesDefaults["rule.1.title"]), desc: getContent("rule.1.desc", rulesDefaults["rule.1.desc"]) },
    { icon: Clock, title: getContent("rule.2.title", rulesDefaults["rule.2.title"]), desc: getContent("rule.2.desc", rulesDefaults["rule.2.desc"]) },
    { icon: Shirt, title: getContent("rule.3.title", rulesDefaults["rule.3.title"]), desc: getContent("rule.3.desc", rulesDefaults["rule.3.desc"]) },
    { icon: Ban, title: getContent("rule.4.title", rulesDefaults["rule.4.title"]), desc: getContent("rule.4.desc", rulesDefaults["rule.4.desc"]) },
    { icon: Sparkles, title: getContent("rule.5.title", rulesDefaults["rule.5.title"]), desc: getContent("rule.5.desc", rulesDefaults["rule.5.desc"]) },
    { icon: Church, title: getContent("rule.6.title", rulesDefaults["rule.6.title"]), desc: getContent("rule.6.desc", rulesDefaults["rule.6.desc"]) },
    { icon: ShieldAlert, title: getContent("rule.7.title", rulesDefaults["rule.7.title"]), desc: getContent("rule.7.desc", rulesDefaults["rule.7.desc"]) },
  ];

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", rulesDefaults["header.eyebrow"])}
      title={getContent("header.title", rulesDefaults["header.title"])}
      subtitle={getContent("header.subtitle", rulesDefaults["header.subtitle"])}
    />

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("intro.eyebrow", rulesDefaults["intro.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("intro.heading", rulesDefaults["intro.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("intro.body", rulesDefaults["intro.body"])}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {rules.map((r, i) => (
            <article key={r.title} className="flex gap-5 p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
              <div className="shrink-0 w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                <r.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary mb-1">{getContent("rule.labelPrefix", rulesDefaults["rule.labelPrefix"])} {String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-xl text-primary-deep mb-2">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-6 rounded-2xl bg-accent/10 border-l-4 border-accent flex gap-4">
          <AlertTriangle className="w-6 h-6 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-display font-bold text-primary-deep mb-1">{getContent("note.title", rulesDefaults["note.title"])}</h4>
            <p className="text-sm text-foreground/80">{getContent("note.body", rulesDefaults["note.body"])}</p>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default Rules;
