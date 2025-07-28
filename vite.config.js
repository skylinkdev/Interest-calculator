import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/interest-calculator/", // 注意：这里是 GitHub Pages 上的子路径
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
