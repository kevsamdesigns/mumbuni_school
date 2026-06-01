import { Link } from "react-router-dom";
import { FileText, Heart, Package, BookOpen, CreditCard, CheckCircle2, Smartphone, Download, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useContent } from "@/hooks/useContent";

const admissionsDefaults = {
  "header.eyebrow": "Join Mumbuni Boys Senior School",
  "header.title": "Admissions & Fees",
  "header.subtitle": "Everything parents and guardians need to know when enrolling a student at Mumbuni Boys Senior School.",
  "requirements.eyebrow": "Admission Requirements",
  "requirements.heading": "What to Bring on Reporting Day",
  "requirements.body": "Please ensure the student arrives with all required documents and approved personal items.",
  "requirements.documents.title": "Required Documents",
  "requirements.documents.items": "Admission letter\n2 passport-size photos\nBirth Certificate (original + photocopy)\nKCPE Result Slip (original + photocopy)\nGrade 10 Result Slip where applicable",
  "requirements.health.title": "Health Requirements",
  "requirements.health.items": "Medical certificate or report from a recognised medical facility",
  "requirements.effects.title": "Personal Effects",
  "requirements.effects.items": "Basin, bowl, plate and spoon\nTowel and toiletries\nBlankets and bedsheets\n4-inch mattress\nMetallic box with 2 padlocks\nSchool-approved personal items",
  "requirements.books.title": "Stationery & Books",
  "requirements.books.items": "Mathematical Table - 8th Edition (KNEC)\nMathematical set\nOxford Advanced Learner's Dictionary\nExercise books and writing materials\nBible or approved religious text",
  "fees.eyebrow": "Fees Structure",
  "fees.heading": "School Fees",
  "fees.body": "All amounts are in Kenyan Shillings. Parents may contact the school office for current official fee confirmation.",
  "fees.classHeader": "Class",
  "fees.term1Header": "Term 1",
  "fees.term2Header": "Term 2",
  "fees.term3Header": "Term 3",
  "fees.totalHeader": "Total / Year",
  "fees.1.class": "Form One Consolidated Fee",
  "fees.1.t1": "18,000",
  "fees.1.t2": "17,000",
  "fees.1.t3": "16,000",
  "fees.1.total": "51,000",
  "fees.2.class": "Form Two Consolidated Fee",
  "fees.2.t1": "19,000",
  "fees.2.t2": "18,000",
  "fees.2.t3": "18,000",
  "fees.2.total": "55,000",
  "fees.3.class": "Form Three Consolidated Fee",
  "fees.3.t1": "19,000",
  "fees.3.t2": "19,000",
  "fees.3.t3": "18,000",
  "fees.3.total": "56,000",
  "fees.4.class": "Form Four Consolidated Fee",
  "fees.4.t1": "22,000",
  "fees.4.t2": "20,000",
  "fees.4.t3": "20,000",
  "fees.4.total": "62,000",
  "payment.heading": "Payment Guidance",
  "payment.contactLabel": "Contact Office",
  "payment.phone": "0727 642 932",
  "payment.referenceLabel": "Reference Format",
  "payment.reference": "Student Name / Admission No.",
  "payment.steps": "Confirm the current fee balance with the accounts office\nUse the student's name and admission number as the reference\nKeep all payment confirmations and receipts\nPresent confirmations to the school bursar for receipting",
  "payment.chequeTitle": "Bankers Cheque",
  "payment.chequeBody": "Payable to Mumbuni Boys Senior School.",
  "payment.officeTitle": "School Office",
  "payment.officeBody": "For official fee statements, call 0727 642 932.",
  "cta.contact": "Contact Admissions Office",
  "cta.download": "Download Fee Structure",
  "faq.eyebrow": "Admissions FAQ",
  "faq.heading": "Frequently Asked Questions",
  "faq.body": "Answers to common questions from parents and guardians.",
  "faq.1.q": "When does admission open?",
  "faq.1.a": "Admissions are open subject to vacancy. Form 1 admissions follow the national selection calendar.",
  "faq.2.q": "Which curricula are offered?",
  "faq.2.a": "The school supports CBC/CBE Senior School learners and 8-4-4 Form 3 and Form 4 candidates.",
  "faq.3.q": "Can fees be paid in installments?",
  "faq.3.a": "Parents should contact the accounts office to confirm approved payment arrangements.",
  "faq.4.q": "How can I contact the admissions office?",
  "faq.4.a": "Call 0727 642 932 or email mumbuniboys32@gmail.com.",
} as const;

const lines = (value: string) => value.split(/\n+/).map((item) => item.trim()).filter(Boolean);

const Admissions = () => {
  const { getContent } = useContent("admissions");

  const requirements = [
    { icon: FileText, title: getContent("requirements.documents.title", admissionsDefaults["requirements.documents.title"]), items: lines(getContent("requirements.documents.items", admissionsDefaults["requirements.documents.items"])) },
    { icon: Heart, title: getContent("requirements.health.title", admissionsDefaults["requirements.health.title"]), items: lines(getContent("requirements.health.items", admissionsDefaults["requirements.health.items"])) },
    { icon: Package, title: getContent("requirements.effects.title", admissionsDefaults["requirements.effects.title"]), items: lines(getContent("requirements.effects.items", admissionsDefaults["requirements.effects.items"])) },
    { icon: BookOpen, title: getContent("requirements.books.title", admissionsDefaults["requirements.books.title"]), items: lines(getContent("requirements.books.items", admissionsDefaults["requirements.books.items"])) },
  ];

  const fees = [1, 2, 3, 4].map((index) => ({
    class: getContent(`fees.${index}.class`, admissionsDefaults[`fees.${index}.class` as keyof typeof admissionsDefaults]),
    t1: getContent(`fees.${index}.t1`, admissionsDefaults[`fees.${index}.t1` as keyof typeof admissionsDefaults]),
    t2: getContent(`fees.${index}.t2`, admissionsDefaults[`fees.${index}.t2` as keyof typeof admissionsDefaults]),
    t3: getContent(`fees.${index}.t3`, admissionsDefaults[`fees.${index}.t3` as keyof typeof admissionsDefaults]),
    total: getContent(`fees.${index}.total`, admissionsDefaults[`fees.${index}.total` as keyof typeof admissionsDefaults]),
  }));

  const faqs = [1, 2, 3, 4].map((index) => ({
    q: getContent(`faq.${index}.q`, admissionsDefaults[`faq.${index}.q` as keyof typeof admissionsDefaults]),
    a: getContent(`faq.${index}.a`, admissionsDefaults[`faq.${index}.a` as keyof typeof admissionsDefaults]),
  }));

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", admissionsDefaults["header.eyebrow"])}
      title={getContent("header.title", admissionsDefaults["header.title"])}
      subtitle={getContent("header.subtitle", admissionsDefaults["header.subtitle"])}
    />

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("requirements.eyebrow", admissionsDefaults["requirements.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("requirements.heading", admissionsDefaults["requirements.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("requirements.body", admissionsDefaults["requirements.body"])}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {requirements.map((r) => (
            <article key={r.title} className="p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                  <r.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-primary-deep">{r.title}</h3>
              </div>
              <ul className="space-y-2">
                {r.items.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/85">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("fees.eyebrow", admissionsDefaults["fees.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">{getContent("fees.heading", admissionsDefaults["fees.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("fees.body", admissionsDefaults["fees.body"])}</p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-card-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left p-4 font-display font-bold">{getContent("fees.classHeader", admissionsDefaults["fees.classHeader"])}</th>
                  <th className="text-right p-4 font-display font-bold">{getContent("fees.term1Header", admissionsDefaults["fees.term1Header"])}</th>
                  <th className="text-right p-4 font-display font-bold">{getContent("fees.term2Header", admissionsDefaults["fees.term2Header"])}</th>
                  <th className="text-right p-4 font-display font-bold">{getContent("fees.term3Header", admissionsDefaults["fees.term3Header"])}</th>
                  <th className="text-right p-4 font-display font-bold">{getContent("fees.totalHeader", admissionsDefaults["fees.totalHeader"])}</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f, i) => (
                  <tr key={f.class} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="p-4 font-semibold text-primary-deep">{f.class}</td>
                    <td className="p-4 text-right text-foreground/85">{f.t1}/-</td>
                    <td className="p-4 text-right text-foreground/85">{f.t2}/-</td>
                    <td className="p-4 text-right text-foreground/85">{f.t3}/-</td>
                    <td className="p-4 text-right font-bold text-secondary">{f.total}/-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6" />
            <h3 className="font-display text-2xl font-bold">{getContent("payment.heading", admissionsDefaults["payment.heading"])}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-foreground/10 rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">{getContent("payment.contactLabel", admissionsDefaults["payment.contactLabel"])}</p>
              <p className="font-display text-2xl font-extrabold text-secondary mb-4">{getContent("payment.phone", admissionsDefaults["payment.phone"])}</p>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">{getContent("payment.referenceLabel", admissionsDefaults["payment.referenceLabel"])}</p>
              <p className="font-mono text-sm bg-primary-foreground/10 rounded-md px-3 py-2">{getContent("payment.reference", admissionsDefaults["payment.reference"])}</p>
            </div>
            <ol className="space-y-3 text-sm">
              {lines(getContent("payment.steps", admissionsDefaults["payment.steps"])).map((step, i) => (
                <li key={step} className="flex gap-3 bg-primary-foreground/10 rounded-xl p-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-xs">{i + 1}</span>
                  <span className="opacity-95">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card-soft">
            <p className="font-bold text-primary-deep mb-1">{getContent("payment.chequeTitle", admissionsDefaults["payment.chequeTitle"])}</p>
            <p className="text-sm text-muted-foreground">{getContent("payment.chequeBody", admissionsDefaults["payment.chequeBody"])}</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card-soft">
            <p className="font-bold text-primary-deep mb-1">{getContent("payment.officeTitle", admissionsDefaults["payment.officeTitle"])}</p>
            <p className="text-sm text-muted-foreground">{getContent("payment.officeBody", admissionsDefaults["payment.officeBody"])}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">{getContent("cta.contact", admissionsDefaults["cta.contact"])}</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-secondary/15 hover:text-primary" onClick={() => window.print()}>
            <Download className="mr-2 w-4 h-4" /> {getContent("cta.download", admissionsDefaults["cta.download"])}
          </Button>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">{getContent("faq.eyebrow", admissionsDefaults["faq.eyebrow"])}</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-3">{getContent("faq.heading", admissionsDefaults["faq.heading"])}</h2>
          <p className="text-muted-foreground text-lg">{getContent("faq.body", admissionsDefaults["faq.body"])}</p>
        </div>
        <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border shadow-card-soft px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-primary-deep">
                <span className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-secondary" />{f.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </>
  );
};

export default Admissions;
