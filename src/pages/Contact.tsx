import { Phone, Mail, MapPin, Send } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";
import mapImg from "@/assets/school-map-new.png";

const contactDefaults = {
  "header.eyebrow": "Get In Touch",
  "header.title": "Contact Us",
  "header.subtitle": "Reach Mumbuni Boys Senior School for admissions, visits, student support and general enquiries.",
  "phone.label": "Phone",
  "phone.value": "0727 642 932",
  "email.label": "Email",
  "email.value": "mumbuniboys32@gmail.com",
  "address.label": "Postal Address",
  "address.value": "P.O. Box 310-90100\nMachakos, Kenya",
  "form.name": "Name",
  "form.namePlaceholder": "Your full name",
  "form.email": "Email",
  "form.emailPlaceholder": "you@example.com",
  "form.phone": "Phone",
  "form.phonePlaceholder": "07XX XXX XXX",
  "form.message": "Message",
  "form.messagePlaceholder": "How can we help?",
  "form.button": "Send Message",
  "toast.title": "Message Sent!",
  "toast.body": "Thank you. Mumbuni Boys Senior School will get back to you shortly.",
  "map.eyebrow": "Find Us",
  "map.heading": "School Location Map",
  "map.caption": "Mumbuni Boys Senior School, P.O. Box 310-90100, Machakos, Kenya",
} as const;

const lines = (value: string) => value.split(/\n+/).map((item) => item.trim()).filter(Boolean);

const Contact = () => {
  const { getContent } = useContent("contact");
  const { toast } = useToast();

  const contactCards = [
    { icon: Phone, title: getContent("phone.label", contactDefaults["phone.label"]), lines: lines(getContent("phone.value", contactDefaults["phone.value"])) },
    { icon: Mail, title: getContent("email.label", contactDefaults["email.label"]), lines: lines(getContent("email.value", contactDefaults["email.value"])) },
    { icon: MapPin, title: getContent("address.label", contactDefaults["address.label"]), lines: lines(getContent("address.value", contactDefaults["address.value"])) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: getContent("toast.title", contactDefaults["toast.title"]), description: getContent("toast.body", contactDefaults["toast.body"]) });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHeader
        eyebrow={getContent("header.eyebrow", contactDefaults["header.eyebrow"])}
        title={getContent("header.title", contactDefaults["header.title"])}
        subtitle={getContent("header.subtitle", contactDefaults["header.subtitle"])}
      />

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-4 lg:col-span-2 md:space-y-6">
              {contactCards.map((c) => (
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
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.name", contactDefaults["form.name"])}</label>
                  <Input required placeholder={getContent("form.namePlaceholder", contactDefaults["form.namePlaceholder"])} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.email", contactDefaults["form.email"])}</label>
                  <Input required type="email" placeholder={getContent("form.emailPlaceholder", contactDefaults["form.emailPlaceholder"])} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.phone", contactDefaults["form.phone"])}</label>
                <Input required placeholder={getContent("form.phonePlaceholder", contactDefaults["form.phonePlaceholder"])} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{getContent("form.message", contactDefaults["form.message"])}</label>
                <Textarea required rows={5} placeholder={getContent("form.messagePlaceholder", contactDefaults["form.messagePlaceholder"])} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {getContent("form.button", contactDefaults["form.button"])} <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-24">
        <div className="container">
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
            <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("map.eyebrow", contactDefaults["map.eyebrow"])}</p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-deep">{getContent("map.heading", contactDefaults["map.heading"])}</h2>
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
            {getContent("map.caption", contactDefaults["map.caption"])}
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
