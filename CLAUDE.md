# Gevinstkalkulator - Project Context

## Overview
A Norwegian calculator web app that estimates cost savings from replacing physical home visits with digital visits in elderly care (hjemmetjenester). Built for municipalities to calculate potential benefits of digitalization.

## Tech Stack
- Pure HTML/CSS/JavaScript (no framework)
- html2pdf.js for PDF export (loaded via CDN)
- GitHub repo: https://github.com/walthertorset/gevinstkalkulator

## File Structure
- `index.html` - Main page structure
- `styles.css` - All styling with CSS Grid layout and CSS variables
- `script.js` - Calculator logic, slider sync, PDF export

## Key Features
1. **Input sliders with editable number fields** - Bidirectional sync between range sliders and number inputs
2. **Real-time calculation** - Results update instantly when inputs change
3. **PDF export** - Generates a clean formatted PDF with inputs and results
4. **Responsive design** - Two-column layout on desktop, stacks on mobile (<900px)

## Input Parameters
| Parameter | Norwegian Label | Range | Default |
|-----------|----------------|-------|---------|
| antallBrukere | Antall brukere | 1-500 | 30 |
| besokPerUke | Besøk per bruker per uke | 1-21 | 3 |
| tidPerBesok | Tid per besøk (minutter) | 5-120 | 30 |
| digitaliseringsgrad | Digitaliseringsgrad (%) | 5-80 | 20 |
| timekostnad | Kommunal timekostnad (NOK) | 300-1500 | 600 |

## Calculation Formula
```
totaleBesokPerUke = brukere × besokPerUke
erstattedeBesok = totaleBesokPerUke × (digitaliseringsgrad / 100)
frigjorteTimer = erstattedeBesok × tidPerBesok / 60
ukentligVerdi = frigjorteTimer × timekostnad
arligGevinst = ukentligVerdi × 52
```

## CSS Architecture
- CSS variables in `:root` for colors (primary: #3DBBB3, accent: #D81B84)
- Teal-to-magenta gradient for header and results section
- CSS Grid for main layout (`grid-template-columns: 1fr 1fr`)
- Grid for slider containers to align input boxes vertically
- Norwegian number formatting (space as thousand separator)

## Recent Changes
- Updated color scheme: teal-to-magenta gradient for header and results
- Removed email functionality (was demo-only)
- Fixed vertical alignment of input boxes using CSS Grid
- Added margin between unit labels and container edge
