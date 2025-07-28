import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Interest-calculator/", // 注意首字母大写
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
