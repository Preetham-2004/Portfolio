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
      <section id="contact" className="min-h-screen py-20 bg-[#0D011F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#D17BFF]/10 via-[#A179FF]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D17BFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#A179FF]/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D17BFF]/10 border border-[#D17BFF]/20 mb-6">
              <MessageCircle className="w-4 h-4 text-[#D17BFF]" />
              <span className="text-[#D17BFF] text-sm font-medium">Let's Connect</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D17BFF] via-[#A179FF] to-[#D17BFF] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#D17BFF] via-[#A179FF] to-[#D17BFF] mx-auto rounded-full mb-6" />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? Let's work together to create something amazing that makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/30 border border-white/10 hover:border-[#D17BFF]/30 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-[#D17BFF]/10 border border-white/10 text-white">
                    {info.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{info.title}</p>
                    <p className="text-sm text-gray-400">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#14052D] to-[#2B0D5C] rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#D17BFF] rounded-full" />
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D17BFF]/50 focus:ring-2 focus:ring-[#D17BFF]/20"
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D17BFF]/50 focus:ring-2 focus:ring-[#D17BFF]/20"
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
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D17BFF]/50 focus:ring-2 focus:ring-[#D17BFF]/20"
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
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D17BFF]/50 focus:ring-2 focus:ring-[#D17BFF]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D17BFF] to-[#A179FF] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#D17BFF]/90 hover:to-[#A179FF]/90 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
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

      <footer className="w-full pt-8 border-t border-white/10 text-center bg-[#0D011F] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
            <p className="text-gray-400 text-lg">
              &copy; {new Date().getFullYear()} Preetham Bhat. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="/privacy-policy" className="hover:text-[#D17BFF] transition-colors duration-300">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-[#D17BFF] transition-colors duration-300">Terms of Service</a>
              <a href="/sitemap" className="hover:text-[#D17BFF] transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
