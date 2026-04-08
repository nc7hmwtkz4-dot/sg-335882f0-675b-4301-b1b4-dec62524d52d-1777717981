import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">THOMAS AUBERT.</h3>
          <p className="text-primary-foreground/70 text-sm max-w-xs">
            Expert en événementiel sportif international et ancien médaillé mondial de tir à l'arc.
          </p>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link href="/palmares" className="hover:text-white transition-colors">Palmarès Sportif</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>aubertthomas@me.com</li>
            <li>+41 79 664 99 27</li>
            <li className="pt-2">
              <a 
                href="https://www.linkedin.com/in/thomas-aubert-archery/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                LinkedIn Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
        &copy; {new Date().getFullYear()} Thomas Aubert. Tous droits réservés.
      </div>
    </footer>
  );
}