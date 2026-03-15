import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useVerifyCertificate } from "../hooks/useQueries";

export default function Verification() {
  useEffect(() => {
    document.title = "Verification – KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useVerifyCertificate();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<[boolean, string] | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) {
      toast.error("Please enter certificate ID");
      return;
    }
    try {
      const res = await mutateAsync(certId.trim());
      setResult(res);
    } catch {
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Certificate Authentication
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Certificate Verification
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Verify the authenticity of certificates issued by KLS Academy
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="border-0 shadow-card mb-6">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-navy">
                Verify Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Certificate ID</Label>
                  <Input
                    placeholder="e.g. KLS-CERT-2024-001"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    data-ocid="verification.cert_input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy text-white hover:bg-navy-light"
                  disabled={isPending}
                  data-ocid="verification.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 w-4 h-4" />
                      Verify Certificate
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card
              className={`border-2 shadow-card ${result[0] ? "border-green-400" : "border-red-400"}`}
              data-ocid="verification.success_state"
            >
              <CardContent className="p-6 text-center">
                {result[0] ? (
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                )}
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  {result[0] ? "Certificate Valid" : "Certificate Invalid"}
                </h3>
                <p className="text-foreground/70 text-sm">{result[1]}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
