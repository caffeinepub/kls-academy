import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
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

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us - KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useSubmitContactMessage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await mutateAsync(form);
      const subject = encodeURIComponent(
        `Contact Message from ${form.name} - KLS Academy`,
      );
      const body = encodeURIComponent(
        `New Contact Message Received\n${SEP}` +
          `Name    : ${form.name}\n` +
          `Email   : ${form.email}\n` +
          `Message : ${form.message}\n` +
          `${SEP}Submitted on: ${new Date().toLocaleString()}`,
      );
      window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      toast.success(
        "Message sent! Your email client will open to deliver the message.",
      );
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
              {submitted ? (
                <Card
                  className="border-0 shadow-card h-full flex items-center"
                  data-ocid="contact.success_state"
                >
                  <CardContent className="p-12 text-center w-full">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold text-navy mb-2">
                      Message Sent!
                    </h2>
                    <p className="text-foreground/70">
                      Thank you for contacting us. Your email client has been
                      opened to send the message to{" "}
                      <strong>{ADMIN_EMAIL}</strong>. Please send the email to
                      complete your enquiry.
                    </p>
                    <Button
                      className="mt-6 bg-navy text-white"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                    >
                      Send Another
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
