import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Medal, Target, Calendar, Globe2, Trophy, BarChart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Palmares() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Photo gallery organized by event
  const eventPhotos: Record<string, Array<{ src: string; alt: string; caption: string }>> = {
    "Varese 2007": [
      { src: "/IMG_1731.jpg", alt: "Podium Varese 2007", caption: "Podium Varese 2007 / Médaille de Bronze" },
      { src: "/IMG_9605.jpg", alt: "High-five avec Lee Tae-Hoon", caption: "High-five avec l'entraîneur coréen Lee Tae-Hoon à Varese en 2007" },
      { src: "/IMG_1532.jpg", alt: "Présentation avant match", caption: "Présentation d'avant match, match pour la médaille de bronze Varese 2007" },
      { src: "/IMG_9609.jpg", alt: "Coupe du Monde Varese 2007", caption: "Coupe du Monde Varese 2007 avec Mauro Nespoli (ITA)" },
      { src: "/IMG_9604.jpg", alt: "Match pour la médaille de bronze Varese 2007", caption: "Match pour la médaille de bronze Varese 2007" },
      { src: "/IMG_9611.jpg", alt: "Avec Lee Tae-Hoon Varese 2007", caption: "Avec Lee Tae-Hoon après avoir gagné le match pour le bronze à Varese 2007" },
      { src: "/IMG_1538.jpg", alt: "Match pour la médaille de bronze Varese 2007", caption: "Match pour la médaille de bronze Varese 2007" },
    ],
    "Ulsan 2007": [
      { src: "/IMG_1597.jpg", alt: "Célébration par équipe Ulsan 2007", caption: "Célébration par équipe Ulsan 2007, médaille de bronze par équipe" },
      { src: "/IMG_1595.jpg", alt: "Match pour la médaille de bronze par équipes Ulsan 2007", caption: "Match pour la médaille de bronze par équipes Ulsan 2007" },
    ],
    "Shanghai 2009": [
      { src: "/IMG_1804.jpg", alt: "Shanghai 2009 avec le staff", caption: "Avec le staff de l'équipe de France (Anne Reculet et Marc Saunier) ainsi que mon coéquipier Jean-Charles Valladont, à la coupe du Monde de Shanghai 2009" },
      { src: "/IMG_2430.jpg", alt: "Podium par équipes Shanghai 2009", caption: "Podium par équipes Shanghai 2009 aux côtés de la Corée du Sud et du Mexique." },
      { src: "/IMG_1121.jpg", alt: "Finale par équipe Shanghai 2009", caption: "Finale par équipe de la coupe du monde de Shanghai 2009 contre la Corée du Sud." },
      { src: "/IMG_1105.jpg", alt: "Match pour la médaille d'or par équipe Shanghai 2009", caption: "Match pour la médaille d'or par équipe Shanghai 2009" },
      { src: "/IMG_1699.jpg", alt: "Match à Shanghai 2009", caption: "Match à Shanghai 2009 contre Rafal Dobrowolski (POL)" },
    ],
    "Antalya 2009": [
      { src: "/IMG_6775.jpg", alt: "Podium individuel Antalya 2009", caption: "Podium individuel (argent) de la coupe du monde Antalya 2009 aux côtés de Simon Terry (GBR) et Jayanta Talukdar (IND)" },
      { src: "/IMG_6079.jpg", alt: "Volée à 60 par équipes Antalya 2009", caption: "Volée à 60 par équipes à Antalya 2009, avec Jean Charles Valladont et Romain Girouille." },
      { src: "/IMG_6654.jpg", alt: "Finale individuelle Antalya 2009", caption: "Finale individuelle coupe du monde Antalya 2009 contre Simon Terry (GBR)" },
      { src: "/IMG_3659.jpg", alt: "Finale individuelle Antalya 2009", caption: "Finale individuelle coupe du monde Antalya 2009 contre Simon Terry (GBR)" },
      { src: "/IMG_3709.jpg", alt: "Finale individuelle Antalya 2009", caption: "Finale individuelle coupe du monde Antalya 2009 contre Simon Terry (GBR)" },
      { src: "/IMG_3642.jpg", alt: "Finale individuelle Antalya 2009", caption: "Finale individuelle coupe du monde Antalya 2009 contre Simon Terry (GBR)" },
      { src: "/IMG_5881.jpg", alt: "Éliminatoires individuelles Antalya 2009", caption: "Eliminatoires individuelles coupe du monde Antalya 2009" },
      { src: "/IMG_1567.jpg", alt: "Qualifications Antalya 2009", caption: "Qualifications coupe du monde Antalya 2009" },
    ],
    "Antalya 2010": [
      { src: "/IMG_7800.jpg", alt: "Coupe du Monde Antalya 2010", caption: "Coupe du Monde Antalya 2010" },
    ],
    "Ogden 2010": [
      { src: "/IMG_2442.jpg", alt: "Ogden 2010", caption: "Ogden 2010 avec Jean-Charles Valladont, Romain Girouille, Jean-Denis Gitton, Cyrielle Cotry et Franck Fisseux" },
    ],
    "Ogden 2011": [
      { src: "/IMG_1550.jpg", alt: "Coupe du monde Ogden 2011", caption: "Coupe du monde Ogden 2011" },
    ],
    "Shanghai 2012": [
      { src: "/file011716_5184x3456.jpg", alt: "Match pour la médaille de bronze Shanghai 2012", caption: "Match pour la médaille de bronze Shanghai 2012" },
      { src: "/file011717_5184x3456.jpg", alt: "Match pour la médaille de bronze individuelle Shanghai 2012", caption: "Match pour la médaille de bronze individuelle Shanghai 2012" },
      { src: "/file012775_5184x3456.jpg", alt: "Shanghai 2012 avec le staff World Archery", caption: "Shanghai 2012, avec Didier Miéville et Ludivine Maitre Wicki, staff de World Archery, juste avant le début de ma carrière professionnelle." },
      { src: "/file011718_5184x3456.jpg", alt: "Match pour la médaille de bronze Shanghai 2012", caption: "Match pour la médaille de bronze individuelle Shanghai 2012 avec Marc Dellenbach." },
      { src: "/file009856_3264x4896.jpg", alt: "1/16 de finale Shanghai 2012", caption: "1/16 de final individuel Shanghai 2012 contre Gael Prevost (FRA)" },
      { src: "/file011115_4896x3264.jpg", alt: "Match pour la médaille de bronze Shanghai 2012", caption: "Match pour la médaille de bronze individuelle Shanghai 2012 avec Marc Dellenbach" },
      { src: "/file011121_4896x3264.jpg", alt: "Match pour la médaille de bronze Shanghai 2012", caption: "Match pour la médaille de bronze individuelle Shanghai 2012" },
    ],
    "Antalya 2012": [
      { src: "/file014023_5184x3456.jpg", alt: "Coupe du Monde Antalya 2012", caption: "Coupe du Monde 2012 à Antalya avec René Kouassi (CIV)" },
    ],
    "Chicago 2025": [
      { src: "/R3X_4192.jpg", alt: "The Great Chicago Open 2025", caption: "The Great Chicago Open 2025, qualifications" },
    ],
  };

  const unifiedEvents = [
    { year: "2025", event: "Championnats d'Europe Indoor", location: "Samsun (TUR)", ind: "9th", team: "-", mixed: "-", country: "SUI" },
    { year: "2016", event: "Championnats d'Europe", location: "Nottingham (GBR)", ind: "57th", team: "5th", mixed: "-", country: "SUI" },
    { year: "2016", event: "Grand Prix Européen", location: "Sofia (BUL)", ind: "17th", team: "9th", mixed: "5th", country: "SUI" },
    { year: "2015", event: "Grand Prix Européen", location: "Marathon (GRE)", ind: "17th", team: "28th", mixed: "8th", country: "SUI" },
    { year: "2013", event: "Coupe du Monde (Étape 4)", location: "Wroclaw (POL)", ind: "9th", team: "9th", mixed: "-", country: "FRA" },
    { year: "2013", event: "Coupe du Monde (Étape 1)", location: "Shanghai (CHN)", ind: "17th", team: "3rd", teamMedal: "bronze", mixed: "-", country: "FRA" },
    { year: "2013", event: "Grand Prix Européen", location: "Riom (FRA)", ind: "2nd", indMedal: "silver", team: "1st", teamMedal: "gold", mixed: "5th", country: "FRA" },
    { year: "2012", event: "Championnat du Monde Universitaire", location: "Cordoue (ESP)", ind: "5th", team: "6th", mixed: "6th", country: "FRA" },
    { year: "2012", event: "Coupe du Monde (Étape 1)", location: "Shanghai (CHN)", ind: "4th", team: "-", mixed: "-", country: "FRA" },
    { year: "2012", event: "Coupe du Monde Indoor (Finale)", location: "Las Vegas (USA)", ind: "4th", team: "-", mixed: "-", country: "FRA" },
    { year: "2011", event: "Universiade d'Été", location: "Shenzhen (CHN)", ind: "9th", team: "3rd", teamMedal: "bronze", mixed: "-", country: "FRA" },
    { year: "2011", event: "Coupe du Monde (Étape 3)", location: "Ogden (USA)", ind: "17th", team: "5th", mixed: "-", country: "FRA" },
    { year: "2011", event: "Grand Prix Européen", location: "Antalya (TUR)", ind: "2nd", indMedal: "silver", team: "-", mixed: "-", country: "FRA" },
    { year: "2011", event: "Grand Prix Européen", location: "Boé (FRA)", ind: "9th", team: "4th", mixed: "-", country: "FRA" },
    { year: "2010", event: "Championnat du Monde Universitaire", location: "Shenzhen (CHN)", ind: "9th", team: "5th", mixed: "9th", country: "FRA" },
    { year: "2009", event: "Championnats du Monde", location: "Ulsan (KOR)", ind: "52nd", team: "2nd", teamMedal: "silver", mixed: "-", country: "FRA" },
    { year: "2009", event: "Coupe du Monde (Étape 4)", location: "Shanghai (CHN)", ind: "25th", team: "2nd", teamMedal: "silver", mixed: "-", country: "FRA" },
    { year: "2009", event: "Coupe du Monde (Étape 3)", location: "Antalya (TUR)", ind: "2nd", indMedal: "silver", team: "5th", mixed: "-", country: "FRA" },
    { year: "2008", event: "Championnats d'Europe", location: "Vittel (FRA)", ind: "23rd", team: "2nd", teamMedal: "silver", mixed: "-", country: "FRA" },
    { year: "2008", event: "Coupe du Monde (Étape 4)", location: "Boé (FRA)", ind: "33rd", team: "5th", mixed: "-", country: "FRA" },
    { year: "2008", event: "Coupe du Monde (Étape 2)", location: "Porec (CRO)", ind: "24th", team: "4th", mixed: "-", country: "FRA" },
    { year: "2008", event: "Coupe du Monde (Étape 1)", location: "St-Domingue (DOM)", ind: "27th", team: "5th", mixed: "-", country: "FRA" },
    { year: "2007", event: "Championnats du Monde", location: "Leipzig (GER)", ind: "101st", team: "-", mixed: "-", country: "FRA" },
    { year: "2007", event: "Coupe du Monde (Étape 2)", location: "Varese (ITA)", ind: "3rd", indMedal: "bronze", team: "-", mixed: "-", country: "FRA" },
    { year: "2007", event: "Coupe du Monde (Étape 1)", location: "Ulsan (KOR)", ind: "13th", team: "3rd", teamMedal: "bronze", mixed: "-", country: "FRA" },
    { year: "2006", event: "Championnats du Monde Jeunes", location: "Mérida (MEX)", ind: "4th", team: "8th", mixed: "-", country: "FRA" },
    { year: "2006", event: "Grand Prix Européen", location: "Sassari (ITA)", ind: "4th", team: "-", mixed: "-", country: "FRA" },
    { year: "2006", event: "Championnat d'Europe Indoor Jeunes", location: "Jaen (ESP)", ind: "2nd", indMedal: "silver", team: "-", mixed: "-", country: "FRA" },
    { year: "2005", event: "Coupe d'Europe Junior", location: "Cles (ITA)", ind: "2nd", indMedal: "silver", team: "-", mixed: "-", country: "FRA" },
    { year: "2005", event: "Championnats d'Europe Jeunes", location: "Silkeborg (DEN)", ind: "-", team: "2nd", teamMedal: "silver", mixed: "-", country: "FRA" },
  ];

  const renderRank = (rank: string, medal?: "gold" | "silver" | "bronze" | string) => {
    if (!rank || rank === "-") return <span className="text-white/10">-</span>;
    if (medal === "gold") return <div className="flex justify-center" title="Médaille d'Or"><Medal className="w-7 h-7 text-yellow-400 fill-yellow-400/40 drop-shadow-[0_0_12px_rgba(250,204,21,1)]" strokeWidth={2} /></div>;
    if (medal === "silver") return <div className="flex justify-center" title="Médaille d'Argent"><Medal className="w-7 h-7 text-white fill-white/50 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" strokeWidth={2} /></div>;
    if (medal === "bronze") return <div className="flex justify-center" title="Médaille de Bronze"><Medal className="w-7 h-7 text-orange-500 fill-orange-500/40 drop-shadow-[0_0_12px_rgba(249,115,22,1)]" strokeWidth={2} /></div>;
    
    return <span className="font-heading font-extrabold text-lg md:text-xl tracking-tighter text-white/50">{rank}</span>;
  };

  // Helper to find event photos by matching city and year
  const getEventKey = (location: string, year: string): string | null => {
    // Extract city from location (format: "City (COUNTRY)")
    const city = location.split("(")[0].trim();
    
    // Map city + year to event keys
    if (city === "Varese" && year === "2007") return "Varese 2007";
    if (city === "Ulsan" && year === "2007") return "Ulsan 2007";
    if (city === "Shanghai" && year === "2009") return "Shanghai 2009";
    if (city === "Antalya" && year === "2009") return "Antalya 2009";
    if (city === "Antalya" && year === "2010") return "Antalya 2010";
    if (city === "Ogden" && year === "2010") return "Ogden 2010";
    if (city === "Ogden" && year === "2011") return "Ogden 2011";
    if (city === "Shanghai" && year === "2012") return "Shanghai 2012";
    if (city === "Antalya" && year === "2012") return "Antalya 2012";
    
    return null;
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
                    <TableHead className="w-32 font-bold text-accent uppercase tracking-widest text-xs">Année</TableHead>
                    <TableHead className="font-bold text-white uppercase tracking-widest text-xs min-w-[200px]">Compétition</TableHead>
                    <TableHead className="font-bold text-white uppercase tracking-widest text-xs">Lieu</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Ind.</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Équipe</TableHead>
                    <TableHead className="text-center font-bold text-white uppercase tracking-widest text-xs">Mixte</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unifiedEvents.map((evt, idx) => {
                    const eventKey = getEventKey(evt.location, evt.year);
                    const hasPhotos = eventKey && eventPhotos[eventKey];
                    
                    return (
                    <TableRow key={idx} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-xl opacity-90" title={evt.country === "SUI" ? "Équipe de Suisse" : "Équipe de France"}>{evt.country === "SUI" ? "🇨🇭" : "🇫🇷"}</span>
                          <span className="font-heading font-bold text-lg text-white/70">{evt.year}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm tracking-wide">{evt.event}</span>
                          {hasPhotos && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="text-accent/60 hover:text-accent transition-colors" title="Voir les photos">
                                  <Camera className="w-4 h-4" />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-white/10">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-heading font-bold uppercase tracking-wider text-foreground">
                                    {eventKey}
                                  </DialogTitle>
                                  <DialogDescription className="text-muted-foreground">
                                    {eventPhotos[eventKey!].length} photo{eventPhotos[eventKey!].length > 1 ? "s" : ""} disponible{eventPhotos[eventKey!].length > 1 ? "s" : ""}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                  {eventPhotos[eventKey!].map((photo, photoIdx) => (
                                    <div key={photoIdx} className="space-y-3">
                                      <div className="relative aspect-[4/3] w-full border border-white/10 overflow-hidden group bg-black/20">
                                        <Image 
                                          src={photo.src} 
                                          alt={photo.alt} 
                                          fill 
                                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                        />
                                      </div>
                                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">{photo.caption}</p>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-[10px] text-muted-foreground uppercase tracking-widest">{evt.location}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.ind, (evt as any).indMedal)}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.team, (evt as any).teamMedal)}</TableCell>
                      <TableCell className="text-center">{renderRank(evt.mixed, (evt as any).mixedMedal)}</TableCell>
                    </TableRow>
                  )})}
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