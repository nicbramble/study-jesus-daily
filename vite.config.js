import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Auto-set correct base for GitHub Pages project sites.
// The workflow passes REPO_NAME from the GitHub Action environment.
const repo = process.env.REPO_NAME || ''

export default defineConfig({
  plugins: [react()],
  base: repo ? `/${repo}/` : '/',
})
