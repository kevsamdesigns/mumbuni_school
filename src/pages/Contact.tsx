import { Phone, Mail, MapPin, Send } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import mapImg from "@/assets/school-map-new.png";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "Thank you. Mumbuni Boys Senior School will get back to you shortly." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHeader eyebrow="Get In Touch" title="Contact Us" subtitle="Reach Mumbuni Boys Senior School for admissions, visits, student support and general enquiries." />

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-4 lg:col-span-2 md:space-y-6">
              {[
                { icon: Phone, title: "Phone", lines: ["0727 642 932"] },
                { icon: Mail, title: "Email", lines: ["mumbuniboys32@gmail.com"] },
                { icon: MapPin, title: "Postal Address", lines: ["P.O. Box 310-90100", "Machakos, Kenya"] },
              ].map((c) => (
                <div key={c.title} className="flex gap-4 rounded-lg border border-secondary/40 bg-card p-5 shadow-card-soft md:p-6">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary-deep mb-1">{c.title}</h3>
                    {c.lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-card p-5 shadow-card-soft sm:p-6 lg:col-span-3 lg:p-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <Input required placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input required type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <Input required placeholder="07XX XXX XXX" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <Textarea required rows={5} placeholder="How can we help?" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-24">
        <div className="container">
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
            <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Find Us</p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-deep">School Location Map</h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-border shadow-strong">
            <img
              src={mapImg}
              alt="Map showing the location of Mumbuni Boys Senior School in Machakos"
              loading="lazy"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Mumbuni Boys Senior School, P.O. Box 310-90100, Machakos, Kenya
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
