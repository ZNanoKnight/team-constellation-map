import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import Starfield from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teams } from "@/data/galaxy";
import { usePageSEO } from "@/hooks/use-seo";

const Index = () => {
  usePageSEO({
    title: "Galaxy Knowledge — Home",
    description: "Explore team planets: charters, AORs, docs, and trainings — all within three clicks.",
  });

  return (
    <div className="min-h-screen relative">
      <SiteHeader />
      <main className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="h-80 bg-gradient-to-b from-background to-card" />
        </div>
        <Starfield />

        <section className="container mx-auto pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Samsung Org Constellation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate a sleek galaxy of team knowledge. Each planet is a team — find charters, AORs, documents, and trainings in three clicks or fewer.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild variant="hero">
              <Link to="/training">Open Training Star Chart</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="#galaxy">Explore the Galaxy</Link>
            </Button>
          </div>
        </section>

        <section id="galaxy" className="container mx-auto pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <Link key={team.slug} to={`/team/${team.slug}`} className="group">
                <Card className="card-surface transition-transform duration-300 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-primary/40 shadow-md group-hover:shadow-lg transition-shadow" />
                    <CardTitle className="text-center mt-4">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {team.charter}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
