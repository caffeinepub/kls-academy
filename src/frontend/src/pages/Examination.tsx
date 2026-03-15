import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BookOpen,
  Clock,
  Loader2,
  LogIn,
  Monitor,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStudentLogin } from "../hooks/useQueries";

export default function Examination() {
  useEffect(() => {
    document.title = "Online Examination – KLS Academy";
  }, []);
  const { mutateAsync, isPending } = useStudentLogin();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const success = await mutateAsync({ username, password });
      if (success) {
        setLoggedIn(true);
        toast.success("Login successful!");
      } else {
        setError("Invalid username or password.");
        toast.error("Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
            Student Portal
          </Badge>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Online Examination
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Login with your student credentials to access the examination portal
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-md">
          {!loggedIn ? (
            <Card className="border-0 shadow-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-3">
                  <Monitor className="w-8 h-8 text-navy" />
                </div>
                <CardTitle className="font-display text-2xl text-navy">
                  Student Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Username</Label>
                    <Input
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      data-ocid="examination.username_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-ocid="examination.password_input"
                    />
                  </div>
                  {error && (
                    <div
                      className="flex items-center gap-2 text-destructive text-sm"
                      data-ocid="examination.error_state"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-navy text-white hover:bg-navy-light"
                    disabled={isPending}
                    data-ocid="examination.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 w-4 h-4" />
                        Login to Portal
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card
              className="border-0 shadow-card"
              data-ocid="examination.success_state"
            >
              <CardContent className="p-8 text-center">
                <Monitor className="w-16 h-16 text-navy mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Examination Portal
                </h2>
                <p className="text-foreground/70 mb-6">
                  Welcome, <strong>{username}</strong>! You are now logged in to
                  the examination portal.
                </p>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {[
                    {
                      icon: BookOpen,
                      title: "Available Exams",
                      desc: "3 exams pending",
                    },
                    {
                      icon: Clock,
                      title: "Upcoming Schedule",
                      desc: "Next: Sept 15, 2024",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary"
                    >
                      <Icon className="w-5 h-5 text-gold" />
                      <div className="text-left">
                        <p className="font-medium text-sm text-navy">{title}</p>
                        <p className="text-xs text-foreground/60">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="bg-gold text-navy-dark font-semibold"
                  onClick={() => {
                    setLoggedIn(false);
                    setUsername("");
                    setPassword("");
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
