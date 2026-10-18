(function () {
  const PRODUCTS = [
    { n: 'Quaderno rilegato a mano A5', c: 'Quaderni', p: 18, e: '📓', bg: '#F3E7D3', badge: 'Fatto a Milano' },
    { n: 'Taccuino tascabile, 3 pezzi', c: 'Quaderni', p: 12, e: '📒', bg: '#E8EFE9' },
    { n: 'Stilografica Kaweco Sport', c: 'Penne', p: 29, e: '🖋️', bg: '#FDE2DE' },
    { n: 'Inchiostro Diamine 30 ml', c: 'Penne', p: 9, e: '🧴', bg: '#E3ECF7' },
    { n: 'Biglietti d\'auguri stampati a mano', c: 'Carta', p: 4.5, e: '💌', bg: '#F3E7D3', badge: 'Novità' },
    { n: 'Carta regalo, 3 fogli', c: 'Carta', p: 6, e: '🎀', bg: '#FDE2DE' },
    { n: 'Candela di soia, fico e cedro', c: 'Regali', p: 22, old: 26, e: '🕯️', bg: '#E8EFE9', badge: 'Offerta' },
    { n: 'Tazza in ceramica smaltata', c: 'Regali', p: 16, e: '☕', bg: '#E3ECF7' },
    { n: 'Agenda 2027 settimanale', c: 'Quaderni', p: 24, e: '📅', bg: '#FDE2DE', badge: 'Prenotabile' },
    { n: 'Matite Blackwing, 12 pezzi', c: 'Penne', p: 28, e: '✏️', bg: '#F3E7D3' },
    { n: 'Segnalibro in ottone', c: 'Regali', p: 11, e: '🔖', bg: '#E8EFE9' },
    { n: 'Set lettere e buste, 20 pezzi', c: 'Carta', p: 14, e: '✉️', bg: '#E3ECF7' }
  ];
  const WA = 'https://wa.me/393514969933?text=';
  const grid = document.getElementById('grid'), filters = document.getElementById('filters');
  const cats = ['Tutti', ...new Set(PRODUCTS.map(p => p.c))];
  let cur = 'Tutti';
  const eur = n => n.toFixed(2).replace('.', ',') + ' €';
  const render = () => {
    filters.innerHTML = cats.map(c => `<button class="chip${c === cur ? ' chip--on' : ''}" data-c="${c}">${c}</button>`).join('');
    grid.innerHTML = PRODUCTS.filter(p => cur === 'Tutti' || p.c === cur).map((p, i) => `
      <article class="product" style="animation-delay:${i * 40}ms">
        <div class="product__img" style="background:${p.bg}">${p.e}${p.badge ? `<span class="product__badge">${p.badge}</span>` : ''}</div>
        <div class="product__body">
          <h3>${p.n}</h3><span class="cat">${p.c}</span>
          <span class="price">${p.old ? `<s>${eur(p.old)}</s>` : ''}${eur(p.p)}</span>
          <a class="btn btn--wa" href="${WA}${encodeURIComponent(`Ciao Bottega Marelli! Vorrei ordinare: ${p.n} (${eur(p.p)}). È disponibile per il ritiro?`)}" target="_blank" rel="noopener">Chiedi su WhatsApp</a>
        </div>
      </article>`).join('');
  };
  filters.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; cur = b.dataset.c; render(); });
  render();

  /* Hours with "open now" and today highlighted */
  const HOURS = [ // index = getDay(): 0 Sunday
    ['Domenica', [[10, 13]]], ['Lunedì', []], ['Martedì', [[9.5, 13], [15.5, 19.5]]], ['Mercoledì', [[9.5, 13], [15.5, 19.5]]],
    ['Giovedì', [[9.5, 13], [15.5, 19.5]]], ['Venerdì', [[9.5, 13], [15.5, 19.5]]], ['Sabato', [[10, 19.5]]]
  ];
  const fmt = h => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`;
  const now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const order = [1, 2, 3, 4, 5, 6, 0];
  document.getElementById('hoursTable').innerHTML = order.map(d => `<tr class="${d === day ? 'today' : ''}"><th>${HOURS[d][0]}</th><td>${HOURS[d][1].length ? HOURS[d][1].map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join(' · ') : 'Chiuso'}</td></tr>`).join('');
  const slots = HOURS[day][1];
  const open = slots.some(([a, b]) => h >= a && h < b);
  const next = slots.find(([a]) => a > h);
  document.getElementById('hoursTitle').textContent = open ? 'Siamo aperti adesso' : 'Adesso siamo chiusi';
  document.getElementById('hoursSub').textContent = open ? `Chiudiamo alle ${fmt(slots.find(([a, b]) => h >= a && h < b)[1])}.` : next ? `Riapriamo oggi alle ${fmt(next[0])}.` : 'Riapriamo al prossimo giorno di apertura.';
  document.getElementById('openText').textContent = open ? 'Aperto ora' : 'Chiuso ora';
  document.getElementById('openDot').classList.toggle('off', !open);

  /* Instagram feed (illustrated placeholders; a real feed would come from the Instagram Basic Display API) */
  const POSTS = [['🖋️', '#FDE2DE', 128], ['📓', '#F3E7D3', 96], ['🎁', '#E8EFE9', 214], ['✏️', '#E3ECF7', 77], ['💌', '#F3E7D3', 150], ['🕯️', '#E8EFE9', 183], ['🔖', '#FDE2DE', 64], ['☕', '#E3ECF7', 119], ['📅', '#F3E7D3', 92], ['🎀', '#E8EFE9', 141], ['✉️', '#FDE2DE', 58], ['🧴', '#E3ECF7', 73]];
  document.getElementById('insta').innerHTML = POSTS.map(([e, bg, l]) => `<a href="https://www.instagram.com" target="_blank" rel="noopener" style="background:${bg}" data-likes="${l}" aria-label="Post Instagram">${e}</a>`).join('');

  const burger = document.getElementById('burger'), links = document.getElementById('navLinks');
  burger.addEventListener('click', () => { const o = links.classList.toggle('nav__links--open'); burger.setAttribute('aria-expanded', o); });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('nav__links--open')));
})();
