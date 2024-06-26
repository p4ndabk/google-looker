import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import url from "url";
import path from "path";
import svgr from "vite-plugin-svgr";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
