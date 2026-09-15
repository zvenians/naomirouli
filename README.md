# Naomi Rouli — Personal Editorial Website & Visual Tribute

> An intimate, typography-led digital archive and visual tribute crafted with modern web standards.

[![Status](https://img.shields.io/badge/Status-Personal_Creative_Project-success?style=flat-square)](#)
[![Live Demo](https://img.shields.io/badge/Live_Site-naomirouli.web.app-black?style=flat-square&logo=google-chrome&logoColor=white)](https://naomirouli.web.app)
[![Hosting](https://img.shields.io/badge/Hosting-Firebase-orange?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_HTML5%20%2F%20CSS3%20%2F%20ES6+-blue?style=flat-square)](https://developer.mozilla.org/)

---

## 1. Overview & Concept

**Naomi Rouli** is a bespoke personal editorial website and visual tribute. Designed around the aesthetic cadence of an indie print magazine or cinematic exhibition catalog, the site presents a nine-chapter narrative celebrating shared memories, personal milestones, and candid portraits.

Rather than relying on generic modern single-page site templates or heavy client-side frameworks, the site emphasizes artisanal web typography, delicate motion, tactile grain texture, and intentional pacing.

---

## 2. Visual & Interaction Architecture

The experience is structured across nine sequential scenes, each accompanied by dedicated chapter identifiers and typographic hierarchy:

| Scene | Chapter Title | Concept & Composition |
|:-----:|:--------------|:----------------------|
| **`01`** | **Hero Opening** | High-priority hero portrait, delicate typography, and atmospheric ambient entrance. |
| **`02`** | **A Name** | Polaroid-style frame (`fig. 02.01`) paired with editorial typography and introduction copy. |
| **`03`** | **Her** | Character traits badge system (`kind heart`, `funny mind`, `beautiful soul`, `my peace`) and featured portrait. |
| **`04`** | **Little Things** | Asymmetrical editorial grid highlighting quirky micro-moments and cherished habits. |
| **`05`** | **Little Archive** | Horizontal momentum-based photo rail supporting touch swipe and desktop pointer drag. |
| **`06`** | **How It Started** | Storytelling narrative detailing the retreat memory, bag mishap, and initial messages. |
| **`07`** | **The Date** | Commemorative stamp celebrating the milestone date (`08.08.2023`). |
| **`08`** | **Private Note** | Interactive letter overlay triggered by user action, featuring letter reveal and song pairing. |
| **`09`** | **Ending & Credits** | Concluding sentiment, subtle copyright acknowledgment, and footer colophon. |

---

## 3. Technical Highlights

- **IntersectionObserver Navigation:** Multi-threshold observer continuously recalculates the active section, driving the real-time sticky topbar chapter indicator (`01 / 09` through `09 / 09`) and lateral index sidebar without scroll jitter.
- **Fluid Horizontal Rail Drag:** Custom Pointer Events implementation featuring `setPointerCapture`, delta acceleration, and responsive touch isolation for natural desktop and mobile gallery browsing.
- **Accessible Modal Management:** Interactive letter overlay with keyboard focus trapping and smooth CSS transition states.
- **Fine-Tuned Typography:** Pairings of **Instrument Serif** (display italics), **DM Mono** (editorial figures and technical metadata), and **DM Sans** (clean, readable prose).
- **Tactile Grain Simulation:** Fixed, hardware-accelerated SVG noise overlay providing a film-like photographic atmosphere.
- **Zero Framework Overhead:** Pure semantic HTML5, modular CSS custom properties, and lightweight vanilla ES6+ JavaScript. Loads in under 200ms on modern connections.
- **Optimized Assets:** High-resolution photography converted and compressed into modern `.webp` formats.

---

## 4. Repository Structure

```text
naomirouli/
├── .firebaserc                # Firebase project configuration
├── firebase.json              # Firebase Hosting configuration & caching rules
├── index.html                 # Semantic 9-scene HTML document
├── style.css                  # Custom property design tokens, typography, & layouts
├── script.js                  # IntersectionObserver, progress bar, & pointer drag handlers
└── assets/
    └── photos/                # Optimized .webp image assets and polaroid plates
```

---

## 5. Local Development

To run or preview the project locally, any standard static web server can be used:

```bash
# Using python built-in server:
python -m http.server 8000

# Or using npx serve:
npx serve .
```

Open `http://localhost:8000` (or the displayed port) in your web browser.

---

## 6. Deployment

The site is configured for continuous static deployment via **Firebase Hosting**:

```bash
# 1. Install Firebase CLI (if not installed)
npm install -g firebase-tools

# 2. Authenticate
firebase login

# 3. Deploy to production
firebase deploy --only hosting
```

Production deployment URL: **[https://naomirouli.web.app](https://naomirouli.web.app)**

---

## 7. Copyright & Privacy Notice

- The design layout, custom CSS architecture, and interaction scripts are made available for inspiration and educational review.
- All personal photographs in `assets/photos/`, private notes, and editorial text are private property of the author and subject. All Rights Reserved.
