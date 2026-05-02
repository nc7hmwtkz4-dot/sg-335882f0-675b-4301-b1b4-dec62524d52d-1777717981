import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const isAuthenticated = !!user;
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isActiveLink = (href: string) => router.pathname === href;
  const isActiveSection = (paths: string[]) => paths.includes(router.pathname);

  const professionalPaths = ["/parcours", "/investissements"];
  const sportPaths = ["/palmares", "/performances", "/materiel"];

  const dashboardMenuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Import Données", href: "/import" },
  ];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

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
                onClick={() => setOpenSection(null)}
              >
                Accueil
              </Link>

              <button
                onClick={() => toggleSection("professional")}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-pointer",
                  isActiveSection(professionalPaths) || openSection === "professional" ? "text-accent" : "text-muted-foreground"
                )}
              >
                Parcours Professionnel
              </button>

              <button
                onClick={() => toggleSection("sport")}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent cursor-pointer",
                  isActiveSection(sportPaths) || openSection === "sport" ? "text-accent" : "text-muted-foreground"
                )}
              >
                Parcours Sportif
              </button>

              <Link
                href="/vision"
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                  isActiveLink("/vision") ? "text-accent" : "text-muted-foreground"
                )}
                onClick={() => setOpenSection(null)}
              >
                Vision
              </Link>

              {!loading && isAuthenticated && (
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/dashboard") ? "text-accent" : "text-muted-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Mon Dashboard
                </Link>
              )}
            </div>

            {!loading && isAuthenticated ? (
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="rounded-none px-8 h-12 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-bold tracking-wider text-xs uppercase"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <Button asChild className="rounded-none px-8 h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-bold tracking-wider text-xs uppercase">
                <Link href="#contact">Contact</Link>
              </Button>
            )}
          </nav>
        </div>

        {/* Submenu row */}
        <div
          className="hidden md:block overflow-hidden transition-all duration-300"
          style={{
            maxHeight: openSection ? "60px" : "0px",
            opacity: openSection ? 1 : 0,
          }}
        >
          <div className="border-t border-white/5 py-4">
            {openSection === "professional" && (
              <div className="flex gap-8 justify-center">
                <Link
                  href="/parcours"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/parcours") ? "text-accent" : "text-muted-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Parcours
                </Link>
                <Link
                  href="/investissements"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/investissements") ? "text-accent" : "text-muted-foreground"
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
                    isActiveLink("/palmares") ? "text-accent" : "text-muted-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Palmarès
                </Link>
                <Link
                  href="/performances"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/performances") ? "text-accent" : "text-muted-foreground"
                  )}
                  onClick={() => setOpenSection(null)}
                >
                  Performances diverses
                </Link>
                <Link
                  href="/materiel"
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                    isActiveLink("/materiel") ? "text-accent" : "text-muted-foreground"
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