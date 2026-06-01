import { CalendarDays, Megaphone, Trophy, BookOpen, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useContent } from "@/hooks/useContent";

const newsDefaults = {
  "header.eyebrow": "News & Announcements",
  "header.title": "School News",
  "header.subtitle": "Latest updates, notices and announcements from Mumbuni Boys Senior School.",
  "item.1.title": "Admissions Open",
  "item.1.date": "Current Term",
  "item.1.desc": "Parents and guardians can contact the school office for admission enquiries, reporting details and available vacancies.",
  "item.2.title": "Academic Mentorship Programme",
  "item.2.date": "This Term",
  "item.2.desc": "Students continue to receive structured academic guidance, study planning and subject mentorship from their teachers.",
  "item.3.title": "Sports and Co-curricular Activities",
  "item.3.date": "Ongoing",
  "item.3.desc": "Games, clubs and student leadership activities remain central to holistic development at Mumbuni Boys Senior School.",
  "item.4.title": "Parent Engagement",
  "item.4.date": "Upcoming",
  "item.4.desc": "Parents are encouraged to stay in touch with class teachers and the administration for updates on learner progress.",
} as const;

const News = () => {
  const { getContent } = useContent("news");
  const news = [
    { icon: Megaphone, title: getContent("item.1.title", newsDefaults["item.1.title"]), date: getContent("item.1.date", newsDefaults["item.1.date"]), desc: getContent("item.1.desc", newsDefaults["item.1.desc"]) },
    { icon: BookOpen, title: getContent("item.2.title", newsDefaults["item.2.title"]), date: getContent("item.2.date", newsDefaults["item.2.date"]), desc: getContent("item.2.desc", newsDefaults["item.2.desc"]) },
    { icon: Trophy, title: getContent("item.3.title", newsDefaults["item.3.title"]), date: getContent("item.3.date", newsDefaults["item.3.date"]), desc: getContent("item.3.desc", newsDefaults["item.3.desc"]) },
    { icon: Users, title: getContent("item.4.title", newsDefaults["item.4.title"]), date: getContent("item.4.date", newsDefaults["item.4.date"]), desc: getContent("item.4.desc", newsDefaults["item.4.desc"]) },
  ];

  return (
  <>
    <PageHeader
      eyebrow={getContent("header.eyebrow", newsDefaults["header.eyebrow"])}
      title={getContent("header.title", newsDefaults["header.title"])}
      subtitle={getContent("header.subtitle", newsDefaults["header.subtitle"])}
    />

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
};

export default News;
