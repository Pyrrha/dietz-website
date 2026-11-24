// Dietz.dev — interactions légères, sans dépendance.
// Tout fonctionne sans JS : ce fichier n'ajoute que des améliorations.
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Apparition au défilement --------------------------------------------
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // --- Barre de navigation, progression, frise -----------------------------
  var nav = document.getElementById('nav');
  var bar = document.querySelector('.scroll-progress__bar');
  var track = document.getElementById('timeline-track');
  var trackProgress = document.getElementById('timeline-progress');
  var dots = track ? track.querySelectorAll('.timeline__dot') : [];
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);

    if (bar) {
      var max = root.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }

    if (track && trackProgress) {
      var rect = track.getBoundingClientRect();
      var start = vh * 0.65;
      var p = (start - rect.top) / (rect.height - vh * 0.15);
      p = Math.max(0, Math.min(1, p));
      trackProgress.style.transform = 'scaleY(' + p + ')';
      dots.forEach(function (dot) {
        dot.classList.toggle('is-reached', dot.getBoundingClientRect().top < vh * 0.72);
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // --- Menu mobile ---------------------------------------------------------
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // --- Lien actif dans la navigation (page d'accueil) -----------------------
  var links = document.querySelectorAll('.nav__link[data-section]');
  if (links.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('data-section') === entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var s = document.getElementById(l.getAttribute('data-section'));
      if (s) sectionObserver.observe(s);
    });
  }
})();
