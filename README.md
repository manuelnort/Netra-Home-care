# Netra Home Care website

The public website for Netra Home Care, a domestic staffing service in Accra. It's built from
the *Website Project Requirements and Functional Specification* (v1.0, 10 October 2026).

Built with Next.js 16 (App Router) as a fully static export. Running `npm run build` writes plain
HTML, CSS and JS to `out/`, which can go on any static host (Netlify, Vercel, Cloudflare Pages,
an S3 bucket, cPanel).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
```

## Pages

| Path | Spec section |
| --- | --- |
| `/` | 3.1 Recommended homepage content |
| `/about/` | About us |
| `/services/` and `/services/<slug>/` (8 pages) | 2 Service categories, 17 SEO service pages |
| `/request/` | 4 Customer request system (5-step guided form) |
| `/how-it-works/` | 5, 7, 8.2, 10.1, 16 |
| `/safety-and-verification/` | 6, 11, 16.1 |
| `/become-a-house-help/` and `/become-a-house-help/apply/` | 6.1, 6.2 (4-step application) |
| `/faqs/` | Pricing, verification, bookings, cancellation, replacement |
| `/contact/` | Contact form, including "Report a safety concern" and complaints |
| `/login/`, `/house-help-login/` | Sign-in pages (accounts aren't live yet, see below) |
| `/privacy/`, `/terms/` | Privacy policy and terms (drafts) |

Also generated: `sitemap.xml`, `robots.txt` (sign-in pages excluded), Organization and FAQPage
structured data, a favicon, an Apple touch icon and a social share image (`public/og.png`).

## Configuration

Company details live in `src/lib/site.ts`. Anything still `null` is hidden on the site, so
no made-up details ever show.

Environment variables (set them at build time):

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The real domain, e.g. `https://www.example.com.gh`. Used for canonical URLs, the sitemap and share images. Defaults to localhost. |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | The staffing application's intake API. When it's empty, forms run in **preview mode**: they validate and show a confirmation, but nothing is sent, and every form says so clearly. |

### Forms contract

Every form POSTs JSON to `NEXT_PUBLIC_FORMS_ENDPOINT`:

```json
{ "kind": "request" | "application" | "contact" | "complaint", "data": { ... } }
```

The backend should reply with `{ "reference": "NHC-REQ-2026-000123" }`. References follow the spec
format (`REQ`, `APP`, `MSG`, `CMP`) and must be issued by the server so they're unique. The
backend is also responsible for rate limiting, phone verification, sending confirmations and
storing records. The request form never collects an exact address, and the application form never
collects ID documents, as the spec requires.

## Before launch

These are facts or decisions only Netra Home Care can confirm. Until then the site avoids
stating them.

- [ ] **Contact details**: phone, WhatsApp, email, office address and hours in `src/lib/site.ts`.
- [ ] **Domain**: set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Forms backend**: build the intake API and set `NEXT_PUBLIC_FORMS_ENDPOINT`. Sign-in pages
      show an "accounts aren't open yet" note until the accounts system exists.
- [ ] **Legal review**: the privacy policy and terms are drafts. After a Ghanaian lawyer reviews
      them, set `legalDraft: false` in `src/lib/site.ts` (spec section 12).
- [ ] **Employment model** (intermediary, employer or managed-service provider). The terms currently
      defer this to each placement agreement.
- [ ] **Minimum age**: the site says applicants must be 18 or older. Confirm it.
- [ ] **Response targets**: the site says "usually within one business day" and "within three
      business days where candidates are available", taken from the spec's proposed KPIs.
- [ ] **Fees, refunds and replacement policy**: no amounts or periods are published. FAQs say these
      appear in the written terms before payment.
- [ ] **Testimonials**: add real, consented ones to `testimonials` in `src/lib/site.ts`. Until then
      the home page shows a note about the Accra pilot instead.

## Design system

Defined as CSS custom properties at the top of `src/app/globals.css`, with light and dark themes
that follow the visitor's system setting.

- **Colour**: Netra green `#0F5C4D` for actions and status (7.9:1 on white), gold `#F2B33D` for
  progress and the "Netra Approved" label, and neutral surfaces. Body text is 15.4:1, secondary
  text 6.8:1. Dark mode pairs are all 7:1 or better.
- **Type**: Bricolage Grotesque for headings only, and each device's system font for body text
  (17px base, 13px minimum).
- **Signature element**: the check trail, the vertical status line used in the request tracker
  and for verification. Each state has its own shape (filled check, gold ring, empty circle), so
  it never relies on colour alone.
- **Accessibility**: skip link, visible focus rings, 44px or larger touch targets, labelled
  fields with linked error summaries, reduced motion, reduced transparency and increased contrast
  supported.

The logo kit (masters, colour files, web icons and usage guide) is in `../netra-brand/kit/`.

## Photos

The photos in `public/images/` are free stock photos from Unsplash, under the
[Unsplash License](https://unsplash.com/license). It allows commercial use and doesn't require
credit, but the photographers are listed here anyway. The people in them are **not** Netra Home Care
staff or clients, so don't caption them as such. Replace them with your own photos, taken with
consent, when you can. The alt text and credits live in `src/lib/photos.ts`.

| File | Photographer | Source |
| --- | --- | --- |
| `hero.jpg` | [Moses Sichach](https://unsplash.com/@sichach) | [Unsplash](https://unsplash.com/photos/a-woman-sitting-next-to-a-child-on-a-bed-AdWkBmVCB9Q) |
| `general-house-help.jpg` | [aurélie sgnl](https://unsplash.com/@entre2vue) | [Unsplash](https://unsplash.com/photos/cozy-living-room-with-stylish-couches-lamps-and-decorative-pillows-Z7wVn-EL70Y) |
| `live-in-house-help.jpg` | [Alioune SEYE](https://unsplash.com/@aliounepic) | [Unsplash](https://unsplash.com/photos/woman-in-checkered-dress-on-sofa-Hp2PFbBdg4w) |
| `live-out-house-help.jpg` | [Bien'arts](https://unsplash.com/@bienarts14) | [Unsplash](https://unsplash.com/photos/woman-hanging-clothes-on-a-clothesline-outdoors-h6oEtHPSd_Q) |
| `nanny-childcare.jpg` | [Andrae Ricketts](https://unsplash.com/@drezart) | [Unsplash](https://unsplash.com/photos/woman-in-orange-shirt-carrying-baby-in-white-and-blue-floral-shirt-3Qi0PkM_Wes) |
| `cook.jpg` | [Elise Gaumier](https://unsplash.com/@e_g_e_photographie) | [Unsplash](https://unsplash.com/photos/a-woman-in-a-red-shirt-is-cooking-in-a-kitchen-lJbOE0G76aw) |
| `elderly-care-assistant.jpg` | [SHIMO yann](https://unsplash.com/@ishots_thing) | [Unsplash](https://unsplash.com/photos/an-old-woman-sitting-down-reading-a-book-t6JL-nuGEdA) |
| `household-cleaner.jpg` | [Vitaly Gariev](https://unsplash.com/@silverkblack) | [Unsplash](https://unsplash.com/photos/woman-with-headphones-cleaning-floor-with-mop-h_cGl2nIzng) |
| `temporary-house-help.jpg` | [Dina Badamshina](https://unsplash.com/@dinaamazing) | [Unsplash](https://unsplash.com/photos/a-room-filled-with-lots-of-boxes-and-plants-j7vbBmTHmjY) |
| `page-about.jpg` | [Ifeoluwa B.](https://unsplash.com/@ife_) | [Unsplash](https://unsplash.com/photos/white-concrete-building-with-flag-on-top-during-daytime--CgUhaShACE) |
| `page-how-it-works.jpg` | [Ayodele Adeniyi](https://unsplash.com/@ayodigital) | [Unsplash](https://unsplash.com/photos/a-group-of-people-sitting-around-a-wooden-table-PG9FDJfKKsY) |
| `page-safety.jpg` | [Iwaria Inc.](https://unsplash.com/@iwaria) | [Unsplash](https://unsplash.com/photos/a-woman-writing-on-a-book-Rbus5PbeBzM) |
| `page-become-a-house-help.jpg` | [Jeff Kweba](https://unsplash.com/@lucentstreet) | [Unsplash](https://unsplash.com/photos/a-person-wearing-glasses--qh8PWfA-OE) |
| `page-faqs.jpg` | [Dr Josiah Sarpong](https://unsplash.com/@josiah123) | [Unsplash](https://unsplash.com/photos/man-in-blue-and-red-button-up-shirt-carrying-girl-in-white-shirt-ubP5fEtoM_E) |
| `page-contact.jpg` | [Vitaly Gariev](https://unsplash.com/@silverkblack) | [Unsplash](https://unsplash.com/photos/young-woman-talking-on-phone-at-desk-with-laptop-n1yI8oExVns) |
| `page-services.jpg` | [Sam E](https://unsplash.com/@drsedusa) | [Unsplash](https://unsplash.com/photos/green-palm-tree-near-brown-concrete-house-yEwC3w6biTA) |
| `page-request.jpg` | [National Cancer Institute](https://unsplash.com/@nci) | [Unsplash](https://unsplash.com/photos/family-playing-board-games-VJVsEnR_vNE) |
| `page-login.jpg` | [Joshua Duneebon](https://unsplash.com/@joshduneebon) | [Unsplash](https://unsplash.com/photos/woman-in-purple-and-yellow-dress-smiling-G8fEocK6g4w) |

## Not in this build

The secured staffing application from spec sections 8, 9, 13 and 14 isn't part of this site:
customer and worker dashboards, the admin panel, verification workflow, matching, payments,
notifications and audit logs. The forms here are the front door to it.
