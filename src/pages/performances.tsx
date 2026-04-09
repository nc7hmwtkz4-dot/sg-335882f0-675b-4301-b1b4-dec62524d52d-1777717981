import Head from "next/head";
import Link from "next/link";
import { Award, Bike, Timer, TrendingUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Performances() {
  return (
    <div className="bg-background min-h-screen pt-24">
      <Head>
        <title>Performances Sportives | Thomas Aubert</title>
        <meta name="description" content="Performances sportives de Thomas Aubert au-delà du tir à l'arc." />
      </Head>

      {/* Header Section */}
      <section className="py-20 border-b border-white/5">
        <div className="container">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-accent"></span>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Endurance & Dépassement</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            Performances <br />
            <span className="text-transparent [-webkit-text-stroke:2px_theme(colors.foreground)] opacity-80">Sportives.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Au-delà du tir à l'arc, je maintiens un haut niveau de performance physique et mentale à travers des défis d'endurance. La capacité à souffrir, à persévérer et à se dépasser reste mon moteur.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 border-b border-white/5 bg-secondary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <Trophy className="w-16 h-16 text-accent/50 mx-auto" strokeWidth={1} />
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter">
              L'exigence <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.foreground)] opacity-80">ne s'arrête jamais.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Après une carrière internationale de haut niveau en tir à l'arc, je continue de me challenger sur des épreuves d'endurance. L'objectif reste le même : repousser mes limites, accepter la douleur, et prouver que l'âge n'est qu'un chiffre quand la détermination est présente.
            </p>
          </div>
        </div>
      </section>

      {/* Cyclotour du Léman */}
      <section className="py-32 border-b border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <Bike className="w-12 h-12 text-accent/50" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter">
                Cyclotour <br />du Léman
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  <span className="text-accent font-bold">4 juin 2023</span> — 20e édition de l'une des cyclosportives les plus emblématiques de Suisse romande. 176 kilomètres autour du Lac Léman, un défi d'endurance et de gestion d'effort sur un parcours vallonné.
                </p>
                <p>
                  Lausanne → Genève → Évian → Villeneuve → Lausanne. Un tour complet du lac en moins de 6 heures, dans le peloton, avec une stratégie de gestion de l'effort calibrée pour tenir la distance.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <Timer className="w-6 h-6 text-accent/50 mb-3" strokeWidth={1} />
                  <p className="text-5xl font-heading font-extrabold text-white">5h49'23"</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Temps réalisé</p>
                </div>
                <div className="space-y-2">
                  <TrendingUp className="w-6 h-6 text-accent/50 mb-3" strokeWidth={1} />
                  <p className="text-5xl font-heading font-extrabold text-white">176</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Kilomètres</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 border border-white/10 p-12 space-y-8">
              <h3 className="text-2xl font-heading font-bold uppercase tracking-wider">Parcours</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold text-sm uppercase tracking-wider">Lausanne</span>
                  <span className="text-accent text-xs uppercase tracking-widest">Départ</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold text-sm uppercase tracking-wider">Genève</span>
                  <span className="text-muted-foreground text-xs">3h56'44"</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold text-sm uppercase tracking-wider">Évian</span>
                  <span className="text-muted-foreground text-xs">1h51'35"</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-bold text-sm uppercase tracking-wider">Villeneuve</span>
                  <span className="text-muted-foreground text-xs">56'54"</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-bold text-sm uppercase tracking-wider">Lausanne</span>
                  <span className="text-accent text-xs uppercase tracking-widest">Arrivée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10km de Lausanne */}
      <section className="py-32 bg-secondary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Award className="w-12 h-12 text-accent/50 mx-auto mb-8" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter mb-6">
                10km de Lausanne
              </h2>
              <p className="text-muted-foreground font-light">
                Une course urbaine mythique à travers les rues de Lausanne.
              </p>
            </div>

            <div className="bg-background border border-white/10 p-12 space-y-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-6xl font-heading font-extrabold text-accent mb-4">53'54"</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Temps réalisé</p>
                </div>
                <div>
                  <p className="text-6xl font-heading font-extrabold text-white mb-4">487</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Classement H30</p>
                </div>
                <div>
                  <p className="text-6xl font-heading font-extrabold text-white/50 mb-4">1836</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Participants</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-8">
                <h3 className="text-lg font-heading font-bold uppercase tracking-wider mb-6">Détails de course</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-muted-foreground">Catégorie</span>
                      <span className="font-bold">10km Hommes H30</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-muted-foreground">Dossard</span>
                      <span className="font-bold">16112</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-muted-foreground">Année</span>
                      <span className="font-bold text-accent">2023</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-muted-foreground">5km</span>
                      <span className="font-bold">28'40"9</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-muted-foreground">5km → Finish</span>
                      <span className="font-bold">25'13"8</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-muted-foreground">Écart</span>
                      <span className="font-bold">+23'20"5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 border-t border-white/5 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase tracking-tighter mb-8">
            Du tir à l'arc aux <span className="text-accent">défis d'endurance.</span>
          </h2>
          <Button size="lg" asChild className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-300">
            <Link href="/palmares">Voir le palmarès sportif</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}