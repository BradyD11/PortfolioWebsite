import { useEffect, useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import OrbitalField from './components/OrbitalField'
import PipelineDiagram from './components/PipelineDiagram'
import Timeline from './components/Timeline'
import { ME, VITALS, ROLES, CAPABILITIES, PROJECTS, ALSO, SKILLS, HONOURS } from './data'

const NAV = [
  ['Work', 'work'],
  ['Experience', 'experience'],
  ['Background', 'background'],
  ['Contact', 'contact'],
]

const slug = (s) => s.replace(/\W+/g, '-').toLowerCase()

/** Reveals content once, on entry. Content is visible by default without JS. */
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

function SectionHead({ id, children, aside }) {
  return (
    <div className="mb-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3" data-reveal>
      <h2
        id={id}
        className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.015em]"
      >
        {children}
      </h2>
      {aside && <p className="label">{aside}</p>}
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:font-data focus:text-[11px] focus:uppercase focus:tracking-wider2 focus:text-ink"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-hair bg-black/72 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6">
          <a
            href="#main"
            className="font-data text-[12px] font-normal uppercase tracking-widest2 text-ink transition-colors hover:text-signal sm:text-[13px]"
          >
            Brady Deschamps
          </a>

          <div className="flex items-center gap-7">
            <ul className="hidden items-center gap-7 md:flex">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="label transition-colors hover:!text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={ME.resume}
              download
              className="group inline-flex items-center gap-2 border border-hair-strong px-3.5 py-2 font-data text-[10px] uppercase tracking-wider2 text-ink transition-colors duration-300 hover:border-signal-mark hover:text-signal-mark sm:text-[11px]"
            >
              <ArrowDownToLine size={13} strokeWidth={1.5} />
              Résumé
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------- hero */}
        <section className="relative min-h-[100svh] overflow-hidden">
          <OrbitalField className="absolute inset-0 h-full w-full" />

          {/* Scrim: keeps the statement at full contrast over the field. */}
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                'linear-gradient(100deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 34%, rgba(0,0,0,0.34) 62%, rgba(0,0,0,0) 88%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.88) 46%, rgba(0,0,0,0.62) 72%, rgba(0,0,0,0.42) 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
            style={{ background: 'linear-gradient(to top, #000 6%, rgba(0,0,0,0))' }}
          />

          <div className="shell relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16">
            {/* Content holds the left half; the field keeps the right. */}
            <div className="w-full lg:max-w-[700px]">
              <h1 className="max-w-[20ch] text-[clamp(2.125rem,4.6vw,3.75rem)] font-extralight leading-[1.06] tracking-[-0.02em] text-ink">
                I build full-stack products and study machine learning applications.
              </h1>

            <p className="mt-7 max-w-[52ch] text-[clamp(0.9688rem,1.15vw,1.0625rem)] font-light leading-[1.65] text-ink-2">
              Software engineer at{' '}
              <span className="text-ink">ASU’s Luminosity Lab</span>. I ship applications
              end to end and the ML infrastructure behind them,
              from a PyTorch vision system to a pipeline running across ASU’s Sol
              supercomputer. Two years of production code while enrolled full-time.
            </p>

            {/* Signature block — face, name, and what he is looking for. */}
            <div className="mt-9 flex items-center gap-4 sm:gap-5">
              <img
                src="/headshot4.webp"
                width="600"
                height="900"
                alt="Brady Deschamps"
                className="h-[72px] w-[72px] shrink-0 border border-hair-strong object-cover object-top sm:h-[88px] sm:w-[88px]"
                style={{ filter: 'contrast(1.04) saturate(0.86) brightness(0.97)' }}
              />
              <div>
                <p className="text-[1.0625rem] font-normal tracking-[0.005em] text-ink sm:text-[1.1875rem]">
                  {ME.name}
                </p>
                <p className="mt-2 flex items-center gap-2.5">
                  <span className="relative flex h-[7px] w-[7px] shrink-0">
                    <span className="beacon absolute inline-flex h-full w-full rounded-full bg-signal-mark" />
                    <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-signal-mark" />
                  </span>
                  <span className="whitespace-nowrap font-data text-[10px] uppercase tracking-wider2 text-ink-2 sm:text-[11px]">
                    Available · Summer 2027
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={ME.resume}
                download
                className="inline-flex items-center justify-center gap-2.5 bg-signal px-6 py-3.5 font-data text-[11px] uppercase tracking-wider2 text-ink transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:justify-start"
              >
                <ArrowDownToLine size={14} strokeWidth={1.75} />
                Download résumé
              </a>
              <a
                href={`mailto:${ME.email}`}
                className="inline-flex items-center justify-center gap-2.5 border border-hair-strong px-6 py-3.5 font-data text-[11px] uppercase tracking-wider2 text-ink transition-colors duration-300 hover:border-ink sm:justify-start"
              >
                <Mail size={14} strokeWidth={1.5} />
                Email me
              </a>
            </div>

            {/* Vitals — the numbers a screener checks first. */}
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-hair pt-7 sm:grid-cols-3">
              {VITALS.map((v) => (
                <div key={v.label}>
                  <dt className="label">{v.label}</dt>
                  <dd className="mt-2 whitespace-nowrap font-data text-[11px] tracking-[0.01em] text-ink tnum">
                    {v.value}
                  </dd>
                </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- what he does */}
        <section className="border-t border-hair py-24 sm:py-28">
          <div className="shell grid gap-14 md:grid-cols-2 md:gap-16">
            {CAPABILITIES.map((c) => (
              <div key={c.name} data-reveal>
                <h2 className="text-[clamp(1.375rem,2.2vw,1.75rem)] font-light tracking-[-0.015em] text-ink">
                  {c.name}
                </h2>
                <p className="mt-3 text-[0.9375rem] font-light leading-[1.6] text-ink-2">
                  {c.line}
                </p>
                <ul className="mt-7 space-y-3.5 border-t border-hair pt-6">
                  {c.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-6 text-[0.9375rem] font-light leading-[1.7] text-ink-2"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.62em] h-px w-3 bg-signal-mark/60"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
                <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                  {c.stack.map((t) => (
                    <li
                      key={t}
                      className="border border-hair px-2.5 py-1 font-data text-[10px] tracking-[0.06em] text-ink-3"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- work */}
        <section id="work" className="scroll-mt-24 border-t border-hair py-28 sm:py-36">
          <div className="shell">
            <SectionHead aside="Two systems in production">
              What I’m building
            </SectionHead>

            <div className="space-y-28 sm:space-y-36">
              {PROJECTS.map((p, i) => (
                <article key={p.id} data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative aspect-[520/348] w-full overflow-hidden border border-hair bg-ground-raised">
                      {p.shot ? (
                        <img
                          src={p.shot}
                          alt={p.shotAlt}
                          width="1600"
                          height="1071"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <>
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                'radial-gradient(120% 100% at 50% 0%, rgba(157,190,255,0.05), transparent 62%)',
                            }}
                          />
                          <PipelineDiagram />
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="label">{p.kind}</p>
                    <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2.125rem)] font-light leading-tight tracking-[-0.015em]">
                      {p.name}
                    </h3>
                    <p className="mt-4 text-[1.0625rem] font-light leading-[1.6] text-ink">
                      {p.line}
                    </p>
                    <p className="mt-5 text-[0.9375rem] font-light leading-[1.72] text-ink-2">
                      {p.body}
                    </p>

                    <dl className="mt-8 space-y-2.5 border-t border-hair pt-6">
                      {p.facts.map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-6">
                          <dt className="label">{k}</dt>
                          <dd className="font-data text-[11px] tracking-[0.02em] text-ink-2">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                      {p.stack.map((s) => (
                        <li
                          key={s}
                          className="border border-hair px-2.5 py-1 font-data text-[10px] tracking-[0.06em] text-ink-3"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-8 inline-flex items-center gap-2 font-data text-[11px] uppercase tracking-wider2 text-sky transition-colors hover:text-ink"
                      >
                        {p.hrefLabel}
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Also built — deliberately quieter than the two above. */}
            <div className="mt-28 border-t border-hair pt-10 sm:mt-36" data-reveal>
              <p className="label mb-8">Also built</p>
              <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-3">
                {ALSO.map((a) => (
                  <li key={a.name}>
                    <h4 className="text-[1.0625rem] font-normal tracking-[-0.005em] text-ink">
                      {a.name}
                    </h4>
                    <p className="mt-2.5 text-[0.9375rem] font-light leading-[1.6] text-ink-2">
                      {a.line}
                    </p>
                    <p className="mt-3 font-data text-[10px] tracking-[0.06em] text-ink-3">{a.stack}</p>
                    {a.href && (
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-3 inline-flex items-center gap-1.5 font-data text-[10px] uppercase tracking-wider2 text-sky transition-colors hover:text-ink"
                      >
                        {a.hrefLabel}
                        <ArrowUpRight size={12} strokeWidth={1.5} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- experience */}
        <section id="experience" className="scroll-mt-24 border-t border-hair py-28 sm:py-36">
          <div className="shell">
            <SectionHead aside="Continuously employed since April 2024">
              Experience
            </SectionHead>

            <div data-reveal>
              <Timeline />
            </div>

            <ol className="mt-16 space-y-16 sm:mt-20">
              {ROLES.map((role) => (
                <li
                  key={role.org}
                  id={`role-${slug(role.org)}`}
                  className="scroll-mt-28 grid gap-x-10 gap-y-4 border-t border-hair pt-8 lg:grid-cols-12"
                  data-reveal
                >
                  <div className="lg:col-span-4">
                    <h3 className="text-[1.25rem] font-normal tracking-[-0.01em] text-ink">
                      {role.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] font-light text-ink-2">{role.org}</p>
                    <p className="mt-3 font-data text-[10px] uppercase tracking-wider2 text-ink-3 tnum">
                      {role.span}
                    </p>
                    <p className="mt-1.5 font-data text-[10px] tracking-[0.06em] text-ink-3">
                      {role.place}
                    </p>
                  </div>
                  <ul className="space-y-4 lg:col-span-8">
                    {role.points.map((pt) => (
                      <li
                        key={pt}
                        className="relative pl-6 text-[0.9375rem] font-light leading-[1.72] text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.62em] h-px w-3 bg-hair-strong"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- background */}
        <section id="background" className="scroll-mt-24 border-t border-hair py-28 sm:py-36">
          <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead>Background</SectionHead>

              <div data-reveal>
                <h3 className="text-[1.25rem] font-normal text-ink">Arizona State University</h3>
                <p className="mt-2 text-[0.9375rem] font-light leading-[1.7] text-ink-2">
                  Barrett, The Honors College — BS in Computer Science, graduating May 2027,
                  continuing straight into ASU’s accelerated master’s for an MS in May 2028.
                </p>

                <dl className="mt-7 space-y-2.5 border-t border-hair pt-6">
                  {[
                    ['GPA', '4.00'],
                    ['BS conferred', 'May 2027'],
                    ['MS conferred', 'May 2028'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6">
                      <dt className="label">{k}</dt>
                      <dd className="font-data text-[11px] tracking-[0.02em] text-ink tnum">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-10 space-y-4 border-t border-hair pt-6">
                  {HONOURS.map(([name, org]) => (
                    <li key={name}>
                      <p className="text-[0.9375rem] font-normal text-ink">{name}</p>
                      <p className="mt-1 font-data text-[10px] tracking-[0.06em] text-ink-3">{org}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal>
              <p className="label mb-8">Tools</p>
              <dl className="space-y-8">
                {SKILLS.map((s) => (
                  <div key={s.group} className="grid gap-3 border-t border-hair pt-5 sm:grid-cols-4 sm:gap-6">
                    <dt className="label sm:col-span-1">{s.group}</dt>
                    <dd className="sm:col-span-3">
                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {s.items.map((item) => (
                          <li key={item} className="text-[0.9375rem] font-light text-ink-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- contact */}
        <section id="contact" className="scroll-mt-24 border-t border-hair py-28 sm:py-36">
          <div className="shell" data-reveal>
            <h2 className="max-w-[16ch] text-[clamp(2rem,5vw,3.75rem)] font-extralight leading-[1.06] tracking-[-0.02em]">
              Available for Summer 2027 internships.
            </h2>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] font-light leading-[1.62] text-ink-2">
              If you are hiring software engineering interns for Summer 2027, I would like to
              talk. Email is the fastest route.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={`mailto:${ME.email}`}
                className="inline-flex items-center justify-center gap-2.5 bg-signal px-6 py-3.5 font-data text-[10px] uppercase tracking-wider2 text-ink transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:justify-start sm:text-[11px]"
              >
                <Mail size={14} strokeWidth={1.75} />
                {ME.email}
              </a>
              <a
                href={ME.resume}
                download
                className="inline-flex items-center justify-center gap-2.5 border border-hair-strong px-6 py-3.5 font-data text-[11px] uppercase tracking-wider2 text-ink transition-colors duration-300 hover:border-ink sm:justify-start"
              >
                <ArrowDownToLine size={14} strokeWidth={1.5} />
                Download résumé
              </a>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ['LinkedIn', ME.linkedin, Linkedin],
                ['GitHub', ME.github, Github],
              ].map(([label, href, Icon]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 font-data text-[11px] uppercase tracking-wider2 text-ink-2 transition-colors hover:text-ink"
                  >
                    <Icon size={15} strokeWidth={1.5} />
                    {label}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="text-ink-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-hair py-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="font-data text-[10px] uppercase tracking-wider2 text-ink-3">
            {ME.name}
          </p>
          <p className="font-data text-[10px] uppercase tracking-wider2 text-ink-3 tnum">
            © 2026
          </p>
        </div>
      </footer>
    </>
  )
}
