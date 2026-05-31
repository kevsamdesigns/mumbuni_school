import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import Transport from "./pages/Transport";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Admissions from "./pages/Admissions";
import Rules from "./pages/Rules";
import News from "./pages/News";
import Auth from "./pages/Auth";
import StudentPortal from "./pages/StudentPortal";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/news" element={<News />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/portal" element={<ProtectedRoute requireStudent><StudentPortal /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
