import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCheckResult } from "../hooks/useQueries";

export default function Result() {
  useEffect(() => {
    document.title = "Result – KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useCheckResult();
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState<[bigint, string] | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) {
      toast.error("Please enter roll number");
      return;
    }
    try {
      const res = await mutateAsync(rollNumber.trim());
      setResult(res);
    } catch {
      toast.error("Failed to fetch result. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Academic Results
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Result Checking
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Enter your roll number to check your examination results
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="border-0 shadow-card mb-6">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-navy">
                Check Your Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheck} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Roll Number</Label>
                  <Input
                    placeholder="e.g. KLS2024001"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    data-ocid="result.roll_input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy text-white hover:bg-navy-light"
                  disabled={isPending}
                  data-ocid="result.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 w-4 h-4" />
                      Check Result
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card
              className={`border-2 shadow-card ${result[1].toLowerCase() === "pass" ? "border-green-400" : "border-red-400"}`}
              data-ocid="result.success_state"
            >
              <CardContent className="p-6 text-center">
                {result[1].toLowerCase() === "pass" ? (
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                )}
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  Roll No: {rollNumber}
                </h3>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-navy">
                      {result[0].toString()}
                    </p>
                    <p className="text-sm text-foreground/60">Marks</p>
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-2xl font-bold ${result[1].toLowerCase() === "pass" ? "text-green-600" : "text-red-600"}`}
                    >
                      {result[1]}
                    </p>
                    <p className="text-sm text-foreground/60">Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
