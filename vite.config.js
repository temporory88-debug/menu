import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// NOTE: base is set for GitHub Pages deployment under
// https://<username>.github.io/menu/
// If you deploy to Vercel/Netlify (custom domain or root), change this to "./"
export default defineConfig({
  plugins: [react()],
  base: "/menu/",
});
