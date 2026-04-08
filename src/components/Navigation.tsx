import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();

  const links = [
    { href: "/", label: "Index" },
    { href: "/palmares", label: "Palmarès" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto flex h-24 items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-extrabold tracking-widest text-foreground uppercase">
          THOMAS<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                router.pathname === link.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="rounded-none px-8 h-12 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-bold tracking-wider text-xs uppercase">
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}