import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
});

const signupSchema = loginSchema.extend({
  full_name: z.string().trim().min(2, "Full name required").max(100),
  admission_no: z.string().trim().min(1, "Admission number required").max(50),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Login | Mumbuni Boys Senior School";
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate(isAdmin ? "/admin" : "/portal", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Welcome back!");
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
      full_name: fd.get("full_name"),
      admission_no: fd.get("admission_no"),
    });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
        data: { full_name: parsed.data.full_name, admission_no: parsed.data.admission_no },
      },
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Account created. Awaiting admin approval to view results.");
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="w-full max-w-md mx-4 shadow-strong">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-3xl text-primary-deep">Student & Admin Portal</CardTitle>
          <CardDescription>Sign in to view results or manage the website</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Student Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div><Label htmlFor="le">Email</Label><Input id="le" name="email" type="email" required /></div>
                <div><Label htmlFor="lp">Password</Label><Input id="lp" name="password" type="password" required /></div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />} Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div><Label htmlFor="sn">Full Name</Label><Input id="sn" name="full_name" required /></div>
                <div><Label htmlFor="sa">Admission Number</Label><Input id="sa" name="admission_no" required placeholder="e.g. SVG/2024/001" /></div>
                <div><Label htmlFor="se">Email</Label><Input id="se" name="email" type="email" required /></div>
                <div><Label htmlFor="sp">Password</Label><Input id="sp" name="password" type="password" required minLength={6} /></div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />} Create Account
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Your account must be approved by the school admin before you can view results.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-center mt-6 text-muted-foreground">
            <Link to="/" className="hover:text-primary">← Back to website</Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Auth;
