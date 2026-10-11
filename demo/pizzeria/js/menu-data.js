/* Pizzeria Da Lino — menu data (shared by index.html and menu.html). Prices in euros. */
window.MENU = {
  "Antipasti": [
    ["Bruschette miste", "Pomodoro e basilico, ricotta e miele, crema di olive", 7.5, ["V"]],
    ["Tagliere Da Lino", "Prosciutto crudo di Parma 24 mesi, salame Milano, provolone, olive taggiasche", 14, []],
    ["Fiori di zucca fritti", "Ripieni di ricotta e alici, in pastella leggera", 9, []],
    ["Burrata pugliese", "Con pomodorini confit e pesto di basilico", 11, ["V"]]
  ],
  "Pizze": [
    ["Margherita", "San Marzano DOP, fior di latte, basilico, olio extravergine", 8.5, ["V"]],
    ["Marinara", "San Marzano, aglio, origano di Pantelleria, olio", 7, ["V", "VG"]],
    ["Diavola", "Fior di latte, spianata calabrese piccante, 'nduja", 11, []],
    ["Quattro formaggi", "Fior di latte, gorgonzola DOP, taleggio, grana", 11.5, ["V"]],
    ["Lino", "Bufala campana, pomodorini gialli, crudo di Parma, rucola", 14, []],
    ["Ortolana", "Verdure grigliate di stagione, scamorza affumicata", 11, ["V"]],
    ["Capricciosa", "Prosciutto cotto, funghi, carciofi, olive", 12, []],
    ["Senza glutine", "Qualsiasi pizza su impasto senza glutine", 2.5, ["SG"]]
  ],
  "Primi": [
    ["Risotto allo zafferano", "Carnaroli, zafferano in pistilli, mantecato al grana", 14, ["V", "SG"]],
    ["Lasagna della nonna", "Ragù di manzo cotto 6 ore, besciamella fatta in casa", 13, []],
    ["Spaghetti alle vongole", "Vongole veraci, aglio, prezzemolo, vino bianco", 15, []],
    ["Gnocchi al pomodoro", "Gnocchi di patate fatti a mano, basilico, grana", 11, ["V"]]
  ],
  "Dolci": [
    ["Tiramisù della casa", "Savoiardi, mascarpone, caffè Illy", 6.5, ["V"]],
    ["Panna cotta", "Con frutti di bosco o caramello", 6, ["V", "SG"]],
    ["Cannolo siciliano", "Ricotta di pecora, gocce di cioccolato, pistacchio", 6, ["V"]],
    ["Gelato artigianale", "Tre gusti a scelta", 5, ["V", "SG"]]
  ],
  "Bevande": [
    ["Acqua 75 cl", "Naturale o frizzante", 2.5, []],
    ["Bibite", "Coca-Cola, Fanta, Sprite, tè freddo 33 cl", 3, []],
    ["Birra Moretti 40 cl", "Alla spina", 5.5, []],
    ["Birra artigianale 33 cl", "Birrificio Lambrate, chiedi le etichette", 6.5, []],
    ["Vino della casa", "Rosso o bianco, calice 4,5 / caraffa 1/2 l", 9, []],
    ["Caffè e amari", "Espresso 1,5 · amaro o limoncello 4", 1.5, []]
  ]
};
window.TAG_LABELS = { V: "Vegetariano", VG: "Vegano", SG: "Senza glutine" };
