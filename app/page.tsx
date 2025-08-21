import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Probando Supabase</Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <AuthButton />
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center max-w-5xl p-5 w-full">
          <h1 className="text-4xl font-bold mb-8">Probando Supabase</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
            <Link href="/protected/personas" className="w-full">
              <Button variant="outline" className="w-full h-24 text-lg">
                Gestión de Personal interno
              </Button>
            </Link>
            
            <Link href="/protected/notes" className="w-full">
              <Button variant="outline" className="w-full h-24 text-lg">
                Gestión de Notas
              </Button>
            </Link>
            
            <Link href="/instruments" className="w-full">
              <Button variant="outline" className="w-full h-24 text-lg">
                Instrumentos
              </Button>
            </Link>
          </div>
        </div>

        <footer className="w-full flex items-center justify-center border-t p-8 mt-auto">
          <p className="text-sm text-muted-foreground">
            Proyecto de ejemplo con Next.js y Supabase
          </p>
        </footer>
      </div>
    </main>
  );
}
