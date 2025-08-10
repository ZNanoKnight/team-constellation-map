import { useMemo, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import Starfield from "@/components/Starfield";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trainings, teams } from "@/data/galaxy";
import { usePageSEO } from "@/hooks/use-seo";

const TrainingPage = () => {
  usePageSEO({
    title: "Training Star Chart — Galaxy Knowledge",
    description: "Browse upcoming trainings, filter by host team and eligibility.",
  });

  const [host, setHost] = useState<string>("all");
  const [eligibility, setEligibility] = useState<string>("all");
  const hostOptions = useMemo(() => [{ slug: "all", name: "All Teams" }, ...teams.map((t) => ({ slug: t.slug, name: t.name }))], []);

  const filtered = trainings.filter((t) => (host === "all" || t.host === host) && (eligibility === "all" || t.eligibility === eligibility));
  const selectedDates = filtered.map((t) => new Date(t.date));

  return (
    <div className="min-h-screen relative">
      <SiteHeader />
      <Starfield />
      <main className="container mx-auto py-10">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Training Star Chart</h1>
          <p className="text-muted-foreground mt-2">Upcoming sessions across the galaxy</p>
        </header>

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <Card className="card-surface">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm mb-1">Host Team</div>
                <Select value={host} onValueChange={setHost}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {hostOptions.map((h) => (
                      <SelectItem key={h.slug} value={h.slug}>{h.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm mb-1">Eligibility</div>
                <Select value={eligibility} onValueChange={setEligibility}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select eligibility" />
                  </SelectTrigger>
                  <SelectContent>
                    {['all','All','Managers','Engineers','New Hires'].map((e) => (
                      <SelectItem key={e} value={e}>{e === 'all' ? 'All' : e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="multiple" selected={selectedDates} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card className="card-surface">
              <CardHeader>
                <CardTitle>Upcoming Trainings</CardTitle>
              </CardHeader>
              <CardContent>
                {filtered.length ? (
                  <ul className="space-y-3">
                    {filtered.map((t) => (
                      <li key={t.id} className="rounded-md border p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(t.date).toLocaleDateString()} • {teams.find((h) => h.slug === t.host)?.name} • {t.eligibility}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No trainings match the filters.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainingPage;
