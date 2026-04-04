# Data Format Documentation

## JSON Schema

EduCore uses a hierarchical JSON structure: Categories → Subjects → Topics → Resource Details.

### Complete Schema

```json
{
  "platformName": "EduCore Open Learning",
  "description": "Free curated educational resources for Pakistani students",
  "categories": [
    {
      "id": "unique-identifier",
      "title": "📚 Category Name (With Emoji)",
      "subjects": [
        {
          "subjectName": "Subject Name",
          "topics": [
            {
              "title": "Resource Title - Descriptive",
              "type": "Video|Read|Practice",
              "language": "Urdu|English|Hindi",
              "url": "https://...",
              "badge": "🎥 Platform Name"
            }
          ]
        }
      ]
    }
  ]
}
```

### Field Definitions

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `platformName` | String | Yes | "EduCore Open Learning" |
| `description` | String | Yes | "Free curated educational resources..." |
| `categories` | Array | Yes | `[{...}, {...}]` |
| `id` | String | Yes | "school", "university" |
| `title` | String | Yes | "🎒 School Level (Matric)" |
| `subjects` | Array | Yes | `[{...}]` |
| `subjectName` | String | Yes | "Physics (Class 9th & 10th)" |
| `topics` | Array | Yes | `[{...}]` |
| `title` (resource) | String | Yes | "Complete Physics Lectures" |
| `type` | String (enum) | Yes | "Video", "Read", "Practice" |
| `language` | String (enum) | Yes | "Urdu", "English", "Hindi" |
| `url` | String (URL) | Yes | "https://sabaq.pk/..." |
| `badge` | String | Yes | "🎥 Sabaq.pk" |

### Valid Values

**Type:**
- `Video` — YouTube videos, lecture series, tutorials, recorded courses
- `Read` — Articles, notes, PDFs, textbooks, documentation, reference materials
- `Practice` — Coding exercises, quizzes, problem sets, MCQs, simulations, interactive labs

**Language:**
- `Urdu` — Urdu language content
- `English` — English language content
- `Hindi` — Hindi or Hindustani content (for shared understanding across South Asia)

**Badge Format:**
- Pattern: `"🎥 Platform Name"` (emoji + space + platform)
- Common emojis:
  - 🎥 Video resources
  - 📖 Reading/textbook
  - 🛠️ Practice/exercises
  - 🔬 Labs/simulations
  - 📝 Writing/composition
  - 📊 Data/statistics
  - 🐍 Python specific
  - etc. (match intent)

### Validation Rules

1. **No missing quotes** — All strings must be in `"double quotes"`
2. **No trailing commas** — Last item in array/object: no comma
3. **Valid URLs** — Must start with `http://` or `https://`
4. **Unique IDs** — Category IDs must be unique
5. **Minimum resources** — New subjects require minimum 3 topics
6. **No special characters in IDs** — Only lowercase letters, hyphens, underscores
7. **Proper escaping** — Special characters in strings must be escaped

### Example: Adding Physics to School Category

```json
{
  "subjectName": "Physics (Class 9th & 10th)",
  "topics": [
    {
      "title": "Class 9 Physics Complete Lectures (Urdu)",
      "type": "Video",
      "language": "Urdu",
      "url": "https://sabaq.pk/video-tutorials/pakistan-9th-physics",
      "badge": "🎥 Sabaq.pk"
    },
    {
      "title": "Physics MCQs Practice (Chapter-wise)",
      "type": "Practice",
      "language": "English",
      "url": "https://www.pakistanbix.com/physics-mcqs/",
      "badge": "🛠️ PakistanBix"
    },
    {
      "title": "PhET Interactive Simulations - Physics",
      "type": "Practice",
      "language": "English",
      "url": "https://phet.colorado.edu/en/simulations/filter?subjects=physics",
      "badge": "🔬 PhET Labs"
    }
  ]
}
```

### Adding a Complete Category

When adding a new category, follow this structure:

```json
{
  "id": "category-id",
  "title": "📌 Category Title (With Emoji)",
  "subjects": [
    {
      "subjectName": "Subject 1",
      "topics": [
        { "title": "Resource 1", "type": "Video", "language": "Urdu", "url": "https://...", "badge": "🎥 Source" },
        { "title": "Resource 2", "type": "Read", "language": "English", "url": "https://...", "badge": "📖 Source" },
        { "title": "Resource 3", "type": "Practice", "language": "English", "url": "https://...", "badge": "🛠️ Source" }
      ]
    }
  ]
}
```

### JSON Validation Checklist

Before submitting a PR, validate your JSON:

- [ ] Use [JSONLint.com](https://jsonlint.com/) to check syntax
- [ ] All `{` have matching `}`
- [ ] All `[` have matching `]`
- [ ] All strings in double quotes `"..."`
- [ ] Commas between items (but not after last item)
- [ ] URLs are valid and accessible
- [ ] Languages match enum values
- [ ] Types match enum values
- [ ] IDs are unique and kebab-case

### Common JSON Errors

| Error | Example | Fix |
|-------|---------|-----|
| Missing comma | `{"a": 1} {"b": 2}` | Add comma: `{"a": 1}, {"b": 2}` |
| Single quotes | `'url': 'https://...'` | Use double: `"url": "https://..."` |
| Unescaped characters | `"title": "Learn C++"` | Escape if needed: `"title": "Learn C++"` |
| Trailing comma | `[{...},]` | Remove: `[{...}]` |

### Testing Your Changes

After editing `data.json`:

1. **Validate syntax** — Use JSONLint
2. **Check in browser** — Open `index.html` and verify category/search works
3. **Check console** — Press F12, look for errors
4. **Test category filter** — Click each new category tab
5. **Test search** — Type keywords from your new resources

---

**Last Updated:** April 4, 2026
