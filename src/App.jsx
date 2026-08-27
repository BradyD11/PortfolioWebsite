import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  FileDown,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  MapPin,
  Menu,
  X,
} from 'lucide-react';

const NAV_SECTIONS = ['about', 'experience', 'projects', 'skills', 'contact'];

const EXPERIENCE = [
  {
    title: 'Information Technology Intern',
    company: 'SMBC',
    date: 'Jun 2026 - Aug 2026',
    location: 'New York, NY',
    points: [
      'Developed a full-stack port-tracking tool using React, Node, SQL, and the Nlyte NGage API, reducing manual tracking effort and improving inventory data accuracy for datacenter operations',
      'Monitored, documented, and resolved infrastructure tickets across two enterprise datacenter locations for one of the largest foreign banking institutions in the U.S., ensuring operational continuity and timely issue resolution',
      'Installed and configured new network devices bridging on-premises datacenter infrastructure with cloud service providers, collaborating with the network team to integrate hardware into hybrid cloud architecture',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'The Luminosity Lab',
    date: 'Feb 2026 - Present',
    location: 'Tempe, AZ',
    points: [
      "Built an automated ML inference pipeline on ASU's Sol supercomputer, orchestrating three sequential deep learning models with SLURM job arrays and Apptainer containers, using a feedback loop on output-scoring metrics to grade runs and direct subsequent parameters",
      'Engineered a multithreaded computer vision detection system with PyTorch and parallel processing techniques to optimize performance and reduce inference latency for image recognition tasks',
      'Architected and deployed a Python-based end-to-end data pipeline integrating NASA JPL datasets with the Orbitscape platform, enabling real-time aerospace data visualization and analysis',
    ],
  },
  {
    title: 'Software Engineer Intern (Part-time)',
    company: 'Pivotal Energy Solutions',
    date: 'Apr 2024 - Jun 2026',
    location: 'Gilbert, AZ',
    points: [
      'Refactored Python serializer validation logic into a JSON-based REST API, enabling language-agnostic data verification and improved system scalability',
      'Increased unit test code coverage by 90% across 20+ interconnected modules by writing comprehensive test suites in Python, improving reliability and maintainability',
    ],
  },
  {
    title: 'Cybersecurity Research Assistant',
    company: 'Arizona State University',
    date: 'Nov 2024 - Aug 2025',
    location: 'Tempe, AZ',
    points: [
      'Designed and deployed an intentionally vulnerable system to capture live attacker behavior, building behavioral intrusion profiles used to inform development of a personalized honeypot AI model',
    ],
  },
  {
    title: 'SCAI Peer Mentor',
    company: 'School of Computing and Augmented Intelligence',
    date: 'Aug 2025 - Present',
    location: 'Tempe, AZ',
    points: [
      'Guided students in SCAI on academic and professional development, providing technical mentorship in CS coursework and career preparation',
    ],
  },
];

const PROJECTS = [
  {
    title: 'Datatable Advanced Query',
    company: 'ICManage',
    tech: ['Python', 'Django', 'SQL'],
    description:
      'A SQL-like search syntax layered on top of the Django ORM, giving users boolean, comparison, and nested expression support without writing raw queries.',
    features: [
      'Implemented a lexer and parser for a SQL-like search syntax supporting boolean operators, comparison operators, and complex expressions',
      'Integrated with the Django ORM to translate the parsed abstract syntax tree into database queries',
    ],
  },
  {
    title: 'Orbitscape',
    company: 'Orbitscape.space',
    date: '2025 - Present',
    link: 'https://orbitscape.space',
    tech: ['Python', 'Pandas', 'Machine Learning'],
    description:
      'A space-weather analysis platform applying ML to orbital and aerospace applications, built on a production data pipeline connecting NASA JPL sources to predictive models.',
    features: [
      'Applying machine learning techniques to space weather analysis for predictive modeling of orbital and aerospace applications',
      'Built a production Python/pandas data pipeline connecting NASA JPL data sources to the platform',
    ],
  },
];

const SKILLS = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL'],
  'Frameworks & Libraries': ['React', 'Django', 'PyTorch'],
  Engineering: ['APIs', 'OOP', 'Software Testing', 'ML Model Training', 'CI/CD'],
  'Cloud & Infrastructure': ['Docker', 'Cloud Platforms', 'Datacenter Operations'],
  Tooling: ['Git', 'GitHub'],
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-400/30 selection:text-white">
      {/* Background grid + glow */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="fixed -z-10 top-[-10%] left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] bg-cyan-500/10 blur-[120px] rounded-full" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="font-mono text-lg font-semibold text-white tracking-tight"
          >
            brady<span className="text-cyan-400">.</span>dev
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize text-sm font-medium transition-colors ${
                  activeSection === section ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {section}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors"
            >
              <FileDown size={16} />
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-slate-200"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col space-y-4">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="capitalize text-left text-slate-300 hover:text-white"
              >
                {section}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md bg-cyan-400 text-slate-950 w-fit"
            >
              <FileDown size={16} />
              Resume
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl w-full grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6 text-sm font-mono text-cyan-400">
              <span className="inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              open to SWE internships &amp; new-grad roles &middot; NYC
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Brady Deschamps
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-2xl">
              Software Engineer &amp; CS BS/MS candidate at Arizona State University.
            </p>
            <p className="text-base md:text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed">
              I build ML evaluation pipelines, data pipelines, and API-driven systems &mdash;
              from SLURM-orchestrated inference on a supercomputer to production REST APIs.
              Currently looking for backend / full-stack SWE opportunities in NYC.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('experience')}
                className="px-6 py-3 rounded-md bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition-colors"
              >
                View Experience
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 rounded-md border border-white/15 text-slate-200 font-semibold hover:border-cyan-400/60 hover:text-white transition-colors"
              >
                Get In Touch
              </button>
            </div>
            <div className="flex gap-4 mt-10">
              <a
                href="mailto:brady.d.deschamps@gmail.com"
                aria-label="Email"
                className="p-3 rounded-full border border-white/10 hover:border-cyan-400/60 hover:text-cyan-400 transition-all"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/BradyD11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full border border-white/10 hover:border-cyan-400/60 hover:text-cyan-400 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/brady-d-deschamps/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full border border-white/10 hover:border-cyan-400/60 hover:text-cyan-400 transition-all"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <img src="/headshot.jpeg" alt="Brady Deschamps" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="01" title="About" />
          <div className="grid md:grid-cols-2 gap-10">
            <p className="text-slate-400 leading-relaxed text-lg">
              I'm a Computer Science BS/MS candidate at Arizona State University (4.0 GPA) with hands-on
              experience building automated ML evaluation pipelines, Python data pipelines, and API-driven
              software. I like designing build-run-evaluate-iterate workflows, and I've worked across
              computer vision, software testing, and both cloud and high-performance computing environments
              &mdash; alongside cybersecurity research focused on attacker behavior.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <GraduationCap className="text-cyan-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="text-white font-semibold">Arizona State University</h3>
                  <p className="text-slate-400 text-sm">BS Computer Science &middot; GPA 4.0</p>
                  <p className="text-slate-500 text-sm">Aug 2024 - May 2027</p>
                  <p className="text-slate-500 text-sm mt-1">
                    Coursework: Data Structures &amp; Algorithms, Database Management, Software Engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="text-cyan-400 flex-shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="text-white font-semibold">Achievements</h3>
                  <ul className="text-slate-400 text-sm space-y-1 mt-1">
                    <li>Barrett, The Honors College</li>
                    <li>Tillman LTA Scholar</li>
                    <li>Grand Challenges Scholars Program</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="02" title="Experience" />
          <div className="space-y-6">
            {EXPERIENCE.map((job, index) => (
              <div
                key={index}
                className="group rounded-xl border border-white/10 bg-slate-900/40 p-6 hover:border-cyan-400/40 hover:bg-slate-900/70 transition-all"
              >
                <div className="flex items-start gap-4">
                  <Briefcase className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        <p className="text-cyan-400/90 text-sm font-medium">{job.company}</p>
                      </div>
                      <div className="text-slate-500 text-sm md:text-right font-mono">
                        <p>{job.date}</p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin size={12} /> {job.location}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-slate-400 text-sm leading-relaxed">
                      {job.points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-cyan-400/70 mt-1">&raquo;</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="03" title="Projects" />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-slate-900/40 p-6 hover:border-cyan-400/40 hover:bg-slate-900/70 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <Code2 className="text-cyan-400" size={26} />
                  {project.company && (
                    <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full text-slate-300 font-mono">
                      {project.company}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                {project.date && <p className="text-xs text-slate-500 font-mono mb-3">{project.date}</p>}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-cyan-400/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <ul className="space-y-2 text-sm text-slate-500 mt-auto">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-cyan-400/70">&raquo;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="04" title="Skills" />
          <div className="grid sm:grid-cols-2 gap-8">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-mono text-cyan-400 mb-3 uppercase tracking-wide">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm bg-slate-900/60 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 hover:border-cyan-400/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading eyebrow="05" title="Let's Connect" center />
          <p className="text-lg text-slate-400 mb-10">
            I'm actively looking for software engineering internships and new-grad roles in NYC.
            Feel free to reach out &mdash; I'd love to talk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:brady.d.deschamps@gmail.com"
              className="flex items-center gap-2 bg-cyan-400 text-slate-950 font-semibold px-8 py-3.5 rounded-md hover:bg-cyan-300 transition-colors w-full sm:w-auto justify-center"
            >
              <Mail size={18} />
              brady.d.deschamps@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/brady-d-deschamps/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/15 text-slate-200 font-semibold px-8 py-3.5 rounded-md hover:border-cyan-400/60 hover:text-white transition-colors w-full sm:w-auto justify-center"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-slate-600 text-sm font-mono">
          <p>&copy; 2026 Brady Deschamps &middot; Built with React &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className="font-mono text-cyan-400 text-sm">{eyebrow}</span>
      <h2 className={`text-3xl md:text-4xl font-bold text-white mt-2 flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
        {title}
        <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
      </h2>
    </div>
  );
}
