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
      className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-white mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            My journey through impactful internships and innovative technologies.
          </p>
        </div>

        {/* Experience Card */}
        <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 transition duration-500 hover:shadow-2xl hover:shadow-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-white font-medium mb-1">
                <Users className="w-5 h-5 text-gray-300" />
                <span>{experience.company}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-gray-500 w-6 h-6 hidden sm:block" />
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-6">{experience.description}</p>

          {/* Achievements */}
          <div className="mb-6">
            <h4 className="flex items-center gap-2 text-white font-semibold mb-2 text-sm sm:text-base">
              <Award className="w-4 h-4 text-gray-400" />
              Key Achievements
            </h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
              {experience.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs sm:text-sm bg-slate-700 text-white rounded-full border border-white/10 shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Beyond Code Section */}
        <div className="mt-20">
          <h3 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text mb-10">
            Beyond Code & Commits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Freelancing',
                desc: 'Built websites and UI/UX designs for YouTubers and clients. Delivered clean UIs and scalable solutions.',
              },
              {
                title: 'Open Source',
                desc: 'Contributed to projects on GitHub. Learned through collaboration and built in public.',
              },
              {
                title: 'Continuous Growth',
                desc: 'Always learning — new frameworks, new technologies, and other fields apart from web.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-800/70 backdrop-blur-md p-6 hover:bg-slate-700 transition duration-300 shadow-md"
              >
                <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
