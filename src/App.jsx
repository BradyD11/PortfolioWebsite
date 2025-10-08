import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, GraduationCap, Award, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Brady Deschamps
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-emerald-600 transition-colors ${activeSection === section ? 'text-emerald-600 font-semibold' : 'text-slate-700'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-teal-200/40 rounded-full blur-3xl bottom-20 right-20 animate-pulse delay-1000"></div>
        </div>
        <div className="z-10 max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                {/* Main photo placeholder */}
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-white shadow-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <img src="/SeniorPhoto.jpeg" alt="Brady Deschamps" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full -z-10"></div>
              </div>
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left order-2 md:order-1">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-semibold mb-4">
                  Software Developer
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                Brady Deschamps
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-xl">
                Computer Science student at ASU, building innovative solutions and exploring the frontiers of cybersecurity and AI
              </p>
              <div className="flex justify-center md:justify-start space-x-4 mb-12">
                <a href="mailto:brady.d.deschamps@gmail.com" className="p-3 bg-emerald-100 hover:bg-emerald-200 rounded-full transition-all hover:scale-110 text-emerald-700">
                  <Mail size={24} />
                </a>
                <a href="https://github.com/BradyD11" target="_blank" rel="noopener noreferrer" className="p-3 bg-emerald-100 hover:bg-emerald-200 rounded-full transition-all hover:scale-110 text-emerald-700">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/brady-d-deschamps/" target="_blank" rel="noopener noreferrer" className="p-3 bg-emerald-100 hover:bg-emerald-200 rounded-full transition-all hover:scale-110 text-emerald-700">
                  <Linkedin size={24} />
                </a>
              </div>
              <button
                onClick={() => scrollToSection('about')}
                className="animate-bounce text-emerald-600"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
            <div className="flex items-start space-x-4 mb-6">
              <GraduationCap className="text-emerald-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-slate-800">Education</h3>
                <p className="text-slate-600">Arizona State University | Computer Science</p>
                <p className="text-emerald-600 font-semibold">GPA: 4.0 | Aug 2024 - May 2027</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mb-6">
              <Award className="text-teal-600 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-slate-800">Achievements</h3>
                <ul className="text-slate-600 space-y-1">
                  <li>• Grand Challenges Scholars Program</li>
                  <li>• Tillman Leadership Scholar</li>
                  <li>• SCAI Peer Mentor</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Aspiring Software Developer with hands-on experience from an internship at Pivotal Energy Solutions, 
              where I improved unit test coverage and reduced technical debt. I'm passionate about cybersecurity, 
              AI, and building innovative solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Software Engineer Intern",
                company: "Pivotal Energy Solutions",
                date: "Apr 2024 - Present",
                location: "Gilbert, AZ",
                points: [
                  "Increased unit test code coverage by 90% across 20+ interconnected modules by writing comprehensive test suites in Python",
                  "Refactored legacy code and removed over 5000 lines of outdated code, reducing technical debt"
                ]
              },
              {
                title: "Cybersecurity Research Assistant",
                company: "Arizona State University",
                date: "Nov 2024 - Present",
                location: "Tempe, AZ",
                points: [
                  "Developed a virtual test environment in Pwn College to collect and analyze attacker data",
                  "Provided insights for building an attacker-personalized AI model"
                ]
              },
              {
                title: "SCAI Peer Mentor",
                company: "Arizona State University",
                date: "Aug 2025 - Present",
                location: "Tempe, AZ",
                points: [
                  "Guided students in software development and cybersecurity career paths",
                  "Provided academic and professional advice leading to improved student performance"
                ]
              },
              {
                title: "Code Coach",
                company: "theCoderSchool",
                date: "Jan 2024 - Aug 2024",
                location: "Gilbert, AZ",
                points: [
                  "Taught programming concepts (Python, JavaScript, Scratch) to students aged 7-17",
                  "Fostered a positive learning environment encouraging creativity and problem-solving"
                ]
              }
            ].map((job, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4">
                  <Briefcase className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-700">{job.title}</h3>
                        <p className="text-lg text-slate-800">{job.company}</p>
                      </div>
                      <div className="text-slate-500 text-sm md:text-right">
                        <p>{job.date}</p>
                        <p>{job.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                      {job.points.map((point, i) => (
                        <li key={i}>• {point}</li>
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
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "CrisisConnect",
                date: "Sep 2025",
                tech: ["React", "TypeScript", "Google Maps API", "Tailwind CSS"],
                description: "Full-stack volunteer coordination platform connecting users with local crisis response opportunities",
                features: [
                  "Real-time search and filtering",
                  "Interactive mapping with Google Maps API",
                  "Location-based discovery"
                ]
              },
              {
                title: "Datatable Advanced Query",
                company: "ICManage",
                tech: ["Python", "Django", "SQL"],
                description: "Advanced query system with SQL-like syntax for database operations",
                features: [
                  "Implemented lexer and parser for SQL-like search syntax",
                  "Support for boolean and comparison operators",
                  "Django ORM integration"
                ]
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <Code className="text-emerald-600" size={32} />
                  {project.company && (
                    <span className="text-xs bg-emerald-200 px-2 py-1 rounded-full text-emerald-700 font-semibold">
                      {project.company}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-slate-800">{project.title}</h3>
                {project.date && <p className="text-sm text-slate-500 mb-3">{project.date}</p>}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-white/80 px-3 py-1 rounded-full text-slate-700 border border-emerald-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  {project.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "TypeScript", "JavaScript", "Python", "Java",
              "C++", "React", "Angular", "Django",
              "SQL", "Git", "APIs", "OOP"
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-emerald-100 hover:border-emerald-400 hover:shadow-lg hover:scale-105 transition-all"
              >
                <span className="font-semibold text-slate-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:brady.d.deschamps@gmail.com"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            <a
              href="tel:+14803132688"
              className="flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-8 py-4 rounded-full hover:bg-emerald-200 transition-all"
            >
              <span>(480) 313-2688</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-emerald-100 bg-white/50">
        <div className="max-w-6xl mx-auto text-center text-slate-500">
          <p>© 2025 Brady Deschamps. Built with React and Tailwind CSS.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}