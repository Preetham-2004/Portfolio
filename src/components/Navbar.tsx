import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with navbar offset
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      if (section) {
        const navbarHeight = 80; // Adjust based on your navbar height
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: sectionTop - navbarHeight,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  // Resume download function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0B0B0E]/95 shadow-md' : 'bg-[#0B0B0E]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          className="text-2xl sm:text-3xl font-bold text-gray-200 cursor-pointer hover:text-white transition-colors duration-300"
        >
          Preetham Bhat
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="relative text-gray-300 hover:text-white transition-colors duration-200 font-medium group"
            >
              {item.name}
              <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
          ))}
          <button
            onClick={downloadResume}
            className="ml-4 bg-gradient-to-r from-gray-300 to-white text-gray-900 font-semibold px-5 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
          >
            <Download size={16} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-gray-200 hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0B0B0E]/95 backdrop-blur-md px-6 py-4 space-y-4 flex flex-col items-start shadow-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="relative w-full text-left text-gray-200 font-medium text-lg hover:text-white transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            <button
              onClick={downloadResume}
              className="w-full bg-gradient-to-r from-gray-300 to-white text-gray-900 font-semibold px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
