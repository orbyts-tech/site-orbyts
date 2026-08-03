# ORBYTS — Site Institucional

Landing page da software house ORBYTS, construída com **Next.js 15** (App Router), componentização modular e otimizações de SEO/performance.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- CSS Modules + design tokens globais
- `next/font` (Inter + Plus Jakarta Sans)
- `next/image` (AVIF/WebP) + assets otimizados

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

- Metadata API (title, description, Open Graph, Twitter Cards, hreflang `pt-BR` + `x-default`)
- `sitemap.ts` e `robots.ts` dinâmicos (home + páginas de serviço)
- JSON-LD: `Organization`/`LocalBusiness`, `FAQPage`, `BreadcrumbList`, `WebSite`
- Landing pages indexáveis: `/desenvolvimento-web`, `/desenvolvimento-aplicativos`, `/software-house-porto-alegre`
- FAQ na home com schema para rich results
- Canonical via `NEXT_PUBLIC_SITE_URL`

### Pós-deploy (Google)

1. [Google Search Console](https://search.google.com/search-console) → adicionar propriedade `orbyts.com.br`
2. Enviar `https://orbyts.com.br/sitemap.xml`
3. Pedir indexação da home e das 3 páginas de serviço
4. (Opcional) Bing Webmaster Tools com o mesmo sitemap

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
