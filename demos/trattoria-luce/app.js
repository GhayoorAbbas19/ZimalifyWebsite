(function () {
  const MENU = {
    'Antipasti': [
      ['Mondeghili della casa', 'Polpettine milanesi fritte, salsa verde', '9', ''],
      ['Nervetti in insalata', 'Cipolla rossa, fagioli, olio del Garda', '8', 'SG'],
      ['Burrata e zucca arrosto', 'Nocciole piemontesi, miele di castagno', '11', 'V SG'],
      ['Tagliere lombardo', 'Salame di Varzi, bresaola, formaggi d\'alpeggio', '14', 'SG']
    ],
    'Primi': [
      ['Risotto allo zafferano', 'Carnaroli della Lomellina, mantecato al momento, min. 2 persone', '15', 'V SG'],
      ['Casoncelli alla bergamasca', 'Burro, salvia e pancetta croccante', '14', ''],
      ['Tortelli di zucca', 'Amaretti, mostarda, burro nocciola', '14', 'V'],
      ['Minestrone alla milanese', 'Con riso, verdure dell\'orto, servito tiepido', '11', 'V SG']
    ],
    'Secondi': [
      ['Cotoletta alla milanese', 'Costoletta di vitello con l\'osso, burro chiarificato, 350 g', '26', ''],
      ['Ossobuco con gremolada', 'Servito con risotto giallo', '24', 'SG'],
      ['Cassoeula (da ottobre)', 'Verza e maiale, polenta di Storo', '19', 'SG'],
      ['Verdure di stagione alla griglia', 'Con crema di ceci e olio al rosmarino', '15', 'V SG']
    ],
    'Dolci': [
      ['Torta paesana', 'Pane, cacao, amaretti e uvetta, servita con panna', '7', 'V'],
      ['Crema al mascarpone', 'Con savoiardi di Saronno', '7', 'V'],
      ['Sbrisolona e zabaione', 'Mandorle e Marsala', '7', 'V'],
      ['Gelato di Grom al fior di latte', 'Con olio e sale', '6', 'V SG']
    ],
    'Vini': [
      ['Franciacorta Brut, Barone Pizzini', 'Lombardia · calice 8 / bottiglia 38', '8', 'V'],
      ['Lugana, Cà dei Frati', 'Lombardia · calice 7 / bottiglia 32', '7', 'V'],
      ['Valtellina Superiore, Nino Negri', 'Lombardia · bottiglia', '42', 'V'],
      ['Bonarda frizzante, Oltrepò', 'Alla spina, 1/2 litro', '9', 'V']
    ]
  };

  const tabs = document.getElementById('menuTabs');
  const list = document.getElementById('menuList');
  const cats = Object.keys(MENU);
  let current = cats[0];
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const render = () => {
    tabs.innerHTML = cats.map(c => `<button class="tab${c === current ? ' tab--on' : ''}" role="tab" aria-selected="${c === current}" data-cat="${c}">${c}</button>`).join('');
    list.innerHTML = MENU[current].map(([n, d, p, t], i) => `<article class="dish" style="animation-delay:${i * 50}ms"><h3>${esc(n)}${t.split(' ').filter(Boolean).map(x => ` <span class="tag">${x}</span>`).join('')}</h3><span class="price">${p} €</span><p>${esc(d)}</p></article>`).join('');
  };
  tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; current = b.dataset.cat; render(); });
  render();

  /* Open-now badge from the opening hours */
  const hours = { 0: [[12.5, 15]], 1: [], 2: [[12.5, 14.5], [19.5, 23]], 3: [[12.5, 14.5], [19.5, 23]], 4: [[12.5, 14.5], [19.5, 23]], 5: [[12.5, 14.5], [19.5, 23]], 6: [[12.5, 15], [19.5, 23.5]] };
  const now = new Date(); const h = now.getHours() + now.getMinutes() / 60;
  const open = (hours[now.getDay()] || []).some(([a, b]) => h >= a && h < b);
  const badge = document.getElementById('openNow');
  badge.textContent = open ? 'Aperto ora' : 'Chiuso ora'; badge.classList.toggle('closed', !open);

  /* Booking form composes a WhatsApp message */
  document.getElementById('bookForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const d = f.get('data') ? new Date(f.get('data')).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
    const msg = `Buongiorno! Vorrei prenotare un tavolo alla Trattoria Luce.\nNome: ${f.get('nome')}\nData: ${d}\nOra: ${f.get('ora')}\nPersone: ${f.get('persone')}${f.get('note') ? `\nNote: ${f.get('note')}` : ''}\nGrazie!`;
    window.open('https://wa.me/393444091624?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
  const dateInput = document.querySelector('input[name="data"]');
  dateInput.min = new Date().toISOString().slice(0, 10);

  /* Mobile nav + print QR */
  const burger = document.getElementById('burger'), links = document.getElementById('navLinks');
  burger.addEventListener('click', () => { const o = links.classList.toggle('nav__links--open'); burger.setAttribute('aria-expanded', o); });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('nav__links--open')));
  document.getElementById('qrPrint').addEventListener('click', e => { e.preventDefault(); window.print(); });
})();
