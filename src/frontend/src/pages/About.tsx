import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookMarked,
  Eye,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us – KLS Academy";
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            About KLS Academy
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About Our Institution
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Kolkata Legal Service Academy – A Decade of Educational Excellence
          </p>
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/assets/generated/about-building.dim_800x500.jpg"
                alt="KLS Academy"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl font-bold text-navy mb-4">
                Who We Are
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                KLS Academy (Kolkata Legal Service Academy) is a prestigious
                educational institution located at 46, Italgacha Road, Dumdum,
                Kolkata – 700028, West Bengal, India. Founded with a mission to
                provide accessible, quality education, the academy has grown
                into a multi-disciplinary institution serving thousands of
                students annually.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Our institution offers a wide spectrum of programs spanning law,
                medicine, engineering, pharmacy, ayurveda, vocational training,
                and short-term certifications. We are committed to nurturing
                future professionals with strong academic foundations and
                practical skills.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                With state-of-the-art facilities, experienced faculty, and a
                student-centric approach, KLS Academy continues to be the
                preferred choice for higher education in Kolkata.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Users, value: "5000+", label: "Enrolled Students" },
              { icon: BookMarked, value: "50+", label: "Programs Offered" },
              { icon: Trophy, value: "10+", label: "Years of Excellence" },
              { icon: Star, value: "100%", label: "Accreditation" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="text-center p-6 rounded-2xl bg-secondary border border-border"
              >
                <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-navy mb-1">
                  {value}
                </div>
                <div className="text-foreground/60 text-sm">{label}</div>
              </div>
            ))}
          </div>

          {/* Vision Mission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the leading educational institution in Eastern India, renowned for academic excellence, innovation, and holistic student development.",
              },
              {
                icon: Target,
                title: "Our Mission",
                desc: "To provide quality education that empowers students with knowledge, skills, and values needed to excel in their chosen professions and contribute to society.",
              },
              {
                icon: Award,
                title: "Our Values",
                desc: "Excellence, Integrity, Inclusivity, Innovation, and Service – the core values that guide every aspect of our academic and administrative functions.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border-2 border-gold/20 hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-3">
                  {title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
