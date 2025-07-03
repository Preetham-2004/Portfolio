import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    setIsMobileMenuOpen(false);

    // Delay scroll until after the mobile menu animates out
    setTimeout(() => {
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Matches AnimatePresence exit transition
  };

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
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0b0124]/90 shadow-md' : 'bg-[#0b0124]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => scrollToSection('hero')}
          className="text-2xl sm:text-3xl font-semibold text-purple-400 cursor-pointer"
        >
          Preetham Bhat
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={downloadResume}
            className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
          >
            <Download size={16} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-gray-200"
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
            className="md:hidden bg-[#0b0124]/90 backdrop-blur-md px-6 py-4 space-y-4 flex flex-col items-start shadow-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left text-gray-200 font-medium text-lg hover:text-purple-400 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={downloadResume}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
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
