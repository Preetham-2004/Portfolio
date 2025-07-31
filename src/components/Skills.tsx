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
      title: "Core Programming",
      icon: <Brain className="w-6 h-6" />,
      skills: [
        { name: "DSA", level: 40 },
        { name: "System Design", level: 30 },
        { name: "Java", level: 60 },
        { name: "OOPS", level: 90 },
      ]
    }
  ];

  const additionalSkills = [
    'Redux', 'Socket.io', 'Prisma', 'Radix UI', 'Vite',
    'Firebase', 'Framer Motion', 'Three.js', 'ShadCN',
    'LangChain.js', 'NextAuth', 'Bun'
  ];

  const scrollingSkills = [...additionalSkills, ...additionalSkills];

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-gradient-to-b from-[#0a0f1a] via-[#111a2c] to-[#162033] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2538]/60 border border-[#2d3b52] mb-6">
            <Sparkles className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300 text-sm font-medium">Technical Expertise</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-white mx-auto rounded-full"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build exceptional digital experiences that push boundaries.
          </p>
        </div>

        {/* Skill Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const sortedSkills = [...category.skills].sort((a, b) => b.level - a.level);
            return (
              <div
                key={index}
                className="bg-[#1c2538] border border-[#2d3b52] hover:border-[#4b5b77]
                           rounded-xl p-4 shadow-md hover:shadow-[#4b5b77]/20 
                           transition-all duration-300 flex flex-col items-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#2d3b52]/50 text-gray-300 rounded-xl">
                    {category.icon}
                  </div>
                  <h3 className="text-gray-200 text-base font-semibold text-center">{category.title}</h3>
                </div>

                <div className="flex flex-col items-center">
                  {sortedSkills.map((skill, i) => (
                    <React.Fragment key={i}>
                      <div className="w-44 px-3 py-1.5 bg-[#2d3b52]/40 border border-[#2d3b52] text-gray-200 rounded-md shadow-sm flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      {i !== sortedSkills.length - 1 && (
                        <div className="h-3 w-1 bg-[#2d3b52]/40 my-1"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Scroller */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2538]/60 border border-[#2d3b52] mb-4">
            <Zap className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300 text-sm font-medium">Additional Technologies</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-200 mb-4">Expanding Horizons</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Continuously learning and exploring new technologies to stay at the forefront of development.
          </p>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0f1a] via-[#111a2c]/60 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0f1a] via-[#111a2c]/60 to-transparent z-10"></div>

            <div className="whitespace-nowrap flex gap-4 animate-scroll">
              {scrollingSkills.map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-6 py-2 rounded-xl text-sm text-gray-200 border border-[#2d3b52] bg-[#1c2538]/60 hover:bg-[#2d3b52]/50 transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling animation */}
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
