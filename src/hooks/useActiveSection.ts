"use client";
import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'publications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active if it's within 100px of the top
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    // Only add scroll listener on home page (SPA)
    if (window.location.pathname === '/' || window.location.pathname === '/resume_md2website/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return activeSection;
}