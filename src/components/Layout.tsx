import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveSupportChat } from "@/components/LiveSupportChat";

export const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1 pt-[72px] sm:pt-[96px] md:pt-[132px]">
      <Outlet />
    </main>
    <Footer />
    <LiveSupportChat />
  </div>
);
