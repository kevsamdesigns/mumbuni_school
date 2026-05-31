import { Bus, ShieldCheck, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import busImg from "@/assets/school-bus.jpg";

const features = [
  { icon: ShieldCheck, title: "Safety First", desc: "Trained, vetted drivers and regular vehicle inspections keep every journey secure." },
  { icon: Clock, title: "Reliable Schedules", desc: "Consistent pick-up and drop-off times across opening and closing days of term." },
  { icon: MapPin, title: "Wide Coverage", desc: "Routes serving Machakos, Athi River, Nairobi, Kitui and surrounding areas." },
  { icon: Bus, title: "Branded Fleet", desc: "Modern, comfortable school transport supporting Mumbuni Boys Senior School students." },
];

const Transport = () => (
  <>
    <PageHeader eyebrow="Getting To & From School" title="Transport Services" subtitle="Safe, reliable and comfortable travel support for Mumbuni Boys Senior School students." />

    <section className="py-20 md:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <img src={busImg} alt="Mumbuni Boys Senior School transport" loading="lazy" width={1600} height={1024} className="rounded-2xl shadow-strong object-cover aspect-[16/10] w-full" />
        <div>
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Our Fleet</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-5">Comfort & Safety on Every Journey</h2>
          <p className="text-foreground/85 text-lg leading-relaxed mb-4">
            Our school operates a fleet of modern, well-maintained buses driven by trained and vetted professionals. We prioritise the safety, punctuality and comfort of every student on board.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Transport is available on opening and closing days of term, as well as for school events, educational tours and inter-school competitions.
          </p>
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Why Our Transport?</h2>
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

export default Transport;
