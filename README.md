# EduCore Open Learning Hub

![MIT License](https://img.shields.io/badge/license-MIT-blue)
![Status - Live](https://img.shields.io/badge/status-live-green)
![Resources - 400+](https://img.shields.io/badge/resources-400+-orange)
![Categories - 8](https://img.shields.io/badge/categories-8-brightgreen)

> **Free curated educational resources for Pakistani students** — Matric to University to Entry Tests. No paywalls. No signups. Just learning.

## 🎯 Overview

EduCore is a static, searchable hub aggregating 400+ educational resources across 8 learning levels. Students can filter by subject (Physics, Math, Urdu, etc.), resource type (Video/Practice/Reading), and language (Urdu/English/Hindi).

**Who This Is For:**
- Class 9-10 (Matric O-Levels)
- FSc/ICS students (College)
- CS/SE/IT undergraduates (University)
- Entry test prep (MDCAT/ECAT/NTS)
- Commerce & Arts stream students
- Special education & autism support
- Cambridge O-Levels/IGCSE students

## ✨ Features

- 🔍 **Real-time Search** — Filter by subject name, keywords, or learning type
- 📂 **8 Curated Categories** — School → University → Entry Tests → Special Education
- 🌍 **Multi-Language** — Urdu, English, Hindi mixed (maximize accessibility for Pakistani learners)
- 📱 **Fully Responsive** — Optimized for mobile (hamburger menu), tablet, and desktop
- 🎨 **Visual Badges** — 🎥 Videos, 📖 Reading, 🛠️ Practice, 🔬 Labs with color-coded types
- 🌙 **Dark Mode Toggle** — Theme preference saved in browser (localStorage)
- ❤️ **Bookmarking System** — Save favorite topics locally without login
- ⭐ **Featured Categories** — Beautiful landing page with category overview
- ⚡ **No Build Step** — Pure HTML/CSS/JavaScript, runs instantly in any browser
- 🔗 **Direct Links** — All resources verified and linked (Sabaq.pk, Khan Academy, YouTube, etc.)
- ♿ **Accessible Design** — WCAG AA compliance, keyboard navigation, semantic HTML

## 📚 Categories at a Glance

| Category | Subjects | Level |
|----------|----------|-------|
| 🎒 School | Physics, Chemistry, Math, Biology, CS, English, Islamiat, Urdu, Pak Studies | Matric / O-Levels |
| 🎓 College | Physics, Chemistry, Math, Biology, CS, Economics, Accounting, Islamiat, Urdu | FSc / ICS / I.Com |
| 🎓 University | DSA, OOP, Databases, OS, Web Dev, Networks, Software Engineering, AI, Cyber Security | CS/SE/IT Undergrad |
| 🎯 Entry Tests | MDCAT, ECAT, NTS Prep | Professional Exams |
| 📊 Commerce & Arts | Accounting, Economics, Civics, Education | I.Com / FA |
| 🧒 Primary & Middle | Math, Science, Languages, Basics | Grade 1-8 |
| 🧩 Special Education | Autism, Speech Therapy, Life Skills | Neurodiverse Learners |
| 🌍 Cambridge O-Levels | Math, Sciences, Computer Science | International |

## 🚀 Quick Start

### Online (No Installation)
1. Visit **[EduCore Live](https://alishah1029384756.github.io/educore-open-learning-hub/)**
2. Click a category tab (School/College/University/etc.)
3. Use the search bar to find subjects (type "physics" or "urdu")
4. Click a topic to see resource details + external links

### Local Setup
```bash
# Clone repository
git clone https://github.com/AliShah1029384756/educore-open-learning-hub.git
cd educore-open-learning-hub

# Option A: Use Live Server (VS Code)
# Install "Live Server" extension, then right-click index.html → "Open with Live Server"

# Option B: Simple HTTP server (Python 3)
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, CSS3 (with Design System variables), JavaScript (ES6+)
- **Styling:** Custom CSS with 40+ CSS variables (light/dark theme support)
- **Icons:** Font Awesome 6.4.0 CDN
- **Typography:** Inter (body) + Poppins (headings) from Google Fonts
- **Data Source:** Local `data.json` (static, no backend)
- **Deployment:** GitHub Pages (free, instant)
- **Dark Mode:** CSS variables + localStorage persistence
- **Bookmarking:** localStorage-based (no server needed)
- **No Build Step:** Just open `index.html` and go

## 📖 How It Works

1. **Load Data:** On page load, `app.js` fetches `data.json`
2. **Render Categories:** 8 category tabs appear dynamically
3. **Filter by Category:** Click a tab, subjects update in real-time
4. **Search:** Type keyword, matches filter subjects/topics
5. **View Topic Details:** Click a subject, see all related topics with links

## 🎨 Design System & UI Features

### Modern Interface
- **Hero Section:** Eye-catching landing with value proposition and featured category showcase
- **Featured Categories:** 7 color-coded category cards (School=🧡 Orange, College=💙 Blue, University=💜 Purple, etc.)
- **Enhanced Resource Cards:** Show resource count, dominant type badge (Video/PDF/Article), with smooth hover animations
- **Smart Metadata Display:** Type badges, language flags (🇵🇰 Urdu, 🇬🇧 English, 🌐 Mixed), and resource counts on each topic

### Responsive Design
- **Desktop:** Full 3-column grid with sticky header and category tabs
- **Tablet:** 2-column grid with responsive spacing
- **Mobile:** Single-column layout with hamburger menu and slide-out sidebar

### Dark Mode
- **Toggle Button:** Sun/moon icon in header
- **Smooth Transitions:** 0.3s fade-in when switching themes
- **Persistent:** Your preference is saved in browser (localStorage)
- **All-In:** Every element supports light and dark colors

### Bookmarking (Local)
- **Save Favorites:** Click the ❤️ icon on any topic to bookmark
- **No Login Required:** Uses browser storage (no account needed)
- **Persistent:** Bookmarks stay saved across browser sessions
- **Filter View:** Click "Bookmarks" in sidebar to see all saved topics

### Animations & Interactions
- **Fade-In:** Content smoothly appears on page load
- **Hover Effects:** Cards scale slightly and gain shadow on hover
- **Slide Menu:** Mobile sidebar smoothly slides in from left
- **Modal Animations:** Topic details slide up with smooth animation
- **No Lag:** All animations use CSS (super fast)

### Accessibility
- **Keyboard Navigation:** Tab through buttons, Enter to open, Escape to close
- **ARIA Labels:** Screen reader friendly
- **Color Contrast:** WCAG AA compliant (4.5:1 minimum)
- **Semantic HTML:** Proper use of buttons, modals, and navigation elements

---

## 🔄 Adding New Categories or Subjects

Want to contribute a new subject or resource? Follow these steps:

1. **Read [CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines
2. **Edit [data.json](data.json)** following the schema in [DATA_FORMAT.md](DATA_FORMAT.md)
3. **Test locally** to ensure no JSON syntax errors
4. **Submit a Pull Request** with your changes

Example: Adding "Statistics" to University category:
```json
{
  "subjectName": "Statistics & Probability",
  "topics": [
    {
      "title": "Probability Basics (Khan Academy)",
      "type": "Video",
      "language": "English",
      "url": "https://www.khanacademy.org/math/statistics-probability",
      "badge": "🎥 Khan Academy"
    }
  ]
}
```

## 📊 Current Resource Stats

- **Total Subjects:** 68+
- **Total Topics:** 400+
- **Verified Links:** 95%+ (last checked: April 2026)
- **Languages:** Urdu, English, Hindi
- **Resource Types:** Videos, Practice Exercises, Reading Materials, Interactive Labs
- **Platforms Aggregated:** YouTube, Sabaq.pk, Khan Academy, IlmKiDunya, GeeksforGeeks, PhET, W3Schools, and 20+ more

## 🚦 Roadmap

### v1.1 ✅ COMPLETED (April 2026)
- ✅ Bookmark functionality (save favorite resources locally)
- ✅ Dark mode toggle with localStorage persistence
- ✅ Responsive category sidebar (hamburger menu on mobile)
- ✅ Featured categories landing page
- ✅ Enhanced resource metadata display (type, language badges)
- ✅ Smooth animations and transitions

### v1.2 (June 2026)
- [ ] Offline support (Progressive Web App)
- [ ] Export search results to PDF
- [ ] Community ratings & reviews for resources

### v2.0 (Q3 2026)
- [ ] Multi-language UI (Urdu/English toggle)
- [ ] Mobile app (React Native)
- [ ] AI-powered resource recommendations based on bookmarks

## 🐛 Known Issues & Workarounds

| Issue | Workaround | Status |
|-------|-----------|--------|
| Some YouTube links require country access | Use VPN or try alternative site link | Monitoring |
| Mobile: Search bar not sticky in iOS Safari | Works in Chrome; iOS update coming | In Progress |

## 📝 Contributing Guidelines

- **Add New Subject:** Must have minimum 3 vetted resources
- **Link Validation:** Test links before submitting; broken links will be rejected
- **Accuracy:** Content should be verified as correct/current
- **Language Diversity:** Encourage Urdu + English resources for accessibility

See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share for educational purposes. See [LICENSE](LICENSE) file.

## 🤝 Acknowledgments

- **Data Curation:** Community contributions from educators & students
- **Design:** Inspired by modern learning platforms (Khan Academy, Coursera, Udemy)
- **Infrastructure:** GitHub Pages for free, fast hosting
- **Special Thanks:** All Pakistani educators and students who believe education should be free

## 📬 Contact & Support

- **Maintainer:** Syed Muhammad Ali Naqvi
- **GitHub:** [@AliShah1029384756](https://github.com/AliShah1029384756)
- **Email:** shahyed99@gmail.com
- **LinkedIn:** [ali-naqvi-1a9576331](https://linkedin.com/in/ali-naqvi-1a9576331)
- **Report Issues:** [GitHub Issues](https://github.com/AliShah1029384756/educore-open-learning-hub/issues)

---

**Last Updated:** April 2026  
**Made with ❤️ for Pakistani students everywhere**
