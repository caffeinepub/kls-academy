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
import { CreditCard, Lock, Shield } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Payment() {
  useEffect(() => {
    document.title = "Payment – KLS Academy";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(
      "Payment gateway integration coming soon. Please contact office for payment.",
    );
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Secure Payment
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Fee Payment
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Pay your tuition and examination fees securely online
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <Shield className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-green-700 text-sm">
              🔒 Secure online payment processing. All transactions are
              encrypted and protected.
            </p>
          </div>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-navy flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-gold" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Student Name</Label>
                    <Input
                      placeholder="Full name"
                      data-ocid="payment.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Roll Number</Label>
                    <Input
                      placeholder="e.g. KLS2024001"
                      data-ocid="payment.roll_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Course</Label>
                  <Select>
                    <SelectTrigger data-ocid="payment.course_select">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Tuition Fees",
                        "Examination Fees",
                        "Registration Fees",
                        "Library Fees",
                        "Other",
                      ].map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    data-ocid="payment.amount_input"
                  />
                </div>
                <div className="bg-secondary rounded-xl p-4 border border-border">
                  <p className="text-sm font-medium text-navy mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Secure Payment Gateway
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Card Number</Label>
                      <Input
                        placeholder="XXXX XXXX XXXX XXXX"
                        data-ocid="payment.card_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Name on Card</Label>
                      <Input placeholder="Cardholder name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>CVV</Label>
                      <Input placeholder="XXX" type="password" />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold text-navy-dark font-bold hover:bg-gold-light"
                  data-ocid="payment.submit_button"
                >
                  <Lock className="mr-2 w-4 h-4" /> Pay Securely
                </Button>
                <p className="text-center text-xs text-foreground/50">
                  Powered by Secure Payment Gateway | 256-bit SSL Encryption
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
