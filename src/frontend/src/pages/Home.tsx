import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookMarked,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Cog,
  CreditCard,
  FileText,
  GraduationCap,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Pill,
  Search,
  Star,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useGetNotices } from "../hooks/useQueries";

const courses = [
  {
    icon: GraduationCap,
    title: "Class 10th to Ph.D",
    desc: "Comprehensive academic programs for all educational levels",
  },
  {
    icon: Heart,
    title: "Medical Courses",
    desc: "MBBS, BDS, and allied health sciences programs",
  },
  {
    icon: Cog,
    title: "Engineering Courses",
    desc: "B.Tech, M.Tech and Diploma in various engineering disciplines",
  },
  {
    icon: Pill,
    title: "Pharmacy Courses",
    desc: "B.Pharm and M.Pharm programs with industry exposure",
  },
  {
    icon: Leaf,
    title: "Ayurvedic Courses",
    desc: "BAMS and traditional medicine programs",
  },
  {
    icon: BookOpen,
    title: "LLB Programs",
    desc: "3-year and 5-year integrated law programs",
  },
  {
    icon: Wrench,
    title: "Vocational Courses",
    desc: "Skill development and trade certification programs",
  },
  {
    icon: Activity,
    title: "Paramedical Courses",
    desc: "Allied health technology and nursing programs",
  },
  {
    icon: Award,
    title: "Short-Term Certification",
    desc: "6-month to 1-year professional certification programs",
  },
];

const steps = [
  {
    num: "01",
    title: "Fill Online Form",
    desc: "Complete the admission application form with your personal and academic details",
  },
  {
    num: "02",
    title: "Upload Documents",
    desc: "Submit scanned copies of certificates, ID proof, and photographs",
  },
  {
    num: "03",
    title: "Pay Fees",
    desc: "Secure online payment of admission and registration fees",
  },
  {
    num: "04",
    title: "Get Confirmation",
    desc: "Receive confirmation email and enrollment number",
  },
  {
    num: "05",
    title: "Start Learning",
    desc: "Access your student portal and begin your academic journey",
  },
];

const services = [
  {
    icon: Search,
    title: "Check Result",
    desc: "View your examination results by entering your roll number",
    to: "/result",
    color: "text-blue-600",
  },
  {
    icon: CheckCircle,
    title: "Certificate Verification",
    desc: "Verify authenticity of certificates issued by KLS Academy",
    to: "/verification",
    color: "text-green-600",
  },
  {
    icon: FileText,
    title: "Online Examination",
    desc: "Access the online examination portal with your student credentials",
    to: "/examination",
    color: "text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Fee Payment",
    desc: "Pay your tuition and examination fees securely online",
    to: "/payment",
    color: "text-orange-600",
  },
];

const affiliations = [
  { title: "UGC Recognized", desc: "University Grants Commission", icon: "🏛️" },
  { title: "State Govt. Approved", desc: "Govt. of West Bengal", icon: "⭐" },
  { title: "ISO Certified", desc: "ISO 9001:2015", icon: "✅" },
  { title: "NAAC Accredited", desc: "Grade A Institution", icon: "🎖️" },
];

const sampleNotices = [
  {
    title: "Admission Open 2026–27",
    content:
      "Applications are now open for all UG, PG, and Ph.D programs. Last date: 31st August 2026.",
    date: "2026-07-01",
  },
  {
    title: "Examination Schedule Released",
    content:
      "Semester examinations for all courses will commence from 15th September 2026.",
    date: "2026-07-05",
  },
  {
    title: "New Batch – LLB Program",
    content:
      "A new batch for the 5-year integrated LLB program starts from 1st August 2026.",
    date: "2026-07-10",
  },
  {
    title: "Scholarship Applications Open",
    content:
      "Merit-based scholarships available for deserving students. Apply by 20th July 2026.",
    date: "2026-07-12",
  },
  {
    title: "Guest Lecture Series",
    content:
      "Eminent legal practitioners to deliver guest lectures at KLS Academy campus.",
    date: "2026-07-15",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "KLS Academy – Kolkata Legal Service Academy";
  }, []);
  const { data: notices } = useGetNotices();
  const displayNotices =
    notices && notices.length > 0 ? notices.slice(0, 5) : sampleNotices;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.jpg"
          alt="KLS Academy Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-gold text-navy-dark border-0 font-semibold">
              Admissions Open 2026–27
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Welcome to
              <br />
              <span className="text-gold">KLS Academy</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl mb-2 font-body">
              Kolkata Legal Service Academy
            </p>
            <p className="text-white/70 text-base mb-8 font-body max-w-xl">
              A premier institution offering world-class education from Class 10
              to Ph.D programs in Kolkata, West Bengal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admission">
                <Button
                  size="lg"
                  className="bg-gold text-navy-dark font-semibold hover:bg-gold-light border-0 shadow-lg px-8"
                  data-ocid="hero.primary_button"
                >
                  Apply for Admission
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8"
                  data-ocid="hero.secondary_button"
                >
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "5000+", label: "Students" },
              { icon: BookMarked, value: "50+", label: "Courses" },
              { icon: Trophy, value: "10+", label: "Years Excellence" },
              { icon: Star, value: "100%", label: "Accredited" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-center"
              >
                <Icon className="w-8 h-8 text-gold" />
                <div>
                  <div className="font-display text-2xl font-bold text-white">
                    {value}
                  </div>
                  <div className="text-white/70 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/generated/about-building.dim_800x500.jpg"
                alt="KLS Academy Building"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gold/10 text-gold border-gold/30 mb-4">
                About Us
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
                A Legacy of Academic Excellence
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                KLS Academy (Kolkata Legal Service Academy) is a premier
                educational institution situated at the heart of Kolkata, West
                Bengal. Established with the vision of making quality education
                accessible, we offer diverse programs ranging from Class 10th to
                Ph.D levels.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                From law and medicine to engineering and vocational training,
                KLS Academy provides industry-relevant curriculum backed by
                experienced faculty and state-of-the-art infrastructure.
              </p>
              <Link to="/about">
                <Button className="bg-navy text-white hover:bg-navy-light group">
                  Learn More About Us
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gold/10 text-gold border-gold/30 mb-3">
              Programs
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Courses Offered
            </h2>
            <p className="text-foreground/60 mt-2 max-w-xl mx-auto">
              Explore our wide range of academic and professional programs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover border-0 shadow-card bg-white h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display font-semibold text-navy text-lg mb-2">
                      {title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                      {desc}
                    </p>
                    <Link
                      to="/courses"
                      className="text-gold text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses">
              <Button
                size="lg"
                className="bg-navy text-white hover:bg-navy-light"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-3">
              How to Apply
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Admission Process
            </h2>
            <p className="text-white/60 mt-2">
              Simple steps to begin your academic journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold text-navy-dark font-display font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gold/30" />
                  )}
                  <h3 className="font-display font-semibold text-white text-base mb-2">
                    {title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/admission">
              <Button
                size="lg"
                className="bg-gold text-navy-dark font-semibold hover:bg-gold-light"
              >
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Online Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gold/10 text-gold border-gold/30 mb-3">
              Student Portal
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Online Services
            </h2>
            <p className="text-foreground/60 mt-2">
              Access essential services anytime, anywhere
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc, to, color }) => (
              <Card
                key={title}
                className="card-hover border border-border shadow-card"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-7 h-7 ${color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-navy text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                    {desc}
                  </p>
                  <Link to={to}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-navy text-navy hover:bg-navy hover:text-white w-full"
                    >
                      Access Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliation */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-gold/10 text-gold border-gold/30 mb-3">
              Recognized By
            </Badge>
            <h2 className="font-display text-3xl font-bold text-navy">
              Affiliation & Recognition
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {affiliations.map(({ title, desc, icon }) => (
              <Card
                key={title}
                className="border-2 border-gold/30 hover:border-gold/70 transition-colors shadow-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="font-display font-semibold text-navy text-base mb-1">
                    {title}
                  </h3>
                  <p className="text-foreground/60 text-xs">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notices + Contact */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Notice Board */}
            <div className="lg:col-span-3">
              <Badge className="bg-gold/10 text-gold border-gold/30 mb-3">
                Latest Updates
              </Badge>
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                Student Notices
              </h2>
              <div className="space-y-3">
                {displayNotices.map((notice) => (
                  <div
                    key={notice.title}
                    className="flex gap-4 p-4 rounded-xl bg-secondary border-l-4 border-gold"
                  >
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm mb-1">
                        {notice.title}
                      </h4>
                      <p className="text-foreground/60 text-xs leading-relaxed">
                        {notice.content}
                      </p>
                      <p className="text-gold text-xs mt-1 font-medium">
                        {notice.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-2">
              <Badge className="bg-gold/10 text-gold border-gold/30 mb-3">
                Get in Touch
              </Badge>
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                Contact Us
              </h2>
              <Card className="border-0 shadow-card bg-navy text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/50 mb-1">Address</p>
                      <p className="text-sm text-white/85 leading-relaxed">
                        46, Italgacha Road, Dumdum Airport Gate No.1 Bus Stand,
                        Kolkata – 700028
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <p className="text-xs text-white/50 mb-1">Phone</p>
                      <p className="text-sm text-white/85">+91 8158937841</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <p className="text-xs text-white/50 mb-1">Email</p>
                      <p className="text-sm text-white/85">
                        klsacademy@rediffmail.com
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link to="/contact">
                      <Button className="w-full bg-gold text-navy-dark font-semibold hover:bg-gold-light">
                        Send Message
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
