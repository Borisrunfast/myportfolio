// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: process.cwd(),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        holidaze: resolve(__dirname, './projects/holidaze/index.html'),
        auctionHouse: resolve(__dirname, './projects/auction-house/index.html'),
        ecom: resolve(__dirname, './projects/ecom/index.html')
      }
    }
  }
});