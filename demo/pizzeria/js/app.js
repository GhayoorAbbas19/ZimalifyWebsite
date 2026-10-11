/* Pizzeria Da Lino — menu rendering, hours, nav */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const eur = n => (Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')) + ' €';
  const tags = t => t.map(x => ` <span class="tag" title="${esc(window.TAG_LABELS[x] || x)}">${x}</span>`).join('');
  const dish = ([n, d, p, t], i) => `<article class="dish" style="--i:${i}"><h3>${esc(n)}${tags(t)}</h3><span class="price">${eur(p)}</span><p>${esc(d)}</p></article>`;
  const cats = Object.keys(window.MENU);

  /* Home page: tabs */
  const tabs = document.getElementById('menuTabs'), list = document.getElementById('menuList');
  if (tabs && list) {
    let cur = cats[0];
    const render = () => {
      tabs.innerHTML = cats.map(c => `<button class="tab${c === cur ? ' tab--on' : ''}" role="tab" aria-selected="${c === cur}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
      list.innerHTML = window.MENU[cur].map(dish).join('');
    };
    tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; cur = b.dataset.cat; render(); });
    render();
  }

  /* QR page: all categories with a sticky category bar */
  const qr = document.getElementById('qrMenu'), bar = document.getElementById('catBar');
  if (qr && bar) {
    qr.innerHTML = cats.map(c => `<section class="qr__cat" id="cat-${c.toLowerCase()}"><h2>${esc(c)}</h2>${window.MENU[c].map(dish).join('')}</section>`).join('');
    bar.innerHTML = cats.map(c => `<a href="#cat-${c.toLowerCase()}">${esc(c)}</a>`).join('');
    const links = Array.from(bar.querySelectorAll('a'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); const on = bar.querySelector('.on'); on && on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } }), { rootMargin: '-30% 0px -60% 0px' });
      qr.querySelectorAll('.qr__cat').forEach(s => io.observe(s));
    }
    document.getElementById('printQr')?.addEventListener('click', () => window.print());
  }

  /* Opening hours */
  const HOURS = [['Domenica', [[12, 14.5], [19, 23.5]]], ['Lunedì', []], ['Martedì', [[12, 14.5], [19, 23.5]]], ['Mercoledì', [[12, 14.5], [19, 23.5]]], ['Giovedì', [[12, 14.5], [19, 23.5]]], ['Venerdì', [[12, 14.5], [19, 24]]], ['Sabato', [[12, 15], [19, 24]]]];
  const fmt = h => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`;
  const now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const table = document.getElementById('hoursTable');
  if (table) table.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => `<tr class="${d === day ? 'today' : ''}"><th scope="row">${HOURS[d][0]}</th><td>${HOURS[d][1].length ? HOURS[d][1].map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join(' · ') : 'Chiuso'}</td></tr>`).join('');
  const open = HOURS[day][1].some(([a, b]) => h >= a && h < b);
  const dot = document.getElementById('openDot'), txt = document.getElementById('openText');
  if (dot) { dot.classList.toggle('off', !open); txt.textContent = open ? 'Aperto ora' : 'Chiuso ora · apriamo alle ' + (HOURS[day][1].find(([a]) => a > h) ? fmt(HOURS[day][1].find(([a]) => a > h)[0]) : '12:00'); }

  /* Nav */
  const burger = document.getElementById('burger'), links = document.getElementById('navLinks'), nav = document.getElementById('nav');
  if (burger) {
    burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); burger.setAttribute('aria-label', o ? 'Chiudi il menu di navigazione' : 'Apri il menu di navigazione'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
  }

  /* Reveal */
  const io2 = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } }), { threshold: 0.1 }) : null;
  document.querySelectorAll('.section, .gallery figure').forEach(el => io2 ? io2.observe(el) : el.classList.add('in'));
})();
