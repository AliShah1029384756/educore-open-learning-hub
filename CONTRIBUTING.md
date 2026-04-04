# Contributing to EduCore

Thank you for wanting to improve EduCore! We welcome contributions of new subjects, resources, and improvements.

## 🎯 How to Contribute

### Adding a New Subject

1. **Open [data.json](data.json)** in your text editor
2. **Find the category** you want to add to (e.g., "university", "college", "school")
3. **Follow this JSON structure:**

```json
{
  "subjectName": "Subject Name (e.g., Statistics & Probability)",
  "topics": [
    {
      "title": "Resource Title (descriptive, e.g., 'Probability Basics Videos')",
      "type": "Video",
      "language": "English",
      "url": "https://example.com/resource",
      "badge": "🎥 Source Name"
    }
  ]
}
```

4. **Requirements for new subjects:**
   - Minimum 3 resources per subject
   - All links must be tested and working
   - Descriptions should be clear and accurate
   - Include emoji badge matching resource type

5. **Submit your changes:**
   ```bash
   git checkout -b add-subject-name
   git commit -m "Add [Subject Name] resources for [Category]"
   git push origin add-subject-name
   ```
   Then open a **Pull Request** (PR) on GitHub.

### Adding a Category

Want to add an entirely new category (e.g., "Vocational Training")? 

1. Open an **Issue** first to discuss
2. Follow the category structure in [DATA_FORMAT.md](DATA_FORMAT.md)
3. Include 5+ subjects minimum
4. Submit PR with category + documentation changes

## ✅ Quality Standards

Before submitting:

- [ ] All URLs are tested and accessible
- [ ] No broken links
- [ ] JSON is valid (use a JSON validator online if unsure)
- [ ] Subject has at least 3 resources
- [ ] Resource titles are descriptive
- [ ] Languages are accurate (Urdu/English/Hindi)
- [ ] Badges are appropriate (🎥 Video, 📖 Reading, 🛠️ Practice, etc.)

## 📋 JSON Validation

Unsure if your JSON is valid? Use this free tool:
- [JSONLint.com](https://jsonlint.com/) — Paste your code, click "Validate"

## 🚩 Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Missing comma between objects | Add `,` after `}` (except last item) |
| Quotes around URL | URLs must be in double quotes: `"url": "https://..."` |
| Invalid language | Use only: "Urdu", "English", "Hindi" |
| Emoji in wrong place | Badge should be: `"badge": "🎥 Source"` |
| Dead link | Test URL in browser before submitting |

## 🔄 Pull Request Process

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feature/your-feature-name`
3. **Make changes** to `data.json` (or other files)
4. **Test locally:** Open `index.html` and verify changes render correctly
5. **Commit:** `git commit -m "Add [description of change]"`
6. **Push:** `git push origin feature/your-feature-name`
7. **Open PR on GitHub** with a clear description

### PR Description Template

```
## What's being added?
[Brief description of new subject/category/resource]

## Category
[ ] School  [ ] College  [ ] University  [ ] Entry Tests  [ ] Other: ___

## Testing
- [ ] JSON validated
- [ ] All URLs tested (working)
- [ ] Page renders without errors
- [ ] Category filter works
- [ ] Search works

## Resources Added
- List 3+ resources added
```

## 📝 Reporting Issues

Found a broken link or incorrect info? 

1. Go to [GitHub Issues](https://github.com/AliShah1029384756/educore-open-learning-hub/issues)
2. Click **New Issue**
3. Title: "Broken: [Subject Name] - [Resource Title]"
4. Description: Include the broken URL and suggest replacement if possible

## 🎨 Style Guide

- **Subject Names:** Use proper nouns (Physics, not physics)
- **Resource Titles:** Be descriptive ("Complete Physics Lectures (Urdu)" not "Physics")
- **Badges:** Emojis + Platform (🎥 Khan Academy, 📖 IlmKiDunya, 🛠️ LeetCode)
- **Types:** Use "Video", "Read", or "Practice" (capitalized)

## ❓ Questions?

- Comment on a PR or Issue
- Email: shahyed99@gmail.com
- GitHub Discussions (coming soon)

---

**Thank you for helping make education accessible! 🙏**
