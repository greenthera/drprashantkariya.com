import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project from a repo subpath (custom-domain/<repo>/
// or github.io/<repo>/), not the domain root, so asset URLs need that prefix
// there. Vercel (and local dev) serve from the root, so this only applies
// when the GitHub Pages deploy script explicitly sets GITHUB_PAGES=true.
const base = process.env.GITHUB_PAGES ? '/drprashantkariya.com/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
