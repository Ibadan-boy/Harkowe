import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need to import Tailwind here

export default defineConfig({
  plugins: [react()],
})
