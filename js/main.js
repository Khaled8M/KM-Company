"use strict";
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Remember the chosen language (used by the first-visit redirect on the English pages).
  document.querySelectorAll('[data-lang]').forEach(a => a.addEventListener('click', () => {
    try { localStorage.setItem('km-company-lang', a.dataset.lang); } catch (_) {}
  }));

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const closeNav = () => { if (!nav || !menuToggle) return; nav.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); };
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeNav(); });
  }

  const header = document.querySelector('.site-header');
  const scrollTop = document.getElementById('scroll-top');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 28);
      if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 480);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (scrollTop) scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  const year = document.getElementById('current-year'); if (year) year.textContent = new Date().getFullYear();

  // Loader: it hides itself with CSS; here we only start the reveal animations after it and remove it from the DOM.
  const loader = document.getElementById('loader');
  const loaderActive = loader && !document.documentElement.classList.contains('no-loader');
  const startReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }), { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
      items.forEach(el => io.observe(el));
    } else items.forEach(el => el.classList.add('is-visible'));
  };
  if (loaderActive) { setTimeout(startReveal, 2300); setTimeout(() => loader.remove(), 3100); }
  else { if (loader) loader.remove(); startReveal(); }

  // ---- Theme toggle (night <-> day) ----
  const themeBtn = document.getElementById('theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (t, save) => {
    const root = document.documentElement;
    if (t === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#f7f1e1' : '#050505');
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(t === 'light'));
    if (save) { try { localStorage.setItem('km-theme', t); } catch (_) {} }
  };
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    root.classList.add('theme-anim'); setTimeout(() => root.classList.remove('theme-anim'), 450);
    applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
  });

  // ---- Basic content protection (a deterrent only; nothing client-side is absolute) ----
  const isField = e => !!(e.target && e.target.closest && e.target.closest('input,textarea,select'));
  const block = e => { if (isField(e)) return; e.preventDefault(); return false; };
  ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart', 'drop'].forEach(t => document.addEventListener(t, block));
  document.addEventListener('keydown', e => {
    const k = (e.key || '').toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === 'F12' || (mod && e.shiftKey && ['i', 'j', 'c', 'k', 'e'].includes(k)) || (mod && e.altKey && ['i', 'j', 'c', 'u'].includes(k)) || (mod && ['u', 's', 'p'].includes(k)) || (mod && k === 'a' && !isField(e))) {
      e.preventDefault(); e.stopPropagation();
    }
  }, true);
  document.querySelectorAll('img').forEach(i => i.setAttribute('draggable', 'false'));

  // ---- Request form -> WhatsApp / email (no server, nothing is stored) ----
  const form = document.getElementById('request-form');
  if (form) {
    const compose = () => {
      const sel = form.elements.service;
      const vals = {
        name: form.elements.name.value.trim(),
        service: sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : '',
        message: form.elements.message.value.trim(),
        contact: form.elements.contact.value.trim()
      };
      vals.contactblock = vals.contact ? form.dataset.contactLabel + ': ' + vals.contact : '';
      const fill = tpl => {
        let t = tpl.split('{nl}').join('\n');
        Object.keys(vals).forEach(k => { t = t.split('{' + k + '}').join(vals[k]); });
        return t.trim();
      };
      return { text: fill(form.dataset.tpl), subject: fill(form.dataset.subject) };
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const url = 'https://wa.me/' + form.dataset.wa + '?text=' + encodeURIComponent(compose().text);
      const w = window.open(url, '_blank');
      if (w) { w.opener = null; } else { window.location.href = url; }
    });
    const mailBtn = document.getElementById('request-email');
    if (mailBtn) mailBtn.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const m = compose();
      window.location.href = 'mailto:' + form.dataset.mail + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.text);
    });
  }

  // Brand signature badge (auto-closes after 3 seconds)
  const badge = document.getElementById('brand-badge');
  const splash = document.getElementById('brand-splash');
  let timer;
  const closeSplash = () => {
    if (!splash || splash.hidden) return;
    clearTimeout(timer); splash.classList.remove('show');
    setTimeout(() => { splash.hidden = true; if (badge) badge.focus({ preventScroll: true }); }, 220);
  };
  if (badge && splash) {
    badge.addEventListener('click', () => {
      clearTimeout(timer); splash.hidden = false;
      requestAnimationFrame(() => splash.classList.add('show'));
      timer = setTimeout(closeSplash, 3000);
    });
    splash.addEventListener('click', e => { if (e.target === splash) closeSplash(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSplash(); });
  }
})();
