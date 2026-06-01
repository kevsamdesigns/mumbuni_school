import { Bus, ShieldCheck, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useContent } from "@/hooks/useContent";
import busImg from "@/assets/school-bus.jpg";

const transportDefaults = {
  "header.eyebrow": "Getting To & From School",
  "header.title": "Transport Services",
  "header.subtitle": "Safe, reliable and comfortable travel support for Mumbuni Boys Senior School students.",
  "overview.eyebrow": "Our Fleet",
  "overview.heading": "Comfort & Safety on Every Journey",
  "overview.body":
    "Our school operates a fleet of modern, well-maintained buses driven by trained and vetted professionals. We prioritise the safety, punctuality and comfort of every student on board.\n\nTransport is available on opening and closing days of term, as well as for school events, educational tours and inter-school competitions.",
  "features.heading": "Why Our Transport?",
  "feature.1.title": "Safety First",
  "feature.1.desc": "Trained, vetted drivers and regular vehicle inspections keep every journey secure.",
  "feature.2.title": "Reliable Schedules",
  "feature.2.desc": "Consistent pick-up and drop-off times across opening and closing days of term.",
  "feature.3.title": "Wide Coverage",
  "feature.3.desc": "Routes serving Machakos, Athi River, Nairobi, Kitui and surrounding areas.",
  "feature.4.title": "Branded Fleet",
  "feature.4.desc": "Modern, comfortable school transport supporting Mumbuni Boys Senior School students.",
} as const;

const paragraphs = (value: string) => value.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

const Transport = () => {
  const { getContent } = useContent("transport");
  const features = [
    { icon: ShieldCheck, title: getContent("feature.1.title", transportDefaults["feature.1.title"]), desc: getContent("feature.1.desc", transportDefaults["feature.1.desc"]) },
    { icon: Clock, title: getContent("feature.2.title", transportDefaults["feature.2.title"]), desc: getContent("feature.2.desc", transportDefaults["feature.2.desc"]) },
    { icon: MapPin, title: getContent("feature.3.title", transportDefaults["feature.3.title"]), desc: getContent("feature.3.desc", transportDefaults["feature.3.desc"]) },
    { icon: Bus, title: getContent("feature.4.title", transportDefaults["feature.4.title"]), desc: getContent("feature.4.desc", transportDefaults["feature.4.desc"]) },
  ];

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", transportDefaults["header.eyebrow"])}
      title={getContent("header.title", transportDefaults["header.title"])}
      subtitle={getContent("header.subtitle", transportDefaults["header.subtitle"])}
    />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <img src={busImg} alt="Mumbuni Boys Senior School transport" loading="lazy" width={1600} height={1024} className="rounded-2xl shadow-strong object-cover aspect-[16/10] w-full" />
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("overview.eyebrow", transportDefaults["overview.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-5">{getContent("overview.heading", transportDefaults["overview.heading"])}</h2>
          {paragraphs(getContent("overview.body", transportDefaults["overview.body"])).map((paragraph, index) => (
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
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("features.heading", transportDefaults["features.heading"])}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift text-center">
              <div className="inline-flex w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep items-center justify-center mb-4 shadow-elegant">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg text-primary-deep mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default Transport;
