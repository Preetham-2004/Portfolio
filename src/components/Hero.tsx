import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#10002b] to-[#240046]">
      
      {/* Spline with controlled brightness */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Suspense>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="transform scale-150 filter brightness-150 saturate-150 opacity-80">
              <Spline scene="https://prod.spline.design/TNj1cKJWzN1C5brt/scene.splinecode" />
            </div>
          </motion.div>
        </Suspense>
      </div>

      {/* Slight dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Crafting Digital Dreams,<br />
          One Line at a Time.
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Web Developer | Java Enthusiast
        </motion.p>
        
        <motion.div 
          className="flex space-x-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="https://github.com/Preetham-2004" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-fuchsia-400 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.588 2 12.153c0 4.462 2.865 8.233 6.839 9.567.5.092.682-.221.682-.49 0-.241-.009-.882-.014-1.732-2.782.616-3.369-1.37-3.369-1.37-.454-1.174-1.11-1.486-1.11-1.486-.908-.638.069-.625.069-.625 1.003.072 1.53 1.053 1.53 1.053.892 1.556 2.341 1.106 2.91.845.092-.664.35-1.106.636-1.36-2.22-.26-4.555-1.145-4.555-5.09 0-1.125.39-2.043 1.03-2.763-.104-.262-.447-1.313.098-2.737 0 0 .84-.275 2.75 1.05A9.483 9.483 0 0112 6.845c.852.004 1.71.115 2.51.336 1.91-1.325 2.75-1.05 2.75-1.05.546 1.424.202 2.475.098 2.737.64.72 1.03 1.638 1.03 2.763 0 3.955-2.339 4.827-4.566 5.083.36.31.68.922.68 1.855 0 1.338-.012 2.418-.012 2.747 0 .272.18.586.688.486C19.135 20.384 22 16.615 22 12.153 22 6.588 17.523 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/preetham-bhat-p1104/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7 0h4.8v2.2h.07c.67-1.28 2.3-2.62 4.73-2.62 5.06 0 6 3.32 6 7.63V24h-5v-7.6c0-1.82-.03-4.17-2.54-4.17-2.54 0-2.93 1.98-2.93 4.03V24h-5V8z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-fuchsia-400 hover:text-purple-400 transition-colors duration-200" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;