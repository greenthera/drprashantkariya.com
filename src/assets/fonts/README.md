These WOFF2 files are the same variable font subsets served by Google Fonts:

- Cormorant Garamond v21, normal and italic, weights 400–700.
- Jost v20, normal, weights 300–700.

Source: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap

Downloaded with a modern Chrome user agent to obtain WOFF2. All original
Unicode subsets are retained, with identical font-display: swap behavior.
The original files are unmodified. Their SIL Open Font Licenses are included here.

src/mobile-fonts.css activates these faces only below 768px. src/root.tsx
preloads only the three common-character (`-core`) faces on mobile. The
original subsets still cover other characters on demand.
Desktop keeps the existing Google Fonts delivery. Vite fingerprints the
local font URLs during the build; no network access is required to build.

The three `-core.woff2` files were generated from the original Latin files
using FontTools 4.60.2. They keep the original variation data, outlines,
hinting, kerning and shaping features. Only unused characters are removed.
Their combined size is 64,024 bytes, versus 103,668 bytes for the originals.
Playwright compares their rendered glyphs with the originals at all used
weights; original faces remain available for excluded characters.
