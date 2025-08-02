import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  User,
  AtSign,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          'service_xbsw35k',
          'template_5era6pj',
          formRef.current,
          'HWzPZCNenEGmss9kX'
        );

        setNotification({
          type: 'success',
          message: 'Your message has been sent successfully!',
        });

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    }

    setIsSubmitting(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'preethambhat1104@gmail.com',
      link: 'mailto:preethambhat1104@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+91 8867196016',
      link: 'tel:+918867196016',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'Mysore, Karnataka, India',
      link: '#',
    },
  ];

  return (
    <>
      <section
        id="contact"
        className="min-h-screen py-20 bg-gradient-to-b from-[#0a0f1a] via-[#111a2c] to-[#162033] relative overflow-hidden"
      >
        {/* Decorative blurred glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4b5b77]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2d3b52]/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c2538]/60 border border-[#2d3b52] mb-6">
              <MessageCircle className="w-4 h-4 text-gray-300" />
              <span className="text-gray-300 text-sm font-medium">Let's Connect</span>
            </div>
            <h2 className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-white mx-auto rounded-full" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? Let's work together to create something amazing that makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#1c2538]/60 border border-[#2d3b52] hover:border-[#4b5b77] hover:bg-[#1c2538]/80 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-[#2d3b52]/40 border border-[#2d3b52] text-gray-200">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">{info.title}</p>
                    <p className="text-sm text-gray-400">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-[#1c2538] rounded-3xl p-8 border border-[#2d3b52] backdrop-blur-sm shadow-lg shadow-[#4b5b77]/10">
              <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#4b5b77] rounded-full" />
                Send Message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-[#2d3b52]/40 border border-[#2d3b52] rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#4b5b77] focus:ring-2 focus:ring-[#4b5b77]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <AtSign className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-[#2d3b52]/40 border border-[#2d3b52] rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#4b5b77] focus:ring-2 focus:ring-[#4b5b77]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project Discussion"
                    className="w-full px-4 py-3 bg-[#2d3b52]/40 border border-[#2d3b52] rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#4b5b77] focus:ring-2 focus:ring-[#4b5b77]/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project ideas, requirements, or just say hello..."
                    className="w-full px-4 py-3 bg-[#2d3b52]/40 border border-[#2d3b52] rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#4b5b77] focus:ring-2 focus:ring-[#4b5b77]/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2d3b52] to-[#4b5b77] text-gray-100 py-4 px-6 rounded-xl font-semibold hover:from-[#2d3b52]/90 hover:to-[#4b5b77]/90 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Notification Popup */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl backdrop-blur-xl border text-white flex items-center gap-4 ${
                notification.type === 'success'
                  ? 'bg-green-600/80 border-green-500'
                  : 'bg-red-600/80 border-red-500'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="w-full pt-1 border-t border-[#2d3b52] bg-gradient-to-r from-[#1c2538] via-[#162033] to-[#2d3b52] relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-center gap-2 py-3">
      <h2 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-[#e3e9f2] via-white-200 to-[#aeb2b8] bg-clip-text mb-1 tracking-wide">
        Preetham Bhat
      </h2>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Preetham-2004"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-[#2d3b52]/60 hover:bg-[#4b5b77]/80 transition-all duration-300 shadow-md hover:scale-110"
          aria-label="GitHub"
        >
          <Github size={16} className="text-gray-200" />
        </a>
        <a
          href="https://www.linkedin.com/in/preetham-bhat-p1104"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-[#2d3b52]/60 hover:bg-[#4b5b77]/80 transition-all duration-300 shadow-md hover:scale-110"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} className="text-gray-200" />
        </a>
      </div>
      <p className="text-gray-400 text-[10px] sm:text-xs mt-1 text-center px-2">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-300">Preetham Bhat</span>. All rights reserved.
      </p>
    </div>
  </div>
</footer>


    </>
  );
};

export default Contact;
