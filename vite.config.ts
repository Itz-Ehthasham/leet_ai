import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        copyFileSync('manifest.json', 'dist/manifest.json')
        
        if (!existsSync('dist/icons')) {
          mkdirSync('dist/icons', { recursive: true })
        }
        if (!existsSync('dist/assets')) {
          mkdirSync('dist/assets', { recursive: true })
        }
        
        const icons = ['icon16.png', 'icon48.png', 'icon128.png']
        icons.forEach(icon => {
          try {
            copyFileSync(`public/icons/${icon}`, `dist/icons/${icon}`)
          } catch (_error) {
            console.log(`Icon ${icon} not found, skipping...`)
          }
        })

        try {
          copyFileSync('src/assets/bot.png', 'dist/assets/bot.png')
        } catch (_error) {
          console.log('bot.png not found, skipping...')
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        content: resolve(__dirname, 'src/contents/contentScript.tsx'),
        background: resolve(__dirname, 'src/background/background.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})