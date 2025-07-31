import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profilePic from '../assets/profile.jpg';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-white mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Bio Section - Made narrower to fit side by side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="bg-slate-800/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg">
              <motion.h3
                className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hi, I am Preetham Bhat
              </motion.h3>

              <motion.p
                className="text-base sm:text-lg font-normal mb-4 sm:mb-6 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Final year Information Science Engineering student.
              </motion.p>

              <motion.p
                className="text-gray-300 mb-5 sm:mb-6 leading-relaxed text-base sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                I craft immersive web applications with deep expertise in both frontend and backend development, leveraging React, Node.js, and JSX to deliver sleek, high-performance experiences. Passionate about clean architecture and elegant design, I consistently explore new technologies, contribute to open-source, and push the boundaries of what's possible on the web.
              </motion.p>

              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {['Full-stack Web', 'Java'].map((tech, idx) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-1.5 bg-slate-700 text-white rounded-full text-sm sm:text-base font-semibold border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image - Made to appear side by side on medium screens and up */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative group w-[280px] sm:w-[350px] h-[350px] sm:h-[400px] rounded-3xl bg-gradient-to-br from-slate-500 via-slate-300 to-white p-1 shadow-2xl">
              <div className="w-full h-full rounded-3xl bg-slate-950 overflow-hidden">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-slate-300/10 to-gray-100/10 blur-2xl -z-10 group-hover:blur-3xl transition duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;