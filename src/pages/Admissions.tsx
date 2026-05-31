import { Link } from "react-router-dom";
import { FileText, Heart, Package, BookOpen, CreditCard, CheckCircle2, Smartphone, Download, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const requirements = [
  {
    icon: FileText,
    title: "Required Documents",
    items: [
      "Admission letter",
      "2 passport-size photos",
      "Birth Certificate (original + photocopy)",
      "KCPE Result Slip (original + photocopy)",
      "Grade 10 Result Slip where applicable",
    ],
  },
  {
    icon: Heart,
    title: "Health Requirements",
    items: ["Medical certificate or report from a recognised medical facility"],
  },
  {
    icon: Package,
    title: "Personal Effects",
    items: [
      "Basin, bowl, plate and spoon",
      "Towel and toiletries",
      "Blankets and bedsheets",
      "4-inch mattress",
      "Metallic box with 2 padlocks",
      "School-approved personal items",
    ],
  },
  {
    icon: BookOpen,
    title: "Stationery & Books",
    items: [
      "Mathematical Table - 8th Edition (KNEC)",
      "Mathematical set",
      "Oxford Advanced Learner's Dictionary",
      "Exercise books and writing materials",
      "Bible or approved religious text",
    ],
  },
];

const fees = [
  { class: "Form One Consolidated Fee", t1: "18,000", t2: "17,000", t3: "16,000", total: "51,000" },
  { class: "Form Two Consolidated Fee", t1: "19,000", t2: "18,000", t3: "18,000", total: "55,000" },
  { class: "Form Three Consolidated Fee", t1: "19,000", t2: "19,000", t3: "18,000", total: "56,000" },
  { class: "Form Four Consolidated Fee", t1: "22,000", t2: "20,000", t3: "20,000", total: "62,000" },
];

const Admissions = () => (
  <>
    <PageHeader
      eyebrow="Join Mumbuni Boys Senior School"
      title="Admissions & Fees"
      subtitle="Everything parents and guardians need to know when enrolling a student at Mumbuni Boys Senior School."
    />

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Admission Requirements</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">What to Bring on Reporting Day</h2>
          <p className="text-muted-foreground text-lg">Please ensure the student arrives with all required documents and approved personal items.</p>
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
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Fees Structure</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-4">School Fees</h2>
          <p className="text-muted-foreground text-lg">
            All amounts are in Kenyan Shillings. Parents may contact the school office for current official fee confirmation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-card-soft bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left p-4 font-display font-bold">Class</th>
                  <th className="text-right p-4 font-display font-bold">Term 1</th>
                  <th className="text-right p-4 font-display font-bold">Term 2</th>
                  <th className="text-right p-4 font-display font-bold">Term 3</th>
                  <th className="text-right p-4 font-display font-bold">Total / Year</th>
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
            <h3 className="font-display text-2xl font-bold">Payment Guidance</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-foreground/10 rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Contact Office</p>
              <p className="font-display text-2xl font-extrabold text-secondary mb-4">0727 642 932</p>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Reference Format</p>
              <p className="font-mono text-sm bg-primary-foreground/10 rounded-md px-3 py-2">Student Name / Admission No.</p>
            </div>
            <ol className="space-y-3 text-sm">
              {[
                "Confirm the current fee balance with the accounts office",
                "Use the student's name and admission number as the reference",
                "Keep all payment confirmations and receipts",
                "Present confirmations to the school bursar for receipting",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 bg-primary-foreground/10 rounded-xl p-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-secondary text-secondary-foreground font-bold flex items-center justify-center text-xs">{i + 1}</span>
                  <span className="opacity-95">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card-soft">
            <p className="font-bold text-primary-deep mb-1">Bankers Cheque</p>
            <p className="text-sm text-muted-foreground">Payable to Mumbuni Boys Senior School.</p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card-soft">
            <p className="font-bold text-primary-deep mb-1">School Office</p>
            <p className="text-sm text-muted-foreground">For official fee statements, call 0727 642 932.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Contact Admissions Office</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-secondary/15 hover:text-primary" onClick={() => window.print()}>
            <Download className="mr-2 w-4 h-4" /> Download Fee Structure
          </Button>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">Admissions FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-deep mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Answers to common questions from parents and guardians.</p>
        </div>
        <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border shadow-card-soft px-6">
          {[
            { q: "When does admission open?", a: "Admissions are open subject to vacancy. Form 1 admissions follow the national selection calendar." },
            { q: "Which curricula are offered?", a: "The school supports CBC/CBE Senior School learners and 8-4-4 Form 3 and Form 4 candidates." },
            { q: "Can fees be paid in installments?", a: "Parents should contact the accounts office to confirm approved payment arrangements." },
            { q: "How can I contact the admissions office?", a: "Call 0727 642 932 or email mumbuniboys32@gmail.com." },
          ].map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
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

export default Admissions;
