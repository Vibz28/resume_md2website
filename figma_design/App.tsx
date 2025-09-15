import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";

// Import all components
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Publications } from "./components/Publications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-600 to-green-600 rounded-lg"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent"
          >
            Loading Portfolio...
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Main Content */}
        <main className="relative">
          {/* Page Transition Wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <About />

            {/* Experience Section */}
            <Experience />

            {/* Projects Section */}
            <Projects />

            {/* Skills Section */}
            <Skills />

            {/* Contact Section */}
            <Contact />
          </motion.div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: darkMode
                ? "hsl(var(--card))"
                : "hsl(var(--card))",
              color: darkMode
                ? "hsl(var(--card-foreground))"
                : "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-green-600 z-50 origin-left"
          style={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0 }}
        />

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,118,110,0.05)_1px,transparent_0)] [background-size:50px_50px]" />
        </div>
      </div>
    </AnimatePresence>
  );
}