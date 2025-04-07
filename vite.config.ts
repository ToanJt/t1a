import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/", // Đảm bảo base là '/' hoặc './' nếu deploy vào subfolder

  build: {
    outDir: "dist", // Thư mục build mặc định
    assetsDir: "assets", // Thư mục chứa assets
    emptyOutDir: true, // Xóa thư mục build trước khi build mới
  },

  server: {
    host: true, // Cần thiết cho một số cấu hình hosting
  },
});
