/* Grill Milano — menu data. Dish names stay in their original form; descriptions in Italian (it) and English (en). Prices in euros. */
window.MENU = [
  { id: "starters", it: "Starters", en: "Starters", items: [
    ["Samosa (2 pz)", { it: "Sfoglia croccante ripiena di patate e piselli speziati, chutney di tamarindo", en: "Crispy pastry filled with spiced potatoes and peas, tamarind chutney" }, 5, ["V"]],
    ["Chicken Pakora", { it: "Bocconcini di pollo in pastella di ceci, salsa alla menta", en: "Chicken bites in chickpea batter, mint sauce" }, 7, ["SG"]],
    ["Chana Chaat", { it: "Ceci, cipolla, pomodoro, yogurt e spezie chaat, servito freddo", en: "Chickpeas, onion, tomato, yogurt and chaat spices, served cold" }, 6.5, ["V", "SG"]],
    ["Dahi Bhalla", { it: "Frittelle di lenticchie nello yogurt con chutney dolce", en: "Lentil fritters in yogurt with sweet chutney" }, 6, ["V"]]
  ]},
  { id: "grill", it: "Grill", en: "Grill", items: [
    ["Seekh Kebab (2 pz)", { it: "Spiedini di manzo macinato con coriandolo e peperoncino verde, dal forno tandoor", en: "Minced beef skewers with coriander and green chilli, from the tandoor" }, 9.5, ["SG"]],
    ["Chicken Tikka", { it: "Cosce di pollo marinate 24 ore in yogurt e spezie, grigliate al carbone", en: "Chicken thighs marinated 24 h in yogurt and spices, charcoal grilled" }, 11, ["SG"]],
    ["Lamb Chops", { it: "Costolette d'agnello marinate, 4 pezzi, con cipolla e lime", en: "Marinated lamb chops, 4 pieces, with onion and lime" }, 18, ["SG"]],
    ["Mixed Grill", { it: "Seekh kebab, chicken tikka, lamb chop e malai boti, per 2 persone", en: "Seekh kebab, chicken tikka, lamb chop and malai boti, for 2 people" }, 29, ["SG"]]
  ]},
  { id: "curry", it: "Curry", en: "Curry", items: [
    ["Chicken Karahi", { it: "Pollo cotto nel wok di ferro con pomodoro, zenzero, aglio e peperoncino verde", en: "Chicken cooked in the iron wok with tomato, ginger, garlic and green chilli" }, 14, ["SG"]],
    ["Nihari", { it: "Stinco di manzo brasato per 8 ore nelle spezie, il piatto della domenica di Lahore", en: "Beef shank braised for 8 hours in spices, Lahore's Sunday dish" }, 15, ["SG"]],
    ["Daal Makhani", { it: "Lenticchie nere e fagioli cotti lentamente con burro e panna", en: "Black lentils and kidney beans slow-cooked with butter and cream" }, 10, ["V", "SG"]],
    ["Palak Paneer", { it: "Spinaci con formaggio fresco e spezie delicate", en: "Spinach with fresh cheese and mild spices" }, 11, ["V", "SG"]],
    ["Haleem", { it: "Grano, lenticchie e manzo cotti fino a diventare crema, con zenzero e limone", en: "Wheat, lentils and beef slow-cooked to a cream, with ginger and lemon" }, 13, []]
  ]},
  { id: "riso", it: "Riso e pane", en: "Rice and bread", items: [
    ["Chicken Biryani", { it: "Riso basmati stratificato con pollo, zafferano, menta e cipolla fritta", en: "Basmati rice layered with chicken, saffron, mint and fried onion" }, 13, ["SG"]],
    ["Lamb Biryani", { it: "Con agnello marinato, cotto 'dum' a vapore", en: "With marinated lamb, steam-cooked 'dum' style" }, 15, ["SG"]],
    ["Naan / Garlic Naan", { it: "Dal tandoor, semplice o all'aglio e coriandolo", en: "From the tandoor, plain or with garlic and coriander" }, 2.5, ["V"]],
    ["Roti", { it: "Pane integrale sottile, senza lievito", en: "Thin wholewheat bread, unleavened" }, 1.5, ["V", "VG"]],
    ["Riso basmati", { it: "Al vapore, con cumino", en: "Steamed, with cumin" }, 3.5, ["V", "VG", "SG"]]
  ]},
  { id: "dolci", it: "Dolci", en: "Desserts", items: [
    ["Gulab Jamun (2 pz)", { it: "Palline di latte fritte nello sciroppo di cardamomo e acqua di rose", en: "Fried milk dumplings in cardamom and rose water syrup" }, 5, ["V"]],
    ["Kheer", { it: "Budino di riso al cardamomo con pistacchi", en: "Cardamom rice pudding with pistachios" }, 5, ["V", "SG"]],
    ["Kulfi", { it: "Gelato tradizionale al pistacchio o mango", en: "Traditional ice cream, pistachio or mango" }, 5.5, ["V", "SG"]]
  ]},
  { id: "bevande", it: "Bevande", en: "Drinks", items: [
    ["Mango Lassi", { it: "Yogurt frullato con mango Alphonso", en: "Yogurt blended with Alphonso mango" }, 4.5, ["V", "SG"]],
    ["Chai", { it: "Tè nero al latte con cardamomo, versato bollente", en: "Black tea with milk and cardamom, served hot" }, 2.5, ["V", "SG"]],
    ["Acqua 75 cl", { it: "Naturale o frizzante", en: "Still or sparkling" }, 2.5, []],
    ["Bibite 33 cl", { it: "Coca-Cola, Fanta, tè freddo", en: "Coca-Cola, Fanta, iced tea" }, 3, []],
    ["Succo di canna", { it: "Spremuto al momento, con lime e zenzero", en: "Freshly pressed, with lime and ginger" }, 4, ["V", "VG"]]
  ]}
];
window.TAG_LABELS = { V: { it: "Vegetariano", en: "Vegetarian" }, VG: { it: "Vegano", en: "Vegan" }, SG: { it: "Senza glutine", en: "Gluten-free" } };
window.UI = {
  it: { menuNote: "Tutta la carne è Halal. Coperto 2 €.", veg: "veg", vegan: "vegano", gf: "senza glutine", open: "Aperto ora", closed: "Chiuso ora", opensAt: "apriamo alle", days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], closedDay: "Chiuso", phoneMenu: "Versione per smartphone →" },
  en: { menuNote: "All meat is Halal. Cover charge €2.", veg: "veg", vegan: "vegan", gf: "gluten-free", open: "Open now", closed: "Closed now", opensAt: "opens at", days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], closedDay: "Closed", phoneMenu: "Phone version →" }
};
