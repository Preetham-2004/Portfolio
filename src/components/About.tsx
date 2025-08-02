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
              #0f0f0f,
              #1a1a1a,
              #2f2f2f,
              #4f4f4f,
              #aaaaaa,
              #4f4f4f,
              #2f2f2f,
              #1a1a1a,
              #0f0f0f
            );
            background-size: 200% 200%;
            animation: diagonal-gradient 20s ease infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 w-full h-full z-0 diagonal-gradient-anim opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Responsive layout */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/3 w-full"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-xl text-left">
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-white">
                Hi, I'm <span className="text-white">Preetham Bhat</span>
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                Final-year Information Science Engineering student with a passion for full-stack development and clean design.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                I build immersive web experiences using React, Node.js, and modern JavaScript. My focus is on clean architecture, performance, and beautiful UI. Whether it's crafting frontend interfaces or architecting scalable backends, I strive for simplicity and impact. I'm also deeply invested in continuous learning, contributing to open-source, and turning innovative ideas into real-world projects.
              </p>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] rounded-full relative"
          >
            <div className="w-full h-full rounded-full p-[4px] bg-gradient-to-br from-black via-white to-gray-400 shadow-lg">
              <div className="rounded-full overflow-hidden w-full h-full bg-black">
                <video
                  src={profileVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full blur-3xl opacity-20 md:opacity-30 bg-gradient-to-br from-black via-white to-gray-400 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
