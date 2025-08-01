import React from 'react';
import {
  ExternalLink,
  Github,
  Smartphone,
  Database,
  Palette,
  ChevronRight
} from 'lucide-react';
import ecosnapImg from '../assets/ecosnap.png';
import PennypilotImg from '../assets/PennyPilot.png';
import EsportsImg from '../assets/Esports.jpg';
import newImg from '../assets/new.png'; // Placeholder for the new image

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'EcoSnap',
      description:
        'An AI powered web app for real-time waste management and recycling based on your location and preferences.',
      image: ecosnapImg,
      technologies: ['React+Vite', 'TailwindCSS', 'FastAPI'],
      category: 'fullstack',
      githubUrl: 'https://github.com/Preetham-2004/EcoSnap',
      featured: true,
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'PennyPilot',
      description:
        'A visually engaging personal expense tracker with interactive charts and animations to visualize spending habits.',
      image: PennypilotImg,
      technologies: ['React', 'TailwindCSS', 'Framer Motion & GSAP'],
      category: 'frontend',
      githubUrl: 'https://github.com/Preetham-2004/PennyPilot',
      demoUrl: 'https://pennypilot-frontend.onrender.com',
      featured: true,
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'match-alert-microservice',
      description:
        'A project that is focused on providing real-time match alerts for Esports athletes where they can create separate roomIDs to play a tournament.',
      image: EsportsImg,
      technologies: ['Node', 'Express', 'Docker', 'RabbitMQ'],
      category: 'mobile',
      githubUrl: 'https://github.com/Preetham-2004/match-alert-microservices',
      featured: true,
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'CleanCode',
      description:
        'An AI powered web app for real-time code review and real-time suggestion.',
      image: newImg,
      technologies: ['Node', 'Express', 'React+Vite', 'Gemini AI'],
      category: 'mobile',
      githubUrl: 'https://github.com/Preetham-2004/CleanCode',
      demoUrl: 'https://cleancode-1-fi1m.onrender.com',
      featured: true,
      icon: <Smartphone className="w-5 h-5" />
    }
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-b from-[#0a0f1a] via-[#111a2c] to-[#162033] text-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2538]/60 border border-[#2d3b52] mb-6">
            <Palette className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-400">My Work</span>
          </div>
          <h2
            className="text-5xl md:text-5xl font-bold mb-6 
                       bg-gradient-to-r from-gray-200 to-gray-400 
                       bg-clip-text text-transparent"
          >
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-white mx-auto rounded-full"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore my projects highlighting design, development, and performance.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl overflow-hidden 
                         border border-[#2d3b52] bg-[#1c2538] 
                         hover:border-[#4b5b77] transition-all duration-500 
                         hover:-translate-y-1 shadow-md w-full max-w-xs mx-auto"
            >
              {/* Project Image */}
              <div className="relative h-36 overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Project Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#2d3b52]/40 text-gray-300 rounded-md text-xs border border-[#2d3b52]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#2d3b52]/50 text-gray-300 rounded-lg hover:bg-[#4b5b77] hover:text-white transition-all duration-300 text-xs font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#4b5b77]/60 text-gray-200 rounded-lg hover:bg-[#5b6b88] transition-all duration-300 text-xs font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
