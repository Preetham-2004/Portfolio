import React from 'react';
import { Code, Database, Wrench, Sparkles, Zap, Brain } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "React", level: 75 },
        { name: "JavaScript(JSX)", level: 60 },
        { name: "Next.js", level: 60 },
        { name: "Tailwind CSS", level: 92 },
        { name: "GSAP", level: 80 },
        { name: "ThreeJS", level: 40 },
        
      ]
    },
    {
      title: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "Express.js", level: 90 },
        { name: "Node.js", level: 92 },
        { name: "JWT Auth", level: 100 },
        { name: "Bcrypt.js", level: 50 },
        { name: "REST API Design", level: 92 },
        { name: "Rate Limiting & CORS", level: 65 }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "GitHub", level: 70 },
        { name: "Docker", level: 50 },
        { name: "Figma", level: 85 },
        { name: "Spline", level: 80 },
        { name: "Render", level: 80 },
        { name: "Vercel", level: 100 }
      ]
    },
    {
      title: "Core programming",
      icon: <Brain className="w-6 h-6" />,
      skills: [
        { name: "Data Structures & Algorithms", level: 40 },
        { name: "System Dssign", level: 30 },
        { name: "Java", level: 60 },
        { name: "OOPS", level: 90 },
      ]
    }
  ];

  const additionalSkills = [
    'Redux', 'Socket.io', 'Prisma', 'Radix UI', 'Vite',
    'Firebase','Framer Motion', 'Three.js', 'ShadCN',
    'LangChain.js','NextAuth','Bun'
    
  ];

  const scrollingSkills = [...additionalSkills, ...additionalSkills, ...additionalSkills];

  return (
    <section id="skills" className="min-h-screen py-20 bg-[#0D011F] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#D17BFF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#A179FF]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D17BFF]/10 border border-[#D17BFF]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#D17BFF]" />
            <span className="text-[#D17BFF] text-sm font-medium">Technical Expertise</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D17BFF] to-[#A179FF]">
            Skills & Technologies
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-[#D17BFF] to-[#A179FF] mx-auto rounded-full mb-6"></div>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build exceptional digital experiences that push boundaries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1C0E3A] to-[#2D1B55] p-6 rounded-3xl border border-[#D17BFF]/20 shadow-xl hover:shadow-purple-700/40 transition duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#D17BFF]/20 text-[#D17BFF] rounded-xl">
                  {category.icon}
                </div>
                <h3 className="text-white text-lg font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-4">
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white">{skill.name}</span>
                      <span className="text-sm text-[#D17BFF] font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#32284A] rounded-full">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D17BFF] to-[#A179FF]"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A179FF]/10 border border-[#A179FF]/20 mb-4">
            <Zap className="w-4 h-4 text-[#A179FF]" />
            <span className="text-[#A179FF] text-sm font-medium">Additional Technologies</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Expanding Horizons</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Continuously learning and exploring new technologies to stay at the forefront of development.
          </p>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0D011F] via-[#1E0D42]/50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0D011F] via-[#1E0D42]/50 to-transparent z-10"></div>

            <div className="whitespace-nowrap flex gap-4 animate-scroll">
              {scrollingSkills.map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-6 py-2 rounded-xl text-sm text-[#D17BFF] border border-[#D17BFF]/20 bg-[#1E1A2F]/60 backdrop-blur-md hover:bg-[#D17BFF]/10 transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Skills;