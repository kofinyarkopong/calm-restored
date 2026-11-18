# Calm Restored website

Private Concierge Mental Health Services, led by Dr Albert Sedohia, Specialist Psychiatrist, West Trasacco, Accra.

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS 4. Ready for Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your Resend details
npm run dev                  # http://localhost:3000
npm run build                # production build check
```

## Where to edit things

| What | File |
| --- | --- |
| Photographs, alt text, face position (focal point) | `src/config/images.ts` |
| Phone, location, brand lines, navigation | `src/content/site.ts` |
| The eleven services (all text) | `src/content/services.ts` |
| Frequently asked questions | `src/content/faqs.ts` |
| Page text | `src/app/<page>/page.tsx` (home is `src/app/page.tsx`) |
| Privacy notice | `src/app/privacy/page.tsx` |
| Colours and typography | `src/app/globals.css` (`@theme` block) |

### Replacing or adding photographs

1. Save the photo (JPEG, about 2000px on the long edge) in `public/images/...`.
2. In `src/config/images.ts`, set `src`, `width`, `height` and `alt`.
3. Adjust `focal` (desktop) and `focalMobile` so the face stays in frame. `"50% 25%"` means centred, a quarter of the way down.

Grounds photographs live in `public/images/premises/` and the garden video in `public/media/`. They appear on the homepage ("Make room for calm" and the "Our setting" band), the Experience page ("Our setting" gallery) and the Stress Management service page.

## Enquiry form (email)

Submissions go to `/api/enquiry`, are validated on the server and sent by [Resend](https://resend.com). Nothing is stored in a database and enquiry contents are never logged.

Environment variables (Vercel → Project → Settings → Environment Variables), then redeploy:

- `RESEND_API_KEY`
- `CONTACT_EMAIL` (recipient)
- `CONTACT_FROM_EMAIL` (sender on a domain verified in Resend)

Until all three are set, the site shows "Online enquiries are temporarily unavailable" with the telephone number. It never pretends a message was sent.

Spam protection: hidden honeypot field, minimum completion time, same-origin check and a per-connection rate limit (5 per 10 minutes).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: Add New → Project → import the repository (framework: Next.js, default settings).
3. Project name `calmrestoredgh` gives the address `https://calmrestoredgh.vercel.app` (if available).
4. Add the environment variables above and redeploy.
