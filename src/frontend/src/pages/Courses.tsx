import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookOpen,
  Cog,
  GraduationCap,
  Heart,
  Leaf,
  Pill,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const courses = [
  {
    icon: GraduationCap,
    title: "Class 10th to Ph.D Programs",
    desc: "Comprehensive academic programs across all levels of education. From secondary school certification to doctoral research programs, we offer pathways for every academic aspiration.",
    duration: "1–5 Years",
    intake: "Twice a year",
  },
  {
    icon: Heart,
    title: "Medical Courses",
    desc: "MBBS, BDS, BAMS, B.Sc Nursing, and various allied health science programs taught by experienced medical professionals.",
    duration: "3–5.5 Years",
    intake: "Annual",
  },
  {
    icon: Cog,
    title: "Engineering Courses",
    desc: "B.Tech, M.Tech, and Diploma programs in Computer Science, Electronics, Mechanical, Civil, and Electrical Engineering.",
    duration: "3–4 Years",
    intake: "Annual",
  },
  {
    icon: Pill,
    title: "Pharmacy Courses",
    desc: "B.Pharm and M.Pharm programs with industry-standard laboratories and clinical exposure for pharmacy professionals.",
    duration: "2–4 Years",
    intake: "Annual",
  },
  {
    icon: Leaf,
    title: "Ayurvedic Courses",
    desc: "BAMS and traditional medicine programs blending ancient Ayurvedic knowledge with modern medical science.",
    duration: "5.5 Years",
    intake: "Annual",
  },
  {
    icon: BookOpen,
    title: "LLB Programs",
    desc: "3-year LL.B and 5-year integrated BA/BBA/B.Com + LL.B programs for aspiring legal professionals.",
    duration: "3–5 Years",
    intake: "Annual",
  },
  {
    icon: Wrench,
    title: "Vocational Courses",
    desc: "Industry-relevant vocational and trade certification courses including ITI, NSDC programs, and skill development initiatives.",
    duration: "6–24 Months",
    intake: "Quarterly",
  },
  {
    icon: Activity,
    title: "Paramedical Courses",
    desc: "B.Sc and Diploma programs in Radiology, Lab Technology, Physiotherapy, Medical Imaging, and allied health technologies.",
    duration: "2–4 Years",
    intake: "Annual",
  },
  {
    icon: Award,
    title: "Short-Term Certification",
    desc: "Professional certification programs of 3–12 months duration in IT, Finance, Marketing, Healthcare Administration, and more.",
    duration: "3–12 Months",
    intake: "Monthly",
  },
];

export default function Courses() {
  useEffect(() => {
    document.title = "Courses – KLS Academy";
  }, []);

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Academic Programs
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Courses Offered
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Explore our comprehensive range of academic and professional
            programs
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(({ icon: Icon, title, desc, duration, intake }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="h-full border-0 shadow-card bg-white card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-navy text-lg mb-2">
                      {title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                      {desc}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        Duration: {duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Intake: {intake}
                      </Badge>
                    </div>
                    <Link to="/admission">
                      <Button
                        size="sm"
                        className="bg-navy text-white hover:bg-navy-light w-full"
                      >
                        Apply Now
                      </Button>
                    </Link>
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
