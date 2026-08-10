# EduCore Open Learning Hub

<p align="center">
  <strong>Free, curated learning resources for Pakistani students.</strong><br>
  <sub>Discover useful material faster — from school and college to university and entry-test preparation.</sub>
</p>

<p align="center">
  <a href="https://alishah1029384756.github.io/educore-open-learning-hub/"><img src="https://img.shields.io/badge/Live-EduCore-2ea44f" alt="Live site"></a>
  <img src="https://img.shields.io/badge/resources-400%2B-orange" alt="400 plus resources">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license">
  <img src="https://img.shields.io/badge/frontend-Vanilla%20JS-yellow" alt="Vanilla JavaScript">
</p>

> **Maqsad:** Bikhray hue free educational resources ko ek simple, searchable aur student-friendly system mein lana — without paywalls and without mandatory signup.

## 🌐 Live Demo

**[Open EduCore](https://alishah1029384756.github.io/educore-open-learning-hub/)**

**[Explore Learning Paths](https://alishah1029384756.github.io/educore-open-learning-hub/learning-paths.html)** · **[Browse Materials](https://alishah1029384756.github.io/educore-open-learning-hub/materials-library.html)**

---

## 🎯 Why EduCore?

Students often know **what** they want to learn but waste time finding **where** to learn it.

EduCore is built around a simple idea:

**Find → Choose → Learn → Continue**

Instead of creating another course platform, EduCore acts as a curated discovery layer over useful free resources already available across the web.

### Designed for

- Matric / O-Levels students
- FSc / ICS / I.Com learners
- MDCAT / ECAT / NTS preparation
- CS / SE / IT university students
- Primary and middle-school learners
- Commerce and Arts learners
- Special-education and autism-support learning
- Cambridge O-Level / IGCSE learners

## ✨ What It Does

- 🔍 Search subjects and resources in real time
- 🧭 Browse by learning category
- 🎛️ Filter by language, resource type and level
- 🛣️ Follow structured learning paths
- ▶️ Open curated external learning resources directly
- ❤️ Save local bookmarks
- 🕘 Continue recently opened learning resources
- 📊 Track learning-path progress locally
- 🌍 Support Urdu and English resource metadata
- 🌙 Remember light/dark theme preference
- 📱 Work across desktop and mobile
- ♿ Use semantic and keyboard-friendly controls
- 🚫 Require no account or backend for core discovery

## 🧩 Product Flow

```text
EduCore
   │
   ├── Search / Categories / Learning Paths
   │
   ▼
Curated Resources
   │
   ├── Open Resource
   └── Save / Continue
          │
          ▼
    Local Progress
```

## 🛠️ Technology

| Layer | Technology |
|---|---|
| UI | HTML5, CSS3 |
| Application | Vanilla JavaScript (ES6+) |
| Data | JSON-based curated dataset |
| Persistence | Browser `localStorage` |
| Icons | Font Awesome |
| Hosting | GitHub Pages |
| Build | No build step required |

EduCore intentionally remains lightweight. There is no application server or database required for the core learning-discovery experience.

## 📁 Project Structure

```text
educore-open-learning-hub/
├── index.html                 # Main discovery experience
├── learning-paths.html        # Structured learning paths
├── learning-paths.js          # Path progress logic
├── materials-library.html     # Resource/library view
├── app.js                     # Core search, filtering and rendering
├── discovery-enhancements.js  # Search UX enhancements
├── learning-dashboard.js      # Continue-learning / local dashboard
├── subjects.json              # Curated subject/resource data
├── data.json                  # Main project dataset
├── styles.css                 # Main UI styles
├── global.css                 # Shared shell/navigation styles
├── site-shell.js              # Shared site shell behavior
├── header.html                # Shared navigation
├── footer.html                # Shared footer
├── CONTRIBUTING.md            # Contribution workflow
├── DATA_FORMAT.md             # Data schema and conventions
└── LICENSE                    # MIT License
```

## 🚀 Run Locally

```bash
git clone https://github.com/AliShah1029384756/educore-open-learning-hub.git
cd educore-open-learning-hub
python -m http.server 8000
```

Open **http://localhost:8000**.

> A local HTTP server is recommended because the site loads local data and shared HTML files through browser requests.

## 📚 Curation Philosophy

EduCore is not trying to win by having the biggest list of links. The goal is to make the collection **useful, understandable and maintainable**.

When adding a resource, prefer:

1. Reputable educational sources
2. Direct and working URLs
3. Clear titles that do not overclaim what the link provides
4. Correct subject/category placement
5. Useful language and level metadata
6. Genuine learning value

External links can change over time, so link verification remains an ongoing maintenance responsibility.

## ➕ Contributing

1. Read [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Check the existing dataset before adding a resource.
3. Follow [`DATA_FORMAT.md`](DATA_FORMAT.md).
4. Verify the external URL.
5. Test search/filter behaviour locally.
6. Open a focused pull request explaining the improvement.

Good contributions include **better resources, corrected metadata, accessibility improvements, UX fixes, documentation, and maintenance tooling**.

## 🔒 Privacy by Simplicity

Core personalization features are intentionally browser-local:

- Bookmarks use `localStorage`.
- Continue-learning history uses browser storage.
- Learning-path progress uses browser storage.
- No account is required for these features.

Progress is therefore **not synchronized between devices or browsers**.

## 🗺️ Roadmap

### Current direction

- [x] Curated resource discovery
- [x] Search and filters
- [x] Local bookmarks
- [x] Continue learning
- [x] Structured learning paths
- [x] Local learning-path progress
- [x] Responsive navigation
- [x] Shareable search queries

### Future possibilities

- [ ] Automated external-link health checks
- [ ] Better resource-quality metadata
- [ ] Offline / PWA support
- [ ] Optional cloud sync
- [ ] Community contribution workflow improvements
- [ ] AI-assisted resource recommendations

Future items are exploratory and do not imply a release schedule.

## 📊 Current Snapshot

- **400+ curated learning resources**
- **68+ subjects** in the current project snapshot
- **Multiple learning categories** across school, college, university and entry-test education
- **Urdu + English** resource metadata
- **Open-source MIT-licensed project**

Counts may change as the dataset is cleaned, expanded and reorganized.

## 👨‍💻 Maintainer

**Syed Muhammad Ali Naqvi**

- GitHub: [@AliShah1029384756](https://github.com/AliShah1029384756)
- LinkedIn: [Ali Naqvi](https://linkedin.com/in/ali-naqvi-1a9576331)
- Email: shahyed99@gmail.com

## 📄 License

Released under the **MIT License**. See [`LICENSE`](LICENSE).

---

<p align="center"><strong>Built to make learning resources easier to find, understand and use.</strong></p>
