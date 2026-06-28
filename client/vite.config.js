import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Vite 8 minifies with oxc; strip console/debugger via its compress
    // options (the old esbuild.drop is ignored once oxc options are set).
    rollupOptions: {
      output: {
        minify: {
          compress: { dropConsole: true, dropDebugger: true },
          mangle: true,
          removeWhitespace: true,
        },
        // Split heavy vendors into their own cacheable chunks.
        // rolldown (Vite 8) requires manualChunks to be a function.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/.test(id))
            return "react";
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return "motion";
          if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) return "icons";
        },
      },
    },
  },
});
