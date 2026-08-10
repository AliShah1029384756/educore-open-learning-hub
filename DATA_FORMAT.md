# EduCore Data Format

EduCore uses a hierarchical structure:

**Category → Subject → Topic → Resource details**

The primary dataset is `data.json`. `subjects.json` is a supplemental dataset merged by `app.js`.

## Resource Schema

```json
{
  "platformName": "EduCore Open Learning",
  "description": "Free curated educational resources for Pakistani students",
  "categories": [
    {
      "id": "university",
      "title": "🎓 University Level",
      "subjects": [
        {
          "subjectName": "Data Structures and Algorithms",
          "topics": [
            {
              "title": "LeetCode Practice",
              "type": "Practice",
              "language": "English",
              "url": "https://leetcode.com/problemset/",
              "badge": "🛠️ LeetCode"
            }
          ]
        }
      ]
    }
  ]
}
```

## Fields

| Field | Type | Required | Notes |
|---|---|---:|---|
| `platformName` | string | Yes | Dataset/platform name |
| `description` | string | Yes | Short dataset description |
| `categories` | array | Yes | Learning categories |
| `id` | string | Yes | Unique category identifier |
| `title` | string | Yes | Category display title |
| `subjects` | array | Yes | Subjects within a category |
| `subjectName` | string | Yes | Subject display name |
| `topics` | array | Yes | Resources for the subject |
| `title` | string | Yes | Clear resource title |
| `type` | enum | Yes | `Video`, `Read`, or `Practice` |
| `language` | string | Yes | Actual resource language |
| `url` | URL | Yes | Direct HTTP/HTTPS destination |
| `badge` | string | Recommended | Short source/type label |

## Valid Resource Types

- **Video** — lectures, tutorials, recorded courses, video playlists
- **Read** — articles, notes, books, documentation, reference material
- **Practice** — quizzes, MCQs, coding problems, simulations and interactive exercises

## Language Metadata

Use the language that best represents the linked resource:

- `Urdu`
- `English`
- `Urdu/English` for genuinely mixed resources
- Other language values are acceptable when the resource is genuinely delivered in that language.

Do not label a resource Urdu merely because the target audience is Pakistani.

## Category IDs

Category IDs should be:

- unique
- lowercase
- stable
- composed of letters, numbers, hyphens or underscores

Examples: `school`, `college`, `university`, `entry-tests`, `autism-special`.

## Curation Rules

1. Use reputable or genuinely useful educational sources.
2. Prefer direct resource pages over generic homepages when possible.
3. Titles must accurately describe what the link provides.
4. Do not claim “past papers”, “complete course”, “official”, “free”, etc. unless the destination supports that claim.
5. Do not add duplicate resources simply to increase counts.
6. Keep the resource type aligned with the actual destination.
7. Verify URLs before adding them.
8. Keep at least three useful topics when creating a new subject unless the subject is intentionally a small curated collection.

## Duplicate Handling

`app.js` loads `data.json`, then merges `curatedAdditions`, then loads `subjects.json` as supplemental data.

Supplemental topics are deduplicated using:

```text
normalized title + URL
```

This prevents an identical title/URL pair from being inserted twice during supplemental merging.

However, two resources with different titles but the same destination may still exist. When curating data, prefer a single strong title unless the two entries represent genuinely different learning uses.

## Validation

GitHub Actions automatically validates the two JSON datasets for:

- valid JSON
- required category arrays
- non-empty resource titles
- valid HTTP/HTTPS URLs
- duplicate URL warnings

See `.github/workflows/quality-check.yml`.

Before opening a pull request, also manually check:

- [ ] Resource title accurately represents the destination
- [ ] Type is correct
- [ ] Language is correct
- [ ] Category and subject are appropriate
- [ ] URL opens successfully
- [ ] Search finds the resource
- [ ] No obvious duplicate has been introduced

## Example: Adding a Subject

```json
{
  "subjectName": "Introductory Python",
  "topics": [
    {
      "title": "CS50 Python",
      "type": "Video",
      "language": "English",
      "url": "https://cs50.harvard.edu/python/",
      "badge": "🎥 Harvard CS50"
    },
    {
      "title": "Python Tutorial",
      "type": "Read",
      "language": "English",
      "url": "https://docs.python.org/3/tutorial/",
      "badge": "📖 Python Docs"
    },
    {
      "title": "Python Practice",
      "type": "Practice",
      "language": "English",
      "url": "https://www.hackerrank.com/domains/python",
      "badge": "🛠️ HackerRank"
    }
  ]
}
```

## Testing Locally

Run a local HTTP server:

```bash
python -m http.server 8000
```

Then check:

1. Homepage loads.
2. Category navigation works.
3. Search returns the new resource.
4. Type/language/level filters behave correctly.
5. Resource opens in a new tab.
6. No console errors appear.

---

**Last updated:** August 2026
