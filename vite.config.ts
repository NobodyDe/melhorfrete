import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/melhorenvio": {
        target: "https://sandbox.melhorenvio.com.br",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/melhorenvio/, ""),
        headers: {
          "User-Agent": "blanck (email@gmail.com)",
        },
      },
    },
  },
});
