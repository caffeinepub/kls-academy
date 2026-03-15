import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Copy, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitApplication } from "../hooks/useQueries";

const courses = [
  "Class 10th to Ph.D",
  "Medical Courses",
  "Engineering Courses",
  "Pharmacy Courses",
  "Ayurvedic Courses",
  "LLB Programs",
  "Vocational Courses",
  "Paramedical Courses",
  "Short-Term Certification Courses",
];

const ADMIN_EMAIL = "klsacademy@rediffmail.com";
const SEP = "==========================================\n";

type FormState = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
};

export default function Admission() {
  useEffect(() => {
    document.title = "Admission - KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useSubmitApplication();
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    course: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildEmailBody = (data: FormState) =>
    `New Admission Application Received\n${SEP}` +
    `Full Name    : ${data.name}\n` +
    `Email        : ${data.email}\n` +
    `Phone        : ${data.phone}\n` +
    `Date of Birth: ${data.dob}\n` +
    `Course       : ${data.course}\n` +
    `Address      : ${data.address}\n` +
    `${SEP}Submitted on : ${new Date().toLocaleString()}`;

  const openMailto = (data: FormState) => {
    const subject = encodeURIComponent(
      `Admission Application - ${data.name} (2026-2027)`,
    );
    const body = encodeURIComponent(buildEmailBody(data));
    window.open(
      `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`,
      "_blank",
    );
  };

  const copyToClipboard = (data: FormState) => {
    navigator.clipboard
      .writeText(`To: ${ADMIN_EMAIL}\n\n${buildEmailBody(data)}`)
      .then(() => toast.success("Details copied to clipboard!"))
      .catch(() => toast.error("Could not copy. Please copy manually."));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.course ||
      !form.address
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmittedData({ ...form });
      setSubmitted(true);
      openMailto(form);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Apply Now
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Online Admission
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Fill in your details to apply for admission at KLS Academy
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted && submittedData ? (
            <Card
              className="border-0 shadow-card"
              data-ocid="admission.success_state"
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
                  <h2 className="font-display text-2xl font-bold text-navy mb-1">
                    Application Recorded!
                  </h2>
                  <p className="text-foreground/60 text-sm">
                    Please send the details below to{" "}
                    <strong className="text-navy">{ADMIN_EMAIL}</strong> to
                    complete your application.
                  </p>
                </div>

                <div className="bg-secondary rounded-xl p-4 mb-4 text-sm space-y-1.5 border">
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Full Name</span>
                    <span className="font-medium">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Email</span>
                    <span className="font-medium">{submittedData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Phone</span>
                    <span className="font-medium">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Date of Birth</span>
                    <span className="font-medium">{submittedData.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Course</span>
                    <span className="font-medium">{submittedData.course}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-foreground/50 shrink-0">Address</span>
                    <span className="font-medium text-right">
                      {submittedData.address}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button
                    className="bg-navy text-white hover:bg-navy-light"
                    onClick={() => openMailto(submittedData)}
                    data-ocid="admission.send_email_button"
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Open Email App
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(submittedData)}
                    data-ocid="admission.copy_button"
                  >
                    <Copy className="mr-2 w-4 h-4" />
                    Copy Details
                  </Button>
                </div>
                <p className="text-xs text-foreground/40 text-center mb-4">
                  Can't open email? Copy the details and paste them manually
                  into an email to {ADMIN_EMAIL}
                </p>
                <Button
                  variant="ghost"
                  className="w-full text-foreground/50"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedData(null);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      dob: "",
                      course: "",
                      address: "",
                    });
                  }}
                >
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-navy">
                  Admission Application Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        data-ocid="admission.name_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        data-ocid="admission.email_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        data-ocid="admission.phone_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        data-ocid="admission.dob_input"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Course *</Label>
                    <Select
                      value={form.course}
                      onValueChange={(val) =>
                        setForm((p) => ({ ...p, course: val }))
                      }
                    >
                      <SelectTrigger data-ocid="admission.course_select">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Your full address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      data-ocid="admission.address_input"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-navy text-white hover:bg-navy-light"
                    disabled={isPending}
                    data-ocid="admission.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
