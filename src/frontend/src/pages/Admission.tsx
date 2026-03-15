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
import { CheckCircle, Loader2 } from "lucide-react";
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

export default function Admission() {
  useEffect(() => {
    document.title = "Admission – KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useSubmitApplication();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
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
      setSubmitted(true);
      toast.success("Application submitted successfully!");
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
          {submitted ? (
            <Card
              className="border-0 shadow-card"
              data-ocid="admission.success_state"
            >
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Application Submitted!
                </h2>
                <p className="text-foreground/70">
                  Your application has been received. We will contact you
                  shortly on the provided email/phone.
                </p>
                <Button
                  className="mt-6 bg-navy text-white"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another
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
