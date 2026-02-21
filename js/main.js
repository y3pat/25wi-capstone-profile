/**
 * ICU Sepsis Decision Support System
 * Website scripts – smooth scroll, nav behavior
 */

(function () {
  'use strict';

  // Update nav CTA href when you have the product URL
  const PRODUCT_URL = '#'; // Replace with your demo URL, e.g. 'https://your-app.example.com'

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  function initNav() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });

    // Set product URL on CTA buttons/links
    document.querySelectorAll('a.nav-cta, .btn-primary').forEach(el => {
      if (PRODUCT_URL !== '#') {
        el.href = PRODUCT_URL;
      }
    });
  }

  // Scrollytelling: fade-in as elements enter viewport, fade-out when they leave
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // Highlight nav link for current section on scroll
  function initScrollHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeToggle();
      initNav();
      initScrollReveal();
      initScrollHighlight();
    });
  } else {
    initThemeToggle();
    initNav();
    initScrollReveal();
    initScrollHighlight();
  }
})();
