import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navigation() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isActiveLink = (href: string) => router.pathname === href;
  const isActiveSection = (paths: string[]) => paths.includes(router.pathname);

  const professionalPaths = ["/parcours", "/investissements"];
  const sportPaths = ["/palmares", "/performances", "/materiel"];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-foreground/20 bg-background backdrop-blur-md shadow-sm">
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
                  isActiveLink("/") ? "text-accent" : "text-foreground"
                )}
                onClick={() => setOpenSection(null)}
              >
                Accueil
              </Link>

              <button
                onClick={() => toggleSection("professional")}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-pointer",
                  isActiveSection(professionalPaths) || openSection === "professional" ? "text-accent" : "text-foreground"
                )}
              >
                Parcours Professionnel
              </button>

              <button
                onClick={() => toggleSection("sport")}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-pointer",
                  isActiveSection(sportPaths) || openSection === "sport" ? "text-accent" : "text-foreground"
                )}
              >
                Parcours Sportif
              </button>

              <Link
                href="/vision"
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                  isActiveLink("/vision") ? "text-accent" : "text-foreground"
                )}
                onClick={() => setOpenSection(null)}
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
            maxHeight: openSection ? "80px" : "0px",
            opacity: openSection ? 1 : 0,
          }}
        >
          <div className="border-t border-foreground/10 py-4">
            {openSection === "professional" && (
              <div className="flex gap-8 justify-center">
                <Link
                  href="/parcours"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/parcours") ? "text-accent" : "text-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Parcours
                </Link>
                <Link
                  href="/investissements"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/investissements") ? "text-accent" : "text-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Investissements
                </Link>
              </div>
            )}

            {openSection === "sport" && (
              <div className="flex gap-8 justify-center">
                <Link
                  href="/palmares"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/palmares") ? "text-accent" : "text-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Palmarès
                </Link>
                <Link
                  href="/performances"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/performances") ? "text-accent" : "text-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Performances diverses
                </Link>
                <Link
                  href="/materiel"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/materiel") ? "text-accent" : "text-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
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