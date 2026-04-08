import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Medal, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Palmares() {
  const teamEvents = [
    { year: "2013", event: "Coupe du Monde", location: "Shanghai (CHN)" },
    { year: "2013", event: "Grand Prix Européen", location: "Riom (FRA)" },
    { year: "2011", event: "Universiade", location: "Shenzhen (CHN)" },
    { year: "2009", event: "Coupe du Monde", location: "Shanghai (CHN)" },
    { year: "2009", event: "Championnats du Monde", location: "Ulsan (KOR)", medal: "Argent" },
    { year: "2008", event: "Championnats d'Europe", location: "Vittel (FRA)" },
    { year: "2007", event: "Coupe du Monde", location: "Ulsan (KOR)" },
    { year: "2005", event: "Championnats d'Europe Jeunes", location: "Silkeborg (DEN)" },
  ];

  const indEvents = [
    { year: "2013", event: "Grand Prix Européen", location: "Riom (FRA)" },
    { year: "2011", event: "Grand Prix Européen", location: "Antalya (TUR)" },
    { year: "2009", event: "Coupe du Monde", location: "Antalya (TUR)" },
    { year: "2007", event: "Coupe du Monde", location: "Varese (ITA)" },
    { year: "2006", event: "Championnats d'Europe Jeunes en salle", location: "Jaen (ESP)" },
    { year: "2005", event: "Coupe d'Europe Junior", location: "Cles (ITA)" },
  ];

  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Palmarès Sportif | Thomas Aubert</title>
        <meta name="description" content="Palmarès et médailles de Thomas Aubert, équipe de France et de Suisse de tir à l'arc." />
      </Head>

      {/* Header Section */}
      <section className="py-20 border-b border-white/5">
        <div className="container">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-accent"></span>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">2005 &mdash; 2014</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            Palmarès <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">Sportif.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Membre de l'équipe de France de 2005 à 2014, puis membre de l'équipe de Suisse en 2015-2016 et 2025. Une décennie d'exigence au plus haut niveau mondial.
          </p>
        </div>
      </section>

      {/* Highlight Medals */}
      <section className="py-20 bg-secondary/20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-accent/20 p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-700"></div>
              <Medal className="w-12 h-12 text-accent mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-heading font-bold uppercase mb-2">Vice-Champion du Monde</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Par équipe &mdash; Ulsan (KOR) 2009</p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Médaille d'argent par équipe avec la France lors des Championnats du Monde de tir à l'arc. L'aboutissement de milliers d'heures de préparation sans rien laisser au hasard.
              </p>
            </div>
            
            <div className="bg-background border border-white/5 p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <Medal className="w-12 h-12 text-muted-foreground mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-heading font-bold uppercase mb-2">Médaille d'Argent</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Ministère Jeunesse & Sports</p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Distinction honorifique décernée en 2009 pour l'engagement et les résultats au sein du mouvement sportif français.
              </p>
            </div>

            <div className="bg-background border border-white/5 p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
              <Medal className="w-12 h-12 text-muted-foreground mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-heading font-bold uppercase mb-2">Médaille de Bronze</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Ministère Jeunesse & Sports</p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Distinction honorifique décernée en 2007, marquant les premiers succès internationaux majeurs en catégorie jeune.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 border-y border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter">
                Coupe du Monde <br />
                <span className="text-accent">Boé 2008.</span>
              </h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                Images d'archives lors de la Coupe du Monde de tir à l'arc à Boé en France, une étape clé dans le parcours international.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative aspect-square w-full border border-white/10 overflow-hidden">
                    <Image src="/IMG_0373.JPG" alt="Match contre Sky Kim (AUS)" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Match vs Sky Kim (AUS)</p>
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square w-full border border-white/10 overflow-hidden">
                    <Image src="/IMG_0723.JPG" alt="Match par équipe France-Italie" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Équipe France-Italie</p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[3/4] w-full border border-white/10">
              <Image src="/IMG_5604.JPG" alt="Thomas Aubert en action" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 bg-background/90 backdrop-blur-sm p-6 border-t border-r border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">La concentration absolue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Lists */}
      <section className="py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Team */}
            <div>
              <div className="flex items-center gap-4 mb-10 pb-4 border-b border-white/10">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-heading font-bold uppercase tracking-widest">Compétitions par Équipe</h3>
              </div>
              <div className="space-y-6">
                {teamEvents.map((evt, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <span className="font-heading text-xl font-bold text-white/30 group-hover:text-accent transition-colors">{evt.year}</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-wider">{evt.event}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{evt.location}</p>
                      </div>
                    </div>
                    {evt.medal && (
                      <span className="text-xs font-bold uppercase tracking-widest text-background bg-accent px-3 py-1">{evt.medal}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Individual */}
            <div>
              <div className="flex items-center gap-4 mb-10 pb-4 border-b border-white/10">
                <Target className="w-6 h-6 text-white/50" />
                <h3 className="text-2xl font-heading font-bold uppercase tracking-widest">Compétitions Individuelles</h3>
              </div>
              <div className="space-y-6">
                {indEvents.map((evt, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <span className="font-heading text-xl font-bold text-white/30 group-hover:text-white transition-colors">{evt.year}</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-wider">{evt.event}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{evt.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 border-t border-white/5 bg-secondary/30 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            De la cible aux <span className="text-accent">instances dirigeantes.</span>
          </h2>
          <Button size="lg" asChild className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300">
            <Link href="/">Retour à l'expertise</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}