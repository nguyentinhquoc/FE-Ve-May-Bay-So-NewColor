import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import vitePluginHtmlMpa from "vite-plugin-html-mpa";

// Plugin để xóa crossorigin
function removeCrossOriginPlugin() {
  return {
    name: 'remove-crossorigin',
    transformIndexHtml(html) {
      return html.replace(/\s*crossorigin/g, '');
    }
  };
}

export default defineConfig({
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist", // build ra ngoài src
    cssCodeSplit: false,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      },
      input: {
        flightExtra: "src/flight-extra.html",
        flightInfo: "src/flight-info.html",
        flightList: "src/flight-list.html",
        flightPayment: "src/flight-payment.html",
        index: "src/index.html",
        mailTicket: "src/mail-ticket.html",
      },
    },
  },
  plugins: [
    ViteEjsPlugin(),
    vitePluginHtmlMpa({
      scanDir: "src", // tự động quét HTML trong src
    }),
    removeCrossOriginPlugin(),
  ],
});
