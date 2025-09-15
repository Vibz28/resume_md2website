import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-green-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-green-400/20 to-teal-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Hi, I'm</span>{' '}
                <span className="text-teal-600 dark:text-teal-400">
                  Vibhor Janey
                </span>
              </h1>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mt-4"
              >
                AI Solution Architect • Data Architecture Leader • Machine Learning Specialist
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              I architect and implement AI solutions for manufacturing and healthcare organizations, 
              delivering copilot experiences to thousands of users while building scalable data 
              platforms. Passionate about bridging AI research with production-ready systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAbout}>
                View My Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex space-x-4"
            >
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900">
                <Mail className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Floating elements around the main image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl opacity-20 blur-sm"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-sm"
              />
              
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/20 dark:to-green-900/20 backdrop-blur-sm border border-white/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTc3OTYzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AI Technology Visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}