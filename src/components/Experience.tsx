import React from 'react';
import { Calendar, MapPin, ChevronRight, Award, Users } from 'lucide-react';

export default function Experience() {
  const experience = {
    company: 'IBM SkillBuild',
    duration: 'July 2024 - Aug 2024',
    location: 'Mysore, India',
    description:
      'Developed an AI-powered web app for mental health using NLP, Dialogflow and MERN.',
    achievements: [
      'Optimized database queries reducing load time by 40%',
      'Collaborated with cross-functional teams using Agile methodologies',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Dialogflow', 'NLP'],
    type: 'internship',
  };

  return (
    <section
      id="Experience"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#180026] via-[#11001e] to-[#0a0012] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 px-2">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400 mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            My journey through impactful internships and innovative technologies.
          </p>
        </div>

        {/* Experience Card */}
        <div className="relative">
          {/* Timeline Dot */}
          <div className="absolute left-4 sm:left-6 top-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-[#0a0012]"></div>

          <div className="ml-10 sm:ml-20">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-purple-400 font-semibold">{experience.company}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-gray-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 hidden sm:block" />
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">{experience.description}</p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Award className="w-4 h-4 text-purple-400" />
                  Key Achievements
                </h4>
                <ul className="space-y-2 pl-1">
                  {experience.achievements.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <h3 className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400 mb-10">
            Beyond Code & Commits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Freelancing */}
            <div className="rounded-2xl border border-purple-500/10 bg-slate-800/50 p-6 backdrop-blur-sm hover:bg-slate-800/70 transition duration-300">
              <h4 className="text-base font-semibold text-purple-300 mb-2">Freelancing</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Built websites and UI/UX designs for YouTubers and clients. Delivered clean UIs and scalable solutions.
              </p>
            </div>

            {/* Open Source */}
            <div className="rounded-2xl border border-purple-500/10 bg-slate-800/50 p-6 backdrop-blur-sm hover:bg-slate-800/70 transition duration-300">
              <h4 className="text-base font-semibold text-purple-300 mb-2">Open Source</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Contributed to projects on GitHub. Learned through collaboration and built in public.
              </p>
            </div>

            {/* Personal Growth */}
            <div className="rounded-2xl border border-purple-500/10 bg-slate-800/50 p-6 backdrop-blur-sm hover:bg-slate-800/70 transition duration-300">
              <h4 className="text-base font-semibold text-purple-300 mb-2">Continuous Growth</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Always learning — new frameworks, new technologies and other fields apart from web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
