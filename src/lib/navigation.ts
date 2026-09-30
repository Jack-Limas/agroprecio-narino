export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly tag: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', href: '/', tag: 'SSG + CSR' },
  { label: 'Precios', href: '/ssr', tag: 'SSR' },
  { label: 'Simulador', href: '/csr', tag: 'CSR' },
  { label: 'Productos', href: '/ssg', tag: 'SSG' },
  { label: 'Boletín', href: '/isr', tag: 'ISR' },
];