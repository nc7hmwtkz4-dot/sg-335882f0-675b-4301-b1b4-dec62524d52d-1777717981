import Head from "next/head";
import Link from "next/link";
import { TrendingUp, Building2, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Investissements() {
  // Liste des entreprises dont la tâche est "done" - METTRE À JOUR MANUELLEMENT
  const publishedCompanies = ["FINOVOX"];

  const companies = [
    { name: "FINOVOX", sector: "Deeptech & IA", website: "https://www.finovox.com/en", description: "IA et computer vision pour détecter les falsifications documentaires" },
    { name: "LA BELLE VIE", sector: "", website: "", description: "" },
    { name: "PONY", sector: "", website: "", description: "" },
    { name: "OVERSEED", sector: "", website: "", description: "" },
    { name: "BLAST. ROUND 2", sector: "", website: "", description: "" },
    { name: "KEEWE ROUND 2", sector: "", website: "", description: "" },
    { name: "ZIWIG", sector: "", website: "", description: "" },
    { name: "OPTEE", sector: "", website: "", description: "" },
    { name: "YUMGO", sector: "", website: "", description: "" },
    { name: "YC SPRING 25", sector: "", website: "", description: "" },
    { name: "MINT BIKES ROUND 2", sector: "", website: "", description: "" },
    { name: "AUUM", sector: "", website: "", description: "" },
    { name: "ONEFLASH", sector: "", website: "", description: "" },
    { name: "CHIPIRON", sector: "", website: "", description: "" },
    { name: "NOOTA", sector: "", website: "", description: "" },
    { name: "TOMORROW BIO", sector: "", website: "", description: "" },
    { name: "HEXANA", sector: "", website: "", description: "" },
    { name: "MINDSTATE DESIGN LABS", sector: "", website: "", description: "" },
    { name: "FEELS ROUND 2", sector: "", website: "", description: "" },
    { name: "PLAYRUO", sector: "", website: "", description: "" },
    { name: "LATTICE MEDICAL", sector: "", website: "", description: "" },
    { name: "YC SUMMER 25", sector: "", website: "", description: "" },
    { name: "AVIWELL", sector: "", website: "", description: "" },
    { name: "ONE BIOSCIENCES", sector: "", website: "", description: "" },
    { name: "DEFACTO", sector: "", website: "", description: "" },
    { name: "U-SPACE", sector: "", website: "", description: "" },
    { name: "BLAST. ROUND 3", sector: "", website: "", description: "" },
    { name: "YUNO", sector: "", website: "", description: "" },
    { name: "THE SANCTUARY GROUP", sector: "", website: "", description: "" },
    { name: "YC SPRING 26", sector: "", website: "", description: "" },
    { name: "ASTRAL", sector: "", website: "", description: "" },
    { name: "AURA AERO", sector: "", website: "", description: "" },
    { name: "PONY - ROUND 2", sector: "", website: "", description: "" },
    { name: "HEXANA - TRANCHE 2", sector: "", website: "", description: "" },
    { name: "UNIVITY", sector: "", website: "", description: "" },
    { name: "YC WINTER 26", sector: "", website: "", description: "" },
    { name: "WHITELAB GENOMICS", sector: "", website: "", description: "" },
    { name: "CEMENTIC", sector: "", website: "", description: "" },
    { name: "YC FALL 25", sector: "", website: "", description: "" }
  ];

  // Filtrer pour n'afficher que les entreprises publiées
  const displayedCompanies = companies.filter(c => publishedCompanies.includes(c.name));

  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Investissements | Thomas Aubert</title>
        <meta name="description" content="Portfolio d'investissements de Thomas Aubert via Blast Club." />
      </Head>

      {/* Header Section */}
      <section className="py-20 border-b border-white/5">
        <div className="container">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-accent"></span>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Business Angels</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            Investissements <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">Stratégiques.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Membre actionnaire du Blast Club depuis février 2024. Un engagement concret dans l'écosystème startup européen à travers un portefeuille diversifié de près de 40 entreprises innovantes.
          </p>
        </div>
      </section>

      {/* Blast Club Section */}
      <section className="py-32 border-b border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-8">
              <Building2 className="w-12 h-12 text-accent/50" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter">
                Blast Club
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  Membre et actionnaire depuis février 2024, j'investis dans des startups européennes à fort potentiel via le Blast Club, un réseau de business angels structuré et professionnel.
                </p>
                <p>
                  Mon approche d'investissement reflète mes valeurs : rigueur dans l'analyse, patience dans l'exécution, et engagement à long terme auprès d'entrepreneurs ambitieux.
                </p>
              </div>
              <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-4xl font-heading font-extrabold text-accent mb-2">~40</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Entreprises</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-extrabold text-white mb-2">2024</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Depuis</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 border border-white/10 p-12">
              <Sparkles className="w-10 h-10 text-accent/50 mb-8" strokeWidth={1} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-wider mb-6">Secteurs d'investissement</h3>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                  <span>Deeptech & Biotech</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                  <span>Mobilité & Transport</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                  <span>Technologies Durables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                  <span>SaaS & Productivité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                  <span>Santé & Well-being</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="space-y-12">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-accent" />
                <h3 className="text-3xl font-heading font-extrabold uppercase tracking-tighter">Portefeuille</h3>
              </div>
              <p className="text-sm text-muted-foreground font-light">
                <span className="text-accent font-bold">{publishedCompanies.length}</span>/{companies.length} entreprises publiées
              </p>
            </div>

            {displayedCompanies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedCompanies.map((company, idx) => (
                  <div 
                    key={idx} 
                    className="bg-background border border-white/10 p-6 hover:border-accent/50 transition-colors duration-300 group relative"
                  >
                    <p className="font-heading font-bold text-sm tracking-wider uppercase group-hover:text-accent transition-colors mb-2">
                      {company.name}
                    </p>
                    {company.sector && (
                      <p className="text-xs text-muted-foreground font-light">
                        {company.sector}
                      </p>
                    )}
                    {company.website && (
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/10 border border-white/10 p-12 text-center">
                <p className="text-muted-foreground font-light">
                  Détails du portefeuille en cours de publication.
                </p>
              </div>
            )}

            {publishedCompanies.includes("FINOVOX") && (
              <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-32 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="/finovox-logo.svg" 
                      alt="Finovox Logo" 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-accent/70 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>FinTech</span>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3">FINOVOX</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Plateforme de gestion financière intelligente pour entrepreneurs et PME.
                </p>
              </div>
            )}

            <p className="text-xs text-muted-foreground font-light italic text-center max-w-2xl mx-auto pt-12">
              Portfolio actif via Blast Club (février 2024 — présent). Les détails des entreprises sont publiés progressivement.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 border-t border-white/5 bg-secondary/30 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            De l'athlète au <span className="text-accent">business angel.</span>
          </h2>
          <Button size="lg" asChild className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300">
            <Link href="/parcours">Découvrir mon parcours</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}