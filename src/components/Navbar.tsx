import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, LogIn, LayoutDashboard, GraduationCap, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/mumbuni-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Sports", to: "/gallery" },
  { label: "Gallery", to: "/gallery" },
  { label: "Admissions", to: "/admissions" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 bg-background transition-smooth ${scrolled ? "shadow-card-soft" : "shadow-sm"}`}>
      <div className="hidden md:block bg-gradient-topbar text-primary-foreground text-xs">
        <div className="container flex justify-between items-center py-2 gap-4">
          <div className="flex items-center gap-6">
            <a href="tel:0727642932" className="flex items-center gap-2 text-white hover:text-accent transition-smooth">
              <Phone className="w-3 h-3" /> 0727 642 932
            </a>
            <a href="mailto:mumbuniboys32@gmail.com" className="flex items-center gap-2 text-white hover:text-accent transition-smooth">
              <Mail className="w-3 h-3" /> mumbuniboys32@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> P.O. Box 310-90100, Machakos, Kenya</span>
            <span className="flex items-center gap-3">
              <Facebook className="w-3.5 h-3.5" />
              <Twitter className="w-3.5 h-3.5" />
              <Instagram className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      <nav className="container flex items-center justify-between bg-background py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Mumbuni Boys Senior School logo" className="h-14 w-14 rounded-lg bg-white object-contain p-1 sm:h-20 sm:w-20" width={80} height={80} />
          <div className="hidden sm:block leading-tight text-primary-deep">
            <p className="font-display text-xl font-black uppercase lg:text-2xl">Mumbuni Boys</p>
            <p className="font-display text-xl font-black uppercase lg:text-2xl">Senior School</p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-secondary">- Together We Excel -</p>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-0 py-3 text-sm font-extrabold uppercase transition-smooth ${
                    isActive
                      ? "text-secondary after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-secondary"
                      : "text-foreground hover:text-secondary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-secondary/15 hover:text-primary" asChild>
              <Link to={isAdmin ? "/admin" : "/portal"}>
                {isAdmin ? <LayoutDashboard className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                {isAdmin ? "Admin" : "My Portal"}
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-secondary/15 hover:text-primary" asChild>
              <Link to="/auth"><LogIn className="w-4 h-4" />Login</Link>
            </Button>
          )}
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">Apply Now</Link>
          </Button>
        </div>

        <button className="rounded-md p-2 text-primary hover:bg-secondary/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-border bg-background shadow-card-soft animate-fade-in lg:hidden">
          <ul className="container py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block py-3 px-3 rounded-md font-medium ${
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary/15 hover:text-primary"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <Button variant="outline" className="mt-2 border-primary text-primary hover:bg-secondary/15 hover:text-primary" asChild>
              <Link to={user ? (isAdmin ? "/admin" : "/portal") : "/auth"}>
                {user ? (isAdmin ? "Admin Dashboard" : "My Portal") : "Login / Sign Up"}
              </Link>
            </Button>
            <Button variant="hero" className="mt-2" asChild>
              <Link to="/contact">Apply Now</Link>
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};
