# EduCore Open Learning Hub

![MIT License](https://img.shields.io/badge/license-MIT-blue)
![Status - Live](https://img.shields.io/badge/status-live-green)
![Resources - 400+](https://img.shields.io/badge/resources-400+-orange)
![Categories - 8](https://img.shields.io/badge/categories-8-brightgreen)

> **Free curated educational resources for Pakistani students** — from school and college through university and entry-test preparation. No paywalls. No signups. Just learning.

## 🎯 Overview

EduCore is a static, searchable learning hub aggregating **400+ resources across 8 learning categories**. Students can discover resources by subject, resource type, learning level, and language, with direct links to external learning platforms.

### Who This Is For

- Class 9–10 / Matric / O-Levels
- FSc / ICS / I.Com students
- CS / SE / IT undergraduates
- MDCAT / ECAT / NTS preparation
- Commerce and Arts learners
- Primary and middle-school learners
- Special education and autism-support learning
- Cambridge O-Levels / IGCSE learners

## ✨ Features

- 🔍 **Real-time search** across subjects and topics
- 📂 **8 curated categories** with structured subject collections
- 🌍 **Multi-language resources** including Urdu and English content
- 📱 **Responsive interface** for desktop, tablet, and mobile
- 🎨 **Resource-type badges** for Video, Reading, Practice, and Labs
- 🌙 **Dark mode** with browser-side preference persistence
- ❤️ **Local bookmarks** without requiring an account
- ⭐ **Featured category discovery** on the landing page
- ⚡ **No build step** — plain HTML, CSS, and JavaScript
- 🔗 **Direct external resource links** for practical learning
- ♿ **Accessibility-focused UI** with semantic controls and keyboard support

## 📚 Categories at a Glance

| Category | Examples | Level |
|---|---|---|
| 🎒 School | Physics, Chemistry, Math, Biology, CS, English, Islamiat, Urdu, Pak Studies | Matric / O-Levels |
| 🎓 College | Physics, Chemistry, Math, Biology, CS, Economics, Accounting, Islamiat, Urdu | FSc / ICS / I.Com |
| 🎓 University | DSA, OOP, Databases, OS, Web Development, Networks, Software Engineering, AI, Cyber Security | CS / SE / IT |
| 🎯 Entry Tests | MDCAT, ECAT, NTS preparation | Entry Tests |
| 📊 Commerce & Arts | Accounting, Economics, Civics, Education | I.Com / FA |
| 🧒 Primary & Middle | Math, Science, Languages, Digital Basics | Grades 1–8 |
| 🧩 Special Education | Autism support, visual learning, life skills | Neurodiverse learners |
| 🌍 Cambridge O-Levels | Math, Sciences, Computer Science | International |

## 🚀 Quick Start

### Online

Visit the **[EduCore Live Site](https://alishah1029384756.github.io/educore-open-learning-hub/)** — no installation or account required.

### Local

```bash
git clone https://github.com/AliShah1029384756/educore-open-learning-hub.git
cd educore-open-learning-hub
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

You can also open the project with VS Code Live Server.

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS design system with light/dark themes
- **Icons:** Font Awesome CDN
- **Typography:** Inter and Poppins
- **Data:** Local `data.json` — no backend required
- **Deployment:** GitHub Pages
- **Client persistence:** `localStorage` for theme and bookmarks
- **Build system:** None

## 📖 How It Works

```text
Local data.json
      │
      ▼
   app.js
      │
      ├── Category selection
      ├── Search
      ├── Language / type / level filters
      ├── Topic rendering
      └── Local bookmarks
      │
      ▼
Responsive HTML/CSS interface
```

The application loads its curated dataset in the browser, builds category and subject views dynamically, and lets users search/filter the collection without a backend or account system.

## 🎨 UI & Accessibility

- Responsive desktop, tablet, and mobile layouts
- Light/dark theme support
- Keyboard-friendly controls and semantic navigation
- ARIA labels for interactive controls
- Resource metadata for type and language
- Modal-based topic details
- CSS-based transitions and interaction states

Accessibility claims should be treated as an ongoing quality target and verified against the current deployed interface rather than as a formal certification.

## 🔖 Bookmarks

Bookmarks are intentionally **local to the user's browser**. No account or server-side storage is required.

- Save favorite topics
- Keep bookmarks across browser sessions
- Open a dedicated bookmarked view
- Clear local bookmarks when desired

Because bookmarks use `localStorage`, they are not synchronized across devices or browsers.

## ➕ Adding Resources

To contribute a new subject or resource:

1. Read [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Edit [`data.json`](data.json) using the schema in [`DATA_FORMAT.md`](DATA_FORMAT.md).
3. Validate the JSON and test the site locally.
4. Verify external links before submitting a pull request.

Each new subject should contain at least three useful, relevant resources according to the repository's contribution guidelines.

## 📊 Current Resource Stats

- **Total Subjects:** 68+
- **Total Topics:** 400+
- **Languages:** Urdu, English, Hindi
- **Resource Types:** Video, Practice, Reading, Interactive Labs
- **Platforms:** YouTube, Sabaq.pk, Khan Academy, IlmKiDunya, GeeksforGeeks, PhET, W3Schools, and others

> Resource counts and external-link availability can change as the curated dataset evolves. The figures above describe the current project snapshot rather than a permanent guarantee.

## 🗺️ Roadmap

### Completed

- Bookmark functionality
- Dark mode with local persistence
- Responsive category navigation
- Featured category landing experience
- Resource metadata badges
- Search and filtering workflows
- Multi-language resource metadata

### Planned / Under Consideration

- Offline / Progressive Web App support
- Search-result export
- Community ratings and reviews
- Expanded UI language support
- AI-assisted resource recommendations
- Optional mobile application

## 🐛 Known Issues

External resources can change, move, or become unavailable because EduCore links to third-party platforms. Link validation is therefore an ongoing maintenance task.

Browser-specific layout or search behaviour should be reported through GitHub Issues with the browser, device, and reproduction steps included.

## 🤝 Contributing

Contributions are welcome when they improve the quality, accessibility, or coverage of the learning hub.

Before submitting resources:

- Check that the resource is relevant and accessible.
- Verify the URL.
- Prefer reputable educational sources.
- Provide Urdu/English diversity where practical.
- Follow the existing `data.json` schema.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full contribution workflow.

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

## 📬 Contact

- **Maintainer:** Syed Muhammad Ali Naqvi
- **GitHub:** [@AliShah1029384756](https://github.com/AliShah1029384756)
- **Email:** shahyed99@gmail.com
- **LinkedIn:** [Ali Naqvi](https://linkedin.com/in/ali-naqvi-1a9576331)
- **Issues:** [GitHub Issues](https://github.com/AliShah1029384756/educore-open-learning-hub/issues)

---

**Maintained as an open learning resource for students, with a focus on practical and accessible education.**
