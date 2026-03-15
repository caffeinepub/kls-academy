import { Link } from "@tanstack/react-router";
import {
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="bg-gold h-1" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-navy-dark" />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">
                  KLS Academy
                </div>
                <div className="text-gold text-[10px] tracking-wide">
                  Kolkata Legal Service Academy
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              A premier educational institution in Kolkata offering diverse
              academic programs from Class 10 to Ph.D, committed to excellence
              in education.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-gold mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Admission", to: "/admission" },
                { label: "Courses", to: "/courses" },
                { label: "Online Examination", to: "/examination" },
                { label: "Results", to: "/result" },
                { label: "Verification", to: "/verification" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-gold text-sm transition-colors"
                  >
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-display font-semibold text-gold mb-4 text-lg">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  46, Italgacha Road, Dumdum Airport Gate No.1 Bus Stand,
                  Kolkata – 700028, West Bengal
                </span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 8158937841</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/70">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>klsacademy@rediffmail.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-display font-semibold text-gold mb-4 text-lg">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy-dark transition-all text-white/70"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-white/60">Office Hours</p>
              <p className="text-sm text-white/85 mt-0.5">
                Mon–Sat: 9:00 AM – 6:00 PM
              </p>
              <p className="text-sm text-white/85">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">
            © {year} KLS Academy. All Rights Reserved.
          </p>
          <p className="text-sm text-white/50">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-gold hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
