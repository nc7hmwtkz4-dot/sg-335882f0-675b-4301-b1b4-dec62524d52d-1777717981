import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/calendar");
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Head>
        <title>Inscription Admin | Thomas Aubert</title>
      </Head>

      <div className="w-full max-w-md p-8 bg-card border border-border">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider mb-2">
            Créer le Compte Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            Page temporaire - sera supprimée après création
          </p>
        </div>

        {success ? (
          <div className="bg-accent/10 text-accent text-sm p-4 border border-accent/20 text-center">
            ✓ Compte créé avec succès ! Redirection...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aubert.th@gmail.com"
                required
                className="rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="rounded-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none h-12 font-bold uppercase tracking-wider"
            >
              {loading ? (
                "Création..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer le compte
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}