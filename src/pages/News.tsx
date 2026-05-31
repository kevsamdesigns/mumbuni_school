import { CalendarDays, Megaphone, Trophy, BookOpen, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const news = [
  {
    icon: Megaphone,
    title: "Admissions Open",
    date: "Current Term",
    desc: "Parents and guardians can contact the school office for admission enquiries, reporting details and available vacancies.",
  },
  {
    icon: BookOpen,
    title: "Academic Mentorship Programme",
    date: "This Term",
    desc: "Students continue to receive structured academic guidance, study planning and subject mentorship from their teachers.",
  },
  {
    icon: Trophy,
    title: "Sports and Co-curricular Activities",
    date: "Ongoing",
    desc: "Games, clubs and student leadership activities remain central to holistic development at Mumbuni Boys Senior School.",
  },
  {
    icon: Users,
    title: "Parent Engagement",
    date: "Upcoming",
    desc: "Parents are encouraged to stay in touch with class teachers and the administration for updates on learner progress.",
  },
];

const News = () => (
  <>
    <PageHeader eyebrow="News & Announcements" title="School News" subtitle="Latest updates, notices and announcements from Mumbuni Boys Senior School." />

    <section className="py-20 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item) => (
            <article key={item.title} className="p-7 rounded-lg bg-card border border-secondary/40 shadow-card-soft hover-lift">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1 flex items-center gap-2">
                    <CalendarDays className="w-3 h-3" /> {item.date}
                  </p>
                  <h2 className="font-display text-2xl text-primary-deep mb-2">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default News;
