/**
 * Every fact here comes from the resume PDF in /public. Nothing is embellished
 * beyond it, and nothing links anywhere that does not resolve.
 */

export const ME = {
  name: 'Brady Deschamps',
  role: 'Software Engineer',
  email: 'brady.d.deschamps@gmail.com',
  github: 'https://github.com/BradyD11',
  linkedin: 'https://www.linkedin.com/in/brady-d-deschamps/',
  resume: '/Brady-Deschamps-Resume.pdf',
  seeking: 'Summer 2027 software engineering internship',
}

export const VITALS = [
  { label: 'School', value: 'ASU · Barrett Honors' },
  { label: 'Degrees', value: 'BS 2027 · MS 2028' },
  { label: 'GPA', value: '4.00' },
]

/**
 * Decimal years, so the timeline can plot real overlap rather than a tidy
 * one-after-another list. `end: null` means the role is current.
 */
export const AXIS = { start: 2024.0, end: 2027.6, now: 2026.66 }

export const ROLES = [
  {
    org: 'The Luminosity Lab',
    title: 'Software Engineer',
    place: 'Arizona State University',
    span: 'Feb 2026 — present',
    start: 2026.08,
    end: null,
    tone: 'signal',
    points: [
      'Built an automated ML inference pipeline on ASU’s Sol supercomputer, orchestrating three sequential deep learning models with SLURM job arrays and Apptainer containers, with a feedback loop that scores each run’s output and tunes the parameters for the next.',
      'Engineered a multithreaded PyTorch computer vision detection system, using parallel processing to cut inference latency on image recognition tasks.',
      'Architected and deployed a Python data pipeline that feeds NASA JPL datasets into the Orbitscape platform for real-time aerospace visualization.',
    ],
  },
  {
    org: 'SMBC',
    title: 'Information Technology Intern',
    place: 'Sumitomo Mitsui Banking Corporation',
    span: 'Jun 2026 — Aug 2026',
    start: 2026.42,
    end: 2026.58,
    tone: 'ink',
    points: [
      'Developed a full-stack port-tracking tool with React, Node, SQL and the Nlyte NGage API, cutting manual tracking work and improving inventory accuracy for datacenter operations.',
      'Monitored, documented and resolved infrastructure tickets across two enterprise datacenter locations for one of the largest foreign banks operating in the U.S.',
      'Installed and configured network devices that bridge on-premises datacenter infrastructure and cloud providers as part of a hybrid cloud architecture.',
    ],
  },
  {
    org: 'Pivotal Energy Solutions',
    title: 'Software Engineer Intern',
    place: 'Gilbert, AZ · part-time through school',
    span: 'Apr 2024 — Jun 2026',
    start: 2024.25,
    end: 2026.42,
    tone: 'sky',
    points: [
      'Refactored Python serializer validation logic into a JSON-based REST API, making data verification language-agnostic and easier to scale.',
      'Increased unit test coverage by 90% across 20+ interconnected modules with comprehensive Python test suites.',
    ],
  },
  {
    org: 'Arizona State University',
    title: 'Cybersecurity Research Assistant',
    place: 'Tempe, AZ',
    span: 'Nov 2024 — Aug 2025',
    start: 2024.83,
    end: 2025.58,
    tone: 'ink',
    points: [
      'Designed and deployed an intentionally vulnerable system to capture live attacker behavior, building behavioral intrusion profiles that trained a personalized honeypot AI model.',
    ],
  },
  {
    org: 'SCAI',
    title: 'Peer Mentor',
    place: 'School of Computing and Augmented Intelligence',
    span: 'Aug 2025 — present',
    start: 2025.58,
    end: null,
    tone: 'ink',
    points: [
      'Mentor SCAI students on coursework, technical skills and career preparation.',
    ],
  },
]

/**
 * The two disciplines Brady is hiring into, each backed by shipped work rather
 * than a self-assessment. Every line here traces to a role in ROLES.
 */
export const CAPABILITIES = [
  {
    name: 'Full-stack',
    line: 'Complete applications, from interface to API to database schema.',
    points: [
      'Built SMBC’s port-tracking tool front to back in React, Node and SQL on top of the Nlyte NGage API.',
      'Refactored Pivotal’s Python serializer validation into a JSON REST API, making verification language-agnostic.',
      'Raised unit test coverage by 90% across 20+ interconnected modules.',
    ],
    stack: ['React', 'TypeScript', 'Node', 'Django', 'SQL', 'REST'],
  },
  {
    name: 'Machine learning',
    line: 'Model training and inference infrastructure that runs at supercomputer scale.',
    points: [
      'Orchestrated three sequential deep learning models on ASU’s Sol supercomputer with SLURM job arrays and Apptainer containers.',
      'Engineered a multithreaded PyTorch computer vision detection system tuned for low inference latency.',
      'Currently applying ML to space-weather prediction within the Orbitscape platform.',
    ],
    stack: ['PyTorch', 'Python', 'SLURM', 'Apptainer', 'pandas', 'HPC'],
  },
]

export const PROJECTS = [
  {
    id: 'orbitscape',
    name: 'Orbitscape',
    kind: 'Live platform · The Luminosity Lab',
    href: 'https://orbitscape.space',
    hrefLabel: 'orbitscape.space',
    shot: '/orbitscape.webp',
    shotAlt:
      'The Orbitscape landing page: a lunar surface below a planet limb, headed “Visualize, share, and collaborate on complex mission operations”.',
    line: 'A web platform for visualizing, sharing and collaborating on complex orbital missions — from low Earth orbit to cis-lunar.',
    body: 'I architected and deployed the Python and pandas pipeline that pulls spacecraft ephemeris from NASA JPL’s Horizons system, parses it into vector data the renderer can consume, and keeps historic and current missions in sync. I’m now applying machine learning to space-weather analysis on the same platform, contributing to predictive models for orbital applications.',
    facts: [
      ['Source', 'NASA JPL Horizons'],
      ['Pipeline', 'Python · pandas'],
      ['Status', 'In production'],
    ],
    stack: ['Python', 'pandas', 'JPL Horizons', 'Machine Learning'],
  },
  {
    id: 'sol',
    name: 'Sol inference pipeline',
    kind: 'Research infrastructure · ASU supercomputer',
    href: null,
    line: 'An automated pipeline that chains three deep learning models across a supercomputer and grades its own output to steer the next run.',
    body: 'Each run fans out as a SLURM job array over Sol’s GPU nodes, with every stage packaged in an Apptainer container so each run is reproducible on whichever node it lands on. The three models execute in sequence, and a scoring pass on the final output grades the run and writes the parameters for the next iteration — so the pipeline searches the parameter space rather than simply executing.',
    facts: [
      ['Scheduler', 'SLURM job arrays'],
      ['Runtime', 'Apptainer containers'],
      ['Loop', 'Score → re-parameterize'],
    ],
    stack: ['Python', 'PyTorch', 'SLURM', 'Apptainer', 'HPC'],
  },
  {
    id: 'converten',
    name: 'Converten (fx-ledger)',
    kind: 'Open source · Haskell',
    href: 'https://github.com/BradyD11/Converten',
    hrefLabel: 'Repository',
    line: 'A multi-currency double-entry ledger where the accounting invariants are enforced by the type system and verified against real concurrency.',
    body: 'Currency is a type parameter rather than a field, so adding dollars to euros doesn’t fail a runtime check — it fails to compile, and a script verifies this by compiling the offending programs and asserting failure. Unbalanced transactions are unrepresentable: the constructor is unexported, and the only builder computes the per-currency residual and rejects anything non-zero. Transfers commit through STM so money is conserved under contention. A mutation script deliberately breaks atomicity to prove the concurrency suite can actually fail. It exposed a conservation property that still passed against the broken store, because a lost update that drops both legs still nets to zero.',
    facts: [
      ['Invariant', 'Every currency sums to zero'],
      ['Concurrency', 'STM · atomic commit'],
      ['Tests', '21 properties + mutation'],
    ],
    stack: ['Haskell', 'STM', 'Hedgehog', 'DataKinds', 'cabal'],
  },
  {
    id: 'perfin',
    name: 'PerFin (ledger-cli)',
    kind: 'Open source · Haskell + React',
    href: 'https://github.com/BradyD11/PerFin',
    hrefLabel: 'Repository',
    line: 'A personal finance tracker built around one rule: a corrupted CSV row should never silently become a wrong dollar amount in a report.',
    body: 'Money is stored as integer cents parsed directly from the digit string, never as a Double, and a row with three decimal places is rejected rather than truncated into a plausible but wrong number. Transactions have no exported constructor, so the only way to build one is through validation that rejects future dates, zero amounts and empty merchants. Re-importing a statement never double-counts: each row gets a SHA-256 id derived from its content plus an occurrence index, which real data proved necessary: 67 of 339 rows in one export were genuinely distinct transit fares that shared a date, amount and merchant. A Servant API backs a React + TypeScript review screen where categorization rules preview every line they would file, and a property test confirms the preview matches exactly what saving changes.',
    facts: [
      ['Money', 'Integer cents · no floats'],
      ['Imports', 'Idempotent · order-independent'],
      ['Tests', '138 · QuickCheck + HUnit'],
    ],
    stack: ['Haskell', 'SQLite', 'Servant', 'React', 'TypeScript', 'QuickCheck'],
  },
  {
    id: 'econometrics',
    name: 'Factor model + ML residual analysis',
    kind: 'Quantitative research · Python',
    href: 'https://github.com/BradyD11/econometrics',
    hrefLabel: 'Repository',
    line: 'Does a machine-learning model find exploitable structure in the residuals of a Fama-French 5-factor model? Short answer: no, not usefully.',
    body: 'Stage one fits rolling 60-month FF5 regressions with Newey-West errors across 30 industry portfolios, keeping residuals strictly out-of-sample so stage two isn’t trained on an artifact of the fit. Stage two predicts the next residual from features knowable at the time, using LightGBM against a ridge baseline with walk-forward tuning. The result is negative and reported as such: a weak ordering signal at rank IC ≈ +0.03 that is episodic, negative in level-R², and destroyed by realistic transaction costs. The no-look-ahead guarantee is machine-checked: a test corrupts all post-cutoff data and requires earlier features to remain bit-for-bit identical.',
    facts: [
      ['Sample', '1963-07 → 2026-07'],
      ['Stage 1', 'Rolling FF5 · Newey-West'],
      ['Verdict', 'Signal fails net of costs'],
    ],
    stack: ['Python', 'LightGBM', 'pandas', 'statsmodels', 'SHAP'],
  },
]

export const ALSO = [
  {
    name: 'CrisisConnect',
    line: 'A volunteer coordination platform with live search, filtering and Google Maps discovery.',
    stack: 'React · TypeScript · Tailwind',
    href: 'https://github.com/BradyD11/CrisisConnect',
    hrefLabel: 'Repository',
  },
  {
    name: 'Datatable Advanced Query',
    line: 'A lexer and parser for SQL-like search syntax, compiling an AST down to Django ORM queries.',
    stack: 'Python · Django · SQL',
    href: null,
  },
]

export const SKILLS = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL'] },
  { group: 'Frameworks', items: ['React', 'Django', 'PyTorch', 'Node'] },
  { group: 'Engineering', items: ['REST APIs', 'Software testing', 'CI/CD', 'ML training', 'OOP'] },
  { group: 'Infrastructure', items: ['Docker', 'Apptainer', 'SLURM / HPC', 'Cloud platforms', 'Git'] },
]

export const HONOURS = [
  ['Barrett, The Honors College', 'Arizona State University'],
  ['Tillman Leadership Scholar', 'Pat Tillman Foundation'],
  ['Grand Challenges Scholars Program', 'NAE / ASU'],
]
