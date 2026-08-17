// ============================================================
// Studio Thirteen — site.js
// Small, page-agnostic touch-ups shared across every page.
// Each feature checks for its own elements before running, so
// this file is safe to include even on pages that don't have
// a particular piece (e.g. only contact.html has the textarea).
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ------------------------------------------------------------
  // 1. Auto-updating copyright year
  // ------------------------------------------------------------
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------
  // 2. Automatic "active" nav link based on the current page
  // ------------------------------------------------------------
  var navLinks = document.querySelectorAll('nav ul li a:not(.nav-cta)');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute('href');
    link.classList.remove('active');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // ------------------------------------------------------------
  // 3. Character counter for the contact form's message textarea
  // ------------------------------------------------------------
  var messageBox = document.getElementById('message');
  var messageCount = document.getElementById('message-count');

  if (messageBox && messageCount) {
    var maxLength = messageBox.getAttribute('maxlength') || 800;

    function updateCount() {
      messageCount.textContent = messageBox.value.length + ' / ' + maxLength;
    }

    updateCount(); // set initial "0 / 800" on page load
    messageBox.addEventListener('input', updateCount);
  }

  // ------------------------------------------------------------
  // 4. Back-to-top button
  // ------------------------------------------------------------
  var backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------
  // 5. Smooth-scroll for same-page anchor links
  // ------------------------------------------------------------
  // CSS already sets `scroll-behavior: smooth` on <html>, so this
  // is mostly a safety net for older browsers, plus it moves
  // keyboard focus to the target section for accessibility.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

});
