/* Zimalify — site behaviour */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* =====================================================
     i18n
     ===================================================== */
  const DICT = window.ZIMALIFY_I18N || { en: {} };
  const LANGS = window.ZIMALIFY_LANGS || [{ code: 'en', label: 'EN', name: 'English' }];
  const detectLang = () => {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && DICT[fromUrl]) return fromUrl;
    try { const saved = localStorage.getItem('zimalify-lang'); if (saved && DICT[saved]) return saved; } catch (_) {}
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return DICT[nav] ? nav : 'en';
  };
  let lang = detectLang();
  const t = key => (DICT[lang] && DICT[lang][key]) ?? DICT.en[key] ?? key;
  const tr = (obj, field) => (obj[lang] && obj[lang][field]) ?? obj[field];   // per-app localized field with fallback

  const applyTranslations = () => {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    $('meta[name="description"]')?.setAttribute('content', t('meta.description'));
    $$('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (/<[a-z][\s\S]*>/i.test(v)) el.innerHTML = v; else el.textContent = v;
    });
    $$('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    $$('#langSwitch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    splitHeroWords();
  };

  const langSwitch = $('#langSwitch');
  if (langSwitch) {
    langSwitch.innerHTML = LANGS.map(l => `<button type="button" data-lang="${l.code}" lang="${l.code}" title="${esc(l.name)}" aria-pressed="false">${esc(l.label)}</button>`).join('');
    langSwitch.addEventListener('click', e => {
      const b = e.target.closest('button[data-lang]');
      if (!b || b.dataset.lang === lang) return;
      setLang(b.dataset.lang);
    });
  }
  const setLang = next => {
    const body = document.body;
    body.classList.add('lang-fade', 'switching');
    const swap = () => {
      lang = next;
      try { localStorage.setItem('zimalify-lang', lang); } catch (_) {}
      applyTranslations();
      renderApps();
      body.classList.remove('switching');
    };
    reduceMotion ? swap() : setTimeout(swap, 250);
  };

  /* Hero headline: wrap words so they can animate in */
  const splitHeroWords = () => {
    const h = $('#heroTitle');
    if (!h || reduceMotion) return;
    let i = 0;
    const wrap = node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part; frag.appendChild(s);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && node.classList.contains('grad-text')) {
        // keep gradient text as one unit: animated descendants would break background-clip:text
        node.classList.add('w'); node.style.setProperty('--i', i++);
      } else if (node.nodeType === 1 && !node.classList.contains('w')) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(h.childNodes).forEach(wrap);
  };

  /* =====================================================
     Nav: scroll state, progress bar, mobile toggle
     ===================================================== */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  const progress = $('#progress');

  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    $('#toTop').classList.toggle('to-top--show', window.scrollY > 600);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    navLinks.classList.remove('nav__links--open');
    navToggle.classList.remove('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', t('nav.menuOpen'));
    document.body.classList.remove('no-scroll');
  };
  navToggle.addEventListener('click', () => {
    const open = !navLinks.classList.contains('nav__links--open');
    if (!open) return closeMenu();
    navLinks.classList.add('nav__links--open');
    navToggle.classList.add('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', t('nav.menuClose'));
    document.body.classList.add('no-scroll');
  });
  $$('a', navLinks).forEach(a => a.addEventListener('click', closeMenu));

  /* Active link highlight */
  const sections = $$('main section[id]');
  const linkFor = id => $(`#navLinks a[href="#${id}"]`);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const link = linkFor(e.target.id);
        if (!link || link.classList.contains('btn')) return;
        if (e.isIntersecting) {
          $$('#navLinks a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* =====================================================
     Reveal on scroll + stagger indices
     ===================================================== */
  const indexStagger = root => $$('.stagger', root.parentElement || document).forEach(g => Array.from(g.children).forEach((c, i) => c.style.setProperty('--i', i)));
  indexStagger(document.body);
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  /* =====================================================
     Hero counters, tilt, spotlight
     ===================================================== */
  const counters = $$('#heroStats [data-count]');
  const runCounter = el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const dur = 1400, start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { counters.forEach(runCounter); cio.disconnect(); } });
    }, { threshold: 0.5 });
    cio.observe($('#heroStats'));
  } else { counters.forEach(runCounter); }

  /* Phone tilts toward the cursor */
  const tilt = $('#heroTilt');
  const heroVisual = $('#heroVisual');
  if (tilt && heroVisual && finePointer && !reduceMotion) {
    heroVisual.addEventListener('mousemove', e => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(1200px) rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => { tilt.style.transition = 'transform 0.6s ease'; tilt.style.transform = ''; setTimeout(() => tilt.style.transition = '', 600); });
  }

  /* Spotlight follows the cursor on .spot cards (delegated, works for re-rendered cards) */
  if (finePointer && !reduceMotion) {
    document.addEventListener('mousemove', e => {
      const card = e.target.closest('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* =====================================================
     Apps
     ===================================================== */
  const apps = window.ZIMALIFY_APPS || [];

  const iconHTML = (app, size = 'md') => {
    const ic = app.icon || {};
    if (ic.image) return `<img class="app-icon app-icon--${size}" src="${esc(ic.image)}" alt="${esc(app.name)} icon" loading="lazy" width="64" height="64">`;
    const from = ic.from || '#3B82F6', to = ic.to || '#8B5CF6';
    return `<span class="app-icon app-icon--${size}" style="background:linear-gradient(135deg,${from},${to})" aria-hidden="true">${ic.glyph || app.name.charAt(0)}</span>`;
  };

  const appleSVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16.4 2.6c.1 1.4-.4 2.6-1.2 3.5-.9 1-2.2 1.6-3.4 1.5-.2-1.3.4-2.7 1.2-3.5.9-1 2.4-1.6 3.4-1.5zM20.5 17.3c-.6 1.3-.9 1.9-1.6 3-1 1.6-2.5 3.5-4.3 3.5-1.6 0-2-1-4.2-1s-2.7 1-4.3 1c-1.8 0-3.1-1.7-4.1-3.3C-.8 15.9-1.1 10.5 1.7 7.6c1-1 2.5-1.7 4-1.7 1.7 0 2.8 1 4.2 1s2.3-1 4.3-1c1.3 0 2.7.7 3.7 1.9-3.3 1.8-2.8 6.5.6 7.5z"/></svg>';
  const playSVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#34A853" d="M3.6 2.3 13 12 3.6 21.7c-.4-.3-.6-.8-.6-1.4V3.7c0-.6.2-1.1.6-1.4z"/><path fill="#FBBC04" d="m16.8 8.2 3.6 2.1c1.2.7 1.2 2.7 0 3.4l-3.6 2.1L13 12z"/><path fill="#4285F4" d="M3.6 2.3c.4-.3 1-.4 1.6 0L16.8 8.2 13 12z"/><path fill="#EA4335" d="M13 12l3.8 3.8L5.2 21.7c-.6.3-1.2.3-1.6 0z"/></svg>';

  const badges = (app, size = '') => {
    let h = '';
    if (app.appStore) h += `<a class="badge ${size}" href="${esc(app.appStore)}" target="_blank" rel="noopener">${appleSVG}<span><small>${esc(t('badge.apple'))}</small>App Store</span></a>`;
    if (app.playStore) h += `<a class="badge ${size}" href="${esc(app.playStore)}" target="_blank" rel="noopener">${playSVG}<span><small>${esc(t('badge.google'))}</small>Google Play</span></a>`;
    return h;
  };
  const platformPills = app => app.platforms.map(p => `<span class="pill pill--${p}">${p === 'ios' ? 'iOS' : 'Android'}</span>`).join('');
  const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
  const cat = c => t('cat.' + c) === 'cat.' + c ? c : t('cat.' + c);
  const price = p => p ? (t('apps.price.' + p) === 'apps.price.' + p ? p : t('apps.price.' + p)) : '';

  const featured = apps.find(a => a.featured);
  const featuredEl = $('#featuredApp');
  const renderFeatured = () => {
    if (!featured || !featuredEl) return;
    const highlights = tr(featured, 'highlights');
    featuredEl.innerHTML = `
      <div class="featured__copy">
        <span class="featured__label">${esc(t('apps.featured'))}</span>
        <div class="featured__title">${iconHTML(featured, 'lg')}<div><h3>${esc(featured.name)}${featured.subtitle ? ` <small>${esc(featured.subtitle)}</small>` : ''}</h3><p>${esc(tr(featured, 'tagline'))}</p></div></div>
        <p class="featured__desc">${esc(tr(featured, 'description'))}</p>
        ${highlights ? `<ul class="featured__list">${highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        <div class="featured__meta">
          ${featured.rating ? `<span class="rating"><span class="stars">${stars(featured.rating)}</span> ${featured.rating.toFixed(1)}</span>` : ''}
          ${featured.downloads ? `<span class="meta">${esc(featured.downloads)} ${esc(t('apps.downloads'))}</span>` : ''}
          ${featured.price ? `<span class="meta">${esc(price(featured.price))}</span>` : ''}
          ${featured.requires ? `<span class="meta">${esc(featured.requires)}</span>` : ''}
          <span class="meta">${platformPills(featured)}</span>
        </div>
        <div class="badges">${badges(featured, 'badge--lg')}</div>
      </div>
      <div class="featured__visual" aria-hidden="true">
        ${featured.screenshots && featured.screenshots.length ? `
        <div class="shots">
          ${featured.screenshots.slice(0, 3).map((src, i) => `<div class="phone phone--shot phone--shot-${i}"><div class="phone__notch"></div><div class="phone__screen phone__screen--img"><img src="${esc(src)}" alt="" loading="lazy"></div></div>`).join('')}
        </div>` : `
        <div class="phone phone--sm">
          <div class="phone__notch"></div>
          <div class="phone__screen phone__screen--app" style="--from:${featured.icon?.from || '#3B82F6'};--to:${featured.icon?.to || '#8B5CF6'}">
            <div class="mock__status"><span>9:41</span><span>●●●</span></div>
            <div class="mock__appicon">${featured.icon?.glyph || featured.name.charAt(0)}</div>
            <div class="mock__appname">${esc(featured.name)}</div>
            <div class="mock__card mock__card--grad"><div class="mock__line mock__line--sm" style="width:50%"></div><div class="mock__big">Ready</div><div class="mock__bar"><i></i></div></div>
            <div class="mock__row"><div class="mock__tile"></div><div class="mock__tile"></div><div class="mock__tile"></div></div>
            <div class="mock__card"><div class="mock__line mock__line--md"></div><div class="mock__line mock__line--sm"></div></div>
            <div class="mock__tabbar"><i class="on"></i><i></i><i></i><i></i></div>
          </div>
        </div>`}
      </div>`;
  };

  const grid = $('#appGrid');
  const filtersEl = $('#appFilters');
  let activeFilter = 'all';
  const renderFilters = () => {
    if (!filtersEl) return;
    const categories = [...new Set(apps.map(a => a.category))].sort();
    const defs = [
      { key: 'all', label: `${esc(t('apps.all'))} <b>${apps.length}</b>`, n: apps.length },
      { key: 'ios', label: `iOS <b>${apps.filter(a => a.platforms.includes('ios')).length}</b>`, n: apps.filter(a => a.platforms.includes('ios')).length },
      { key: 'android', label: `Android <b>${apps.filter(a => a.platforms.includes('android')).length}</b>`, n: apps.filter(a => a.platforms.includes('android')).length },
      ...categories.map(c => ({ key: 'cat:' + c, label: esc(cat(c)), n: 1 }))
    ].filter(f => f.n > 0);
    filtersEl.innerHTML = defs.map(f => `<button class="chip${f.key === activeFilter ? ' chip--on' : ''}" role="tab" aria-selected="${f.key === activeFilter}" data-filter="${esc(f.key)}">${f.label}</button>`).join('');
  };

  const cardHTML = app => `
    <article class="app-card spot" data-platforms="${app.platforms.join(' ')}" data-cat="${esc(app.category)}">
      <div class="app-card__head">
        ${iconHTML(app)}
        <div class="app-card__title"><h3>${esc(app.name)}</h3><span class="app-card__cat">${esc(cat(app.category))}</span></div>
      </div>
      <p>${esc(tr(app, 'tagline'))}</p>
      <div class="app-card__meta">
        ${app.rating ? `<span class="rating"><span class="stars">${stars(app.rating)}</span> ${app.rating.toFixed(1)}</span>` : (app.price ? `<span class="meta">${esc(price(app.price))}</span>` : '')}
        ${app.downloads ? `<span class="meta">${esc(app.downloads)}</span>` : ''}
        <span class="meta">${platformPills(app)}</span>
      </div>
      <div class="badges badges--sm">${badges(app, 'badge--sm')}</div>
    </article>`;

  const renderGrid = () => {
    if (!grid) return;
    const list = apps.filter(a => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'ios' || activeFilter === 'android') return a.platforms.includes(activeFilter);
      if (activeFilter.startsWith('cat:')) return a.category === activeFilter.slice(4);
      return true;
    });
    grid.innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty">${esc(t('apps.empty'))}</p>`;
    Array.from(grid.children).forEach((c, i) => c.style.setProperty('--i', i));
    // re-trigger the stagger so filtered cards animate in
    if (!reduceMotion && grid.classList.contains('in')) {
      grid.classList.remove('in'); void grid.offsetWidth; grid.classList.add('in');
    }
  };
  const renderApps = () => { renderFeatured(); renderFilters(); renderGrid(); };

  filtersEl?.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $$('.chip', filtersEl).forEach(c => { const on = c === btn; c.classList.toggle('chip--on', on); c.setAttribute('aria-selected', String(on)); });
    renderGrid();
  });

  /* =====================================================
     FAQ: one open at a time
     ===================================================== */
  const faqItems = $$('#faqList details');
  faqItems.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) faqItems.forEach(o => { if (o !== d) o.open = false; });
  }));

  /* =====================================================
     Contact form (Formspree via fetch, mailto fallback)
     ===================================================== */
  const form = $('#contactForm');
  const status = $('#formStatus');
  const submitBtn = $('#submitBtn');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = ''; status.className = 'form__status';
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.action.includes('YOUR_FORM_ID')) {
      // Formspree not configured yet: hand the message to the visitor's email app instead.
      const fd = new FormData(form);
      const subject = encodeURIComponent(`${t('f.subject')}: ${fd.get('project_type') || '-'}`);
      const body = encodeURIComponent(`${t('f.name')}: ${fd.get('name')}\n${t('f.email')}: ${fd.get('email')}\n${t('f.budget')}: ${fd.get('budget') || '-'}\n\n${fd.get('message')}`);
      window.location.href = `mailto:contact@zimalify.com?subject=${subject}&body=${body}`;
      status.textContent = t('f.mailto');
      status.classList.add('form__status--ok'); return;
    }
    submitBtn.disabled = true; submitBtn.textContent = t('f.sending');
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        status.textContent = t('f.ok');
        status.classList.add('form__status--ok');
      } else { throw new Error('bad response'); }
    } catch {
      status.textContent = t('f.err');
      status.classList.add('form__status--err');
    } finally { submitBtn.disabled = false; submitBtn.textContent = t('f.submit'); }
  });

  /* =====================================================
     Boot
     ===================================================== */
  $('#year').textContent = new Date().getFullYear();
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  applyTranslations();
  renderApps();
})();
