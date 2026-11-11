import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    outDir: "../frontend_bundle",
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
});
