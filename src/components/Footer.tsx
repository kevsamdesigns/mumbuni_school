import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/mumbuni-logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer className="bg-gradient-footer text-chocolate-foreground pt-20">
    <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Mumbuni Boys Senior School logo" className="w-14 h-14 bg-background rounded-lg p-1 object-contain" width={56} height={56} loading="lazy" />
          <p className="font-display font-extrabold text-lg leading-tight">Mumbuni Boys<br />Senior School</p>
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-5">
          A modern boys' senior school in Machakos committed to academic excellence, discipline, leadership and holistic growth.
        </p>
        <div className="flex gap-3">
          {[
            { Icon: Facebook, href: "#", label: "Facebook" },
            { Icon: Twitter, href: "#", label: "Twitter" },
            { Icon: Instagram, href: "#", label: "Instagram" },
            { Icon: Youtube, href: "#", label: "YouTube" },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-foreground hover:scale-110 transition-smooth flex items-center justify-center" aria-label={label}>
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-bold text-lg mb-5 text-accent">Quick Links</h4>
        <ul className="space-y-3 text-sm text-white/85">
          {quickLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-accent transition-smooth">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold text-lg mb-5 text-accent">Information</h4>
        <ul className="space-y-3 text-sm text-white/85">
          {[
            { label: "Admissions", to: "/admissions" },
            { label: "News & Announcements", to: "/news" },
            { label: "Student Portal", to: "/portal" },
            { label: "Rules & Regulations", to: "/rules" },
            { label: "Careers", to: "/careers" },
          ].map((l) => (
            <li key={l.to}><Link to={l.to} className="hover:text-accent transition-smooth">{l.label}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-bold text-lg mb-5 text-accent">Contact Info</h4>
        <ul className="space-y-3 text-sm text-white/85">
          <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" /> mumbuniboys32@gmail.com</li>
          <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" /> 0727 642 932</li>
          <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /> P.O. Box 310-90100, Machakos, Kenya</li>
          <li className="pt-2">
            <p className="flex items-center gap-2 font-semibold mb-2 text-white"><Clock className="w-4 h-4 text-accent" /> Office Hours</p>
            <p className="ml-6">Mon-Fri: 8:00 AM - 5:00 PM</p>
            <p className="ml-6">Sat: 8:00 AM - 1:00 PM</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-secondary text-secondary-foreground">
      <div className="container py-5 flex flex-col md:flex-row justify-between gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Mumbuni Boys Senior School. All rights reserved.</p>
        <p className="italic font-semibold text-accent-foreground">"Together We Excel"</p>
      </div>
    </div>
  </footer>
);
