# Ember & Crust — Wood Fired Pizza Kitchen

A fast, fully static restaurant website for Ember & Crust, a wood fired pizza kitchen in Chicago. Built with Next.js 16, Tailwind CSS and shadcn/ui, with client-side ordering: menu, cart, checkout and order confirmation. All images are local, all content is real, and there is no backend to maintain.

## Pages

- Home: hero slider, promo tiles, tabbed best sellers, deal of the day, gallery
- Order Online: full menu with category filters
- About, Contact, Cart, Checkout and order success

The cart lives in the browser (localStorage), so the whole site works as pure static files.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploying to Cloudflare (Workers, static assets)

The site ships as a static export, so it runs on Cloudflare's free tier with no server costs. The repo includes a `wrangler.jsonc` that publishes the static build as a Workers assets project.

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, create a Workers project connected to this repository (Workers & Pages → Create → Workers → Connect to Git).
3. Use these build settings:
   - Build command: `npm run build:static`
   - Deploy command: `npx wrangler deploy`
4. Deploy. Every push to the repository now redeploys the site automatically.

No environment variables, database or API keys are needed for the build.

## Notes

- `npm run build:static` outputs the static site to `out/` and never touches the sandbox's own build artifacts.
- `npm run build` produces the sandbox production bundle AND the static `out/` folder, so Cloudflare's default `bun run build` command works unchanged.
- The footer credit, "Designed By Fadelys Studio", links to https://fadelysstudio.space-z.ai/
