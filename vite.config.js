import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  base: process.env.NODE_ENV === "production" ? "./" : "./",
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        flightList: path.resolve(__dirname, "src/Flight-List.html"),
        flightInfo: path.resolve(__dirname, "src/Flight-Info.html"),
        flightPayment: path.resolve(__dirname, "src/Flight-Payment.html"),
        flight: path.resolve(__dirname, "src/flight.html"),
        // ...
      },
    },
  },
  plugins: [ViteEjsPlugin()],
});
