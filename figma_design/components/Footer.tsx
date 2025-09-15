import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:vibhor.janey@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Publications", href: "#publications" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-600 to-emerald-600 bg-clip-text text-transparent">
              Vibhor Janey
            </h3>
            <p className="text-muted-foreground max-w-md">
              AI Solution Architect • AI Engineer • Deep Learning Data Scientist
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              Building intelligent systems that solve real-world problems. 
              Passionate about making AI accessible, ethical, and impactful.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                East Brunswick, NJ
              </p>
              <p className="text-muted-foreground">
                vibhor.janey@gmail.com
              </p>
              <p className="text-muted-foreground">
                +1-765-537-1295
              </p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Available for consulting and research collaborations
              </p>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Vibhor Janey. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </footer>
  );
}