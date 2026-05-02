import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const router = useRouter();

  const isActiveLink = (href: string) => router.pathname === href;
  const isActiveSection = (paths: string[]) => paths.includes(router.pathname);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto flex h-24 items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-extrabold tracking-widest text-foreground uppercase">
          THOMAS<span className="text-accent">.</span>
        </Link>
        
        <nav className="hidden md:flex gap-10 items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {/* Accueil */}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                      isActiveLink("/") ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Parcours Professionnel */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent bg-transparent",
                    isActiveSection(["/parcours", "/investissements"]) ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Parcours Professionnel
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] p-2">
                    <li>
                      <Link href="/parcours" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm",
                            isActiveLink("/parcours") ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          Parcours
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/investissements" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm",
                            isActiveLink("/investissements") ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          Investissements
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Parcours Sportif */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent bg-transparent",
                    isActiveSection(["/palmares", "/performances", "/materiel"]) ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  Parcours Sportif
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[220px] p-2">
                    <li>
                      <Link href="/palmares" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm",
                            isActiveLink("/palmares") ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          Palmarès
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/performances" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm",
                            isActiveLink("/performances") ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          Performances diverses
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/materiel" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm",
                            isActiveLink("/materiel") ? "bg-accent text-accent-foreground" : ""
                          )}
                        >
                          Mon Matériel
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Vision */}
              <NavigationMenuItem>
                <Link href="/vision" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                      isActiveLink("/vision") ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    Vision
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild className="rounded-none px-8 h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-bold tracking-wider text-xs uppercase">
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}