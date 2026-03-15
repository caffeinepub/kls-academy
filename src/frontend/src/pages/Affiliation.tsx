import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useEffect } from "react";

const affiliations = [
  {
    icon: "🏛️",
    title: "UGC Recognized",
    org: "University Grants Commission",
    desc: "Recognized by the University Grants Commission (UGC) for academic excellence and adherence to national educational standards.",
  },
  {
    icon: "⭐",
    title: "State Govt. Approved",
    org: "Government of West Bengal",
    desc: "Officially approved and recognized by the Government of West Bengal for all programs offered at the Academy.",
  },
  {
    icon: "✅",
    title: "ISO 9001:2015",
    org: "International Organization for Standardization",
    desc: "ISO certified institution ensuring quality management systems in all academic and administrative processes.",
  },
  {
    icon: "🎖️",
    title: "NAAC Accredited",
    org: "National Assessment & Accreditation Council",
    desc: "Accredited by NAAC with Grade A, recognizing the institution's commitment to quality higher education.",
  },
  {
    icon: "📜",
    title: "AICTE Approved",
    org: "All India Council for Technical Education",
    desc: "Technical programs approved by AICTE, ensuring curriculum meets national standards for technical education.",
  },
  {
    icon: "🏥",
    title: "MCI Recognized",
    org: "Medical Council of India",
    desc: "Medical programs recognized by MCI, allowing graduates to practice medicine across India.",
  },
  {
    icon: "⚖️",
    title: "Bar Council Approved",
    org: "Bar Council of India",
    desc: "Law programs approved by the Bar Council of India, qualifying graduates for enrollment as legal practitioners.",
  },
  {
    icon: "🌟",
    title: "NBA Accredited",
    org: "National Board of Accreditation",
    desc: "Engineering programs accredited by NBA, ensuring graduate competency meets industry requirements.",
  },
];

export default function Affiliation() {
  useEffect(() => {
    document.title = "Affiliation – KLS Academy";
  }, []);

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Recognized & Approved
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Affiliation & Recognition
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            KLS Academy is recognized and approved by leading national bodies
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {affiliations.map(({ icon, title, org, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-2 border-gold/20 hover:border-gold/60 transition-colors shadow-sm bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{icon}</div>
                    <h3 className="font-display font-bold text-navy text-lg mb-1">
                      {title}
                    </h3>
                    <p className="text-gold text-xs font-medium mb-3">{org}</p>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
