# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **technical recruiters, university-relations coordinators, and engineering hiring managers** screening candidates for **Software Engineering internships (Summer 2027)**. They arrive from a resume link, a LinkedIn profile, a career-fair QR code, or an application form field. They are time-boxed — often under 60 seconds on a first pass — and are triaging: they want to establish quickly that this candidate is real, technical, currently building things, and worth an interview slot.

Secondary: engineers who join later in the loop and read more deeply, looking for evidence of systems thinking and shipped work rather than credentials.

## Product Purpose

A personal portfolio for Brady Deschamps that converts a short recruiter visit into an interview. Success is a recruiter leaving with the resume downloaded, or an email/LinkedIn message sent.

The site must answer four questions fast: who is this, what has he actually built, is it real (links, live products, numbers), and how do I contact him.

## Positioning

Brady's differentiator is that his work is **real infrastructure, not coursework**. He ships to production at an aerospace-visualization platform with public users, runs ML workloads on a university supercomputer, and has held a paid software engineering role for over two years while enrolled full-time. Most internship-candidate portfolios show class projects; this one shows systems in production.

Concretely:
- **Orbitscape** (orbitscape.space) — a publicly deployed 3D orbital mission-visualization platform built by ASU's Luminosity Lab. Brady built the Python/pandas data pipeline connecting NASA JPL Horizons data sources to the platform, and is applying ML techniques to space-weather analysis within it.
- **Sol ML inference pipeline** — an automated pipeline on ASU's Sol supercomputer orchestrating three sequential deep learning models via SLURM job arrays and Apptainer containers, with a feedback loop on output-scoring metrics that grades runs and directs subsequent parameters.

## Operating Context

The site is evaluated in a browser tab, often alongside a stack of other candidate tabs, frequently on a phone at a career fair. It competes for attention against dozens of near-identical template portfolios. It is also linked from a resume PDF, so it must not simply restate the resume — it must give a reason to look further.

## Capabilities and Constraints

- Static single-page site. React 18 + Vite + Tailwind CSS. Repo: `github.com/BradyD11/PortfolioWebsite`. No backend, no forms requiring a server.
- **Deploy target: Netlify** (`netlify.toml` present). **Live at https://bradydeschamps.netlify.app/** — supplied by Brady and verified returning 200 on 2026-08-28. This is the canonical host; `canonical`, `og:url`, and the absolute `og:image` in `index.html` all point at it.
- Contact is **email and LinkedIn only**. The phone number on the resume PDF is deliberately **not** published on the page.
- **Confidentiality, affirmatively confirmed 2026-08-27 and re-confirmed 2026-08-28:** SMBC and Luminosity Lab work is described **only to the level already stated on the public resume PDF**. This is a live constraint, not a default. Internal detail about the Sol pipeline exists in Brady's local `~/Luminosity/ProteinPipelineDemo` checkout — the specific model chain, the scientific domain, and the scoring metric — and was deliberately excluded. Do not reintroduce it without Brady clearing it with the lab.
- Must degrade gracefully: any heavy hero animation needs a reduced-motion path and must not block content or hurt mobile performance.

## Brand Commitments

- Name: **Brady Deschamps**. Title framing: software engineer / CS student, not "Software Developer."
- Binding visual reference supplied by the user: the **Orbitscape landing page** (orbitscape.space) — pure black canvas, white light-weight wide-tracked sans (Manrope / Inter), wireframe concentric-orbit motifs, real depth and space imagery. The portfolio should live in that visual family, since Orbitscape is his own work.
- Direction confirmed: **dark, technical, high-craft**.
- Headshot: a new professional headshot supplied by the user replaces `SeniorPhoto.jpeg`, kept in the hero at restrained scale.

## Evidence on Hand

- `Brady Deschamps - SWE Intern Resume.pdf` — current resume, to be published at `public/resume.pdf` with a prominent download action.
- New headshot supplied by the user → `public/headshot.jpg`.
- Live product: https://orbitscape.space — **the only publicly deployed, linkable thing Brady has.**
- Public repos, source only: `github.com/BradyD11/CrisisConnect`, `github.com/BradyD11/sunpath`
- Profiles: `github.com/BradyD11`, `linkedin.com/in/brady-d-deschamps/`, `brady.d.deschamps@gmail.com`
- Verified résumé metrics available for use: 90% unit-test coverage increase across 20+ modules; 5,000+ lines of legacy code removed; 4.0 GPA.
- Assets in `public/`: `Brady-Deschamps-Resume.pdf` (current), `headshot.jpg`, `favicon.svg`, `og.png`.
- **`public/og.png`** — the 1200×630 link-preview card. Rendered from `tools/og-card.html` via `tools/render-og.mjs`, not hand-drawn, so it is regenerable when the pitch line changes. Contains no photograph by design, so replacing `headshot.jpg` never leaves a stale face in the card.

**Absences that must not be fabricated:**

- **CrisisConnect and sunpath are not deployed anywhere public** — confirmed 2026-08-28. `sunpath` carries a `vercel.json`, which is *not* evidence of a live deployment; do not treat it as one and do not invent a demo URL for either. Repository links only.
- No testimonials, no press, no user counts, no metrics beyond those listed above.
- No awards beyond Barrett Honors College, Tillman LTA Scholar, and the Grand Challenges Scholars Program.
- No live demo URLs of any kind beyond orbitscape.space.

## Timeline facts

- Arizona State University, Barrett Honors College — **BS Computer Science, May 2027**, then **accelerated MS, May 2028**. GPA 4.0.
- Available for **Summer 2027 SWE internships**.
- Experience: SMBC IT Intern (Jun–Aug 2026) · The Luminosity Lab, Software Engineer (Feb 2026–present) · Pivotal Energy Solutions, SWE Intern, part-time (Apr 2024–Jun 2026) · ASU Cybersecurity Research Assistant (Nov 2024–Aug 2025) · SCAI Peer Mentor (Aug 2025–present).

## Open Decisions

- **Sol pipeline depth** — currently held at resume level by Brady's decision. If the Luminosity Lab clears the fuller description, the project copy in `src/data.js` (`PROJECTS[1]`) is where it would change. Not currently cleared.
- **Headshot** — `public/headshot.jpg` is still the old senior photo standing in. Brady has a newer studio headshot to drop over it; no code change needed when he does.

## Product Principles

1. **Evidence over adjectives.** Every claim carries a number, a link, or a named system. No "passionate about building impactful solutions."
2. **Sixty seconds must be enough.** The name, the pitch, the proof, and the resume are reachable without scrolling past the first two screens.
3. **Show the systems.** Where a project is hard to photograph, draw it — the interface should make the architecture legible, not hide it behind a generic icon.
4. **Never claim what isn't shippable.** Links go only to things that exist and load.
5. **Fast on a career-fair phone.** Ambition in the visuals never costs first-paint or scroll smoothness.

## Accessibility & Inclusion

- Text must clear WCAG AA on the dark canvas; the animated hero must never reduce contrast below that.
- `prefers-reduced-motion` must fully disable orbital animation and scroll-driven motion.
- Full keyboard navigation with visible focus rings; the resume download and contact actions are the two paths that must never depend on hover or motion.
