# Sonic Website (Next.js)

Full Sonic premium landing page with Fixaplan-inspired structure and animation language.

## Included
- Sticky top navigation
- Hero + CTA + metrics
- Integrated `SplineScene` React client component
- Brand logo gallery
- Product portfolio explorer (category/color filters)
- Lifestyle gallery
- App ecosystem section
- FAQ + CTA + footer

## Run
```bash
cd /Users/tanmoyacharjee/Documents/Test Apps and websites/sonic-brand-lab/website
npm install
npm run dev
```

## Optional Spline Scene
Set an environment variable before `npm run dev`:

```bash
export NEXT_PUBLIC_SPLINE_SCENE_URL="https://prod.spline.design/your-scene/scene.splinecode"
```

Without this variable, the page shows a styled fallback panel.
You can also copy `.env.example` to `.env.local`.
