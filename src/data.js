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
      'Built an automated ML inference pipeline on ASU’s Sol supercomputer, orchestrating three sequential deep learning models with SLURM job arrays and Apptainer containers, using a feedback loop on output-scoring metrics to grade runs and direct subsequent parameters.',
      'Engineered a multithreaded computer vision detection system with PyTorch and parallel processing to reduce inference latency for image recognition tasks.',
      'Architected and deployed a Python data pipeline integrating NASA JPL datasets with the Orbitscape platform, enabling real-time aerospace data visualization.',
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
      'Developed a full-stack port-tracking tool with React, Node, SQL and the Nlyte NGage API, reducing manual tracking effort and improving inventory accuracy for datacenter operations.',
      'Monitored, documented and resolved infrastructure tickets across two enterprise datacenter locations for one of the largest foreign banking institutions in the U.S.',
      'Installed and configured network devices bridging on-premises datacenter infrastructure with cloud providers, integrating hardware into a hybrid cloud architecture.',
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
      'Refactored Python serializer validation logic into a JSON-based REST API, enabling language-agnostic data verification and improving scalability.',
      'Increased unit test coverage by 90% across 20+ interconnected modules by writing comprehensive Python test suites.',
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
      'Designed and deployed an intentionally vulnerable system to capture live attacker behaviour, building behavioural intrusion profiles used to inform a personalized honeypot AI model.',
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
      'Mentors SCAI students on coursework, technical development and career preparation.',
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
    line: 'Applications end to end — interface, API and schema.',
    points: [
      'Built SMBC’s port-tracking tool front to back in React, Node and SQL against the Nlyte NGage API.',
      'Refactored Pivotal’s Python serializer validation into a JSON REST API, making verification language-agnostic.',
      'Raised unit test coverage 90% across 20+ interconnected modules.',
    ],
    stack: ['React', 'TypeScript', 'Node', 'Django', 'SQL', 'REST'],
  },
  {
    name: 'Machine learning',
    line: 'Training and inference infrastructure that runs at cluster scale.',
    points: [
      'Orchestrates three sequential deep learning models across ASU’s Sol supercomputer with SLURM job arrays and Apptainer containers.',
      'Engineered a multithreaded PyTorch computer-vision detection system tuned to cut inference latency.',
      'Applying ML techniques to space-weather prediction inside the Orbitscape platform.',
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
    body: 'I architected and deployed the Python and pandas pipeline that pulls spacecraft ephemeris from NASA JPL’s Horizons system, parses it into vector data the renderer can consume, and keeps historic and current missions in sync. I am now applying machine learning techniques to space-weather analysis inside the same platform, contributing to predictive modelling for orbital applications.',
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
    body: 'Each run fans out as a SLURM job array over Sol’s GPU nodes, with every stage sealed in an Apptainer container so a run is reproducible on any node it lands on. The three models execute in sequence, and a scoring pass on the final output grades the run and writes the parameters for the next iteration — so the pipeline searches rather than simply executes.',
    facts: [
      ['Scheduler', 'SLURM job arrays'],
      ['Runtime', 'Apptainer containers'],
      ['Loop', 'Score → re-parameterize'],
    ],
    stack: ['Python', 'PyTorch', 'SLURM', 'Apptainer', 'HPC'],
  },
]

export const ALSO = [
  {
    name: 'CrisisConnect',
    line: 'Volunteer coordination platform with live search, filtering and Google Maps discovery.',
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
  {
    name: 'sunpath',
    line: 'Solar position and path visualization in the browser.',
    stack: 'TypeScript · Vite',
    href: 'https://github.com/BradyD11/sunpath',
    hrefLabel: 'Repository',
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
