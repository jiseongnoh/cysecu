/* ============================================
   CySecuLab Homepage - script.js
   Navigation, Tabs, Accordion, Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Nav Toggle ---
  const navToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Nav scroll shadow ---
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('.section[id]');
  const navLinkEls = document.querySelectorAll('.nav__links a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // --- Nav dropdown links -> activate tab ---
  document.querySelectorAll('.nav__dropdown-menu a[href^="#sol-"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      activateTab(targetId);
      history.replaceState(null, '', '#' + targetId);
      const solSection = document.getElementById('solutions');
      if (solSection) solSection.scrollIntoView({ behavior: 'smooth' });
      // Close mobile nav
      if (navLinks) navLinks.classList.remove('open');
    });
  });

  // --- Mobile dropdown toggle ---
  document.querySelectorAll('.nav__dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.parentElement.classList.toggle('open');
      }
    });
  });

  // --- Solution Tabs ---
  const tabs = document.querySelectorAll('.solutions__tab');
  const panels = document.querySelectorAll('.solutions__panel');

  function activateTab(targetId) {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    const targetTab = document.querySelector(`.solutions__tab[data-target="${targetId}"]`);
    const targetPanel = document.getElementById(targetId);
    if (targetTab) targetTab.classList.add('active');
    if (targetPanel) targetPanel.classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      activateTab(target);
      history.replaceState(null, '', '#' + target);
    });
  });

  // Activate tab from URL hash on load
  const hash = window.location.hash.slice(1);
  if (hash && hash.startsWith('sol-')) {
    activateTab(hash);
    setTimeout(() => {
      const solSection = document.getElementById('solutions');
      if (solSection) solSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.slice(1);
    if (h && h.startsWith('sol-')) {
      activateTab(h);
    }
  });

  // --- Solution Accordion (mobile) ---
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      accordionItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // --- Contact Form (mailto fallback) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      const subject = encodeURIComponent(`[홈페이지 문의] ${name}`);
      const body = encodeURIComponent(
        `이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`
      );

      window.location.href = `mailto:contact@cyseculab.com?subject=${subject}&body=${body}`;
    });
  }
});
