# EduCore Open Learning Hub

<p align="center">
  <strong>Free, curated learning resources for students.</strong><br>
  <sub>Find useful material faster — from school and college to university and entry-test preparation.</sub>
</p>

<p align="center">
  <a href="https://alishah1029384756.github.io/educore-open-learning-hub/"><img src="https://img.shields.io/badge/Live-EduCore-2ea44f" alt="Live EduCore site"></a>
  <img src="https://img.shields.io/badge/resources-400%2B-orange" alt="400+ curated resources">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
  <img src="https://img.shields.io/badge/frontend-Vanilla%20JS-yellow" alt="Vanilla JavaScript">
</p>

> **Maqsad:** Bikhray hue free educational resources ko ek simple, searchable aur student-friendly system mein lana — without paywalls and without mandatory signup.

## 🌐 Live EduCore

**[Open EduCore](https://alishah1029384756.github.io/educore-open-learning-hub/)**

**[Learning Paths](https://alishah1029384756.github.io/educore-open-learning-hub/learning-paths.html)** · **[Materials Library](https://alishah1029384756.github.io/educore-open-learning-hub/materials-library.html)** · **[About EduCore](https://alishah1029384756.github.io/educore-open-learning-hub/about.html)**

---

## 🎯 What Is EduCore?

EduCore is a lightweight **open-learning discovery platform** that organizes useful free educational material from across the web into one searchable, student-friendly experience.

It is not another paid course platform and does not try to replace the original educators or publishers. Instead, EduCore acts as a **curated discovery layer**:

**Find → Choose → Learn → Continue**

The goal is simple: reduce the time students spend searching for good learning material and increase the time they spend actually learning.

### Designed for

- School and college students
- Matric / O-Levels learners
- FSc / ICS / I.Com students
- MDCAT / ECAT / NTS preparation
- CS / SE / IT university students
- Cambridge O-Level / IGCSE learners
- Commerce and Arts learners
- Students looking for Urdu or English resources
- Special-education and autism-support learning

## ✨ Core Features

### 🔍 Resource Discovery

- Real-time search across curated resources
- Browse by subject and learning category
- Filter by language, resource type and education level
- Open the original external learning resource directly

### 🧭 Guided Learning

- Structured learning paths
- Local progress tracking
- Continue-learning history
- Shareable search queries

### ❤️ Personalization Without Accounts

- Save bookmarks locally
- Remember recently opened resources
- Preserve learning-path progress
- Remember light/dark theme preference

These features use browser storage, so no account or backend is required for the core experience.

### 🌍 Student-Friendly Access

- Urdu and English metadata
- Responsive desktop/mobile experience
- Semantic and labelled controls
- Keyboard-friendly interactions
- No mandatory signup for resource discovery

## 🧩 How EduCore Works

```text
                         EduCore
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
           Search       Materials    Learning Paths
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                    Curated Resources
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
                 Learn          Save / Continue
                                     │
                                     ▼
                              Local Progress
```

EduCore stores curated resource metadata in repository data files and renders the discovery experience in the browser. Learning preferences and progress that do not require an account remain local to the user's browser.

## 🛠️ Technology

| Layer | Technology |
|---|---|
| UI | HTML5, CSS3 |
| Application | Vanilla JavaScript (ES6+) |
| Data | JSON-based curated datasets |
| Persistence | Browser `localStorage` |
| Icons | Font Awesome |
| Hosting | GitHub Pages |
| Build | No build step required |

The intentionally lightweight architecture keeps EduCore easy to host, inspect, maintain and contribute to.

## 📁 Project Structure

```text
educore-open-learning-hub/
├── index.html                    # Main discovery experience
├── about.html                    # Mission and project story
├── materials-library.html        # Resource/material discovery
├── learning-paths.html           # Structured learning paths
├── contribute.html               # Contribution workflow
├── app.js                        # Core search, filtering and rendering
├── learning-paths.js             # Learning-path logic
├── learning-dashboard.js         # Continue-learning/local dashboard
├── discovery-enhancements.js     # Search UX enhancements
├── site-shell.js                 # Shared shell/navigation behaviour
├── data.json                     # Main curated dataset
├── subjects.json                 # Supplemental subject/resource data
├── styles.css                    # Main UI styles
├── global.css                    # Shared UI styles
├── CONTRIBUTING.md               # Contribution guidelines
├── DATA_FORMAT.md                # Data schema and conventions
├── WEBSITE-GUIDE.md              # Architecture and maintenance guide
├── LICENSE                       # MIT License
└── .github/workflows/            # Automated data/quality checks
```

## 🚀 Run Locally

```bash
git clone https://github.com/AliShah1029384756/educore-open-learning-hub.git
cd educore-open-learning-hub
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A local HTTP server is recommended because the site loads local data and shared assets through browser requests.

## 📚 Curation Principles

EduCore is not trying to win by collecting the largest possible number of links. The priority is **usefulness, clarity and maintainability**.

When adding a resource, prefer:

1. Reputable educational sources
2. Direct, working URLs
3. Clear titles that accurately describe the destination
4. Correct subject and category placement
5. Useful language, type and level metadata
6. Genuine learning value
7. Resources that are reasonably accessible without unnecessary barriers

External links can change, move or disappear. Resource quality and link health therefore require ongoing maintenance.

> EduCore organizes and links to external learning material; it does not claim ownership of third-party content.

## ➕ Contributing

1. Read [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Check the existing dataset before adding a resource.
3. Follow [`DATA_FORMAT.md`](DATA_FORMAT.md).
4. Verify the external URL and metadata.
5. Test search/filter behaviour locally.
6. Open a focused pull request explaining the improvement.

Useful contributions include:

- Better or missing learning resources
- Corrected metadata
- Broken-link fixes
- Accessibility improvements
- UX improvements
- Documentation improvements
- Dataset-quality and maintenance tooling

The website also includes a **Contribute** page for resource suggestions.

## 🔒 Privacy by Simplicity

EduCore intentionally keeps core personalization browser-local:

- Bookmarks use `localStorage`.
- Continue-learning history uses browser storage.
- Learning-path progress uses browser storage.
- Theme preference can be remembered locally.
- No account is required for core discovery.

Because this data is local, progress is **not synchronized between different devices or browsers**.

## 🧪 Quality & Maintenance

The repository includes documentation and automated checks for the curated dataset. When maintaining the project, changes should be checked for:

- Valid resource URLs
- Consistent metadata
- Duplicate or redundant resources
- Correct category/subject placement
- Search and filter behaviour
- Responsive layout
- Accessibility regressions

Counts and resource availability can change as the dataset is cleaned, expanded and reorganized.

## 🗺️ Roadmap

### Current capabilities

- [x] Curated resource discovery
- [x] Search and filters
- [x] Local bookmarks
- [x] Continue learning
- [x] Structured learning paths
- [x] Local learning-path progress
- [x] Responsive navigation
- [x] Shareable search queries
- [x] Contribution workflow and documentation
- [x] Automated dataset/quality checks

### Future possibilities

- [ ] Automated external-link health checks
- [ ] More detailed resource-quality metadata
- [ ] Offline / PWA support
- [ ] Optional cloud synchronization
- [ ] Stronger community contribution workflows
- [ ] AI-assisted resource recommendations

Future items are exploratory and do not imply a release schedule.

## 📊 Current Snapshot

- **400+ curated learning resources**
- **68+ subjects** in the documented project snapshot
- **Multiple learning categories** across school, college, university and entry-test education
- **Urdu + English** resource metadata
- **MIT-licensed open-source project**

These numbers are a snapshot rather than permanent limits; the dataset may change over time.

## 👨‍💻 Maintainer

**Syed Muhammad Ali Naqvi**

- GitHub: [@AliShah1029384756](https://github.com/AliShah1029384756)
- LinkedIn: [Ali Naqvi](https://linkedin.com/in/ali-naqvi-1a9576331)
- Email: shahyed99@gmail.com

## 📄 License

Released under the **MIT License**. See [`LICENSE`](LICENSE).

---

<p align="center"><strong>Built to make useful learning resources easier to find, understand and use.</strong></p>
