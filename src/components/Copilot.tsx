import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/galaxy";
import { MessageCircle, Search } from "lucide-react";

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

const Copilot = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);

  const results = useMemo(() => (query.trim() ? searchKnowledge(query) : []), [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setAsked(null);
    }
  }, [open]);

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
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask about any team’s charter or AORs…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setAsked(query);
                }}
                aria-label="Copilot question"
              />
              <Button onClick={() => setAsked(query)} variant="secondary">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {asked && (
              <div className="rounded-lg border card-surface p-4">
                {results.length ? (
                  <ul className="space-y-3">
                    {results.map((r, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <div className="text-sm text-muted-foreground">From {r.team}</div>
                        <p>{r.snippet}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No direct matches yet — try a different phrase.</p>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Preview: Answers are generated from team charters and AORs in this session. We can wire Supabase + LLM next.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Copilot;
