# EduCore Website Design & Development Guide

## Overview

This guide documents the design system, architecture, and development patterns used in EduCore Open Learning Hub. It serves as both documentation and a template for maintaining consistency in future updates.

## Architecture Overview

### File Structure
```
educore-hub/
├── index.html          # Main HTML structure (semantic HTML5)
├── styles.css          # Design system with CSS variables (light/dark themes)
├── app.js              # Application logic (vanilla JavaScript, no frameworks)
├── data.json           # Resource data (static, curated)
├── README.md           # User-facing documentation
├── WEBSITE-GUIDE.md    # This file (development guide)
├── CONTRIBUTING.md     # Contribution guidelines
├── DATA_FORMAT.md      # Data schema documentation
└── LICENSE             # MIT License
```

## Design System

### CSS Architecture

The entire design system is built on **CSS Custom Properties (Variables)** for maintainability and theme support.

#### Color Variables
```css
:root {
  /* Core Palette */
  --primary: #4f46e5;        /* Indigo - Main interactive color */
  --primary-light: #e0e7ff;  /* Light background for primary */
  --primary-dark: #3730a3;   /* Dark hover state */
  
  /* Backgrounds */
  --bg-primary: #f8fafc;     /* Main background */
  --bg-secondary: #ffffff;   /* Card backgrounds */
  --bg-tertiary: #f1f5f9;    /* Subtle backgrounds */
  
  /* Text */
  --text-primary: #1e293b;   /* Main text */
  --text-secondary: #64748b; /* Secondary text */
  --text-tertiary: #94a3b8;  /* Hint text */
  
  /* Category Colors */
  --cat-school: #f97316;     /* Orange */
  --cat-college: #3b82f6;    /* Blue */
  --cat-university: #8b5cf6; /* Purple */
  --cat-autism: #14b8a6;     /* Teal */
  --cat-entry: #ec4899;      /* Pink */
  --cat-research: #ef4444;   /* Red */
  --cat-misc: #6366f1;       /* Indigo */
}

/* Dark Mode */
html[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  /* ... all variables inverted for dark mode ... */
}
```

#### Typography

**Font Stack:**
- **Headings:** Poppins (700-800 weight) — bold, modern, attention-grabbing
- **Body:** Inter (300-700 weight) — clean, readable, professional
- **Fallback:** System sans-serif stack for performance

**Sizing Hierarchy:**
- `h1`: 2.5rem (desktop), 1.875rem (mobile)
- `h2`: 2rem
- `h3`: 1.5rem
- `p`: 1rem body, 0.875rem small text

### Layout System

#### Responsive Breakpoints
```css
/* Mobile-first approach */
Base styles: 1 column, full-width

@media (min-width: 768px)
  /* Tablet: 2 columns, adjusted spacing */

@media (min-width: 1024px)
  /* Desktop: 3 columns, sidebar visible, optimized spacing */
```

#### Grid System
- **Featured Categories:** Responsive 3-column grid
- **Resource Grid:** Auto-fill 3 columns minimum 300px
- **Footer:** Auto-fit 3+ column grid

### Component Design Patterns

#### Cards
- **Base Style:** White background, border, rounded corners (0.75rem)
- **Hover:** Scale(-8px), shadow increase, border color change
- **Mobile:** Full width, single column
- **Props:** Title, metadata badges, description

#### Badges
- **Purpose:** Quick visual categorization
- **Style:** Small rounded pills (border-radius: 9999px)
- **Types:** Type (Video/PDF/Article), Language, Count, Difficulty
- **Colors:** Color-coded by type for quick scanning

#### Buttons
- **Primary:** Indigo background (#4f46e5), white text, no border
- **Secondary:** Transparent background, colored border
- **Icon:** Transparent, no border, icon-only
- **Hover:** All buttons get -2px translateY and shadow increase

#### Modals
- **Overlay:** Fixed, full-screen, dark semi-transparent background
- **Content:** Centered, max-width 600px, scrollable
- **Animation:** Slide-up from bottom (translateY: 30px → 0)
- **Close:** X button top-right, or click overlay, or Escape key

## JavaScript Architecture

### Global State Management
```javascript
let allData = {};              // Entire data.json
let filteredSubjects = [];     // Search results
let activeCategory = null;     // Currently selected category
let bookmarks = new Set();     // User's bookmarked topics
let isFirstLoad = true;        // Show featured section once
let currentTheme = 'light';    // light or dark
```

### Key Functions

#### Data Loading
```javascript
/* Load data.json on app start */
async function loadData()
  - Fetch data.json
  - Parse and cache in allData object
  - Error handling with user message
```

#### Theme Management
```javascript
/* Initialize theme from localStorage or system preference */
function initializeTheme()
  - Read localStorage['theme']
  - Apply data-theme="dark" to html element
  - Update toggle button icon

/* Switch between light and dark */
function toggleTheme()
  - Toggle currentTheme
  - Save to localStorage
  - Apply to html element
  - Update button icon
```

#### Bookmarking
```javascript
/* Load user's bookmarks from localStorage */
function loadBookmarks()
  - Read localStorage['educore-bookmarks']
  - Convert JSON array to Set
  - Restore on page load

/* Add or remove bookmark */
function toggleBookmark(topicId)
  - Add/remove from bookmarks Set
  - Update heart icon visually
  - Save to localStorage

/* Persist bookmarks to localStorage */
function saveBookmarks()
  - Convert Set to JSON array
  - Store in localStorage['educore-bookmarks']
```

#### Rendering

**Featured Categories** — Shows colorful category cards on first load
```javascript
function renderFeaturedCategories()
  - For each category: create card
  - Add icon, title, resource count
  - Color-code by category.id
  - Add click handler to set active category
  - Hide when user selects a category
```

**Category Tabs** — Navigation tabs for filtering
```javascript
function renderCategories()
  - Desktop: horizontal button tabs
  - Mobile: sidebar with buttons
  - Add active state styling
  - Attach click handlers
```

**Resource Grid** — Display subjects for active category
```javascript
function renderSubjects()
  - Get subjects from activeCategory
  - Apply search filter
  - Map to card elements
  - Show/hide no-results message
  - Attach click handlers to show modal
```

**Topic Modal** — Display all topics for a subject
```javascript
function showTopicModal(subjectName, category)
  - Find subject in category
  - Create topic elements with badges
  - Add language flags and type colors
  - Attach bookmark heart click handlers
  - Show modal with animation
```

## Mobile-First Development

### Design Decisions
1. **Start with mobile layout** (1 column, full-width)
2. **Enhance for tablet** at 768px (2 columns, adjusted spacing)
3. **Optimize for desktop** at 1024px (3 columns, sidebar, premium spacing)

### Mobile Navigation
- **Hamburger Menu:** Visible only on devices < 1024px wide
- **Sidebar:** Hidden off-screen, slides in on hamburger click
- **Overlay:** Click outside to close sidebar
- **Categories:** Sidebar shows all category tabs + Bookmarks tab

### Touch Targets
- All buttons: minimum 44x44px (thumb-friendly)
- Cards: adequate spacing for touch (1rem gap minimum)
- Tap feedback: Visual feedback on hover/active states

## Dark Mode Implementation

### How It Works
1. **CSS Variables:** All colors defined as variables, with dark variants
2. **Toggle Button:** Sun/moon icon in header
3. **Persistence:** User preference saved in localStorage
4. **Smooth Transition:** 0.3s fade when switching themes
5. **OS Fallback:** Respects `prefers-color-scheme: dark` if not set

### Adding Dark Mode to New Components
```css
/* Light mode (default) */
.my-component {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* Dark mode (automatic) */
html[data-theme="dark"] {
  /* Variables automatically switch, no need for new rules */
}
```

## Local Bookmarking System

### How It Works
1. **Generate Topic ID:** Unique key combining category + subject + title
2. **Toggle on Click:** Click heart → add/remove from bookmarks Set
3. **Save to localStorage:** `localStorage['educore-bookmarks']` = JSON.stringify([...])
4. **Restore on Load:** Load from localStorage on app start
5. **Show Bookmarks Tab:** Sidebar has dedicated button to view all bookmarks

### Topic ID Format
```javascript
const topicId = `${categoryId}-${subjectName}-${topicTitle}`
  .replace(/\s+/g, '-')
  .toLowerCase();

// Example: "school-physics-class-9-physics-complete-lectures"
```

### localStorage Key
```javascript
localStorage.getItem('educore-bookmarks')
// Returns: "[\"school-physics-class-9\", \"university-dsa-arrays\"]"
```

## Animations & Performance

### CSS Animations
All animations use CSS keyframes (not JavaScript) for 60fps performance:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Animation Timing
- **Fast:** 0.2s (hover states, button feedback)
- **Default:** 0.3s (card transitions, menu slide)
- **Slow:** 0.6s (page entrance, hero section)

### Performance Notes
- Uses `transform` and `opacity` (GPU-accelerated)
- Avoids animating `width`, `height`, `left`, `top` (causes reflow)
- 60fps on modern devices, smooth on mobile

## Accessibility Standards

### WCAG AA Compliance
- **Color Contrast:** 4.5:1 minimum for normal text, 3:1 for large text
- **Touch Targets:** 44x44px minimum for all interactive elements
- **Keyboard Navigation:** Tab through elements, Enter to activate, Escape to close

### Semantic HTML
```html
<!-- Use semantic elements, not divs -->
<button>Click me</button>      <!-- Not: <div onclick="..."></div> -->
<nav>...</nav>                 <!-- Not: <div class="nav"></div> -->
<main>...</main>               <!-- Not: <div class="content"></div> -->
<footer>...</footer>           <!-- Not: <div class="footer"></div> -->
```

### ARIA Labels
```html
<!-- Add labels for interactive elements -->
<button aria-label="Toggle dark mode"></button>
<input aria-label="Search resources">
<div role="tablist"></div>
<div role="dialog" aria-modal="true"></div>
```

## Performance Optimization

### Current Metrics (v1.1)
- **CSS File:** ~40KB (unminified)
- **JavaScript:** ~15KB (unminified)
- **Total:** <100KB (all assets combined)
- **Load Time:** <1 second on 3G

### Best Practices Applied
- ✅ CSS variables instead of Tailwind (smaller bundle)
- ✅ Vanilla JS (no frameworks, no dependencies)
- ✅ Local data.json (no API calls)
- ✅ CSS animations (60fps, GPU-accelerated)
- ✅ Semantic HTML (good SEO, accessibility)
- ✅ CDN for only 1 external asset (Font Awesome)

### Future Optimizations
- Minify CSS and JavaScript for production
- Consider lazy-loading for large data sets
- Progressive Web App (offline support)
- Service Worker for caching

## Development Workflow

### Making Changes
1. **Edit styles.css** for design changes
2. **Edit app.js** for functionality changes
3. **Edit data.json** to add/update resources
4. **Test locally:** `python -m http.server 8000`
5. **Test on mobile:** Use browser DevTools device mode
6. **Test dark mode:** Click toggle button
7. **Test bookmarks:** Add topics, refresh page, verify persistence

### Adding a New Feature
1. Add HTML structure to index.html
2. Add CSS styles to styles.css (using variables)
3. Add JavaScript logic to app.js
4. Test on mobile and desktop
5. Test dark mode
6. Test accessibility (keyboard nav)
7. Update documentation

## Common Patterns

### Adding a CSS Variable
```javascript
:root {
  --my-color: #ff00ff;
}

/* Use anywhere */
.my-element {
  background: var(--my-color);
}

/* Dark mode override */
html[data-theme="dark"] {
  --my-color: #00ffff;
}
```

### Adding an Event Listener
```javascript
// Single event
document.getElementById('myButton').addEventListener('click', () => {
  // Handle click
});

// Multiple elements
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Handle click on card
  });
});
```

### Rendering Dynamic Content
```javascript
const html = items.map(item => `
  <div class="card">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>
`).join('');

container.innerHTML = html;
```

## Troubleshooting

### Dark Mode Not Persisting
- Check browser localStorage support
- Verify localStorage key: `localStorage.getItem('theme')`
- Check console for errors

### Bookmarks Not Saving
- Verify localStorage quota not exceeded
- Check localStorage key: `localStorage.getItem('educore-bookmarks')`
- Ensure JSON is valid: `JSON.parse(localStorage.getItem('educore-bookmarks'))`

### Search Not Working
- Check searchInput.value is being read
- Verify filter logic in renderSubjects()
- Check browser console for JavaScript errors

### Modal Not Opening
- Verify showTopicModal() is being called
- Check modal element has correct ID: `id="topicModal"`
- Verify CSS `.modal.active { display: flex; }`

## Resources & References

- **Design Tools:** Figma, Coolors.co for color schemes
- **CSS Reference:** MDN Web Docs, CSS-Tricks
- **Accessibility:** WebAIM, WCAG 2.1 Guidelines
- **Performance:** Google Lighthouse, Web.dev
- **Font Families:** Google Fonts (Inter, Poppins)
- **Icons:** Font Awesome 6.4.0

---

**Last Updated:** April 2026 | **Version:** 1.1 | **Maintainer:** Syed Muhammad Ali Naqvi
