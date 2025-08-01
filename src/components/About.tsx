import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import profileVideo from '../assets/baki.1920x1080.mp4';


const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <style>
        {`
          @keyframes diagonal-gradient {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .diagonal-gradient-anim {
            background: linear-gradient(
  135deg,
  #1a1a1a,
  #2d2d2d,
  #4a4a4a,
  #6a6a6a,
  #aaaaaa,
  #6a6a6a,
  #4a4a4a,
  #2d2d2d,
  #1a1a1a
);

            background-size: 200% 200%;
            animation: diagonal-gradient 20s ease infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 w-full h-full z-0 diagonal-gradient-anim opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-white mx-auto rounded-full" />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-3/5"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
              <motion.h3
                className="text-2xl sm:text-3xl font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hi, I'm <span className="text-white">Preetham Bhat</span>
              </motion.h3>

              <motion.p
                className="text-gray-300 text-base sm:text-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Final-year Information Science Engineering student with a passion for full-stack development and clean design.
              </motion.p>

              <motion.p
                className="text-gray-400 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                I build immersive web experiences using React, Node.js, and modern JavaScript. My focus is on clean architecture, performance, and beautiful UI. Whether it's crafting frontend interfaces or architecting scalable backends, I strive for simplicity and impact. I'm also deeply invested in continuous learning, contributing to open-source, and turning innovative ideas into real-world projects.
              </motion.p>
            </div>
          </motion.div>

          {/* Video Profile Section */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-2/5 flex justify-center"
            >
              <div className="relative group w-[240px] sm:w-[280px] h-[280px] sm:h-[320px] rounded-2xl bg-gradient-to-br from-gray-800 via-gray-300 to-white p-1 shadow-xl hover:scale-105 transition-transform duration-500 border border-gray-400/30 border-[1px]">
              <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden">
                <video
                src={profileVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-slate-300/10 to-gray-100/10 blur-2xl -z-10 group-hover:blur-3xl transition duration-500" />
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
