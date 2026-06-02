import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "assistant" | "visitor";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hello, I am Mumbuni Boys Senior School's Assistant. How can I help you today?",
  },
];

const getAssistantReply = (message: string) => {
  const text = message.toLowerCase();

  if (text.includes("admission") || text.includes("join") || text.includes("apply")) {
    return "For admissions, please share the learner's name, class level, and guardian contact. You can also visit the Admissions page for more details.";
  }

  if (text.includes("fee") || text.includes("fees") || text.includes("payment")) {
    return "For fee details, please contact the school office with the student's class and admission number so they can give the correct information.";
  }

  if (text.includes("contact") || text.includes("phone") || text.includes("email")) {
    return "You can reach the school through the Contact page. Share your question here too, and I will guide you to the right office.";
  }

  if (text.includes("teacher") || text.includes("staff")) {
    return "For teacher or staff matters, please include the department or staff name if known, and the school office can direct your message.";
  }

  if (text.includes("portal") || text.includes("login") || text.includes("password")) {
    return "For portal help, confirm whether you are a student, teacher, or admin, then check that your login details are correct.";
  }

  return "Thank you for your message. Please leave the details of your enquiry, and the school team will assist you as soon as possible.";
};

export const LiveSupportChat = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [isTyping, setIsTyping] = useState(false);
  const replyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((current) => [
      ...current,
      { role: "visitor", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    const reply = getAssistantReply(trimmed);
    const typingDelay = Math.min(1800, Math.max(900, reply.length * 12));

    replyTimer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
      setIsTyping(false);
      replyTimer.current = null;
    }, typingDelay);
  };

  return (
    <div className="fixed bottom-6 right-4 z-50 sm:right-6">
      {open && (
        <section className="mb-3 ml-auto w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border border-border bg-background shadow-strong animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Mumbuni Boys Senior School's Assistant</p>
                <p className="text-xs text-primary-foreground/80">Live support</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close live support chat"
              onClick={() => setOpen(false)}
              className="h-8 w-8 shrink-0 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </header>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === "visitor"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-white text-foreground"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[82%] items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm text-muted-foreground">
                  <span>Assistant is typing</span>
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border bg-background p-3">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message"
              aria-label="Type your message to live support"
              className="h-10"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" aria-label="Send message" className="h-10 w-10 shrink-0" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      )}

      <Button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open live support chat"
        className="h-12 rounded-full bg-primary px-4 shadow-strong hover:bg-primary-deep"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="ml-2 hidden text-sm font-semibold sm:inline">Live Support</span>
      </Button>
    </div>
  );
};
