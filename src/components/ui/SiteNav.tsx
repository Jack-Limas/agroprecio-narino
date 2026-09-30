'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useWorkshopMode } from '@/hooks/useWorkshopMode';
import { NAV_ITEMS } from '@/lib/navigation';

export function SiteNav() {
  const pathname = usePathname();
  const [workshop] = useWorkshopMode();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0 text-base font-extrabold text-brand">
          🌱 AgroPrecio
        </Link>
        <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition ${
                    active ? 'bg-brand text-on-brand' : 'text-muted hover:bg-surface-2 hover:text-fg'
                  }`}
                >
                  {item.label}
                  {workshop && (
                    <span className="rounded bg-black/15 px-1 text-[10px] font-bold">{item.tag}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}