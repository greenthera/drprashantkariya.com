import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Graphy's public (unauthenticated) course-listing endpoint. It doesn't send
// CORS headers, so it's proxied same-origin under /api/courses instead of
// being fetched directly from the browser.
const GRAPHY_COURSES_PATH =
  '/s/store/subfilters/courses?page=0&limit=4&sortBy=relevance&domainName=drprashantkariya.graphy.com'

const coursesProxy = {
  '/api/courses': {
    target: 'https://drprashantkariya.graphy.com',
    changeOrigin: true,
    rewrite: () => GRAPHY_COURSES_PATH,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: coursesProxy },
  preview: { proxy: coursesProxy },
})
