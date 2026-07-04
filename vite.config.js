import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs the site served under /<repo-name>/, but the local dev
// server should stay at the root. So we only apply `base` for the production
// build. Change 'YaadSpiceCo' below if your repository has a different name.
const REPO = 'YaadSpiceCo'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${REPO}/` : '/',
}))
