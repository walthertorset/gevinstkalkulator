# Gevinstkalkulator - Project Context

## Overview
A Norwegian calculator web app ("Tellus Gevinstkalkulator") that estimates cost savings from replacing physical visits with digital alternatives in elderly care. Built for municipalities to calculate potential benefits of digitalization. Covers two Tellus products: **TelluVision** (digitalt tilsyn) and **TelluVisit** (digitale hjemmebesøk).

## Tech Stack
- Pure HTML/CSS/JavaScript (no framework)
- html2pdf.js for PDF export (loaded via CDN)
- GitHub repo: https://github.com/walthertorset/gevinstkalkulator

## File Structure
- `index.html` - Landing page with service selection (TelluVision / TelluVisit)
- `tilsyn.html` - Sub-selection page for TelluVision (Sykehjem vs Hjemmeboende)
- `tilsyn-sykehjem.html` - Calculator for digitalt tilsyn in sykehjem/omsorgsbolig (uses `data-page="sykehjem"` for page-specific logic)
- `tilsyn-hjemmeboende.html` - Calculator for digitalt tilsyn for hjemmeboende
- `hjemmebesok.html` - Calculator for digitale hjemmebesøk (TelluVisit)
- `styles.css` - All styling with CSS Grid layout and CSS variables
- `script.js` - Calculator logic, slider sync, PDF export (shared by all calculator pages, detects page type via `body[data-page]`)

## Navigation Flow
```
index.html (Tellus Gevinstkalkulator)
├── tilsyn.html (TelluVision - digitalt tilsyn)
│   ├── tilsyn-sykehjem.html (Sykehjem og omsorgsbolig)
│   └── tilsyn-hjemmeboende.html (Hjemmeboende)
└── hjemmebesok.html (TelluVisit - digitale hjemmebesøk)
```
- All calculator pages have a back-link in the header top-left corner
- Selection pages use `.service-selection` grid with `.service-card` links

## Key Features
1. **User count selection overlay** - On entering any calculator page, a modal asks for number of users (20, 50, 100, or custom). Controlled by `initUserSelection()` in script.js
2. **Input sliders with editable number fields** - Bidirectional sync between range sliders and number inputs
3. **Real-time calculation** - Results update instantly when inputs change
4. **PDF export** - Generates a clean formatted PDF with inputs and results (page-type aware for sykehjem vs default)
5. **Responsive design** - Two-column layout on desktop (results LEFT, assumptions RIGHT), stacks on mobile (<900px)

## Page Layout
- **Left column**: "Beregnet gevinst" (results) with "Årlig økonomisk gevinst" highlight card at top
- **Right column**: "Dine forutsetninger" (input assumptions/sliders)

## Input Parameters

### Hjemmebesøk & Hjemmeboende tilsyn (default)
| Parameter | Norwegian Label | Range | Default |
|-----------|----------------|-------|---------|
| antallBrukere | Antall brukere | 1-500 | 50 |
| besokPerUke | Besøk/tilsyn per bruker per uke | 1-21 | 7 |
| digitaliseringsgrad | Digitaliseringsgrad (%) | 5-80 | 50 |
| tidPerBesok | Tid per fysisk besøk/tilsyn (min) | 5-120 | 30 |
| tidPerDigitaltBesok | Tid per digitalt besøk/tilsyn (min) | 5-60 | 10 |
| timekostnad | Kommunal timekostnad (NOK) | 300-1500 | 600 |

### Sykehjem (tilsyn-sykehjem.html)
| Parameter | Norwegian Label | Range | Default |
|-----------|----------------|-------|---------|
| antallBrukere | Antall beboere | 1-500 | 50 |
| besokPerUke | Tilsyn per beboer per dag | 1-10 | 3 |
| digitaliseringsgrad | Digitaliseringsgrad (%) | 5-100 | 80 |
| tidPerBesok | Tid per fysisk tilsyn (min) | 1-30 | 5 |
| tidPerDigitaltBesok | Tid per digitalt tilsyn (min) | 1-15 | 1 |
| timekostnad | Kommunal timekostnad (NOK) | 300-1500 | 600 |

## Calculation Formulas

### Default (Hjemmebesøk & Hjemmeboende)
```
totaleBesokPerUke = brukere × besokPerUke
fysiskeBesok = totaleBesokPerUke × (1 - digitaliseringsgrad/100)
digitaleBesok = totaleBesokPerUke × (digitaliseringsgrad/100)
navaerendeTid = totaleBesokPerUke × fysiskTid / 60
optimalisertTid = (fysiskeBesok × fysiskTid + digitaleBesok × digitalTid) / 60
frigjorteTimer = navaerendeTid - optimalisertTid
ukentligVerdi = frigjorteTimer × timekostnad
arligGevinst = ukentligVerdi × 52
```

### Sykehjem
```
dagligBesparelse = beboere × tilsynPerDag × (fysiskTid - digitalTid) / 60 × digitaliseringsgrad × timekostnad
ukentligBesparelse = dagligBesparelse × 7
årligGevinst = dagligBesparelse × 365
```

Result cards for sykehjem: Årlig gevinst, Frigjort tid per tilsyn, Digitale tilsyn per dag, Daglig besparelse, Ukentlig besparelse.

## CSS Architecture
- CSS variables in `:root` for colors (primary: #3DBBB3, accent: #D81B84)
- Teal-to-magenta gradient for header
- CSS Grid for main layout (`grid-template-columns: 1fr 1fr`)
- Grid for slider containers to align input boxes vertically
- Norwegian number formatting (space as thousand separator)
- `.service-selection` grid for landing/selection pages
- `.back-link` positioned absolute top-left in header with semi-transparent background
- `.user-selection-overlay` for the initial user count modal (fixed position, backdrop blur)

## Recent Changes
- Added user count selection overlay on all calculator pages (20, 50, 100, or custom)
- Swapped layout: results on LEFT, assumptions on RIGHT
- Moved "Årlig økonomisk gevinst" highlight card to top of results section
- Increased font sizes in result cards
- Sykehjem calculator: separate calculation model (daily-based), different inputs/defaults/ranges
- PDF export is page-type aware (sykehjem vs default labels and results)
