import Head from "next/head";
import Link from "next/link";
import { TrendingUp, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Investissements() {
  const companies = [
    "LA BELLE VIE",
    "PONY",
    "OVERSEED",
    "BLAST. ROUND 2",
    "KEEWE ROUND 2",
    "ZIWIG",
    "OPTEE",
    "YUMGO",
    "FINOVOX",
    "YC SPRING 25",
    "MINT BIKES ROUND 2",
    "AUUM",
    "ONEFLASH",
    "CHIPIRON",
    "NOOTA",
    "TOMORROW BIO",
    "HEXANA",
    "MINDSTATE DESIGN LABS",
    "FEELS ROUND 2",
    "PLAYRUO",
    "LATTICE MEDICAL",
    "YC SUMMER 25",
    "AVIWELL",
    "ONE BIOSCIENCES",
    "DEFACTO",
    "U-SPACE",
    "BLAST. ROUND 3",
    "YUNO",
    "THE SANCTUARY GROUP",
    "YC SPRING 26",
    "ASTRAL",
    "AURA AERO",
    "PONY - ROUND 2",
    "HEXANA - TRANCHE 2",
    "UNIVITY",
    "YC WINTER 26",
    "WHITELAB GENOMICS",
    "CEMENTIC",
    "YC FALL 25"
  ];

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
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h3 className="text-3xl font-heading font-extrabold uppercase tracking-tighter">Portefeuille</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {companies.map((company, idx) => (
                <div 
                  key={idx} 
                  className="bg-background border border-white/10 p-6 hover:border-accent/50 transition-colors duration-300 group"
                >
                  <p className="font-heading font-bold text-sm tracking-wider uppercase group-hover:text-accent transition-colors">
                    {company}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground font-light italic text-center max-w-2xl mx-auto pt-12">
              Portfolio actif via Blast Club (février 2024 — présent). Les secteurs d'activité et liens vers les entreprises seront ajoutés prochainement.
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