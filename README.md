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
RESEND_API_KEY=re_xxxxxxxx
PROPOSAL_NOTIFICATION_EMAIL=comercial@orbytstech.com
# Opcional (após verificar domínio no Resend):
# RESEND_FROM="ORBYTS Site <comercial@orbytstech.com>"
```

## Deploy no Netlify

1. Conecte o repositório no [Netlify](https://app.netlify.com).
2. Build settings (já no `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node:** `22`
3. Em **Site settings → Environment variables**, adicione:
   - `RESEND_API_KEY`
   - `PROPOSAL_NOTIFICATION_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (URL definitiva do site)
   - `RESEND_FROM` (depois de verificar `orbytstech.com` no Resend)
4. Deploy. A rota `/api/proposal` roda como função serverless automaticamente.

```bash
# Teste local de produção
npm run build && npm start
```
