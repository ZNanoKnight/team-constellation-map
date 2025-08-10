import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import Starfield from "@/components/Starfield";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { teams } from "@/data/galaxy";
import { usePageSEO } from "@/hooks/use-seo";

const Bay = ({ title }: { title: string }) => {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <Card className="card-surface">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            multiple
            onChange={(e) => {
              const names = Array.from(e.target.files || []).map((f) => f.name);
              setFiles((prev) => [...prev, ...names]);
            }}
            aria-label={`Upload ${title}`}
          />
          <Button variant="secondary">Dock</Button>
        </div>
        {files.length ? (
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            {files.map((n, i) => (
              <li key={`${n}-${i}`}>{n}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No files docked yet (local preview).</p>
        )}
      </CardContent>
    </Card>
  );
};

const TeamPage = () => {
  const { slug } = useParams();
  const team = useMemo(() => teams.find((t) => t.slug === slug), [slug]);

  usePageSEO({
    title: team ? `${team.name} — Galaxy Knowledge` : "Team — Galaxy Knowledge",
    description: team ? `${team.name} planet: charter, AORs, and document docking bays.` : "Team details in Galaxy Knowledge.",
  });

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="card-surface p-8 text-center">
          <CardTitle>Team not found</CardTitle>
          <Link to="/" className="mt-4 inline-block">Go back</Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <SiteHeader />
      <Starfield />
      <main className="container mx-auto py-10">
        <article className="space-y-8">
          <header className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-primary/40 shadow-md" />
            <h1 className="mt-4 text-3xl font-bold">{team.name}</h1>
          </header>

          <section aria-labelledby="charter">
            <h2 id="charter" className="text-xl font-semibold">Charter</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {team.charter}
            </p>
          </section>

          <Separator />

          <section aria-labelledby="aors">
            <h2 id="aors" className="text-xl font-semibold">Day-to-Day AORs</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {team.aors.map((r, i) => (
                <li key={i} className="rounded-md border card-surface p-3 leading-relaxed">
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section aria-labelledby="docs">
            <h2 id="docs" className="text-xl font-semibold">Document Docking Bays</h2>
            <p className="text-sm text-muted-foreground mt-1">Local-only preview. Next: connect Supabase storage.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Bay title="PowerPoints" />
              <Bay title="Excels" />
              <Bay title="Memos" />
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default TeamPage;
