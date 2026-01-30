"use client";

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vibhor.janey@gmail.com",
      href: "mailto:vibhor.janey@gmail.com",
      color: "text-primary"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(765) 637-1295",
      href: "tel:+17656371295",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "East Brunswick, NJ",
      href: "https://maps.google.com/?q=East+Brunswick,NJ",
      color: "text-accent"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Vibz28",
      color: "hover:text-primary hover:border-primary"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vibhorjaney/",
      color: "hover:text-secondary hover:border-secondary"
    },
    {
      icon: MessageSquare,
      label: "Email",
      href: "mailto:vibhor.janey@gmail.com",
      color: "hover:text-accent hover:border-accent"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const to = 'vibhor.janey@gmail.com';
    const subject = encodeURIComponent(formData.subject.trim() || `Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    
    // Use anchor element for better mailto compatibility
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${to}?subject=${subject}&body=${body}`;
    mailtoLink.click();
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-charcoal relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent" />
            <span className="font-mono text-sm text-secondary">05</span>
            <div className="h-px flex-1 bg-gradient-to-l from-secondary/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center">Get In Touch</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Let's discuss AI opportunities, research collaborations, or challenging problems
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're interested in discussing cutting-edge AI research, exploring collaboration opportunities, or have a challenging problem that could benefit from AI solutions, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? '_self' : '_blank'}
                    rel={info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? '' : 'noopener noreferrer'}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${info.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-mono">{info.label}</div>
                      <div className="font-medium group-hover:text-primary transition-colors">{info.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center transition-all ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-mono text-sm text-primary">Available for new projects</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently accepting consulting opportunities and research collaborations
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl bg-card border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground font-mono">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground font-mono">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-mono">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground font-mono">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Tell me about your project, collaboration ideas, or any questions..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all glow-cyan"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
