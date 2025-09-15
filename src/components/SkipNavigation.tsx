"use client";

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
      onFocus={(e) => {
        e.target.classList.remove('sr-only');
      }}
      onBlur={(e) => {
        e.target.classList.add('sr-only');
      }}
    >
      Skip to main content
    </a>
  );
}