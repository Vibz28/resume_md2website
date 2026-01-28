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
    <section className="min-h-screen relative overflow-hidden grain">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-32 -right-24 w-[30rem] h-[30rem] bg-[radial-gradient(circle_at_center,hsl(var(--accent-rose)/0.45),transparent_60%)] blur-2xl animate-pulse" />
        <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] bg-[radial-gradient(circle_at_center,hsl(var(--accent-sky)/0.45),transparent_60%)] blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="sticker">Available for collaborations</span>
                <span className="pill bg-secondary text-secondary-foreground">5,000+ users impacted</span>
                <span className="pill bg-accent text-accent-foreground">Manufacturing + Healthcare</span>
              </div>
              <h1 className="text-4xl md:text-6xl hero-title leading-tight">
                <span className="text-foreground">Hi, I'm</span>{' '}
                <span className="text-primary">Vibhor Janey</span>
              </h1>

              <h2 className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl">
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
                className="btn-spark text-white"
                onClick={downloadResumePDF}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAbout} className="btn-ghostline">
                View My Work
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border-2 border-foreground/10 hover:border-foreground"
                asChild
              >
                <a href="https://github.com/Vibz28" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border-2 border-foreground/10 hover:border-foreground"
                asChild
              >
                <a href="https://www.linkedin.com/in/vibhorjaney/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full border-2 border-foreground/10 hover:border-foreground"
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
              {/* Orbiting accents */}
              <div className="absolute inset-0 rounded-full glow-ring animate-[spin_22s_linear_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 bg-primary rounded-full animate-[orbit_12s_linear_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 bg-[hsl(var(--accent-rose))] rounded-full animate-[orbit_9s_linear_infinite]" />
              <div className="absolute -top-4 left-6 h-14 w-14 rounded-2xl bg-[hsl(var(--accent-sky))] opacity-70 animate-[float-slow_6s_ease-in-out_infinite]" />
              <div className="absolute bottom-6 -right-2 h-10 w-10 rounded-full bg-[hsl(var(--accent-lime))] opacity-70 animate-[float-slow_5s_ease-in-out_infinite]" />

              <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden card-surface flex items-center justify-center border-2 border-foreground/10">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto bg-[conic-gradient(from_180deg,hsl(var(--accent-rose)),hsl(var(--primary)),hsl(var(--accent-sky)))] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                    VJ
                  </div>
                  <p className="text-muted-foreground">AI Solutions Architect</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="pill bg-secondary text-secondary-foreground">Agentic Systems</span>
                    <span className="pill bg-accent text-accent-foreground">Data Products</span>
                  </div>
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
