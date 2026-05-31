import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { invalidateContent } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Save, Trash2, Upload, Check, X, Image as ImageIcon } from "lucide-react";

// Editable content schema — every page section the admin can edit
const CONTENT_SECTIONS: Record<string, { label: string; sections: { key: string; label: string; type: "text" | "textarea" }[] }> = {
  home: {
    label: "Home Page",
    sections: [
      { key: "hero.title", label: "Hero Title", type: "text" },
      { key: "hero.subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "hero.cta", label: "Hero CTA Text", type: "text" },
      { key: "intro.heading", label: "Intro Heading", type: "text" },
      { key: "intro.body", label: "Intro Paragraph", type: "textarea" },
      { key: "stats.students", label: "Stat: Students", type: "text" },
      { key: "stats.teachers", label: "Stat: Teachers", type: "text" },
      { key: "stats.streams", label: "Stat: Streams", type: "text" },
      { key: "stats.alumni", label: "Stat: Alumni", type: "text" },
      { key: "principal.message", label: "Principal's Message", type: "textarea" },
    ],
  },
  about: {
    label: "About Page",
    sections: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "history", label: "History", type: "textarea" },
      { key: "mission", label: "Mission", type: "textarea" },
      { key: "vision", label: "Vision", type: "textarea" },
      { key: "motto", label: "Motto", type: "text" },
    ],
  },
  admissions: {
    label: "Admissions Page",
    sections: [
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "requirements", label: "Requirements", type: "textarea" },
      { key: "fees", label: "Fees Info", type: "textarea" },
    ],
  },
  contact: {
    label: "Contact Info",
    sections: [
      { key: "phone1", label: "Phone 1", type: "text" },
      { key: "phone2", label: "Phone 2", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "facebook", label: "Facebook URL", type: "text" },
    ],
  },
};

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  useEffect(() => { document.title = "Admin Dashboard | Mumbuni Boys Senior School"; }, []);

  return (
    <section className="container py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-display text-3xl text-primary-deep">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Signed in as {user?.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign Out</Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="content">Site Content</TabsTrigger>
          <TabsTrigger value="media">Images & Gallery</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="results">Results Upload</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="content"><ContentEditor /></TabsContent>
        <TabsContent value="media"><MediaManager /></TabsContent>
        <TabsContent value="students"><StudentManager /></TabsContent>
        <TabsContent value="results"><ResultsManager /></TabsContent>
        <TabsContent value="admins"><AdminInvites /></TabsContent>
      </Tabs>
    </section>
  );
};

// ============== CONTENT ==============
const ContentEditor = () => {
  const [page, setPage] = useState("home");
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase.from("content_blocks").select("section,value").eq("page", page).then(({ data }) => {
      const m: Record<string, string> = {};
      (data ?? []).forEach((r: any) => { m[r.section] = r.value ?? ""; });
      setValues(m);
      setLoading(false);
    });
  }, [page]);

  const save = async (key: string) => {
    const { error } = await supabase.from("content_blocks").upsert(
      { page, section: key, value: values[key] ?? "", kind: "text" },
      { onConflict: "page,section" }
    );
    if (error) toast.error(error.message);
    else { toast.success("Saved"); invalidateContent(page); }
  };

  const def = CONTENT_SECTIONS[page];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Page Content</CardTitle>
        <CardDescription>Changes are saved per field and appear on the live website immediately.</CardDescription>
        <div className="flex flex-wrap gap-2 pt-3">
          {Object.entries(CONTENT_SECTIONS).map(([k, v]) => (
            <Button key={k} size="sm" variant={page === k ? "default" : "outline"} onClick={() => setPage(k)}>{v.label}</Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {loading ? <p>Loading…</p> : def.sections.map((s) => (
          <div key={s.key} className="space-y-2">
            <Label>{s.label}</Label>
            <div className="flex gap-2">
              {s.type === "textarea" ? (
                <Textarea rows={3} value={values[s.key] ?? ""} onChange={(e) => setValues({ ...values, [s.key]: e.target.value })} />
              ) : (
                <Input value={values[s.key] ?? ""} onChange={(e) => setValues({ ...values, [s.key]: e.target.value })} />
              )}
              <Button size="sm" onClick={() => save(s.key)}><Save className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// ============== MEDIA ==============
const MediaManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [collection, setCollection] = useState("gallery");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("media_items").select("*").eq("collection", collection).order("sort_order");
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, [collection]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${collection}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("site-media").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { error } = await supabase.from("media_items").insert({ collection, storage_path: path, alt: file.name });
      if (error) toast.error(error.message);
    }
    setUploading(false);
    e.target.value = "";
    toast.success("Uploaded");
    load();
  };

  const remove = async (item: any) => {
    if (!confirm("Delete this image?")) return;
    await supabase.storage.from("site-media").remove([item.storage_path]);
    await supabase.from("media_items").delete().eq("id", item.id);
    toast.success("Deleted");
    load();
  };

  const publicUrl = (path: string) => supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Images</CardTitle>
        <CardDescription>Upload and delete images for the gallery and hero sections.</CardDescription>
        <div className="flex gap-2 pt-3">
          {["gallery", "hero"].map((c) => (
            <Button key={c} size="sm" variant={collection === c ? "default" : "outline"} onClick={() => setCollection(c)}>
              {c[0].toUpperCase() + c.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="up" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload Image(s)"}
          </Label>
          <Input id="up" type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
        </div>
        {items.length === 0 ? (
          <p className="text-muted-foreground flex items-center gap-2"><ImageIcon className="w-4 h-4" /> No images yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((it) => (
              <div key={it.id} className="relative group rounded-lg overflow-hidden border">
                <img src={publicUrl(it.storage_path)} alt={it.alt} className="w-full h-40 object-cover" />
                <button onClick={() => remove(it)} className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-md opacity-0 group-hover:opacity-100 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ============== STUDENTS ==============
const StudentManager = () => {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const setApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("profiles").update({ approved }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success(approved ? "Approved" : "Revoked"); load(); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this student profile? (auth account is kept)")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Student Accounts</CardTitle><CardDescription>Approve students so they can view their results.</CardDescription></CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Adm No</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.full_name || "—"}</TableCell>
                <TableCell>{r.admission_no || "—"}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>
                  {r.approved ? <Badge>Approved</Badge> : <Badge variant="secondary">Pending</Badge>}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {r.approved ? (
                    <Button size="sm" variant="outline" onClick={() => setApproved(r.id, false)}><X className="w-4 h-4" /></Button>
                  ) : (
                    <Button size="sm" onClick={() => setApproved(r.id, true)}><Check className="w-4 h-4" /></Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => del(r.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No students yet</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// ============== RESULTS ==============
const parseCSV = (text: string) => {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const obj: any = {};
    headers.forEach((h, i) => { obj[h] = cells[i]; });
    return obj;
  });
};

const ResultsManager = () => {
  const [results, setResults] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("results").select("*").order("created_at", { ascending: false }).limit(200);
    setResults(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setBusy(true);
    const text = await f.text();
    try {
      const rows = parseCSV(text);
      const payload = rows.map((r) => ({
        admission_no: String(r.admission_no || r.adm_no || "").trim(),
        student_name: r.student_name || r.name || null,
        term: String(r.term || "").trim(),
        year: parseInt(r.year, 10),
        subject: String(r.subject || "").trim(),
        marks: parseFloat(r.marks),
        grade: r.grade || null,
        remarks: r.remarks || null,
      })).filter((r) => r.admission_no && r.term && r.year && r.subject && !isNaN(r.marks));

      if (!payload.length) throw new Error("No valid rows found. Required columns: admission_no, term, year, subject, marks (optional: student_name, grade, remarks)");

      const { error } = await supabase.from("results").upsert(payload, { onConflict: "admission_no,term,year,subject" });
      if (error) throw error;
      toast.success(`Uploaded ${payload.length} result rows`);
      load();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const delAll = async () => {
    if (!confirm("Delete ALL results? This cannot be undone.")) return;
    const { error } = await supabase.from("results").delete().not("id", "is", null);
    if (error) toast.error(error.message); else { toast.success("Cleared"); load(); }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Results</CardTitle>
        <CardDescription>
          Upload a CSV with columns: <code className="bg-muted px-1 rounded">admission_no, student_name, term, year, subject, marks, grade, remarks</code>.
          Existing rows for the same student/term/year/subject will be updated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Label htmlFor="csv" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Upload CSV"}
          </Label>
          <Input id="csv" type="file" accept=".csv,text/csv" className="hidden" onChange={upload} disabled={busy} />
          {results.length > 0 && <Button variant="destructive" onClick={delAll}><Trash2 className="w-4 h-4 mr-2" />Clear all</Button>}
        </div>
        <p className="text-xs text-muted-foreground mb-4">Showing latest {results.length} rows</p>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Adm</TableHead><TableHead>Name</TableHead><TableHead>Term</TableHead><TableHead>Year</TableHead><TableHead>Subject</TableHead><TableHead>Marks</TableHead><TableHead>Grade</TableHead></TableRow></TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.admission_no}</TableCell>
                  <TableCell>{r.student_name || "—"}</TableCell>
                  <TableCell>{r.term}</TableCell>
                  <TableCell>{r.year}</TableCell>
                  <TableCell>{r.subject}</TableCell>
                  <TableCell>{r.marks}</TableCell>
                  <TableCell>{r.grade || "—"}</TableCell>
                </TableRow>
              ))}
              {results.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No results uploaded yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// ============== ADMIN INVITES ==============
const AdminInvites = () => {
  const [invites, setInvites] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("admin_invites").select("*").order("created_at", { ascending: false });
    setInvites(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const invite = async () => {
    const e = email.trim().toLowerCase();
    if (!e) return;
    setBusy(true);
    const { error } = await supabase.from("admin_invites").insert({ email: e });
    setBusy(false);
    if (error) toast.error(error.message);
    else { toast.success("Invite created. They become admin upon login."); setEmail(""); load(); }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("admin_invites").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Invite removed"); load(); }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Invitations</CardTitle>
        <CardDescription>Invite a user by email. They become admin automatically the next time they sign in with that email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input placeholder="email@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={invite} disabled={busy}>Invite</Button>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {invites.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.email}</TableCell>
                <TableCell>{i.consumed_at ? <Badge>Claimed</Badge> : <Badge variant="secondary">Pending</Badge>}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(i.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Button size="sm" variant="ghost" onClick={() => remove(i.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
              </TableRow>
            ))}
            {invites.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No invites yet</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
