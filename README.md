# sameer.gupta — portfolio

Personal portfolio of **Sameer Gupta** — software engineer, IIIT Kota '26.
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## What's inside

- **Warm, hand-crafted design** — serif display type (Fraunces), handwritten annotations (Caveat), polaroid photo, index-card layouts, paper grain.
- **Gamified** — 7 hidden visitor achievements with unlock toasts + confetti, an interactive terminal (`help`, `sudo hire-me`, …), the konami code, and an arcade-style "high scores" board for CP ratings.
- **SEO-first** — fully static server-rendered HTML, JSON-LD `Person` structured data, OpenGraph/Twitter cards with a generated OG image, `sitemap.xml`, `robots.txt`, canonical URLs.
- **Working contact form** — `/api/contact` delivers messages via [FormSubmit](https://formsubmit.co) (zero config), or [Resend](https://resend.com) if `RESEND_API_KEY` is set.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Contact form setup (one-time)

The form works without any keys via FormSubmit — just click the **"Activate Form"**
link FormSubmit sends to guptasameer533@gmail.com after the first submission.

Optional upgrade to Resend: sign up at [resend.com](https://resend.com), create an
API key, copy `.env.local.example` → `.env.local` and paste it. When the key is
present the route uses Resend instead.

## Deploying (Vercel)

1. Push this repo to GitHub (`Guptasameer533` account) and import it in Vercel.
2. Add the env vars from `.env.local.example` in Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to the final URL.

## After deploying — SEO checklist

- [ ] Verify the site in [Google Search Console](https://search.google.com/search-console) and submit `sitemap.xml`.
- [ ] Add the portfolio URL to your GitHub, LinkedIn, LeetCode, Codeforces and CodeChef profiles — these backlinks are what push "Sameer Gupta" queries up.
- [ ] Keep the LinkedIn profile linking here public.
- [ ] Test the OG card with [opengraph.xyz](https://www.opengraph.xyz).
