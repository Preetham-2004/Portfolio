import React from 'react';
import { ExternalLink, Github, Smartphone, Database, Palette, ChevronRight } from 'lucide-react';
import ecosnapImg from '../assets/ecosnap.png';
import PennypilotImg from '../assets/PennyPilot.png';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "EcoSnap",
      description: "An AI powered web app for real-time waste management and recycling based on your location and preferences.",
      image: ecosnapImg,
      technologies: ["React+Vite", "TailwindCSS", "FastAPI"],
      category: "fullstack",
      githubUrl: "https://github.com/Preetham-2004/EcoSnap",
      featured: true,
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 2,
      title: "PennyPilot",
      description: "A visually engaging personal expense tracker with interactive charts and animations to visualize spending habits.",
      image: PennypilotImg,
      technologies: ["React", "TailwindCSS", "Framer Motion & GSAP"],
      category: "frontend",
      githubUrl: "#",
      featured: true,
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: 3,
      title: "E-Commerce",
      description: "Secure mobile banking with biometric auth, transaction history, and real-time alerts.",
      image: "https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React Native", "Firebase", "TypeScript"],
      category: "mobile",
      githubUrl: "#",
      featured: true,
      icon: <Smartphone className="w-5 h-5" />
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 bg-gradient-to-br from-[#0D011F] via-[#18042F] to-[#0D011F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D17BFF]/10 border border-[#D17BFF]/20 mb-6">
            <Palette className="w-4 h-4 text-[#D17BFF]" />
            <span className="text-[#D17BFF] text-sm font-medium">My Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D17BFF] to-[#A179FF] bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#D17BFF] to-[#A179FF] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore my projects highlighting design, development, and performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#1B063F]/60 hover:border-[#D17BFF]/40 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-purple-900/40"
            >
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D011F] via-transparent to-transparent"></div>
                
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#D17BFF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#D17BFF]/20 text-[#D17BFF] rounded-md text-xs border border-[#D17BFF]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B063F]/50 text-gray-300 rounded-xl hover:bg-[#1B063F]/70 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/Preetham-2004?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#A179FF] to-[#D17BFF] text-white rounded-2xl hover:from-[#A179FF]/90 hover:to-[#D17BFF]/90 transition-all duration-300 font-semibold text-lg group cursor-pointer"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-gray-400 mt-4">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
