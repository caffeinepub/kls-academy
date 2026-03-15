import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Admission", to: "/admission" },
  { label: "Courses", to: "/courses" },
  { label: "Online Exam", to: "/examination" },
  { label: "Affiliation", to: "/affiliation" },
  { label: "Result", to: "/result" },
  { label: "Verification", to: "/verification" },
  { label: "Payment", to: "/payment" },
  { label: "Contact", to: "/contact" },
];

const ocidMap: Record<string, string> = {
  "/": "nav.home_link",
  "/about": "nav.about_link",
  "/admission": "nav.admission_link",
  "/courses": "nav.courses_link",
  "/examination": "nav.examination_link",
  "/affiliation": "nav.affiliation_link",
  "/result": "nav.result_link",
  "/verification": "nav.verification_link",
  "/payment": "nav.payment_link",
  "/contact": "nav.contact_link",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg">
      {/* Top bar */}
      <div className="bg-gold py-1.5 px-4 text-center text-sm font-medium text-navy-dark hidden md:block">
        🎓 Admissions Open 2024–25 | Call: +91 98765 43210 |
        info@klsacademy.edu.in
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="nav.home_link"
            onClick={() => setOpen(false)}
          >
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-navy-dark" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-tight">
                KLS Academy
              </div>
              <div className="text-gold text-[10px] leading-tight tracking-wide hidden sm:block">
                Kolkata Legal Service Academy
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={ocidMap[link.to]}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  currentPath === link.to
                    ? "text-gold border-b-2 border-gold"
                    : "text-white/85 hover:text-gold hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={ocidMap[link.to]}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "text-gold"
                    : "text-white/85 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
