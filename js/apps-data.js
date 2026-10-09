/* =========================================================
   ZIMALIFY — APP & CONTENT DATA
   This is the ONE file to edit when you add or change apps,
   testimonials or store links. No HTML changes needed.

   Each app:
     id          short unique slug (used for filtering / anchors)
     name        app name as shown in the store
     tagline     one short line shown on the card
     description longer text, shown for the featured app
     category    e.g. "Utilities", "Health", "Productivity", "Finance", "Games"
     platforms   ["ios"], ["android"] or ["ios","android"]
     icon        either { image: "assets/apps/cleanerzx.png" }
                 or     { glyph: "🧹", from: "#3B82F6", to: "#8B5CF6" }  (gradient tile)
     rating      number, e.g. 4.8   (optional)
     downloads   string, e.g. "100K+" (optional)
     appStore    full App Store URL, or null
     playStore   full Google Play URL, or null
     featured    true for the one app shown large at the top
     highlights  array of 3 short bullets (featured app only)
     subtitle    optional store subtitle, e.g. "Storage Cleaner"
     screenshots optional array of image paths; the featured app shows them in a phone frame
     price       optional, e.g. "Free" or "$2.99"
     requires    optional, e.g. "iOS 17.6+" / "Android 8+"
     version     optional current version string
     it          optional Italian copy: { tagline, description, highlights }
                 (add more languages the same way, e.g. "de": {...})
   ========================================================= */

window.ZIMALIFY_APPS = [
  {
    id: "cleanerzx",
    it: { tagline: "Pulizia intelligente dello spazio su iPhone, con l'AI.", description: "CleanerZX analizza la tua libreria con l'AI sul dispositivo e raggruppa duplicati, scatti simili, screenshot, video pesanti e contatti inutilizzati in raccolte rapide da rivedere. Scorri per tenere o eliminare: ogni cancellazione viene prima confermata da te.", highlights: ["Rilevamento di foto duplicate e simili", "Screenshot, video pesanti e contatti inutilizzati", "Pulizia a scorrimento con revisione sicura prima di eliminare"] },
    name: "CleanerZX",
    subtitle: "Storage Cleaner",
    tagline: "Smart AI storage cleaner for iPhone.",
    description: "CleanerZX scans your library with on-device AI and groups duplicates, similar shots, screenshots, large videos and unused contacts into quick-to-review collections. Swipe to keep or remove, and every deletion is confirmed by you first.",
    category: "Utilities",
    platforms: ["ios"],
    icon: { image: "assets/apps/cleanerzx/icon.jpg" },
    screenshots: ["assets/apps/cleanerzx/shot1.jpg", "assets/apps/cleanerzx/shot2.jpg", "assets/apps/cleanerzx/shot3.jpg", "assets/apps/cleanerzx/shot4.jpg"],
    price: "Free",
    requires: "iOS 17.6+",
    version: "1.2.3",
    rating: null,
    downloads: null,
    appStore: "https://apps.apple.com/us/app/cleanerzx-storage-cleaner/id6768248417",
    playStore: null,
    featured: true,
    highlights: ["Duplicate & similar photo detection", "Screenshots, large videos & unused contacts", "Swipe-based cleanup with secure review before delete"]
  },
  {
    id: "finovo",
    it: { tagline: "Sai dove vanno i tuoi soldi, senza collegare la banca.", description: "Tracciamento spese, budget, scansione scontrini, abbonamenti e più portafogli in un'unica vista chiara. Registra entrate e uscite, vedi quanto resta e capisci le tue finanze con grafici facili da leggere.", highlights: ["Budget settimanali, mensili e annuali con limiti per categoria", "Scansione scontrini e calendario delle spese ricorrenti", "Più portafogli, trasferimenti e spese condivise"] },
    name: "Finovo",
    subtitle: "Budget Expense Tracker",
    tagline: "Know where your money goes, no bank connection needed.",
    description: "Expense tracking, budgets, receipt scanning, subscriptions and multiple wallets in one clear view. Log what you spend and earn, see what remains, and understand your money with easy-to-read charts.",
    category: "Finance",
    platforms: ["ios"],
    icon: { image: "assets/apps/finovo/icon.jpg" },
    screenshots: ["assets/apps/finovo/shot1.jpg", "assets/apps/finovo/shot2.jpg", "assets/apps/finovo/shot3.jpg", "assets/apps/finovo/shot4.jpg"],
    price: "Free",
    requires: "iOS 17.6+",
    version: "1.2",
    rating: null,
    downloads: null,
    appStore: "https://apps.apple.com/us/app/finovo-budget-expense-tracker/id6769012878",
    playStore: null,
    highlights: ["Weekly, monthly and yearly budgets with category limits", "Receipt scanning and recurring bills calendar", "Multiple wallets, transfers and split expenses"]
  },
  {
    id: "mealburn",
    it: { tagline: "Fotografa un pasto, ottieni calorie e macro in pochi secondi.", description: "Scansiona la foto di un pasto con l'AI per stimare calorie, proteine, carboidrati e grassi, oppure cerca in un ampio database alimentare. Bilancia ciò che mangi con ciò che bruci tramite Apple Salute, con serie, widget e andamenti settimanali.", highlights: ["Scansione AI delle foto per calorie e macro", "Budget calorico personale: mangiate, bruciate, rimanenti", "Sincronizzazione con Apple Salute, serie e widget"] },
    name: "MealBurn",
    subtitle: "Calorie Counter",
    tagline: "Snap a meal, get calories and macros in seconds.",
    description: "Scan a meal photo with AI to estimate calories, protein, carbs and fat, or search a large food database. Balance what you eat with what you burn via Apple Health, with streaks, widgets and weekly trends.",
    category: "Health & Fitness",
    platforms: ["ios"],
    icon: { image: "assets/apps/mealburn/icon.jpg" },
    screenshots: ["assets/apps/mealburn/shot1.jpg", "assets/apps/mealburn/shot2.jpg", "assets/apps/mealburn/shot3.jpg", "assets/apps/mealburn/shot4.jpg"],
    price: "Free",
    requires: "iOS 17.6+",
    version: "1.1",
    rating: null,
    downloads: null,
    appStore: "https://apps.apple.com/us/app/mealburn-calorie-counter/id6779972688",
    playStore: null,
    highlights: ["AI photo scan for calories and macros", "Personal calorie budget: eaten, burned, remaining", "Apple Health sync, streaks and Home Screen widgets"]
  },
  {
    id: "pulsestate",
    it: { tagline: "Capisci il tuo corpo. Allenati meglio. Recupera meglio.", description: "PulseState riunisce HRV, frequenza cardiaca a riposo, sonno, attività e allenamenti da Apple Salute in un'unica vista pensata per gli atleti, confrontata con la tua baseline personale. Stato del corpo giornaliero, punteggio di recupero, stress, fasi del sonno, carico di allenamento e diario, tutto su una sola timeline.", highlights: ["Punteggio di recupero da HRV, sonno e frequenza a riposo", "Fasi del sonno, andamento dello stress e carico di allenamento", "Pianifica una sessione e vedi l'effetto sul tuo stato"] },
    name: "PulseState",
    subtitle: "Recovery & HRV",
    tagline: "Understand your body. Train smarter. Recover better.",
    description: "PulseState brings HRV, resting heart rate, sleep, activity and workouts from Apple Health into one athlete-focused view, compared against your personal baseline. Daily body state, recovery score, stress pattern, sleep stages, training load and a journal, all on one timeline.",
    category: "Health & Fitness",
    platforms: ["ios"],
    icon: { image: "assets/apps/pulsestate/icon.jpg" },
    screenshots: ["assets/apps/pulsestate/shot1.jpg", "assets/apps/pulsestate/shot2.jpg", "assets/apps/pulsestate/shot3.jpg", "assets/apps/pulsestate/shot4.jpg"],
    price: "Free",
    requires: "iOS 17.6+",
    version: "1.0",
    rating: null,
    downloads: null,
    appStore: "https://apps.apple.com/us/app/pulsestate-recovery-hrv/id6803796804",
    playStore: null,
    highlights: ["Recovery score from HRV, sleep and resting heart rate", "Sleep stages, stress pattern and training load", "Plan a session and preview its effect on your body state"]
  },
  {
    id: "siptrack",
    it: { tagline: "Vedi la tua idratazione. Costruisci l'abitudine.", description: "Un tracker dell'acqua semplice e visivo. Registra le bevute in pochi secondi, imposta un obiettivo giornaliero, ricevi promemoria discreti e guarda il livello di idratazione riempirsi durante la giornata.", highlights: ["Livello di idratazione visivo, non solo numeri", "Registra una bevuta in due tocchi", "Obiettivo giornaliero, promemoria e storico"] },
    name: "SipTrack",
    subtitle: "Water Tracker",
    tagline: "See your hydration. Build the habit.",
    description: "A simple, visual water tracker. Log drinks in seconds, set a daily goal, get gentle reminders and watch your hydration level fill up through the day.",
    category: "Health & Fitness",
    platforms: ["ios"],
    icon: { image: "assets/apps/siptrack/icon.jpg" },
    screenshots: ["assets/apps/siptrack/shot1.jpg", "assets/apps/siptrack/shot2.jpg", "assets/apps/siptrack/shot3.jpg", "assets/apps/siptrack/shot4.jpg"],
    price: "Free",
    requires: "iOS 17.6+",
    version: "1.1",
    rating: null,
    downloads: null,
    appStore: "https://apps.apple.com/us/app/siptrack-water-tracker/id6801585404",
    playStore: null,
    highlights: ["Visual hydration level instead of just numbers", "Log a drink in two taps", "Daily goal, reminders and progress history"]
  }
];

/* PLACEHOLDER TESTIMONIALS — these quotes are invented examples.
   Replace with real App Store reviews or client quotes before launch.
   source: "App Store", "Google Play" or "Client" */
window.ZIMALIFY_TESTIMONIALS = [
  {
    quote: "Freed up 14 GB on my phone in under a minute. The duplicate finder is scary good and it never deleted anything I wanted to keep.",
    author: "Sarah K.",
    role: "CleanerZX user",
    source: "App Store",
    rating: 5
  },
  {
    quote: "They ported our iOS app to Android in eight weeks with every feature intact. Communication was weekly, honest and clear.",
    author: "Daniel R.",
    role: "Founder, client project",
    source: "Client",
    rating: 5
  },
  {
    quote: "Finally a recovery app that explains the numbers. Seeing HRV and sleep against my own baseline changed how I plan training days.",
    author: "Priya M.",
    role: "PulseState user",
    source: "Google Play",
    rating: 5
  },
  {
    quote: "Our design handoff was flawless. The prototype they built let us test with customers before spending on development.",
    author: "Lena O.",
    role: "Product Manager, client project",
    source: "Client",
    rating: 5
  },
  {
    quote: "Photo scan is surprisingly accurate. Logging a meal takes five seconds now, so I actually stick with it.",
    author: "Tom B.",
    role: "MealBurn user",
    source: "App Store",
    rating: 4
  },
  {
    quote: "Rejected twice by App Review before we hired them. Approved on the first resubmission.",
    author: "Ahmed S.",
    role: "Startup founder, client project",
    source: "Client",
    rating: 5
  }
];
