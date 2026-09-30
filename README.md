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

## Deploying to Cloudflare Pages

The site ships as a static export, so it runs on Cloudflare Pages free tier with no server costs.

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, go to Workers & Pages → Create → Pages → Connect to Git and pick this repository.
3. Use these build settings:
   - Framework preset: None
   - Build command: `npm run build:static`
   - Build output directory: `out`
4. Under Settings → Environment variables, add `NODE_VERSION` = `22` for both Production and Preview.
5. Deploy. Every push to the repository now redeploys the site automatically.

No environment variables, database or API keys are needed for the build.

## Notes

- `npm run build:static` outputs the static site to `out/` and never touches the sandbox's own build artifacts.
- The footer credit, "Designed By Fadelys Studio", links to https://fadelysstudio.space-z.ai/
