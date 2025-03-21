import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "stats.html",
      template: "treemap",
      open: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env.VITE_APP_STRIPE_KEY": JSON.stringify(
      process.env.VITE_APP_STRIPE_KEY
    ),
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          slick: ["slick-carousel"],
          dateFns: ["date-fns"],
          reactIcons: ["react-icons"],
        },
      },
    },
  },
});
