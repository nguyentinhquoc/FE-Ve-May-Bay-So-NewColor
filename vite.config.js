import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import vitePluginHtmlMpa from "vite-plugin-html-mpa"; // ✅ import mặc định

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  root: "src",
  publicDir: "../public",
  plugins: [
    ViteEjsPlugin(),
    vitePluginHtmlMpa({
      scanDir: "src",      // Quét tất cả file .html trong src
      open: "/index.html", // Trang mở mặc định khi dev
    }),
  ],
});
