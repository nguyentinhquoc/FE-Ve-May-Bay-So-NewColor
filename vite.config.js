import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import vitePluginHtmlMpa from "vite-plugin-html-mpa";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist", // build ra ngoài src
    rollupOptions: {
      input: {
        index: "src/index.html",
        flightList: "src/flight-list.html",
        flightPayment: "src/flight-payment.html",
        flightinfo: "src/flight-info.html",
      },
    },
  },
  plugins: [
    ViteEjsPlugin(),
    vitePluginHtmlMpa({
      scanDir: "src", // tự động quét HTML trong src
    }),
  ],
});
