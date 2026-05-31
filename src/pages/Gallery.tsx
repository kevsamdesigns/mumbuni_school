import { PageHeader } from "@/components/PageHeader";
import gate from "@/assets/brand-school-sign.png";
import students from "@/assets/hero-students-brand.png";
import lab from "@/assets/brand-lab-practical.png";
import computer from "@/assets/brand-computer-lab.png";
import laptopGroup from "@/assets/brand-laptop-group.png";
import reading from "@/assets/brand-reading-line.png";
import microscope from "@/assets/brand-microscope.png";
import music from "@/assets/brand-music.png";
import dormitory from "@/assets/brand-dormitory.png";
import assembly from "@/assets/brand-assembly.png";
import basketball from "@/assets/brand-basketball.png";
import football from "@/assets/brand-football.png";
import rugby from "@/assets/brand-rugby.png";
import campus from "@/assets/brand-campus-aerial.png";
import scouts from "@/assets/brand-scouts.png";
import leadership from "@/assets/brand-leadership-podium.png";

const photos = [
  { src: gate, alt: "Mumbuni Boys Senior School campus entrance", span: "row-span-2" },
  { src: students, alt: "Students in Mumbuni Boys Senior School blazers" },
  { src: leadership, alt: "Student leader speaking at the podium" },
  { src: reading, alt: "Students reading in the school library", span: "row-span-2" },
  { src: computer, alt: "Computer laboratory lesson" },
  { src: laptopGroup, alt: "Students collaborating on a laptop" },
  { src: lab, alt: "Science laboratory practical" },
  { src: microscope, alt: "Microscope science practical" },
  { src: music, alt: "Students practicing music" },
  { src: dormitory, alt: "Boarding dormitory facilities" },
  { src: assembly, alt: "School assembly in the hall", span: "row-span-2" },
  { src: basketball, alt: "Basketball on the school court" },
  { src: football, alt: "Football on the school field" },
  { src: rugby, alt: "Rugby team in action" },
  { src: campus, alt: "Aerial campus view" },
  { src: scouts, alt: "Scouts parade on the school field" },
];

const Gallery = () => (
  <>
    <PageHeader eyebrow="School Life" title="Photo Gallery" subtitle="A visual journey through the Mumbuni Boys Senior School campus, classrooms and student community." />

    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {photos.map((p, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-lg shadow-card-soft border border-secondary/40 ${p.span ?? ""}`}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-3 left-4 right-4 text-primary-foreground text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {p.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Gallery;
