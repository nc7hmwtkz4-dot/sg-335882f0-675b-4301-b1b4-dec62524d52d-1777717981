import { SEO } from "@/components/SEO";

export default function MaterielPage() {
  return (
    <>
      <SEO
        title="Mon Matériel - Thomas Aubert"
        description="Équipement et matériel de tir à l'arc de Thomas Aubert"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-foreground mb-8">
            Mon Matériel
          </h1>
          <p className="text-muted-foreground text-lg">
            Contenu à venir...
          </p>
        </div>
      </div>
    </>
  );
}