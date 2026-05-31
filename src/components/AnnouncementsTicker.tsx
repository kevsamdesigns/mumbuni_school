import { Megaphone } from "lucide-react";

const announcements = [
  "Admissions are open for Mumbuni Boys Senior School.",
  "Parents are encouraged to contact the school office for current fee and reporting information.",
  "Academic mentorship and revision programmes continue throughout the term.",
  "Sports and clubs remain active as part of holistic student development.",
  "For enquiries, call 0727 642 932 or email mumbuniboys32@gmail.com.",
];

export const AnnouncementsTicker = () => (
  <div className="bg-secondary text-secondary-foreground border-y border-secondary/50 overflow-hidden">
    <div className="container flex items-center gap-4 py-2">
      <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest shrink-0">
        <Megaphone className="w-4 h-4" /> News
      </span>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
          {[...announcements, ...announcements].map((a, i) => (
            <span key={i} className="text-sm font-medium">{a}</span>
          ))}
        </div>
      </div>
    </div>
    <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
  </div>
);
