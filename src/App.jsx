import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun, 
  Code, 
  Database, 
  Layout, 
  Server,
  Home,
  User,
  Briefcase,
  MessageSquare,
  Menu,
  X,
  Heart,
  Send,
  ChevronUp
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

// Initialize EmailJS with your public key
emailjs.init("jzvTn2sbXvuqNVUgk");

function App() {
  const formRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeInput, setActiveInput] = useState (null);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const skills = [
    { category: "Frontend", icon: <Layout className="w-6 h-6" />, items: ["React","Javascript", "TypeScript","Tailwind CSS"] },
    { category: "Backend", icon: <Server className="w-6 h-6" />, items: ["Node.js","Flask", "Python",] },
    { category: "Database", icon: <Database className="w-6 h-6" />, items: ["PostgreSQL","SQlite", ] },
    { category: "Tools", icon: <Code className="w-6 h-6" />, items: ["Git","Github", "AWS","vercel", "Linux"] }
  ];

  const projects = [
    {
      title: "Flashlearn",
      description: "A modern web application designed to help learners study",
      image: "https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-04-03/9a658be0-756e-11ea-a913-2f0af3f842f4.png",
      github: "https://github.com/John-Gaitho/flashlearn-backend",
      live: "https://flashlearn254.netlify.app"
    },
    {
      title: "Resume generator",
      description: "A desktop application to generate professional resume",
      image: "https://riseuplabs.com/wp-content/uploads/2024/01/riseuplabs-launched-resumake-insight-feature-image.jpg",
      github: "https://github.com/John-Gaitho/my-react-app",
      live: "https://my-react-app-ten-zeta.vercel.app/"
    },
    {
      title: "Kauru Dairy",
      description: "A simple Dairy website",
      image: "public/Screenshot 2025-07-09 135006 (1).PNG",
      github: "https://github.com/John-Gaitho/music-melodi-frontend-app",
      live: "https://kauru-dairy-ltd.vercel.app/"
    }

  ];

  const subjects = [
    "Job Opportunity",
    "Project Collaboration",
    "Consulting",
    "General Inquiry"
  ];

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "#home" },
    { name: "About", icon: <User size={20} />, href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact",  href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/John-Gaitho" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername" },
    { name: "Email", icon: <Mail size={20} />, href: "mailto:jgaitho@gmail.com" }
  ];

  const handleFocus = (id) => {
    setActiveInput(id);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      await emailjs.sendForm(
        'service_scql6lg', // Replace with your EmailJS service ID
        'template_0xkh2al', // Replace with your EmailJS template ID
        formRef.current,
        'jzvTn2sbXvuqNVUgk'
      );
      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('sorry something went wrong!!. feel free to use my contact down there.');
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("📨 Sending email...");
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.a
                href="#"
                className="text-2xl font-bold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                John
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Dark Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-20 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 z-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? 'dark' : 'light'}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Hero Section */}
      <motion.section 
        id="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen pt-16 flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="text-center">
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <img 
              src="https://avatars.githubusercontent.com/u/181092609?v=4"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            </motion.div>
          <motion.h4 
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          ></motion.h4>
          <motion.h4 
  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  Hi, I'm John Gaitho, a
</motion.h4>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Software Engineer
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Building functional, and scalable web applications
          </motion.p>
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a 
              href="https://github.com/John-Gaitho" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/John-Gaitho" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="mailto:jgaitho016@gmail.com" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
    
    {/* ▶️  NEW IMAGE BLOCK  ◀️ */}
    <motion.div
      className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg
                 ring-4 ring-blue-500/30 dark:ring-blue-400/30"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <img
        src="public\WhatsApp Image 2025-07-14 at 13.33.21_5b094731.jpg"          
        alt="John Gaitho portrait"
        className="w-full h-full object-cover"
      />
    </motion.div>

    {/* Text column stays the same */}
    <div>
      <motion.h2
        className="text-4xl font-bold mb-6 dark:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        I’m a passionate full‑stack developer focused on creating efficient,
        scalable, and user‑friendly solutions that solve real‑world problems.
      </motion.p>

      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        I enjoy working with modern technologies and am always eager to learn
        and adapt to new challenges in the ever‑evolving tech landscape.
      </motion.p>
    </div>
  </div>
</section>

      

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-blue-500 dark:text-blue-400">{skill.icon}</span>
                  <h3 className="text-xl font-semibold dark:text-white">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.1 }}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Some of my Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                      Code
                    </motion.a>
                    <motion.a 
                      href={project.live}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                      Live
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Get in Touch</h2>
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.input
                type="text"
                id="name"
                name="user_name"
                required
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white outline-none transition-all duration-300 ${
                  activeInput === 'name' 
                    ? 'border-blue-500 shadow-md dark:border-blue-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Name "
              />
              <label 
                htmlFor="name" 
                className={`absolute left-4 pointer-events-none transition-all duration-300 ${
                  activeInput === 'name' 
                    ? 'text-xs -top-2.5 text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 top-3'
                } ${
                  formRef.current?.user_name?.value ? 'text-xs -top-2.5' : ''
                }`}
              >
                
              </label>
            </div>
            
            <div className="relative">
              <motion.input
                type="email"
                id="email"
                name="user_email"
                required
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white outline-none transition-all duration-300 ${
                  activeInput === 'email' 
                    ? 'border-blue-500 shadow-md dark:border-blue-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Email "
              />
              <label 
                htmlFor="email" 
                className={`absolute left-4 pointer-events-none transition-all duration-300 ${
                  activeInput === 'email' 
                    ? 'text-xs -top-2.5 text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 top-3'
                } ${
                  formRef.current?.user_email?.value ? 'text-xs -top-2.5' : ''
                }`}
              >
                
              </label>
            </div>
            
            <div className="relative">
              <motion.select
                id="subject"
                name="subject"
                required
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white outline-none transition-all duration-300 ${
                  activeInput === 'subject' 
                    ? 'border-blue-500 shadow-md dark:border-blue-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </motion.select>
              <label 
                htmlFor="subject" 
                className={`absolute left-4 pointer-events-none transition-all duration-300 ${
                  activeInput === 'subject' || formRef.current?.subject?.value
                    ? 'text-xs -top-2.5 text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 top-3'
                }`}
              >
              
              </label>
            </div>
            
            <div className="relative">
              <motion.textarea
                id="message"
                name="message"
                required
                rows={4}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-700 dark:text-white outline-none transition-all duration-300 ${
                  activeInput === 'message' 
                    ? 'border-blue-500 shadow-md dark:border-blue-400' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Message "
              ></motion.textarea>
              <label 
                htmlFor="message" 
                className={`absolute left-4 pointer-events-none transition-all duration-300 ${
                  activeInput === 'message' 
                    ? 'text-xs -top-2.5 text-blue-500 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 top-3'
                } ${
                  formRef.current?.message?.value ? 'text-xs -top-2.5' : ''
                }`}
              >
                
              </label>
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} className={isSubmitting ? 'opacity-0' : 'animate-pulse'} />
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ChevronUp size={20} />
      </motion.button>

      <footer className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white py-12">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* About Column */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Portfolio <Heart size={16} className="text-red-500" />
        </h3>
        <p className="text-gray-800 dark:text-gray-300">
          Thank you for visiting my portfolio. 
        </p>
        <div className="flex gap-4 pt-2">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              aria-label={link.name}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <motion.a
                href={item.href}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ x: 8 }}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
        <div className="space-y-2 text-gray-800 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <Mail size={16} />
            <a href="mailto:jgaitho016@gmail.com" className="hover:text-gray-900 dark:hover:text-white">jgaitho016@gmail.com</a>
          </p>
          <p>Based in Nairobi, Kenya</p>
          <p>0718634116</p>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-400 dark:border-gray-700 mt-8 pt-8 text-center text-gray-700 dark:text-gray-400">
      <p>© {new Date().getFullYear()} John. All rights reserved.</p>
      <p className="text-sm mt-2">
        Crafted with <span className="text-red-500">♥</span> 
      </p>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;