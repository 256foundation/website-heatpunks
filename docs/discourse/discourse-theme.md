# Discourse Theming — Match heatpunks.org

Source of truth: `app/globals.css` in this repo (light mode / "Warm Heated Paper" palette,
since that's what the main site shows by default in your screenshot).

## Step 1 — Logo & favicon
Admin → Customize → Themes → (or Admin → Settings → search "logo")
- Logo: upload `/public/images/logo.png` from this repo
- Favicon: same source if you have a square version

## Step 2 — Color palette
Admin → Customize → Colors → New (duplicate "Light") → name it "Heatpunks"

| Discourse slot      | Hex       | Source variable        |
|----------------------|-----------|-------------------------|
| Primary (text)        | `#2d2a26` | `--charcoal`            |
| Secondary (background)| `#faf8f5` | `--cream`               |
| Tertiary (links/accent)| `#c94e00`| `--ember` (accent)      |
| Quaternary            | `#ff6b00` | `--flame`               |
| Header background     | `#fffcf7` | `--warm-white`          |
| Header primary        | `#2d2a26` | `--charcoal`            |
| Highlight             | `#ffdba8` | `--flame-200`           |
| Danger                | `#ff3d00` | `--red`                 |
| Success               | `#008f24` | `--terminal-dark`       |
| Love                  | `#c94e00` | `--ember`               |

Set this palette as the default color scheme for the forum (Admin → Customize → Themes → your active theme → Color Scheme).

## Step 3 — Fonts + fine details (CSS Theme Component)
Admin → Customize → Themes → Install → "Create new" → Component
Name it "Heatpunks Brand", then open Edit CSS/HTML → Common CSS, paste:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

:root {
  --ember: #c94e00;
  --flame: #ff6b00;
  --charcoal: #2d2a26;
  --cream: #faf8f5;
  --warm-white: #fffcf7;
  --warm-gray: #e8e4de;
}

body {
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6,
.title, .topic-title, .category-name,
.nav-pills li a, .btn, button,
#site-logo, .badge-category__name {
  font-family: 'JetBrains Mono', 'Consolas', monospace !important;
  letter-spacing: 0.02em;
}

/* Buttons -> flame gradient like the main site's .btn-primary */
.btn-primary,
.btn.btn-icon-text.btn-primary,
#topic-footer-buttons .btn-primary {
  background: linear-gradient(135deg, var(--ember) 0%, #cc3300 100%) !important;
  border: none !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(201,78,0,0.25);
}

/* Cards / topic list rows -> match .heatpunk-card feel */
.topic-list-item, .category-boxes .box, .badge-category {
  border-color: var(--warm-gray) !important;
  transition: all 0.2s;
}
.topic-list-item:hover {
  border-color: var(--ember) !important;
}

/* Top header bar */
.d-header {
  background: var(--warm-white) !important;
  border-bottom: 1px solid var(--warm-gray);
}

/* Category badge accent */
.badge-category {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.02em;
}
```

## Step 4 (optional) — Tie the header back to the main site
Same theme component → Edit CSS/HTML → "Header" (or "After Header") tab, add:

```html
<div style="background:#faf8f5;border-bottom:1px solid #e8e4de;padding:6px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;text-align:center;">
  <a href="https://heatpunks.org" style="color:#c94e00;text-decoration:none;">← BACK TO HASHRATE HEATPUNKS</a>
</div>
```

## Step 5
Enable the "Heatpunks Brand" component on your active theme (Admin → Customize → Themes →
default theme → Components → check it on), then hard-refresh the forum.

No plugin install needed — everything above is stock Discourse admin functionality.
