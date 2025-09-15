"use client";
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { downloadResumePDF } from '@/lib/pdfGenerator';

export function HeroSimple() {
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
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-green-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-green-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Hi, I'm</span>{' '}
                <span className="text-teal-600 dark:text-teal-400">
                  Vibhor Janey
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-muted-foreground mt-4">
                AI Solution Architect • Data Architecture Leader • Machine Learning Specialist
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              I architect and implement AI solutions for manufacturing and healthcare organizations, 
              delivering copilot experiences to thousands of users while building scalable data 
              platforms. Passionate about bridging AI research with production-ready systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={downloadResumePDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAbout}>
                View My Work
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900"
                asChild
              >
                <a href="https://github.com/Vibz28" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-teal-100 dark:hover:bg-teal-900"
                asChild
              >
                <a href="mailto:vibhor.janey@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Floating elements around the main area */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl opacity-20 blur-sm animate-bounce" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-sm animate-bounce" />
              
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/20 dark:to-green-900/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                    VJ
                  </div>
                  <p className="text-muted-foreground">AI Solutions Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}