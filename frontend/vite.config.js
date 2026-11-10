import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === "build" ? "/static/app/" : "/",
  build: {
    outDir: "../static/app",
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "/static/images": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "/cv": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "/resume": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
}));
