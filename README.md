# ORBYTS — Site Institucional

Landing page da software house ORBYTS, construída com **Next.js 15** (App Router), componentização modular e otimizações de SEO/performance.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- CSS Modules + design tokens globais
- `next/font` (Sora, Inter, JetBrains Mono)
- `next/image` para imagens otimizadas

## Estrutura

```
src/
├── app/              # Rotas, layout, metadata, sitemap, robots
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, Projetos, Processo, Modelos, CTA
│   ├── ui/           # Button, FadeUp, Icons
│   └── seo/          # JSON-LD structured data
├── config/           # Configuração central do site
└── lib/constants/    # Dados estáticos (projetos, processo, etc.)
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## SEO

- Metadata API (title, description, Open Graph, Twitter Cards)
- `sitemap.ts` e `robots.ts` dinâmicos
- JSON-LD (`Organization`, `ProfessionalService`, `WebSite`)
- HTML semântico com landmarks (`nav`, `main`, `section`, `footer`)
- Canonical URL configurável via `NEXT_PUBLIC_SITE_URL`

## Variáveis de ambiente

```env
NEXT_PUBLIC_SITE_URL=https://orbyts.com.br
```
