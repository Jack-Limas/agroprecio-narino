import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/ui/SiteNav';
import { WorkshopToggle } from '@/components/ui/WorkshopToggle';

export const metadata: Metadata = {
  title: 'AgroPrecio Nariño',
  description: 'Precios agrícolas de Nariño: compara plazas, simula tu ganancia y recibe el boletín del día.',
};

const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <SiteNav />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-24 text-xs text-muted">
          Datos simulados con fines académicos · Taller de patrones clásicos de rendering
        </footer>
        <WorkshopToggle />
      </body>
    </html>
  );
}