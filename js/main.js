/* Zimalify — site behaviour */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: scroll state + mobile toggle ---------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    $('#toTop').classList.toggle('to-top--show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('no-scroll', open);
  });
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
    navToggle.classList.remove('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }));

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

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Hero counters ---------- */
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

  /* ---------- Apps ---------- */
  const apps = window.ZIMALIFY_APPS || [];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
    if (app.appStore) h += `<a class="badge ${size}" href="${esc(app.appStore)}" target="_blank" rel="noopener">${appleSVG}<span><small>Download on the</small>App Store</span></a>`;
    if (app.playStore) h += `<a class="badge ${size}" href="${esc(app.playStore)}" target="_blank" rel="noopener">${playSVG}<span><small>Get it on</small>Google Play</span></a>`;
    return h;
  };

  const platformPills = app => app.platforms.map(p => `<span class="pill pill--${p}">${p === 'ios' ? 'iOS' : 'Android'}</span>`).join('');

  const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  /* Featured */
  const featured = apps.find(a => a.featured);
  const featuredEl = $('#featuredApp');
  if (featured && featuredEl) {
    featuredEl.innerHTML = `
      <div class="featured__copy">
        <span class="featured__label">Featured app</span>
        <div class="featured__title">${iconHTML(featured, 'lg')}<div><h3>${esc(featured.name)}${featured.subtitle ? ` <small>${esc(featured.subtitle)}</small>` : ''}</h3><p>${esc(featured.tagline)}</p></div></div>
        <p class="featured__desc">${esc(featured.description)}</p>
        ${featured.highlights ? `<ul class="featured__list">${featured.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        <div class="featured__meta">
          ${featured.rating ? `<span class="rating"><span class="stars">${stars(featured.rating)}</span> ${featured.rating.toFixed(1)}</span>` : ''}
          ${featured.downloads ? `<span class="meta">${esc(featured.downloads)} downloads</span>` : ''}
          ${featured.price ? `<span class="meta">${esc(featured.price)}</span>` : ''}
          ${featured.requires ? `<span class="meta">${esc(featured.requires)}</span>` : ''}
          <span class="meta">${platformPills(featured)}</span>
        </div>
        <div class="badges">${badges(featured, 'badge--lg')}</div>
      </div>
      <div class="featured__visual" aria-hidden="true">
        ${featured.screenshots && featured.screenshots.length ? `
        <div class="shots">
          ${featured.screenshots.slice(0,3).map((src, i) => `<div class="phone phone--shot phone--shot-${i}"><div class="phone__notch"></div><div class="phone__screen phone__screen--img"><img src="${esc(src)}" alt="" loading="lazy"></div></div>`).join('')}
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
  }

  /* Filters + grid */
  const grid = $('#appGrid');
  const filtersEl = $('#appFilters');
  const categories = [...new Set(apps.map(a => a.category))].sort();
  const filterDefs = [
    { key: 'all', label: `All apps <b>${apps.length}</b>` },
    { key: 'ios', label: `iOS <b>${apps.filter(a => a.platforms.includes('ios')).length}</b>` },
    { key: 'android', label: `Android <b>${apps.filter(a => a.platforms.includes('android')).length}</b>` },
    ...categories.map(c => ({ key: 'cat:' + c, label: esc(c) }))
  ];
  if (filtersEl) {
    filtersEl.innerHTML = filterDefs.filter(f => !/<b>0<\/b>/.test(f.label)).map((f, i) => `<button class="chip${i === 0 ? ' chip--on' : ''}" role="tab" aria-selected="${i === 0}" data-filter="${esc(f.key)}">${f.label}</button>`).join('');
  }

  const cardHTML = app => `
    <article class="app-card" data-platforms="${app.platforms.join(' ')}" data-cat="${esc(app.category)}">
      <div class="app-card__head">
        ${iconHTML(app)}
        <div class="app-card__title"><h3>${esc(app.name)}</h3><span class="app-card__cat">${esc(app.category)}</span></div>
      </div>
      <p>${esc(app.tagline)}</p>
      <div class="app-card__meta">
        ${app.rating ? `<span class="rating"><span class="stars">${stars(app.rating)}</span> ${app.rating.toFixed(1)}</span>` : (app.price ? `<span class="meta">${esc(app.price)}</span>` : '')}
        ${app.downloads ? `<span class="meta">${esc(app.downloads)}</span>` : ''}
        <span class="meta">${platformPills(app)}</span>
      </div>
      <div class="badges badges--sm">${badges(app, 'badge--sm')}</div>
    </article>`;

  const render = filter => {
    if (!grid) return;
    const list = apps.filter(a => {
      if (filter === 'all') return true;
      if (filter === 'ios' || filter === 'android') return a.platforms.includes(filter);
      if (filter.startsWith('cat:')) return a.category === filter.slice(4);
      return true;
    });
    grid.innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">No apps in this category yet.</p>';
    if (!reduceMotion) $$('.app-card', grid).forEach((c, i) => { c.style.animationDelay = (i * 50) + 'ms'; });
  };
  render('all');

  filtersEl?.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', filtersEl).forEach(c => { c.classList.remove('chip--on'); c.setAttribute('aria-selected', 'false'); });
    btn.classList.add('chip--on'); btn.setAttribute('aria-selected', 'true');
    render(btn.dataset.filter);
  });

  /* ---------- Testimonials ---------- */
  const tEl = $('#testimonialGrid');
  const tData = window.ZIMALIFY_TESTIMONIALS || [];
  if (tEl) {
    tEl.innerHTML = tData.map(t => `
      <figure class="testimonial">
        <div class="testimonial__top"><span class="stars">${stars(t.rating || 5)}</span><span class="testimonial__source">${esc(t.source || '')}</span></div>
        <blockquote>“${esc(t.quote)}”</blockquote>
        <figcaption><span class="avatar" aria-hidden="true">${esc(t.author.charAt(0))}</span><div><strong>${esc(t.author)}</strong><span>${esc(t.role || '')}</span></div></figcaption>
      </figure>`).join('');
  }

  /* ---------- FAQ: one open at a time ---------- */
  const faqItems = $$('#faqList details');
  faqItems.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) faqItems.forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---------- Contact form (Formspree via fetch) ---------- */
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
      const subject = encodeURIComponent(`Project inquiry: ${fd.get('project_type') || 'General'}`);
      const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nBudget: ${fd.get('budget') || 'Not specified'}\n\n${fd.get('message')}`);
      window.location.href = `mailto:contact@zimalify.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email app with the message filled in. If nothing opens, email contact@zimalify.com directly.';
      status.classList.add('form__status--ok'); return;
    }
    submitBtn.disabled = true; submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        status.textContent = 'Thanks! Your message is on its way. We reply within one business day.';
        status.classList.add('form__status--ok');
      } else { throw new Error('bad response'); }
    } catch {
      status.textContent = 'Something went wrong. Please email us directly at contact@zimalify.com.';
      status.classList.add('form__status--err');
    } finally { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
  });

  /* ---------- Misc ---------- */
  $('#year').textContent = new Date().getFullYear();
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
})();
