import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Get repository name for GitHub Pages base path
const getBasePath = () => {
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split("/")[1];
    return `/${repoName}/`;
  }
  return "/";
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: getBasePath(),
});
