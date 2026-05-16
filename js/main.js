/* ============================================================
   Impressions Printing Inc. — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Navigation ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── Scroll: Nav shadow ────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 24px rgba(0,0,0,0.22)'
        : '0 2px 16px rgba(0,0,0,0.18)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Animate on Scroll ─────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  /* ── Contact Form ──────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit .btn');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Build mailto link
      const name    = form.querySelector('#name')?.value    || '';
      const email   = form.querySelector('#email')?.value   || '';
      const phone   = form.querySelector('#phone')?.value   || '';
      const service = form.querySelector('#service')?.value || '';
      const message = form.querySelector('#message')?.value || '';

      const subject = encodeURIComponent(`Website Inquiry${service ? ' – ' + service : ''} from ${name}`);
      const body    = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:jasperprinter@mail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      }, 2000);
    });
  }

});

/* ── Fade-in CSS (injected once) ───────────────────────────── */
(function injectFadeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);
})();
