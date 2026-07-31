import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project from a repo subpath (github.io/<repo>/),
// not the domain root, so asset URLs need that prefix there. Vercel (and
// local dev) serve from the root, so this only applies when the GitHub
// Pages workflow explicitly sets GITHUB_PAGES=true during the build.
const base = process.env.GITHUB_PAGES ? '/dr-prashant-kariya/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
