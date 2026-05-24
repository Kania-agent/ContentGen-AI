# ✍️ ContentGen AI

> AI content generation studio for blogs, social, email, and technical writing — powered by MiMo V2.5

## Why This Exists

Content is the lifeblood of every business, but creating it at scale is a grind. Marketing teams juggle blog posts, social media threads, email campaigns, ad copy, and technical documentation — each with its own tone, format, length, and audience expectations. Hiring writers is expensive and slow. Using generic AI tools produces bland, homogeneous content that reads like it was written by the same robot as everyone else's.

ContentGen AI transforms the content creation workflow by deploying MiMo V2.5 — Nous Research's language model — as a multi-format writing studio that understands context, audience, and brand voice. It doesn't just autocomplete your sentences; it researches the topic, structures an outline, drafts content in the appropriate format, and then edits for clarity, engagement, and SEO — all in one pipeline.

The studio interface lets you switch between content formats (blog, social, email, ad copy, technical docs) while maintaining a consistent brand voice. Real-time AI suggestions help you rephrase for stronger impact, expand thin sections, or summarize verbose passages. Word and character counts keep you within platform limits. It's the difference between fighting with a blank page and having a creative partner that's always ready to write.

## Architecture

```
┌─────────────────┐
│     Topic        │   User input: keyword, brief, URL,
│   (User Input)   │   or outline to expand
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Research Agent   │   MiMo V2.5 — topic exploration, source
│ (MiMo V2.5)     │   gathering, fact verification, SEO keywords
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Writer       │   MiMo V2.5 — first draft generation with
│ (MiMo V2.5)     │   format-appropriate structure and tone
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Editor       │   MiMo V2.5 — grammar, clarity, engagement,
│ (MiMo V2.5)     │   readability scoring, brand voice alignment
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Multi-format    │   Blog post, tweet thread, email,
│    Output        │   ad copy, technical doc, or all of the above
│  (Export)        │
└─────────────────┘
```

## Token Consumption Model

| Agent | Tokens/Op | Frequency | Daily/User (est.) |
|-------|-----------|-----------|-------------------|
| Research Agent | 300K | ~6 topics/day | 1.8M |
| Writer | 500K | ~6 drafts/day | 3.0M |
| Editor | 200K | ~6 edits/day | 1.2M |
| **Total** | **1.0M** | — | **~6.0M** |

> Token estimates based on generating 6 pieces of content per day averaging 800 words each.

## Features

- 📝 **Multi-format generation** — Blog posts, social media threads, email campaigns, ad copy, and technical docs
- 🔬 **Topic research** — MiMo V2.5 researches your topic before writing for accuracy and depth
- 📊 **Real-time word/character count** — Stay within platform limits (Twitter, email subject lines, etc.)
- 💡 **AI suggestion panel** — Rephrase, expand, summarize, or change tone with one click
- 🎨 **Warm writer-themed UI** — Clean interface with focus mode for distraction-free writing
- 📂 **Content library** — Save, organize, and retrieve previously generated content
- 🎯 **SEO optimization** — Keyword integration, meta description generation, and readability scoring
- 📋 **Export options** — Markdown, HTML, plain text, or copy to clipboard
- 🔄 **Iterative refinement** — Edit AI output and regenerate specific sections without starting over

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Engine:** MiMo V2.5 by Nous Research
- **Architecture:** Zero-dependency — no external frameworks or build tools
- **Export:** Native Markdown/HTML generation with clipboard API integration
- **Styling:** Custom warm-tone palette optimized for long writing sessions

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/ContentGen-AI.git
cd ContentGen-AI

# Open the content studio
open index.html

# Or serve locally
python3 -m http.server 8080
```

1. Open `index.html` in your browser
2. Select a content format tab (Blog, Social, Email, Ad Copy, or Technical)
3. Enter a topic or brief in the input area
4. Click **"Generate"** to run the Research → Write → Edit pipeline
5. Review the generated content in the editor
6. Use the suggestion panel to rephrase, expand, or summarize sections
7. Export to your desired format when satisfied

## Project Structure

```
ContentGen-AI/
├── index.html                 # Content studio entry point
├── css/
│   ├── main.css               # Core theme and warm-tone palette
│   ├── editor.css             # Editor and suggestion panel styles
│   └── library.css            # Content library sidebar styles
├── js/
│   ├── app.js                 # Main application controller
│   ├── research-agent.js      # MiMo V2.5 topic research pipeline
│   ├── writer.js              # Content draft generation
│   ├── editor.js              # AI editing and suggestion engine
│   ├── export.js              # Format conversion and download
│   └── config.js              # Content formats and brand settings
├── data/
│   ├── templates/             # Format-specific content templates
│   └── library/               # Saved content storage
├── assets/
│   └── icons/                 # Format and action icons
└── README.md
```

---

> Built with MiMo V2.5 — [Nous Research](https://nousresearch.com)
