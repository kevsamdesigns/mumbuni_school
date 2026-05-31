import { useState } from "react";
import { Briefcase, MapPin, Clock, Send, GraduationCap, Users, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const openings = [
  {
    title: "Mathematics Teacher (Senior School)",
    type: "Full-Time",
    location: "Machakos, Kenya",
    desc: "TSC-registered teacher with a passion for nurturing boys in STEM. Minimum Bachelor of Education (Mathematics).",
  },
  {
    title: "Biology / Chemistry Teacher",
    type: "Full-Time",
    location: "Machakos, Kenya",
    desc: "Experience with CBC/CBE & 8-4-4 curriculum. Ability to lead practicals and mentor science club members.",
  },
  {
    title: "Boarding Matron",
    type: "Full-Time (Resident)",
    location: "Machakos, Kenya",
    desc: "Caring, mature boarding staff member to oversee dormitory life, welfare and discipline of boarding students.",
  },
  {
    title: "School Bus Driver",
    type: "Full-Time",
    location: "Machakos, Kenya",
    desc: "Valid PSV licence, clean driving record, minimum 5 years experience driving school transport.",
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [position, setPosition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Application Received!", description: "Thank you — our HR team will review and respond soon." });
    (e.target as HTMLFormElement).reset();
    setPosition("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Join Our Team"
        title="Careers & Job Opportunities"
        subtitle="Be part of a community that develops disciplined, confident and responsible young men."
      />

      {/* Why work with us */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: GraduationCap, title: "Professional Growth", desc: "Continuous training and clear career progression." },
              { icon: Users, title: "Supportive Team", desc: "Work with passionate, like-minded educators." },
              { icon: Award, title: "Competitive Package", desc: "Attractive remuneration and benefits." },
            ].map((b) => (
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
            <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Open Positions</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">Current Vacancies</h2>
            <p className="text-muted-foreground text-lg">Explore our current openings and apply using the form below.</p>
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
                  Apply for this role
                </Button>
              </article>
            ))}
          </div>

          {/* Application Form */}
          <div id="apply-form" className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Apply Now</p>
              <h2 className="font-display text-3xl md:text-4xl text-primary-deep">Submit Your Application</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border shadow-card-soft space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <Input required placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input required type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <Input required placeholder="07XX XXX XXX" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Position</label>
                  <Input required value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position applying for" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Years of Experience</label>
                <Input required placeholder="e.g. 5 years" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Cover Letter / Why You?</label>
                <Textarea required rows={5} placeholder="Tell us about your qualifications and why you'd be a great fit..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">CV / Resume Link</label>
                <Input type="url" placeholder="Link to your CV (Google Drive, Dropbox, etc.)" />
                <p className="text-xs text-muted-foreground mt-1">Or email your CV to mumbuniboys32@gmail.com</p>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Application <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
