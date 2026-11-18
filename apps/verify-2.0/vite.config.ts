import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import { solidIcons } from "solid-icons/vite";

export default defineConfig({
  plugins: [solid(), solidIcons()],
});
