import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => scrollToSection('hero')}
          className="text-3xl font-semibold text-purple-400 cursor-pointer mr-auto"
        >
          Preetham Bhat
        </div>

        <div className="hidden md:flex items-center space-x-10 ml-auto">
          {navItems.map(item => (
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
            className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
          >
            <Download size={16} />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
