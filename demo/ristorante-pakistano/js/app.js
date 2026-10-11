/* Grill Milano — bilingual menu, hours, nav */
(function () {
  const T = {
    it: { skip: "Vai al contenuto", demo: "Progetto demo realizzato da <strong>Zimalify</strong> — Vuoi un sito così?", demoShort: "Progetto demo realizzato da <strong>Zimalify</strong>", demoCta: "Scrivici →", "nav.menu": "Menu", "nav.about": "Chi siamo", "nav.gallery": "Galleria", "nav.where": "Orari e dove", "nav.contact": "Contatti", book: "Prenota su WhatsApp",
      "hero.eyebrow": "Porta Venezia · Milano · tandoor a carbone", "hero.lead": "I sapori del Punjab, cotti come a Lahore: biryani al vapore, karahi nel wok di ferro, kebab dal tandoor a carbone. Tutta la carne è Halal.", "hero.menu": "Vedi il menu",
      "menu.eyebrow": "Il menu", "menu.title": "Dal tandoor e dalla pentola", "about.eyebrow": "Chi siamo", "about.title": "Da Lahore a Porta Venezia",
      "about.p1": "La famiglia Butt ha aperto il primo Grill Milano nel 2009 in un locale di quattro tavoli. Le ricette sono quelle di Ammi, la mamma: il garam masala si tosta ogni mattina e il nihari cuoce tutta la notte.",
      "about.p2": "Oggi abbiamo 70 coperti, un tandoor a carbone e una sala privata per le feste. Tutta la carne è certificata Halal e la cucina è aperta a tutti, anche a chi mangia piccante zero.",
      "gallery.eyebrow": "Galleria", "gallery.title": "Piatti e sala", "where.eyebrow": "Orari e dove siamo", "where.p": "A 2 minuti dalla fermata Porta Venezia (M1). Aperti tutti i giorni, pranzo e cena. Consegna a domicilio su Glovo e Deliveroo.",
      "contact.eyebrow": "Contatti", "contact.title": "Prenota un tavolo", "contact.p": "Scrivici su WhatsApp con giorno, ora e numero di persone. Per gruppi oltre 10 persone e feste, chiedi della sala privata.",
      "foot.demo": "Attività fittizia a scopo dimostrativo. Sito realizzato da", "foot.photo": "Foto:", "qr.summary": "QR code per i tavoli", "qr.hint": "Inquadra per aprire zimalify.com/demo/ristorante-pakistano/menu.html", "qr.print": "Stampa", "qr.back": "Torna al sito", title: "Grill Milano — Cucina pakistana Halal" },
    en: { skip: "Skip to content", demo: "Demo project by <strong>Zimalify</strong> — Want a site like this?", demoShort: "Demo project by <strong>Zimalify</strong>", demoCta: "Get in touch →", "nav.menu": "Menu", "nav.about": "About", "nav.gallery": "Gallery", "nav.where": "Hours & location", "nav.contact": "Contact", book: "Book on WhatsApp",
      "hero.eyebrow": "Porta Venezia · Milan · charcoal tandoor", "hero.lead": "The flavours of Punjab, cooked the Lahore way: steamed biryani, karahi in the iron wok, kebabs from the charcoal tandoor. All meat is Halal.", "hero.menu": "See the menu",
      "menu.eyebrow": "The menu", "menu.title": "From the tandoor and the pot", "about.eyebrow": "About us", "about.title": "From Lahore to Porta Venezia",
      "about.p1": "The Butt family opened the first Grill Milano in 2009 in a four-table room. The recipes are Ammi's, our mother's: garam masala is toasted every morning and the nihari cooks all night.",
      "about.p2": "Today we have 70 seats, a charcoal tandoor and a private room for parties. All meat is certified Halal and the kitchen welcomes everyone, including those who want zero spice.",
      "gallery.eyebrow": "Gallery", "gallery.title": "Dishes and dining room", "where.eyebrow": "Hours and location", "where.p": "2 minutes from Porta Venezia metro (M1). Open every day for lunch and dinner. Delivery via Glovo and Deliveroo.",
      "contact.eyebrow": "Contact", "contact.title": "Book a table", "contact.p": "Message us on WhatsApp with the day, time and number of guests. For groups over 10 and parties, ask about the private room.",
      "foot.demo": "Fictional business for demonstration. Website by", "foot.photo": "Photos:", "qr.summary": "QR code for tables", "qr.hint": "Scan to open zimalify.com/demo/ristorante-pakistano/menu.html", "qr.print": "Print", "qr.back": "Back to the site", title: "Grill Milano — Halal Pakistani cuisine" }
  };
  let lang = (() => { const q = new URLSearchParams(location.search).get('lang'); if (q && T[q]) return q; try { const s = localStorage.getItem('lg-lang'); if (s && T[s]) return s; } catch (_) {} return 'it'; })();
  const t = k => T[lang][k] ?? T.it[k] ?? k;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const eur = n => (Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')) + ' €';
  const tags = tg => tg.map(x => ` <span class="tag" title="${esc(window.TAG_LABELS[x][lang])}">${x}</span>`).join('');
  const dish = ([n, d, p, tg], i) => `<article class="dish" style="--i:${i}"><h3>${esc(n)}${tags(tg)}</h3><span class="price">${eur(p)}</span><p>${esc(d[lang])}</p></article>`;
  const cats = window.MENU;
  let cur = cats[0].id;

  const tabs = document.getElementById('menuTabs'), list = document.getElementById('menuList');
  const qr = document.getElementById('qrMenu'), bar = document.getElementById('catBar');
  const renderMenu = () => {
    if (tabs && list) {
      tabs.innerHTML = cats.map(c => `<button class="tab${c.id === cur ? ' tab--on' : ''}" role="tab" aria-selected="${c.id === cur}" data-cat="${c.id}">${esc(c[lang])}</button>`).join('');
      list.innerHTML = cats.find(c => c.id === cur).items.map(dish).join('');
    }
    if (qr && bar) {
      qr.innerHTML = cats.map(c => `<section class="qr__cat" id="cat-${c.id}"><h2>${esc(c[lang])}</h2>${c.items.map(dish).join('')}</section>`).join('');
      bar.innerHTML = cats.map(c => `<a href="#cat-${c.id}">${esc(c[lang])}</a>`).join('');
    }
    const U = window.UI[lang];
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('menuNote', U.menuNote); set('tV', U.veg); set('tVG', U.vegan); set('tSG', U.gf); set('phoneMenu', U.phoneMenu);
  };
  tabs?.addEventListener('click', e => { const b = e.target.closest('.tab'); if (!b) return; cur = b.dataset.cat; renderMenu(); });

  /* Hours */
  const HOURS = [[12, 15], [18.5, 23.5]];
  const fmt = h => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`;
  const renderHours = () => {
    const U = window.UI[lang], now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
    const table = document.getElementById('hoursTable');
    if (table) table.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => `<tr class="${d === day ? 'today' : ''}"><th scope="row">${U.days[d]}</th><td>${HOURS.map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join(' · ')}</td></tr>`).join('');
    const open = HOURS.some(([a, b]) => h >= a && h < b), next = HOURS.find(([a]) => a > h);
    const dot = document.getElementById('openDot'), txt = document.getElementById('openText');
    if (dot) { dot.classList.toggle('off', !open); txt.textContent = open ? U.open : `${U.closed} · ${U.opensAt} ${fmt(next ? next[0] : HOURS[0][0])}`; }
  };

  const apply = () => {
    document.documentElement.lang = lang; document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); /<[a-z]/i.test(v) ? el.innerHTML = v : el.textContent = v; });
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    renderMenu(); renderHours();
  };
  document.querySelectorAll('.lang').forEach(g => g.addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (!b) return; lang = b.dataset.lang; try { localStorage.setItem('lg-lang', lang); } catch (_) {} apply(); }));
  apply();

  /* QR page: sticky category bar highlight + print */
  if (qr && bar && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { bar.querySelectorAll('a').forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id)); bar.querySelector('.on')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } }), { rootMargin: '-30% 0px -60% 0px' });
    qr.querySelectorAll('.qr__cat').forEach(s => io.observe(s));
  }
  document.getElementById('printQr')?.addEventListener('click', () => window.print());

  /* Nav */
  const burger = document.getElementById('burger'), links = document.getElementById('navLinks'), nav = document.getElementById('nav');
  if (burger) {
    burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
  }

  /* Reveal */
  const io2 = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } }), { threshold: 0.1 }) : null;
  document.querySelectorAll('.section, .gallery figure').forEach(el => io2 ? io2.observe(el) : el.classList.add('in'));
})();
