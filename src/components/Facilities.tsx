import { BookOpen, Users, Laptop, FlaskConical, Home as HomeIcon, Trophy } from "lucide-react";
import library from "@/assets/brand-reading-line.png";
import teachers from "@/assets/brand-assembly.png";
import computer from "@/assets/brand-computer-lab.png";
import lab from "@/assets/brand-microscope.png";
import boarding from "@/assets/brand-dormitory.png";
import sports from "@/assets/brand-football.png";

const facilities = [
  { icon: BookOpen, image: library, title: "Library", desc: "Modern, well-equipped academic resource center with thousands of titles." },
  { icon: Users, image: teachers, title: "Qualified Teachers", desc: "Experienced and certified educators committed to student success." },
  { icon: Laptop, image: computer, title: "Computer Lab", desc: "Up-to-date computer suite for digital learning and ICT skills." },
  { icon: FlaskConical, image: lab, title: "Science Laboratories", desc: "Fully equipped Biology, Chemistry and Physics labs." },
  { icon: HomeIcon, image: boarding, title: "Boarding Facilities", desc: "Safe, comfortable dormitories with supportive boarding staff on duty." },
  { icon: Trophy, image: sports, title: "Sports & Fields", desc: "Spacious playing fields for athletics, football, rugby and more." },
];

export const Facilities = () => (
  <section id="facilities" className="relative py-24 bg-background overflow-hidden">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-secondary font-semibold uppercase tracking-[0.25em] text-xs mb-3">What We Offer</p>
        <h2 className="section-title-accent font-display text-4xl md:text-5xl text-primary-deep mb-4">World-Class Facilities</h2>
        <p className="text-muted-foreground text-lg">Everything our students need to learn, grow and thrive in a supportive environment.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <article
            key={f.title}
            className="group rounded-lg overflow-hidden bg-card border border-secondary/40 shadow-card-soft hover-lift"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={f.image}
                alt={f.title}
                loading="lazy"
                width={1280}
                height={800}
                className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/78 via-primary/20 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-gradient-accent text-primary-deep flex items-center justify-center shadow-elegant">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-primary-foreground drop-shadow">
                {f.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
    <div className="sky-curve" />
  </section>
);
