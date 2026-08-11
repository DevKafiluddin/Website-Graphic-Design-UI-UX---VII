/**
 * ARCHITECTURAL MILLWORK & CUSTOM CARPENTRY
 * Vanilla JavaScript Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STICKY HEADER & COMPACT SCROLL TRANSITION
     ========================================================================== */
  const header = document.querySelector('.site-header');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ==========================================================================
     2. MOBILE NAVIGATION OVERLAY
     ========================================================================== */
  const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  const openMobileNav = () => {
    if (mobileOverlay) {
      mobileOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileNav = () => {
    if (mobileOverlay) {
      mobileOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ==========================================================================
     3. ACTIVE NAVIGATION LINK HIGHLIGHT
     ========================================================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ==========================================================================
     4. FAQ ACCORDION INTERACTION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');

    if (button && content) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          content.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  /* ==========================================================================
     5. PROJECT GALLERY VANILLA JS CATEGORY FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (filterBtns.length > 0 && galleryCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('is-hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 40);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.classList.add('is-hidden');
            }, 300);
          }
        });
      });
    });
  }

  /* ==========================================================================
     6. CONTACT FORM SUBMISSION FEEDBACK
     ========================================================================== */
  const contactForm = document.querySelector('#contact-inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'SENDING INQUIRY...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'INQUIRY SUBMITTED ✓';
        submitBtn.style.backgroundColor = 'var(--color-brass)';
        submitBtn.style.borderColor = 'var(--color-brass)';
        submitBtn.style.color = '#1A1815';

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
        }, 4000);
      }, 1000);
    });
  }

  /* ==========================================================================
     7. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
