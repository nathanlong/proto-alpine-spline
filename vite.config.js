import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        html: "./src/index.html",
      }
    },
  },
  plugins: [splitVendorChunkPlugin()],
});
