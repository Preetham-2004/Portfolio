import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { wrap } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ChevronRight,
  Award,
  Users,
} from 'lucide-react';

interface ExperienceType {
  company: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: string;
}

interface MarqueeItem {
  title: string;
  desc: string;
}

const ScrollMarquee = ({ items }: { items: MarqueeItem[] }) => {
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const velocity = useRef(0);
  const lastScroll = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const delta = currentY - lastScroll.current;

      if (delta !== 0) {
        direction.current = delta > 0 ? 1 : -1;
        velocity.current = Math.min(Math.abs(delta) * 0.01, 0.1) * direction.current;
        lastScroll.current = currentY;
        lastUpdate.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useAnimationFrame((_, delta) => {
    const now = Date.now();
    const timeSinceLastScroll = now - lastUpdate.current;

    if (timeSinceLastScroll > 600) {
      velocity.current = 0.02 * direction.current;
    }

    baseX.set(baseX.get() + (velocity.current * delta) / 20);
  });

  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v % 100)}%`);
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex gap-6 w-max" style={{ x }}>
        {repeated.map((item, i) => (
          <div
            key={i}
            className="min-w-[250px] sm:min-w-[300px] rounded-2xl border border-white/10 bg-slate-800/70 backdrop-blur-md p-6 shadow-md mx-2 text-center"
          >
            <h4 className="text-base font-semibold text-white mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const experience: ExperienceType = {
    company: 'IBM SkillBuild',
    duration: 'July 2024 - Aug 2024',
    location: 'Mysore, India',
    description:
      'Internship focused on AI and web development. Developed a mental health web app using NLP and Dialogflow.',
    achievements: [
      'Developed an AI-powered web app for mental health using NLP, Dialogflow and MERN.',
      'Optimized database queries reducing load time by 40%',
      'Collaborated with cross-functional teams using Agile methodologies',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Dialogflow', 'NLP'],
    type: 'internship',
  };

  const extras = [
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
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="Experience"
      className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-white mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            My journey through impactful internships and innovative technologies.
          </p>
        </div>

        <motion.div
          variants={fadeUp}
          className="bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 text-white font-medium mb-1 justify-center sm:justify-start">
                <Users className="w-5 h-5 text-gray-300" />
                <span>{experience.company}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-400 text-sm justify-center sm:justify-start">
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

          <p className="text-sm sm:text-base text-gray-300 mb-6 text-left">
            {experience.description}
          </p>

          <div className="mb-6">
            <h4 className="flex items-center gap-2 text-white font-semibold mb-2 text-sm sm:text-base justify-left">
              <Award className="w-4 h-4 text-gray-400" />
              Key Achievements
            </h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base text-center sm:text-left">
              {experience.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
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
        </motion.div>

        <div className="mt-20">
          <h3 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text mb-10">
            Beyond Code & Commits
          </h3>

          <ScrollMarquee items={extras} />
        </div>
      </motion.div>
    </section>
  );
}
