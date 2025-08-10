import { Link, NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm transition-colors ${
    isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/60"
  }`;

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">Galaxy Knowledge</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/training" className={navLinkClass}>
            Training
          </NavLink>
          <Button asChild variant="hero" className="ml-2">
            <Link to="#copilot">Ask Copilot</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
