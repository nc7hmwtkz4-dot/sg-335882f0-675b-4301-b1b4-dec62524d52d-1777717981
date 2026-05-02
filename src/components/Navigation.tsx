import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navigation() {
  const router = useRouter();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const isActiveLink = (href: string) => router.pathname === href;
  const isActiveSection = (paths: string[]) => paths.includes(router.pathname);

  const professionalPaths = ["/parcours", "/investissements"];
  const sportPaths = ["/palmares", "/performances", "/materiel"];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-extrabold tracking-widest text-foreground uppercase">
            THOMAS<span className="text-accent">.</span>
          </Link>
          
          <nav className="hidden md:flex gap-10 items-center">
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                  isActiveLink("/") ? "text-accent" : "text-muted-foreground"
                )}
              >
                Accueil
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setHoveredSection("professional")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-default",
                    isActiveSection(professionalPaths) || hoveredSection === "professional" ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Parcours Professionnel
                </span>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setHoveredSection("sport")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-default",
                    isActiveSection(sportPaths) || hoveredSection === "sport" ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Parcours Sportif
                </span>
              </div>

              <Link
                href="/vision"
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                  isActiveLink("/vision") ? "text-accent" : "text-muted-foreground"
                )}
              >
                Vision
              </Link>
            </div>

            <Button asChild className="rounded-none px-8 h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-bold tracking-wider text-xs uppercase">
              <Link href="#contact">Contact</Link>
            </Button>
          </nav>
        </div>

        {/* Submenu row */}
        <div
          className="hidden md:block overflow-hidden transition-all duration-300"
          style={{
            maxHeight: hoveredSection ? "60px" : "0px",
            opacity: hoveredSection ? 1 : 0,
          }}
        >
          <div className="border-t border-white/5 py-4">
            {hoveredSection === "professional" && (
              <div
                className="flex gap-8 justify-center"
                onMouseEnter={() => setHoveredSection("professional")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <Link
                  href="/parcours"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/parcours") ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Parcours
                </Link>
                <Link
                  href="/investissements"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/investissements") ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Investissements
                </Link>
              </div>
            )}

            {hoveredSection === "sport" && (
              <div
                className="flex gap-8 justify-center"
                onMouseEnter={() => setHoveredSection("sport")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <Link
                  href="/palmares"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/palmares") ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Palmarès
                </Link>
                <Link
                  href="/performances"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/performances") ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Performances diverses
                </Link>
                <Link
                  href="/materiel"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/materiel") ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Mon Matériel
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}