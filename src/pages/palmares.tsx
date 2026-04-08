import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Medal, Target, Calendar, Globe2, Trophy, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Palmares() {
  const unifiedEvents = [
    { year: "2016", event: "Championnats d'Europe", location: "Nottingham (GBR)", ind: "57th", team: "5th", mixed: "-" },
    { year: "2016", event: "Grand Prix Européen", location: "Sofia (BUL)", ind: "17th", team: "9th", mixed: "5th" },
    { year: "2015", event: "Grand Prix Européen", location: "Marathon (GRE)", ind: "17th", team: "28th", mixed: "8th" },
    { year: "2013", event: "Coupe du Monde (Étape 4)", location: "Wroclaw (POL)", ind: "9th", team: "9th", mixed: "-" },
    { year: "2013", event: "Grand Prix Européen", location: "Riom (FRA)", ind: "-", team: "-", mixed: "5th" },
    { year: "2012", event: "Championnat du Monde Universitaire", location: "Cordoue (ESP)", ind: "5th", team: "6th", mixed: "6th" },
    { year: "2012", event: "Coupe du Monde (Étape 1)", location: "Shanghai (CHN)", ind: "4th", team: "-", mixed: "-" },
    { year: "2012", event: "Coupe du Monde Indoor (Finale)", location: "Las Vegas (USA)", ind: "4th", team: "-", mixed: "-" },
    { year: "2011", event: "Universiade d'Été", location: "Shenzhen (CHN)", ind: "9th", team: "-", mixed: "-" },
    { year: "2011", event: "Coupe du Monde (Étape 3)", location: "Ogden (USA)", ind: "17th", team: "5th", mixed: "-" },
    { year: "2011", event: "Coupe du Monde (Étape 2)", location: "Antalya (TUR)", ind: "8th", team: "-", mixed: "-" },
    { year: "2011", event: "Grand Prix Européen", location: "Boé (FRA)", ind: "9th", team: "4th", mixed: "-" },
    { year: "2010", event: "Championnat du Monde Universitaire", location: "Shenzhen (CHN)", ind: "9th", team: "5th", mixed: "9th" },
    { year: "2009", event: "Championnats du Monde", location: "Ulsan (KOR)", ind: "52nd", team: "2nd", teamMedal: "silver", mixed: "-" },
    { year: "2009", event: "Coupe du Monde (Étape 3)", location: "Antalya (TUR)", ind: "-", team: "5th", mixed: "-" },
    { year: "2008", event: "Coupe du Monde (Étape 4)", location: "Boé (FRA)", ind: "33rd", team: "5th", mixed: "-" },
    { year: "2008", event: "Coupe du Monde (Étape 2)", location: "Porec (CRO)", ind: "24th", team: "4th", mixed: "-" },
    { year: "2008", event: "Coupe du Monde (Étape 1)", location: "St-Domingue (DOM)", ind: "27th", team: "5th", mixed: "-" },
    { year: "2007", event: "Championnats du Monde", location: "Leipzig (GER)", ind: "101st", team: "-", mixed: "-" },
    { year: "2006", event: "Grand Prix Européen", location: "Sassari (ITA)", ind: "4th", team: "-", mixed: "-" },
  ];

  const renderRank = (rank: string, medal?: "gold" | "silver" | "bronze" | string) => {
    if (!rank || rank === "-") return <span className="text-white/20">-</span>;
    if (medal === "gold") return <div className="flex justify-center" title="Médaille d'Or"><Medal className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" /></div>;
    if (medal === "silver") return <div className="flex justify-center" title="Médaille d'Argent"><Medal className="w-6 h-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]" /></div>;
    if (medal === "bronze") return <div className="flex justify-center" title="Médaille de Bronze"><Medal className="w-6 h-6 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]" /></div>;
    
    return <span className="font-heading font-extrabold text-lg md:text-xl tracking-tighter">{rank}</span>;
  };

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

      {/* Key Stats Section */}
      <section className="py-20 bg-background border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/5">
            <div className="space-y-4 px-4">
              <Globe2 className="w-8 h-8 text-accent/50" />
              <p className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)]">+60</p>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Compétitions<br/>Internationales</p>
            </div>
            <div className="space-y-4 px-4">
              <Calendar className="w-8 h-8 text-accent/50" />
              <p className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)]">19</p>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Années de<br/>Haut Niveau</p>
            </div>
            <div className="space-y-4 px-4">
              <Target className="w-8 h-8 text-accent/50" />
              <p className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-white">4</p>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Top 5<br/>Mondiaux (Ind.)</p>
            </div>
            <div className="space-y-4 px-4">
              <Trophy className="w-8 h-8 text-accent/50" />
              <p className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)]">16</p>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Pays<br/>Hôtes</p>
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
                  <div className="relative aspect-square w-full border border-white/10 overflow-hidden group">
                    <Image src="/IMG_0373.JPG" alt="Match contre Sky Kim (AUS)" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Match vs Sky Kim (AUS)</p>
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square w-full border border-white/10 overflow-hidden group">
                    <Image src="/IMG_0723.JPG" alt="Match par équipe France-Italie" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Équipe France-Italie</p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[3/4] w-full border border-white/10 group">
              <Image src="/IMG_5604.JPG" alt="Thomas Aubert en action" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 bg-background/90 backdrop-blur-sm p-6 border-t border-r border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">La concentration absolue.</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mt-20 pt-20 border-t border-white/5">
            <div className="space-y-6">
              <div className="relative aspect-[16/9] w-full border border-white/10 overflow-hidden group">
                <Image src="/IMG_0123.jpg" alt="Equipe de France Leipzig 2007" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Leipzig (GER) &mdash; 2007</p>
                <p className="text-sm text-muted-foreground font-medium">Équipe de France aux Championnats du Monde extérieur.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative aspect-[16/9] w-full border border-white/10 overflow-hidden group">
                <Image src="/IMG_8423.jpg" alt="Championnat du Monde Llwynypia 2008" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Llwynypia (WAL) &mdash; 2008</p>
                <p className="text-sm text-muted-foreground font-medium">Championnat du Monde de tir en campagne.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Lists */}
      <section className="py-32">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4 pb-4 md:pb-0 md:border-none border-b border-white/10">
              <Target className="w-8 h-8 text-accent" />
              <h3 className="text-2xl md:text-4xl font-heading font-extrabold uppercase tracking-tighter">Résultats <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)] opacity-80">Majeurs.</span></h3>
            </div>
            <p className="text-sm text-muted-foreground font-light max-w-xs md:text-right">
              Synthèse chronologique des classements sur les compétitions internationales.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-secondary/10 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="hover:bg-transparent border-white/10">
                    <TableHead className="w-24 font-bold text-accent uppercase tracking-widest text-xs">Année</TableHead>
                    <TableHead className="font-bold text-white uppercase tracking-widest text-xs min-w-[200px]">Compétition</TableHead>
                    <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Lieu</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Ind.</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Équipe</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Mixte</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unifiedEvents.map((evt, idx) => (
                    <TableRow key={idx} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-heading font-bold text-lg text-white/50">{evt.year}</TableCell>
                      <TableCell className="font-bold text-sm tracking-wide">{evt.event}</TableCell>
                      <TableCell className="text-[10px] text-muted-foreground uppercase tracking-widest">{evt.location}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.ind, (evt as any).indMedal)}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.team, (evt as any).teamMedal)}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.mixed, (evt as any).mixedMedal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="pt-10 mt-10">
             <p className="text-xs text-muted-foreground font-light italic text-center max-w-2xl mx-auto">
               Données officielles World Archery (2006 &mdash; 2025). Le tableau synthétise les classements majeurs obtenus lors des Championnats du Monde, Coupes du Monde et Grands Prix.
             </p>
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