import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LogOut, ShieldAlert } from "lucide-react";

interface Profile { full_name: string; admission_no: string | null; approved: boolean; }
interface Result { id: string; term: string; year: number; subject: string; marks: number; grade: string | null; remarks: string | null; }

const StudentPortal = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { document.title = "My Results | Mumbuni Boys Senior School"; }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase.from("profiles").select("full_name, admission_no, approved").eq("id", user.id).maybeSingle();
      setProfile(p as any);
      if (p?.approved && p.admission_no) {
        const { data: r } = await supabase.from("results").select("*").eq("admission_no", p.admission_no).order("year", { ascending: false }).order("term");
        setResults((r as any) ?? []);
      }
      setLoading(false);
    })();
  }, [user]);

  const grouped = results.reduce<Record<string, Result[]>>((acc, r) => {
    const k = `${r.term} ${r.year}`;
    (acc[k] ||= []).push(r);
    return acc;
  }, {});

  return (
    <section className="container py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-display text-4xl text-primary-deep mb-1">Student Portal</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name || user?.email}</p>
          {profile?.admission_no && <p className="text-sm text-muted-foreground">Adm: {profile.admission_no}</p>}
        </div>
        <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
      </div>

      {loading ? <p>Loading...</p> : profile && !profile.approved ? (
        <Card className="border-accent/60 bg-accent/10">
          <CardHeader><CardTitle className="flex items-center gap-2 text-primary-deep"><ShieldAlert className="w-5 h-5 text-accent" />Pending Approval</CardTitle></CardHeader>
          <CardContent><p>Your account is awaiting approval from the school administrator. You'll be able to view your results once approved.</p></CardContent>
        </Card>
      ) : results.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No results uploaded yet. Check back later.</CardContent></Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([k, items]) => (
            <Card key={k}>
              <CardHeader><CardTitle>{k}</CardTitle><CardDescription>{items.length} subjects</CardDescription></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Marks</TableHead><TableHead>Grade</TableHead><TableHead>Remarks</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {items.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.subject}</TableCell>
                        <TableCell>{r.marks}</TableCell>
                        <TableCell>{r.grade || "-"}</TableCell>
                        <TableCell className="text-muted-foreground">{r.remarks || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentPortal;
