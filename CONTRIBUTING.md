# Contributing to EduCore

Thank you for helping improve EduCore. The project values **useful resources, accurate metadata, accessibility, maintainability, and a focused student experience** over simply increasing the number of links.

## 🎯 What You Can Contribute

Good contributions include:

- New high-quality learning resources
- Corrected or improved metadata
- New subjects or carefully justified categories
- Accessibility improvements
- Search, filtering, navigation, or UX fixes
- Documentation improvements
- Automated quality and maintenance tooling
- Broken-link reports and replacement suggestions

## ➕ Adding a Resource

Before adding anything:

1. Check `data.json` and `subjects.json` for an existing resource or duplicate URL.
2. Make sure the external resource is genuinely useful and accessible.
3. Choose the correct category and subject.
4. Use an accurate title and metadata.
5. Verify the URL in a browser.
6. Test the affected page locally.

A typical resource entry follows the project's existing schema. Check [`DATA_FORMAT.md`](DATA_FORMAT.md) before editing the dataset rather than copying an outdated example.

### Quality checklist

- [ ] URL works
- [ ] Resource is relevant to the selected subject/category
- [ ] Title accurately describes the resource
- [ ] Type is correct (`Video`, `Read`, or `Practice`)
- [ ] Language metadata is accurate
- [ ] Level/category metadata is appropriate where supported
- [ ] Resource is not already present elsewhere in the dataset
- [ ] No misleading claims are added

## 📚 Adding a Subject

A new subject should solve a real discovery gap rather than simply increasing the subject count.

Before opening a PR:

1. Confirm that the subject does not already exist under another name.
2. Choose the correct category.
3. Add several genuinely useful resources.
4. Keep titles and metadata consistent with nearby entries.
5. Explain why the subject is useful in the PR description.

If a proposed subject/category is substantial or uncertain, open an issue first so the structure can be discussed.

## 🧹 Data Quality Rules

EduCore uses curated JSON datasets. Keep the data consistent:

| Rule | Expectation |
|---|---|
| URLs | Valid, direct and tested where possible |
| Titles | Clear and accurate; no exaggerated claims |
| Types | `Video`, `Read`, or `Practice` |
| Language | Match the actual resource |
| Categories | Use the existing project taxonomy |
| Duplicates | Avoid duplicate URLs and duplicate resources |
| Badges | Follow existing project conventions |

Automated quality checks in GitHub Actions may reject invalid or inconsistent data. Treat those checks as part of the contribution contract.

## 🧪 Test Locally

Because EduCore is a static site, run a local HTTP server before testing:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

Check at minimum:

- Search
- Category navigation
- Language/type/level filters
- Resource links
- Bookmarks
- Continue-learning behaviour
- Learning-path progress
- Mobile navigation
- Theme/language controls

Do not rely only on opening `index.html` directly; browser security rules can affect local file requests.

## 🔀 Pull Request Process

1. Fork the repository or create a feature branch.
2. Make one focused improvement.
3. Test it locally.
4. Run the repository's available quality checks.
5. Commit with a clear message.
6. Push your branch.
7. Open a focused pull request.

Example:

```bash
git checkout -b improve-resource-metadata
git add .
git commit -m "Improve resource metadata"
git push origin improve-resource-metadata
```

### PR description

Include:

```text
## What changed?
Brief description of the improvement.

## Why?
What problem does this solve for learners or maintainers?

## Testing
- [ ] JSON/data validation passed
- [ ] Search/filter tested
- [ ] Resource links checked
- [ ] Mobile behaviour checked where relevant
- [ ] No unrelated files changed
```

## 🐛 Reporting Issues

For broken links, incorrect information, or UI problems, open a GitHub Issue and include:

- Page or subject affected
- Resource/title if applicable
- URL if applicable
- What is wrong
- Suggested correction, if known

For a broken external resource, replacement suggestions are especially helpful.

## 🎨 Content & Style Principles

- Prefer **clear and useful** over promotional wording.
- Do not claim a resource teaches something unless the linked source supports that claim.
- Keep subject names consistent and readable.
- Avoid duplicate categories created only because of naming differences.
- Preserve the project's student-first tone.
- Do not add private, copyrighted, or restricted material simply to increase the collection size.

## 🔐 Safety & Privacy

EduCore's core personalization is browser-local. Do not introduce unnecessary collection of personal information just to add a feature.

## ❓ Questions

For substantial changes, open an Issue before implementation. For smaller fixes, a focused PR is welcome.

GitHub: https://github.com/AliShah1029384756/educore-open-learning-hub

---

**Thank you for helping make useful learning resources easier to find.**
