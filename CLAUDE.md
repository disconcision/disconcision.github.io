# Claude Code Guidelines

## Project Overview

Personal website/portfolio for disconcision. Static HTML/CSS/JS site hosted on GitHub Pages.

## Key Files

- `index.html` - Main homepage (includes news section, portfolio, bookshelf)
- `style.css` - Global styles
- `script.js` - Bookshelf interactivity

## News Section

Located in `index.html` within `<section id="newsfeed">`. Uses a definition list structure:

```html
<dt>Month YYYY</dt>
<dd>
  Content with <a href="url">links</a> as needed
</dd>
```

## Branch Preview Process

When working on a branch, use **raw.githack.com** to preview changes before merging:

```
https://raw.githack.com/disconcision/disconcision.github.io/{BRANCH_NAME}/index.html
```

Example:
```
https://raw.githack.com/disconcision/disconcision.github.io/claude/my-feature-branch/index.html
```

Note: htmlpreview.github.io does NOT work well for this site (CSS doesn't load).

## Creating a PR

1. Make changes on a feature branch
2. Push to origin
3. Create PR at: `https://github.com/disconcision/disconcision.github.io/compare/master...{BRANCH_NAME}`
4. Preview using raw.githack link above before merging
