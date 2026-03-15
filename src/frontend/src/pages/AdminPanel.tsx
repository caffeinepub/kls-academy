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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAddResult } from "../hooks/useQueries";

const ADMIN_PASSWORD = "klsadmin2026";

type ResultEntry = {
  rollNumber: string;
  marks: string;
  status: string;
};

export default function AdminPanel() {
  useEffect(() => {
    document.title = "Admin Panel – KLS Academy";
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [rollNumber, setRollNumber] = useState("");
  const [marks, setMarks] = useState("");
  const [status, setStatus] = useState<"Pass" | "Fail">("Pass");
  const [uploadedResults, setUploadedResults] = useState<ResultEntry[]>([]);

  const { mutateAsync: addResult, isPending } = useAddResult();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
      toast.success("Admin access granted");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) {
      toast.error("Roll number is required");
      return;
    }
    if (!marks.trim() || Number.isNaN(Number(marks)) || Number(marks) < 0) {
      toast.error("Enter valid marks");
      return;
    }

    try {
      await addResult({
        rollNumber: rollNumber.trim(),
        marks: Number(marks),
        status,
      });
      setUploadedResults((prev) => [
        { rollNumber: rollNumber.trim(), marks, status },
        ...prev,
      ]);
      toast.success(`Result uploaded for ${rollNumber.trim()}`);
      setRollNumber("");
      setMarks("");
      setStatus("Pass");
    } catch {
      toast.error("Failed to upload result. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <div className="bg-navy py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
              Admin Access
            </Badge>
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              Admin Panel
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Restricted area. Authorized personnel only.
            </p>
          </div>
        </div>
        <section className="py-20 bg-secondary flex items-center justify-center">
          <Card className="w-full max-w-sm border-0 shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center mb-2">
                <Lock className="w-7 h-7 text-navy" />
              </div>
              <CardTitle className="font-display text-2xl text-navy">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Admin Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-ocid="admin.password_input"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
                      data-ocid="admin.toggle"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {loginError && (
                    <p
                      className="text-sm text-red-500 mt-1"
                      data-ocid="admin.error_state"
                    >
                      {loginError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy text-white hover:bg-navy-light"
                  data-ocid="admin.submit_button"
                >
                  <ShieldCheck className="mr-2 w-4 h-4" /> Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Admin Panel
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Result Upload
          </h1>
          <p className="text-white/70">
            Upload and manage student examination results
          </p>
        </div>
      </div>

      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          {/* Upload Form */}
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl text-navy">
                Upload New Result
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/50 hover:text-red-500"
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword("");
                }}
                data-ocid="admin.logout_button"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleUpload}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
              >
                <div className="space-y-1.5">
                  <Label>Roll Number</Label>
                  <Input
                    placeholder="e.g. KLS2024001"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    data-ocid="admin.result.roll_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Marks Obtained</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 75"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    min={0}
                    data-ocid="admin.result.marks_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Result Status</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as "Pass" | "Fail")}
                  >
                    <SelectTrigger data-ocid="admin.result.status_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pass">Pass</SelectItem>
                      <SelectItem value="Fail">Fail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-3">
                  <Button
                    type="submit"
                    className="w-full bg-navy text-white hover:bg-navy-light"
                    disabled={isPending}
                    data-ocid="admin.result.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 w-4 h-4" /> Upload Result
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Uploaded Results Table */}
          {uploadedResults.length > 0 && (
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-xl text-navy">
                  Uploaded This Session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table data-ocid="admin.result.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedResults.map((r, i) => (
                      <TableRow
                        key={r.rollNumber}
                        data-ocid={`admin.result.row.${i + 1}`}
                      >
                        <TableCell className="text-foreground/50">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {r.rollNumber}
                        </TableCell>
                        <TableCell>{r.marks}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              r.status === "Pass"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-600"
                            onClick={() =>
                              setUploadedResults((prev) =>
                                prev.filter((_, j) => j !== i),
                              )
                            }
                            data-ocid={`admin.result.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {uploadedResults.length === 0 && (
            <div
              className="text-center py-10 text-foreground/40"
              data-ocid="admin.result.empty_state"
            >
              No results uploaded yet in this session.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
