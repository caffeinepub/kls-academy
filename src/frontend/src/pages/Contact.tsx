import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactMessage } from "../hooks/useQueries";

const ADMIN_EMAIL = "klsacademy@rediffmail.com";
const SEP = "==========================================\n";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us - KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useSubmitContactMessage();
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildEmailBody = (data: FormState) =>
    `New Contact Message Received\n${SEP}` +
    `Name    : ${data.name}\n` +
    `Email   : ${data.email}\n` +
    `Message : ${data.message}\n` +
    `${SEP}Submitted on: ${new Date().toLocaleString()}`;

  const openMailto = (data: FormState) => {
    const subject = encodeURIComponent(
      `Contact Message from ${data.name} - KLS Academy`,
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
      .then(() => toast.success("Message details copied to clipboard!"))
      .catch(() => toast.error("Could not copy. Please copy manually."));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmittedData({ ...form });
      setSubmitted(true);
      openMailto(form);
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Get in Touch
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            We're here to help. Reach out to us for admission, courses, or any
            queries.
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content:
                    "46, Italgacha Road, Dumdum Airport Gate No.1 Bus Stand, Kolkata - 700028, West Bengal, India",
                },
                { icon: Phone, title: "Phone", content: "+91 8158937841" },
                {
                  icon: Mail,
                  title: "Email",
                  content: "klsacademy@rediffmail.com",
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  content: "Mon-Sat: 9:00 AM - 6:00 PM | Sunday: Closed",
                },
              ].map(({ icon: Icon, title, content }) => (
                <Card key={title} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-0.5">
                        {title}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="w-full h-40 bg-navy/10 flex flex-col items-center justify-center gap-2">
                  <MapPin className="w-8 h-8 text-gold" />
                  <p className="text-sm text-foreground/60 text-center px-4">
                    46, Italgacha Road, Dumdum, Kolkata - 700028
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {submitted && submittedData ? (
                <Card
                  className="border-0 shadow-card"
                  data-ocid="contact.success_state"
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
                      <h2 className="font-display text-2xl font-bold text-navy mb-1">
                        Message Recorded!
                      </h2>
                      <p className="text-foreground/60 text-sm">
                        Please send the details below to{" "}
                        <strong className="text-navy">{ADMIN_EMAIL}</strong> to
                        complete your enquiry.
                      </p>
                    </div>

                    <div className="bg-secondary rounded-xl p-4 mb-4 text-sm space-y-1.5 border">
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Name</span>
                        <span className="font-medium">
                          {submittedData.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Email</span>
                        <span className="font-medium">
                          {submittedData.email}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-foreground/50 shrink-0">
                          Message
                        </span>
                        <span className="font-medium text-right">
                          {submittedData.message}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Button
                        className="bg-navy text-white hover:bg-navy-light"
                        onClick={() => openMailto(submittedData)}
                        data-ocid="contact.send_email_button"
                      >
                        <Mail className="mr-2 w-4 h-4" />
                        Open Email App
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(submittedData)}
                        data-ocid="contact.copy_button"
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
                        setForm({ name: "", email: "", message: "" });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl text-navy">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label>Your Name *</Label>
                          <Input
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            data-ocid="contact.name_input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Email Address *</Label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            data-ocid="contact.email_input"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Message *</Label>
                        <Textarea
                          name="message"
                          placeholder="How can we help you?"
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          data-ocid="contact.message_input"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-navy text-white hover:bg-navy-light"
                        disabled={isPending}
                        data-ocid="contact.submit_button"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
