'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. MOBILE HAMBURGER MENU TOGGLE
  // ============================================================
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // 2. FAQ / ACCORDION
  // ============================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isOpen = answer.classList.contains('open');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer && otherAnswer !== answer) {
            otherAnswer.classList.remove('open');
          }
          if (otherIcon && otherIcon !== icon) {
            otherIcon.classList.remove('rotated');
          }
        });

        // Toggle current
        if (isOpen) {
          answer.classList.remove('open');
          if (icon) icon.classList.remove('rotated');
        } else {
          answer.classList.add('open');
          if (icon) icon.classList.add('rotated');
        }
      });
    }
  });

  // ============================================================
  // 3. ANIMATED NUMBER COUNTERS
  // ============================================================
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('ro-RO');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('ro-RO');
      }
    }

    requestAnimationFrame(update);
  }

  const counterElements = document.querySelectorAll('.counter-num[data-target]');

  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ============================================================
  // 4. SCROLL FADE-IN ANIMATIONS
  // ============================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  // ============================================================
  // 5. BACK-TO-TOP BUTTON
  // ============================================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 6. PROJECT FILTER BUTTONS (for services/portfolio pages)
  // ============================================================
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) {
          b.classList.remove('active-filter');
        });
        btn.classList.add('active-filter');

        // Show/hide cards
        filterCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
            card.classList.add('fade-in', 'visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================================
  // 7. NAVBAR ACTIVE LINK HIGHLIGHTING
  // ============================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link[data-page]');

  navLinks.forEach(function (link) {
    const page = link.getAttribute('data-page');
    if (page === currentPath || (currentPath === '' && page === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // 8. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 9. CAROUSEL DUPLICATE FOR INFINITE SCROLL
  // ============================================================
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const items = carouselTrack.innerHTML;
    carouselTrack.innerHTML = items + items; // duplicate for seamless loop
  }

  // ============================================================
  // 10. STAGGERED FADE-IN FOR GRID CARDS
  // ============================================================
  const gridCards = document.querySelectorAll('.stagger-fade');
  gridCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.1) + 's';
  });

  // ============================================================
  // 11. CONTACT FORM SUCCESS MESSAGE
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-message');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      successMsg.classList.add('show');
    });
  }

});