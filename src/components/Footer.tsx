import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <h3 className="font-heading text-3xl font-extrabold mb-6 uppercase tracking-widest">THOMAS AUBERT<span className="text-accent">.</span></h3>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Architecte de performances internationales. Ancien médaillé mondial de tir à l'arc, expert en stratégie événementielle et marketing sportif.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xs font-bold mb-6 text-muted-foreground uppercase tracking-widest">Menu</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Index</Link></li>
              <li><Link href="/palmares" className="hover:text-accent transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Palmarès Sportif</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xs font-bold mb-6 text-muted-foreground uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="mailto:aubertthomas@me.com" className="hover:text-accent transition-colors">aubertthomas@me.com</a></li>
              <li><a href="tel:+41796649927" className="hover:text-accent transition-colors">+41 79 664 99 27</a></li>
              <li className="pt-4">
                <a 
                  href="https://www.linkedin.com/in/thomas-aubert-archery/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground font-medium uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Thomas Aubert.</p>
          <p className="mt-4 md:mt-0">Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}