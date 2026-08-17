// ============================================================
// Studio Thirteen — nav.js
// Handles the mobile hamburger menu toggle. Shared by every page.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav ul');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('nav-open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('nav-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return menu.classList.contains('nav-open');
  }

  // Toggle the menu when the hamburger button is clicked.
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Close the menu automatically once a visitor picks a link —
  // otherwise it stays open after navigating to the new page load.
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close the menu if a visitor taps/clicks anywhere outside of it.
  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close the menu on Escape for keyboard users.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
    }
  });

  // If the viewport is resized back up past the mobile breakpoint
  // while the menu is open, reset it so it doesn't get stuck open.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && isOpen()) {
      closeMenu();
    }
  });
});
