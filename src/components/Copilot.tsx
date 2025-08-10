import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/galaxy";
import { MessageCircle, Send } from "lucide-react";

function searchKnowledge(query: string) {
  const q = query.toLowerCase();
  const corpus = teams.map((t) => ({
    team: t.name,
    text: `${t.name}. Charter: ${t.charter} AORs: ${t.aors.join("; ")}`,
  }));
  const results = corpus
    .map((c) => ({
      team: c.team,
      score: c.text.toLowerCase().includes(q) ? 1 : 0,
      snippet: c.text.slice(0, 240) + (c.text.length > 240 ? "…" : ""),
    }))
    .filter((r) => r.score > 0);
  return results;
}

function generateAssistantReply(query: string) {
  const results = searchKnowledge(query);
  if (!results.length) {
    return "I didn't find a direct match in the current charters or AORs. Try referencing a team name or an area of responsibility. You can also ask things like \"Who owns payments risk?\" or \"Show me Retail Ops AORs.\"";
  }
  const top = results.slice(0, 3);
  const bullets = top.map((r) => `• ${r.team}: ${r.snippet}`).join("\n");
  return `Here’s what I found related to "${query}" across team charters and AORs:\n${bullets}\n\nWant me to draft a summary or point you to the right team?`;
}

const Copilot = () => {
  const [open, setOpen] = useState(false);
  const initialMessages = [
    {
      role: "assistant" as const,
      content:
        'Hi! I’ve indexed team charters and AORs in this session. Ask me anything — e.g., "Who owns store operations?" or "What’s the Payments team’s charter?"',
    },
  ];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>(initialMessages);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      setInput("");
      setMessages(initialMessages);
    }
  }, [open]);

  // Open dialog when URL hash is #copilot (triggered by header button)
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#copilot") setOpen(true);
    };
    openFromHash();
    const onHashChange = () => openFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;
    const user = { role: "user" as const, content: q };
    const assistant = { role: "assistant" as const, content: generateAssistantReply(q) };
    setMessages((prev) => [...prev, user, assistant]);
    setInput("");
  };

  return (
    <div id="copilot">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            aria-label="Open AI Knowledge Copilot"
            className="fixed bottom-6 right-6 shadow-lg animate-float"
            variant="hero"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Copilot
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>AI Knowledge Copilot</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div
              ref={listRef}
              className="rounded-lg border card-surface p-3 h-[360px] overflow-y-auto space-y-3"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={
                      m.role === "user"
                        ? "ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                        : "max-w-[85%] rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
                    }
                  >
                    {m.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Type your question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                aria-label="Copilot message"
                rows={2}
                className="min-h-[56px] resize-none"
              />
              <Button onClick={handleSend} variant="hero" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {["Who owns payments risk?", "Summarize Retail Ops charter.", "What are Growth team’s AORs?"].map((s) => (
                <Button key={s} size="sm" variant="secondary" onClick={() => setInput(s)}>
                  {s}
                </Button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Preview: This chat is a mock UX using indexed team charters and AORs. We can wire Supabase storage + LLM next.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Copilot;
