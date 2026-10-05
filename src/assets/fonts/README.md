These WOFF2 files are the same variable font subsets served by Google Fonts:

- Cormorant Garamond v21, normal and italic, weights 400–700.
- Jost v20, normal, weights 300–700.

Source: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap

Downloaded with a modern Chrome user agent to obtain WOFF2. All original
Unicode subsets are retained, with identical font-display: swap behavior.
The files are unmodified. Their SIL Open Font Licenses are included here.

src/mobile-fonts.css activates these faces only below 768px. src/root.tsx
preloads only the three Latin faces on mobile. Other subsets load on demand.
Desktop keeps the existing Google Fonts delivery. Vite fingerprints the
local font URLs during the build; no network access is required to build.
