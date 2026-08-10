# EduCore Website Guide

This document is the maintainer reference for EduCore's current architecture, UI conventions, data flow, and local-storage features.

## 1. Architecture

EduCore is a **static, client-side learning-discovery application** hosted on GitHub Pages.

```text
Browser
  │
  ├── index.html
  │      └── app.js
  │             ├── data.json              (primary dataset)
  │             ├── subjects.json          (supplemental curated dataset)
  │             └── curatedAdditions        (small app-level additions)
  │
  ├── learning-paths.html + learning-paths.js
  ├── materials-library.html
  └── Shared pages / shell
         ├── site-shell.js
         ├── global.css
         └── styles.css
```

There is **no application server or database** for the core product. Bookmarks, recently opened resources, theme preference, language mode, and learning-path progress are stored in the browser with `localStorage`.

## 2. Important Files

```text
educore-open-learning-hub/
├── index.html                 # Main discovery/search experience
├── app.js                     # Search, filtering, rendering, bookmarks, data loading
├── data.json                  # Primary curated learning dataset
├── subjects.json              # Supplemental dataset merged into the primary data
├── discovery-enhancements.js  # Shareable query + keyboard search improvements
├── learning-dashboard.js      # Continue-learning dashboard
├── learning-paths.html        # Structured learning-path UI
├── learning-paths.js          # Learning-path progress state
├── materials-library.html     # Curated material-type library
├── site-shell.js              # Shared header/footer and shell behavior
├── global.css                 # Shared page/navigation styles
├── styles.css                 # Main application styles
├── header.html                # Shared header source/reference
├── footer.html                # Shared footer source/reference
├── CONTRIBUTING.md            # Contribution workflow
├── DATA_FORMAT.md             # Dataset schema and conventions
├── README.md                  # Public project documentation
└── LICENSE                    # MIT License
```

### Dataset ownership

`data.json` is the primary source loaded by `app.js`. `subjects.json` is intentionally a **supplemental dataset** and is merged after the primary dataset loads. `app.js` also contains a small `curatedAdditions` object for app-level additions. Duplicate topics are prevented using title + URL keys when supplemental data is merged.

If the same resource is being added repeatedly, prefer fixing the dataset rather than adding another app-level copy.

## 3. Data Flow

At startup:

1. `app.js` loads `data.json`.
2. The data is normalized so subjects/topics have predictable fields.
3. `curatedAdditions` is merged into matching categories.
4. `subjects.json` is loaded as supplemental data.
5. Supplemental subjects/topics are merged without duplicate title+URL pairs.
6. Search, filters, cards, counts and recommendations operate on the merged in-memory dataset.

This architecture allows the project to expand without requiring a backend, but future maintenance should avoid creating unnecessary third copies of the same resources.

## 4. Resource Model

Each resource follows this general structure:

```json
{
  "title": "Descriptive resource title",
  "type": "Video",
  "language": "English",
  "url": "https://example.com/resource",
  "badge": "🎥 Source"
}
```

Supported resource types:

- `Video` — lectures, tutorials, recorded courses
- `Read` — articles, notes, textbooks, documentation
- `Practice` — quizzes, coding exercises, MCQs, simulations, interactive labs

Language metadata should describe the actual resource. Mixed Urdu/English material can use `Urdu/English`.

## 5. Search and Filtering

The main page supports:

- keyword search
- category selection
- language filtering
- resource-type filtering
- level filtering
- shareable `?q=` search state
- `/` keyboard shortcut to focus search
- `Esc` to clear active search

Search results are generated from the merged dataset rather than a separate search index.

## 6. Learning Paths

Learning paths are deliberately separate from the raw resource dataset.

A path represents a **recommended sequence**, while the resource dataset represents **discoverable material**.

Path progress is local to the browser and does not require an account.

## 7. Materials Library

`materials-library.html` is a curated presentation layer for a smaller set of high-value resource destinations.

It should not become a second copy of the entire dataset. The main homepage remains the comprehensive discovery layer, while the Materials Library should stay focused on useful entry points.

## 8. UI / Design Principles

### Priorities

1. Clarity over decoration
2. Fast discovery over long explanations
3. Strong hierarchy and whitespace
4. Mobile-first responsiveness
5. Accessible controls and semantic HTML
6. Consistent navigation across pages
7. Honest claims about resources

### Cards

Cards should communicate at a glance:

- what the resource is
- what type it is
- language / level when useful
- where it leads

Avoid decorative cards that do not provide a meaningful action or piece of information.

### Buttons

Use clear action labels such as:

- Search All Resources
- Open Resource
- Choose a Learning Path
- Materials Library
- Clear Filters

Avoid vague CTA copy when a concrete action can be stated.

## 9. Accessibility

When modifying UI:

- use semantic headings
- provide labels for inputs and buttons
- maintain keyboard access
- preserve visible focus states
- use `aria-label` where an icon-only control needs explanation
- avoid relying on color alone to communicate state
- keep text readable in both light and dark themes

## 10. Local Development

```bash
git clone https://github.com/AliShah1029384756/educore-open-learning-hub.git
cd educore-open-learning-hub
python -m http.server 8000
```

Open `http://localhost:8000`.

A local HTTP server is recommended because the application loads JSON and shared page resources with browser requests.

## 11. Testing Checklist

Before publishing a meaningful change:

- [ ] Homepage loads without console errors
- [ ] Search works from both search inputs
- [ ] `/` focuses search
- [ ] `Esc` clears search
- [ ] Category navigation works
- [ ] Language/type/level filters work
- [ ] Bookmarks persist after refresh
- [ ] Learning-path progress persists after refresh
- [ ] Materials Library filters work
- [ ] Dark mode remains readable
- [ ] Mobile navigation works
- [ ] External links open correctly
- [ ] Dataset JSON parses successfully
- [ ] GitHub Actions quality check passes

## 12. Maintenance Rules

- Do not add duplicate resources just to increase the resource count.
- Do not claim a resource provides something the linked page does not clearly provide.
- Prefer direct, reputable sources.
- Keep titles descriptive and concise.
- Keep categories and subject names stable unless there is a clear UX reason to change them.
- If a feature can be implemented without a backend, prefer the simpler static architecture.
- When changing a shared component, check every page that uses it.

## 13. Quality Direction

The long-term goal is not simply to make EduCore larger. It is to make it **more trustworthy, easier to navigate, and easier to maintain**.

Priority order:

**Accuracy → Discoverability → Learning flow → Accessibility → Visual polish → New features**

---

**Last updated:** August 2026
