import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/254727642932?text=Hello%20Mumbuni%20Boys%20Senior%20School%2C%20I%20would%20like%20to%20enquire%20about..."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-strong hover:scale-105 transition-all animate-fade-in"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline text-sm font-semibold">Chat on WhatsApp</span>
  </a>
);
