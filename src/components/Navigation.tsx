import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/palmares", label: "Palmarès Sportif" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter text-primary">
          THOMAS AUBERT.
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                router.pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="rounded-none px-6">
            <Link href="#contact">Me contacter</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}