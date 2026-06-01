import { useState } from "react";
import { Briefcase, MapPin, Clock, Send, GraduationCap, Users, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";

const careersDefaults = {
  "header.eyebrow": "Join Our Team",
  "header.title": "Careers & Job Opportunities",
  "header.subtitle": "Be part of a community that develops disciplined, confident and responsible young men.",
  "benefit.1.title": "Professional Growth",
  "benefit.1.desc": "Continuous training and clear career progression.",
  "benefit.2.title": "Supportive Team",
  "benefit.2.desc": "Work with passionate, like-minded educators.",
  "benefit.3.title": "Competitive Package",
  "benefit.3.desc": "Attractive remuneration and benefits.",
  "openings.eyebrow": "Open Positions",
  "openings.heading": "Current Vacancies",
  "openings.body": "Explore our current openings and apply using the form below.",
  "job.1.title": "Mathematics Teacher (Senior School)",
  "job.1.type": "Full-Time",
  "job.1.location": "Machakos, Kenya",
  "job.1.desc": "TSC-registered teacher with a passion for nurturing boys in STEM. Minimum Bachelor of Education (Mathematics).",
  "job.2.title": "Biology / Chemistry Teacher",
  "job.2.type": "Full-Time",
  "job.2.location": "Machakos, Kenya",
  "job.2.desc": "Experience with CBC/CBE & 8-4-4 curriculum. Ability to lead practicals and mentor science club members.",
  "job.3.title": "Boarding Matron",
  "job.3.type": "Full-Time (Resident)",
  "job.3.location": "Machakos, Kenya",
  "job.3.desc": "Caring, mature boarding staff member to oversee dormitory life, welfare and discipline of boarding students.",
  "job.4.title": "School Bus Driver",
  "job.4.type": "Full-Time",
  "job.4.location": "Machakos, Kenya",
  "job.4.desc": "Valid PSV licence, clean driving record, minimum 5 years experience driving school transport.",
  "job.apply": "Apply for this role",
  "form.eyebrow": "Apply Now",
  "form.heading": "Submit Your Application",
  "form.fullName": "Full Name",
  "form.fullNamePlaceholder": "Your full name",
  "form.email": "Email",
  "form.emailPlaceholder": "you@example.com",
  "form.phone": "Phone",
  "form.phonePlaceholder": "07XX XXX XXX",
  "form.position": "Position",
  "form.positionPlaceholder": "Position applying for",
  "form.experience": "Years of Experience",
  "form.experiencePlaceholder": "e.g. 5 years",
  "form.cover": "Cover Letter / Why You?",
  "form.coverPlaceholder": "Tell us about your qualifications and why you'd be a great fit...",
  "form.cv": "CV / Resume Link",
  "form.cvPlaceholder": "Link to your CV (Google Drive, Dropbox, etc.)",
  "form.cvHelp": "Or email your CV to mumbuniboys32@gmail.com",
  "form.submit": "Submit Application",
  "toast.title": "Application Received!",
  "toast.body": "Thank you - our HR team will review and respond soon.",
} as const;

const Careers = () => {
  const { getContent } = useContent("careers");
  const { toast } = useToast();
  const [position, setPosition] = useState("");

  const benefits = [
    { icon: GraduationCap, title: getContent("benefit.1.title", careersDefaults["benefit.1.title"]), desc: getContent("benefit.1.desc", careersDefaults["benefit.1.desc"]) },
    { icon: Users, title: getContent("benefit.2.title", careersDefaults["benefit.2.title"]), desc: getContent("benefit.2.desc", careersDefaults["benefit.2.desc"]) },
    { icon: Award, title: getContent("benefit.3.title", careersDefaults["benefit.3.title"]), desc: getContent("benefit.3.desc", careersDefaults["benefit.3.desc"]) },
  ];

  const openings = [1, 2, 3, 4].map((index) => ({
    title: getContent(`job.${index}.title`, careersDefaults[`job.${index}.title` as keyof typeof careersDefaults]),
    type: getContent(`job.${index}.type`, careersDefaults[`job.${index}.type` as keyof typeof careersDefaults]),
    location: getContent(`job.${index}.location`, careersDefaults[`job.${index}.location` as keyof typeof careersDefaults]),
    desc: getContent(`job.${index}.desc`, careersDefaults[`job.${index}.desc` as keyof typeof careersDefaults]),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: getContent("toast.title", careersDefaults["toast.title"]), description: getContent("toast.body", careersDefaults["toast.body"]) });
    (e.target as HTMLFormElement).reset();
    setPosition("");
  };

  return (
    <>
      <PageHeader
        eyebrow={getContent("header.eyebrow", careersDefaults["header.eyebrow"])}
        title={getContent("header.title", careersDefaults["header.title"])}
        subtitle={getContent("header.subtitle", careersDefaults["header.subtitle"])}
      />

      <section className="py-20 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {benefits.map((b) => (
              <div key={b.title} className="p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft text-center hover-lift">
                <div className="inline-flex w-14 h-14 rounded-lg bg-gradient-accent text-primary-deep items-center justify-center mb-4 shadow-elegant">
                  <b.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl text-primary-deep mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("openings.eyebrow", careersDefaults["openings.eyebrow"])}</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("openings.heading", careersDefaults["openings.heading"])}</h2>
            <p className="text-muted-foreground text-lg">{getContent("openings.body", careersDefaults["openings.body"])}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {openings.map((j) => (
              <article key={j.title} className="p-6 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-primary-deep">{j.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {j.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {j.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{j.desc}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPosition(j.title);
                    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {getContent("job.apply", careersDefaults["job.apply"])}
                </Button>
              </article>
            ))}
          </div>

          <div id="apply-form" className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("form.eyebrow", careersDefaults["form.eyebrow"])}</p>
              <h2 className="font-display text-3xl md:text-4xl text-primary-deep">{getContent("form.heading", careersDefaults["form.heading"])}</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border shadow-card-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.fullName", careersDefaults["form.fullName"])}</label>
                  <Input required placeholder={getContent("form.fullNamePlaceholder", careersDefaults["form.fullNamePlaceholder"])} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.email", careersDefaults["form.email"])}</label>
                  <Input required type="email" placeholder={getContent("form.emailPlaceholder", careersDefaults["form.emailPlaceholder"])} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.phone", careersDefaults["form.phone"])}</label>
                  <Input required placeholder={getContent("form.phonePlaceholder", careersDefaults["form.phonePlaceholder"])} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.position", careersDefaults["form.position"])}</label>
                  <Input required value={position} onChange={(e) => setPosition(e.target.value)} placeholder={getContent("form.positionPlaceholder", careersDefaults["form.positionPlaceholder"])} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.experience", careersDefaults["form.experience"])}</label>
                <Input required placeholder={getContent("form.experiencePlaceholder", careersDefaults["form.experiencePlaceholder"])} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.cover", careersDefaults["form.cover"])}</label>
                <Textarea required rows={5} placeholder={getContent("form.coverPlaceholder", careersDefaults["form.coverPlaceholder"])} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.cv", careersDefaults["form.cv"])}</label>
                <Input type="url" placeholder={getContent("form.cvPlaceholder", careersDefaults["form.cvPlaceholder"])} />
                <p className="text-xs text-muted-foreground mt-1">{getContent("form.cvHelp", careersDefaults["form.cvHelp"])}</p>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {getContent("form.submit", careersDefaults["form.submit"])} <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
